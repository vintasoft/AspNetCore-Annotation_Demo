var _fileService;

var _docViewer;

var _localizer;

var _openFileHelper;

var _previouslyUploadedFilesDialog;

var _imageViewerSettingsDialog;

var _blockUiDialog;



// === "File" toolbar, "Previously uploaded files" button ===

/**
 Creates UI button for showing the list with previously uploaded files.
*/
function __createPreviousUploadFilesButton() {
    // create the button that allows to show a dialog with previously uploaded image files and select image file
    var button = new Vintasoft.Imaging.UI.UIElements.WebUiButtonJS({
        cssClass: "uploadedFilesListButton",
        title: "Previously Uploaded Files",
        localizationId: "previousUploadFilesButton",
        onClick: __previousUploadFilesButton_clicked
    });
    return button;
}

function __previousUploadFilesButton_clicked(event, uiElement) {
    var docViewer = uiElement.get_RootControl();
    if (docViewer != null) {
        // if dialog does not exist
        if (_previouslyUploadedFilesDialog == null)
            // create dialog
            _previouslyUploadedFilesDialog = new PreviouslyUploadedFilesDialogJS(_fileService, docViewer, _openFileHelper, __showErrorMessage);
        // show the dialog
        _previouslyUploadedFilesDialog.show();
    }
}



// === "View" toolbar ===

/**
 Creates UI button for showing image viewer settings dialog.
*/
function __createImageViewerSettingsButton() {
    // create the button that allows to show a dialog with image viewer settings
    return new Vintasoft.Imaging.UI.UIElements.WebUiButtonJS({
        cssClass: "vsdv-imageViewerSettingsButton",
        title: "Show Image Viewer Settings",
        localizationId: "imageViewerSettingsButton",
        onClick: __imageViewerSettingsButton_clicked
    });
}

function __imageViewerSettingsButton_clicked(event, uiElement) {
    var docViewer = uiElement.get_RootControl();
    if (docViewer != null) {
        var imageViewer = docViewer.get_ImageViewer();
        if (imageViewer != null) {
            if (_imageViewerSettingsDialog == null)
                _imageViewerSettingsDialog = new ImageViewerSettingsDialogJS(imageViewer);
            _imageViewerSettingsDialog.show();
        }
    }
}



// === "Tools" toolbar ===

/**
 Creates UI button for activating the visual tool, which allows to annotate and pan images in image viewer.
*/
function __createAnnotationAndPanToolButton() {
    return new Vintasoft.Imaging.DocumentViewer.UIElements.WebUiVisualToolButtonJS({
        cssClass: "vsdv-tools-panButton",
        title: "Pan",
        localizationId: "panToolButton"
    }, "AnnotationVisualTool,PanTool");
}



// === "Annotations" toolbar ===

/**
 Initializes image viewer panel of document viewer.
 @param {object} docViewerSettings Settings of document viewer.
*/
function __initImageViewerPanel(docViewerSettings) {
    // get items of document viewer
    var items = docViewerSettings.get_Items();

    // get the image viewer panel
    var imageViewerPanel = items.getItemByRegisteredId("imageViewerPanel");
    // if panel exists
    if (imageViewerPanel != null) {
        var annotationUiHelper = new AnnotationUiHelperJS();
        // initialize the annotation context menu
        annotationUiHelper.initAnnotationContextMenu(docViewerSettings, imageViewerPanel);
    }
}



// === Init UI ===

/**
 Registers custom UI elements in "WebUiElementsFactoryJS".
*/
function __registerNewUiElements() {
    var saveAnnotationsAndDownloadFileHelper = new SaveAnnotationsAndDownloadFileHelperJS(__showErrorMessage);

    // register the "Previously uploaded files" button in web UI elements factory
    Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.registerElement("previousUploadFilesButton", __createPreviousUploadFilesButton);
    // override the "Download image" button in web UI elements factory
    Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.registerElement("downloadImageButton", saveAnnotationsAndDownloadFileHelper.createDownloadFileWithAnnotationsButton);

    // register the "Image viewer settings" button in web UI elements factory
    Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.registerElement("imageViewerSettingsButton", __createImageViewerSettingsButton);

    // register the "Pan" button in web UI elements factory
    Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.registerElement("panToolButton", __createAnnotationAndPanToolButton);
}

