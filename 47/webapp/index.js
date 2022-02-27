sap.ui.require([
	"sap/ui/core/mvc/XMLView",
	"sap/ui/model/resource/ResourceModel"
], function (XMLView, ResourceModel) {
	"use strict";
	sap.ui.getCore().attachInit(function () {

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