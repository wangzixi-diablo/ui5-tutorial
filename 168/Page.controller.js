sap.ui.define([
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui5.walkthrough.Page", {

		onInit: function () {
			var oData = {
				"SelectedProduct": "HT-1001",
				"ProductCollection": [
					{
						"ProductId": "HT-1000",
						"Name": "Notebook Basic 15"
					},
					{
						"ProductId": "HT-1001",
						"Name": "Notebook Basic 17"
					},
					{
						"ProductId": "HT-1002",
						"Name": "Notebook Basic 18"
					},
					{
						"ProductId": "HT-1003",
						"Name": "Notebook Basic 19"
					},
					{
						"ProductId": "HT-1007",
						"Name": "ITelO Vault"
					}
				]
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);
		},
		onChange: function(oEvent){
			var oSelected = oEvent.getParameter("selectedItem");
			var sSelectedKey = oSelected.getKey();
			var sSelectedText = oSelected.getText();
			alert('selected key: ' + sSelectedKey + ' selected text: ' + sSelectedText);
		}
	});
});