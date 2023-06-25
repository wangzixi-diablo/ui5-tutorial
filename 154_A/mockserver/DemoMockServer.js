sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/core/util/MockServer"
], function(BaseObject, MockServer){
	"use strict";

	var SERVICE_URL = "https://fake.host.com/localService/";

	var DemoMockServer = BaseObject.extend("sap.ui5.walkthrough.DemoMockServer", {
		constructor : function(bTree, sMockdataPath) {
			BaseObject.apply(this);

			var oMockServer = new MockServer({
				rootUri: SERVICE_URL
			});

			this._oMockServer = oMockServer;

			var sMockdataUrl = sap.ui.require.toUrl(sMockdataPath || "sap/ui5/walkthrough/mockserver");
			oMockServer.simulate(sMockdataUrl + (!sMockdataPath && bTree ? "/orgHierarchy.xml" : "/metadata.xml"), sMockdataUrl);
			this.start();
		}
	});

	DemoMockServer.prototype.getServiceUrl = function() {
		return SERVICE_URL;
	};

	DemoMockServer.prototype.start = function() {
		this._oMockServer.start();
	};

	DemoMockServer.prototype.stop = function() {
		this._oMockServer.stop();
	};

	return DemoMockServer;
});