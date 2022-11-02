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
		var oModel = new ODataModel("http://localhost:8089/Northwind/Northwind.svc/");
		oModel.attachMetadataLoaded((data) =>{
			console.log('metadata loaded: ', data);
		});
	   }
	});
 });