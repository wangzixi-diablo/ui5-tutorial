sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/resource/ResourceModel"
], function (Controller,ResourceModel) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
		onInit : function () {
			var i18nModel = new ResourceModel({
				bundleName: "sap.ui5.walkthrough.i18n.i18n"
			 });
			this.getView().setModel(i18nModel, "jerryi18n");
		}
	});
});