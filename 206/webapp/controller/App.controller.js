sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui5/walkthrough/model/model"
], function (Controller, MessageToast, models) {
    "use strict";

    return Controller.extend("sap.ui5.walkthrough.controller.App", {

        onInit: function () {
            // 设置时区模型
            var oTimezoneModel = models.createTimezoneModel();
            this.getView().setModel(oTimezoneModel, "timezone");
        },

        onConvertTime: function () {
            var oModel = this.getView().getModel("timezone");
            var sSourceTime = oModel.getProperty("/sourceTime");
            var sSelectedTimezone = oModel.getProperty("/selectedTimezone");

            if (!sSourceTime) {
                MessageToast.show("请先选择源时间");
                return;
            }

            try {
                // 解析时间
                var aTimeParts = sSourceTime.split(":");
                var iHours = parseInt(aTimeParts[0], 10);
                var iMinutes = parseInt(aTimeParts[1], 10);

                if (isNaN(iHours) || isNaN(iMinutes) || iHours < 0 || iHours > 23 || iMinutes < 0 || iMinutes > 59) {
                    MessageToast.show("请输入有效的时间格式 (HH:mm)");
                    return;
                }

                // 创建今天的日期对象，设置为源时区的时间
                var oToday = new Date();
                var sDateString = oToday.getFullYear() + "-" + 
                    String(oToday.getMonth() + 1).padStart(2, '0') + "-" + 
                    String(oToday.getDate()).padStart(2, '0');
                
                var sSourceDateTime = sDateString + "T" + 
                    String(iHours).padStart(2, '0') + ":" + 
                    String(iMinutes).padStart(2, '0') + ":00";

                // 获取时区偏移量
                var oSourceDate = new Date(sSourceDateTime);
                var iSourceOffset = this._getTimezoneOffset(sSelectedTimezone);
                var iBeijingOffset = 8; // 北京时间 GMT+8

                // 计算时差（小时）
                var iTimeDifference = iBeijingOffset - iSourceOffset;

                // 转换时间
                var oConvertedDate = new Date(oSourceDate.getTime() + (iTimeDifference * 60 * 60 * 1000));
                
                var sConvertedTime = String(oConvertedDate.getHours()).padStart(2, '0') + ":" + 
                    String(oConvertedDate.getMinutes()).padStart(2, '0');

                // 检查是否跨日期
                var sDateInfo = "";
                if (oConvertedDate.getDate() !== oToday.getDate()) {
                    if (oConvertedDate.getDate() > oToday.getDate()) {
                        sDateInfo = " (+1天)";
                    } else {
                        sDateInfo = " (-1天)";
                    }
                }

                var sResult = sConvertedTime + sDateInfo + " (北京时间)";
                oModel.setProperty("/convertedTime", sResult);

                MessageToast.show("转换成功！");

            } catch (oError) {
                MessageToast.show("转换失败，请检查输入格式");
                console.error("时间转换错误:", oError);
            }
        },

        /**
         * 获取时区偏移量（相对于UTC的小时数）
         * @param {string} sTimezone - 时区标识符
         * @returns {number} 偏移量（小时）
         */
        _getTimezoneOffset: function (sTimezone) {
            var mTimezoneOffsets = {
                "UTC": 0,
                "America/New_York": -5,  // EST
                "America/Chicago": -6,   // CST
                "America/Denver": -7,    // MST
                "America/Los_Angeles": -8, // PST
                "Europe/London": 0,      // GMT
                "Europe/Paris": 1,       // CET
                "Europe/Moscow": 3,      // MSK
                "Asia/Tokyo": 9,         // JST
                "Asia/Kolkata": 5.5,     // IST
                "Asia/Shanghai": 8,      // CST
                "Australia/Sydney": 11,  // AEDT
                "Pacific/Auckland": 13   // NZDT
            };

            return mTimezoneOffsets[sTimezone] || 0;
        }
    });
});