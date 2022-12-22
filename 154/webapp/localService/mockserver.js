sap.ui.define([
	"sap/ui/core/util/MockServer"
], function(MockServer) {
	"use strict";
	return {
		init: function() {
			var oMockServer = new MockServer({
				rootUri: "/sap/opu/odata/sap/EPM_REF_APPS_PROD_MAN_SRV/"
			});

			MockServer.config({
				autoRespond: true,
				autoRespondAfter: 100
			});

			var sPath = sap.ui.require.toUrl("sap/ui5/walkthrough/localService");
			oMockServer.simulate(sPath + "/metadata.xml", {
				sMockdataBaseUrl: sPath + "/mockdata",
				bGenerateMissingMockData: true
			});

			oMockServer.start();
		}
	};
});
