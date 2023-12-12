using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Security.Cryptography.X509Certificates;
using Vintasoft.Data;
using Vintasoft.Imaging;
using Vintasoft.Imaging.Annotation;
using Vintasoft.Imaging.Annotation.AspNetCore.ApiControllers;
using Vintasoft.Imaging.Annotation.Formatters;
using Vintasoft.Imaging.Annotation.Web.Services;
using Vintasoft.Imaging.Codecs.Decoders;
using Vintasoft.Imaging.Codecs.Encoders;
using Vintasoft.Imaging.Pdf;
using Vintasoft.Imaging.Pdf.Tree.DigitalSignatures;
using Vintasoft.Imaging.Pdf.Tree.InteractiveForms;

namespace AspNetCoreAnnotationDemo.Controllers
{
    /// <summary>
    /// A Web API controller that handles HTTP requests from clients and
    /// allows to manipulate annotations on server.
    /// </summary>
    public class MyVintasoftAnnotationCollectionApiController : VintasoftAnnotationCollectionApiController
    {

        #region Nested classes

        internal class ImagesHelper
        {

            string _password;



            internal ImagesHelper(string password)
            {
                _password = password;
            }



            internal void Images_AuthenticationRequest(object sender, DocumentAuthenticationRequestEventArgs e)
            {
                ImageCollection images = (ImageCollection)sender;
                images.AuthenticationRequest -= Images_AuthenticationRequest;

                DecoderBase decoder = e.Decoder;
                if (decoder.IsAuthenticationRequired)
                {
                    if (_password == null)
                        throw new IncorrectAuthorizationException();

                    DocumentAuthorizationResult result = decoder.Authenticate(new DocumentAuthenticationRequest(_password));
                    if (!result.IsAuthorized)
                        throw new IncorrectAuthorizationException();
                }
            }

        }

        internal class PdfPageSignatureManagerHelper
        {

            X509Certificate2 _certificate;
            bool _addTimestamp;



            internal PdfPageSignatureManagerHelper(X509Certificate2 certificate, bool addTimestamp)
            {
                _certificate = certificate;
                _addTimestamp = addTimestamp;
            }



            internal void PdfPageSignatureManager_SignatureRequest(object sender, SignatureRequestEventArgs e)
            {
                PdfDocument document = e.SignatureField.Document;

                // if certificate is NOT specified
                if (_certificate == null)
                {
                    throw new Exception("Certificate is empty.");
                }

                PdfInteractiveFormSignatureField signatureField = e.SignatureField;
                signatureField.PartialName = "TestSigntureField";

                // create signature creation params
                PdfPkcsSignatureCreationParams creationParams = new PdfPkcsSignatureCreationParams(_certificate, false);
                creationParams.SignatureFormat = PdfPkcsSignatureFormat.CMS;
                // if certificate must have timestamp
                if (_addTimestamp)
                {
                    TimestampAuthorityWebClient timestampRequest = new TimestampAuthorityWebClient("http://timestamp.comodoca.com/", null, null);
                    timestampRequest.HashAlgorithmName = "SHA256";
                    creationParams.TimestampAuthorityClient = timestampRequest;
                }

                // create signature
                PdfPkcsSignature signature = PdfPkcsSignature.CreatePkcs7Signature(document.Format, creationParams);

                // create the signature info
                PdfSignatureInformation signatureInfo = new PdfSignatureInformation(document, signature);
                signatureInfo.SigningTime = DateTime.Now;

                // add application name
                signatureInfo.BuildProperties = new PdfSignatureBuildProperties(document);
                signatureInfo.BuildProperties.Application = new PdfSignatureBuildData(document);
                signatureInfo.BuildProperties.Application.Name = "VintaSoft Imaging .NET SDK - https://www.vintasoft.com";

                signatureField.SignatureInfo = signatureInfo;
            }

        }

        #endregion



        #region Constructors

        /// <summary>
        /// Initializes a new instance of the <see cref="MyVintasoftAnnotationCollectionApiController"/> class.
        /// </summary>
        public MyVintasoftAnnotationCollectionApiController(IWebHostEnvironment hostingEnvironment) :
            base(hostingEnvironment)
        {
            // define custom serialization binder for correct deserialization of triangle and mark annotations
            AnnotationSerializationBinder.Current = new CustomAnnotationSerializationBinder();

            // set the custom annotation formatter
            Formatter = new CustomAnnotationJsonFormatter();
        }

        #endregion



        #region Methods

