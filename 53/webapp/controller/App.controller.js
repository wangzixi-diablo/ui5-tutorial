sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui5/walkthrough/customType/mytype"
], function (Controller, JSONModel) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
		onInit: function () {
			var oView = this.getView();
			oView.setModel(new JSONModel({ name: "" }));

			var oInput = this.byId("nameInput");
			sap.ui.getCore().getMessageManager().registerObject(oInput, true);
		}
	});
});