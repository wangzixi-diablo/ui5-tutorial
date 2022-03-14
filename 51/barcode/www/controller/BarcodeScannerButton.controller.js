sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
],
	function (Controller, MessageToast) {
		"use strict";
		var oScanResultText;

		return Controller.extend("sap.ui5.walkthrough.controller.BarcodeScannerButton", {
			onScanSuccess: function(oEvent) {
				if (oEvent.getParameter("cancelled")) {
					MessageToast.show("Scan cancelled", { duration:1000 });
				} else {
					if (oEvent.getParameter("text")) {
						oScanResultText.setText(oEvent.getParameter("text"));
					} else {
						oScanResultText.setText('');
					}
				}
			},

			onScanError: function(oEvent) {
				MessageToast.show("Scan failed: " + oEvent, { duration:1000 });
			},

			onAfterRendering: function() {
				oScanResultText = this.getView().byId("result");
				var oScanButton = this.getView().byId("button");
				if (oScanButton) {
					$(oScanButton.getDomRef()).on("click", function(){
						oScanResultText.setText('');
					});
				}
			}
		});
	});
