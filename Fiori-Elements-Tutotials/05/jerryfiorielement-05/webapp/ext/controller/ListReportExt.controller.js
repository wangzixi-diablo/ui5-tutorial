sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        testAction: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
            var aContexts = this.extensionAPI.getSelectedContexts();
            var oSelectedItem = aContexts[0];
            var data = oSelectedItem.getModel().getObject(oSelectedItem.getPath());
            console.log('Selected Rows are => ', data);
        }
    };
});