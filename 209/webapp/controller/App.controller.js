sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("sap.ui5.walkthrough.controller.App", {

        // 全局变量
        animationId: null,
        isDrawing: false,

        onInit: function () {
            // 页面加载完成后不自动生成，等待用户点击
        },

        onOrderChange: function () {
            // 当阶数改变时停止当前绘制
            if (this.isDrawing) {
                this.stopDrawing();
            }
        },

        onStartDynamicDrawing: function () {
            this.startDynamicDrawing();
        },

        onStopDrawing: function () {
            this.stopDrawing();
        },

        onDownload: function () {
            this.downloadImage();
        },

        onSpeedChange: function (oEvent) {
            const speed = oEvent.getParameter("value");
            this.byId("speedValue").setText(speed.toString());
        },

        // 点类
        Point: function (x, y) {
            this.x = x;
            this.y = y;
        },

        // 生成科赫曲线的一条边
        kochLine: function (p1, p2, order) {
            if (order === 0) {
                return [p1, p2];
            }

            // 计算三等分点
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;

            const a = new this.Point(p1.x + dx / 3, p1.y + dy / 3);
            const b = new this.Point(p1.x + 2 * dx / 3, p1.y + 2 * dy / 3);

            // 计算等边三角形的顶点（修复后的公式）
            const cx = (a.x + b.x) / 2 - (b.y - a.y) * Math.sqrt(3) / 2;
            const cy = (a.y + b.y) / 2 + (b.x - a.x) * Math.sqrt(3) / 2;
            const c = new this.Point(cx, cy);

            // 递归生成四条边
            const line1 = this.kochLine(p1, a, order - 1);
            const line2 = this.kochLine(a, c, order - 1);
            const line3 = this.kochLine(c, b, order - 1);
            const line4 = this.kochLine(b, p2, order - 1);

            // 合并所有点，去除重复的连接点
            const result = [...line1];
            result.push(...line2.slice(1));
            result.push(...line3.slice(1));
            result.push(...line4.slice(1));

            return result;
        },

        // 生成科赫雪花的所有点
        generateKochSnowflakePoints: function (order, width, height) {
            // 定义等边三角形的三个顶点
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) * 0.3;

            const p1 = new this.Point(centerX, centerY - radius);
            const p2 = new this.Point(centerX - radius * Math.sqrt(3) / 2, centerY + radius / 2);
            const p3 = new this.Point(centerX + radius * Math.sqrt(3) / 2, centerY + radius / 2);

            // 生成三条边的科赫曲线
            const edge1 = this.kochLine(p1, p2, order);
            const edge2 = this.kochLine(p2, p3, order);
            const edge3 = this.kochLine(p3, p1, order);

            // 合并所有点形成完整的路径
            const allPoints = [...edge1];
            allPoints.push(...edge2.slice(1));
            allPoints.push(...edge3.slice(1));

            return allPoints;
        },

        // 动态绘制函数
        drawDynamically: function (ctx, points, currentIndex, speed) {
            if (currentIndex >= points.length || !this.isDrawing) {
                // 绘制完成
                this.isDrawing = false;
                this.byId("generateBtn").setEnabled(true);
                this.byId("generateBtn").setText('动态绘制科赫雪花');
                this.byId("stopBtn").setVisible(false);
                this.byId("downloadBtn").setVisible(true);
                
                const order = this.byId("orderSelect").getSelectedKey();
                const edgeCount = Math.pow(4, order) * 3;
                this.byId("infoText").setText(`${order} 阶科赫雪花绘制完成 | 边数: ${edgeCount.toLocaleString()} | 总点数: ${points.length.toLocaleString()}`);
                
                MessageToast.show(`${order} 阶科赫雪花绘制完成`);
                return;
            }
            
            // 绘制当前点到下一个点的线段
            if (currentIndex === 0) {
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
            } else {
                ctx.lineTo(points[currentIndex].x, points[currentIndex].y);
                ctx.stroke();
            }
            
            // 更新进度信息
            const progress = ((currentIndex + 1) / points.length * 100).toFixed(1);
            const order = this.byId("orderSelect").getSelectedKey();
            this.byId("infoText").setText(`正在绘制 ${order} 阶科赫雪花 | 进度: ${progress}% (${currentIndex + 1}/${points.length})`);
            
            // 计算延迟时间（速度控制）
            const delay = Math.max(1, 101 - speed);
            
            // 继续绘制下一个点
            setTimeout(() => {
                this.animationId = requestAnimationFrame(() => {
                    this.drawDynamically(ctx, points, currentIndex + 1, speed);
                });
            }, delay);
        },

        // 开始动态绘制
        startDynamicDrawing: function () {
            if (this.isDrawing) {
                this.stopDrawing();
                return;
            }
            
            const canvas = document.getElementById('snowflakeCanvas');
            if (!canvas) {
                MessageToast.show('画布未找到');
                return;
            }
            
            const ctx = canvas.getContext('2d');
            const order = parseInt(this.byId("orderSelect").getSelectedKey());
            const speed = parseInt(this.byId("speedSlider").getValue());
            const generateBtn = this.byId("generateBtn");
            const downloadBtn = this.byId("downloadBtn");
            const stopBtn = this.byId("stopBtn");
            
            // 设置绘制状态
            this.isDrawing = true;
            generateBtn.setEnabled(false);
            generateBtn.setText('绘制中...');
            downloadBtn.setVisible(false);
            stopBtn.setVisible(true);
            
            // 清空画布
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // 设置背景色
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // 设置线条样式
            ctx.strokeStyle = '#0070f2';
            ctx.lineWidth = 2;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            
            // 生成所有点
            const points = this.generateKochSnowflakePoints(order, canvas.width, canvas.height);
            
            // 开始动态绘制
            this.drawDynamically(ctx, points, 0, speed);
        },

        // 停止绘制
        stopDrawing: function () {
            this.isDrawing = false;
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
            
            this.byId("generateBtn").setEnabled(true);
            this.byId("generateBtn").setText('动态绘制科赫雪花');
            this.byId("stopBtn").setVisible(false);
            this.byId("infoText").setText('绘制已停止');
            
            MessageToast.show('绘制已停止');
        },

        // 下载图片功能
        downloadImage: function () {
            const canvas = document.getElementById('snowflakeCanvas');
            const order = this.byId("orderSelect").getSelectedKey();

            if (!canvas) {
                MessageToast.show('画布未找到');
                return;
            }

            try {
                // 创建下载链接
                const link = document.createElement('a');
                link.download = `koch_snowflake_dynamic_order_${order}.png`;
                link.href = canvas.toDataURL('image/png');

                // 触发下载
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                MessageToast.show('图片下载已开始');
            } catch (error) {
                console.error('下载失败:', error);
                MessageToast.show('下载失败，请重试');
            }
        }
    });
});