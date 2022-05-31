sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller"
], function (JSONModel, Controller) {
	"use strict";

	return Controller.extend("sap.ui5.walkthrough.controller.Master", {
		currentPageIndex: 0,
		onInit: function () {
			this.oPageButtonControl = {
				previousEnabled: false,
				nextEnabled: true,
				currentPageNumber: 1,
				totalPageNumber: this.getOwnerComponent().getPageNumber()
			};
			this.oPageButtonControlModel = new JSONModel(this.oPageButtonControl);
			this.getView().setModel(this.oPageButtonControlModel, "pageControl");

			this.oPageSizeOptions = {
				items:[
				{ key: 20,
				 text: 20},
				{ key: 30,
				 text: 30},
				{ key: 50,
				 text: 50}
			]};
			this.oPageSizeOptionsModel = new JSONModel(this.oPageSizeOptions);
			this.getView().byId("pageOptions").setModel(this.oPageSizeOptionsModel);
		},
		onChange: function(oEvent){
			var oSelected = oEvent.getParameter("selectedItem");
			var sNewPageSize = oSelected.getKey();
			this.refreshWithNewPageSize(sNewPageSize);
		},
		refreshWithNewPageSize: function(sNewPageSize){	
			this.currentPageIndex = 0;
			this.getOwnerComponent().setNewPageSize(sNewPageSize);
			this.getOwnerComponent().updateWithPageIndex(this.currentPageIndex);
			
			this.oPageButtonControl = {
				previousEnabled: false,
				nextEnabled: true,
				currentPageNumber: 1,
				totalPageNumber: this.getOwnerComponent().getPageNumber()
			};
			this.oPageButtonControlModel.setData(this.oPageButtonControl);
		},
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
