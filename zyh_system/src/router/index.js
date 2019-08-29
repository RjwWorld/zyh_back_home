import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login/login'


Vue.use(VueRouter)

//公共路由

const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: 'index'
    }, {
        path: '/login',
        name: 'login',
        component: Login,
    }, {
        path: '/404',
        component: resolve => require(['../components/Common/404'], resolve)
    }, {
        path: '*',
        redirect: '/404'
    }],
    mode: 'history',
    base: '/admin/',
})

//全局路由守卫
router.beforeEach((to, from, next) => {
    var token = sessionStorage.getItem('token');
        //如果没登录,都导向登录页
  if (!token) {
        if (to.path !== '/login') {
            next({ path: '/login' })
        } else {
            next();
        }
    } else {
        next();
    }
})

export default router
