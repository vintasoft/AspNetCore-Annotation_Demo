var _fileService;

var _docViewer;

var _localizer;

var _openFileHelper;

var _previouslyUploadedFilesDialog;

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



// === Side panel ===

/**
 Creates "Fill and sign" panel for side panel.
*/
function __createFillAndSignPanel() {
    var button = new Vintasoft.Imaging.UI.UIElements.WebUiButtonJS({
        cssClass: "vsdv-sidePanel-fillAndSignPanelButton",
        title: "Fill and sign",
        localizationId: "showFillAndSignPanelButton"
    });
    var element = new WebFillAndSignPanelJS(
        {
            cssClass: "vsui-sidePanel-content vsdv-sidePanel-fillAndSignPanel",
            localizationId: "fillAndSignPanel"
        },
        button
    );
    return element;
}



// === "Annotations" toolbar ===

/**
 Initializes image viewer panel of document viewer.
 @param {object} docViewer Document viewer.
*/
function __initImageViewerPanel(docViewer) {
    // get items of document viewer
    var items = docViewer.get_Items();

    // get the image viewer panel
    var imageViewerPanel = items.getItemByRegisteredId("imageViewerPanel");
    // if panel exists
    if (imageViewerPanel != null) {
        // enable ability to set custom image rotation
        imageViewerPanel.set_CanSetCustomViewRotationUsingContextMenu(true);
        // initialize the annotation context menu
        AnnotationUiHelperJS.initAnnotationViewerContextMenu(imageViewerPanel, docViewer);
    }
}



// === Init UI ===

/**
 Registers custom UI elements in "WebUiElementsFactoryJS".
*/
function __registerNewUiElements() {
    // register the "Previously uploaded files" button in web UI elements factory
    Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.registerElement("previousUploadFilesButton", __createPreviousUploadFilesButton);

    // register the "Pan" button in web UI elements factory
    Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.registerElement("panToolButton", __createAnnotationAndPanToolButton);

    // register the "Fill and sign" panel in web UI elements factory
    Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.registerElement("fillAndSignPanel", __createFillAndSignPanel);
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
        uploadFileButton.set_FileExtensionFilter(".bmp, .cur, .gif, .ico, .j2c, .j2k, .jb2, .jbig2, .jp2, .jpc, .jpeg, .jpg, .jls, .pbm, .pcx, .pdf, .png, .tga, .tif, .tiff");

    // get the "File" menu panel
    var fileMenuPanel = items.getItemByRegisteredId("fileToolbarPanel");
    // if menu panel is found
    if (fileMenuPanel != null) {
        // get items of file menu panel
        var fileMenuPanelItems = fileMenuPanel.get_Items();

        // add the "Previous uploaded files" button to the menu panel
        fileMenuPanelItems.insertItem(2, "previousUploadFilesButton");
    }

    // get the "Tools" menu panel
    var toolsMenuPanel = items.getItemByRegisteredId("visualToolsToolbarPanel");
    // if menu panel is found
    if (toolsMenuPanel != null) {
        // get items of file menu panel
        var toolsMenuPanelItems = toolsMenuPanel.get_Items();

        var rectangularSelectionToolButton = toolsMenuPanelItems.getItemByRegisteredId("rectangularSelectionToolButton");
        if (rectangularSelectionToolButton != null)
            // remove the "Rectangular Selection Tool" button from the menu panel
            toolsMenuPanelItems.removeItem(rectangularSelectionToolButton);
    }
}

/**
 Initializes side panel of document viewer.
 @param {object} docViewerSettings Settings of document viewer.
*/
function __initSidePanel(docViewerSettings) {
    // get items of document viewer
    var items = docViewerSettings.get_Items();

    // get the thumbnail viewer panel of document viewer
    var thumbnailViewerPanel = items.getItemByRegisteredId("thumbnailViewerPanel");
    // if panel is found
    if (thumbnailViewerPanel != null) {
        // subscribe to the "actived" event of the thumbnail viewer panel of document viewer
        Vintasoft.Shared.subscribeToEvent(thumbnailViewerPanel, "activated", __thumbnailsPanelActivated);
        // enable ability to delete thumbnails
        thumbnailViewerPanel.set_CanDeleteThumbnailsUsingContextMenu(true);
        // enable ability to set custom thumbnail rotation
        thumbnailViewerPanel.set_CanSetCustomViewRotationUsingContextMenu(true);
        // enable ability to move thumbnail
        thumbnailViewerPanel.set_CanMoveThumbnailUsingContextMenu(true);
    }

}

