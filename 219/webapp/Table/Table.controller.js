sap.ui.define([
		'./Formatter',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
		'sap/m/MessageToast',
		'sap/m/library'
	], function(Formatter, Controller, JSONModel, MessageToast, mobileLibrary) {
	"use strict";

	var PopinLayout = mobileLibrary.PopinLayout;

	var TableController = Controller.extend("sap.ui5.walkthrough.Table.Table", {

		formatter: Formatter,

		onInit: function () {
			var oModel = new JSONModel("products.json");
			this.getView().setModel(oModel);
		},

		onPopinLayoutChanged: function() {
			var oTable = this.byId("idProductsTable");
			var oComboBox = this.byId("idPopinLayout");
			var sPopinLayout = oComboBox.getSelectedKey();
			switch (sPopinLayout) {
				case "Block":
					oTable.setPopinLayout(PopinLayout.Block);
					break;
				case "GridLarge":
					oTable.setPopinLayout(PopinLayout.GridLarge);
					break;
				case "GridSmall":
					oTable.setPopinLayout(PopinLayout.GridSmall);
					break;
				default:
					oTable.setPopinLayout(PopinLayout.Block);
					break;
			}
		},

		onStickySelect: function(oEvent) {
			var bSelected = oEvent.getParameter("selected"),
				sText = oEvent.getSource().getText(),
				oTable = this.byId("idProductsTable"),
				aSticky = oTable.getSticky() || [];

			if (bSelected) {
				aSticky.push(sText);
			} else if (aSticky.length) {
				var iElementIndex = aSticky.indexOf(sText);
				aSticky.splice(iElementIndex, 1);
			}

			oTable.setSticky(aSticky);
		},

		onToggleInfoToolbar: function(oEvent) {
			var oTable = this.byId("idProductsTable");
			oTable.getInfoToolbar().setVisible(!oEvent.getParameter("pressed"));
		},

		onAIActionPress: function() {
			MessageToast.show(
				"AI 相关功能，待实现"
			);
		}
	});
	return TableController;
});