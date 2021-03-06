import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: 'newsList'
        }, {
            path: "/Login",
            name: 'login',
            component: Login
        },
        {
            path: '/404',
            component: resolve => require(['../components/common/404'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }, {
            path: '/home',
            name: 'home',
            component: resolve => require(["@/components/home/home"], resolve),
            children: [{
                    path: '/newsList',
                    name: 'newsList',
                    meta: {
                        title: '最新资讯'
                    },
                    component: resolve => require(["@/components/news/newsList"], resolve)
                },
                //  {
                //     path: '/Companynews',
                //     name: 'Companynews',
                //     meta: {
                //         title: '公司新闻'
                //     },
                //     component: resolve => require(["@/components/news/Companynews"], resolve),
                // },
                {
                    path: "/businesssector",
                    name: "businesssector",
                    meta: {
                        title: '业务板块'
                    },
                    component: resolve => require(["@/components/businesssector/businesssector"], resolve)
                },
                {
                    path: "/Staffpresence",
                    name: "Staffpresence",
                    meta: {
                        title: '员工风采'
                    },
                    component: resolve => require(["@/components/Staffpresence/Staffpresence"], resolve)
                },
                // {
                //     path: "/add",
                //     name: "add",
                //     meta: {
                //         title: '问卷调查'
                //     },
                //     component: resolve => require(["@/components/add/add"], resolve)
                // },
                // {
                //   path: "/queryForm",
                //   name: "queryForm",
                //   meta: {
                //     title: '问卷调查查询'
                //   },
                //   component: resolve => require(["@/components/add/queryForm"], resolve)
                // },
            ]
        }
    ],
    mode: 'history',
    base: '/admin/',
})
export default router
