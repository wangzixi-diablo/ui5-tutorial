sap.ui.define([
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	], function(Fragment, Controller, JSONModel) {
	"use strict";

	var PageController = Controller.extend("sap.ui5.walkthrough.Page", {

		onInit: function (oEvent) {

			var oModel = new JSONModel(sap.ui.require.toUrl("sap/ui5/walkthrough/mockdata/supplier.json"));
			this.getView().setModel(oModel);

			this.getView().bindElement("/SupplierCollection/0");

			this._formFragments = {};

			this._showFormFragment("Display");

			// to navigate to the page on phone and not show the split screen items
			var oSplitContainer = this.byId("FormSplitscreen");
			oSplitContainer.toDetail(this.createId("page"));
		},

		handleEditPress : function () {
			//Clone the data
			this._oSupplier = Object.assign({}, this.getView().getModel().getData().SupplierCollection[0]);
			this._toggleButtonsAndView(true);
		},

		handleCancelPress : function () {
			//Restore the data
			var oModel = this.getView().getModel();
			var oData = oModel.getData();

			oData.SupplierCollection[0] = this._oSupplier;

			oModel.setData(oData);
			this._toggleButtonsAndView(false);
		},

		handleSavePress : function () {
			this._toggleButtonsAndView(false);
		},

		_toggleButtonsAndView : function (bEdit) {
			var oView = this.getView();

			// Show the appropriate action buttons
			oView.byId("edit").setVisible(!bEdit);
			oView.byId("save").setVisible(bEdit);
			oView.byId("cancel").setVisible(bEdit);

			// Set the right form type
			this._showFormFragment(bEdit ? "Change" : "Display");
		},

		_getFormFragment: function (sFragmentName) {
			var pFormFragment = this._formFragments[sFragmentName],
				oView = this.getView();

			if (!pFormFragment) {
				pFormFragment = Fragment.load({
					id: oView.getId(),
					name: "sap.ui5.walkthrough." + sFragmentName
				});
				this._formFragments[sFragmentName] = pFormFragment;
			}
			return pFormFragment;
		},

		_showFormFragment : function (sFragmentName) {
			var oPage = this.byId("page");

			oPage.removeAllContent();
			this._getFormFragment(sFragmentName).then(function(oVBox){
				oPage.insertContent(oVBox);
			});
		}
	});
	return PageController;
});