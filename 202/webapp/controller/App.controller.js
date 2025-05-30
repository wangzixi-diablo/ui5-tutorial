sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("sap.ui5.walkthrough.App", {
        onInit: function () {
            // 加载CSS
            /*var styleElement = document.createElement("style");
            styleElement.textContent = this.getClockCSS();
            document.head.appendChild(styleElement);*/
        },
        
        onHTMLAfterRendering: function(oEvent) {
            // 获取HTML控件的DOM引用
            var oHTMLControl = oEvent.getSource();
            var oDomRef = oHTMLControl.getDomRef();
            
            // 获取时钟元素
            var clock = oDomRef.querySelector('#utility-clock');
            if (clock) {
                this.utilityClock(clock);
                this.autoResize(clock, 295 + 32);
            }
        },
        
        // 以下是从index.js复制的函数
        utilityClock: function(container) {
            var dynamic = container.querySelector('.dynamic');
            var hourElement = container.querySelector('.hour');
            var minuteElement = container.querySelector('.minute');
            var secondElement = container.querySelector('.second');
            var minute = function(n) {
                return n % 5 == 0 ? minuteText(n) : minuteLine(n);
            };
            var minuteText = function(n) {
                var element = document.createElement('div');
                element.className = 'minute-text';
                element.innerHTML = (n < 10 ? '0' : '') + n;
                position(element, n / 60, 135);
                dynamic.appendChild(element);
            };
            var minuteLine = function(n) {
                var anchor = document.createElement('div');
                anchor.className = 'anchor';
                var element = document.createElement('div');
                element.className = 'element minute-line';
                rotate(anchor, n);
                anchor.appendChild(element);
                dynamic.appendChild(anchor);
            };
            var hour = function(n) {
                var element = document.createElement('div');
                element.className = 'hour-text hour-' + n;
                element.innerHTML = n;
                position(element, n / 12, 105);
                dynamic.appendChild(element);
            };
            var position = function(element, phase, r) {
                var theta = phase * 2 * Math.PI;
                element.style.top = (-r * Math.cos(theta)).toFixed(1) + 'px';
                element.style.left = (r * Math.sin(theta)).toFixed(1) + 'px';
            };
            var rotate = function(element, second) {
                element.style.transform = element.style.webkitTransform = 'rotate(' + (second * 6) + 'deg)';
            };
            var animate = function() {
                var now = new Date();
                var time = now.getHours() * 3600 +
                            now.getMinutes() * 60 +
                            now.getSeconds() * 1 +
                            now.getMilliseconds() / 1000;
                rotate(secondElement, time);
                rotate(minuteElement, time / 60);
                rotate(hourElement, time / 60 / 12);
                requestAnimationFrame(animate);
            };
            for (var i = 1; i <= 60; i++) minute(i);
            for (var i = 1; i <= 12; i++) hour(i);
            animate();
        },
        
        autoResize: function(element, nativeSize) {
            var update = function() {
                var scale = Math.min(window.innerWidth, window.innerHeight) / nativeSize;
                element.style.transform = element.style.webkitTransform = 'scale(' + scale.toFixed(3) + ')';
            };
            update();
            window.addEventListener('resize', update);
        },
        
        // 返回时钟的CSS
        getClockCSS: function() {
            return `
            body {
                background: black;
            }
            
            .clock {
                position: absolute;
                opacity: 1;
            }
            
            .fill .clock {
                left: 50%;
                top: 50%;
            }
            
            .centre {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
            }
            
            .expand {
                position: absolute;
                top: 0;
                left: 0;
                transform: translate(-50%, -50%);
            }
            
            .anchor {
                position: absolute;
                top: 0;
                left: 0;
                width: 0;
                height: 0;
            }
            
            .element {
                position: absolute;
                top: 0;
                left: 0;
            }
            
            .round {
                border-radius: 296px;
            }
            
            .circle-1 {
                background: white;
                width: 12px;
                height: 12px;
            }
            
            .circle-2 {
                background: #FA9F22;
                width: 8px;
                height: 8px;
            }
            
            .circle-3 {
                background: black;
                width: 4px;
                height: 4px;
            }
            
            .second {
                transform: rotate(180deg);
            }
            
            .minute {
                transform: rotate(54deg);
            }
            
            .second-hand {
                width: 2px;
                height: 164px;
                background: #FA9F22;
                transform: translate(-50%,-100%) translateY(24px);
            }
            
            .hour {
                transform: rotate(304.5deg);
            }
            
            .thin-hand {
                width: 4px;
                height: 50px;
                background: white;
                transform: translate(-50%,-100%);
            }
            
            .fat-hand {
                width: 10px;
                height: 57px;
                border-radius: 10px;
                background: white;
                transform: translate(-50%,-100%) translateY(-18px);
            }
            
            .minute-hand {
                height: 112px;
            }
            
            .hour-text {
                position: absolute;
                font: 40px Hei, Helvetica, Arial, sans-serif;
                color: white;
                transform: translate(-50%,-50%);
            }
            
            .hour-10 {
                padding-left: 0.4ex;
            }
            .hour-11 {
                padding-left: 0.25ex;
            }
            
            .minute-text {
                position: absolute;
                font: 12px Avenir Next, Helvetica, Arial, sans-serif;
                color: white;
                transform: translate(-50%,-50%);
            }
            
            .minute-line {
                background: white;
                width: 1px;
                height: 9px;
                transform: translate(-50%,-100%) translateY(-131px);
                opacity: 0.34;
            }
            `;
        }
    });
});