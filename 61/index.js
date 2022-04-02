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
						title : "在 SAP UI5 应用里绘制甘特图 Gantt Chart",
						enableScrolling : false,
						content : [
							new ComponentContainer({
								height : "100%", name : "sap.ui5.walkthrough",
								settings : {
									id : "sap.ui5.walkthrough"
								}
							})
						]
					})
				]
			})
		}).placeAt("content");
	});
});
