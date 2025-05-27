sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	return Controller.extend("sap.ui5.walkthrough.controller.App", {
		// 初始化变量
		_timer: null,
		_counter: 0,
		_isPaused: false,

		// 开始计时器
		onStartTimer: function() {
			// 如果计时器已经在运行，则不做任何操作
			if (this._timer) {
				return;
			}

			// 重置计数器
			this._counter = 0;
			this._isPaused = false;

			// 获取TextArea控件
			var oTextArea = this.getView().byId("outputArea");
			oTextArea.setValue("");

			// 启动计时器，每秒执行一次
			this._timer = setInterval(function() {
				// 如果暂停状态，不执行操作
				if (this._isPaused) {
					return;
				}

				// 递增计数器
				var currentValue = oTextArea.getValue();
				// 如果已有内容，添加换行符
				var newValue = currentValue ? currentValue + "\n" + this._counter : "" + this._counter;
				oTextArea.setValue(newValue);
				this._counter++;
			}.bind(this), 1000);
		},

		// 暂停/继续计时器
		onToggleTimer: function() {
			// 如果计时器未启动，不做任何操作
			if (!this._timer) {
				return;
			}

			// 切换暂停状态
			this._isPaused = !this._isPaused;
		}
	});
});