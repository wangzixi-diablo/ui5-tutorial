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

		var oModel = new JSONModel({
			firstName: "Harry",
			lastName: "Hawk",
			enabled: true,
			address: {
				street: "Dietmar-Hopp-Allee 16",
				city: "Walldorf",
				zip: "69190",
				country: "Germany"
			},
			salesAmount: 12345.6789,
			priceThreshold: 20,
			currencyCode: "EUR"
		});

		sap.ui.getCore().setModel(oModel);

		var oResourceModel = new ResourceModel({
			bundleName: "sap.ui5.walkthrough.i18n.i18n",
			fallbackLocale: "",
			supportedLocales: ["", "de"]
		});

		sap.ui.getCore().setModel(oResourceModel, "i18n");

		var oView = new XMLView({
			viewName: "sap.ui5.walkthrough.view.App"
		});

		sap.ui.getCore().getMessageManager().registerObject(oView, true);

		oView.placeAt("content");
	});
});