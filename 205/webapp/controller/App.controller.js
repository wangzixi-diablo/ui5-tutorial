sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast,JSONModel) {
    "use strict";

    return Controller.extend("sap.ui5.walkthrough.controller.App", {
        
        onInit: function () {
            var oModel = new JSONModel({
                cities: [
                    { key: "chengdu", name: "成都" },
                    { key: "shanghai", name: "上海" },
                    { key: "beijing", name: "北京" }
                ],
                selectedCity: "",
                weatherData: null,
                loading: false
            });
            this.getView().setModel(oModel);
        },

        onSearchWeather: function () {
            var oModel = this.getView().getModel();
            var sSelectedCity = oModel.getProperty("/selectedCity");
            
            if (!sSelectedCity) {
                MessageToast.show("请选择一个城市");
                return;
            }
            
            // 设置加载状态
            oModel.setProperty("/loading", true);
            
            // 模拟API调用（由于没有真实的墨迹天气API密钥，这里使用模拟数据）
            this._simulateWeatherAPI(sSelectedCity).then(function(weatherData) {
                oModel.setProperty("/weatherData", weatherData);
                oModel.setProperty("/loading", false);
                MessageToast.show("天气信息获取成功");
            }).catch(function(error) {
                oModel.setProperty("/loading", false);
                MessageToast.show("获取天气信息失败：" + error.message);
            });
        },
        
        _simulateWeatherAPI: function(cityKey) {
            return new Promise(function(resolve, reject) {
                // 模拟API延迟
                setTimeout(function() {
                    var weatherData = {
                        chengdu: {
                            cityName: "成都",
                            date: new Date().toLocaleDateString('zh-CN'),
                            condition: "多云",
                            temperature: 22,
                            tempRange: "18°C - 26°C",
                            humidity: 65,
                            wind: "东南风 2级",
                            icon: "sap-icon://cloud"
                        },
                        shanghai: {
                            cityName: "上海",
                            date: new Date().toLocaleDateString('zh-CN'),
                            condition: "晴",
                            temperature: 25,
                            tempRange: "20°C - 28°C",
                            humidity: 58,
                            wind: "东风 3级",
                            icon: "sap-icon://weather-proofing"
                        },
                        beijing: {
                            cityName: "北京",
                            date: new Date().toLocaleDateString('zh-CN'),
                            condition: "小雨",
                            temperature: 18,
                            tempRange: "15°C - 21°C",
                            humidity: 78,
                            wind: "北风 4级",
                            icon: "sap-icon://rain"
                        }
                    };
                    
                    if (weatherData[cityKey]) {
                        resolve(weatherData[cityKey]);
                    } else {
                        reject(new Error("城市数据不存在"));
                    }
                }, 1000);
            });
        },
        
        // 如果要集成真实的墨迹天气API，可以使用以下方法
        _callRealWeatherAPI: function(cityKey) {
            // 注意：需要申请墨迹天气API密钥
            var apiKey = "YOUR_API_KEY"; // 替换为真实的API密钥
            var cityMap = {
                chengdu: "成都",
                shanghai: "上海", 
                beijing: "北京"
            };
            
            return new Promise(function(resolve, reject) {
                jQuery.ajax({
                    url: "https://api.moji.com/weather/current", // 墨迹天气API端点
                    method: "GET",
                    data: {
                        city: cityMap[cityKey],
                        key: apiKey
                    },
                    success: function(data) {
                        // 处理API响应数据
                        var weatherData = {
                            cityName: data.city,
                            date: new Date().toLocaleDateString('zh-CN'),
                            condition: data.condition,
                            temperature: data.temperature,
                            tempRange: data.tempMin + "°C - " + data.tempMax + "°C",
                            humidity: data.humidity,
                            wind: data.wind,
                            icon: this._getWeatherIcon(data.condition)
                        };
                        resolve(weatherData);
                    }.bind(this),
                    error: function(xhr, status, error) {
                        reject(new Error("API调用失败: " + error));
                    }
                });
            }.bind(this));
        },
        
        _getWeatherIcon: function(condition) {
            var iconMap = {
                "晴": "sap-icon://weather-proofing",
                "多云": "sap-icon://cloud",
                "阴": "sap-icon://cloud",
                "小雨": "sap-icon://rain",
                "中雨": "sap-icon://rain",
                "大雨": "sap-icon://rain",
                "雪": "sap-icon://snow"
            };
            return iconMap[condition] || "sap-icon://cloud";
        }
    });
});