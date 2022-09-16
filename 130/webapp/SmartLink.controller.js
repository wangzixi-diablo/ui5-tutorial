sap.ui.define([
	'sap/ui/core/mvc/Controller', 'sap/ui5/walkthrough/shellMock/UShellCrossApplicationNavigationMock'
], function(Controller, UShellCrossApplicationNavigationMock) {
	"use strict";

	return Controller.extend("sap.ui5.walkthrough.SmartLink", {
		onInit: function() {
			this.getView().bindElement("/Products('4711')");

			UShellCrossApplicationNavigationMock.mockUShellServices({
				jerrynavigationKey: {
					links: [
						{
							action: "sap_se",
							intent: "http://www.sap.com",
							text: "SAP SE"
						}, {
							action: "sap_sapphire",
							intent: "http://www.sap.com/sapphire",
							text: "SAP Sapphire"
						}, {
							action: "app3",
							intent: "http://www.sap.com/hana",
							text: "App3"
						}
					]
				}
			});
		},
		onExit: function() {
			UShellCrossApplicationNavigationMock.unMockUShellServices();
		}
	});
});
