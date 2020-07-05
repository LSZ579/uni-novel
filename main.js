import Vue from 'vue'
import App from './App'
  // 与vue项目中配置相同，可自行配置
import api from './api/index.js'
Vue.prototype.$request = api 
Vue.config.productionTip = false

;

App.mpType = 'app'

const app = new Vue({
    ...App
})

app.$mount()