sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/v2/ODataModel"
 ], function (Controller, ODataModel) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
	   onRead : function () {
		  this.oModel.read("/Invoices",
		  {
			success:function(oResultData, oResponse){
				console.log('Successfully read: ', oResultData, oResponse);
			}
		  });
	   },
	   onInit: function(){
		var fnMetadataLoaded = function (oEvent) {
			var oMetadata = this.getServiceMetadata();
			console.log('metadata loaded: ', oMetadata);
			console.log('metadata from event parameter: ',oEvent.getParameter("metadata"));
		};

		this.oModel = new ODataModel("http://localhost:8089/Northwind/Northwind.svc/");
		this.oModel.attachMetadataLoaded(fnMetadataLoaded);
	   }
	});
 });

