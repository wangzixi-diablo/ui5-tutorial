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
						title : "SAP UI5 应用开发教程之六十",
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
