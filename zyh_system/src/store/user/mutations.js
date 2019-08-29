import { base64Code } from '@/files/js/strBase64'

export default {
    //用户信息
    getUserInfo(state, params) {
        state.userInformation = params;
        try {
            sessionStorage.userInformation = JSON.stringify(state.userInformation)
        } catch (e) {}
    },
    //用户角色--权限
    getRoles(state, params) {
        state.roles = params;
        try {
            // console.log(base64Code(JSON.stringify(state.roles)))
            sessionStorage.roles = base64Code(state.roles)
        } catch (e) {}
    },
    //身份令牌--token
    getToken(state, params) {
        state.token = params;
        try {
            sessionStorage.token = JSON.stringify(state.token)
        } catch (e) {}
    }
}