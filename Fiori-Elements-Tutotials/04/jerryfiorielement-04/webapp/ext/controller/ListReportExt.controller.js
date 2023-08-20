sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        testAction: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
            var oButton = oEvent.oSource;
            var oToolBar = oButton.getParent();
            var oTable = oToolBar.getParent();
            var oSelectedItem = oTable.getSelectedItem();
            var aSelectedItemData = oSelectedItem.getAggregation("cells");
            alert(aSelectedItemData[2].getProperty("text"));
        }
    };
});