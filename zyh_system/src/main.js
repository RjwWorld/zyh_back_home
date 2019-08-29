// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import md5 from 'js-md5'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css'
import '@/files/css/reset.css'
import '@/files/css/iconfont.css'


Vue.config.productionTip = false
Vue.prototype.$md5 = md5
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
