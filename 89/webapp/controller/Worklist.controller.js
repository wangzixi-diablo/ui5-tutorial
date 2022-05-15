sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui5/walkthrough/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("sap.ui5.walkthrough.controller.Worklist", {

		formatter: formatter,

		onInit : function () {
			var oViewModel,
				iOriginalBusyDelay,
				oTable = this.byId("table");

			iOriginalBusyDelay = oTable.getBusyIndicatorDelay();
			this._oTable = oTable;
			// keeps the search state
			this._aTableSearchState = [];

			// Model used to manipulate control states
			oViewModel = new JSONModel({
				worklistTableTitle: this.getResourceBundle().getText("worklistTableTitle"),
				shareOnJamTitle: this.getResourceBundle().getText("worklistTitle"),
				shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
				shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
				tableNoDataText: this.getResourceBundle().getText("tableNoDataText"),
				tableBusyDelay: 0,
				inStock: 0,
				shortage: 0,
				outOfStock: 0,
				countAll: 0
			});
			this.setModel(oViewModel, "worklistView");

			this._mFilters = {
				"inStock": [new Filter("UnitsInStock", FilterOperator.GT, 10)],
				"outOfStock": [new Filter("UnitsInStock", FilterOperator.LE, 0)],
				"shortage": [new Filter("UnitsInStock", FilterOperator.BT, 1, 10)],
				"all": []
			};

			oTable.attachEventOnce("updateFinished", function(){
				// Restore original busy indicator delay for worklist's table
				oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
			});
		},

		onUpdateFinished : function (oEvent) {
			// update the worklist's object counter after the table update
			var sTitle,
				oTable = oEvent.getSource(),
				oViewModel = this.getModel("worklistView"),
				iTotalItems = oEvent.getParameter("total");
			// only update the counter if the length is final and
			// the table is not empty
			if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
				sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);

				this.getModel().read("/Products/$count", {
					success: function (oData) {
						oViewModel.setProperty("/countAll", oData);
					}
				});

				this.getModel().read("/Products/$count", {
					success: function (oData) {
						oViewModel.setProperty("/inStock", oData);
					},
					filters: this._mFilters.inStock
				});

				this.getModel().read("/Products/$count", {
					success: function(oData){
						oViewModel.setProperty("/outOfStock", oData);
					},
					filters: this._mFilters.outOfStock
				});

				this.getModel().read("/Products/$count", {
					success: function(oData){
						oViewModel.setProperty("/shortage", oData);
					},
					filters: this._mFilters.shortage
				});
			} else {
				sTitle = this.getResourceBundle().getText("worklistTableTitle");
			}
			this.getModel("worklistView").setProperty("/worklistTableTitle", sTitle);
		},

		onPress : function (oEvent) {
			// The source is the list item that got pressed
			this._showObject(oEvent.getSource());
		},

		/**
		 * Event handler for navigating back.
		 * We navigate back in the browser history
		 * @public
		 */
		onNavBack : function() {
			history.go(-1);
		},


		onSearch : function (oEvent) {
			if (oEvent.getParameters().refreshButtonPressed) {
				// Search field's 'refresh' button has been pressed.
				// This is visible if you select any master list item.
				// In this case no new search is triggered, we only
				// refresh the list binding.
				this.onRefresh();
			} else {
				var aTableSearchState = [];
				var sQuery = oEvent.getParameter("query");

				if (sQuery && sQuery.length > 0) {
					aTableSearchState = [new Filter("ProductName", FilterOperator.Contains, sQuery)];
				}
				this._applySearch(aTableSearchState);
			}

		},

		onRefresh : function () {
			var oTable = this.byId("table");
			oTable.getBinding("items").refresh();
		},

		_showObject : function (oItem) {
			this.getRouter().navTo("object", {
				objectId: oItem.getBindingContext().getProperty("ProductID")
			});
		},

		_applySearch: function(aTableSearchState) {
			var oTable = this.byId("table"),
				oViewModel = this.getModel("worklistView");
			oTable.getBinding("items").filter(aTableSearchState, "Application");
			// changes the noDataText of the list in case there are no filter results
			if (aTableSearchState.length !== 0) {
				oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
			}
		},

		onQuickFilter: function(oEvent) {
			var oBinding = this._oTable.getBinding("items"),
				sKey = oEvent.getParameter("selectedKey");
			oBinding.filter(this._mFilters[sKey]);
		}
	});
});