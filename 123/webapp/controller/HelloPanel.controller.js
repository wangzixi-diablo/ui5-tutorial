sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/Fragment",
], function (Controller,Fragment) {
	"use strict";

	return Controller.extend("sap.u5.walkthrough.controller.HelloPanel", {
		setResult: function(sResult){
			this.byId("result").setValue(sResult);
		},
		displayBusyDialog: function(){
			if (!this._pBusyDialog) {
				this._pBusyDialog = Fragment.load({
					name: "sap.ui5.walkthrough.view.Dialog",
					controller: this
				}).then(function (oBusyDialog) {
					this.getView().addDependent(oBusyDialog);
					return oBusyDialog;
				}.bind(this));
			}

			this._pBusyDialog.then(function(oBusyDialog) {
				oBusyDialog.open();
			}.bind(this));
		},
		closeBusyDialog: function(){
			this._pBusyDialog.then(function(oBusyDialog) {
				oBusyDialog.close();
			});
		},
		onFire : function () {
			this.displayBusyDialog();

			fetch('http://localhost:8089').
			then(data => {
				return data.text();
			}).
			then(data => {
				this.setResult(data);
				this.closeBusyDialog();
			});
		}
	});
});