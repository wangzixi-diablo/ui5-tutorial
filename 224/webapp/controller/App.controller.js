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
                isPaused: false,
                buttonText: "开始"
            });
            this.getView().setModel(oModel);
        },

        // 新增：格式化圆形时钟进度条
        formatClockProgress: function(progress) {
            var percentage = progress || 0;
            var angle = (percentage / 100) * 360;
            
            // 创建圆形时钟进度条的HTML和CSS
            var html = `
                <div style="
                    position: relative;
                    width: 200px;
                    height: 200px;
                    margin: 20px auto;
                    border-radius: 50%;
                    background: #f0f0f0;
                    border: 4px solid #ddd;
                    overflow: hidden;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                ">
                    <!-- 进度填充 -->
                    <div style="
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: conic-gradient(
                            #0070f3 0deg,
                            #0070f3 ${angle}deg,
                            transparent ${angle}deg,
                            transparent 360deg
                        );
                        border-radius: 50%;
                    "></div>
                    
                    <!-- 中心圆圈 -->
                    <div style="
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 120px;
                        height: 120px;
                        background: white;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 24px;
                        font-weight: bold;
                        color: #333;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    ">${percentage}%</div>
                    
                    <!-- 时钟刻度 -->
                    <div style="
                        position: absolute;
                        top: 10px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 2px;
                        height: 20px;
                        background: #666;
                    "></div>
                    <div style="
                        position: absolute;
                        top: 50%;
                        right: 10px;
                        transform: translateY(-50%);
                        width: 20px;
                        height: 2px;
                        background: #666;
                    "></div>
                    <div style="
                        position: absolute;
                        bottom: 10px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 2px;
                        height: 20px;
                        background: #666;
                    "></div>
                    <div style="
                        position: absolute;
                        top: 50%;
                        left: 10px;
                        transform: translateY(-50%);
                        width: 20px;
                        height: 2px;
                        background: #666;
                    "></div>
                </div>
            `;
            
            return html;
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

        onPausePress: function () {
            var oModel = this.getView().getModel();
            var bIsPaused = oModel.getProperty("/isPaused");
            
            if (bIsPaused) {
                // 继续进度条
                this._resumeProgress();
                MessageToast.show("进度条已继续");
            } else {
                // 暂停进度条
                this._pauseProgress();
                MessageToast.show("进度条已暂停");
            }
        },

        onResetPress: function () {
            this._resetProgress();
            MessageToast.show("进度条已重置");
        },

        _startProgress: function () {
            var oModel = this.getView().getModel();
            
            // 设置运行状态
            oModel.setProperty("/isRunning", true);
            oModel.setProperty("/isPaused", false);
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

        _pauseProgress: function () {
            var oModel = this.getView().getModel();
            
            // 清除定时器但保持运行状态
            if (this._intervalId) {
                clearInterval(this._intervalId);
                this._intervalId = null;
            }
            
            // 设置暂停状态
            oModel.setProperty("/isPaused", true);
        },

        _resumeProgress: function () {
            var oModel = this.getView().getModel();
            
            // 设置继续状态
            oModel.setProperty("/isPaused", false);
            
            // 重新启动定时器
            this._intervalId = setInterval(function () {
                var iCurrentProgress = oModel.getProperty("/progress");
                var iNewProgress = Math.min(iCurrentProgress + 2, 100);
                
                oModel.setProperty("/progress", iNewProgress);
                
                // 如果达到100%，停止进度条
                if (iNewProgress >= 100) {
                    this._stopProgress();
                    MessageToast.show("进度完成！");
                }
            }.bind(this), 1000);
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
            oModel.setProperty("/isPaused", false);
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