/**
 Initializes sing and fill panel in side panel of document viewer.
 @param {object} docViewer Document viewer.
*/
function __initSingAndFillPanel(docViewer) {
    var items = docViewer.get_Items();
    // add fill and sign panel on side panel
    var sidePanel = items.getItemByRegisteredId("sidePanel");
    var sidePanelItems = sidePanel.get_PanelsCollection();
    sidePanelItems.addItem("fillAndSignPanel");
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
    rectangularSelectionTool.set_DisableContextMenu(true);

    var magnifierTool = docViewer.getVisualToolById("MagnifierTool");
    magnifierTool.set_DisableContextMenu(true);

    var zoomTool = docViewer.getVisualToolById("ZoomTool");
    zoomTool.set_DisableContextMenu(true);

    var zoomSelectionTool = docViewer.getVisualToolById("ZoomSelectionTool");
    zoomSelectionTool.set_DisableContextMenu(true);

    // initialize the annotation visual tool
    AnnotationUiHelperJS.initializeAnnotationVisualTool(docViewer);
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



// === Annotation comment list panel events ===

/**
 Subscribes to the events of annotation comment list panel.
*/
function __subscribeToAnnotationCommentListPanelEvents() {
    var items = _docViewer.get_Items();

    var annotationCommentListPanel = items.getItemByRegisteredId("annotationCommentListPanel");

    // subscribe to the "commentAdded" event of annotation comment list panel
    Vintasoft.Shared.subscribeToEvent(annotationCommentListPanel, "commentAdded", __annotationCommentListPanel_commentAdded);
    // subscribe to the "commentReplyAdded" event of annotation comment list panel
    Vintasoft.Shared.subscribeToEvent(annotationCommentListPanel, "commentReplyAdded", __annotationCommentListPanel_commentReplyAdded);
    // subscribe to the "stateCommentAdded" event of annotation comment list panel
    Vintasoft.Shared.subscribeToEvent(annotationCommentListPanel, "stateCommentAdded", __annotationCommentListPanel_stateCommentAdded);
    // subscribe to the "dialogShown" event of annotation comment list panel
    Vintasoft.Shared.subscribeToEvent(annotationCommentListPanel, "commentSettingsDialogShown", __annotationCommentListPanel_commentSettingsDialogShown);
}

/**
 The annotation comment is added.
*/
function __annotationCommentListPanel_commentAdded(event, eventArgs) {
    // get panel
    var annotationCommentListPanel = event.target;
    // get comment
    var comment = eventArgs.comment;

    // if user is guest
    if (comment.get_UserName() == "Guest") {
        // change comment color
        comment.set_Color("rgba(200,200,200,0.5)");
        // update panel
        annotationCommentListPanel.update();
    }
}

/**
 The reply is added to the annotation comment.
*/
function __annotationCommentListPanel_commentReplyAdded(event, eventArgs) {
    // get panel
    var annotationCommentListPanel = event.target;
    // get comment reply
    var commentReply = eventArgs.commentReply;

    // if user is guest
    if (commentReply.get_UserName() == "Guest") {
        // change comment color
        commentReply.set_Color("rgba(200,200,200,0.5)");
        // update panel
        annotationCommentListPanel.update();
    }
}

/**
 The state comment is added to the annotation comment.
*/
function __annotationCommentListPanel_stateCommentAdded(event, eventArgs) {
    // get panel
    var annotationCommentListPanel = event.target;
    // get comment
    var comment = eventArgs.comment;
    // get state comment
    var stateComment = eventArgs.stateComment;

    // get the parent comment state
    var stateCommentParentState = stateComment.get_ParentState();

    var color;
    // check the state
    switch (stateCommentParentState) {
        case "None":
            color = "rgba(200,200,200,0.5)";
            break;

        case "Accepted":
            color = "rgba(200,255,200,0.5)";
            break;

        case "Completed":
            color = "rgba(200,255,200,1)";
            break;

        case "Rejected":
            color = "rgba(255,200,200,1)";
            break;

        case "Cancelled":
            color = "rgba(160,160,160,0.7)";
            break;

        default:
            color = null;
    }

    // if supported state is found
    if (color != null) {
        // set comment color
        comment.set_Color(color);
        // set state comment color
        stateComment.set_Color(color);
        // update panel
        annotationCommentListPanel.update();
    }
}

/**
 The annotation comment settings dialog is shown.
*/
function __annotationCommentListPanel_commentSettingsDialogShown(event, eventArgs) {
    // get panel
    var annotationCommentListPanel = event.target;
    // get document viewer
    var documentViewer = annotationCommentListPanel.get_RootControl();

    // get dialog
    var dialog = eventArgs.dialog;
    // get comment
    var comment = dialog.get_Comment();

    // if comment user name and current user name are different
    if (comment.get_UserName() != documentViewer.get_CurrentUser()) {
        // hide the dialog
        dialog.hide();

        // show the error message
        __showErrorMessage("Wrong user name.");
    }
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
 Returns application URL.
*/
function __getApplicationUrl() {
    var applicationUrl = window.location.toString();
    if (applicationUrl[applicationUrl.length - 1] != '/')
        applicationUrl = applicationUrl + '/';
    return applicationUrl;
}



// === Localization ===

/**
 Creates the dictionary for localization of application UI.
*/
function __createUiLocalizationDictionary() {
    var tempDialogs = [];
    __createDocumentViewerDialogsForLocalization(tempDialogs);
    __createDemoDialogsForLocalization(tempDialogs);

    var localizationDict = _localizer.getDocumentLocalizationDictionary();
    var localizationDictString = JSON.stringify(localizationDict, null, '\t');
    console.log(localizationDictString);

    var floatingContainer = document.getElementById("documentViewerContainer");
    for (var i = 0; i < tempDialogs.length; i++) {
        floatingContainer.removeChild(tempDialogs[i].get_DomElement());
        delete tempDialogs[i];
    }
}

/**
 Creates the dialogs, which are used in Web Document Viewer, for localization.
*/
function __createDocumentViewerDialogsForLocalization(tempDialogs) {
    var floatingContainer = document.getElementById("documentViewerContainer");

    var documentPasswordDialog = new Vintasoft.Imaging.UI.Dialogs.WebUiDocumentPasswordDialogJS();
    documentPasswordDialog.render(floatingContainer);
    tempDialogs.push(documentPasswordDialog);

    var imageSelectionDialog = new Vintasoft.Imaging.DocumentViewer.Dialogs.WebImageSelectionDialogJS();
    imageSelectionDialog.render(floatingContainer);
    tempDialogs.push(imageSelectionDialog);

    var printImagesDialog = new Vintasoft.Imaging.DocumentViewer.Dialogs.WebPrintImagesDialogJS();
    printImagesDialog.render(floatingContainer);
    tempDialogs.push(printImagesDialog);

    var imageViewerSettingsDialog = new Vintasoft.Imaging.DocumentViewer.Dialogs.WebImageViewerSettingsDialogJS();
    imageViewerSettingsDialog.render(floatingContainer);
    tempDialogs.push(imageViewerSettingsDialog);

    var thumbnailViewerSettingsDialog = new Vintasoft.Imaging.DocumentViewer.Dialogs.WebThumbnailViewerSettingsDialogJS();
    thumbnailViewerSettingsDialog.render(floatingContainer);
    tempDialogs.push(thumbnailViewerSettingsDialog);

    var rotateImageWithAnnotationsDialog = new Vintasoft.Imaging.DocumentViewer.Dialogs.WebRotateImageWithAnnotationsDialogJS();
    rotateImageWithAnnotationsDialog.render(floatingContainer);
    tempDialogs.push(rotateImageWithAnnotationsDialog);

    var exportFileSettingsDialog = new Vintasoft.Imaging.DocumentViewer.Dialogs.WebExportFileSettingsDialogJS();
    exportFileSettingsDialog.render(floatingContainer);
    tempDialogs.push(exportFileSettingsDialog);
    
    var annotationCommentSettingsDialog = new Vintasoft.Imaging.DocumentViewer.Dialogs.WebUiAnnotationCommentSettingsDialogJS();
    annotationCommentSettingsDialog.render(floatingContainer);
    tempDialogs.push(annotationCommentSettingsDialog);


    // create annotation viewer context menu panel
    var annoViewerContextMenu = new Vintasoft.Imaging.DocumentViewer.UIElements.WebAnnotationViewerContextMenuJS();
    annoViewerContextMenu.render(floatingContainer);
    tempDialogs.push(annoViewerContextMenu);

    // create thumbnail viewer context menu panel
    var thumbnailViewerContextMenu = new Vintasoft.Imaging.DocumentViewer.UIElements.WebThumbnailViewerContextMenuJS(_docViewer._thumbnailViewer, {});
    thumbnailViewerContextMenu.render(floatingContainer);
    tempDialogs.push(thumbnailViewerContextMenu);
}

/**
 Creates the dialogs, which are used in this demo, for localization.
*/
function __createDemoDialogsForLocalization(tempDialogs) {
    var floatingContainer = document.getElementById("documentViewerContainer");

    var textAnnotation = new Vintasoft.Imaging.Annotation.UI.WebTextAnnotationViewJS();

    // create the property grid with information about annotation properties
    var propertyGrid = new Vintasoft.Shared.WebPropertyGridJS(textAnnotation);

    // create the image processing dialog
    var annotationSettingsDialog = new Vintasoft.Imaging.UI.Dialogs.WebUiPropertyGridDialogJS(
        propertyGrid,
        {
            title: "Annotation settings",
            cssClass: "vsui-dialog annotationSettings",
            localizationId: "annotationSettingsDialog"
        });
    annotationSettingsDialog.render(floatingContainer);
    tempDialogs.push(annotationSettingsDialog);
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

    // subscribe to the "contextMenuShown" event of document viewer
    Vintasoft.Shared.subscribeToEvent(_docViewer, "contextMenuShown", function (event, data) {
        _localizer.localizeDocument();
    });
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
    // specify that the meain menu should contain the annotation menu
    docViewerSettings.set_ShowAnnotationMenuInMainMenu(true);
    // specify that the side panel should contain the annotation list panel
    docViewerSettings.set_ShowAnnotationListPanelInSidePanel(true);
    // specify that the side panel should contain the annotation comment list panel
    docViewerSettings.set_ShowAnnotationCommentListPanelInSidePanel(true);
    // specify that document viewer should show "Export and download file" button instead of "Download file" button
    docViewerSettings.set_CanExportAndDownloadFile(true);
    docViewerSettings.set_CanDownloadFile(false);
    docViewerSettings.set_CanAddFile(true);
    docViewerSettings.set_CanClearSessionCache(true);

    // initialize main menu of document viewer
    __initMenu(docViewerSettings);

    // initialize side panel of document viewer
    __initSidePanel(docViewerSettings);

    // create the document viewer
    _docViewer = new Vintasoft.Imaging.DocumentViewer.WebDocumentViewerJS(docViewerSettings);

    // initialize image viewer panel of document viewer
    __initImageViewerPanel(_docViewer);

    // initialize sing and fill panel in side panel of document viewer.
    __initSingAndFillPanel(_docViewer);

    _docViewer.set_CurrentUser("Guest");

    // subscribe to the "warningOccured" event of document viewer
    Vintasoft.Shared.subscribeToEvent(_docViewer, "warningOccured", __docViewer_warningOccured);
    // subscribe to the asyncOperationStarted event of document viewer
    Vintasoft.Shared.subscribeToEvent(_docViewer, "asyncOperationStarted", __docViewer_asyncOperationStarted);
    // subscribe to the asyncOperationFinished event of document viewer
    Vintasoft.Shared.subscribeToEvent(_docViewer, "asyncOperationFinished", __docViewer_asyncOperationFinished);
    // subscribe to the asyncOperationFailed event of document viewer
    Vintasoft.Shared.subscribeToEvent(_docViewer, "asyncOperationFailed", __docViewer_asyncOperationFailed);

    // subscribe to the events of the annotation comment list panel
    __subscribeToAnnotationCommentListPanelEvents();

    // initialize visual tools
    __initializeVisualTools(_docViewer);

    // get the thumbnail viewer of document viewer
    var thumbnailViewer1 = _docViewer.get_ThumbnailViewer();
    thumbnailViewer1.set_CanDragThumbnails(true);

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
        // create the dictionary for localization of application UI
        //__createUiLocalizationDictionary();

        // enable the localization of application UI
        __enableUiLocalization();
    });
}



// run main function
__main();
