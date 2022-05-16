sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/ui5/walkthrough/model/formatter"
], function (BaseController,JSONModel, History, formatter) {
	"use strict";

	return BaseController.extend("sap.ui5.walkthrough.controller.Object", {
		formatter: formatter,
		
		onInit : function () {
			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched : function (oEvent) {
			var sObjectId =  oEvent.getParameter("arguments").objectId;
			var sObjectPath = this.getModel().createKey("Products", {
					ProductID :  sObjectId
			});
			this.getView().bindElement({
				path: "/" + sObjectPath,
				events: {
					change: this._onBindingChange.bind(this)
				}
			});
		},
		_onBindingChange : function () {
			var oView = this.getView(),
				oElementBinding = oView.getElementBinding();

			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("objectNotFound");
				return;
			}
		},
		onNavBack : function() {
			var sPreviousHash = History.getInstance().getPreviousHash();
			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("worklist", {}, true);
			}
		}
	});
});