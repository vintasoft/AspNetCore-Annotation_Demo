/**
 A helper that helps to create UI for image annotating.
*/
AnnotationUiHelperJS = function () {

    var _annotationContextMenu;

    Vintasoft.Shared.VintasoftLocalizationJS.setStringConstant("vssde-annotationPanel-pageLabel", "Page");
    Vintasoft.Shared.VintasoftLocalizationJS.setStringConstant("vssde-annotationPanel-annotationPropertiesLabel", "Annotation Properties");



    /**
     Initializes the annotation context menu.
    */
    AnnotationUiHelperJS.prototype.initAnnotationContextMenu = function (docViewerSettings, imageViewerPanel) {
        // get items of document viewer
        var items = docViewerSettings.get_Items();

        // get the image viewer panel
        var imageViewerPanel = items.getItemByRegisteredId("imageViewerPanel");
        // if panel exists
        if (imageViewerPanel != null) {
            // create the context menu for annotations
            _annotationContextMenu = Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.createElementById("annotationContextMenu");

            // set the callback function for showing of annotation properties
            _annotationContextMenu.set_ShowAnnotationPropertiesCallback(__showAnnotationPropertyGrid);

            // subscribe to the "showing" event of annotation context menu
            Vintasoft.Shared.subscribeToEvent(_annotationContextMenu, "showing", __annotationContextMenu_showing);

            // subscribe to the "activated" event of annotation context menu
            Vintasoft.Shared.subscribeToEvent(_annotationContextMenu, "activated", __annotationContextMenu_activated);

            // set the annotation context menu as the context menu of image viewer
            imageViewerPanel.set_ContextMenu(_annotationContextMenu);
        }
    }

    /**
     Initializes the annotation panel.
    */
    AnnotationUiHelperJS.prototype.initAnnotationPanel = function (sidePanelItems) {
        var annotationsPanel = new Vintasoft.Imaging.UI.UIElements.WebUiElementsFactoryJS.createElementById("annotationsPanel");
        // set the callback function for creating record for annotation
        annotationsPanel.set_CreateAnnotationContentCallback(__createContentForAnnotationRecord);
        // set the callback function for creating record for annotation collection header
        annotationsPanel.set_CreateCollectionHeaderContentCallback(__createContentForAnnotationCollectionHeader);

        sidePanelItems.addItem(annotationsPanel);
    }

    /**
     * Initializes the annotation visual tool.
     * @param docViewer The document viewer.
     */
    AnnotationUiHelperJS.prototype.initializeAnnotationVisualTool = function (docViewer) {
        /**
         * Focused annotation view collection is changed in annotation visual tool.
         */
        function __annotationVisualTool_focusedAnnotationCollectionChanged(event, eventArgs) {
            if (eventArgs.previouslyFocusedCollection != null) {
                Vintasoft.Shared.unsubscribeFromEvent(eventArgs.previouslyFocusedCollection, "changed", __annotationViewCollection_changed);
            }

            if (eventArgs.focusedCollection != null) {
                Vintasoft.Shared.subscribeToEvent(eventArgs.focusedCollection, "changed", __annotationViewCollection_changed);
            }
        }

        /**
         * Annotation view collection is changed.
         */
        function __annotationViewCollection_changed(event, eventArgs) {
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
            // if annotation is clicked and it was left mouse button
            if (eventArgs.eventName === 'click' && button === 1) {
                var link = this.get_HyperLink();
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
        Vintasoft.Shared.subscribeToEvent(annotationVisualTool, "focusedAnnotationCollectionChanged", __annotationVisualTool_focusedAnnotationCollectionChanged);
    }


    /**
     Annotation context menu is showing.
    */
    function __annotationContextMenu_showing(event, eventArgs) {
        // get the document viewer
        var docViewer = this.get_RootControl();
        // if document viewer exists
        if (docViewer != null) {
            var position = eventArgs.position;
            var viewer = docViewer.get_ImageViewer();
            var annotationVisualTool = viewer.get_AnnotationVisualTool();
            // find annotation under mouse cursor
            var annotation = annotationVisualTool.findAnnotationView(position.x, position.y);
            // set annotation under mouse cursor as focused annotation
            annotationVisualTool.set_FocusedAnnotationView(annotation);
        }
    }

    /**
     Annotation context menu is activated.
    */
    function __annotationContextMenu_activated() {
        // get the document viewer
        var docViewer = this.get_RootControl();
        // get the annotation viewer
        var annotationViewer = docViewer.get_ImageViewer();

        // subscribe to the "annotationInteractionModeChanged" event of annotation viewer
        Vintasoft.Shared.subscribeToEvent(annotationViewer, "annotationInteractionModeChanged", __annotationViewer_annotationInteractionModeChanged);
    }

    /**
     Annotation interaction mode is changed in annotation viewer.
    */
    function __annotationViewer_annotationInteractionModeChanged(event, eventArgs) {
        // get the annotation interaction mode
        var annotationInteractionMode = eventArgs.mode;
        // if annotation interaction mode is Author
        if (annotationInteractionMode.toString() === "Author") {
            // enable the annotation context menu
            _annotationContextMenu.set_IsEnabled(true);
        }
        // if annotation interaction mode is NOT Author
        else {
            // disable the annotation context menu
            _annotationContextMenu.set_IsEnabled(false);
        }
    }

    /**
     Shows the property grid dialog with information about annotation.
     @param {object} annotation Annotation, which should be shown in property grid dialog.
    */
    function __showAnnotationPropertyGrid(annotation) {
        var dlg = new AnnotationSettingsDialogJS(annotation);
        _localizer.localizeDocument();
        dlg.show();
    }

    /**
     Returns UI elements, which will display information about annotation. 
     @param {object} annotation Annotation.
     @param {object} annotationCollection Annotation collection.
     */
    function __createContentForAnnotationRecord(annotation, annotationCollection) {
        // labels
        var labelsElements = [];

        // get annotation name
        var annotationName = annotation.get_Name();
        // if name is not empty
        if (annotationName !== "") {
            // create label
            var nameLabel = new Vintasoft.Imaging.UI.UIElements.WebUiLabelElementJS({ text: annotationName, cssClass: "annotation-name" });
            // add label
            labelsElements.push(nameLabel);
            // add br element
            labelsElements.push("br");
        }

        // get annotation type
        var annotationType = annotation.get_Type();
        // create label 
        var typeLabel = new Vintasoft.Imaging.UI.UIElements.WebUiLabelElementJS({ text: annotationType });
        labelsElements.push(typeLabel);
        labelsElements.push("br");

        // get annotation creation time
        var creationTime = annotation.get_CreationTime();
        var dateLabel = new Vintasoft.Imaging.UI.UIElements.WebUiLabelElementJS({
            text: creationTime.toLocaleString(),
            cssClass: "annotation-creationTime"
        });
        labelsElements.push(dateLabel);

        // create container for all labels
        var labelsContainer = new Vintasoft.Imaging.UI.UIElements.WebUiElementContainerJS(labelsElements, { cssClass: "annotation-labels" });

        // create annotation properties button
        var annotationSettingsButton = new Vintasoft.Imaging.UI.UIElements.WebUiButtonJS({
            cssClass: "annotationSettingsButton",
            title: Vintasoft.Shared.VintasoftLocalizationJS.getStringConstant("vssde-annotationPanel-annotationPropertiesLabel"),
            onClick: function () {
                __showAnnotationPropertyGrid(annotation);
            }
        });

        // return elements
        return [labelsContainer, annotationSettingsButton];
    }

    /**
     Returns UI elements, which will display information about annotation collection. 
     @param {object} annotationCollection Annotation collection.
     @param {number} index Zero-based index of annotation collection.
     */
    function __createContentForAnnotationCollectionHeader(annotationCollection, index) {
        var text = Vintasoft.Shared.VintasoftLocalizationJS.getStringConstant("vssde-annotationPanel-pageLabel") + " #" + (index + 1) + " [" + annotationCollection.get_Count() + "]";
        return [new Vintasoft.Imaging.UI.UIElements.WebUiLabelElementJS({ text: text })];
    }

}
