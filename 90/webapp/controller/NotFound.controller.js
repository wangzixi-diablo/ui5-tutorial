sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ui5.walkthrough.controller.NotFound", {

		onLinkPressed : function () {
			this.getRouter().navTo("worklist");
		}
	});
});