sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("sap.ui5.walkthrough.controller.App", {
        onSend: function () {
            const ABAP_URL = "https:/<ABAP 服务器主机名>:44355/sap/crm/csdn?sap-client=001";
            const USER = "<用户名>";
            const PASSWORD = "<密码>";
            var inputTextArea = this.getView().byId("inputTextArea");
            var outputTextArea = this.getView().byId("outputTextArea");
            var sendButton = this.getView().byId("sendButton");
            
            // 获取用户输入
            var userInput = inputTextArea.getValue().trim();
            
            if (!userInput) {
                MessageToast.show("请输入内容后再发送");
                return;
            }
            
            // 清空输出区域并禁用按钮
            outputTextArea.setValue("");
            sendButton.setEnabled(false);
            
            // 准备API请求数据
            var requestData = JSON.parse(userInput);
            
            try {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", ABAP_URL, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                
                // 添加Basic认证
                var authString = USER + ":" + PASSWORD;
                var base64Auth = btoa(authString);
                xhr.setRequestHeader("Authorization", "Basic " + base64Auth);
                
                // 错误处理
                xhr.onerror = function() {
                    sendButton.setEnabled(true);
                    MessageBox.error("网络错误，请检查您的网络连接");
                };
                
                // 发送请求
                xhr.send(JSON.stringify(requestData));

                xhr.onload = function() {
                    // 重新启用按钮
                    sendButton.setEnabled(true);
                    
                    if (xhr.status >= 200 && xhr.status < 300) {
                        // 请求成功
                        outputTextArea.setValue(xhr.responseText);
                        outputTextArea.scrollToEnd();
                    } else {
                        // 处理错误
                        MessageBox.error("API请求失败: " + xhr.status + " " + xhr.statusText);
                        outputTextArea.setValue("错误: " + xhr.status + " " + xhr.statusText + "\n\n" + xhr.responseText);
                    }
                };
                
            } catch (error) {
                sendButton.setEnabled(true);
                MessageBox.error("发生错误: " + error.message);
            }
        }
    });
});