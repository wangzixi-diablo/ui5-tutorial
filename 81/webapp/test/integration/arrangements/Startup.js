sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui5/walkthrough/localService/mockserver",
	"sap/ui/model/odata/v2/ODataModel"
], function(Opa5, mockserver, ODataModel) {
	"use strict";

	return Opa5.extend("sap.ui5.walkthrough.test.integration.arrangements.Startup", {
		iStartMyApp : function (oOptionsParameter) {
			var oOptions = oOptionsParameter || {};

			this._clearSharedData();

			oOptions.delay = oOptions.delay || 1;

			var oMockserverInitialized = mockserver.init(oOptions);

			this.iWaitForPromise(oMockserverInitialized);
			this.iStartMyUIComponent({
				componentConfig: {
					name: "sap.ui5.walkthrough",
					async: true
				},
				hash: oOptions.hash,
				autoWait: oOptions.autoWait
			});
		},
		_clearSharedData: function () {
			// clear shared metadata in ODataModel to allow tests for loading the metadata
			ODataModel.mSharedData = { server: {}, service: {}, meta: {} };
		}
	});
});
