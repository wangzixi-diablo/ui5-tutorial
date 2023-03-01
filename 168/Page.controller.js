sap.ui.define([
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui5.walkthrough.Page", {

		onInit: function () {
			var oData = {
				"SelectedBook": "A001",
				"BookCollection": [
					{
						"BookId": "A001",
						"Name": "射雕英雄传",
						"Author":"金庸"
					},
					{
						"BookId": "A002",
						"Name": "神雕侠侣",
						"Author":"金庸"
					},
					{
						"BookId": "A003",
						"Name": "倚天屠龙记",
						"Author":"金庸"
					},
					{
						"BookId": "A004",
						"Name": "风云第一刀",
						"Author":"古龙"
					},
					{
						"BookId": "A005",
						"Name": "绝代双骄",
						"Author":"金庸"
					},
					{
						"BookId": "A006",
						"Name": "笑傲江湖",
						"Author":"金庸"
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