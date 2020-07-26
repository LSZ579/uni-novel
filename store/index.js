import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/index.js'
Vue.prototype.$login = api 
Vue.use(Vuex)

const state={
	loginStatus:true
}
const mutations={
	login(state){
		let token=uni.getStorageSync('token')
		if(token){
			api('/token/verify',{token:token},'post').then(res=>{	
				if(res.isValid==false){
					 state.loginStatus=false
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}
				else{
					console.log(res)
					state.loginStatus=true
				}
			})
		}
	}
}
const getters={
	loginStatus:state=>{
		return state
	}
}
const store=new Vuex.Store({
	state,
	mutations,
	getters
})

export default store