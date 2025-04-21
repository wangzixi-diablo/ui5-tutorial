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
        },
        onBeforeRebindTableExtension: function(oEvent) {
            const oTable = oEvent.oSource.getAggregation("items")[0]; 
            oTable.attachSelectionChange((oEvent)=>{
                const oSelectedItem = oEvent.oSource.getSelectedItem();
                var aSelectedItemData = oSelectedItem.getAggregation("cells");
                alert("You have selected: " + aSelectedItemData[2].getProperty("text"));
            });
        }
    };
});