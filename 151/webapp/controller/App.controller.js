sap.ui.define([
	"sap/ui/core/mvc/Controller"
 ], function (Controller) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
		controllerLocal1 : function () {
		  alert("控制器局部方法1");
	   },
	    controllerLocal2 : function () {
		alert("控制器局部方法2");
	 }
	});
 });