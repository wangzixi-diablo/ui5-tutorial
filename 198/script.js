document.addEventListener('DOMContentLoaded', function() {
    // 获取截图按钮元素
    const screenshotBtn = document.getElementById('screenshotBtn');
    
    // 为按钮添加点击事件监听器
    screenshotBtn.addEventListener('click', function() {
        // 截图前显示加载状态
        screenshotBtn.textContent = '正在截图...';
        screenshotBtn.disabled = true;
        
        // 使用setTimeout给浏览器一点时间来更新按钮状态
        setTimeout(function() {
            // 使用html2canvas捕获整个文档
            html2canvas(document.documentElement, {
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
                link.download = 'webpage_screenshot_' + new Date().toISOString().slice(0, 19).replace(/:/g, '-') + '.png';
                
                // 模拟点击下载链接
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // 恢复按钮状态
                screenshotBtn.textContent = '截图并保存';
                screenshotBtn.disabled = false;
            }).catch(function(error) {
                console.error('截图过程中发生错误:', error);
                alert('截图失败，请查看控制台获取详细信息。');
                
                // 恢复按钮状态
                screenshotBtn.textContent = '截图并保存';
                screenshotBtn.disabled = false;
            });
        }, 100);
    });
});