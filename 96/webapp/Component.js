sap.ui.define([
	'sap/ui/core/UIComponent',
	'sap/ui/model/json/JSONModel'
], function(UIComponent, JSONModel) {
	'use strict';

	return UIComponent.extend('sap.ui5.walkthrough.Component', {
		metadata: {
			manifest: 'json'
		},
		pageSize: 20,
		init: function () {
			UIComponent.prototype.init.apply(this, arguments);

			this._oProductsModel = new JSONModel(sap.ui.require.toUrl('sap/ui5/walkthrough/mockdata/products.json'));

			this._oProductsModel.setSizeLimit(this.pageSize);

			var handleLoaded = function(oLoadedData){
				var oLoadedData = oLoadedData.oSource.oData;
				this._oAllData = oLoadedData;
			};
			this._oProductsModel.attachRequestCompleted(handleLoaded.bind(this));

			this.setModel(this._oProductsModel, 'products');
		},
		setNewPageSize: function(newPageSize){
			this.pageSize = newPageSize;
			this._oProductsModel.setSizeLimit(this.pageSize);
		},
		updateWithPageIndex: function(nPageIndex){
			var nStartIndex = nPageIndex * this.pageSize;
			var nEndIndex = nStartIndex + this.pageSize - 1;
			var oData = this._oAllData.ProductCollection.slice(nStartIndex, nEndIndex + 1);

			this._oProductsModel.setData({
				ProductCollection: oData
			});
		},
		getPageNumber: function(){
			return Math.ceil(this._oAllData.ProductCollection.length / this.pageSize);
		}
	});
});