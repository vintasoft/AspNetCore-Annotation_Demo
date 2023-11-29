namespace Vintasoft.Imaging.Annotation.Web.Services
{
    /// <summary> 
    /// Request to a web service.
    /// Contains parameters, which must be sent to a web service for providing
    /// information about PDF file that must be filled and signed on server.
    /// </summary>
    public class FillAndSignRequestParams : AnnotationCollectionInfoRequestParams
    {

        /// <summary>
        /// Initializes a new instance of the <see cref="FillAndSignRequestParams"/> class.
        /// </summary>
        public FillAndSignRequestParams()
            : base()
        {
        }



        string _certificateFileAsBase64String;
        /// <summary>
        /// Gets or sets a base64-string that contains data of certificate file.
        /// </summary>
        public string certificateFileAsBase64String
        {
            get { return _certificateFileAsBase64String; }
            set { _certificateFileAsBase64String = value; }
        }

        string _certificateFilePassword;
        /// <summary>
        /// Gets or sets a string that contains password to the certificate file.
        /// </summary>
        public string certificateFilePassword
        {
            get { return _certificateFilePassword; }
            set { _certificateFilePassword = value; }
        }

        bool _addTimestamp;
        /// <summary>
        /// Gets or sets a value indicating whether created signature must have timestamp.
        /// </summary>
        public bool AddTimestamp
        {
            get { return _addTimestamp; }
            set { _addTimestamp = value; }
        }

        string _fileId;
        /// <summary>
        /// Gets or sets the identifier of file, where images must be saved.
        /// </summary>
        public string fileId
        {
            get { return _fileId; }
            set { _fileId = value; }
        }

        string _password;
        /// <summary>
        /// Gets or sets a password for file, where images must be saved.
        /// </summary>
        public string password
        {
            get { return _password; }
            set { _password = value; }
        }

    }
}
