sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
 ], function (UIComponent, JSONModel, ResourceModel) {
    "use strict";
    return UIComponent.extend("sap.ui5.walkthrough.Component", {
       metadata : {
          "interfaces": ["sap.ui.core.IAsyncContentCreation"],
          manifest: "json"
       },
       init : function () {
          UIComponent.prototype.init.apply(this, arguments);
          var oData = {
             recipient : {
                name : "对话框数据"
             }
          };
          var oModel = new JSONModel(oData);
          this.setModel(oModel);
 
          // create the views based on the url/hash
		    this.getRouter().initialize();
       }
    });
 });