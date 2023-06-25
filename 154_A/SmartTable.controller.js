sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/odata/v2/ODataModel',
	'sap/ui5/walkthrough/mockserver/DemoMockServer'
], function (Controller, ODataModel, DemoMockServer) {
	"use strict";

	return Controller.extend("sap.ui5.walkthrough.SmartTable", {
		onInit: function () {
			var oModel, oView;

			this._oMockServer = new DemoMockServer();

			oModel = new ODataModel(this._oMockServer.getServiceUrl(), {
				defaultCountMode: "Inline"
			});

			oView = this.getView();
			oView.setModel(oModel);
		},
		onBeforeExport: function (oEvt) {
			var mExcelSettings = oEvt.getParameter("exportSettings");
			// GW export
			if (mExcelSettings.url) {
				return;
			}
			// For UI5 Client Export --> The settings contains sap.ui.export.SpreadSheet relevant settings that be used to modify the output of excel

			// Disable Worker as Mockserver is used in Demokit sample --> Do not use this for real applications!
			mExcelSettings.worker = false;
		},
		onExit: function () {
			this._oMockServer.stop();
		}
	});
});
