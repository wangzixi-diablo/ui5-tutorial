sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
 ], function (UIComponent, JSONModel, ResourceModel) {
    "use strict";
    return UIComponent.extend("sap.ui5.walkthrough.Component", {
       metadata : {
          "interfaces": ["sap.ui.core.IAsyncContentCreation"],
          "rootView": {
             "viewName": "sap.ui5.walkthrough.view.App",
             "type": "XML",
             "id": "app"
          }
       },
       init : function () {
          UIComponent.prototype.init.apply(this, arguments);

          jQuery.sap.setObject('saptest.global1', function(){
            alert('全局方法1');
          });
          jQuery.sap.setObject('saptestglobal2', function(){
            alert('全局方法2');
          });
       }
    });
 });