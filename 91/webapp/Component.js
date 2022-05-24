sap.ui.define([
	'sap/ui/core/UIComponent',
	'sap/ui/model/json/JSONModel'
], function(UIComponent, JSONModel) {
	'use strict';

	return UIComponent.extend('sap.ui5.walkthrough.Component', {
		metadata: {
			manifest: 'json'
		},

		init: function () {
			var oProductsModel;

			UIComponent.prototype.init.apply(this, arguments);

			oProductsModel = new JSONModel(sap.ui.require.toUrl('sap/ui5/walkthrough/mockdata/products.json'));
			oProductsModel.setSizeLimit(1000);
			this.setModel(oProductsModel, 'products');
		}
	});
});