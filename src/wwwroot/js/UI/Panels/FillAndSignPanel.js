/**
 A web UI panel that allows to view the fill and sign elements.
*/
WebFillAndSignPanelJS = function (settings, stateButton) {

    /**
     Sends request for write signature on file and download file.
     @param {WebDocumentViewerJS} docViewer Document viewer.
     @param {string} certificate Base64 string, that contains certificate data.
     @param {string} certificatePassword Certificate password.
     @param {string} fileName Saved file name.
     @param {boolean} useTextCertificate A value indicating whether test certificate must be used.
     @param {boolean} addTimestamp A value indicating whether created signature must be timestamped.
     @function @private
    */
    function __fillAndSign(docViewer, certificate, certificatePassword, fileName, useTextCertificate, addTimestamp) {
        if (certificate == null && !useTextCertificate) {
            throw new Error("Not found certificate file.");
        }
        if (fileName == null || fileName == ".pdf") {
            throw new Error("File name cannot be null.");
        }

        // get annotation viewer
        var annoViewer = docViewer.get_ImageViewer();

        // get focused image
        var image = annoViewer.get_FocusedImage();

        // get annotation tool
        var tool = annoViewer.get_AnnotationVisualTool();
        // get focused annotation
        var annotation = tool.get_FocusedAnnotationView();
        if (annotation == null) {
            throw new Error("Please select annotation that will be used as the signature appearance.");
        }

        if (useTextCertificate) {
            certificate = null;
            certificatePassword = null;
        }

        // get annotation service
        var service = Vintasoft.Shared.WebServiceJS.defaultAnnotationService;
        var actionName = "Fill and sign";

        // create request params
        var ajaxParams = {
            data: {
                imageInfo: {
                    fileInfo: {
                        id: image.get_Source().get_ImageId(),
                        password: image.get_Source().get_Password()
                    },
                    pageIndex: image.get_PageIndex()
                },
                annotationCollection: JSON.stringify([annotation.serialize()]),
                certificateFileAsBase64String: certificate,
                certificateFilePassword: certificatePassword,
                addTimestamp: addTimestamp,
                fileId: fileName
            }
        }

        docViewer.startAsyncOperation(actionName);

        // create request
        var request = new Vintasoft.Shared.WebRequestJS(
            "FillAndSign",
            function (data) {
                docViewer.finishAsyncOperation(actionName);

                // download created file
                docViewer.downloadFile(data.fileId);
            },
            function (data) {
                docViewer.failAsyncOperation(actionName, data);
            },
            ajaxParams);
        // send request
        service.sendRequest(request);
    }

    /**
     Subscribe to the "activated" event of "Upload certificate file" button.
     @param {WebFillAndSignPanelJS} panel This panel.
     @param {WebUiUploadFileButtonJS} uploadCertificateFileButton The "Upload certificate file" button.
     @function @private
    */
    function __subscribeToUploadCertificateFileButtonActivated(panel, uploadCertificateFileButton) {
        /**
         Event handler.
         @param {object} event Event.
         @function @private
        */
        function __uploadCertificateFileButton_activated(event) {
            /**
             Event handler.
             @param {object} event Event.
             @param {object} eventArgs Event arguments.
             @function @private
            */
            function __uploadCertificateFileButton_filesSelected(event, eventArgs) {
                var files = eventArgs.files;
                // if files are uploaded
                if (files.length > 0) {
                    // get first selected file
                    var file = files[0];

                    // convert file to a base64-string
                    var reader = new FileReader();
                    reader.onload = function () {
                        // get file name
                        var fileName = file.name;
                        // write to Textarea
                        panel._uploadCertificateFileTextarea.get_DomElement().value = fileName;

                        // get full file Base64 string
                        var result = reader.result;
                        // get only data
                        var base64 = result.substring(result.indexOf("base64,") + "base64,".length);
                        // set panel certificate
                        panel._certificate = base64;
                    }
                    reader.readAsDataURL(file);
                }
            }

            // subscribe to "filesSelected" event
            Vintasoft.Shared.subscribeToEvent(event.target, "filesSelected", __uploadCertificateFileButton_filesSelected);
        }

        // subscribe only once to "activated" event
        Vintasoft.Shared.subscribeToEventOnce(uploadCertificateFileButton, "activated", __uploadCertificateFileButton_activated);
    }

    /**
     Occurs when "Fill and sign" button is clicked.
     @param {object} event Event.
     @param {object} uiElement UI element.
     @function @private
    */
    function __fillAndSingButton_click(event, uiElement) {
        var panel = event.data.a;

        // get document viewer
        var docViewer = uiElement.get_RootControl();
        // get certificate
        var certificate = panel._certificate;

        // get certificate password
        var password = panel._certificatePasswordInput.get_DomElement().value;

        // get opened file name
        var fileName = _docViewer.get_OpenedFileId();

        // remove extension
        fileName = fileName.slice(0, fileName.lastIndexOf('.'));
        // add '_signed' in file name
        fileName += "_signed";
        // add PDF extension
        fileName += ".pdf";

        try {
            var useTestCertificate = panel._useTestCertificateCheckbox.get_DomElement().checked;
            var addTimestamp = panel._addTimestampToSignatureCheckbox.get_DomElement().checked;
            // send a request to fill and sign PDF document
            __fillAndSign(docViewer, certificate, password, fileName, useTestCertificate, addTimestamp);
        }
        catch (ex) {
            Vintasoft.Shared.triggerEvent(panel, "warningOccured", { message: ex.message })

            if (panel.get_RootControl() != null) {
                Vintasoft.Shared.triggerEvent(panel.get_RootControl(), "warningOccured", { message: ex.message })
            }
        }
    }

    /**
     Creates UI elements of "Signature certificate"" groupbox.
     @returns {WebUiGroupBoxJS} The "Signature certificate"" groupbox.
     @function @private
    */
    function __createSignatureCertificateGroup(panel) {
        var certificateFileLabel = new Vintasoft.Imaging.UI.UIElements.WebUiLabelElementJS(
            {
                text: "Certificate file:",
                localizationId: "certificateFileLabel"
            });

        // a text area that contains name of opened certificate
        var uploadCertificateFileTextarea = new Vintasoft.Imaging.UI.UIElements.WebUiTextareaElementJS({
            cssClass: "uploadCertificateTextarea",
            readonly: true,
            onClick: {
                callback: function (event, uiElement) {
                    var panel = event.data.a;
                    // emulate click on upload button
                    panel._uploadCertificateFileButton.get_DomElement().click();
                },
                data: { a: panel }
            }
        });
        panel._uploadCertificateFileTextarea = uploadCertificateFileTextarea;


        // upload certificate button
        var uploadCertificateFileButton = new Vintasoft.Imaging.UI.UIElements.WebUiUploadFileButtonJS({
            cssClass: "uploadCertificateFileButton",
            title: "Upload Certificate file",
            localizationId: "uploadCertificateFileButton",
            accept: ".pfx"
        });
        __subscribeToUploadCertificateFileButtonActivated(panel, uploadCertificateFileButton);
        panel._uploadCertificateFileButton = uploadCertificateFileButton;

        var uploadDiv = new Vintasoft.Imaging.UI.UIElements.WebUiElementContainerJS(
            [uploadCertificateFileTextarea, uploadCertificateFileButton],
            { css: { 'display': "flex", 'align-items': "center" } });


        var certificatePasswordLabel = new Vintasoft.Imaging.UI.UIElements.WebUiLabelElementJS(
            {
                text: "Certificate password:",
                localizationId: "certificatePasswordLabel"
            });
        var certificatePasswordInput = new Vintasoft.Imaging.UI.UIElements.WebUiTextInputJS({ css: { 'width': "100%" } });
        panel._certificatePasswordInput = certificatePasswordInput;

        var certificateDiv = new Vintasoft.Imaging.UI.UIElements.WebUiElementContainerJS(
            [
                certificateFileLabel, 'br',
                uploadDiv, 'br',
                certificatePasswordLabel, 'br',
                certificatePasswordInput
            ], {});
        panel._certificateDiv = certificateDiv;


        var useTestCertificateCheckbox = new Vintasoft.Imaging.UI.UIElements.WebUiCheckboxInputJS({
            onChange: {
                callback: function (event, uiElement) {
                    var panel = event.data.a;
                    if (uiElement.get_DomElement().checked) {
                        panel._certificateDiv.set_IsEnabled(false);
                    }
                    else {
                        panel._certificateDiv.set_IsEnabled(true);
                    }
                },
                data: { a: panel }
            }
        });
        var useTestCertificateLabel = new Vintasoft.Imaging.UI.UIElements.WebUiLabelElementJS(
            {
                text: "Use test certificate",
                localizationId: "useTestCertificateLabel",
                css: { "padding-left": "5px" }
            });
        panel._useTestCertificateCheckbox = useTestCertificateCheckbox;


        var addTimestampToSignatureCheckbox = new Vintasoft.Imaging.UI.UIElements.WebUiCheckboxInputJS({
            onChange: {
                callback: function (event, uiElement) {
                    var panel = event.data.a;
                    if (uiElement.get_DomElement().checked) {
                        panel._certificateDiv.set_IsEnabled(false);
                    }
                    else {
                        panel._certificateDiv.set_IsEnabled(true);
                    }
                },
                data: { a: panel }
            }
        });
        var addTimestampToSignatureLabel = new Vintasoft.Imaging.UI.UIElements.WebUiLabelElementJS(
            {
                text: "Add timestamp",
                localizationId: "addTimestampToSignatureLabel",
                css: { "padding-left": "5px" }
            });
        panel._addTimestampToSignatureCheckbox = addTimestampToSignatureCheckbox;


        var signatureCertificateGroupBox = new Vintasoft.Imaging.UI.UIElements.WebUiGroupBoxJS(
            "Signature certificate",
            [
                certificateDiv, 'br',
                useTestCertificateCheckbox, useTestCertificateLabel, 'br',
                addTimestampToSignatureCheckbox, addTimestampToSignatureLabel
            ],
            {});

        return signatureCertificateGroupBox;
    }

    /**
     Creates UI elements of panel.
     @function @private
    */
    function __create(panel) {
        var signatureCertificateGroupBox = __createSignatureCertificateGroup(panel);

        var fillAndSignButton = new Vintasoft.Imaging.UI.UIElements.WebUiButtonInputJS({
            cssClass: "fillAndSignButton",
            value: "Fill and Sign",
            localizationId: "fillAndSignButton",
            onClick: {
                callback: __fillAndSingButton_click,
                data: { a: panel }
            }
        });

        return [
            signatureCertificateGroupBox, 'br',
            fillAndSignButton
        ];
    }



    this._certificate = null;

    this._uploadCertificateFileTextarea = null;
    this._uploadCertificateFileButton = null;
    this._certificatePasswordInput = null;

    this._serverInput = null;
    this._loginInput = null;
    this._passwordInput = null;

    this._fileNameInput = null;

    var items = __create(this);

    WebFillAndSignPanelJS.superclass.constructor.call(this, items, settings, stateButton);

}
Vintasoft.Shared.extend(WebFillAndSignPanelJS, Vintasoft.Imaging.UI.Panels.WebUiPanelWithContextMenuJS);