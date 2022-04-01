sap.ui.define([
				"sap/ui/model/json/JSONModel",
				"sap/ui/Device"
               ],function(JSONModel, Device) {
	"use strict";
	sap.ui.controller("sap.ui5.walkthrough.C", {
		onInit : function () {
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.getView().setModel(oDeviceModel, "device");
		 }
	});
}, /* bExport= */ true);
