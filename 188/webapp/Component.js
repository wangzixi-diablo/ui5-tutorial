sap.ui.define([
	'sap/ui/core/UIComponent',
	'sap/ui/core/util/MockServer'
], function(UIComponent, MockServer) {
	"use strict";

	return UIComponent.extend("sap.ui5.walkthrough.Component", {

		_oMockServer: null,

		metadata: {
			manifest: "json"
		},
		init: function () {
			var sMockdataUrl, sMetadataUrl;

			UIComponent.prototype.init.apply(this, arguments);

			this._oMockServer = new MockServer({
				rootUri: "/MockDataServiceCustomField/"
			});
			sMockdataUrl = sap.ui.require.toUrl("mockserver");
			sMetadataUrl = sMockdataUrl + "/metadata.xml";
			this._oMockServer.simulate(sMetadataUrl, {
				sMockdataBaseUrl: sMockdataUrl,
				aEntitySetsNames: [
					"MainEntitySet"
				]
			});
			this._oMockServer.start();
		},

		destroy: function() {
			UIComponent.prototype.destroy.apply(this, arguments);

			if (this._oMockServer) {
				this._oMockServer.stop();
			}
		}
	});
});