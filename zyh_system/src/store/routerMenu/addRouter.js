/* 
    动态添加路由
*/
import { toRouter } from '@/store/routerMenu/converRouter'
import router from '@/router'

const addRouter = {
    state: {
        routerList: [],
        rootRouter: [],
    },
    mutations: {
        add_Router(state, params) {
            state.routerList = toRouter(params); //筛选出的路由
            state.rootRouter = [{
                path: '/',
                name: 'home', //不能加name属性,因为vue会警告重复添加路由(当登录过一个账号,在登录一次的时候)
                component: resolve => require(['@/components/Home/home'], resolve),
                children: state.routerList
            }];
            router.addRoutes(state.rootRouter)
        },
        addRouter_Fresh(state, params) {
            this.commit('add_Router', params)
        }
    },
    actions: {
        add_Router(store, params) {
            const { commit, dispatch, state, rootState } = store
            commit('add_Router', params)
            dispatch('add_Menu', state.routerList)
        },
        addRouter_Fresh(store, params) {
            const { commit, dispatch, state, rootState } = store
            commit('addRouter_Fresh', rootState.user.roles)
            dispatch('add_Menu', state.routerList)
        }
    }
}

export default addRouter