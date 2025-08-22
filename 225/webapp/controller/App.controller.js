sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller,JSONModel) {
    "use strict";

    return Controller.extend("sap.ui5.walkthrough.controller.App", {
        onInit: function () {
            var oModel = new JSONModel({
                cards: [
                    { id: 1, title: "卡片 1", image: "https://picsum.photos/200/150?random=1", flipped: false },
                    { id: 2, title: "卡片 2", image: "https://picsum.photos/200/150?random=2", flipped: false },
                    { id: 3, title: "卡片 3", image: "https://picsum.photos/200/150?random=3", flipped: false },
                    { id: 4, title: "卡片 4", image: "https://picsum.photos/200/150?random=4", flipped: false },
                    { id: 5, title: "卡片 5", image: "https://picsum.photos/200/150?random=5", flipped: false },
                    { id: 6, title: "卡片 6", image: "https://picsum.photos/200/150?random=6", flipped: false },
                    { id: 7, title: "卡片 7", image: "https://picsum.photos/200/150?random=7", flipped: false },
                    { id: 8, title: "卡片 8", image: "https://picsum.photos/200/150?random=8", flipped: false },
                    { id: 9, title: "卡片 9", image: "https://picsum.photos/200/150?random=9", flipped: false },
                    { id: 10, title: "卡片 10", image: "https://picsum.photos/200/150?random=10", flipped: false }
                ]
            });
            this.getView().setModel(oModel);
        },

        onCardPress: function (oEvent) {
            var oSource = oEvent.getSource();
            var oBindingContext = oSource.getBindingContext();
            var oModel = this.getView().getModel();
            var sPath = oBindingContext.getPath();
            var bCurrentFlipped = oModel.getProperty(sPath + "/flipped");
            
            // 切换翻转状态
            oModel.setProperty(sPath + "/flipped", !bCurrentFlipped);
            
            // 添加翻转动画类
            var oDomRef = oSource.getDomRef();
            if (oDomRef) {
                oDomRef.classList.add("flipping");
                setTimeout(function() {
                    oDomRef.classList.remove("flipping");
                }, 600);
            }
        }
    });
});