sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui5/walkthrough/lib/marked.min",
    "sap/ui5/walkthrough/lib/html2canvas.min",
    "sap/m/MessageToast"
], function(Controller, marked, html2canvas, MessageToast) {
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
        },
        
        // 添加处理按钮点击的方法
        onPicture: function() {
            setTimeout(function() {
                window.html2canvas(document.documentElement, {
                    allowTaint: true,
                    useCORS: true,
                    scrollX: 0,
                    scrollY: 0,
                    windowWidth: document.documentElement.offsetWidth,
                    windowHeight: document.documentElement.offsetHeight,
                    scale: window.devicePixelRatio // 使用设备像素比以获得更清晰的截图
                }).then(function(canvas) {
                    // 将canvas转换为图片URL
                    const imgData = canvas.toDataURL('image/png');
                    
                    // 创建下载链接
                    const link = document.createElement('a');
                    link.href = imgData;
                    link.download = 'screenshot_' + new Date().toISOString().slice(5, 19).replace(/:/g, '-') + '.png';
                    
                    // 模拟点击下载链接
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // 恢复按钮状态
                    // screenshotBtn.textContent = '截图并保存';
                    // screenshotBtn.disabled = false;

                    MessageToast.show("截屏成功！", {
                        duration: 3000,
                        width: "15rem",
                        my: "center bottom",
                        at: "center bottom",
                        of: window,
                        offset: "0 -50"
                    });
                });
            }, 100);
        }
    });
});