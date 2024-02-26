sap.ui.define([
	"sap/ui/core/format/NumberFormat"
], function(NumberFormat) {
	"use strict";

	var formatter = {

		amountCurrency: function(oAmount, sCurrency) {
			var PUNCTUATION_SPACE = '\u2008';
			var FIGURE_SPACE = '\u2007';
			var MAX_CURRENCY_DIGITS = 3;

			// Adapted logic from sap.ui.unified.Currency to implement basic padding for some currencies (Ex: JPY)
			if (oAmount === undefined || oAmount === null || sCurrency === "*") {
				return "";
			}
			// Get the formatted numeric value
			var oCurrencyInstance = NumberFormat.getCurrencyInstance({
				showMeasure: false
			});
			var sValue = oCurrencyInstance.format(oAmount, sCurrency);

			// Get the currency digits
			var iCurrencyDigits = oCurrencyInstance.oLocaleData.getCurrencyDigits(sCurrency);

			// Add padding for decimal "."
			if (iCurrencyDigits === 0) {
				sValue += PUNCTUATION_SPACE;
			}
			// Calculate and set padding for missing currency digits
			var iPadding = MAX_CURRENCY_DIGITS - iCurrencyDigits;
			if (iPadding) {
				sValue = sValue.padEnd(sValue.length + iPadding, FIGURE_SPACE);
			}
			return sValue;
		}

	};

	return formatter;
}, /* bExport= */true);
