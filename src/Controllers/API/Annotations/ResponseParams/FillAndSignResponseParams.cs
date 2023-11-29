using Vintasoft.Shared.Web;

namespace Vintasoft.Imaging.Annotation.Web.Services
{
    /// <summary>
    /// Response from web service.
    /// Contains information about PDF file that is filled and signed on server.
    /// </summary>
    public class FillAndSignResponseParams : WebResponseParamsBase
    {

        /// <summary>
        /// Initializes a new instance of the <see cref="BaseAnnotationCollectionResponseParams"/> class. 
        /// </summary>
        public FillAndSignResponseParams()
            : base()
        {
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

    }
}
