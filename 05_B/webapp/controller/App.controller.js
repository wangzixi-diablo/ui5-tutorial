sap.ui.define([
	"sap/ui/core/mvc/Controller","sap/ui/Device"
], function (Controller,Device) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
		onShowHello : function () {
			alert("Hello World");
			console.log('Device type: ', Device);
		}
	});
});