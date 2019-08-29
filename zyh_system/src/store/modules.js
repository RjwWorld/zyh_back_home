import addMenu_store from './routerMenu/addMenu' //菜单
import addRouter_store from './routerMenu/addRouter' //路由
import addUser_store from './user' //用户信息
import addTemporaryData_store from './temporaryData' //临时数据


export default {
    menu: addMenu_store,
    router: addRouter_store,
    user: addUser_store,
    data: addTemporaryData_store
}
