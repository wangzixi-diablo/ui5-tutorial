sap.ui.define([
	'sap/m/ObjectIdentifier',
	'sap/ui/core/mvc/Controller',
	'sap/ui/core/ElementRegistry',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	'sap/ui/model/FilterType',
	'sap/ui/model/json/JSONModel',
	'sap/m/FacetFilterItem',
	'sap/m/MessageToast',
	'sap/ui/core/Component'
], function(ObjectIdentifier, Controller, ElementRegistry, Filter, FilterOperator, FilterType, JSONModel, FacetFilterItem, MessageToast, Component) {
	"use strict";

	return Controller.extend("sap.ui5.walkthrough.controller.Page", {

		onInit: function() {
			Component.create({
				name : 'sap.ui5.walkthrough.Table'
			})
			.then(function(oComp) {
				var oModel = new JSONModel("products.json"),
					oTable,
					oBindingInfo;

				this.getView().setModel(oModel);

				oComp.setModel(this.getView().getModel());
				oTable = oComp.getTable();
				/*下面的代码演示了如何动态给 Table 添加新的 column
				oBindingInfo = oTable.getBindingInfo("items");
				oBindingInfo.template.removeCell(0);
				oBindingInfo.templateShareable = true;
				oBindingInfo.template.insertCell(new ObjectIdentifier({
					title: "{Name}",
					text: "{Category}"
				}));
				oTable.bindItems(oBindingInfo);*/
				this.byId("idVBox").addItem(oTable);
			}.bind(this));
		},

		_applyFilter: function(oFilter) {
			var aVBoxItems = this.byId("idVBox").getItems(),
				oTable = aVBoxItems[aVBoxItems.length - 1];

			oTable.getBinding("items").filter(oFilter);
		},

		handleFacetFilterReset: function(oEvent) {
			var oFacetFilter = ElementRegistry.get(oEvent.getParameter("id")),
				aFacetFilterLists = oFacetFilter.getLists(),
				oFilter = new Filter("text", FilterOperator.Contains, "");

			for (var i = 0; i < aFacetFilterLists.length; i++) {
				aFacetFilterLists[i].setSelectedKeys();
				// Default filtering behavior is prevented so we need to define a filter which will be used when FacetFilter "reset" button is pressed
				if (aFacetFilterLists[i].isBound("items")) {
					aFacetFilterLists[i].getBinding("items").filter(oFilter, FilterType.Application);
				}
			}
			this._applyFilter([]);
		},

		handleConfirm: function (oEvent) {
			// Get the Facet Filter lists and construct a (nested) filter for the binding
			var oFacetFilter = oEvent.getSource();
			this._filterModel(oFacetFilter);
			MessageToast.show("confirm event fired");
		},

		handleSearch: function (oEvent) {
			var oFacetFilterList = oEvent.getSource(),
				sSearchString = oEvent.getParameter("term"),
				bClearButtonPressed = oEvent.getParameter("clearButtonPressed"),
				// Define filter to be used for resetting the current list state or another one for searching through the list items
				oFilter = bClearButtonPressed ? new Filter("text", FilterOperator.Contains, "") : new Filter("text", FilterOperator.Contains, sSearchString.toLowerCase()),
				oItemTemplate, oBindingInfo;

			// Preventing the internal filtering behavior FacetFilter control
			oEvent.preventDefault();

			if (oFacetFilterList.isBound("items")) {
				// Items are already bound and we apply the filtering
				oFacetFilterList.getBinding("items").filter(oFilter, FilterType.Application);
			} else {
				oItemTemplate = new FacetFilterItem({
					text: "{text}",
					key: "{key}",
					counter: "{data}"
				});
				oBindingInfo = {
					path: "values",
					template: oItemTemplate,
					templateShareable: false,
					filters: [oFilter]
				};

				// Bind items aggregation with specifically defined filter criterion
				oFacetFilterList.bindItems(oBindingInfo);
			}
		},

		_filterModel: function(oFacetFilter) {
			var mFacetFilterLists = oFacetFilter.getLists().filter(function(oList) {
				return oList.getSelectedItems().length;
			});

			if (mFacetFilterLists.length) {
				// Build the nested filter with ORs between the values of each group and
				// ANDs between each group
				var oFilter = new Filter(mFacetFilterLists.map(function(oList) {
					return new Filter(oList.getSelectedItems().map(function(oItem) {
						return new Filter(oList.getTitle(), FilterOperator.EQ, oItem.getText());
					}), false);
				}), true);
				this._applyFilter(oFilter);
			} else {
				this._applyFilter([]);
			}
		}
	});
});