sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/v2/ODataModel"
 ], function (Controller, ODataModel) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
	   onShowHello : function () {
		  alert("Hello");
	   },
	   onInit: function(){
		   // https://sapui5.hana.ondemand.com/#/topic/6c47b2b39db9404582994070ec3d57a2#loio218afa0780da42fd982b72e992fb57d2
		var fnMetadataLoaded = function (data) {
			var oMetadata = this.oModel.getServiceMetadata();
			console.log('metadata loaded: ', oMetadata);
		}.bind(this);

		this.oModel = new ODataModel("http://localhost:8089/Northwind/Northwind.svc/");
		this.oModel.attachMetadataLoaded(fnMetadataLoaded);
	   }
	});
 });