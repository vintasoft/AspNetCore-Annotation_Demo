﻿// Copyright 2014-2024 VintaSoft LLC. All rights reserved.
// This software is protected by International copyright laws.
// Any copying, duplication, deployment, redistribution, modification or other
// disposition hereof is STRICTLY PROHIBITED without an express written license
// granted by VintaSoft LLC. This notice may not be removed or otherwise
// altered under any circumstances.
// This code may NOT be used apart of the VintaSoft product.
var Vintasoft;
(function(c){function a(a,c,q){a=e[a];for(var m="",b=c;b<c+q;b++)m+=String.fromCharCode(a[b]^255);return m}if(void 0==c||void 0==c.Shared)throw Error("Vintasoft.Shared is not found.");if("4.4.0.1"!==c.version)throw Error("Wrong version of Vintasoft.Shared script.");if(void 0==c.Imaging)throw Error("Vintasoft.Imaging is not found.");if("14.0.2.1"!==c.Imaging.version)throw Error("Wrong version of Vintasoft.Imaging script.");if(void 0==c.Imaging.Annotation)throw Error("Vintasoft.Imaging.Annotation is not found.");if("14.0.2.1"!==
c.Imaging.Annotation.version)throw Error("Wrong version of Vintasoft.Imaging.Annotation script.");var e=[];e.push([204,207,207,143,135,155,154,147,154,139,154,189,138,139,139,144,145,137,140,138,150,210,155,150,158,147,144,152,188,144,145,139,154,145,139,188,158,145,156,154,147,137,140,138,150,210,155,150,158,147,144,152,210,144,148,189,138,139,139,144,145,137,140,138,150,210,155,150,158,147,144,152,210,156,158,145,156,154,147,189,138,139,139,144,145,144,148,189,138,139,139,144,145,157,139,145,223,
157,139,145,210,143,141,150,146,158,141,134,156,158,145,156,154,147,189,138,139,139,144,145,137,140,138,150,210,155,150,158,147,144,152,223,141,144,139,158,139,154,182,146,158,152,154,168,150,139,151,190,145,145,144,139,158,139,150,144,145,140,146,144,155,158,147,210,139,150,139,147,154,137,140,138,150,210,141,144,139,158,139,154,182,146,158,152,154,168,150,139,151,190,145,145,144,139,158,139,150,144,145,140,187,150,158,147,144,152,210,139,150,139,147,154,204,199,207,143,135,176,180,137,140,138,150,
210,155,150,158,147,144,152,210,155,154,147,154,139,154,189,138,139,139,144,145,158,140,134,145,156,176,143,154,141,158,139,150,144,145,172,139,158,141,139,154,155,137,140,138,150,210,158,145,145,144,139,158,139,150,144,145,188,144,146,146,154,145,139,172,154,139,139,150,145,152,140,187,150,158,147,144,152,210,139,150,139,147,154,187,154,147,154,139,154,173,144,139,158,139,154,223,150,146,158,152,154,223,136,150,139,151,223,158,145,145,144,139,158,139,150,144,145,140,186,155,150,139,223,139,151,154,
223,158,145,145,144,139,158,139,150,144,145,223,156,144,146,146,154,145,139,141,144,139,158,139,154,182,146,158,152,154,168,150,139,151,190,145,145,144,139,158,139,150,144,145,140,187,150,158,147,144,152,158,140,134,145,156,176,143,154,141,158,139,150,144,145,185,150,145,150,140,151,154,155,157,139,145,223,157,139,145,210,155,154,153,158,138,147,139,156,144,146,146,154,145,139,172,154,139,139,150,145,152,140,187,150,158,147,144,152,158,140,134,145,156,176,143,154,141,158,139,150,144,145,185,158,150,
147,154,155]);c.Imaging=c.Imaging;(function(d){d.Annotation=d.Annotation;(function(d){d.UI=d.UI;(function(d){d.Dialogs={};(function(d){var b=c.Shared,e=c.Imaging,f=e.UI,g=f.UIElements,f=f.Dialogs,p=e.Annotation.UI.Panels,k=function(){var c=k.prototype;c.asyncOperationStarted=function(a,b){};c.asyncOperationFinished=function(a,b){};c.asyncOperationFailed=function(a,b){};var d=k.superclass;b.VintasoftLocalizationJS.setStringConstant(a(0,169,43),a(0,312,29));b.VintasoftLocalizationJS.setStringConstant(a(0,
41,20),a(0,217,2));b.VintasoftLocalizationJS.setStringConstant(a(0,61,24),a(0,35,6));var n=this,e=new g.WebUiLabelElementJS({text:b.VintasoftLocalizationJS.getStringConstant(a(0,169,43)),cssClass:a(0,158,11)});e.set_HeaderIndex(5);var h=new p.WebUiRotateImageWithAnnotationsPanelJS({cssClass:a(0,17,18),css:{height:a(0,0,5)}});this._2414=h;b.suf23(h,a(0,243,21),{a:this},function(b,c){b.data.a._21257(a(0,243,21),c)});b.suf23(h,a(0,400,22),{a:this},function(b,c){b.data.a._21257(a(0,400,22),c)});b.suf23(h,
a(0,458,20),{a:this},function(b,c){b.data.a._21257(a(0,458,20),c)});var f=new g.WebUiButtonInputJS({cssClass:a(0,93,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,41,20)),localizationId:a(0,85,8),onClick:{callback:function(){n._2414.rotate();n.hide()}}}),l=new g.WebUiButtonInputJS({cssClass:a(0,422,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,61,24)),localizationId:a(0,108,12),onClick:{callback:function(){n.hide()}}}),r={cssClass:a(0,120,38),localizationId:a(0,368,32)};d.constructor.call(this,
[e],[h],[f,l],r);delete c.asyncOperationStarted;delete c.asyncOperationFinished;delete c.asyncOperationFailed};b.extend(k,f.WebUiDialogJS);var l=function(c){var d=l.prototype,e=l.superclass;d.get_Comment=function(){return this._22145};d.set_Comment=function(a){this._22145=a;this._35007.setComment(a)};d.show=function(){e.show.call(this);this._35007.update()};b.VintasoftLocalizationJS.setStringConstant(a(0,264,42),a(0,341,27));b.VintasoftLocalizationJS.setStringConstant(a(0,41,20),a(0,217,2));b.VintasoftLocalizationJS.setStringConstant(a(0,
219,24),a(0,306,6));b.VintasoftLocalizationJS.setStringConstant(a(0,61,24),a(0,35,6));this._21289=c;this._22145=null;d=new g.WebUiLabelElementJS({text:b.VintasoftLocalizationJS.getStringConstant(a(0,264,42)),cssClass:a(0,158,11)});d.set_HeaderIndex(5);this._35007=c=new p.WebUiAnnotationCommentSettingsPanelJS(c,{css:{height:a(0,212,5)},cssClass:a(0,17,18)});var f=new g.WebUiButtonInputJS({cssClass:a(0,93,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,41,20)),localizationId:a(0,85,8),onClick:{callback:function(a,
c){var b=a.data.a;b.hide();b._35007.editComment();b.set_Comment(null)},data:{a:this}}}),h=new g.WebUiButtonInputJS({cssClass:a(0,422,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,219,24)),localizationId:a(0,5,12),onClick:{callback:function(a,b){var c=a.data.a;c.hide();c._35007.deleteComment();c.set_Comment(null)},data:{a:this}}}),k=new g.WebUiButtonInputJS({cssClass:a(0,422,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,61,24)),localizationId:a(0,108,12),onClick:{callback:function(a,
c){var b=a.data.a;b.hide();b.set_Comment(null)},data:{a:this}}}),m={localizationId:a(0,437,21)};e.constructor.call(this,[d],[c],[f,h,k],m)};b.extend(l,f.WebUiDialogJS);d.WebRotateImageWithAnnotationsDialogJS=k;d.WebUiAnnotationCommentSettingsDialogJS=l})(d.Dialogs)})(d.UI)})(d.Annotation)})(c.Imaging)})(Vintasoft);
