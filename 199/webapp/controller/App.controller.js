sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui5/walkthrough/lib/marked.min"
], function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("sap.ui5.walkthrough.controller.App", {
        API_KEY: "",

        onSendToDeepSeek: function () {
            var inputTextArea = this.getView().byId("PromptEditor");
            var outputMarkdownArea = this.getView().byId("markdownPreview");
            var sendButton = this.getView().byId("sendButton");
            
            // 获取用户输入
            var userInput = inputTextArea.getValue().trim();
            
            if (!userInput) {
                MessageToast.show("请输入内容后再发送");
                return;
            }
            
            // 清空输出区域并禁用按钮
            outputMarkdownArea.setContent("");
            sendButton.setEnabled(false);
            
            // 准备API请求数据
            var requestData = {
                model: "deepseek-coder", // 使用DeepSeek Coder模型
                messages: [
                    {
                        role: "user",
                        content: userInput
                    }
                ],
                stream: true // 启用流式响应
            };
            
            try {
                // 创建请求对象
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "https://api.deepseek.com/v1/chat/completions", true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("Authorization", "Bearer " + this.API_KEY); // 需要替换为实际的API密钥
                
                // 处理流式响应
                xhr.onprogress = function() {
                    // 获取当前接收到的所有数据
                    var responseText = xhr.responseText;
                    var fullText = "";
                    
                    // 处理流式响应数据
                    // DeepSeek API返回的是以data:开头的行，每行是一个JSON对象
                    var lines = responseText.split("\n");
                    lines.forEach(function(line) {
                        console.log('Jerry');
                        if (line.startsWith("data: ")) {
                            try {
                                var data = JSON.parse(line.substring(6));
                                if (data.choices && data.choices[0] && data.choices[0].delta && data.choices[0].delta.content) {
                                    var deltaContent = data.choices[0].delta.content;
                                    fullText += deltaContent;

                                }
                            } catch (e) {
                                // 忽略解析错误
                            }
                        }
                    });
                    setTimeout(()=>{
                        outputMarkdownArea.invalidate();
                        outputMarkdownArea.setContent("");
                        outputMarkdownArea.setContent(window.marked.parse(fullText));
                    }, 100);
                    // 更新输出区域
                };
                
                // 请求完成处理
                xhr.onload = function() {
                    // 重新启用按钮
                    sendButton.setEnabled(true);
                    
                    if (xhr.status !== 200) {
                        // 处理错误
                        MessageBox.error("API请求失败: " + xhr.statusText);
                    }
                };
                
                // 错误处理
                xhr.onerror = function() {
                    sendButton.setEnabled(true);
                    MessageBox.error("网络错误，请检查您的网络连接");
                };
                
                // 发送请求
                xhr.send(JSON.stringify(requestData));
                
            } catch (error) {
                sendButton.setEnabled(true);
                MessageBox.error("发生错误: " + error.message);
            }
        }
    });
});