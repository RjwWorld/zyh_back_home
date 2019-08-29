/* 
    动态添加菜单
*/

import { toMenu } from '@/store/routerMenu/converRouter'

const addMenu = {
    state: {
        menuList: []
    },
    mutations: {
        add_Menu(state, params) {
            state.menuList = toMenu(params);
        }
    },
    actions: {
        add_Menu({ commit }, params) {
            commit('add_Menu', params)
        }
    }
}

export default addMenu