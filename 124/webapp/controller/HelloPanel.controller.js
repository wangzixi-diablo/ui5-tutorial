sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller) {
	"use strict";

	return Controller.extend("sap.u5.walkthrough.controller.HelloPanel", {
		setResult: function(sResult){
			this.byId("result").setValue(sResult);
		},
		enableSendButton: function(){
			this.byId("send").setEnabled(true);
		},
		disableSendButton: function(){
			this.byId("send").setEnabled(false);
		},
		_throttle: function(fn, delay) {
            let last, deferTimer
            return function (args) {
            	let that = this;
                let _args = arguments;
                let now = +new Date();
                if (last && now < last + delay) {
                    clearTimeout(deferTimer);
                    deferTimer = setTimeout(function () {
                        last = now;
                        fn.apply(that, _args);
                    }, delay);
                } 
                else {
                    last = now;
                    fn.apply(that, _args);
                }
            }
		},
		onInit: function(){
			this.throttledSend = this._throttle(this.originalSend, 3000);
		},
		originalSend: function(){
			fetch('http://localhost:8089').
			then(data => {
				return data.text();
			}).
			then(data => {
				this.setResult(data);
			});
		},
		onFire : function () {
			this.throttledSend();
		}
	});
});