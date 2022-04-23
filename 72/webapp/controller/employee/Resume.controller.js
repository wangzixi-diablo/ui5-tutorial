sap.ui.define([
	"sap/ui5/walkthrough/controller/BaseController"
], function (BaseController) {
	"use strict";
	return BaseController.extend("sap.ui5.walkthrough.controller.employee.Resume", {
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("employeeResume").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched : function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();

			oView.bindElement({
				path : "/Employees(" + oArgs.employeeId + ")",
				events : {
					change: this._onBindingChange.bind(this)
				}
			});
		},

		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		}
	});
});
