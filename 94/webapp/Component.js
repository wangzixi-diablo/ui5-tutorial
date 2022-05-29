sap.ui.define([
	'sap/ui/core/UIComponent',
	'sap/ui/model/json/JSONModel'
], function(UIComponent, JSONModel) {
	'use strict';

	return UIComponent.extend('sap.ui5.walkthrough.Component', {
		metadata: {
			manifest: 'json'
		},
		PAGE_SIZE: 20,
		init: function () {
			UIComponent.prototype.init.apply(this, arguments);

			this._oProductsModel = new JSONModel(sap.ui.require.toUrl('sap/ui5/walkthrough/mockdata/products.json'));

			this._oProductsModel.setSizeLimit(this.PAGE_SIZE);

			var handleLoaded = function(oLoadedData){
				var oLoadedData = oLoadedData.oSource.oData;
				this._oAllData = oLoadedData;
			};
			this._oProductsModel.attachRequestCompleted(handleLoaded.bind(this));

			this.setModel(this._oProductsModel, 'products');
		},
		updateWithPageIndex: function(nPageIndex){
			var nStartIndex = nPageIndex * this.PAGE_SIZE;
			var nEndIndex = nStartIndex + this.PAGE_SIZE - 1;
			var oData = this._oAllData.ProductCollection.slice(nStartIndex, nEndIndex + 1);

			this._oProductsModel.setData({
				ProductCollection: oData
			});
		},
		getPageNumber: function(){
			return Math.ceil(this._oAllData.ProductCollection.length / this.PAGE_SIZE);
		}
	});
});