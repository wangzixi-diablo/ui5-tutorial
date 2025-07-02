sap.ui.define(["sap/ui/core/BusyIndicator"
], function (BusyIndicator) {
    return {
        onAfterRendering: function () {
            this.extensionAPI.attachPageDataLoaded(this.onPageDataLoaded);
            BusyIndicator.show(500);
        },
        onPageDataLoaded: function() {
            BusyIndicator.hide();
        },
        onActionPressed: function(){
            console.log('Current data:', this.getView().getModel().oData);
            let a = 1;
            
        }
    }
});