/**
 Initializes main menu of document viewer.
 @param {object} docViewerSettings Settings of document viewer.
*/
function __initMenu(docViewerSettings) {
    // get items of document viewer
    var items = docViewerSettings.get_Items();

    var uploadFileButton = items.getItemByRegisteredId("uploadFileButton");
    if (uploadFileButton != null)
        uploadFileButton.set_FileExtensionFilter(".bmp, .emf, .gif, .ico, .cur, .jpg, .jpeg, .jls, .pcx, .png, .tif, .tiff, .wmf, .jb2, .jbig2, .jp2, .j2k, .j2c, .jpc, .pdf");

    // get the main menu of document viewer
    var mainMenu = items.getItemByRegisteredId("mainMenu");
    // if main menu is found
    if (mainMenu != null) {
        // get items of main menu
        var mainMenuItems = mainMenu.get_Items();

        // add "Annotation" menu panel
        mainMenuItems.addItem("annotationsMenuPanel");
    }

    // get the "File" menu panel
    var fileMenuPanel = items.getItemByRegisteredId("fileToolbarPanel");
    // if menu panel is found
    if (fileMenuPanel != null) {
        // get items of file menu panel
        var fileMenuPanelItems = fileMenuPanel.get_Items();

        // add the "Previous uploaded files" button to the menu panel
        fileMenuPanelItems.insertItem(1, "previousUploadFilesButton");
    }

    // get the "View" menu panel
    var viewMenuPanel = items.getItemByRegisteredId("viewMenuPanel");
    // if menu panel is found
    if (viewMenuPanel != null) {
        // get items of menu panel
        var viewMenuPanelItems = viewMenuPanel.get_Items();
        // add the "Image viewer settings" button to the menu panel
        viewMenuPanelItems.insertItem(viewMenuPanelItems.get_Count() - 1, "imageViewerSettingsButton");
    }
}

/**
 Initializes side panel of document viewer.
 @param {object} docViewerSettings Settings of document viewer.
*/
function __initSidePanel(docViewerSettings) {
    // get items of document viewer
    var items = docViewerSettings.get_Items();

    var sidePanel = items.getItemByRegisteredId("sidePanel");
    if (sidePanel != null) {
        var sidePanelItems = sidePanel.get_PanelsCollection();

        var annotationUiHelper = new AnnotationUiHelperJS();
        // initialize the annotation panel
        annotationUiHelper.initAnnotationPanel(sidePanelItems);
    }

    // get the thumbnail viewer panel of document viewer
    var thumbnailViewerPanel = items.getItemByRegisteredId("thumbnailViewerPanel");
    // if panel is found
    if (thumbnailViewerPanel != null)
        // subscribe to the "actived" event of the thumbnail viewer panel of document viewer
        Vintasoft.Shared.subscribeToEvent(thumbnailViewerPanel, "activated", __thumbnailsPanelActivated);
}

/**
 Thumbnail viewer panel of document viewer is actived.
*/
function __thumbnailsPanelActivated() {
    var thumbnailViewer = this.get_ThumbnailViewer();
    if (thumbnailViewer != null) {
        // create the progress image
        var progressImage = new Image();
        progressImage.src = __getApplicationUrl() + "Images/fileUploadProgress.gif";
        // specify that the thumbnail viewer must use the progress image for indicating the thumbnail loading progress
        thumbnailViewer.set_ProgressImage(progressImage);

        // additional bottom space for text with page number under thumbnail
        var textCaptionHeight = 18;
        var padding = thumbnailViewer.get_ThumbnailPadding();
        padding[2] += textCaptionHeight
        thumbnailViewer.set_ThumbnailPadding(padding);
        thumbnailViewer.set_DisplayThumbnailCaption(true);
    }
}



// === Visual Tools ===

