sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/dnd/DragInfo",
	"sap/ui/core/dnd/DropInfo",
	"sap/f/dnd/GridDropInfo",
	"../RevealGrid/RevealGrid",
	"sap/ui/core/library"
], function (Controller, JSONModel, DragInfo, DropInfo, GridDropInfo, RevealGrid, coreLibrary) {
	"use strict";

	return Controller.extend("sap.ui5.walkthrough.controller.Page", {

		onInit: function () {
			this.initData();
		},

		initData: function () {
			this.byId("list1").setModel(new JSONModel([
				{ title: "ABAP 2x2", rows: 2, columns: 2 },
				{ title: "Java 3x3", rows: 3, columns: 3 },
				{ title: "JavaScript 2x4", rows: 2, columns: 4 }
			]));

			this.byId("grid1").setModel(new JSONModel([
				{ title: "Python 4x2", rows: 4, columns: 2 },
				{ title: "NodeJs 2x3", rows: 2, columns: 3 },
				{ title: "ChatGPT 2x2", rows: 2, columns: 2 }
			]));
		},

		onRevealGrid: function () {
			RevealGrid.toggle("grid1", this.getView());
		}
	});
});