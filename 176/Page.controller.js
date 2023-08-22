sap.ui.define(['sap/ui/core/mvc/Controller','sap/ui/model/json/JSONModel'],
	function(Controller, JSONModel) {
	"use strict";

	var PageController = Controller.extend("sap.ui5.walkthrough.Page", {

		onInit : function (evt) {
			var oModel = new JSONModel(sap.ui.require.toUrl("sap/ui5/walkthrough/mockdata/products.json"));
			this.getView().setModel(oModel);
		}
	});
	return PageController;
});