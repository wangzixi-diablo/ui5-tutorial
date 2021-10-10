sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
		onInit : function () {
			var oData = {
				recipient : {
					name : "SAP UI5 初学者教程之七 - JSON 模型初探"
				}
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);
		},
		onShowHello : function () {
			MessageToast.show("Hello World");
		}
	});
});