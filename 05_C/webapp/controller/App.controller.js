sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
		onSendEmail : function () {
			//alert("Hello World");
			sap.m.URLHelper.triggerEmail(null,"1","2");
		}
	});
});