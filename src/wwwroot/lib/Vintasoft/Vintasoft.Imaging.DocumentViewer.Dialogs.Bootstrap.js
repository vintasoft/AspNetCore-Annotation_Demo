﻿// Copyright 2014-2023 VintaSoft Ltd. All rights reserved.
// This software is protected by International copyright laws.
// Any copying, duplication, deployment, redistribution, modification or other
// disposition hereof is STRICTLY PROHIBITED without an express written license
// granted by VintaSoft Ltd. This notice may not be removed or otherwise
// altered under any circumstances.
// This code may NOT be used apart of the VintaSoft product.
var Vintasoft;
(function(d){function a(a,d,h){a=s[a];for(var b="",n=d;n<d+h;n++)b+=String.fromCharCode(a[n]^4095);return b}if(void 0==d||void 0==d.Shared)throw Error("Vintasoft.Shared is not found.");if("4.0.0.3"!==d.version)throw Error("Wrong version of Vintasoft.Shared script.");if(void 0==d.Imaging)throw Error("Vintasoft.Imaging is not found.");if("12.2.12.1"!==d.Imaging.version)throw Error("Wrong version of Vintasoft.Imaging script.");if(void 0==d.Imaging.DocumentViewer)throw Error("Vintasoft.Imaging.DocumentViewer is not found.");if("12.2.12.1"!==
d.Imaging.DocumentViewer.version)throw Error("Wrong version of Vintasoft.Imaging.DocumentViewer script.");var s=[];s.push([3977,3980,3978,3990,4050,3995,3990,3998,3987,3984,3992,4063,3981,3984,3979,3998,3979,3994,4022,3986,3998,3992,3994,4008,3990,3979,3991,4030,3985,3985,3984,3979,3998,3979,3990,3984,3985,3980,4022,3986,3998,3992,3994,4063,3977,3990,3994,3976,3994,3981,4063,3980,3994,3979,3979,3990,3985,3992,3980,4015,4027,4025,4063,3981,3994,3995,3998,3996,3979,3990,3984,3985,4063,3986,3998,3981,
3988,4063,3998,3983,3983,3994,3998,3981,3998,3985,3996,3994,4047,3983,3975,3977,3980,3980,3995,3994,4050,3995,3990,3998,3987,3984,3992,4050,3996,3998,3985,3996,3994,3987,4029,3978,3979,3979,3984,3985,3998,3978,3979,3991,3994,3985,3979,3990,3996,3998,3979,3990,3984,3985,4025,3998,3990,3987,3994,3995,3977,3980,3980,3995,3994,4050,3995,3990,3998,3987,3984,3992,4050,3984,3988,4029,3978,3979,3979,3984,3985,3997,3979,3985,4063,3997,3979,3985,4050,3995,3994,3993,3998,3978,3987,3979,3996,3998,3985,3996,3994,
3987,4029,3978,3979,3979,3984,3985,4028,3987,3990,3996,3988,3994,3995,3986,3984,3995,3998,3987,4050,3979,3990,3979,3987,3994,3977,3980,3980,3995,3994,4050,3990,3986,3998,3992,3994,4009,3990,3994,3976,3994,3981,4012,3994,3979,3979,3990,3985,3992,3980,4027,3990,3998,3987,3984,3992,4050,3979,3990,3979,3987,3994,3979,3991,3978,3986,3997,3985,3998,3990,3987,4009,3990,3994,3976,3994,3981,4012,3994,3979,3979,3990,3985,3992,3980,4027,3990,3998,3987,3984,3992,3980,3994,3987,3994,3996,3979,4011,3976,3998,3990,
3985,4027,3994,3977,3990,3996,3994,4027,3990,3998,3987,3984,3992,3977,3980,3980,3995,3994,4050,3983,3995,3993,4013,3994,3995,3998,3996,3979,3990,3984,3985,4018,3998,3981,3988,4030,3983,3983,3994,3998,3981,3998,3985,3996,3994,4027,3990,3998,3987,3984,3992,4050,3979,3990,3979,3987,3994,4012,3994,3987,3994,3996,3979,4063,3990,3986,3998,3992,3994,3980,3977,3980,3978,3990,4050,3995,3990,3998,3987,3984,3992,3977,3980,3978,3990,4050,3995,3990,3998,3987,3984,3992,4063,3983,3995,3993,4013,3994,3995,3998,3996,
3979,3990,3984,3985,4018,3998,3981,3988,4030,3983,3983,3994,3998,3981,3998,3985,3996,3994,3980,3994,3987,3994,3996,3979,4022,3986,3998,3992,3994,3980,4027,3990,3998,3987,3984,3992,3977,3980,3978,3990,4050,3995,3990,3998,3987,3984,3992,4063,3977,3980,3995,3977,4050,3983,3981,3990,3985,3979,4022,3986,3998,3992,3994,3980,4027,3990,3998,3987,3984,3992,3977,3980,3980,3995,3994,4050,3983,3981,3990,3985,3979,4022,3986,3998,3992,3994,3980,4027,3990,3998,3987,3984,3992,4050,3979,3990,3979,3987,3994,3983,3995,
3993,4013,3994,3995,3998,3996,3979,3990,3984,3985,4018,3998,3981,3988,4030,3983,3983,3994,3998,3981,3998,3985,3996,3994,4027,3990,3998,3987,3984,3992,4016,4020,4013,3984,3979,3998,3979,3994,4063,3990,3986,3998,3992,3994,4063,3976,3990,3979,3991,4063,3998,3985,3985,3984,3979,3998,3979,3990,3984,3985,3980,3996,3998,3985,3996,3994,3987,4029,3978,3979,3979,3984,3985,3977,3980,3980,3995,3994,4050,3979,3976,3998,3990,3985,4027,3994,3977,3990,3996,3994,4012,3994,3987,3994,3996,3979,3990,3984,3985,4027,3990,
3998,3987,3984,3992,4050,3979,3990,3979,3987,3994,3977,3980,3978,3990,4050,3995,3990,3998,3987,3984,3992,4028,3984,3985,3979,3994,3985,3979,4015,3981,3990,3985,3979,4063,3990,3986,3998,3992,3994,3980,3977,3980,3978,3990,4050,3995,3990,3998,3987,3984,3992,4063,3977,3980,3995,3977,4050,3980,3994,3987,3994,3996,3979,4022,3986,3998,3992,3994,3980,4027,3990,3998,3987,3984,3992,3977,3980,3980,3995,3994,4050,3981,3984,3979,3998,3979,3994,4022,3986,3998,3992,3994,4008,3990,3979,3991,4030,3985,3985,3984,3979,
3998,3979,3990,3984,3985,3980,4027,3990,3998,3987,3984,3992,4050,3979,3990,3979,3987,3994,3981,3984,3979,3998,3979,3994,4022,3986,3998,3992,3994,4008,3990,3979,3991,4030,3985,3985,3984,3979,3998,3979,3990,3984,3985,3980,4027,3990,3998,3987,3984,3992,4027,3984,3996,3978,3986,3994,3985,3979,4063,3983,3998,3980,3980,3976,3984,3981,3995,3979,3976,3998,3990,3985,4027,3994,3977,3990,3996,3994,4028,3998,3983,3998,3997,3990,3987,3990,3979,3990,3994,3980,4027,3990,3998,3987,3984,3992,3997,3979,3985,4063,3997,
3979,3985,4050,3983,3981,3990,3986,3998,3981,3974,3984,3988,4029,3978,3979,3979,3984,3985,3977,3980,3978,3990,4050,3995,3990,3998,3987,3984,3992,4063,3979,3991,3978,3986,3997,3985,3998,3990,3987,4009,3990,3994,3976,3994,3981,4012,3994,3979,3979,3990,3985,3992,3980,3997,3994,3992,3990,3985,4015,3981,3990,3985,3979,3984,3988,4029,3978,3979,3979,3984,3985,4028,3987,3990,3996,3988,3994,3995,3006,3998,3985,3996,3994,3987,4029,3978,3979,3979,3984,3985,3995,3984,3996,3978,3986,3994,3985,3979,4015,3998,3980,
3980,3976,3984,3981,3995,4027,3990,3998,3987,3984,3992,3977,3980,3980,3995,3994,4050,3995,3984,3996,3978,3986,3994,3985,3979,4015,3998,3980,3980,3976,3984,3981,3995,4027,3990,3998,3987,3984,3992,4050,3979,3990,3979,3987,3994,4028,3998,3985,3996,3994,3987,3998,3978,3979,3991,3994,3985,3979,3990,3996,3998,3979,3990,3984,3985,4012,3978,3996,3996,3994,3994,3995,3994,3995,3977,3980,3978,3990,4050,3995,3990,3998,3987,3984,3992,4063,3990,3986,3998,3992,3994,4009,3990,3994,3976,3994,3981,4012,3994,3979,3979,
3990,3985,3992,3980,3977,3980,3980,3995,3994,4050,3979,3991,3978,3986,3997,3985,3998,3990,3987,4009,3990,3994,3976,3994,3981,4012,3994,3979,3979,3990,3985,3992,4027,3990,3998,3987,3984,3992,4050,3979,3990,3979,3987,3994,4046,3983,3975,4063,3980,3984,3987,3990,3995,4063,3992,3981,3998,3974,3977,3980,3980,3995,3994,4050,3979,3976,3998,3990,3985,4027,3994,3977,3990,3996,3994,4028,3998,3983,3998,3997,3990,3987,3990,3979,3990,3994,3980,4027,3990,3998,3987,3984,3992,4050,3979,3990,3979,3987,3994,4011,3991,
3978,3986,3997,3985,3998,3990,3987,4063,3977,3990,3994,3976,3994,3981,4063,3980,3994,3979,3979,3990,3985,3992,3980,3977,3980,3978,3990,4050,3995,3990,3998,3987,3984,3992,4063,3979,3976,3998,3990,3985,4027,3994,3977,3990,3996,3994,4028,3998,3983,3998,3997,3990,3987,3990,3979,3990,3994,3980,4012,3994,3987,3994,3996,3979,4063,4011,4008,4030,4022,4017,4063,3995,3994,3977,3990,3996,3994,3983,3981,3990,3985,3979,4022,3986,3998,3992,3994,3980,4027,3990,3998,3987,3984,3992,3990,3986,3998,3992,3994,4009,3990,
3994,3976,3994,3981,4012,3994,3979,3979,3990,3985,3992,3980,4027,3990,3998,3987,3984,3992,4011,4008,4030,4022,4017,4063,3995,3994,3977,3990,3996,3994,4063,3996,3998,3983,3998,3997,3990,3987,3990,3979,3990,3994,3980,3977,3980,3978,3990,4050,3995,3990,3998,3987,3984,3992,4063,3980,3994,3987,3994,3996,3979,4011,3976,3998,3990,3985,4027,3994,3977,3990,3996,3994,3990,3986,3998,3992,3994,3980,4015,3981,3994,3983,3998,3981,3998,3979,3990,3984,3985,4025,3998,3990,3987,3994,3995,3977,3980,3980,3995,3994,4050,
3990,3986,3998,3992,3994,4012,3994,3987,3994,3996,3979,3990,3984,3985,4027,3990,3998,3987,3984,3992,4050,3979,3990,3979,3987,3994]);d.Imaging=d.Imaging;(function(r){r.DocumentViewer=r.DocumentViewer;(function(r){r.Dialogs={};(function(h){var b=d.Shared,n=d.Imaging,p=r.Panels,s=n.UI,q=s.Dialogs,g=s.UIElements,t=function(){var l=t.superclass,f=t.prototype;f.okButtonClicked=function(a){};f.cancelButtonClicked=function(a){};b.VintasoftLocalizationJS.setStringConstant(a(0,1282,32),a(0,335,13));b.VintasoftLocalizationJS.setStringConstant(a(0,
136,21),a(0,510,2));b.VintasoftLocalizationJS.setStringConstant(a(0,91,25),a(0,929,6));var c=this;this._9473=!1;var e=new g.WebUiLabelElementJS({text:b.VintasoftLocalizationJS.getStringConstant(a(0,1282,32)),cssClass:a(0,191,11)});e.set_HeaderIndex(5);var k=new p.WebUiImageSelectionPanelJS({cssClass:a(0,591,18)});this._4909=k;var B=new g.WebUiButtonInputJS({cssClass:a(0,778,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,136,21)),localizationId:a(0,793,8),onClick:{callback:function(){c._9473=
!0;c._7603(a(0,846,15));c.hide();c._9473=!1}}}),d=new g.WebUiButtonInputJS({cssClass:a(0,157,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,91,25)),localizationId:a(0,861,12),onClick:{callback:function(){c.hide();c._9473||c._7603(a(0,172,19))}}}),C={cssClass:a(0,621,35),localizationId:a(0,397,18)};l.constructor.call(this,[e],[k],[B,d],C);delete f.okButtonClicked;delete f.cancelButtonClicked;f.getSelectedImages=function(){return this._4909.getSelectedImages()}};b.extend(t,q.WebUiDialogJS);
var x=function(){var l=x.superclass;b.VintasoftLocalizationJS.setStringConstant(a(0,449,29),a(0,609,12));b.VintasoftLocalizationJS.setStringConstant(a(0,136,21),a(0,510,2));b.VintasoftLocalizationJS.setStringConstant(a(0,91,25),a(0,929,6));var f=this,c=new g.WebUiLabelElementJS({text:b.VintasoftLocalizationJS.getStringConstant(a(0,449,29)),cssClass:a(0,191,11)});c.set_HeaderIndex(5);var e=new p.WebUiPrintImagesSettingsPanelJS({cssClass:a(0,591,18)});this._13875=e;var k={d:this};b.suf23(e,a(0,836,
10),k,function(a){a.data.d.hide()});b.suf23(e,a(0,1259,23),k,function(a){a.data.d.hide()});var k=new g.WebUiButtonInputJS({cssClass:a(0,778,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,136,21)),localizationId:a(0,793,8),onClick:{callback:function(){f._13875.print()}}}),d=new g.WebUiButtonInputJS({cssClass:a(0,157,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,91,25)),localizationId:a(0,541,12),onClick:{callback:function(){f._13875.abort();f.hide()}}}),m={cssClass:a(0,415,34),
localizationId:a(0,1163,17)};l.constructor.call(this,[c],[e],[k,d],m)};b.extend(x,q.WebUiDialogJS);var y=function(){var l=y.superclass;b.VintasoftLocalizationJS.setStringConstant(a(0,202,37),a(0,38,21));b.VintasoftLocalizationJS.setStringConstant(a(0,136,21),a(0,510,2));b.VintasoftLocalizationJS.setStringConstant(a(0,91,25),a(0,929,6));var f=this,c=new g.WebUiLabelElementJS({text:b.VintasoftLocalizationJS.getStringConstant(a(0,202,37)),cssClass:a(0,191,11)});c.set_HeaderIndex(5);var e=new p.WebUiImageViewerSettingsPanelJS({cssClass:a(0,
591,18),css:{padding:a(0,88,3),border:a(0,1029,14)}});this._5401=e;var k=new g.WebUiButtonInputJS({cssClass:a(0,778,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,136,21)),localizationId:a(0,793,8),onClick:{callback:function(){f._5401.applySettings();f.hide()}}}),d=new g.WebUiButtonInputJS({cssClass:a(0,157,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,91,25)),localizationId:a(0,861,12),onClick:{callback:function(){f.hide()}}}),m={cssClass:a(0,958,31),localizationId:a(0,1180,
25)};l.constructor.call(this,[c],[e],[k,d],m)};b.extend(y,q.WebUiDialogJS);var u=function(){var l=u.superclass;b.VintasoftLocalizationJS.setStringConstant(a(0,989,40),a(0,1084,25));b.VintasoftLocalizationJS.setStringConstant(a(0,136,21),a(0,510,2));b.VintasoftLocalizationJS.setStringConstant(a(0,91,25),a(0,929,6));var f=this,c=new g.WebUiLabelElementJS({text:b.VintasoftLocalizationJS.getStringConstant(a(0,989,40)),cssClass:a(0,191,11)});c.set_HeaderIndex(5);var e=new p.WebUiThumbnailViewerSettingsPanelJS({cssClass:a(0,
591,18)});this._8397=e;var k=new g.WebUiButtonInputJS({cssClass:a(0,778,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,136,21)),localizationId:a(0,793,8),onClick:{callback:function(){f._8397.applySettings();f.hide()}}}),d=new g.WebUiButtonInputJS({cssClass:a(0,157,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,91,25)),localizationId:a(0,861,12),onClick:{callback:function(){f.hide()}}}),m={cssClass:a(0,801,35),localizationId:a(0,239,29)};l.constructor.call(this,[c],[e],[k,d],
m)};b.extend(u,q.WebUiDialogJS);var z=function(l){var f=z.superclass;b.VintasoftLocalizationJS.setStringConstant(a(0,895,34),a(0,732,17));b.VintasoftLocalizationJS.setStringConstant(a(0,136,21),a(0,510,2));b.VintasoftLocalizationJS.setStringConstant(a(0,91,25),a(0,929,6));var c=this,e=new g.WebUiLabelElementJS({text:b.VintasoftLocalizationJS.getStringConstant(a(0,895,34)),cssClass:a(0,191,11)});e.set_HeaderIndex(5);this._8833=l=new p.WebUiDocumentPasswordPanelJS({cssClass:a(0,591,18)},l);b.subscribeToEvent(l,
a(0,935,23),function(a,b){c._7603(a.type,b);c.hide()});b.subscribeToEvent(l,a(0,116,20),function(a,b){c._7603(a.type,b)});var d=new g.WebUiButtonInputJS({cssClass:a(0,778,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,136,21)),localizationId:a(0,793,8),onClick:{callback:function(){c._8833.authenticateFile()}}}),h=new g.WebUiButtonInputJS({cssClass:a(0,157,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,91,25)),localizationId:a(0,861,12),onClick:{callback:function(){c.hide()}}}),
m={cssClass:a(0,348,11),localizationId:a(0,873,22)};f.constructor.call(this,[e],[l],[d,h],m)};b.extend(z,q.WebUiDialogJS);if(n.Annotation){var A=function(){var d=A.superclass;b.VintasoftLocalizationJS.setStringConstant(a(0,656,44),a(0,512,29));b.VintasoftLocalizationJS.setStringConstant(a(0,136,21),a(0,510,2));b.VintasoftLocalizationJS.setStringConstant(a(0,91,25),a(0,929,6));var f=this,c=new g.WebUiLabelElementJS({text:b.VintasoftLocalizationJS.getStringConstant(a(0,656,44)),cssClass:a(0,191,11)});
c.set_HeaderIndex(5);var e=new p.WebUiRotateImageWithAnnotationsPanelJS({cssClass:a(0,591,18)});this._2900=e;var k=new g.WebUiButtonInputJS({cssClass:a(0,778,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,136,21)),localizationId:a(0,793,8),onClick:{callback:function(){f._2900.rotate();f.hide()}}}),h=new g.WebUiButtonInputJS({cssClass:a(0,157,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,91,25)),localizationId:a(0,541,12),onClick:{callback:function(){f.hide()}}}),m={cssClass:a(0,
0,38),localizationId:a(0,700,32)};d.constructor.call(this,[c],[e],[k,h],m)};b.extend(A,q.WebUiDialogJS);h.WebRotateImageWithAnnotationsDialogJS=A}n.Pdf&&(n=function(){var d=u.superclass;b.VintasoftLocalizationJS.setStringConstant(a(0,291,44),a(0,59,29));b.VintasoftLocalizationJS.setStringConstant(a(0,136,21),a(0,510,2));var f=this,c=new g.WebUiLabelElementJS({text:b.VintasoftLocalizationJS.getStringConstant(a(0,291,44)),cssClass:a(0,191,11)});c.set_HeaderIndex(5);var e=new p.WebUiPdfRedactionMarkAppearancePanelJS({cssClass:a(0,
591,18)});this._5447=e;var k=new g.WebUiButtonInputJS({cssClass:a(0,778,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,136,21)),localizationId:a(0,793,8),onClick:{callback:function(){f.hide()}}}),h={cssClass:a(0,359,38),localizationId:a(0,478,32)};d.constructor.call(this,[c],[e],[k],h)},b.extend(n,q.WebUiDialogJS),h.WebPdfRedactionMarkAppearanceDialogJS=n);if(d.Twain){var v=function(d){var f=v.superclass,c=v.prototype;c.okButtonClicked=function(a,b){};c.cancelButtonClicked=function(a){};
b.VintasoftLocalizationJS.setStringConstant(a(0,553,38),a(0,1144,19));b.VintasoftLocalizationJS.setStringConstant(a(0,136,21),a(0,510,2));b.VintasoftLocalizationJS.setStringConstant(a(0,91,25),a(0,929,6));this._3694=d=new p.WebUiTwainSelectDevicePanelJS({cssClass:a(0,591,18)},d);var e=this,k=new g.WebUiLabelElementJS({text:b.VintasoftLocalizationJS.getStringConstant(a(0,553,38)),cssClass:a(0,191,11)});k.set_HeaderIndex(5);delete c.okButtonClicked;delete c.cancelButtonClicked;var h=new g.WebUiButtonInputJS({cssClass:a(0,
778,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,136,21)),localizationId:a(0,793,8),onClick:{callback:function(){e.hide();var b=e._3694,c=b.get_SelectedDevice(),d=b.get_ShowUI(),b=b.get_ChangeDeviceCapabilities();e._7603(a(0,846,15),{showUI:d,changeDeviceCapabilities:b,device:c})}}}),m=new g.WebUiButtonInputJS({cssClass:a(0,157,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,91,25)),localizationId:a(0,861,12),onClick:{callback:function(){e.hide();e._7603(a(0,172,19))}}}),n=
{cssClass:a(0,1230,29),localizationId:a(0,268,23)};f.constructor.call(this,[k],[d],[h,m],n);c.get_ShowUI=function(){return this._3694.get_ShowUI()};c.get_ChangeDeviceCapabilities=function(){return this._3694.get_ChangeDeviceCapabilities()};c.get_SelectedDevice=function(){return this._3694.get_SelectedDevice()}};b.extend(v,q.WebUiDialogJS);var w=function(d){var f=w.superclass,c=w.prototype;c.okButtonClicked=function(a){};c.cancelButtonClicked=function(a){};b.VintasoftLocalizationJS.setStringConstant(a(0,
1043,41),a(0,1205,25));b.VintasoftLocalizationJS.setStringConstant(a(0,136,21),a(0,510,2));b.VintasoftLocalizationJS.setStringConstant(a(0,91,25),a(0,929,6));this._10985=d=new p.WebUiTwainDeviceCapabilitiesPanelJS({cssClass:a(0,591,18)},d);var e=this,k=new g.WebUiLabelElementJS({text:b.VintasoftLocalizationJS.getStringConstant(a(0,1043,41)),cssClass:a(0,191,11)});k.set_HeaderIndex(5);delete c.okButtonClicked;delete c.cancelButtonClicked;var c=new g.WebUiButtonInputJS({cssClass:a(0,778,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,
136,21)),localizationId:a(0,793,8),onClick:{callback:function(){e.hide();e._7603(a(0,846,15))}}}),h=new g.WebUiButtonInputJS({cssClass:a(0,157,15),value:b.VintasoftLocalizationJS.getStringConstant(a(0,91,25)),localizationId:a(0,541,12),onClick:{callback:function(){e.hide();e._7603(a(0,172,19))}}}),m={cssClass:a(0,1109,35),localizationId:a(0,749,29)};f.constructor.call(this,[k],[d],[c,h],m)};b.extend(w,q.WebUiDialogJS);h.WebTwainDeviceSelectionDialogJS=v;h.WebTwainDeviceCapabilitiesDialogJS=w}h.WebImageSelectionDialogJS=
t;h.WebPrintImagesDialogJS=x;h.WebImageViewerSettingsDialogJS=y;h.WebThumbnailViewerSettingsDialogJS=u;h.WebUiDocumentPasswordDialogJS=z})(r.Dialogs)})(r.DocumentViewer)})(d.Imaging)})(Vintasoft);
