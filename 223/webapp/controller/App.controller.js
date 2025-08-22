sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast,JSONModel) {
    "use strict";

    return Controller.extend("sap.ui5.walkthrough.controller.App", {
        
        onInit: function () {
            this._intervalId = null;
			var oModel = new JSONModel({
                progress: 0,
                isRunning: false,
                buttonText: "开始"
            });
            this.getView().setModel(oModel);
        },

        onStartPress: function () {
            var oModel = this.getView().getModel();
            var iCurrentProgress = oModel.getProperty("/progress");
            
            // 如果已经完成，先重置
            if (iCurrentProgress >= 100) {
                this._resetProgress();
            }
            
            // 开始进度条
            this._startProgress();
            MessageToast.show("进度条已开始，每秒增加2%");
        },

        onResetPress: function () {
            this._resetProgress();
            MessageToast.show("进度条已重置");
        },

        _startProgress: function () {
            var oModel = this.getView().getModel();
            
            // 设置运行状态
            oModel.setProperty("/isRunning", true);
            oModel.setProperty("/buttonText", "运行中...");
            
            // 每秒增加2%
            this._intervalId = setInterval(function () {
                var iCurrentProgress = oModel.getProperty("/progress");
                var iNewProgress = Math.min(iCurrentProgress + 2, 100);
                
                oModel.setProperty("/progress", iNewProgress);
                
                // 如果达到100%，停止进度条
                if (iNewProgress >= 100) {
                    this._stopProgress();
                    MessageToast.show("进度完成！");
                }
            }.bind(this), 1000); // 1000ms = 1秒
        },

        _stopProgress: function () {
            var oModel = this.getView().getModel();
            
            // 清除定时器
            if (this._intervalId) {
                clearInterval(this._intervalId);
                this._intervalId = null;
            }
            
            // 更新状态
            oModel.setProperty("/isRunning", false);
            oModel.setProperty("/buttonText", "开始");
        },

        _resetProgress: function () {
            var oModel = this.getView().getModel();
            
            // 停止当前进度
            this._stopProgress();
            
            // 重置进度
            oModel.setProperty("/progress", 0);
            oModel.setProperty("/buttonText", "开始");
        },

        onExit: function () {
            // 清理定时器
            if (this._intervalId) {
                clearInterval(this._intervalId);
            }
        }
    });
});