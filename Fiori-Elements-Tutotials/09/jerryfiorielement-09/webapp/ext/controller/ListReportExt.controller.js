sap.ui.define([], function () {
    return {
        onInitSmartFilterBarExtension: function(oSmartFilterBar) {
            debugger;
            var sFieldName = "MainProductCategory";
            var oControl = oSmartFilterBar.getSource();
            var mData = {};
            mData[sFieldName] = "Software";
            oControl.setFilterData(mData);
            setTimeout(function(){ oControl.search && oControl.search(); }, 0);
        }
    }
});
