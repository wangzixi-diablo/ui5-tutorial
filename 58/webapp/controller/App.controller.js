sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/library",
	"sap/ui/core/Locale",
	"sap/ui/core/LocaleData",
	"sap/ui/model/type/Currency",
	"sap/m/ObjectAttribute"
], function (Controller, mobileLibrary, Locale, LocaleData, Currency, ObjectAttribute) {
	"use strict";

	return Controller.extend("sap.ui.demo.db.controller.App", {
		formatStockValue : function(fUnitPrice, iStockLevel, sCurrCode) {
			var oCurrency = new Currency();
			return oCurrency.formatValue([fUnitPrice * iStockLevel, sCurrCode], "string");
		},
		productListFactory : function(sId, oContext) {
			var oUIControl;
			if (oContext.getProperty("UnitsInStock") === 0 && oContext.getProperty("Discontinued")) {
				oUIControl = this.byId("productSimple").clone(sId);
			} else {
				oUIControl = this.byId("productExtended").clone(sId);

				if (oContext.getProperty("UnitsInStock") < 1) {
					oUIControl.addAttribute(new ObjectAttribute({
						text : {
							path: "i18n>outOfStock"
						}
					}));
				}
			}
			return oUIControl;
		}
	});
});