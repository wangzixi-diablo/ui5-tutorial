sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	var oEditor;
	var example1 = "function getDocument() {\n\treturn 'document';\n}";
	var example2 = "function myTestFunction(p1, p2) {\n\treturn 'foo';\n}";

	return Controller.extend("sap.ui5.walkthrough.controller.App", {

		onInit: function () {
			oEditor = this.byId("aCodeEditor");
			oEditor.setValue("// 点击 tab 来切换显示");
		},

		onSelectTab: function (oEvent) {
			var sFilterId = oEvent.getParameter("selectedKey");
			switch (sFilterId) {
				case "A":
					oEditor.setValue(example2);
					break;
				case "B":
					oEditor.setValue(example1);
					break;
				default:
					oEditor.setValue();
					break;
			}
		}

	});
});