export default {
    //用户信息
    getUserInfo({ commit }, params) {
        commit('getUserInfo', params)
    },
    //用户角色--权限
    getRoles({ commit }, params) {
        commit('getRoles', params)
    },
    //身份标识--token
    getToken({ commit }, params) {
        commit('getToken', params)
    }
}