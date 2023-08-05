sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
 ], function (UIComponent, JSONModel, ResourceModel) {
    "use strict";
    return UIComponent.extend("sap.ui5.walkthrough.Component", {
       metadata : {
          interfaces: ["sap.ui.core.IAsyncContentCreation"],
          manifest: "json"
       },
       init : function () {
          UIComponent.prototype.init.apply(this, arguments);
          var oData = {
             recipient : {
                name : "什么是 SAP UI5 应用的描述符 Descriptor"
             }
          };
          var oModel = new JSONModel(oData);
          this.setModel(oModel);
 
          var i18nModel = new ResourceModel({
             bundleName: "sap.ui5.walkthrough.i18n.i18n"
          });
          this.setModel(i18nModel, "i18n");
       }
    });
 });