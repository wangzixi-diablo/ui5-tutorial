sap.ui.define([
	'sap/ui/core/UIComponent',
	'sap/ui/model/json/JSONModel',
	'sap/f/library'
], function(UIComponent, JSONModel, fioriLibrary) {
	'use strict';

	return UIComponent.extend('sap.ui5.walkthrough.Component', {
		productsData: [],
		metadata: {
			manifest: 'json'
		},

		init: function () {
			var oModel,oProductsModel,oRouter;

			UIComponent.prototype.init.apply(this, arguments);

			oModel = new JSONModel();
			this.setModel(oModel);

			oProductsModel = new JSONModel(sap.ui.require.toUrl('sap/ui5/walkthrough/mockdata/products.json'));
			oProductsModel.setSizeLimit(1000);
			
			var handleLoaded = function(oLoadedData){
				var oLoadedData = oLoadedData.oSource.oData;
				this.productsData = oLoadedData.ProductCollection;
			};
			oProductsModel.attachRequestCompleted(handleLoaded.bind(this));

			this.setModel(oProductsModel, 'products');

			oRouter = this.getRouter();
			oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
			oRouter.initialize();
		},

		_onBeforeRouteMatched: function(oEvent) {
			var oModel = this.getModel(),
				sLayout = oEvent.getParameters().arguments.layout;

			// If there is no layout parameter, set a default layout (normally OneColumn)
			if (!sLayout) {
				sLayout = fioriLibrary.LayoutType.OneColumn;
			}

			oModel.setProperty("/layout", sLayout);
		}
	});
});