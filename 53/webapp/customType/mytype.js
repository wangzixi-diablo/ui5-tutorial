sap.ui.define([
    "sap/ui/model/SimpleType",
    "sap/ui/model/ValidateException"
], function (SimpleType, ValidateException) {
    "use strict";
    return SimpleType.extend("sap.ui5.walkthrough.customType.mytype", {
        formatValue: function(sValue) {
            var aDigits = sValue.split("");
            var sOutput = "";
            $.each(aDigits, function(i, iDigit){
	            if ((i > 0) && (i % 4 === 0)) {
	                sOutput = sOutput + "-" + iDigit;
                }
                else {
                    sOutput += iDigit;
                }
            });
            return sOutput;
        },
        parseValue: function(sValue) {
            return sValue.replace(/-/g, "");
        },
        validateValue: function(sValue) {
            if( !this._isNumeric(sValue)){
                throw new ValidateException(sValue + " 格式不合法!");
            }
        },
        _isNumeric: function(str) {
            if (typeof str != "string") 
                return false; 
            return !isNaN(str) && !isNaN(parseFloat(str));
        }
    });
});