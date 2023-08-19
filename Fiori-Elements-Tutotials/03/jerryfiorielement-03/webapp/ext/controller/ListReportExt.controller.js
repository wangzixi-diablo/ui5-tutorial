sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        testAction: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});