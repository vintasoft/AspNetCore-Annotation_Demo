using Microsoft.AspNetCore.Hosting;
using Vintasoft.Imaging.Annotation.AspNetCore.ApiControllers;
using Vintasoft.Imaging.Annotation.Formatters;

namespace AspNetCoreAnnotationDemo.Controllers
{
    /// <summary>
    /// A Web API controller that handles HTTP requests from clients and
    /// allows to manipulate annotations on server.
    /// </summary>
    public class MyVintasoftAnnotationCollectionApiController : VintasoftAnnotationCollectionApiController
    {

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

    }
}