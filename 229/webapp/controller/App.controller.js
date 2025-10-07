sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
 ], function (Controller, MessageToast) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
	   onSummary : function () {
		// 获取自定义地图控件（假设在 App.view.xml 中 id="nlp-map"）
		var oMap = this.byId("nlp-map");
		if (!oMap) {
			MessageToast.show("未找到地图控件 nlp-map");
			return;
		}
		var bCurrent = oMap.getStyleCalculated();
		var bNext = !bCurrent;
		oMap.setStyleCalculated(bNext);
		// 触发控件重新渲染（invalidate 会让 UI5 在本轮渲染周期重绘该控件）
		oMap.invalidate();
	   }
	});
 });