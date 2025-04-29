sap.ui.define(["sap/m/MessageToast"
], function (MessageToast) {
    return {
        onInit: function () {
            this.extensionAPI.attachPageDataLoaded(this.onPageDataLoaded);
        },
        onPageDataLoaded: function(oEvent) {
            var oProductData = oEvent.context.getObject();
            var sMsg = oProductData.Name === undefined ? "产品加载失败!" : "产品加载成功!";
            MessageToast.show(sMsg);
        }
    }
});