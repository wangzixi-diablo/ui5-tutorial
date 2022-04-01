sap.ui.require([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/XMLView",
	"sap/ui/model/resource/ResourceModel"
], function (JSONModel, XMLView, ResourceModel) {
	"use strict";

	sap.ui.getCore().attachInit(function () {

		var oProductModel = new JSONModel();
		oProductModel.loadData("./model/Products.json");
		sap.ui.getCore().setModel(oProductModel, "products");

		var oResourceModel = new ResourceModel({
			bundleName: "sap.ui5.walkthrough.i18n.i18n",
			fallbackLocale: ""
		});

		sap.ui.getCore().setModel(oResourceModel, "i18n");

		var oView = new XMLView({
			viewName: "sap.ui5.walkthrough.view.App"
		});

		sap.ui.getCore().getMessageManager().registerObject(oView, true);

		oView.placeAt("content");
	});
});