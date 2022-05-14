sap.ui.define([
	"sap/ui5/walkthrough/localService/mockserver"
], function (mockserver) {
	"use strict";

	mockserver.init();

	sap.ui.require(["sap/ui/core/ComponentSupport"]);
});
