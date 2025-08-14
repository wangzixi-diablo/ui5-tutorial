sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("sap.ui5.walkthrough.controller.App", {
        onInit: function () {
            // 游戏配置
            this.BOARD_WIDTH = 15;
            this.BOARD_HEIGHT = 20;
            this.BLOCK_SIZE = 30;
            
            // 游戏状态
            this.board = [];
            this.currentPiece = null;
            this.nextPiece = null;
            this.score = 0;
            this.highScore = this.loadHighScore();
            this.gameTime = 0;
            this.gameRunning = false;
            this.gameLoop = null;
            this.timeInterval = null;
            this.dropSpeed = 1000;
            
            // 俄罗斯方块形状定义
            this.PIECES = {
                I: {
                    shape: [
                        [1, 1, 1, 1]
                    ],
                    color: '#00f5ff'
                },
                O: {
                    shape: [
                        [1, 1],
                        [1, 1]
                    ],
                    color: '#ffff00'
                },
                T: {
                    shape: [
                        [0, 1, 0],
                        [1, 1, 1]
                    ],
                    color: '#800080'
                },
                S: {
                    shape: [
                        [0, 1, 1],
                        [1, 1, 0]
                    ],
                    color: '#00ff00'
                },
                Z: {
                    shape: [
                        [1, 1, 0],
                        [0, 1, 1]
                    ],
                    color: '#ff0000'
                },
                J: {
                    shape: [
                        [1, 0, 0],
                        [1, 1, 1]
                    ],
                    color: '#0000ff'
                },
                L: {
                    shape: [
                        [0, 0, 1],
                        [1, 1, 1]
                    ],
                    color: '#ffa500'
                }
            };
            
            // 延迟初始化，确保DOM已渲染
            setTimeout(() => {
                this.initializeGame();
            }, 100);
        },
        
        initializeGame: function() {
            // Canvas 元素
            this.canvas = document.getElementById('__xmlview0--gameBoard');
            this.ctx = this.canvas.getContext('2d');
            this.nextCanvas = document.getElementById('__xmlview0--nextPiece');
            this.nextCtx = this.nextCanvas.getContext('2d');
            
            // 初始化游戏
            this.initBoard();
            this.updateHighScore();
            this.updateScore();
            this.updateTime();
            this.drawBoard();
            
            // 设置键盘事件监听器
            this.setupKeyboardEvents();
            this.startGame();
        },
        
        setupKeyboardEvents: function() {
            document.addEventListener('keydown', (e) => {
                if (!this.gameRunning) return;
                
                switch(e.key) {
                    case 'ArrowLeft':
                    case 'a':
                    case 'A':
                        this.moveLeft();
                        break;
                    case 'ArrowRight':
                    case 'd':
                    case 'D':
                        this.moveRight();
                        break;
                    case 'ArrowDown':
                        this.moveDown();
                        break;
                    case 'ArrowUp':
                    case ' ':
                    case 'g':
                    case 'G':
                        this.rotatePiece();
                        break;
                    case 'Enter':
                    case 'h':
                    case 'H':
                        this.hardDrop();
                        break;
                }
            });
        },
        
        loadHighScore: function() {
            const saved = localStorage.getItem('tetrisHighScore');
            return saved ? parseInt(saved) : 0;
        },
        
        saveHighScore: function() {
            localStorage.setItem('tetrisHighScore', this.highScore.toString());
        },
        
        initBoard: function() {
            this.board = [];
            for (let y = 0; y < this.BOARD_HEIGHT; y++) {
                this.board[y] = [];
                for (let x = 0; x < this.BOARD_WIDTH; x++) {
                    this.board[y][x] = 0;
                }
            }
        },
        
        createPiece: function() {
            const pieceTypes = Object.keys(this.PIECES);
            const randomType = pieceTypes[Math.floor(Math.random() * pieceTypes.length)];
            const piece = this.PIECES[randomType];
            
            return {
                type: randomType,
                shape: piece.shape,
                color: piece.color,
                x: Math.floor(this.BOARD_WIDTH / 2) - Math.floor(piece.shape[0].length / 2),
                y: 0
            };
        },
        
        rotateMatrix: function(matrix) {
            const rows = matrix.length;
            const cols = matrix[0].length;
            const rotated = [];
            
            for (let i = 0; i < cols; i++) {
                rotated[i] = [];
                for (let j = 0; j < rows; j++) {
                    rotated[i][j] = matrix[rows - 1 - j][i];
                }
            }
            
            return rotated;
        },
        
        checkCollision: function(piece, offsetX = 0, offsetY = 0) {
            for (let y = 0; y < piece.shape.length; y++) {
                for (let x = 0; x < piece.shape[y].length; x++) {
                    if (piece.shape[y][x]) {
                        const newX = piece.x + x + offsetX;
                        const newY = piece.y + y + offsetY;
                        
                        if (newX < 0 || newX >= this.BOARD_WIDTH || newY >= this.BOARD_HEIGHT) {
                            return true;
                        }
                        
                        if (newY >= 0 && this.board[newY][newX]) {
                            return true;
                        }
                    }
                }
            }
            return false;
        },
        
        placePiece: function() {
            for (let y = 0; y < this.currentPiece.shape.length; y++) {
                for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                    if (this.currentPiece.shape[y][x]) {
                        const boardY = this.currentPiece.y + y;
                        const boardX = this.currentPiece.x + x;
                        if (boardY >= 0) {
                            this.board[boardY][boardX] = this.currentPiece.color;
                        }
                    }
                }
            }
        },
        
        clearLines: function() {
            let linesCleared = 0;
            
            for (let y = this.BOARD_HEIGHT - 1; y >= 0; y--) {
                if (this.board[y].every(cell => cell !== 0)) {
                    this.board.splice(y, 1);
                    this.board.unshift(new Array(this.BOARD_WIDTH).fill(0));
                    linesCleared++;
                    y++;
                }
            }
            
            if (linesCleared > 0) {
                this.score += linesCleared * 100 * linesCleared;
                this.updateScore();
            }
        },
        
        drawBlock: function(ctx, x, y, color, size = this.BLOCK_SIZE) {
            ctx.fillStyle = color;
            ctx.fillRect(x * size, y * size, size, size);
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            ctx.strokeRect(x * size, y * size, size, size);
        },
        
        drawBoard: function() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            for (let y = 0; y < this.BOARD_HEIGHT; y++) {
                for (let x = 0; x < this.BOARD_WIDTH; x++) {
                    if (this.board[y][x]) {
                        this.drawBlock(this.ctx, x, y, this.board[y][x]);
                    }
                }
            }
            
            if (this.currentPiece) {
                for (let y = 0; y < this.currentPiece.shape.length; y++) {
                    for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                        if (this.currentPiece.shape[y][x]) {
                            this.drawBlock(this.ctx, this.currentPiece.x + x, this.currentPiece.y + y, this.currentPiece.color);
                        }
                    }
                }
            }
        },
        
        drawNextPiece: function() {
            this.nextCtx.clearRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
            
            if (this.nextPiece) {
                const blockSize = 15;
                const offsetX = (this.nextCanvas.width - this.nextPiece.shape[0].length * blockSize) / 2;
                const offsetY = (this.nextCanvas.height - this.nextPiece.shape.length * blockSize) / 2;
                
                for (let y = 0; y < this.nextPiece.shape.length; y++) {
                    for (let x = 0; x < this.nextPiece.shape[y].length; x++) {
                        if (this.nextPiece.shape[y][x]) {
                            this.nextCtx.fillStyle = this.nextPiece.color;
                            this.nextCtx.fillRect(
                                offsetX + x * blockSize,
                                offsetY + y * blockSize,
                                blockSize,
                                blockSize
                            );
                            this.nextCtx.strokeStyle = '#333';
                            this.nextCtx.strokeRect(
                                offsetX + x * blockSize,
                                offsetY + y * blockSize,
                                blockSize,
                                blockSize
                            );
                        }
                    }
                }
            }
        },
        
        moveLeft: function() {
            if (this.currentPiece && !this.checkCollision(this.currentPiece, -1, 0)) {
                this.currentPiece.x--;
                this.drawBoard();
            }
        },
        
        moveRight: function() {
            if (this.currentPiece && !this.checkCollision(this.currentPiece, 1, 0)) {
                this.currentPiece.x++;
                this.drawBoard();
            }
        },
        
        moveDown: function() {
            if (this.currentPiece && !this.checkCollision(this.currentPiece, 0, 1)) {
                this.currentPiece.y++;
                this.drawBoard();
                return true;
            }
            return false;
        },
        
        rotatePiece: function() {
            if (this.currentPiece) {
                const rotated = this.rotateMatrix(this.currentPiece.shape);
                const originalShape = this.currentPiece.shape;
                this.currentPiece.shape = rotated;
                
                if (this.checkCollision(this.currentPiece)) {
                    this.currentPiece.shape = originalShape;
                } else {
                    this.drawBoard();
                }
            }
        },
        
        hardDrop: function() {
            if (this.currentPiece) {
                while (this.moveDown()) {
                    // 继续下落直到碰撞
                }
            }
        },
        
        updateScore: function() {
            this.byId("score").setText(this.score.toString());
        },
        
        updateHighScore: function() {
            this.byId("highScore").setText(this.highScore.toString());
        },
        
        updateTime: function() {
            const minutes = Math.floor(this.gameTime / 60);
            const seconds = this.gameTime % 60;
            this.byId("time").setText(
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            );
        },
        
        gameOver: function() {
            this.gameRunning = false;
            clearInterval(this.gameLoop);
            clearInterval(this.timeInterval);
            
            if (this.score > this.highScore) {
                this.highScore = this.score;
                this.saveHighScore();
                this.updateHighScore();
            }
            
            // 显示游戏结束面板
            this.byId("gameOver").setVisible(true);
            // 更新最终得分显示
            this.getView().getModel().setProperty("/finalScore", this.score);
        },
        
        gameStep: function() {
            if (!this.gameRunning) return;
            
            if (!this.moveDown()) {
                this.placePiece();
                this.clearLines();
                
                this.currentPiece = this.nextPiece;
                this.nextPiece = this.createPiece();
                
                if (this.checkCollision(this.currentPiece)) {
                    this.gameOver();
                    return;
                }
                
                this.drawNextPiece();
            }
            
            this.drawBoard();
        },
        
        startGame: function() {
            if (this.gameRunning) return;
            
            this.initBoard();
            this.score = 0;
            this.gameTime = 0;
            this.gameRunning = true;
            
            this.currentPiece = this.createPiece();
            this.nextPiece = this.createPiece();
            
            this.updateScore();
            this.updateHighScore();
            this.updateTime();
            this.drawBoard();
            this.drawNextPiece();
            
            // 隐藏游戏结束面板
            this.byId("gameOver").setVisible(false);
            
            clearInterval(this.gameLoop);
            clearInterval(this.timeInterval);
            
            this.gameLoop = setInterval(() => {
                this.gameStep();
            }, this.dropSpeed);
            this.timeInterval = setInterval(() => {
                this.gameTime++;
                this.updateTime();
            }, 1000);
        },
        
        restartGame: function() {
            this.startGame();
        },
        
        updateGameSpeed: function(oEvent) {
            const sliderValue = oEvent.getParameter("value");
            this.dropSpeed = 2100 - (sliderValue * 200);
            
            if (this.gameRunning) {
                clearInterval(this.gameLoop);
                this.gameLoop = setInterval(() => {
                    this.gameStep();
                }, this.dropSpeed);
            }
        }
    });
});