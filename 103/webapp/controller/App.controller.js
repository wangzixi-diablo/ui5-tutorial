sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui5/walkthrough/lib/vconsole-min"
 ], function (Controller, MessageToast,VConsole) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
	   onShowHello : function () {
		  var oBundle = this.getView().getModel("i18n").getResourceBundle();
		  var sRecipient = this.getView().getModel().getProperty("/recipient/name");
		  var sMsg = oBundle.getText("helloMsg", [sRecipient]);
		  MessageToast.show(sMsg);

		  var vConsole = new window.VConsole();
          console.log('Hello world Printed by vConsole!');
	   }
	});
 });