sap.ui.define([
	"sap/ui/core/mvc/Controller"
 ], function (Controller) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
	   onShowHello : function () {
		  alert("Hello");
	   },
	   onInit: function(){
		   alert("init");
	   }
	});
 });