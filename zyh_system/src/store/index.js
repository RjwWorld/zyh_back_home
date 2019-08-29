import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules
})

//刷新加载的方法
const refresh = function() {
    //页面刷新重新加载路由
    store.dispatch('addRouter_Fresh');
}
refresh();


export default store