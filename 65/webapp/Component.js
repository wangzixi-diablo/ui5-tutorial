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
			UIComponent.prototype.init.apply(this, arguments);

			this.setModel(models.createDeviceModel(), "device");
		}
	});
});