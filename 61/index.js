sap.ui.require([
	"sap/m/Shell",
	"sap/m/App",
	"sap/m/Page",
	"sap/ui/core/ComponentContainer"
], function(
	Shell, App, Page, ComponentContainer) {
	"use strict";

	sap.ui.getCore().attachInit(function() {
		new Shell ({
			app : new App ({
				pages : [
					new Page({
						title : "Gantt Chart with JSON Binding",
						enableScrolling : false,
						content : [
							new ComponentContainer({
								height : "100%", name : "sap.gantt.sample.GanttChart2JSON",
								settings : {
									id : "sap.gantt.sample.GanttChart2JSON"
								}
							})
						]
					})
				]
			})
		}).placeAt("content");
	});
});
