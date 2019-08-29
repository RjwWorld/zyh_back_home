import { strCode } from '@/files/js/strBase64'

//用户信息
let userInformation = {};
//用户角色--权限
let roles = "";
//token
let token = "";
//用户ip
let ip = window.location.host == 'localhost:8080' ? 'http://t.zyh0903.com/' : 'http://' + window.location.host + '/'

try {
    //用户信息
    if (sessionStorage.userInformation) {
        userInformation = JSON.parse(sessionStorage.userInformation)
    }
    //用户角色--权限
    if (sessionStorage.roles) {
        // console.log(strCode(sessionStorage.roles))
        roles = strCode(sessionStorage.roles)
    }
    //用户角色--权限
    if (sessionStorage.token) {
        token = JSON.parse(sessionStorage.token)
    }
} catch (e) {}


export default {
    userInformation,
    roles,
    token,
    ip
}