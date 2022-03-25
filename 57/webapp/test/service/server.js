sap.ui.define([
	"sap/ui/core/util/MockServer"
], function (MockServer) {
	"use strict";
	return {
		init: function () {
			var oMockServer = new MockServer({
				rootUri: "/here/goes/your/serviceUrl/"
			});
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: 1000
			});
			var sPath = jQuery.sap.getModulePath("sap.ui5.walkthrough.test.service");
			oMockServer.simulate(sPath + "/metadata.xml", sPath);

			oMockServer.start();
		}
	};
});