/**
 Initializes visual tools.
 @param {object} docViewer The document viewer.
*/
function __initializeVisualTools(docViewer) {
    var rectangularSelectionTool = docViewer.getVisualToolById("RectangularSelectionTool");
    var zoomTool = docViewer.getVisualToolById("ZoomTool");
    var panTool = docViewer.getVisualToolById("PanTool");
    var magnifierTool = docViewer.getVisualToolById("MagnifierTool");
    var zoomSelectionTool = docViewer.getVisualToolById("ZoomSelectionTool");

    var zoomCursorUrl = __getApplicationUrl() + 'Content/Cursors/Zoom.cur';
    var zoomCursor = "url('" + zoomCursorUrl + "'), auto";
    var magnifierCursorUrl = __getApplicationUrl() + 'Content/Cursors/Magnifier.cur';
    var magnifierCursor = "url('" + magnifierCursorUrl + "'), auto";
    var panCursorUrl = __getApplicationUrl() + 'Content/Cursors/CloseHand.cur';
    var panCursor = "url('" + panCursorUrl + "'), auto";

    rectangularSelectionTool.set_DisableContextMenu(true);

    panTool.set_Cursor("pointer");
    panTool.set_ActionCursor(panCursor);

    magnifierTool.set_Cursor(magnifierCursor);
    magnifierTool.set_DisableContextMenu(true);

    zoomTool.set_Cursor(zoomCursor);
    zoomTool.set_ActionCursor(zoomCursor);
    zoomTool.set_DisableContextMenu(true);

    zoomSelectionTool.set_ActionCursor(zoomCursor);
    zoomSelectionTool.set_DisableContextMenu(true);


    var annotationUiHelper = new AnnotationUiHelperJS();
    // initialize the annotation visual tool
    annotationUiHelper.initializeAnnotationVisualTool(docViewer);
}



// === Utils ===

/**
 Blocks the UI. 
 @param {string} text Message that describes why UI is blocked.
*/
function __blockUI(text) {
    _blockUiDialog = new BlockUiDialogJS(text);
}

/**
 Unblocks the UI.
*/
function __unblockUI() {
    if (_blockUiDialog != null) {
        _blockUiDialog.close();
        _blockUiDialog = null;
    }
}

/**
 Shows an error message.
 @param {object} data Information about error.
*/
function __showErrorMessage(data) {
    __unblockUI();
    new ErrorMessageDialogJS(data);
}

/**
 Adds color picker to the color inputs in document viewer.
*/
function __addColorPickerToColorInputs() {
    $(".vsdv-colorInput").colorpicker({ format: 'rgba' });
}

/**
 Returns application URL.
*/
function __getApplicationUrl() {
    var applicationUrl = window.location.toString();
    if (applicationUrl[applicationUrl.length - 1] != '/')
        applicationUrl = applicationUrl + '/';
    return applicationUrl;
}

/**
 Creates the dictionary for localization of application UI.
*/
function __createUiLocalizationDictionary() {
    __createDocumentViewerDialogsForLocalization();
    __createDemoDialogsForLocalization();

    var localizationDict = _localizer.getDocumentLocalizationDictionary();
    var localizationDictString = JSON.stringify(localizationDict, null, '\t');
    console.log(localizationDictString);
}

/**
 Creates the dialogs, which are used in Web Document Viewer, for localization.
*/
function __createDocumentViewerDialogsForLocalization() {
    var floatingContainer = document.getElementById("documentViewerContainer");

    var documentPasswordDialog = new Vintasoft.Imaging.DocumentViewer.Dialogs.WebUiDocumentPasswordDialogJS();
    documentPasswordDialog.render(floatingContainer);

    var imageSelectionDialog = new Vintasoft.Imaging.DocumentViewer.Dialogs.WebImageSelectionDialogJS();
    imageSelectionDialog.render(floatingContainer);

    var printImagesDialog = new Vintasoft.Imaging.DocumentViewer.Dialogs.WebPrintImagesDialogJS();
    printImagesDialog.render(floatingContainer);

    var thumbnailViewerSettingsDialog = new Vintasoft.Imaging.DocumentViewer.Dialogs.WebThumbnailViewerSettingsDialogJS();
    thumbnailViewerSettingsDialog.render(floatingContainer);

    var rotateImageWithAnnotationsDialog = new Vintasoft.Imaging.DocumentViewer.Dialogs.WebRotateImageWithAnnotationsDialogJS();
    rotateImageWithAnnotationsDialog.render(floatingContainer);

    //var pdfRedactionMarkAppearanceDialog = new Vintasoft.Imaging.DocumentViewer.Dialogs.WebPdfRedactionMarkAppearanceDialogJS();
    //pdfRedactionMarkAppearanceDialog.render(floatingContainer);

    //var twainDeviceSelectionDialog = new Vintasoft.Imaging.DocumentViewer.Dialogs.WebTwainDeviceSelectionDialogJS();
    //twainDeviceSelectionDialog.render(floatingContainer);

    //var twainDeviceCapabilitiesDialog = new Vintasoft.Imaging.DocumentViewer.Dialogs.WebTwainDeviceCapabilitiesDialogJS();
    //twainDeviceCapabilitiesDialog.render(floatingContainer);
}

