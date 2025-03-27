sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
		onSnow : function () {
			this.startSnow();
		},
		startSnow:function(){
			var canvas = document.querySelector('.snow'),
    		ctx = canvas.getContext('2d'),
    		windowW = window.innerWidth,
    		windowH = window.innerHeight,
    		numFlakes = 200,
    		flakes = [];
			init();

			function Flake(x, y) {
				var maxWeight = 5,
					maxSpeed = 3;
				
				this.x = x;
				this.y = y;
				this.r = randomBetween(0, 1);
				this.a = randomBetween(0, Math.PI);
				this.aStep = 0.01;
			  
				
				this.weight = randomBetween(2, maxWeight);
				this.alpha = (this.weight / maxWeight);
				this.speed = (this.weight / maxWeight) * maxSpeed;
				
				this.update = function() {
				  this.x += Math.cos(this.a) * this.r;
				  this.a += this.aStep;
				  
				  this.y += this.speed;
				}
			  }

			  function init() {
				var i = numFlakes,
					flake,
					x,
					y;
				
				while (i--) {
				  x = randomBetween(0, windowW, true);
				  y = randomBetween(0, windowH, true);
				  
				  
				  flake = new Flake(x, y);
				  flakes.push(flake);
				}
				
				scaleCanvas();
				loop();  
			  }
			  
			  function scaleCanvas() {
				canvas.width = windowW;
				canvas.height = windowH;
			  }
			  
			  function loop() {
				var i = flakes.length,
					z,
					dist,
					flakeA,
					flakeB;
				
				// clear canvas
				ctx.save();
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.clearRect(0, 0, windowW, windowH);
				ctx.restore();
				
				// loop of hell
				while (i--) {
				  
				  flakeA = flakes[i];
				  flakeA.update();
				  ctx.beginPath();
				  ctx.arc(flakeA.x, flakeA.y, flakeA.weight, 0, 2 * Math.PI, false);
				  ctx.fillStyle = 'rgba(255, 255, 255, ' + flakeA.alpha + ')';
				  ctx.fill();
				  
				  if (flakeA.y >= windowH) {
					flakeA.y = -flakeA.weight;
				  }  
				}
				
				requestAnimationFrame(loop);
			  }
			  
			  function randomBetween(min, max, round) {
				var num = Math.random() * (max - min + 1) + min;
			  
				if (round) {
				  return Math.floor(num);
				} else {
				  return num;
				}
			  }
			  
			  function distanceBetween(vector1, vector2) {
				var dx = vector2.x - vector1.x,
					dy = vector2.y - vector1.y;
			  
				return Math.sqrt(dx*dx + dy*dy);
			  }			  
		},
   	});
});