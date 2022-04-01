sap.ui.define([
	"sap/ui/core/UIComponent"
], function (UIComponent) {
	"use strict";

	return UIComponent.extend("sap.gantt.sample.GanttChart2JSON.Component", {
		metadata: {
			rootView: {
				"viewName": "sap.gantt.sample.GanttChart2JSON.Gantt",
				"type": "XML",
				"async": true
			},

			dependencies: {
				libs: [
					"sap.gantt",
					"sap.ui.table",
					"sap.m"
				]
			},
			config: {
				sample: {
					stretch: true,
					files: [
						"Component.js",
						"Gantt.controller.js",
						"Gantt.view.xml",
						"data.json"
					]
				}
			}
		}
	});
});
