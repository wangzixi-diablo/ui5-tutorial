sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
		onInit : function () {
			var oData = {
				recipient : {
					name : "Hello World"
				}
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);
		}
	});
});