sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("sap.u5.walkthrough.controller.HelloPanel", {
		setResult: function(sResult){
			this.byId("result").setValue(sResult);
		},
		onFire : function () {
			let headers = new Headers();
			let username = 'WANGJER';
			let password = '你的ABAP系统的密码';
			headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
			fetch('http://localhost:8089/sap/opu/odata/sap/ZBOOK_MANAGE_SRV/$metadata',
				{method:'GET',
					headers: headers
		   	}).
			then(data => {
				return data.text();
			}).
			then(data => {
				this.setResult(data);
			});
		}
	});
});