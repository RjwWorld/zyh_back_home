import { axiosRequest } from './axios'
import { interfaceObj } from './configUrl'

//最新资讯
export function latestNew(obj) {
    return axiosRequest(interfaceObj.latestNew, obj)
}
//发布上架
export function modifyStatus(obj) {
    return axiosRequest(interfaceObj.modifyStatus, obj)
}
//删除
export function delById(obj) {
    return axiosRequest(interfaceObj.delById, obj)
}
//查看
export function dtl(obj) {
    return axiosRequest(interfaceObj.dtl, obj)
}
//编辑
export function modify(obj) {
    return axiosRequest(interfaceObj.modify, obj)
}
//添加发布
export function add(obj) {
    return axiosRequest(interfaceObj.add, obj)
}
//公司新闻
export function companyNews(obj) {
    return axiosRequest(interfaceObj.companyNews, obj)
}
//公司新闻查看
export function companydtl(obj) {
    return axiosRequest(interfaceObj.companydtl, obj)
}
//公司新闻添加发布
export function companyadd(obj) {
    return axiosRequest(interfaceObj.companyadd, obj)
}
//公司新闻编辑
export function companymodify(obj) {
    return axiosRequest(interfaceObj.companymodify, obj)
}
//公司新闻删除
export function companydelById(obj) {
    return axiosRequest(interfaceObj.companydelById, obj)
}
//公司新闻发布和下架
export function companymodifyStatus(obj) {
    return axiosRequest(interfaceObj.companymodifyStatus, obj)
}
//业务板块数据
export function businesslist(obj) {
    return axiosRequest(interfaceObj.businesslist, obj)
}
//业务板块查看
export function businessdtl(obj) {
    return axiosRequest(interfaceObj.businessdtl, obj)
}
//业务板块添加发布
export function businessadd(obj) {
    return axiosRequest(interfaceObj.businessadd, obj)
}
//业务板块编辑
export function businessmodify(obj) {
    return axiosRequest(interfaceObj.businessmodify, obj)
}
//业务板块删除
export function businessdelById(obj) {
    return axiosRequest(interfaceObj.businessdelById, obj)
}
//业务板块发布和下架
export function businessmodifyStatus(obj) {
    return axiosRequest(interfaceObj.businessmodifyStatus, obj)
}
//业务板块图片
export function upload(obj) {
    return axiosRequest(interfaceObj.upload, obj)
}

//员工数据
export function stafflist(obj) {
    return axiosRequest(interfaceObj.stafflist, obj)
}
//员工查看
export function staffdtl(obj) {
    return axiosRequest(interfaceObj.staffdtl, obj)
}
//员工添加发布
export function staffadd(obj) {
    return axiosRequest(interfaceObj.staffadd, obj)
}
//员工编辑
export function staffmodify(obj) {
    return axiosRequest(interfaceObj.staffmodify, obj)
}
//员工删除
export function staffdelById(obj) {
    return axiosRequest(interfaceObj.staffdelById, obj)
}
//员工删除组图
export function staffdelImgById(obj) {
    return axiosRequest(interfaceObj.staffdelImgById, obj)
}
//员工数据发布和下架
export function staffmodifyStatus(obj) {
    return axiosRequest(interfaceObj.staffmodifyStatus, obj)
}
//登录
export function userLogin(obj) {
    return axiosRequest(interfaceObj.userLogin, obj)
}
//退出
export function out(obj) {
    return axiosRequest(interfaceObj.out, obj)
}

export function addlist(obj) {
    return axiosRequest(interfaceObj.addlist, obj)
}
export function query(obj) {
    return axiosRequest(interfaceObj.query, obj)
}
