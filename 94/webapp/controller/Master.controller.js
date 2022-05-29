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
			this.oPageButtonControl = {
				previousEnabled: false,
				nextEnabled: true,
				currentPageNumber: 1
			};
			this.oPageButtonControlModel = new JSONModel(this.oPageButtonControl);
			this.getView().setModel(this.oPageButtonControlModel, "pageControl");
		},
		// return value: should NOT trigger page change
		calculateNewPageIndex: function(bIsPrevious){
			if( bIsPrevious){ // previous page
				if( this.currentPageIndex === 1){
					this.oPageButtonControl.previousEnabled = false;
				}
				else {
					this.oPageButtonControl.previousEnabled = true;
					this.oPageButtonControl.nextEnabled = true;
				}
				this.currentPageIndex--;
			}
			else{ // next page
				if( this.currentPageIndex + 1 === this.getOwnerComponent().getPageNumber() - 1 ){
					this.oPageButtonControl.nextEnabled = false;
				}
				else{ 
					this.oPageButtonControl.previousEnabled = true;
					this.oPageButtonControl.nextEnabled = true;
				}
				this.currentPageIndex++;
			}	
			this.oPageButtonControl.currentPageNumber = this.currentPageIndex + 1;
			this.oPageButtonControlModel.setData(this.oPageButtonControl);		
		},
		onPrevious: function(){
			this.calculateNewPageIndex(true);
			this.getOwnerComponent().updateWithPageIndex(this.currentPageIndex);
		},
		onNext: function(){
			this.calculateNewPageIndex(false);
			this.getOwnerComponent().updateWithPageIndex(this.currentPageIndex);
		}
	});
});
