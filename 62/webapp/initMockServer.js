sap.ui.define([
	"sap/ui5/walkthrough/localService/mockserver",
	"sap/base/Log",
	"sap/m/MessageBox"
], function (mockserver, Log, MessageBox) {
	"use strict";
	mockserver.init().catch(function (oError) {
		MessageBox.error(oError.message);
	}).finally(function () {
		sap.ui.require(["sap/ui/core/ComponentSupport"]);
	});
});