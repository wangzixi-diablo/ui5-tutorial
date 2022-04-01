sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/gantt/misc/Format",
	"sap/gantt/misc/Utility"
], function (Controller, JSONModel, Format, Utility) {
	"use strict";

	return Controller.extend("sap.gantt.sample.GanttChart2JSON.Gantt", {
		onInit: function () {
			var oModel = new JSONModel(sap.ui.require.toUrl("sap/gantt/sample/GanttChart2JSON/data.json"));
			this.getView().setModel(oModel);
			var Items = ['enableNowLine','enableAdhocLine','enableStatusBar'];
			this.getView().byId("gantt").getParent().setProperty('hideSettingsItem',Items);
		},
		fnTimeConverter: function (sTimestamp) {
			return Format.abapTimestampToDate(sTimestamp);
		},
		onTaskAlignmentChange: function(oEvent) {
			var oSelectedKey = oEvent.getSource().getSelectedKey();
			this.byId("gantt").getTable().getRows().forEach(function(oRow) {
				oRow.getAggregation("_settings").getShapes1().forEach(function(oShape) {
					oShape.setAlignShape(oSelectedKey);
				});
				oRow.getAggregation("_settings").getShapes2().forEach(function(oShape) {
					oShape.setAlignShape(oSelectedKey);
				});
			});
        }
	});
});
