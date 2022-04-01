sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/gantt/misc/Format",
	"sap/gantt/misc/Utility"
], function (Controller, JSONModel, Format, Utility) {
	"use strict";

	return Controller.extend("sap.ui5.walkthrough.Gantt", {
		onInit: function () {
			var oModel = new JSONModel(sap.ui.require.toUrl("sap/ui5/walkthrough/data.json"));
			this.getView().setModel(oModel);
			/*var Items = ['enableNowLine','enableAdhocLine','enableStatusBar'];
			this.getView().byId("gantt").getParent().setProperty('hideSettingsItem',Items);*/
		},
		fnTimeConverter: function (sTimestamp) {
			return Format.abapTimestampToDate(sTimestamp);
		}
	});
});
