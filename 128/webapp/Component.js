sap.ui.define([
	'sap/ui/core/UIComponent', 'sap/ui/fl/FakeLrepConnectorLocalStorage'
], function(UIComponent, FakeLrepConnectorLocalStorage) {
	"use strict";

	return UIComponent.extend("sap.ui5.walkthrough.Component", {
		metadata: {
			manifest: "json"
		},
		init: function() {
			UIComponent.prototype.init.apply(this, arguments);
		},
		destroy: function() {
			FakeLrepConnectorLocalStorage.disableFakeConnector();
			UIComponent.prototype.destroy.apply(this, arguments);
		}
	});
});
