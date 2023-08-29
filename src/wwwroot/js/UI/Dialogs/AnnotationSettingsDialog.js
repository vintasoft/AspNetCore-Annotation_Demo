/**
 A dialog that allows to show and change annotation settings.
*/
AnnotationSettingsDialogJS = function (annotation) {

    AnnotationSettingsDialogJS.prototype.show = function () {
        $('#annotationSettingsDialog').modal('show');
    }

    AnnotationSettingsDialogJS.prototype.hide = function () {
        $('#annotationSettingsDialog').modal('hide');
    }



    // create the property grid with information about annotation properties
    var propertyGrid = new Vintasoft.Shared.WebPropertyGridJS(annotation);

    // create the property grid control
    var propertyGridControl = new PropertyGridControlJS(propertyGrid, "annotationPropertyGrid");
    propertyGridControl.createMarkup();

}