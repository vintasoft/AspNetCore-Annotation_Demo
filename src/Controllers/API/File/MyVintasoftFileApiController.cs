using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;

using Vintasoft.Data;
using Vintasoft.Imaging.Annotation.Web.Services;
using Vintasoft.Imaging.AspNetCore.ApiControllers;
using Vintasoft.Imaging.Web.Services;
using Vintasoft.Shared.Web;


namespace AspNetCoreAnnotationDemo.Controllers
{
    /// <summary>
    /// A Web API controller that handles HTTP requests from clients and
    /// allows to manipulate files on server.
    /// </summary>
    public class MyVintasoftFileApiController : VintasoftFileApiController
    {

        #region Constructors

        /// <summary>
        /// Initializes a new instance of the <see cref="MyVintasoftFileApiController"/> class.
        /// </summary>
        public MyVintasoftFileApiController(IWebHostEnvironment hostingEnvironment)
            : base(hostingEnvironment)
        {
        }

        #endregion



        #region Methods

        #region PUBLIC

        /// <summary>
        /// Copyies the specified file from application directory to the data storage.
        /// </summary>
        /// <param name="requestParams">Information about file that must be copied.</param>
        /// <returns>Response from the server.</returns>
        [HttpPost]
        public override WebImageFileResponseParams CopyFile(WebImageFileRequestParams requestParams)
        {
            // copy file from application directory to the data storage
            WebImageFileResponseParams answer = base.CopyFile(requestParams);
            // if file is copied successfully
            if (answer.success)
            {
                // create the annotations cache manager
                AnnotationsCacheManager annotationCacheManager = CreateAnnotationsCacheManager(requestParams.sessionId);
                // clear all cache for copied file
                annotationCacheManager.ClearCache(answer.fileId);
            }
            return answer;
        }

        /// <summary>
        /// Returns a list of files uploaded during current HTTP session.
        /// </summary>
        /// <param name="session">Identifier of HTTP session.</param>
        /// <returns>Dictionary that provides a mapping from filename to URL of file.</returns>
        [HttpPost]
        public UploadedFilesListResponseParams GetUploadedFilesUrl([FromBody] string session)
        {
            UploadedFilesListResponseParams answer = new UploadedFilesListResponseParams();
            IDataStorage storage = CreateSessionDataStorage(session);
            if (storage != null)
            {
                List<string> files = new List<string>();
                string[] allFiles = storage.GetKeys();
                for (int i = 0; i < allFiles.Length; i++)
                {
                    if (IncludeFileInUploadedFileList(allFiles[i]))
                        files.Add(allFiles[i]);
                }
                answer.files = files.ToArray();
            }
            answer.success = true;
            return answer;
        }

        #endregion


        #region PROTECTED

        /// <summary>
        /// Creates the <see cref="MyVintasoftFileWebService"/>
        /// that handles HTTP requests from clients and allows to manipulate files on a server.
        /// </summary>
        /// <returns>The <see cref="MyVintasoftFileWebService"/>
        /// that handles HTTP requests from clients and allows to manipulate files on a server.</returns>
        protected override VintasoftFileWebService CreateWebService(string sessionId)
        {
            IDataStorage storage = CreateSessionDataStorage(sessionId);
            MyVintasoftFileWebService service = new MyVintasoftFileWebService(storage);
            return service;
        }

        /// <summary>
        /// Determines that file must be included into the uploaded file list.
        /// </summary>
        /// <param name="filePath">Path to a file.</param>
        /// <returns>
        /// <b>true</b> - file must be included to the uploaded file list;
        /// <b>true</b> - file must NOT be included to the uploaded file list.
        /// </returns>
        protected virtual bool IncludeFileInUploadedFileList(string filePath)
        {
            return true;
        }

        #endregion


        #region PRIVATE

        /// <summary>
        /// Creates a cache manager that manages cache of annotation collections.
        /// </summary>
        /// <returns>A cache manager that manages cache of annotation collections.</returns>
        private AnnotationsCacheManager CreateAnnotationsCacheManager(string sessionId)
        {
            if (sessionId == null)
                throw new ArgumentNullException("sessionId");

            // get path to a web application directory
            string projectDirectory = HostingEnvironment.WebRootPath;
            // get name of directory, where cached data must be stored
            string cacheDirectoryName = GetCacheDirectoryName();
            // get name of directory, where cached annotation packets must be stored
            string annotationPackageDirectoryName = GetAnnotationPackagesDirectoryName();
            // get path to a working directory of cache manager
            string cacheManagerWorkingDirectory = Path.Combine(Path.Combine(projectDirectory, cacheDirectoryName), Path.Combine(sessionId, annotationPackageDirectoryName));

            // if working directory is not exist
            if (!Directory.Exists(cacheManagerWorkingDirectory))
                // create working directory
                Directory.CreateDirectory(cacheManagerWorkingDirectory);

            // create cache manager for annotation collections
            return new AnnotationsCacheManager(cacheManagerWorkingDirectory);
        }

        /// <summary>
        /// Returns a name of directory, where cached data must be stored.
        /// </summary>
        /// <returns>A name of directory, where cached data must be stored.</returns>
        private string GetCacheDirectoryName()
        {
            return "VintasoftCache";
        }

        /// <summary>
        /// Returns a name of directory, where cached annotation packets must be stored.
        /// </summary>
        /// <returns>A name of directory, where cached annotation packets must be stored.</returns>
        private string GetAnnotationPackagesDirectoryName()
        {
            return "Annotations";
        }

        #endregion

        #endregion

    }
}