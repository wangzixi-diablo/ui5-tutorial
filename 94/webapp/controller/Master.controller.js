sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox'
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox) {
	"use strict";

	return Controller.extend("sap.ui5.walkthrough.controller.Master", {
		currentPageIndex: 0,
		onInit: function () {
			this.oView = this.getView();
			this._bDescendingSort = false;
			this.oProductsTable = this.oView.byId("productsTable");
		},
		// return value: should NOT trigger page change
		calculateNewPageIndex: function(bIsPrevious){
			if( bIsPrevious){
				if( this.currentPageIndex === 0){
					return true;
				}
				this.currentPageIndex--;
			}
			else{
				if( this.currentPageIndex === this.getOwnerComponent().getPageNumber() - 1 ){
					return true;
				}
				this.currentPageIndex++;
			}			
		},
		onPrevious: function(){
			if( !this.calculateNewPageIndex(true) ){
				this.getOwnerComponent().updateWithPageIndex(this.currentPageIndex);
			}
		},
		onNext: function(){
			if( !this.calculateNewPageIndex(false) ){
				this.getOwnerComponent().updateWithPageIndex(this.currentPageIndex);
			}
		}
	});
});
