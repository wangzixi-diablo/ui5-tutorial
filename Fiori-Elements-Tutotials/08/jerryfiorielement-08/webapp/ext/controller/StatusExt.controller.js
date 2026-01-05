sap.ui.define(["sap/ui/core/BusyIndicator"
], function (BusyIndicator) {
    return {
        onAfterRendering: function () {
            // Bind the controller context so 'this' inside onPageDataLoaded refers to the controller instance
            this.extensionAPI.attachPageDataLoaded(this.onPageDataLoaded.bind(this));
            BusyIndicator.show(500);
        },
        disableButton: function(){
            var sPrefix = this.extensionAPI.getViewId();
            var sButtonID = sPrefix + "--edit";
            var oButton = this.getView().byId(sButtonID);
            oButton.setEnabled(false);
        },

        onPageDataLoaded: function() {
            BusyIndicator.hide();
            if( 0 === 1){
                this.disableButton();
            }
        },
        onActionPressed: function(){
            console.log('Current data:', this.getView().getModel().oData);
        }
    }
});