sap.ui.define([], function () {
	"use strict";

	return {
		numberUnit: function (sValue) {
			if (!sValue) {
				return "";
			}

			return parseFloat(sValue).toFixed(2);
		},
		priceState: function () {
		}
	};
});
