sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
		onSendEmail : function () {
			sap.m.URLHelper.triggerEmail(null,"这是主题","这是正文","a@test.com", "b@test.com");
		}
	});
});