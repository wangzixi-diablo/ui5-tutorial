sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/v2/ODataModel"
 ], function (Controller, ODataModel) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
	   	onGTFilter : function () {
	   		var oFilters = [];
			oFilters.push(new sap.ui.model.Filter("OrderDate", sap.ui.model.FilterOperator.GT, new Date("1998-05-01")));

		  	this.oModel.read("/Invoices",
			{
				success:function(oResultData, oResponse){
					console.log('1998年5月之后: ', oResultData, oResponse);
				},
				filters:oFilters
		  	});
	    },
	   	onBTFilter : function () {
			var oFilter = new sap.ui.model.Filter({
				path: "OrderDate",
				operator: "BT",
				value1: new Date(1998, 4, 1), // 1998 年 5 月 1 日
				value2: new Date(1998, 4, 31) // 1998 年 5 月 31 日
			});
			this.oModel.read("/Invoices", {
				filters: [oFilter],
				success: function(oResultData, oResponse){
					console.log('1998年5月一个月的数据: ', oResultData, oResponse);
				}
			});
		},
	   onInit: function(){
		var fnMetadataLoaded = function (oEvent) {
			var oMetadata = this.getServiceMetadata();
			console.log('metadata loaded: ', oMetadata);
			console.log('metadata from event parameter: ',oEvent.getParameter("metadata"));
		};

		this.oModel = new ODataModel("http://localhost:8089/Northwind/Northwind.svc/",
        {
            useBatch:false
        });
		this.oModel.attachMetadataLoaded(fnMetadataLoaded);
	   }
	});
 });

