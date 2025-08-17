sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("sap.ui5.walkthrough.controller.App", {
        
        onInit: function () {
            // 初始化游戏
            this._initializeGame();
        },
        
        onAfterRendering: function () {
            // DOM渲染完成后启动游戏
            this._startGame();
        },
        
        _initializeGame: function () {
            // 游戏配置
            this.BALL_SPEED = 2;
            this.gameRunning = true;
            this.gameWon = false;
            
            // 获取UI控件引用
            this.bricksLeftText = this.byId("bricksLeft");
            this.speedSlider = this.byId("speedSlider");
            this.speedValue = this.byId("speedValue");
            this.gameOverDialog = this.byId("gameOverDialog");
            this.gameOverTitle = this.byId("gameOverTitle");
            this.gameOverMessage = this.byId("gameOverMessage");
        },
        
        _startGame: function () {
            // 获取canvas元素
            this.canvas = document.getElementById('__xmlview0--gameCanvas');
            if (!this.canvas) {
                setTimeout(() => this._startGame(), 100);
                return;
            }
            
            this.ctx = this.canvas.getContext('2d');
            
            // 初始化游戏对象
            this._initGameObjects();
            
            // 设置键盘监听
            this._setupKeyboardListeners();
            
            // 启动游戏循环
            this._gameLoop();
        },
        
        _initGameObjects: function () {
            // 接球器
            this.paddle = {
                x: this.canvas.width / 2 - 60,
                y: this.canvas.height - 30,
                width: 120,
                height: 15,
                speed: 8
            };
            
            // 球
            this.ball = {
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                radius: 8,
                dx: 0,
                dy: 0,
                launched: false
            };
            
            // 砖块
            this.bricks = [];
            this.brickRows = 3;
            this.brickCols = 5;
            this.brickWidth = 140;
            this.brickHeight = 30;
            this.brickPadding = 10;
            this.brickOffsetTop = 60;
            this.brickOffsetLeft = (this.canvas.width - (this.brickCols * (this.brickWidth + this.brickPadding) - this.brickPadding)) / 2;
            
            this._initBricks();
            
            // 键盘状态
            this.keys = {};
        },
        
        _initBricks: function () {
            this.bricks.length = 0;
            for (let r = 0; r < this.brickRows; r++) {
                for (let c = 0; c < this.brickCols; c++) {
                    this.bricks.push({
                        x: this.brickOffsetLeft + c * (this.brickWidth + this.brickPadding),
                        y: this.brickOffsetTop + r * (this.brickHeight + this.brickPadding),
                        width: this.brickWidth,
                        height: this.brickHeight,
                        visible: true,
                        color: `hsl(${r * 60 + c * 20}, 70%, 60%)`
                    });
                }
            }
        },
        
        _setupKeyboardListeners: function () {
            document.addEventListener('keydown', (e) => {
                this.keys[e.key.toLowerCase()] = true;
                
                // 如果球还没发射，按任意键发射
                if (!this.ball.launched && this.gameRunning) {
                    this._launchBall();
                }
            });
            
            document.addEventListener('keyup', (e) => {
                this.keys[e.key.toLowerCase()] = false;
            });
        },
        
        _launchBall: function () {
            const angle = (Math.random() - 0.5) * Math.PI / 3;
            this.ball.dx = Math.sin(angle) * this.BALL_SPEED;
            this.ball.dy = -Math.cos(angle) * this.BALL_SPEED;
            this.ball.launched = true;
        },
        
        _checkCollision: function (rect1, rect2) {
            return rect1.x < rect2.x + rect2.width &&
                   rect1.x + rect1.width > rect2.x &&
                   rect1.y < rect2.y + rect2.height &&
                   rect1.y + rect1.height > rect2.y;
        },
        
        _update: function () {
            if (!this.gameRunning) return;
            
            // 更新接球器位置
            if (this.keys['a'] && this.paddle.x > 0) {
                this.paddle.x -= this.paddle.speed;
            }
            if (this.keys['d'] && this.paddle.x < this.canvas.width - this.paddle.width) {
                this.paddle.x += this.paddle.speed;
            }
            
            // 如果球还没发射，跟随接球器
            if (!this.ball.launched) {
                this.ball.x = this.paddle.x + this.paddle.width / 2;
                this.ball.y = this.paddle.y - this.ball.radius - 5;
                return;
            }
            
            // 更新球的位置
            this.ball.x += this.ball.dx;
            this.ball.y += this.ball.dy;
            
            // 球与墙壁碰撞
            if (this.ball.x - this.ball.radius <= 0 || this.ball.x + this.ball.radius >= this.canvas.width) {
                this.ball.dx = -this.ball.dx;
            }
            if (this.ball.y - this.ball.radius <= 0) {
                this.ball.dy = -this.ball.dy;
            }
            
            // 球与接球器碰撞
            if (this.ball.y + this.ball.radius >= this.paddle.y &&
                this.ball.x >= this.paddle.x &&
                this.ball.x <= this.paddle.x + this.paddle.width &&
                this.ball.dy > 0) {
                
                const hitPos = (this.ball.x - this.paddle.x) / this.paddle.width;
                const angle = (hitPos - 0.5) * Math.PI / 3;
                
                this.ball.dx = Math.sin(angle) * this.BALL_SPEED;
                this.ball.dy = -Math.cos(angle) * this.BALL_SPEED;
            }
            
            // 球与砖块碰撞
            for (let i = 0; i < this.bricks.length; i++) {
                const brick = this.bricks[i];
                if (brick.visible) {
                    if (this._checkCollision({
                        x: this.ball.x - this.ball.radius,
                        y: this.ball.y - this.ball.radius,
                        width: this.ball.radius * 2,
                        height: this.ball.radius * 2
                    }, brick)) {
                        brick.visible = false;
                        this.ball.dy = -this.ball.dy;
                        
                        const visibleBricks = this.bricks.filter(b => b.visible).length;
                        this.bricksLeftText.setText(visibleBricks.toString());
                        
                        if (visibleBricks === 0) {
                            this.gameWon = true;
                            this._endGame();
                        }
                        break;
                    }
                }
            }
            
            // 球掉落检测
            if (this.ball.y > this.canvas.height) {
                this.gameWon = false;
                this._endGame();
            }
        },
        
        _draw: function () {
            // 清空画布
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // 绘制接球器
            this.ctx.fillStyle = '#fff';
            this.ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
            
            // 绘制球
            this.ctx.beginPath();
            this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#fff';
            this.ctx.fill();
            this.ctx.closePath();
            
            // 绘制砖块
            for (let brick of this.bricks) {
                if (brick.visible) {
                    this.ctx.fillStyle = brick.color;
                    this.ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
                    
                    this.ctx.strokeStyle = '#fff';
                    this.ctx.lineWidth = 2;
                    this.ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
                }
            }
            
            // 如果球还没发射，显示提示
            if (!this.ball.launched && this.gameRunning) {
                this.ctx.fillStyle = '#fff';
                this.ctx.font = '20px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText('按任意键发射球', this.canvas.width / 2, this.canvas.height / 2 + 100);
            }
        },
        
        _endGame: function () {
            this.gameRunning = false;
            
            if (this.gameWon) {
                this.gameOverTitle.setText('恭喜获胜！');
                this.gameOverMessage.setText('你成功打破了所有砖块！');
            } else {
                this.gameOverTitle.setText('游戏失败');
                this.gameOverMessage.setText('球掉落了，再试一次吧！');
            }
            
            this.gameOverDialog.open();
        },
        
        _gameLoop: function () {
            this._update();
            this._draw();
            requestAnimationFrame(() => this._gameLoop());
        },
        
        onSpeedChange: function (oEvent) {
            this.BALL_SPEED = parseInt(oEvent.getParameter("value"));
            this.speedValue.setText(this.BALL_SPEED.toString());
            
            // 如果球已经发射，实时更新球的速度
            if (this.ball.launched) {
                const currentSpeed = Math.sqrt(this.ball.dx * this.ball.dx + this.ball.dy * this.ball.dy);
                const speedRatio = this.BALL_SPEED / currentSpeed;
                this.ball.dx *= speedRatio;
                this.ball.dy *= speedRatio;
            }
        },
        
        onRestartGame: function () {
            this.gameRunning = true;
            this.gameWon = false;
            this.gameOverDialog.close();
            
            // 重置接球器
            this.paddle.x = this.canvas.width / 2 - 60;
            
            // 重置球
            this.ball.x = this.canvas.width / 2;
            this.ball.y = this.canvas.height / 2;
            this.ball.dx = 0;
            this.ball.dy = 0;
            this.ball.launched = false;
            
            // 重置砖块
            this._initBricks();
            this.bricksLeftText.setText('15');
        }
    });
});