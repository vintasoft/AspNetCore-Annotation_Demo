/**
 A helper that helps to save annotations to a file and download file with annotations.
*/
SaveAnnotationsAndDownloadFileHelperJS = function (showErrorMessageFunc) {

    var _docViewer;
    var _imageCount;
    var _savedImageCount;



    /**
     Creates UI button that allows to download a file with annotations.
    */
    SaveAnnotationsAndDownloadFileHelperJS.prototype.createDownloadFileWithAnnotationsButton = function () {
        // create button that allows to download image file
        var element = new Vintasoft.Imaging.UI.UIElements.WebUiButtonJS({
            cssClass: "vsdv-downloadImageFileButton",
            title: "Download Image File",
            localizationId: "downloadImageButton",
            onClick: __downloadImageFileButton_clicked
        });
        return element;
    }

    function __downloadImageFileButton_clicked(event, uiElement) {
        _docViewer = uiElement.get_RootControl();
        // get image viewer
        var imageViewer = _docViewer.get_ImageViewer();
        // get images of image viewer
        var images = imageViewer.get_Images();

        // get image count
        _imageCount = images.get_Count();
        _savedImageCount = 0;
        // if image viewer contains images
        if (_imageCount != 0) {
            // get annotation controller
            var controller = imageViewer.get_AnnotationController();
            // start the asynchronous saving of annotation collections
            controller.saveAnnotationCollections(__saveAnnotationCollections_success, __downloadFile_error);

            // start the asynchronous operation in document viewer
            _docViewer.startAsyncOperation("Download file");
        }
    }

    /**
     Saves blob to a file.
     @param {object} blob Blob.
     @param {string} filename File name.
    */
    function __saveBlobToFile(blob, filename) {
        // if blob is defined
        if (blob != null) {
            // if web browser can save blobs
            if (navigator.msSaveBlob) {
                // save the blob using web browser functionality
                return navigator.msSaveBlob(blob, filename);
            }
            // if web browser CANNOT save blobs
            else {
                // create an object URL
                var url = window.URL.createObjectURL(blob);
                // if object URL is created
                if (url != null) {
                    // create an "A" element
                    var a = document.createElement("a");
                    a.style.display = "none";
                    // if "A" element supports the "download" attribute
                    if ("download" in a) {
                        // create "A" element with "download" attribute for saving a file in browser

                        a.setAttribute("href", url);
                        a.setAttribute("download", filename);
                        document.body.appendChild(a);

                        setTimeout(function () {
                            a.click();
                            a.remove();
                            setTimeout(function () { window.URL.revokeObjectURL(url); }, 250);
                        }, 66);
                    }
                    // if "A" element does NOT support the "download" attribute
                    else {
                        // create iframe for saving a file in browser
                        var frame = document.createElement("iframe");
                        document.body.appendChild(a);
                        frame[0].src = url;

                        setTimeout(function () { frame.remove(); }, 333);
                    }
                }
                // if object URL is NOT created
                else {
                    // show the alert if warning occured
                    showErrorMessageFunc("Error: Object URL is not created.");
                }
            }
        }
        // if blob is NOT created
        else {
            // show the alert if warning occured
            showErrorMessageFunc("Error: Blob is not created.");
        }
    }

    /**
     The request for downloading image file from server is executed successfully.
    */
    function __onDownloadFile_success(data) {
        // get a blob, which contains data of downloading file
        var blob = data.blob;
        // get name of downloading file
        var filename = data.filename;
        __saveBlobToFile(blob, filename);

        // stop the asynchronous operation in document viewer
        _docViewer.finishAsyncOperation("Download file", data);
    }

    /**
     Request for saving annotation collections in image file is executed successfully.
    */
    function __saveAnnotationCollections_success(data) {
        // get image viewer
        var imageViewer = _docViewer.get_ImageViewer();
        // get images of image viewer
        var images = imageViewer.get_Images();

        _savedImageCount++;
        if (_savedImageCount === _imageCount) {
            var image = images.getImage(0);
            var source = image.get_Source();
            Vintasoft.Imaging.VintasoftFileAPI.downloadImageFile(source, __onDownloadFile_success, __downloadFile_error);
        }
    }

    /**
     Download file operation is failed.
    */
    function __downloadFile_error(data) {
        _docViewer.failAsyncOperation("Download file", data);
    }

}
