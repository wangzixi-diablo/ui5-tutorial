sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/odata/v2/ODataModel',
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, ODataModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui5.walkthrough.SmartFilterBar", {

		onInit: function() {
			this._oModel = new ODataModel("/MockDataServiceCustomField", true);
			this.getView().setModel(this._oModel);

			this._oSmartFilterBar = this.byId("smartFilterBar");
			this._oCustomMultiComboBox = this.byId("multiComboBox");
			this._oCustomSelect = this.byId("customSelect");
			this._oCustomSwitch = this.byId("customSwitch");
		},

		onBeforeRebindTable: function(oEvent) {
			var mBindingParams = oEvent.getParameter("bindingParams"),
				aSelectedItems = this._oCustomMultiComboBox.getSelectedItems(),
				sRatingValue = this._oCustomSelect.getSelectedKey(),
				bSwitchValue = this._oCustomSwitch.getState();

			aSelectedItems.forEach(function(oSelectedItem) {
				mBindingParams.filters.push(
					new Filter(
						"CompanyCode",
						FilterOperator.EQ,
						oSelectedItem.getText()
					)
				);
			});

			if (sRatingValue) {
				mBindingParams.filters.push(
					new Filter(
						"CompanyRating",
						FilterOperator.EQ,
						sRatingValue
					)
				);
			}

			mBindingParams.filters.push(
				new Filter(
					"DeliveredOrder",
					FilterOperator.EQ,
					bSwitchValue
				)
			);
		},
		onExit: function () {
			this._oModel.destroy();
			this._oModel = null;
		}
	});
});