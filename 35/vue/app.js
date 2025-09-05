// 创建一个新的 Vue 实例
new Vue({
  // 挂载到 id 为 app 的 DOM 元素上
  el: '#app',
  // 定义数据
  data: {
    selectedCity: '成都',
    showModal: false,
    // 城市代号映射
    cityCodes: {
      '成都': '510100',
      '重庆': '310000',
      '上海': '500000'
    },
    // 存储天气预报数据
    forecastData: []
  },
  // 定义方法
  methods: {
    showDialog: function() {
      this.showModal = true;
      
      // Get the city code for the selected city
      const cityCode = this.cityCodes[this.selectedCity];
      
      // Construct the API URL with the selected city code
      const apiUrl = `https://restapi.amap.com/v3/weather/weatherInfo?key=34792da3630d1cacb9ace09a6bd659df&city=${cityCode}&extensions=all`;
      
      // Send HTTP request to the weather API
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // Extract forecasts data and store in Vue instance
          if (data.forecasts && data.forecasts[0] && data.forecasts[0].casts) {
            this.forecastData = data.forecasts[0].casts;
          } else {
            this.forecastData = [];
          }
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
          this.forecastData = [];
        });
    },
    closeDialog: function() {
      this.showModal = false;
    }
  }
});