sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
 ], function (Controller, MessageToast) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
		changeModel: function(){
			var oModel = this.getView().getModel();
			oModel.oData.name = 'Jerry';
			oModel.refresh();
		},
		changeControl: function(){
			this.getView().byId("myinput").setValue("Tom");
			var oModel = this.getView().getModel();
			alert("Model field value: " + oModel.oData.name);
		}
	});
 });