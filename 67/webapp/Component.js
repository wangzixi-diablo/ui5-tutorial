sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui5/walkthrough/model/models"
], function (UIComponent, models) {
	"use strict";

	return UIComponent.extend("sap.ui5.walkthrough.Component", {
		metadata : {
			manifest : "json"
		},
		init : function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});