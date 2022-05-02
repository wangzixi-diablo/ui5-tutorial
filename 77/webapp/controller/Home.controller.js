sap.ui.define([
	"sap/ui5/walkthrough/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ui5.walkthrough.controller.Home", {
		onDisplayNotFound : function () {
			// display the "notFound" target without changing the hash
			this.getRouter().getTargets().display("notFound", {
				fromTarget : "home"
			});
		},
		onNavToEmployees : function () {
			this.getRouter().navTo("employeeList");
		},
		onNavToEmployeeOverview : function (oEvent) {
			this.getRouter().navTo("employeeOverview");
		}
	});
});
