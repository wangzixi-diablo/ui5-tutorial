sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/core/util/MockServer"
], function(BaseObject, MockServer){
	"use strict";

	var SERVICE_URL = "https://fake.host.com/localService/";

	var DemoMockServer = BaseObject.extend("sap.ui5.walkthrough.refAppMockServer.DemoMockServer", {
		constructor : function() {
			BaseObject.apply(this);

			var oMockServer = new MockServer({
				rootUri: SERVICE_URL
			});

			this._oMockServer = oMockServer;
			this._sMockdataUrl = sap.ui.require.toUrl("sap/ui5/walkthrough/refAppMockServer");
			oMockServer.simulate(this._sMockdataUrl + "/metadata.xml", this._sMockdataUrl);
			oMockServer.simulate(this._sMockdataUrl + "/metadata.xml", {
				sMockdataBaseUrl: this._sMockdataUrl,
				bGenerateMissingMockData: true
			});
			this.start();
		}
	});

	DemoMockServer.prototype.getServiceUrl = function() {
		return SERVICE_URL;
	};

	DemoMockServer.prototype.getAnnotationUrl = function() {
		return this._sMockdataUrl + "/STTA_PROD_MAN_ANNO_MDL.xml";
	};

	DemoMockServer.prototype.start = function() {
		this._oMockServer.start();
	};

	DemoMockServer.prototype.stop = function() {
		this._oMockServer.stop();
	};

	return DemoMockServer;
});