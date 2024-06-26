sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	var PageController = Controller.extend("sap.ui5.walkthrough.Page", {

		onInit : function () {
			this._sValidPath = sap.ui.require.toUrl("sap/ui5/walkthrough/sample.pdf");
			this._sInvalidPath = sap.ui.require.toUrl("sap/ui5/walkthrough/sample_nonexisting.pdf");
			this._oModel = new JSONModel({
				Source: this._sValidPath,
				Title: "My Custom Title",
				Height: "600px"
			});
			this.getView().setModel(this._oModel);
		},

		onCorrectPathClick: function() {
			this._oModel.setProperty("/Source", this._sValidPath);
		},

		onIncorrectPathClick: function() {
			this._oModel.setProperty("/Source", this._sInvalidPath);
		}
	});
	return PageController;
});