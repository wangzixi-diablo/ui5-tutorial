sap.ui.define([
		'sap/m/MessageBox',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	], function(MessageBox, Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui5.walkthrough.Link", {

		onInit: function () {
			var oModel = new JSONModel(sap.ui.require.toUrl("sap/ui5/walkthrough/mockdata/products.json"));
			this.getView().setModel(oModel);
		},
		handleLinkPress: function () {
			MessageBox.alert("Link was clicked!");
		},
		handleObjectIdentifierPress: function () {
			MessageBox.alert("Object Identifier was clicked!");
		}
	});
});