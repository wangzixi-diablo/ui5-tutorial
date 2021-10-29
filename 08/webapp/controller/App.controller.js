sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel"
], function (Controller, MessageToast, JSONModel, ResourceModel) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
		onInit : function () {
			var oData = {
				recipient : {
					name : "SAP UI5 初学者教程之八 - 多语言的支持"
				}
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);
			var i18nModel = new ResourceModel({
				bundleName: "sap.ui5.walkthrough.i18n.i18n"
			 });
			this.getView().setModel(i18nModel, "jerryi18n");
		},
		onShowHello : function () {
			//MessageToast.show("Hello World"); - 步骤7的代码
			var oBundle = this.getView().getModel("jerryi18n").getResourceBundle();
			var sRecipient = this.getView().getModel().getProperty("/recipient/name");
			
			var sMsg = oBundle.getText("helloMsg", [sRecipient]);
			MessageToast.show(sMsg);
		}
	});
});