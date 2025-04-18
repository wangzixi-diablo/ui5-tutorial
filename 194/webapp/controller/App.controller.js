sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui5/walkthrough/lib/qrcode.min"
], function(Controller, MessageToast,QRCode) {
	"use strict";

	return Controller.extend("sap.ui5.walkthrough.controller.App", {
		onInit: function() {
			//jQuery.sap.includeScript("resources/qrcode.min.js");
		},
		
		onGenerateQRCode: function() {
			var sText = this.getView().byId("textInput").getValue();
			
			if (!sText) {
				MessageToast.show("请输入文本");
				return;
			}
			
			var oQRCode = this.byId("qrcode");
			oQRCode.getDomRef().innerHTML = "";
			
			new window.QRCode(oQRCode.getDomRef(), {
				text: sText,
				width: 200,
				height: 200,
				colorDark: "#000000",
				colorLight: "#ffffff",
				correctLevel: window.QRCode.CorrectLevel.H
			});
			
			MessageToast.show("二维码已生成");
		}
	});
});