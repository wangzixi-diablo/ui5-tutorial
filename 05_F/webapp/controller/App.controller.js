
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/library",
	"sap/m/MessageToast"
	], function (Controller, Library, MessageToast) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
		// Opens SAP website in a new browser window/tab
		onOpenSap: function () {
			// Use URLHelper to safely open external URL in a new tab
			Library.URLHelper.redirect("https://www.sap.com", true);
		}
		,
		// Opens Baidu in a popup window
		onOpenBaiduPopup: function () {
			// Try to open a popup window with reasonable features
			var popup = window.open("https://www.baidu.com", "_blank", "noopener,noreferrer,width=1024,height=768,scrollbars=yes,resizable=yes");
			if (!popup) {
				MessageToast.show("Popup blocked by the browser. Please allow popups for this site.");
				return;
			}
			try {
				// For security, explicitly set noopener/noreferrer when possible
				popup.opener = null;
			} catch (e) {
				// Ignore if the browser prevents access
			}
		}
	});
});