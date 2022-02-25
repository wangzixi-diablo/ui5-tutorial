sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
		printID: function(){
			var allElement = $("*");
			return allElement.filter(( index, element ) => {
				if( element.id === "" ){
					return false;
				}
				return element.tagName !== "SCRIPT";
			}).each((index, element) => {
				console.log(element.tagName, 'ID: ', element.id);
			});
		},
		onInit : function () {
			console.log('on Init: ');
			this.printID();
		},
		onAfterRendering: function(){
			console.log('on AfterRendering: ');
			var oResult = this.printID();
			var oCore = sap.ui.getCore();
			oResult.each((index, element) => {
				var oUI5Control = oCore.byId(element.id);
				if( oUI5Control) {
					console.log('Control found: ', oUI5Control);
				}
				else{
					console.log('Control not found for id: ', element.id);
				}
			});
		}
	});
});