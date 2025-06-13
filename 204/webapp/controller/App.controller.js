sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Item"
], function (Controller, MessageToast, Item) {
    "use strict";

    return Controller.extend("sap.ui5.walkthrough.controller.App", {
        
        onInit: function () {
            this._initializeYears();
            this._initializeDays();
            this._setupEventHandlers();
            this._countdownInterval = null;
        },
        
        _initializeYears: function () {
            var oYearSelect = this.byId("yearSelect");
            var currentYear = new Date().getFullYear();
            
            for (var i = currentYear; i <= currentYear + 50; i++) {
                oYearSelect.addItem(new Item({
                    key: i.toString(),
                    text: i + "年"
                }));
            }
        },
        
        _initializeDays: function () {
            var oDaySelect = this.byId("daySelect");
            
            for (var i = 1; i <= 31; i++) {
                oDaySelect.addItem(new Item({
                    key: i.toString(),
                    text: i + "日"
                }));
            }
        },
        
        _setupEventHandlers: function () {
            var oYearSelect = this.byId("yearSelect");
            var oMonthSelect = this.byId("monthSelect");
            
            oYearSelect.attachChange(this._updateDays.bind(this));
            oMonthSelect.attachChange(this._updateDays.bind(this));
        },
        
        _updateDays: function () {
            var oYearSelect = this.byId("yearSelect");
            var oMonthSelect = this.byId("monthSelect");
            var oDaySelect = this.byId("daySelect");
            
            var sYear = oYearSelect.getSelectedKey();
            var sMonth = oMonthSelect.getSelectedKey();
            
            if (!sYear || !sMonth) {
                return;
            }
            
            var year = parseInt(sYear);
            var month = parseInt(sMonth);
            var daysInMonth = new Date(year, month, 0).getDate();
            
            // 清空现有选项（保留第一个占位符）
            oDaySelect.removeAllItems();
            oDaySelect.addItem(new Item({
                key: "",
                text: "日期"
            }));
            
            // 添加有效的日期选项
            for (var i = 1; i <= daysInMonth; i++) {
                oDaySelect.addItem(new Item({
                    key: i.toString(),
                    text: i + "日"
                }));
            }
        },
        
        onGenerateCountdown: function () {
            var oYearSelect = this.byId("yearSelect");
            var oMonthSelect = this.byId("monthSelect");
            var oDaySelect = this.byId("daySelect");
            var oDescriptionInput = this.byId("descriptionInput");
            var oErrorMessage = this.byId("errorMessage");
            var oResultPanel = this.byId("resultPanel");
            
            // 隐藏之前的错误和结果
            oErrorMessage.setVisible(false);
            oResultPanel.setVisible(false);
            
            // 获取输入值
            var sYear = oYearSelect.getSelectedKey();
            var sMonth = oMonthSelect.getSelectedKey();
            var sDay = oDaySelect.getSelectedKey();
            var sDescription = oDescriptionInput.getValue();
            
            // 验证输入
            if (!sYear || !sMonth || !sDay) {
                this._showError("请选择完整的日期！");
                return;
            }
            
            // 创建目标日期
            var targetDate = new Date(parseInt(sYear), parseInt(sMonth) - 1, parseInt(sDay));
            var now = new Date();
            
            // 检查日期是否有效
            if (targetDate <= now) {
                this._showError("目标日期必须是未来的日期！");
                return;
            }
            
            // 计算并显示结果
            this._calculateAndDisplayCountdown(targetDate, sDescription);
            
            // 显示成功消息
            MessageToast.show("倒计时生成成功！");
        },
        
        _calculateAndDisplayCountdown: function (targetDate, description) {
            var now = new Date();
            var timeDiff = targetDate.getTime() - now.getTime();
            
            // 计算各种时间差
            var monthsDiff = this._calculateMonthsDifference(now, targetDate);
            var daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            var secondsDiff = Math.ceil(timeDiff / 1000);
            
            // 更新显示
            this.byId("eventTitle").setText(description || "倒计时事件");
            this.byId("monthsDisplay").setText(monthsDiff.toString());
            this.byId("daysDisplay").setText(daysDiff.toString());
            this.byId("secondsDisplay").setText(secondsDiff.toLocaleString());
            
            // 更新详细信息
            this.byId("targetDateText").setText("目标日期: " + targetDate.toLocaleDateString('zh-CN'));
            this.byId("currentDateText").setText("当前日期: " + now.toLocaleDateString('zh-CN'));
            this.byId("lastUpdateText").setText("最后更新: " + now.toLocaleString('zh-CN'));
            
            // 显示结果面板
            this.byId("resultPanel").setVisible(true);
            
            // 开始实时更新秒数
            this._startSecondsCountdown(targetDate);
        },
        
        _calculateMonthsDifference: function (startDate, endDate) {
            var startYear = startDate.getFullYear();
            var startMonth = startDate.getMonth();
            var endYear = endDate.getFullYear();
            var endMonth = endDate.getMonth();
            
            var months = (endYear - startYear) * 12 + (endMonth - startMonth);
            
            if (endDate.getDate() < startDate.getDate()) {
                months--;
            }
            
            return Math.max(0, months);
        },
        
        _startSecondsCountdown: function (targetDate) {
            // 清除之前的倒计时
            if (this._countdownInterval) {
                clearInterval(this._countdownInterval);
            }
            
            var oSecondsDisplay = this.byId("secondsDisplay");
            var oLastUpdateText = this.byId("lastUpdateText");
            
            this._countdownInterval = setInterval(function () {
                var now = new Date();
                var timeDiff = targetDate.getTime() - now.getTime();
                
                if (timeDiff <= 0) {
                    oSecondsDisplay.setText("0");
                    oLastUpdateText.setText("倒计时已结束！");
                    clearInterval(this._countdownInterval);
                    MessageToast.show("倒计时已结束！");
                    return;
                }
                
                var secondsDiff = Math.ceil(timeDiff / 1000);
                oSecondsDisplay.setText(secondsDiff.toLocaleString());
                oLastUpdateText.setText("最后更新: " + now.toLocaleString('zh-CN'));
            }.bind(this), 1000);
        },
        
        _showError: function (message) {
            var oErrorMessage = this.byId("errorMessage");
            oErrorMessage.setText(message);
            oErrorMessage.setVisible(true);
        },
        
        onExit: function () {
            if (this._countdownInterval) {
                clearInterval(this._countdownInterval);
            }
        }
    });
});