/**
 Creates the dialogs, which are used in this demo, for localization.
*/
function __createDemoDialogsForLocalization() {
    var textAnnotation = new Vintasoft.Imaging.Annotation.UI.WebTextAnnotationViewJS();
    var annotationSettingsDialog = new AnnotationSettingsDialogJS(textAnnotation);
}

/**
 Enables the localization of application UI.
*/
function __enableUiLocalization() {
    // if localizer is ready (localizer loaded localization dictionary)
    if (_localizer.get_IsReady()) {
        // localize DOM-elements of web page
        _localizer.localizeDocument();
    }
    // if localizer is NOT ready
    else
        // wait when localizer will be ready
        Vintasoft.Shared.subscribeToEvent(_localizer, "ready", function () {
            // localize DOM-elements of web page
            _localizer.localizeDocument();
        });

    // subscribe to the "dialogShown" event of document viewer
    Vintasoft.Shared.subscribeToEvent(_docViewer, "dialogShown", function (event, data) {
        _localizer.localizeDocument();
    });
}



// === Document viewer events ===

function __docViewer_warningOccured(event, eventArgs) {
    // show the alert if warning occured
    __showErrorMessage(eventArgs.message);
}

function __docViewer_asyncOperationStarted(event, data) {
    // get description of asynchronous operation
    var description = data.description;

    // if image is prepared for printing
    if (description === "Image prepared to print") {
        // do not block UI when images are preparing for printing
    }
    else {
        // block UI
        __blockUI(data.description);
    }
}

function __docViewer_asyncOperationFinished(event, data) {
    // unblock UI
    __unblockUI();

    // get description of asynchronous operation
    var description = data.description;
    // if annotations are saving to the server
    if (description === "Save annotations") {
        // show message about successful saving
        alert("Annotation collection is saved successfully.");
    }
}

function __docViewer_asyncOperationFailed(event, data) {
    // get description of asynchronous operation
    var description = data.description;
    // get additional information about asynchronous operation
    var additionalInfo = data.data;
    // if additional information exists
    if (additionalInfo != null)
        // show error message
        __showErrorMessage(additionalInfo);
    // if additional information does NOT exist
    else
        // show error message
        __showErrorMessage(description + ": unknown error.");
}

/**
 Document viewer shown the "standard" dialog.
*/
function __docViewer_dialogShown(event, data) {
    // shown dialog
    var dialog = data.dialog;

    // add color picker to the color inputs in document viewer
    __addColorPickerToColorInputs();
}



// === Main ===

