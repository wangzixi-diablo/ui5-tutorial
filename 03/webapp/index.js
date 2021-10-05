sap.ui.define([
	"sap/m/Text"
], function (Text) {
	"use strict";

	new Text({
		text: "Hello World",
		tooltip: "我是 Tooltip"
	}).placeAt("content");
});
