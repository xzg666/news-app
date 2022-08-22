import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		historyList: uni.getStorageSync('_history') ||[],
		userinfo:uni.getStorageSync('_userinfo') || {}
		
	},
	mutations:{
		SET_HISTORY_LIST(state,history){
			state.historyList = history
		},
		CLEAR_HISTORY(state,history){
			state.historyList = []
		},
		SET_USER_INFO(state,userinfo){
			state.userinfo = userinfo
		},
	},
	actions:{
		set_history({commit,state},history){
			let list = state.historyList
			list.unshift(history)
			uni.setStorageSync('_history',list)
			commit('SET_HISTORY_LIST',list)
		},
		clearHistory({commit}){
			uni.removeStorageSync('_history')
			commit('CLEAR_HISTORY')
		},
		set_userinfo({commit,state},userinfo){
			uni.setStorageSync('_userinfo',userinfo)
			commit('SET_USER_INFO',userinfo)
		},
	}
})

export default store