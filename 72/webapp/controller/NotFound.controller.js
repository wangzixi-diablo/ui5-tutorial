sap.ui.define([
	"sap/ui5/walkthrough/controller/BaseController"
], function (BaseController) {
	"use strict";
	return BaseController.extend("sap.ui5.walkthrough.controller.NotFound", {

		onInit: function () {
			var oRouter, oTarget;

			oRouter = this.getRouter();
			oTarget = oRouter.getTarget("notFound");
			oTarget.attachDisplay(function (oEvent) {
				this._oData = oEvent.getParameter("data");	// store the data
			}, this);
		},

		onNavBack : function () {
			if (this._oData && this._oData.fromTarget) {
				this.getRouter().getTargets().display(this._oData.fromTarget);
				delete this._oData.fromTarget;
				return;
			}

			// call the parent's onNavBack
			BaseController.prototype.onNavBack.apply(this, arguments);
		}
	});
});
