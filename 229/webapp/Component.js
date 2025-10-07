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
         // 从 file/data.json 读取数据并作为默认模型
         var oModel = new JSONModel();
         var sDataUrl = sap.ui.require.toUrl("sap/ui5/walkthrough/file/data.json");
         oModel.loadData(sDataUrl);
         this.setModel(oModel); // 先挂载，数据加载完成后会自动更新绑定
         // 可选：监听加载完成/失败（需要时可解开注释）
         // oModel.attachRequestCompleted(function(oEvent){
         //   if(oEvent.getParameter("success")){ console.log("data.json loaded"); }
         // });
         // oModel.attachRequestFailed(function(){ console.error("Failed to load data.json"); });
      }
   });
});