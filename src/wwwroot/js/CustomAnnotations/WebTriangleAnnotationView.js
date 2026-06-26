/**
 Determines how to display the annotation that displays a triangle and how user can interact with annotation.
 @class @public
 @constructor
*/
Vintasoft.Imaging.Annotation.UI.WebTriangleAnnotationViewJS = function () {

    // ==================== BEGIN PROPERTIES ==========================

    /**
     Gets annotation type.
     @returns {string} Annotation type.
     @property @public
    */
    Vintasoft.Imaging.Annotation.UI.WebTriangleAnnotationViewJS.prototype.get_Type = function () {
        return "TriangleAnnotation";
    }

    // ==================== END PROPERTIES ==========================



    // ==================== BEGIN CONSTRUCTOR ==========================

    // call the constructor of base class
    Vintasoft.Imaging.Annotation.UI.WebTriangleAnnotationViewJS.superclass.constructor.call(this);

    // create the point-based builder for point-based annotation
    var pointBasedAnnotationPointBuilder = new Vintasoft.Imaging.Annotation.UI.WebPointBasedAnnotationPointBuilderJS(this);
    // specify the minimum count of points in annotation
    pointBasedAnnotationPointBuilder.set_MinPointCount(3);
    // specify the maximum count of points in annotation
    pointBasedAnnotationPointBuilder.set_MaxPointCount(3);
    // set the builder for annotation
    this.set_Builder(pointBasedAnnotationPointBuilder);

    // specify that builder should be used as current interaction controller
    this.set_InteractionController(pointBasedAnnotationPointBuilder);

    // specify that we will use transformer that is based on points
    this.set_GripMode(new Vintasoft.Imaging.Annotation.WebAnnotationGripModeEnumJS("Points"));

    // set the None type for the annotation fill brush
    this.get_FillBrush().set_Type(new Vintasoft.Imaging.Annotation.WebBrushStyleEnumJS("None"));

    // ==================== END CONSTRUCTOR ==========================

}
Vintasoft.Shared.extend(Vintasoft.Imaging.Annotation.UI.WebTriangleAnnotationViewJS, Vintasoft.Imaging.Annotation.UI.WebPolygonAnnotationViewJS);