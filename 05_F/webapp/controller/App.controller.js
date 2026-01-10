sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
		onShowHello : function () {
			alert("Hello World");
		},

		// Opens SAP website in a new browser window/tab
		onOpenSap: function () {
			window.open("https://www.sap.com", "_blank", "noopener,noreferrer");
		}
	});
});