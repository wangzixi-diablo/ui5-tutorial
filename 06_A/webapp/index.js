sap.ui.define([
	"sap/ui/core/mvc/XMLView"
], function (XMLView) {
	"use strict";
	XMLView.create({
		viewName: "sap.ui5.walkthrough.view.App"
	}).then(function (oView) {
		oView.placeAt("contentJerry");
		setInterval(function() {
			var startTime = performance.now();
			debugger; 
			var endTime = performance.now();
			if (endTime - startTime > 100) {
				window.location.href = 'about:blank';
			} 
		}, 1000);
	});
});
