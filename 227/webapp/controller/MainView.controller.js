sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function(Controller, MessageToast) {
  "use strict";

  return Controller.extend("sap.ui5.walkthrough.controller.MainView", {
    onInit: function() {
      this._scale = 3;
      this._running = false;
      this._paused = false;
      this._audioEnabled = false;
      this._frameTimes = [];
      this._canvas = null;
      this._ctx = null;
      this._imageData = null;
      this._romData = null;
      this._audioCtx = null;
      this._audioL = null;
      this._audioR = null;
      this._audioPos = 0;
      this._AUDIO_BUFFER_SIZE = 2048;
      this._animationId = null;
      this._nes = new window.jsnes.NES({
        onFrame: this._drawFrame.bind(this),
        onAudioSample: this._enqueueAudioSample.bind(this),
        sampleRate: 44100
      });
      this._setupKeyboard();
      this._log("等待用户选择 ROM (.nes) 文件");
    },
    _setupCanvas: function() {
      var canvasBox = this.byId("canvasBox").getDomRef();
      this._canvas = document.createElement("canvas");
      this._canvas.width = 256;
      this._canvas.height = 240;
      this._canvas.style.imageRendering = "pixelated";
      this._canvas.style.background = "#000";
      this._canvas.style.display = "block";
      this._canvas.style.width = (256 * this._scale) + "px";
      this._canvas.style.height = (240 * this._scale) + "px";
      canvasBox.appendChild(this._canvas);
      this._ctx = this._canvas.getContext("2d");
      this._imageData = this._ctx.getImageData(0, 0, 256, 240);
    },
    onAfterRendering: function() {
      if (!this._canvas) 
        this._setupCanvas();
    },
    _setupKeyboard: function() {
      var KEY_MAP = {
        88: window.jsnes.Controller.BUTTON_A,      // X
        90: window.jsnes.Controller.BUTTON_B,      // Z
        13: window.jsnes.Controller.BUTTON_START,  // Enter
        16: window.jsnes.Controller.BUTTON_SELECT, // Shift
        38: window.jsnes.Controller.BUTTON_UP,
        40: window.jsnes.Controller.BUTTON_DOWN,
        37: window.jsnes.Controller.BUTTON_LEFT,
        39: window.jsnes.Controller.BUTTON_RIGHT
      };
      window.addEventListener("keydown", (e) => {
        if (e.code === "KeyP") { this.onPause(); return; }
        var btn = KEY_MAP[e.keyCode];
        if (btn !== undefined) { e.preventDefault(); this._nes.buttonDown(1, btn); }
      });
      window.addEventListener("keyup", (e) => {
        var btn = KEY_MAP[e.keyCode];
        if (btn !== undefined) { e.preventDefault(); this._nes.buttonUp(1, btn); }
      });
    },
    _drawFrame: function(frameBuffer) {
      var data = this._imageData.data;
      for (var i = 0; i < frameBuffer.length; i++) {
        var color = frameBuffer[i];
        data[i * 4 + 0] = color & 0xFF;
        data[i * 4 + 1] = (color >> 8) & 0xFF;
        data[i * 4 + 2] = (color >> 16) & 0xFF;
        data[i * 4 + 3] = 0xFF;
      }
      this._ctx.putImageData(this._imageData, 0, 0);
    },
    _frame: function() {
      var t0 = performance.now();
      this._nes.frame();
      var t1 = performance.now();
      this._frameTimes.push(t1 - t0);
      if (this._frameTimes.length > 60) this._frameTimes.shift();
      if (!this._paused) this._animationId = window.requestAnimationFrame(this._frame.bind(this));
    },
    _startLoop: function() {
      if (!this._running) {
        this._running = true;
        this._paused = false;
        this._animationId = window.requestAnimationFrame(this._frame.bind(this));
      }
    },
    _stopLoop: function() {
      if (this._animationId) window.cancelAnimationFrame(this._animationId);
      this._animationId = null;
    },
    _log: function(msg, cls) {
      var logText = this.byId("logText");
      var old = logText.getText();
      var now = `[${new Date().toLocaleTimeString()}] ${msg}\n`;
      logText.setText(old + now);
    },
    onChooseRom: function() {
      var oUploader = this.byId("romUploader");
      if (oUploader && oUploader.openFileDialog) {
        oUploader.openFileDialog();
      } else if (oUploader && oUploader.getDomRef()) { // fallback
        const input = oUploader.getDomRef().querySelector("input[type='file']");
        if (input) input.click();
      }
    },
    onRomChange: function(oEvent) {
      var file = oEvent.getParameter("files")[0];
      if (!file || !file.name.toLowerCase().endsWith(".nes")) {
        this._log("请选择 .nes 文件", "warn");
        return;
      }
      this._log(`开始读取本地 ROM: ${file.name} (${(file.size/1024).toFixed(1)} KB)`);
      var reader = new FileReader();
      reader.onload = (e) => {
        var arrayBuffer = e.target.result;
        var romData = this._arrayBufferToBinaryString(arrayBuffer);
        if (this._running) { this._running = false; this._stopLoop(); this.byId("btnStart").setText("启动"); }
        this._nes.reset();
        this._nes.loadROM(romData);
        this._romData = romData;
        this.byId("btnStart").setEnabled(true);
        this.byId("btnReset").setEnabled(true);
        this.byId("btnAudio").setEnabled(true);
        this.byId("btnPause").setEnabled(false);
        this._log("ROM 加载完成，可点击 启动");
      };
      reader.onerror = (e) => {
        this._log("ROM 读取失败", "err");
      };
      reader.readAsArrayBuffer(file);
    },
    _arrayBufferToBinaryString: function(buffer) {
      var bytes = new Uint8Array(buffer);
      var binary = "";
      var chunk = 0x8000;
      for (var i = 0; i < bytes.length; i += chunk) {
        var sub = bytes.subarray(i, i + chunk);
        binary += String.fromCharCode.apply(null, sub);
      }
      return binary;
    },
    _initAudio: function() {
      if (this._audioCtx) return;
      this._audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      this._audioL = new Float32Array(this._AUDIO_BUFFER_SIZE);
      this._audioR = new Float32Array(this._AUDIO_BUFFER_SIZE);
      this._audioPos = 0;
      this._log("AudioContext 已创建");
    },
    _enqueueAudioSample: function(l, r) {
      if (!this._audioEnabled || !this._audioCtx) return;
      this._audioL[this._audioPos] = l;
      this._audioR[this._audioPos] = r;
      this._audioPos++;
      if (this._audioPos >= this._AUDIO_BUFFER_SIZE) {
        var buffer = this._audioCtx.createBuffer(2, this._AUDIO_BUFFER_SIZE, this._audioCtx.sampleRate);
        buffer.getChannelData(0).set(this._audioL);
        buffer.getChannelData(1).set(this._audioR);
        var src = this._audioCtx.createBufferSource();
        src.buffer = buffer;
        src.connect(this._audioCtx.destination);
        src.start();
        this._audioPos = 0;
      }
    },
    onAudio: async function() {
      if (!this._audioCtx) this._initAudio();
      if (this._audioCtx.state === "suspended") await this._audioCtx.resume();
      this._audioEnabled = !this._audioEnabled;
      this.byId("btnAudio").setText(this._audioEnabled ? "关闭音频" : "开启音频");
      this._log(`音频 ${this._audioEnabled ? "已开启" : "已关闭"}`);
    },
    onStart: function() {
      if (!this._running) {
        this._startLoop();
        this.byId("btnStart").setText("停止");
        this.byId("btnPause").setEnabled(true);
        this._log("渲染循环启动");
      } else {
        this._running = false;
        this._stopLoop();
        this.byId("btnStart").setText("启动");
        this.byId("btnPause").setEnabled(false);
        this._log("渲染循环停止");
      }
    },
    onReset: function() {
      this._nes.reset();
      this._log("已复位 (reset)");
    },
    onPause: function() {
      if (!this._running) return;
      this._paused = !this._paused;
      this.byId("btnPause").setText(this._paused ? "继续" : "暂停");
      if (!this._paused) {
        this._startLoop();
        this._log("继续");
      } else {
        this._stopLoop();
        this._log("暂停");
      }
    },
    onScale: function() {
      this._scale = this._scale === 5 ? 1 : this._scale + 1;
      this._canvas.style.width = (256 * this._scale) + "px";
      this._canvas.style.height = (240 * this._scale) + "px";
      this.byId("btnScale").setText(`放大 ×${this._scale}`);
    }
  });
});
