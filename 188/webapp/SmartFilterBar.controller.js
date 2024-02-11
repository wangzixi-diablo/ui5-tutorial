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

		onAfterVariantLoad: function() {
			var oData, oCustomFieldData;

			if (this._oSmartFilterBar) {
				oData = this._oSmartFilterBar.getFilterData();
				oCustomFieldData = oData["_CUSTOM"];
				if (oCustomFieldData) {
					this._oCustomMultiComboBox.setSelectedKeys(oCustomFieldData.MyOwnFilterField);
					this._oCustomSelect.setSelectedKey(oCustomFieldData.MyOwnRatingIndicator);
					this._oCustomSwitch.setState(oCustomFieldData.MyOwnSwitch);
				}
			}
		},

		onBeforeVariantFetch: function(oEvent) {
			this._updateCustomFilter();
		},

		_updateCustomFilter: function() {
			if (this._oSmartFilterBar) {
				var oData = this._oSmartFilterBar.getFilterData();
				oData._CUSTOM = {
					MyOwnFilterField: this._oCustomMultiComboBox.getSelectedKeys(),
					MyOwnRatingIndicator: this._oCustomSelect.getSelectedKey(),
					MyOwnSwitch: this._oCustomSwitch.getState()
				};
				this._oSmartFilterBar.setFilterData(oData, true);
			}
		},

		/** The hasValue attribute needs to be set because custom filters
			must be handled by the application. When a value is set, the Filters
			button of the SmartFilterBar control should update its counter.
		*/
		customFieldChange: function(oEvent) {
			var oControl = oEvent.getSource(),
				bHasValue = false;

			if (oControl.getSelectedKeys().length > 0) {
				bHasValue = true;
			}
			oControl.data("hasValue", bHasValue);
		},

		onExit: function () {
			this._oModel.destroy();
			this._oModel = null;
		}
	});
});