sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("sap.ui5.walkthrough.controller.App", {
        onInit: function () {
            this.audioPlayer = null;
            this.isPlaying = false;
            this.currentFile = null;
        },

        onAfterRendering: function () {
            // 获取音频元素
            this.audioPlayer = document.getElementById('audioPlayer');
            
            // 绑定音频事件
            if (this.audioPlayer) {
                this.audioPlayer.addEventListener('loadedmetadata', this.onAudioLoaded.bind(this));
                this.audioPlayer.addEventListener('timeupdate', this.onTimeUpdate.bind(this));
                this.audioPlayer.addEventListener('ended', this.onAudioEnded.bind(this));
                this.audioPlayer.addEventListener('error', this.onAudioError.bind(this));
            }
        },

        onLoadFile: function () {
            var fileInput = document.getElementById('fileInput');
            var file = fileInput.files[0];
            
            if (!file) {
                MessageToast.show("请选择一个MP3文件");
                return;
            }
            
            if (!file.type.startsWith('audio/')) {
                MessageToast.show("请选择有效的音频文件");
                return;
            }
            
            this.currentFile = file;
            var fileURL = URL.createObjectURL(file);
            this.audioPlayer.src = fileURL;
            
            // 更新UI
            this.byId("currentFileName").setText(file.name);
            this.byId("playBtn").setEnabled(true);
            this.byId("stopBtn").setEnabled(true);
            
            MessageToast.show("文件加载成功: " + file.name);
        },

        onPlay: function () {
            if (this.audioPlayer && this.currentFile) {
                this.audioPlayer.play();
                this.isPlaying = true;
                this.byId("playBtn").setEnabled(false);
                this.byId("pauseBtn").setEnabled(true);
                this.byId("progressSlider").setEnabled(true);
            }
        },

        onPause: function () {
            if (this.audioPlayer) {
                this.audioPlayer.pause();
                this.isPlaying = false;
                this.byId("playBtn").setEnabled(true);
                this.byId("pauseBtn").setEnabled(false);
            }
        },

        onStop: function () {
            if (this.audioPlayer) {
                this.audioPlayer.pause();
                this.audioPlayer.currentTime = 0;
                this.isPlaying = false;
                this.byId("playBtn").setEnabled(true);
                this.byId("pauseBtn").setEnabled(false);
                this.byId("progressSlider").setValue(0);
                this.byId("currentTime").setText("00:00");
            }
        },

        onProgressChange: function (oEvent) {
            if (this.audioPlayer && this.audioPlayer.duration) {
                var value = oEvent.getParameter("value");
                var newTime = (value / 100) * this.audioPlayer.duration;
                this.audioPlayer.currentTime = newTime;
            }
        },

        onVolumeChange: function (oEvent) {
            var value = oEvent.getParameter("value");
            if (this.audioPlayer) {
                this.audioPlayer.volume = value / 100;
            }
            this.byId("volumeText").setText(Math.round(value) + "%");
        },

        onAudioLoaded: function () {
            if (this.audioPlayer && this.audioPlayer.duration) {
                var totalTime = this.formatTime(this.audioPlayer.duration);
                this.byId("totalTime").setText(totalTime);
                
                // 设置初始音量
                this.audioPlayer.volume = 0.5;
            }
        },

        onTimeUpdate: function () {
            if (this.audioPlayer && this.audioPlayer.duration) {
                var currentTime = this.audioPlayer.currentTime;
                var duration = this.audioPlayer.duration;
                var progress = (currentTime / duration) * 100;
                
                this.byId("progressSlider").setValue(progress);
                this.byId("currentTime").setText(this.formatTime(currentTime));
            }
        },

        onAudioEnded: function () {
            this.isPlaying = false;
            this.byId("playBtn").setEnabled(true);
            this.byId("pauseBtn").setEnabled(false);
            this.byId("progressSlider").setValue(0);
            this.byId("currentTime").setText("00:00");
            MessageToast.show("播放完成");
        },

        onAudioError: function (e) {
            MessageToast.show("音频播放出错: " + e.message);
            this.byId("playBtn").setEnabled(false);
            this.byId("pauseBtn").setEnabled(false);
            this.byId("stopBtn").setEnabled(false);
        },

        formatTime: function (seconds) {
            if (isNaN(seconds)) return "00:00";
            
            var minutes = Math.floor(seconds / 60);
            var remainingSeconds = Math.floor(seconds % 60);
            
            return (minutes < 10 ? "0" : "") + minutes + ":" + 
                   (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
        }
    });
});