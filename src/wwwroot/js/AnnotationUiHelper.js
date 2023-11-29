var AnnotationUiHelperJS = function () { }

var _isUserButtonsAddedToContextMenu = false;

/**
 Initializes the annotation context menu for annotation viewer.
 @param imageViewerPanel The imageViewer panel.
 @param docViewer The document viewer.
*/
AnnotationUiHelperJS.initAnnotationViewerContextMenu = function (imageViewerPanel, docViewer) {
    // get image viewer
    var imageViewer = docViewer.get_ImageViewer();
    if (imageViewer == null)
        return;

    // subscribe to the imageViewer.imageContextMenu event
    Vintasoft.Shared.subscribeToEvent(imageViewer, "imageContextMenu", function () {
        // if user buttons are added
        if (_isUserButtonsAddedToContextMenu) {
            return;
        }

        // get the context menu for annotations
        var annotationViewerContextMenu = imageViewerPanel.get_ContextMenu();
        if (annotationViewerContextMenu == null)
            return;

        // get items of annotation context menu
        var annotationViewerContextMenuItems = annotationViewerContextMenu.get_Items();

        // add sub menu divider
        annotationViewerContextMenuItems.addItem("subMenuDivider");

        // add menu item "Set current user to Guest" to the context menu
        var useGuestLabel = new Vintasoft.Imaging.UI.UIElements.WebUiLabelElementJS({ text: "Set current user to Guest", localizationId: "useGuestLabel" });
        var useGuestMenuItem = new Vintasoft.Imaging.UI.UIElements.WebUiElementContainerJS([useGuestLabel], {
            cssClass: "subMenu",
            onClick: {
                callback: function (event, uiElement) {
                    var docViewer = uiElement.get_RootControl();
                    docViewer.set_CurrentUser("Guest");

                    annotationViewerContextMenu.hide();
                },
                data: {}
            }
        });
        annotationViewerContextMenuItems.addItem(useGuestMenuItem);

        // add menu item "Set current user to User1" to the context menu
        var useUser1Label = new Vintasoft.Imaging.UI.UIElements.WebUiLabelElementJS({ text: "Set current user to User1", localizationId: "useUser1Label" });
        var useUser1MenuItem = new Vintasoft.Imaging.UI.UIElements.WebUiElementContainerJS([useUser1Label], {
            cssClass: "subMenu",
            onClick: {
                callback: function (event, uiElement) {
                    var docViewer = uiElement.get_RootControl();
                    docViewer.set_CurrentUser("User1");

                    annotationViewerContextMenu.hide();
                },
                data: {}
            }
        });
        annotationViewerContextMenuItems.addItem(useUser1MenuItem);

        // add menu item "Set current user to User2" to the context menu
        var useUser2Label = new Vintasoft.Imaging.UI.UIElements.WebUiLabelElementJS({ text: "Set current user to User2", localizationId: "useUser2Label" });
        var useUser2MenuItem = new Vintasoft.Imaging.UI.UIElements.WebUiElementContainerJS([useUser2Label], {
            cssClass: "subMenu",
            onClick: {
                callback: function (event, uiElement) {
                    var docViewer = uiElement.get_RootControl();
                    docViewer.set_CurrentUser("User2");

                    annotationViewerContextMenu.hide();
                },
                data: {}
            }
        });
        annotationViewerContextMenuItems.addItem(useUser2MenuItem);

        _isUserButtonsAddedToContextMenu = true;
    });
}

/**
 Initializes the annotation visual tool.
 @param docViewer The document viewer.
*/
AnnotationUiHelperJS.initializeAnnotationVisualTool = function (docViewer) {
    /**
     * Focused annotation view collection is changed in annotation visual tool.
     */
    function annotationVisualTool_focusedAnnotationCollectionChanged(event, eventArgs) {
        if (eventArgs.previouslyFocusedCollection != null) {
            Vintasoft.Shared.unsubscribeFromEvent(eventArgs.previouslyFocusedCollection, "changed", annotationViewCollection_changed);
        }

        if (eventArgs.focusedCollection != null) {
            Vintasoft.Shared.subscribeToEvent(eventArgs.focusedCollection, "changed", annotationViewCollection_changed);
        }
    }

    /**
     * Annotation view collection is changed.
     */
    function annotationViewCollection_changed(event, eventArgs) {
        // if new annotation is inserted in annotation collection
        if (eventArgs.actionName == "insert") {
            // get inserted annotation
            var annotation = eventArgs.annotation;

            // if annotation is ReferencedImage-annotation
            if (annotation.get_Type() == "ReferencedImageAnnotation") {
                // annotation image is not defined
                if (annotation.get_Url() == "") {
                    var defaultImage = new Image();
                    defaultImage.src = "Images/VintaSoftLogo.png";
                    // set an image url when annotation is created
                    annotation.set_Url(defaultImage.src);
                }
            }
            // if annotation is Link-annotation
            else if (annotation.get_Type() == "LinkAnnotation") {
                // subscribe to the "annotationMouseEvent" event of annotation
                Vintasoft.Shared.subscribeToEvent(annotation, 'annotationMouseEvent', __annotation_annotationMouseEvent);
            }
        }
        // if annotation is removed from annotation collection
        else if (eventArgs.actionName == "remove") {
            // get removed annotation
            var annotation = eventArgs.annotation;

            // if annotation is Link-annotation
            if (annotation.get_Type() == "LinkAnnotation") {
                // unsubscribe from the "annotationMouseEvent" event of annotation
                Vintasoft.Shared.unsubscribeFromEvent(annotation, 'annotationMouseEvent', __annotation_annotationMouseEvent);
            }
        }
    }

    /**
     * Mouse is interacting with annotation.
     */
    function __annotation_annotationMouseEvent(event, eventArgs) {
        var originalEvent = eventArgs.originalEvent;
        var button = originalEvent.which;
        // if left mouse button is clicked on annotation
        if (eventArgs.eventName === 'click' && button === 1) {
            var linkAnnotation = this;
            var link = linkAnnotation.get_HyperLink();
            if (link === "")
                return;
            if (link.indexOf("http://") != 0 && link.indexOf("https://") != 0)
                link = "http://" + link;
            // open URL associated with annotation
            window.open(link, "_blank");
        }
    }


    // get annotation viewer, which is used in document viewer
    var annotationViewer = docViewer.get_ImageViewer();
    // get annotation visual, which is used by annotation viewer
    var annotationVisualTool = annotationViewer.get_AnnotationVisualTool();
    // subscribe to the "focusedAnnotationCollectionChanged" of annotationVisualTool
    Vintasoft.Shared.subscribeToEvent(annotationVisualTool, "focusedAnnotationCollectionChanged", annotationVisualTool_focusedAnnotationCollectionChanged);
}
