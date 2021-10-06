sap.ui.define([
	"sap/m/Text"
], function (Text) {
	"use strict";

	var text = new Text({
		text: "Hello World",
		tooltip: "我是 Tooltip"
	});
	
	text.placeAt("content");
});
