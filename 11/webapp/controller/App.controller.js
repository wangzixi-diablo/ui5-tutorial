sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
 ], function (Controller, MessageToast) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
	   onShowHello : function () {
		  var oBundle = this.getView().getModel("i18n").getResourceBundle();
		  var sRecipient = this.getView().getModel().getProperty("/recipient/name");
		  var sMsg = oBundle.getText("helloMsg", [sRecipient]);
		  MessageToast.show(sMsg);
	   },
	   onBeforeRendering(){
        var oView = this.getView();
        console.log('Jerry App view: ', oView);
       }
	});
 });