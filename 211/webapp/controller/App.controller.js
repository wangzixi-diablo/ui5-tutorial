sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function (Controller, JSONModel, MessageBox) {
    "use strict";

    return Controller.extend("sap.ui5.walkthrough.controller.App", {
        
        // 游戏配置
        CELL_SIZE: 20,
        
        onInit: function () {
            // 初始化数据模型
            var oModel = new JSONModel({
                score: 0,
                status: "准备开始",
                speed: 5
            });
            this.getView().setModel(oModel);
            
            // 游戏状态变量
            this.canvas = null;
            this.ctx = null;
            this.gameWidth = 0;
            this.gameHeight = 0;
            this.snake = [];
            this.direction = 'right';
            this.food = {};
            this.gameRunning = false;
            this.gameInterval = null;
            
            // 页面渲染完成后初始化游戏
            this.getView().addEventDelegate({
                onAfterRendering: function() {
                    setTimeout(this.initGame.bind(this), 200);
                }.bind(this)
            });
            
            // 绑定键盘事件
            this._attachKeyboardEvents();
        },
        
        initGame: function () {
            this.canvas = document.getElementById('__xmlview0--gameCanvas');
            if (!this.canvas) {
                console.log('Canvas not found, retrying...');
                setTimeout(this.initGame.bind(this), 200);
                return;
            }
            
            console.log('Canvas found, initializing game...');
            this.ctx = this.canvas.getContext('2d');
            
            // 确保canvas尺寸正确
            this.canvas.width = 450;
            this.canvas.height = 800;
            
            this.gameWidth = Math.floor(this.canvas.width / this.CELL_SIZE);
            this.gameHeight = Math.floor(this.canvas.height / this.CELL_SIZE);
            
            console.log('Game dimensions:', this.gameWidth, 'x', this.gameHeight);
            
            // 初始化蛇：蛇头红色，蛇身绿色
            this.snake = [
                {x: 5, y: 5, isHead: true, color: '#FF0000', segmentType: 'head'}, // 蛇头
                {x: 4, y: 5, isHead: false, color: '#00FF00', segmentType: 'initial'}, // 初始蛇身
                {x: 3, y: 5, isHead: false, color: '#00FF00', segmentType: 'initial'},
                {x: 2, y: 5, isHead: false, color: '#00FF00', segmentType: 'initial'},
                {x: 1, y: 5, isHead: false, color: '#00FF00', segmentType: 'initial'}
            ];
            
            this.direction = 'right';
            this.gameRunning = true;
            
            this.getView().getModel().setProperty("/score", 0);
            this.getView().getModel().setProperty("/status", "游戏进行中");
            
            this.generateFood();
            this.render();
            
            // 开始游戏循环
            if (this.gameInterval) {
                clearInterval(this.gameInterval);
            }
            this.gameInterval = setInterval(this.gameLoop.bind(this), this.getGameSpeed());
            
            console.log('Game initialized successfully');
        },
        
        generateFood: function () {
            var foodX, foodY;
            do {
                foodX = Math.floor(Math.random() * this.gameWidth);
                foodY = Math.floor(Math.random() * this.gameHeight);
            } while (this.isSnakePosition(foodX, foodY));
            
            this.food = {
                x: foodX,
                y: foodY,
                color: this.getRandomColor()
            };
            
            console.log('Food generated at:', foodX, foodY);
        },
        
        getRandomColor: function () {
            var colors = [
                '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
                '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
                '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        },
        
        getGameSpeed: function () {
            var speed = this.getView().getModel().getProperty("/speed");
            return 1650 - (speed * 150);
        },
        
        isSnakePosition: function (x, y) {
            return this.snake.some(function(segment) {
                return segment.x === x && segment.y === y;
            });
        },
        
        gameLoop: function () {
            if (!this.gameRunning) return;
            
            this.moveSnake();
            this.checkCollisions();
            this.checkFood();
            this.render();
        },
        
        moveSnake: function () {
            var head = this.snake[0];
            
            // 计算新的蛇头位置
            var newX = head.x;
            var newY = head.y;
            
            switch(this.direction) {
                case 'up':
                    newY--;
                    break;
                case 'down':
                    newY++;
                    break;
                case 'left':
                    newX--;
                    break;
                case 'right':
                    newX++;
                    break;
            }
            
            // 检查是否吃到食物
            var ateFood = (newX === this.food.x && newY === this.food.y);
            
            // 如果吃到食物，在蛇尾添加新节段
            if (ateFood) {
                var newTail = {
                    x: this.snake[this.snake.length - 1].x,
                    y: this.snake[this.snake.length - 1].y,
                    isHead: false,
                    color: this.food.color,  // 保持食物的原始颜色
                    segmentType: 'food'  // 标记为从食物变来的蛇身
                };
                this.snake.push(newTail);
            }
            
            // 移动整条蛇：从尾部开始，每个节段移动到前一个节段的位置
            for (var i = this.snake.length - 1; i > 0; i--) {
                this.snake[i].x = this.snake[i - 1].x;
                this.snake[i].y = this.snake[i - 1].y;
            }
            
            // 移动蛇头到新位置
            this.snake[0].x = newX;
            this.snake[0].y = newY;
            
            // 确保颜色规则：蛇头红色，初始蛇身绿色，食物蛇身保持原色
            this.snake.forEach(function(segment) {
                if (segment.segmentType === 'head') {
                    segment.color = '#FF0000'; // 蛇头红色
                } else if (segment.segmentType === 'initial') {
                    segment.color = '#00FF00'; // 初始蛇身绿色
                }
                // segmentType为'food'的节段保持原有颜色不变
            });
        },
        
        checkCollisions: function () {
            var head = this.snake[0];
            
            // 检查边界碰撞
            if (head.x < 0 || head.x >= this.gameWidth || head.y < 0 || head.y >= this.gameHeight) {
                this.gameOver();
                return;
            }
            
            // 检查自身碰撞
            for (var i = 1; i < this.snake.length; i++) {
                if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                    this.gameOver();
                    return;
                }
            }
        },
        
        checkFood: function () {
            var head = this.snake[0];
            
            if (head.x === this.food.x && head.y === this.food.y) {
                var currentScore = this.getView().getModel().getProperty("/score");
                this.getView().getModel().setProperty("/score", currentScore + 10);
                this.generateFood();
            }
        },
        
        render: function () {
            if (!this.ctx || !this.canvas) {
                console.log('Canvas or context not available');
                return;
            }
            
            // 清空画布
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // 渲染蛇
            this.snake.forEach(function(segment, index) {
                this.ctx.fillStyle = segment.color;
                this.ctx.fillRect(
                    segment.x * this.CELL_SIZE,
                    segment.y * this.CELL_SIZE,
                    this.CELL_SIZE,
                    this.CELL_SIZE
                );
                
                // 绘制边框
                this.ctx.strokeStyle = index === 0 ? '#fff' : '#666';
                this.ctx.lineWidth = index === 0 ? 2 : 1;
                this.ctx.strokeRect(
                    segment.x * this.CELL_SIZE,
                    segment.y * this.CELL_SIZE,
                    this.CELL_SIZE,
                    this.CELL_SIZE
                );
            }.bind(this));
            
            // 渲染食物
            if (this.food && this.food.x !== undefined && this.food.y !== undefined) {
                this.ctx.fillStyle = this.food.color;
                this.ctx.fillRect(
                    this.food.x * this.CELL_SIZE + 1,
                    this.food.y * this.CELL_SIZE + 1,
                    this.CELL_SIZE - 2,
                    this.CELL_SIZE - 2
                );
                
                // 食物边框
                this.ctx.strokeStyle = '#fff';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(
                    this.food.x * this.CELL_SIZE + 1,
                    this.food.y * this.CELL_SIZE + 1,
                    this.CELL_SIZE - 2,
                    this.CELL_SIZE - 2
                );
            }
        },
        
        changeDirection: function (newDirection) {
            if (!this.gameRunning) return;
            
            // 防止反向移动
            var opposites = {
                'up': 'down',
                'down': 'up',
                'left': 'right',
                'right': 'left'
            };
            
            if (newDirection !== opposites[this.direction]) {
                this.direction = newDirection;
            }
        },
        
        gameOver: function () {
            this.gameRunning = false;
            if (this.gameInterval) {
                clearInterval(this.gameInterval);
            }
            this.getView().getModel().setProperty("/status", "游戏结束");
            
            // 显示游戏结束的Message Box
            MessageBox.information("游戏结束！\n\n最终分数: " + this.getView().getModel().getProperty("/score"), {
                title: "游戏结束",
                onClose: function() {
                    // 点击OK后自动重启游戏
                    this.onRestart();
                }.bind(this)
            });
        },
        
        // 事件处理函数
        onRestart: function () {
            console.log('Restart button clicked');
            if (this.gameInterval) {
                clearInterval(this.gameInterval);
            }
            this.initGame();
        },
        
        onSpeedChange: function (oEvent) {
            var newSpeed = oEvent.getParameter("value");
            if (this.gameRunning && this.gameInterval) {
                clearInterval(this.gameInterval);
                this.gameInterval = setInterval(this.gameLoop.bind(this), this.getGameSpeed());
            }
        },
        
        onDirectionPress: function (oEvent) {
            var button = oEvent.getSource();
            var direction;
            
            // 根据按钮的图标确定方向
            var icon = button.getIcon();
            if (icon.includes('up')) {
                direction = 'up';
            } else if (icon.includes('down')) {
                direction = 'down';
            } else if (icon.includes('left')) {
                direction = 'left';
            } else if (icon.includes('right')) {
                direction = 'right';
            }
            
            if (direction) {
                this.changeDirection(direction);
            }
        },
        
        _attachKeyboardEvents: function () {
            document.addEventListener('keydown', function(event) {
                switch(event.key) {
                    // 方向键控制
                    case 'ArrowUp':
                        this.changeDirection('up');
                        break;
                    case 'ArrowDown':
                        this.changeDirection('down');
                        break;
                    case 'ArrowLeft':
                        this.changeDirection('left');
                        break;
                    case 'ArrowRight':
                        this.changeDirection('right');
                        break;
                    // WASD控制
                    case 'w':
                    case 'W':
                        this.changeDirection('up');
                        break;
                    case 's':
                    case 'S':
                        this.changeDirection('down');
                        break;
                    case 'a':
                    case 'A':
                        this.changeDirection('left');
                        break;
                    case 'd':
                    case 'D':
                        this.changeDirection('right');
                        break;
                    // 空格键重新开始
                    case ' ':
                        event.preventDefault();
                        if (!this.gameRunning) {
                            this.onRestart();
                        }
                        break;
                }
            }.bind(this));
        }
    });
});