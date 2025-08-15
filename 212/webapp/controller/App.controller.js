sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("sap.ui5.walkthrough.controller.App", {
        
        onInit: function () {
            this.BOARD_SIZE = 10;
            this.EMPTY = 0;
            this.WHITE = 1; // 玩家
            this.BLACK = 2; // AI
            
            this.board = [];
            this.currentPlayer = this.WHITE;
            this.gameOver = false;
            this.isThinking = false;
            
            // Canvas相关属性
            this.CELL_SIZE = 30;
            this.BOARD_PADDING = 20;
            this.STONE_RADIUS = 12;
            
            this.initBoard();
            setTimeout(() => {
                this.initCanvas();
                this.drawBoard();
            }, 100);
            this.updateGameInfo();
        },
        
        // 初始化棋盘
        initBoard: function() {
            this.board = [];
            for (let i = 0; i < this.BOARD_SIZE; i++) {
                this.board[i] = [];
                for (let j = 0; j < this.BOARD_SIZE; j++) {
                    this.board[i][j] = this.EMPTY;
                }
            }
        },
        
        // 初始化Canvas
        initCanvas: function() {
            this.canvas = document.getElementById('__xmlview0--chessBoard');
            this.ctx = this.canvas.getContext('2d');
            
            // 添加点击事件监听器
            this.canvas.addEventListener('click', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const col = Math.floor((x - this.BOARD_PADDING) / this.CELL_SIZE);
                const row = Math.floor((y - this.BOARD_PADDING) / this.CELL_SIZE);
                
                if (row >= 0 && row < this.BOARD_SIZE && col >= 0 && col < this.BOARD_SIZE) {
                    this.handleCellClick(row, col);
                }
            });
            
            // 添加鼠标悬停效果
            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const col = Math.floor((x - this.BOARD_PADDING) / this.CELL_SIZE);
                const row = Math.floor((y - this.BOARD_PADDING) / this.CELL_SIZE);
                
                this.hoverRow = row;
                this.hoverCol = col;
                this.drawBoard();
            });
            
            this.canvas.addEventListener('mouseleave', () => {
                this.hoverRow = -1;
                this.hoverCol = -1;
                this.drawBoard();
            });
        },
        
        // 绘制棋盘
        drawBoard: function() {
            if (!this.ctx) return;
            
            // 清空画布
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // 绘制背景
            this.ctx.fillStyle = '#deb887';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // 绘制边框
            this.ctx.strokeStyle = '#8b4513';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(1, 1, this.canvas.width - 2, this.canvas.height - 2);
            
            // 绘制网格线
            this.ctx.strokeStyle = '#8b4513';
            this.ctx.lineWidth = 1;
            
            for (let i = 0; i <= this.BOARD_SIZE; i++) {
                // 垂直线
                const x = this.BOARD_PADDING + i * this.CELL_SIZE;
                this.ctx.beginPath();
                this.ctx.moveTo(x, this.BOARD_PADDING);
                this.ctx.lineTo(x, this.BOARD_PADDING + this.BOARD_SIZE * this.CELL_SIZE);
                this.ctx.stroke();
                
                // 水平线
                const y = this.BOARD_PADDING + i * this.CELL_SIZE;
                this.ctx.beginPath();
                this.ctx.moveTo(this.BOARD_PADDING, y);
                this.ctx.lineTo(this.BOARD_PADDING + this.BOARD_SIZE * this.CELL_SIZE, y);
                this.ctx.stroke();
            }
            
            // 绘制悬停效果
            if (this.hoverRow >= 0 && this.hoverRow < this.BOARD_SIZE && 
                this.hoverCol >= 0 && this.hoverCol < this.BOARD_SIZE && 
                this.board[this.hoverRow][this.hoverCol] === this.EMPTY &&
                !this.gameOver && !this.isThinking && this.currentPlayer === this.WHITE) {
                
                const x = this.BOARD_PADDING + this.hoverCol * this.CELL_SIZE;
                const y = this.BOARD_PADDING + this.hoverRow * this.CELL_SIZE;
                
                this.ctx.fillStyle = '#d2b48c';
                this.ctx.fillRect(x, y, this.CELL_SIZE, this.CELL_SIZE);
            }
            
            // 绘制棋子
            for (let i = 0; i < this.BOARD_SIZE; i++) {
                for (let j = 0; j < this.BOARD_SIZE; j++) {
                    if (this.board[i][j] !== this.EMPTY) {
                        this.drawStone(i, j, this.board[i][j]);
                    }
                }
            }
            
            // 绘制获胜棋子高亮
            if (this.winningStones) {
                this.drawWinningStones();
            }
        },
        
        // 绘制棋子
        drawStone: function(row, col, player) {
            const centerX = this.BOARD_PADDING + col * this.CELL_SIZE + this.CELL_SIZE / 2;
            const centerY = this.BOARD_PADDING + row * this.CELL_SIZE + this.CELL_SIZE / 2;
            
            // 创建渐变
            const gradient = this.ctx.createRadialGradient(
                centerX - 3, centerY - 3, 0,
                centerX, centerY, this.STONE_RADIUS
            );
            
            if (player === this.WHITE) {
                gradient.addColorStop(0, '#ffffff');
                gradient.addColorStop(0.7, '#f0f0f0');
                gradient.addColorStop(1, '#d0d0d0');
                
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, this.STONE_RADIUS, 0, 2 * Math.PI);
                this.ctx.fill();
                
                this.ctx.strokeStyle = '#ccc';
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
            } else {
                gradient.addColorStop(0, '#333333');
                gradient.addColorStop(0.7, '#111111');
                gradient.addColorStop(1, '#000000');
                
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, this.STONE_RADIUS, 0, 2 * Math.PI);
                this.ctx.fill();
                
                this.ctx.strokeStyle = '#000';
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
            }
        },
        
        // 绘制获胜棋子高亮
        drawWinningStones: function() {
            if (!this.winningStones) return;
            
            this.ctx.shadowColor = '#ff0000';
            this.ctx.shadowBlur = 10;
            
            this.winningStones.forEach(stone => {
                const centerX = this.BOARD_PADDING + stone.col * this.CELL_SIZE + this.CELL_SIZE / 2;
                const centerY = this.BOARD_PADDING + stone.row * this.CELL_SIZE + this.CELL_SIZE / 2;
                
                this.ctx.strokeStyle = '#ff0000';
                this.ctx.lineWidth = 3;
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, this.STONE_RADIUS + 2, 0, 2 * Math.PI);
                this.ctx.stroke();
            });
            
            this.ctx.shadowColor = 'transparent';
            this.ctx.shadowBlur = 0;
        },
        
        // 处理玩家点击
        handleCellClick: function(row, col) {
            if (this.gameOver || this.isThinking || this.board[row][col] !== this.EMPTY || this.currentPlayer !== this.WHITE) {
                return;
            }
            
            this.makeMove(row, col, this.WHITE);
            
            if (!this.gameOver) {
                this.currentPlayer = this.BLACK;
                this.updateGameInfo();
                setTimeout(() => {
                    this.aiMove();
                }, 500);
            }
        },
        
        // 下棋
        makeMove: function(row, col, player) {
            this.board[row][col] = player;
            this.drawBoard();
            
            const winner = this.checkWinner(row, col);
            if (winner) {
                this.gameOver = true;
                this.winningStones = winner.stones;
                this.drawBoard();
                this.updateGameInfo(`游戏结束！${winner.player === this.WHITE ? '白棋（玩家）' : '黑棋（AI）'}获胜！`);
            } else if (this.isBoardFull()) {
                this.gameOver = true;
                this.updateGameInfo('游戏结束！平局！');
            }
        },
        
        // AI下棋
        aiMove: function() {
            if (this.gameOver) return;
            
            this.isThinking = true;
            this.byId("thinkingIndicator").setVisible(true);
            
            setTimeout(() => {
                const move = this.getBestMove();
                if (move) {
                    this.makeMove(move.row, move.col, this.BLACK);
                    
                    if (!this.gameOver) {
                        this.currentPlayer = this.WHITE;
                        this.updateGameInfo();
                    }
                }
                
                this.isThinking = false;
                this.byId("thinkingIndicator").setVisible(false);
            }, 1000);
        },
        
        // 获取AI最佳移动
        getBestMove: function() {
            let bestScore = -Infinity;
            let bestMove = null;
            
            const moves = this.getAvailableMoves();
            
            for (const move of moves) {
                this.board[move.row][move.col] = this.BLACK;
                const score = this.minimax(3, false, -Infinity, Infinity);
                this.board[move.row][move.col] = this.EMPTY;
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            }
            
            return bestMove;
        },
        
        // Minimax算法
        minimax: function(depth, isMaximizing, alpha, beta) {
            const winner = this.checkGameState();
            
            if (winner === this.BLACK) return 1000;
            if (winner === this.WHITE) return -1000;
            if (depth === 0 || this.isBoardFull()) return this.evaluateBoard();
            
            if (isMaximizing) {
                let maxEval = -Infinity;
                const moves = this.getAvailableMoves();
                
                for (const move of moves) {
                    this.board[move.row][move.col] = this.BLACK;
                    const evalScore = this.minimax(depth - 1, false, alpha, beta);
                    this.board[move.row][move.col] = this.EMPTY;
                    
                    maxEval = Math.max(maxEval, evalScore);
                    alpha = Math.max(alpha, evalScore);
                    
                    if (beta <= alpha) break;
                }
                
                return maxEval;
            } else {
                let minEval = Infinity;
                const moves = this.getAvailableMoves();
                
                for (const move of moves) {
                    this.board[move.row][move.col] = this.WHITE;
                    const evalScore = this.minimax(depth - 1, true, alpha, beta);
                    this.board[move.row][move.col] = this.EMPTY;
                    
                    minEval = Math.min(minEval, evalScore);
                    beta = Math.min(beta, evalScore);
                    
                    if (beta <= alpha) break;
                }
                
                return minEval;
            }
        },
        
        // 获取可用移动
        getAvailableMoves: function() {
            const moves = [];
            const range = 2;
            
            if (this.isEmptyBoard()) {
                moves.push({row: Math.floor(this.BOARD_SIZE/2), col: Math.floor(this.BOARD_SIZE/2)});
                return moves;
            }
            
            const checked = new Set();
            
            for (let i = 0; i < this.BOARD_SIZE; i++) {
                for (let j = 0; j < this.BOARD_SIZE; j++) {
                    if (this.board[i][j] !== this.EMPTY) {
                        for (let di = -range; di <= range; di++) {
                            for (let dj = -range; dj <= range; dj++) {
                                const ni = i + di;
                                const nj = j + dj;
                                const key = `${ni},${nj}`;
                                
                                if (ni >= 0 && ni < this.BOARD_SIZE && nj >= 0 && nj < this.BOARD_SIZE && 
                                    this.board[ni][nj] === this.EMPTY && !checked.has(key)) {
                                    moves.push({row: ni, col: nj});
                                    checked.add(key);
                                }
                            }
                        }
                    }
                }
            }
            
            return moves;
        },
        
        // 评估棋盘
        evaluateBoard: function() {
            let score = 0;
            
            for (let i = 0; i < this.BOARD_SIZE; i++) {
                for (let j = 0; j < this.BOARD_SIZE; j++) {
                    if (this.board[i][j] !== this.EMPTY) {
                        score += this.evaluatePosition(i, j, this.board[i][j]);
                    }
                }
            }
            
            return score;
        },
        
        // 评估位置
        evaluatePosition: function(row, col, player) {
            const directions = [[1,0], [0,1], [1,1], [1,-1]];
            let score = 0;
            
            for (const [dr, dc] of directions) {
                const count = this.countInDirection(row, col, dr, dc, player);
                score += this.getScoreForCount(count, player);
            }
            
            return score;
        },
        
        // 计算方向上的连子数
        countInDirection: function(row, col, dr, dc, player) {
            let count = 1;
            
            let r = row + dr, c = col + dc;
            while (r >= 0 && r < this.BOARD_SIZE && c >= 0 && c < this.BOARD_SIZE && this.board[r][c] === player) {
                count++;
                r += dr;
                c += dc;
            }
            
            r = row - dr;
            c = col - dc;
            while (r >= 0 && r < this.BOARD_SIZE && c >= 0 && c < this.BOARD_SIZE && this.board[r][c] === player) {
                count++;
                r -= dr;
                c -= dc;
            }
            
            return count;
        },
        
        // 根据连子数获取分数
        getScoreForCount: function(count, player) {
            const multiplier = player === this.BLACK ? 1 : -1;
            
            switch (count) {
                case 5: return 10000 * multiplier;
                case 4: return 1000 * multiplier;
                case 3: return 100 * multiplier;
                case 2: return 10 * multiplier;
                default: return 1 * multiplier;
            }
        },
        
        // 检查游戏状态
        checkGameState: function() {
            for (let i = 0; i < this.BOARD_SIZE; i++) {
                for (let j = 0; j < this.BOARD_SIZE; j++) {
                    if (this.board[i][j] !== this.EMPTY) {
                        const winner = this.checkWinner(i, j);
                        if (winner) {
                            return winner.player;
                        }
                    }
                }
            }
            return null;
        },
        
        // 检查获胜者
        checkWinner: function(row, col) {
            const player = this.board[row][col];
            const directions = [[1,0], [0,1], [1,1], [1,-1]];
            
            for (const [dr, dc] of directions) {
                const stones = [{row, col}];
                
                let r = row + dr, c = col + dc;
                while (r >= 0 && r < this.BOARD_SIZE && c >= 0 && c < this.BOARD_SIZE && this.board[r][c] === player) {
                    stones.push({row: r, col: c});
                    r += dr;
                    c += dc;
                }
                
                r = row - dr;
                c = col - dc;
                while (r >= 0 && r < this.BOARD_SIZE && c >= 0 && c < this.BOARD_SIZE && this.board[r][c] === player) {
                    stones.unshift({row: r, col: c});
                    r -= dr;
                    c -= dc;
                }
                
                if (stones.length >= 5) {
                    return {player, stones: stones.slice(0, 5)};
                }
            }
            
            return null;
        },
        
        // 高亮获胜棋子
        highlightWinningStones: function(stones) {
            stones.forEach(stone => {
                const cell = document.querySelector(`[data-row="${stone.row}"][data-col="${stone.col}"]`);
                if (cell) {
                    const stoneElement = cell.firstChild;
                    if (stoneElement) {
                        stoneElement.classList.add('winning-stone');
                    }
                }
            });
        },
        
        // 检查棋盘是否已满
        isBoardFull: function() {
            for (let i = 0; i < this.BOARD_SIZE; i++) {
                for (let j = 0; j < this.BOARD_SIZE; j++) {
                    if (this.board[i][j] === this.EMPTY) {
                        return false;
                    }
                }
            }
            return true;
        },
        
        // 检查棋盘是否为空
        isEmptyBoard: function() {
            for (let i = 0; i < this.BOARD_SIZE; i++) {
                for (let j = 0; j < this.BOARD_SIZE; j++) {
                    if (this.board[i][j] !== this.EMPTY) {
                        return false;
                    }
                }
            }
            return true;
        },
        
        // 更新游戏信息
        updateGameInfo: function(message) {
            if (message) {
                this.byId("gameInfo").setText(message);
            } else {
                this.byId("gameInfo").setText(`轮到：${this.currentPlayer === this.WHITE ? '白棋（玩家）' : '黑棋（AI）'}`);
            }
        },
        
        // 重置游戏
        onResetGame: function() {
            this.initBoard();
            this.currentPlayer = this.WHITE;
            this.gameOver = false;
            this.isThinking = false;
            this.winningStones = null;
            this.hoverRow = -1;
            this.hoverCol = -1;
            this.drawBoard();
            this.updateGameInfo();
            this.byId("thinkingIndicator").setVisible(false);
        }
    });
});