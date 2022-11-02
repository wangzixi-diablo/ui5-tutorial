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
		var oModel = new ODataModel("http://services.odata.org/Northwind/Northwind.svc/");
		oModel.attachMetadataLoaded((data) =>{
			alert('metadata loaded: ', data);
		});
	   }
	});
 });