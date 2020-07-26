import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
  // 与vue项目中配置相同，可自行配置
import api from './api/index.js'
Vue.prototype.$request = api 
Vue.config.productionTip = false;
import store from './store'

App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
store.commit('login')
app.$mount()