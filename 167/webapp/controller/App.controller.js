sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/v2/ODataModel"
 ], function (Controller, ODataModel) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
	   	onRead : function () {
			var that = this;
			this.oModel.createBindingContext("/Orders(10248)",null,function(oContext){
				var oOrder = oContext.getObject();
				console.log('order ID: ', oOrder.OrderID);
				var mParameters = {
					context: oContext,
					urlParameters: {
						$expand: "Order_Details"
					},
					success:function(oResultData, oResponse){
							console.log('Successfully read: ', oResultData, oResponse);
						},
				};
				that.oModel.read(null, mParameters);
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

