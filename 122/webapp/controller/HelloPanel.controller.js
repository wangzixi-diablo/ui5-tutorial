sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller) {
	"use strict";

	return Controller.extend("sap.u5.walkthrough.controller.HelloPanel", {
		setResult: function(sResult){
			this.byId("result").setValue(sResult);
		},
		onFire : function () {
			fetch('http://localhost:8089').
			then(data => {
				return data.text();
			}).
			then(data => {
				this.setResult(data);
			});
		}
	});
});