sap.ui.require([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/XMLView",
	"sap/ui/model/resource/ResourceModel"
], function (JSONModel, XMLView, ResourceModel) {
	"use strict";
	sap.ui.getCore().attachInit(function () {
		var oModel = new JSONModel({
			salesAmount: 12345.6789,
			currencyCode: "EUR"
		});
		sap.ui.getCore().setModel(oModel);
		var oResourceModel = new ResourceModel({
			bundleName: "sap.ui5.walkthrough.i18n.i18n"
		});
		sap.ui.getCore().setModel(oResourceModel, "i18n");
		var oView = new XMLView({
			viewName: "sap.ui5.walkthrough.view.App"
		});
		sap.ui.getCore().getMessageManager().registerObject(oView, true);
		oView.placeAt("content");
	});
});