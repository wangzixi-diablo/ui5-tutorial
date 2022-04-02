sap.ui.define([
	"sap/ui/core/util/MockServer"
], function (MockServer) {
	"use strict";

	return {

		init: function (sODataServiceUrl) {
			var oMockServer, sLocalServicePath;

			// create
			oMockServer = new MockServer({
				rootUri: sODataServiceUrl
			});

			// configure
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: 10
			});

			sLocalServicePath = sap.ui.require.toUrl("sap/gantt/sample/GanttChart2OData/localService");

			// simulate
			oMockServer.simulate(sLocalServicePath + "/metadata.xml", {
				sMockdataBaseUrl : sLocalServicePath + "/mockdata",
				bGenerateMissingMockData: true
			});

			// start
			oMockServer.start();

			return oMockServer;
		}

	};

});
