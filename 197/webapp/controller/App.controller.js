sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui5/walkthrough/lib/marked.min"
], function(Controller, marked) {
    "use strict";

    return Controller.extend("sap.ui5.walkthrough.controller.App", {
        onInit: function() {
            // 初始化时渲染默认的 Markdown 内容
            this.renderMarkdown();
        },
        
        onMarkdownChange: function(oEvent) {
            // 当 Markdown 文本变化时，重新渲染预览
            this.renderMarkdown();
        },
        
        renderMarkdown: function() {
            // 获取 Markdown 文本
            var sMarkdown = this.byId("markdownEditor").getValue();
            
            // 使用 marked.js 将 Markdown 转换为 HTML
            var sHtml = window.marked.parse(sMarkdown);
            
            // 添加一些基本样式
            var sStyledHtml = '<div style="font-family: Arial, sans-serif; padding: 16px;">' + sHtml + '</div>';
            
            // 更新预览区域
            this.byId("markdownPreview").setContent(sStyledHtml);
        }
    });
});