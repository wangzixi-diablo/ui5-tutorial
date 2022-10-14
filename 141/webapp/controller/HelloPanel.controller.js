sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui5/walkthrough/config/settings"
], function (Controller, Settings) {
	"use strict";

	return Controller.extend("sap.u5.walkthrough.controller.HelloPanel", {
		setResult: function(sResult){
			this.byId("result").setValue(sResult);
		},
		onFire : function () {
			debugger;
			console.log(Settings);
			let headers = new Headers();
			let username = Settings.username;
			let password = Settings.password;
			headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
			fetch( Settings.ODataUrl, { method:'GET',
					headers: headers
					   }
			).then(data => {
				return data.text();
			}).
			then(data => {
				this.setResult(data);
			});
		}
	});
});