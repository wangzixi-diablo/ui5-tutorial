sap.ui.define([
	"sap/ui/core/mvc/Controller"
 ], function (Controller) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {

	   bPlayed: false,
	   onClicked : function () {
		  	var audioElement = document.getElementById(`background-music`);

			if( this.bPlayed === false){
				this.bPlayed = true;
				audioElement.play();
				this.byId("controlButton").setText("暂停");
			}
			else{
				this.bPlayed = false;
				audioElement.pause();
				this.byId("controlButton").setText("播放");
			}
	   }
	});
 });