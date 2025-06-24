sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/library"
], function (Controller, coreLibrary) {
    "use strict";

    var MessageType = coreLibrary.MessageType;

    return Controller.extend("sap.ui5.walkthrough.controller.App", {

        onInit: function () {
            this._checkInitialPermissionStatus();
        },

        /**
         * 检查浏览器是否支持通知
         * @private
         * @returns {boolean} 是否支持通知
         */
        _checkNotificationSupport: function () {
            if (!("Notification" in window)) {
                this._showStatus("此浏览器不支持桌面通知", MessageType.Error);
                return false;
            }
            return true;
        },

        /**
         * 显示状态信息
         * @private
         * @param {string} message 状态消息
         * @param {string} type 消息类型
         */
        _showStatus: function (message, type) {
            var oMessageStrip = this.byId("statusMessage");
            oMessageStrip.setText(message);
            oMessageStrip.setType(type || MessageType.Success);
            oMessageStrip.setVisible(true);

            // 3秒后隐藏状态信息
            setTimeout(function () {
                if (oMessageStrip) {
                    oMessageStrip.setVisible(false);
                }
            }, 3000);
        },

        /**
         * 检查初始权限状态
         * @private
         */
        _checkInitialPermissionStatus: function () {
            if (this._checkNotificationSupport()) {
                switch (Notification.permission) {
                    case "granted":
                        this._showStatus("通知权限已授予，可以发送通知", MessageType.Success);
                        break;
                    case "denied":
                        this._showStatus("通知权限被拒绝，请在浏览器设置中启用", MessageType.Error);
                        break;
                    case "default":
                        this._showStatus("请点击\"请求通知权限\"按钮来启用通知", MessageType.Warning);
                        break;
                }
            }
        },

        /**
         * 请求通知权限
         * @public
         */
        onRequestPermission: function () {
            if (!this._checkNotificationSupport()) {
                return;
            }

            var that = this;
            Notification.requestPermission().then(function (permission) {
                switch (permission) {
                    case "granted":
                        that._showStatus("通知权限已授予！现在可以发送通知了。", MessageType.Success);
                        break;
                    case "denied":
                        that._showStatus("通知权限被拒绝。请在浏览器设置中手动启用。", MessageType.Error);
                        break;
                    case "default":
                        that._showStatus("通知权限请求被忽略。", MessageType.Warning);
                        break;
                }
            }).catch(function (error) {
                that._showStatus("请求权限时出错：" + error.message, MessageType.Error);
            });
        },

        /**
         * 显示简单通知
         * @public
         */
        onShowSimpleNotification: function () {
            if (!this._checkNotificationSupport()) {
                return;
            }

            if (Notification.permission === "granted") {
                var that = this;
                var notification = new Notification("Hello from SAP UI5!", {
                    body: "这是一个来自SAP UI5应用的简单通知消息。",
                    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9IiMwMDc4ZDQiLz4KPHN2ZyB4PSIxNiIgeT0iMTYiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01IDEuNDEtMS40MUwxMCAxNC4xN2w3LjU5LTcuNTlMMTkgOGwtOSA5eiIvPgo8L3N2Zz4KPC9zdmc+"
                });

                // 通知点击事件
                notification.onclick = function () {
                    window.focus();
                    notification.close();
                    that._showStatus("通知被点击了！", MessageType.Success);
                };

                // 3秒后自动关闭
                setTimeout(function () {
                    notification.close();
                }, 3000);

                this._showStatus("简单通知已发送！", MessageType.Success);
            } else {
                this._showStatus("请先授予通知权限", MessageType.Warning);
            }
        },

        /**
         * 显示丰富通知
         * @public
         */
        onShowRichNotification: function () {
            if (!this._checkNotificationSupport()) {
                return;
            }

            if (Notification.permission === "granted") {
                var that = this;
                var notification = new Notification("🎉 SAP UI5 重要提醒", {
                    body: "您有一条来自SAP UI5应用的新消息！\n点击查看详情。",
                    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9IiNmZjYzMDAiLz4KPHN2ZyB4PSIxNiIgeT0iMTYiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0xIDEzaC0ydi0yaDJ2MnptMC04aC0yVjZoMnY2eiIvPgo8L3N2Zz4KPC9zdmc+",
                    badge: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiNmZjYzMDAiLz4KPHN2ZyB4PSI2IiB5PSI2IiB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMSAxM2gtMnYtMmgydjJ6bTAtOGgtMlY2aDJ2NnoiLz4KPC9zdmc+Cjwvc3ZnPg==",
                    tag: "rich-notification-ui5",
                    requireInteraction: true,
                    silent: false,
                    timestamp: Date.now(),
                    data: {
                        url: window.location.href,
                        action: "view_details",
                        source: "SAP UI5 App"
                    }
                });

                notification.onclick = function () {
                    window.focus();
                    notification.close();
                    that._showStatus("丰富通知被点击！数据：" + JSON.stringify(notification.data), MessageType.Success);
                };

                this._showStatus("丰富通知已发送！", MessageType.Success);
            } else {
                this._showStatus("请先授予通知权限", MessageType.Warning);
            }
        }
    });
});