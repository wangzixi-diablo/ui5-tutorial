sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("sap.ui5.walkthrough.controller.App", {

        onInit: function () {
            // 页面加载完成后生成默认雪花
            setTimeout(() => {
                this.generateSnowflake();
            }, 100);
        },

        onOrderChange: function () {
            // 当阶数改变时自动重新生成
            this.generateSnowflake();
        },

        onGenerate: function () {
            this.generateSnowflake();
        },

        onDownload: function () {
            this.downloadImage();
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

        // 生成科赫雪花
        generateKochSnowflake: function (order, width, height) {
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

            return { edge1, edge2, edge3 };
        },

        // 绘制科赫雪花
        drawKochSnowflake: function (ctx, snowflake) {
            ctx.beginPath();
            ctx.moveTo(snowflake.edge1[0].x, snowflake.edge1[0].y);

            // 绘制第一条边
            for (let i = 1; i < snowflake.edge1.length; i++) {
                ctx.lineTo(snowflake.edge1[i].x, snowflake.edge1[i].y);
            }

            // 绘制第二条边
            for (let i = 1; i < snowflake.edge2.length; i++) {
                ctx.lineTo(snowflake.edge2[i].x, snowflake.edge2[i].y);
            }

            // 绘制第三条边
            for (let i = 1; i < snowflake.edge3.length; i++) {
                ctx.lineTo(snowflake.edge3[i].x, snowflake.edge3[i].y);
            }

            ctx.closePath();
            ctx.stroke();
        },

        // 主生成函数
        generateSnowflake: function () {
            const canvas = document.getElementById('snowflakeCanvas');
            if (!canvas) {
                // 如果canvas还没有渲染，稍后重试
                setTimeout(() => {
                    this.generateSnowflake();
                }, 100);
                return;
            }

            const ctx = canvas.getContext('2d');
            const order = parseInt(this.byId("orderSelect").getSelectedKey());
            const generateBtn = this.byId("generateBtn");
            const downloadBtn = this.byId("downloadBtn");
            const infoText = this.byId("infoText");

            // 禁用按钮，显示生成中状态
            generateBtn.setEnabled(false);
            generateBtn.setText('生成中...');
            infoText.setText(`正在生成 ${order} 阶科赫雪花...`);
            downloadBtn.setVisible(false);

            // 使用 setTimeout 让界面有时间更新
            setTimeout(() => {
                try {
                    // 清空画布
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // 设置背景色
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    // 设置线条样式
                    ctx.strokeStyle = '#0070f2';
                    ctx.lineWidth = 1;
                    ctx.lineJoin = 'round';
                    ctx.lineCap = 'round';

                    // 生成并绘制科赫雪花
                    const snowflake = this.generateKochSnowflake(order, canvas.width, canvas.height);
                    this.drawKochSnowflake(ctx, snowflake);

                    // 计算边数（用于显示信息）
                    const edgeCount = Math.pow(4, order) * 3;

                    // 更新信息
                    infoText.setText(`${order} 阶科赫雪花 | 边数: ${edgeCount.toLocaleString()} | 图片尺寸: ${canvas.width} × ${canvas.height}`);

                    // 显示下载按钮
                    downloadBtn.setVisible(true);

                    MessageToast.show(`${order} 阶科赫雪花生成完成`);

                } catch (error) {
                    console.error('生成雪花时出错:', error);
                    infoText.setText('生成失败，请重试');
                    MessageToast.show('生成失败，请重试');
                } finally {
                    // 恢复按钮状态
                    generateBtn.setEnabled(true);
                    generateBtn.setText('生成科赫雪花');
                }
            }, 10);
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
                link.download = `koch_snowflake_order_${order}.png`;
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