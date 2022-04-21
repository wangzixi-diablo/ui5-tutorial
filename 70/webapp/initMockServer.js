sap.ui.define([
	"sap/ui5/walkthrough/localService/mockserver",
	"sap/m/MessageBox"
], function (mockserver, MessageBox) {
	"use strict";

	mockserver.init().catch(function (oError) {
		MessageBox.error(oError.message);
	}).finally(function () {
		sap.ui.require(["sap/ui/core/ComponentSupport"]);
	});
});