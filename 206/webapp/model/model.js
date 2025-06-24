sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], function (JSONModel, Device) {
    "use strict";

    return {
        createDeviceModel: function () {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        },

        createTimezoneModel: function () {
            var aTimezones = [
                { key: "UTC", text: "UTC (协调世界时)" },
                { key: "America/New_York", text: "EST (美国东部时间)" },
                { key: "America/Chicago", text: "CST (美国中部时间)" },
                { key: "America/Denver", text: "MST (美国山地时间)" },
                { key: "America/Los_Angeles", text: "PST (美国太平洋时间)" },
                { key: "Europe/London", text: "GMT (格林威治标准时间)" },
                { key: "Europe/Paris", text: "CET (中欧时间)" },
                { key: "Europe/Moscow", text: "MSK (莫斯科时间)" },
                { key: "Asia/Tokyo", text: "JST (日本标准时间)" },
                { key: "Asia/Kolkata", text: "IST (印度标准时间)" },
                { key: "Asia/Shanghai", text: "CST (中国标准时间)" },
                { key: "Australia/Sydney", text: "AEDT (澳大利亚东部时间)" },
                { key: "Pacific/Auckland", text: "NZDT (新西兰时间)" }
            ];

            var oModel = new JSONModel({
                timezones: aTimezones,
                sourceTime: "",
                selectedTimezone: "Asia/Kolkata",
                convertedTime: "",
                convertedTimezone: "Asia/Shanghai"
            });

            return oModel;
        }
    };
});