/**
 Main function.
*/
function __main() {
    // set the session identifier
    var hiddenSessionFieldElement = document.getElementById('hiddenSessionField');
    Vintasoft.Shared.WebImagingEnviromentJS.set_SessionId(hiddenSessionFieldElement.value);

    // specify web services, which should be used in this demo

    _fileService = new Vintasoft.Shared.WebServiceControllerJS(__getApplicationUrl() + "vintasoft/api/MyVintasoftFileApi");

    Vintasoft.Shared.WebServiceJS.defaultFileService = _fileService;
    Vintasoft.Shared.WebServiceJS.defaultImageCollectionService = new Vintasoft.Shared.WebServiceControllerJS(__getApplicationUrl() + "vintasoft/api/MyVintasoftImageCollectionApi");
    Vintasoft.Shared.WebServiceJS.defaultImageService = new Vintasoft.Shared.WebServiceControllerJS(__getApplicationUrl() + "vintasoft/api/MyVintasoftImageApi");
    Vintasoft.Shared.WebServiceJS.defaultAnnotationService = new Vintasoft.Shared.WebServiceControllerJS(__getApplicationUrl() + "vintasoft/api/MyVintasoftAnnotationCollectionApi");

    // create UI localizer
    _localizer = new Vintasoft.Shared.VintasoftLocalizationJS();

    // register new UI elements
    __registerNewUiElements();

    // create the document viewer settings
    var docViewerSettings = new Vintasoft.Imaging.DocumentViewer.WebDocumentViewerSettingsJS("documentViewerContainer", "documentViewer", true);

    // initialize main menu of document viewer
    __initMenu(docViewerSettings);

    // initialize side panel of document viewer
    __initSidePanel(docViewerSettings);

    // initialize image viewer panel of document viewer
    __initImageViewerPanel(docViewerSettings);

    // create the document viewer
    _docViewer = new Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS(docViewerSettings);

    // subscribe to the "warningOccured" event of document viewer
    Vintasoft.Shared.subscribeToEvent(_docViewer, "warningOccured", __docViewer_warningOccured);
    // subscribe to the asyncOperationStarted event of document viewer
    Vintasoft.Shared.subscribeToEvent(_docViewer, "asyncOperationStarted", __docViewer_asyncOperationStarted);
    // subscribe to the asyncOperationFinished event of document viewer
    Vintasoft.Shared.subscribeToEvent(_docViewer, "asyncOperationFinished", __docViewer_asyncOperationFinished);
    // subscribe to the asyncOperationFailed event of document viewer
    Vintasoft.Shared.subscribeToEvent(_docViewer, "asyncOperationFailed", __docViewer_asyncOperationFailed);
    // subscribe to the dialogShown event of document viewer
    Vintasoft.Shared.subscribeToEvent(_docViewer, "dialogShown", __docViewer_dialogShown);

    // initialize visual tools
    __initializeVisualTools(_docViewer);

    var interactionAreaAppearanceManager = _docViewer.getInteractionAreaAppearanceManager();
    var rotationPoint = interactionAreaAppearanceManager.get_RotationPoint();
    // set the cursor for interaction point that allows to rotate annotation
    var rotateCursorUrl = __getApplicationUrl() + 'Content/Cursors/Rotate.cur';
    rotationPoint.set_Cursor("url('" + rotateCursorUrl + "'), auto");

    // get the image viewer of document viewer
    var imageViewer1 = _docViewer.get_ImageViewer();
    // specify that image viewer must show images in the single continuous column mode
    imageViewer1.set_DisplayMode(new Vintasoft.Imaging.WebImageViewerDisplayModeEnumJS("SingleContinuousColumn"));
    // specify that image viewer must show images in the fit width mode
    imageViewer1.set_ImageSizeMode(new Vintasoft.Imaging.WebImageSizeModeEnumJS("FitToWidth"));

    // create the progress image
    var progressImage = new Image();
    progressImage.src = __getApplicationUrl() + "Images/fileUploadProgress.gif";
    // specify that the image viewer must use the progress image for indicating the image loading progress
    imageViewer1.set_ProgressImage(progressImage);

    // get the visual tool, which allows to annotate and pan images in image viewer
    var annotationPanTool = _docViewer.getVisualToolById("AnnotationVisualTool,PanTool");
    _docViewer.set_MandatoryVisualTool(annotationPanTool);
    _docViewer.set_CurrentVisualTool(annotationPanTool);

    // copy the default file to the uploaded image files directory and open the file
    _openFileHelper = new OpenFileHelperJS(_docViewer, __showErrorMessage);
    _openFileHelper.openDefaultImageFile("VintasoftAnnotationDemo.tif");

    $(document).ready(function () {
        // add color picker to the color inputs in document viewer
        __addColorPickerToColorInputs();

        // create the dictionary for localization of application UI
        //__createUiLocalizationDictionary();

        // enable the localization of application UI
        __enableUiLocalization();
    });
}



// run main function
__main();
