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
          var oData = {
             recipient : {
                name : "使用 Chrome 开发者工具分析 SAP UI5 应用的 JavaScript 代码执行性能瓶颈"
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