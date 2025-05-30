sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	var oEditor;
	var example1 = "function getDocument() {\n\treturn 'document';\n}";
	var example2 = "function myTestFunction(p1, p2) {\n\treturn 'foo';\n}";

	return Controller.extend("sap.ui5.walkthrough.controller.App", {

		XML: "/webapp/view/App.view.xml",
		CONTROLLER: "/webapp/controller/App.controller.js",
		onInit: function () {
			oEditor = this.byId("aCodeEditor");
			oEditor.setValue("// 点击 tab 来切换代码显示");
		},

		loadFile: async function (sPath){
			const res = await fetch(sPath);
			const source = await res.text();
			oEditor.setValue(source);
		},
		onSelectTab: function (oEvent) {
			var sFilterId = oEvent.getParameter("selectedKey");
			switch (sFilterId) {
				case "xml":
					this.sPath = this.XML;
					break;
				case "cont":
					this.sPath = this.CONTROLLER;
					break;
			}
			this.loadFile(this.sPath);
		}
	});
});