        /// <summary>
        /// Fills and signs PDF document.
        /// </summary>
        /// <param name="requestParams">Information about image, annotation collection and signature certificate.</param>
        /// <returns>.</returns>
        [HttpPost]
        public virtual FillAndSignResponseParams FillAndSign(FillAndSignRequestParams requestParams)
        {
            // create answer to the request
            FillAndSignResponseParams answer = new FillAndSignResponseParams();
            answer.fileId = requestParams.fileId;
            answer.success = false;

            IDataStorage sessionDataStorage = CreateSessionDataStorage(requestParams.sessionId);

            Stream openFileStream = null;
            Stream savedFileStream = null;
            try
            {
                X509Certificate2 certificate;

                // get base64-string that represents data of the certificate file
                string certBase64 = requestParams.certificateFileAsBase64String;
                // if request contains string
                if (certBase64 != null)
                {
                    byte[] rawCert = Convert.FromBase64String(certBase64);
                    string certPass = requestParams.certificateFilePassword;
                    // create certificate that should be used to create signature
                    certificate = new X509Certificate2(rawCert, certPass);
                }
                else
                {
                    // get test certificate
                    certificate = GetTestCertificate();
                }

                // get JSON-string that represents annotation collection
                string annotationCollectionAsJsonString = requestParams.annotationCollection;
                // deserialize annotation collection
                AnnotationJsonFormatter formatter = new AnnotationJsonFormatter();
                AnnotationData[] annotations = (AnnotationData[])formatter.Deserialize(annotationCollectionAsJsonString);
                // get annotation that represents signature appearance
                AnnotationData signatureAnno = annotations[0];

                string openFileId = requestParams.imageInfo.fileInfo.id;
                string password = requestParams.imageInfo.fileInfo.password;
                // open source document
                openFileStream = (Stream)sessionDataStorage.LockItem(openFileId);

                ImagesHelper imagesHelper = new ImagesHelper(password);

                // create temporary image collection
                using (ImageCollection images = new ImageCollection())
                {
                    images.AuthenticationRequest += imagesHelper.Images_AuthenticationRequest;
                    // add document stream to the image collection
                    images.Add(openFileStream);

                    // create PDF encoder
                    PdfEncoder encoder = new PdfEncoder();

                    // create PDF page signature manager
                    using (Vintasoft.Imaging.Annotation.Pdf.PdfPageSignatureManager pdfPageSignatureManager =
                        new Vintasoft.Imaging.Annotation.Pdf.PdfPageSignatureManager(encoder))
                    {
                        // subscribe to the PdfPageSignatureManagerHelper.SignatureRequest event
                        PdfPageSignatureManagerHelper pdfPageSignatureManagerHelper = new PdfPageSignatureManagerHelper(certificate, requestParams.AddTimestamp);
                        pdfPageSignatureManager.SignatureRequest += pdfPageSignatureManagerHelper.PdfPageSignatureManager_SignatureRequest;
                        try
                        {
                            // get image that should contain signature
                            VintasoftImage image = images[requestParams.imageInfo.pageIndex];

                            // register the signature on image
                            pdfPageSignatureManager.RegisterSignatureOnImage(image, signatureAnno);

                            var savedFileId = requestParams.fileId;
                            // create stream, where document must be saved
                            savedFileStream = (Stream)sessionDataStorage.LockItem(savedFileId);

                            // save PDF document to the stream
                            images.SaveSync(savedFileStream, encoder);

                            answer.success = true;
                        }
                        finally
                        {
                            // unsubscribe from the PdfPageSignatureManagerHelper.SignatureRequest event
                            pdfPageSignatureManager.SignatureRequest -= pdfPageSignatureManagerHelper.PdfPageSignatureManager_SignatureRequest;
                        }
                    }

                    images.ClearAndDisposeItems();
                }
            }
            catch (Exception ex)
            {
                answer.success = false;
                answer.errorMessage = ex.Message;
            }
            finally
            {
                if (openFileStream != null)
                {
                    openFileStream.Close();
                }
                if (savedFileStream != null)
                {
                    savedFileStream.Close();
                }
            }

            return answer;
        }

        /// <summary>
        /// Returns test certificate.
        /// </summary>
        private X509Certificate2 GetTestCertificate()
        {
            string certificatePath = Path.Combine("wwwroot", "Resources", "TestCertificate.pfx");
            string certificatePassword = "test";

            return new X509Certificate2(certificatePath, certificatePassword);
        }

        #endregion

    }
}