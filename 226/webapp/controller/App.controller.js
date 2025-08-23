sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, MessageBox,JSONModel) {
    "use strict";

    return Controller.extend("sap.ui5.walkthrough.controller.App", {
        onInit: function () {
            var oModel = new JSONModel({
                wordContent: "",
                fileName: "",
                isLoading: false
            });
            this.getView().setModel(oModel);
        },

        onParseFile: function () {
            var oModel = this.getView().getModel();
            var fileInput = document.getElementById('fileInput');
            var file = fileInput.files[0];

            if (!file) {
                MessageBox.warning("请先选择一个Word文件");
                return;
            }

            if (!file.name.toLowerCase().endsWith('.docx')) {
                MessageBox.warning("目前只支持.docx格式的文件");
                return;
            }

            oModel.setProperty("/isLoading", true);
            oModel.setProperty("/fileName", file.name);

            var reader = new FileReader();
            reader.onload = function (e) {
                var arrayBuffer = e.target.result;
                
                // 使用mammoth.js解析Word文件
                mammoth.convertToHtml({ arrayBuffer: arrayBuffer }, {
                    styleMap: [
                        "p[style-name='Heading 1'] => h1:fresh",
                        "p[style-name='Heading 2'] => h2:fresh",
                        "p[style-name='Heading 3'] => h3:fresh",
                        "b => strong",
                        "i => em"
                    ]
                })
                .then(function (result) {
                    var html = result.value;
                    var messages = result.messages;
                    
                    // 处理HTML内容，确保格式正确显示
                    html = this._processHtmlContent(html);
                    
                    oModel.setProperty("/wordContent", html);
                    oModel.setProperty("/isLoading", false);
                    
                    if (messages.length > 0) {
                        console.warn("解析警告:", messages);
                    }
                    
                    MessageToast.show("文件解析完成");
                }.bind(this))
                .catch(function (error) {
                    console.error("解析错误:", error);
                    MessageBox.error("文件解析失败: " + error.message);
                    oModel.setProperty("/isLoading", false);
                });
            }.bind(this);

            reader.onerror = function () {
                MessageBox.error("文件读取失败");
                oModel.setProperty("/isLoading", false);
            };

            reader.readAsArrayBuffer(file);
        },

        _processHtmlContent: function (html) {
            // 处理HTML内容，增强格式显示
            html = html.replace(/<p><\/p>/g, '<br/>'); // 空段落转换为换行
            html = html.replace(/<p>/g, '<p style="margin: 0.5em 0;">'); // 添加段落间距
            
            // 确保粗体和斜体样式正确显示
            html = html.replace(/<strong>/g, '<span style="font-weight: bold;">');
            html = html.replace(/<\/strong>/g, '</span>');
            html = html.replace(/<em>/g, '<span style="font-style: italic;">');
            html = html.replace(/<\/em>/g, '</span>');
            
            return html;
        }
    });
});