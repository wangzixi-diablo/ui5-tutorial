sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("sap.ui5.walkthrough.controller.App", {
        TOKEN: '这里放置从扣子平台申请的 API access token，网址 https://www.coze.cn/open/oauth/pats',
        onInit: function () {
            // 初始化控制器
        },

        onSendToCoze: function () {
            var that = this;
            var inputTextArea = this.getView().byId("inputTextArea");
            var outputTextArea = this.getView().byId("outputTextArea");
            var sendButton = this.getView().byId("sendButton");
            
            // 获取用户输入
            var userInput = inputTextArea.getValue().trim();
            
            if (!userInput) {
                MessageToast.show("请输入内容后再发送");
                return;
            }
            
            // 清空输出区域并禁用按钮，显示BusyIndicator
            outputTextArea.setValue("");
            sendButton.setEnabled(false);
            this.getView().setBusy(true);
            
            // 标记是否已收到第一行数据
            var firstDataReceived = false;
            
            // 准备API请求数据 - 转换自curl命令
            var requestData = {
                workflow_id: "7535741526489317439",
                app_id: "7535727140303274026",
                parameters: {
                    content: userInput, // 使用用户输入的内容
                    lang: "英语"
                }
            };
            
            try {
                // 创建请求对象
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "https://api.coze.cn/v1/workflow/stream_run", true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", "Bearer " + this.TOKEN);
                
                // 处理流式响应
                xhr.onprogress = function() {
                    // 获取当前接收到的所有数据
                    var responseText = xhr.responseText;
                    var fullText = "";
                    
                    // 处理流式响应数据
                    // Coze API返回的是以data:开头的行，每行是一个JSON对象
                    var lines = responseText.split("\n");
                    lines.forEach(function(line) {
                        if (line.startsWith("data: ")) {
                            try {
                                var data = JSON.parse(line.substring(6));
                                // 根据Coze API的响应格式调整数据提取逻辑
                                if (data.event === "message" && data.data && data.data.content) {
                                    fullText += data.data.content;
                                } else if (data.content) {
                                    fullText += data.content;
                                }
                            } catch (e) {
                                // 忽略解析错误
                            }
                        }
                    });
                    
                    // 如果有数据且是第一次收到数据，关闭BusyIndicator
                    if (fullText && !firstDataReceived) {
                        firstDataReceived = true;
                        that.getView().setBusy(false);
                    }
                    
                    // 更新输出区域
                    outputTextArea.setValue(fullText);
                    outputTextArea.scrollToEnd();
                };
                
                // 请求完成处理
                xhr.onload = function() {
                    // 重新启用按钮，确保BusyIndicator被关闭
                    sendButton.setEnabled(true);
                    that.getView().setBusy(false);
                    
                    if (xhr.status !== 200) {
                        // 处理错误
                        MessageBox.error("API请求失败: " + xhr.statusText);
                    }
                };
                
                // 错误处理
                xhr.onerror = function() {
                    sendButton.setEnabled(true);
                    that.getView().setBusy(false);
                    MessageBox.error("网络错误，请检查您的网络连接");
                };
                
                // 发送请求
                xhr.send(JSON.stringify(requestData));
                
            } catch (error) {
                sendButton.setEnabled(true);
                this.getView().setBusy(false);
                MessageBox.error("发生错误: " + error.message);
            }
        }
    });
});