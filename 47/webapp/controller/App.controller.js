sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
		onInit: function () {
			var oView = this.getView();
			oView.setModel(new JSONModel({ name: "" }));
		},

		_validateInput: function (oInput) {
			var sValueState = "None";
			var bValidationError = false;
			var oBinding = oInput.getBinding("value");
			try {
				oBinding.getType().validateValue(oInput.getValue());
			} catch (oException) {
				sValueState = "Error";
				bValidationError = true;
			}
			oInput.setValueState(sValueState);
			return bValidationError;
		},
		onNameChange: function(oEvent) {
			var oInput = oEvent.getSource();
			this._validateInput(oInput);
		}
	});
});