sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	var oEditor;
	var example1 = "function getDocument() {\n\treturn 'document';\n}";
	var example2 = "function myTestFunction(p1, p2) {\n\treturn 'foo';\n}";

	return Controller.extend("sap.ui5.walkthrough.controller.App1", {

		onInit: function () {
			oEditor = this.byId("aCodeEditor1");
			oEditor.setValue("// 点击 tab 来切换显示");
            const oAce = oEditor.getInternalEditorInstance();
            oAce.session.setUseWrapMode(true);
            oAce.session.setWrapLimitRange(40,40);
            oAce.setPrintMarginColumn(40);
            oAce.setShowPrintMargin(true);
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
		},

		onExecuteCode: function() {
			try {
				var sCode = oEditor.getValue();
				// 创建一个新的Function实例并执行代码
				var fnExecute = eval(sCode);
				//var result = fnExecute();
				
				// 显示执行结果
				MessageToast.show("执行结果: " + fnExecute);
			} catch (error) {
				// 如果执行出错，显示错误信息
				MessageToast.show("执行错误: " + error.message);
			}
		}

	});
});