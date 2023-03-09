sap.ui.define([
	"sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
	"use strict";

	new ComponentContainer({
		name: "sap.ui5.walkthrough",
		settings : {
			id : "walkthrough"
		},
		async: true
	}).placeAt("content");

	var N = 2000;
	var M = 0;
	for( var i = 0; i < N; i++){
		for( var j = 0; j < N; j++){
			for( var k = 0; k < N; k++){
				M = M + 1;
			}
		}
	}
	alert("ok");
});