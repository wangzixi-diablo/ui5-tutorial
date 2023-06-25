sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/odata/v2/ODataModel',
	'sap/ui5/walkthrough/refAppMockServer/DemoMockServer',
	'sap/m/MessageToast'
], function (Controller, ODataModel, DemoMockServer, MessageToast) {
	"use strict";

	return Controller.extend("sap.ui5.walkthrough.SmartTable", {
		onInit: function () {
			var oModel, oView;

			this._oMockServer = new DemoMockServer();

			oModel = new ODataModel(this._oMockServer.getServiceUrl(), {
				defaultCountMode: "Inline",
				annotationURI: [
					this._oMockServer.getAnnotationUrl()
				]
			});

			oView = this.getView();
			oView.setModel(oModel);
		},

		onBeforeExport: function (oEvt) {
			var mExcelSettings = oEvt.getParameter("exportSettings");

			// Disable Worker as Mockserver is used in Demokit sample
			mExcelSettings.worker = false;
		},

		onPaste: function(oEvent) {
			var oResult = oEvent.getParameter("result");
			MessageToast.show("Paste result:" + JSON.stringify(oResult), {
				width: "75vw"
			});
		},

		onExit: function () {
			this._oMockServer.stop();
		}
	});
});
