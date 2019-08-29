import { axiosRequest } from './axios'
import { interfaceObj } from './configUrl'


//上传图片
export function upload(obj) {
    return axiosRequest(interfaceObj.upload, obj)
}

//获取图表数据
export function countAll(obj) {
    return axiosRequest(interfaceObj.countAll, obj)
}

//登录
export function loginByPwd(obj) {
    return axiosRequest(interfaceObj.loginByPwd, obj)
}

//退出登录
export function logout(obj) {
    return axiosRequest(interfaceObj.logout, obj)
}

//用户列表
export function userFilter(obj) {
    return axiosRequest(interfaceObj.userFilter, obj)
}

//用户详情
export function userManageDtl(obj) {
    return axiosRequest(interfaceObj.userManageDtl, obj)
}

//删除用户
export function userDelete(obj) {
    return axiosRequest(interfaceObj.userDelete, obj)
}

//修改用户信息
export function updateUser(obj) {
    return axiosRequest(interfaceObj.updateUser, obj)
}

//个人认证
export function individualAuth(obj) {
    return axiosRequest(interfaceObj.individualAuth, obj)
}

//企业认证
export function bizAuth(obj) {
    return axiosRequest(interfaceObj.bizAuth, obj)
}

//FA认证
export function FAAuth(obj) {
    return axiosRequest(interfaceObj.FAAuth, obj)
}

//项目初始化数据
export function pubProjectInit(obj) {
    return axiosRequest(interfaceObj.pubProjectInit, obj)
}

//探探版领域初始化数据
export function domainV2Init(obj) {
    return axiosRequest(interfaceObj.domainV2Init, obj)
}

//发布项目--老
export function publishProject(obj) {
    return axiosRequest(interfaceObj.publishProject, obj)
}

//发布项目--A新
export function publishProjectA(obj) {
    return axiosRequest(interfaceObj.publishProjectA, obj)
}

//发布项目--B新
export function publishProjectB(obj) {
    return axiosRequest(interfaceObj.publishProjectB, obj)
}

//发布项目--C新
export function publishProjectC(obj) {
    return axiosRequest(interfaceObj.publishProjectC, obj)
}

//项目、需求列表
export function projectList(obj) {
    return axiosRequest(interfaceObj.projectList, obj)
}

//修改项目状态
export function projectStatus(obj) {
    return axiosRequest(interfaceObj.projectStatus, obj)
}

//获取项目详情 --老
export function getProjectDtl(obj) {
    return axiosRequest(interfaceObj.getProjectDtl, obj)
}

//获取项目详情 --新
export function projectDtlAppend(obj) {
    return axiosRequest(interfaceObj.projectDtlAppend, obj)
}

//修改项目
export function updateProject(obj) {
    return axiosRequest(interfaceObj.updateProject, obj)
}

//修改项目 --新A
export function modifyProjectA(obj) {
    return axiosRequest(interfaceObj.modifyProjectA, obj)
}

//修改项目 --新B
export function modifyProjectB(obj) {
    return axiosRequest(interfaceObj.modifyProjectB, obj)
}

//修改项目 --新C
export function modifyProjectC(obj) {
    return axiosRequest(interfaceObj.modifyProjectC, obj)
}

//删除项目
export function deleteProject(obj) {
    return axiosRequest(interfaceObj.deleteProject, obj)
}

//邀请奖励
export function getList(obj) {
    return axiosRequest(interfaceObj.getList, obj)
}

//邀请奖励
export function disReward(obj) {
    return axiosRequest(interfaceObj.disReward, obj)
}

//发布需求
export function publishRequirement(obj) {
    return axiosRequest(interfaceObj.publishRequirement, obj)
}

//修改需求
export function updateRequirement(obj) {
    return axiosRequest(interfaceObj.updateRequirement, obj)
}

//广告管理
export function bannerList(obj) {
    return axiosRequest(interfaceObj.bannerList, obj)
}

//修改广告状态
export function bannerStatus(obj) {
    return axiosRequest(interfaceObj.bannerStatus, obj)
}

//删除广告状态
export function deleteBanner(obj) {
    return axiosRequest(interfaceObj.deleteBanner, obj)
}

//获取广告详情
export function getBannerDtl(obj) {
    return axiosRequest(interfaceObj.getBannerDtl, obj)
}

//编辑广告
export function updateBanner(obj) {
    return axiosRequest(interfaceObj.updateBanner, obj)
}

//添加广告
export function publishBanner(obj) {
    return axiosRequest(interfaceObj.publishBanner, obj)
}

//企业列表
export function basicAll(obj) {
    return axiosRequest(interfaceObj.basicAll, obj)
}

//企业详情
export function getDtl(obj) {
    return axiosRequest(interfaceObj.getDtl, obj)
}

//修改企业详情
export function modify(obj) {
    return axiosRequest(interfaceObj.modify, obj)
}
export function delB(obj) {
    return axiosRequest(interfaceObj.delB, obj)
}

//基本信息
export function basic(obj) {
    return axiosRequest(interfaceObj.basic, obj)
}

//团队
export function team(obj) {
    return axiosRequest(interfaceObj.team, obj)
}

//市场
export function publishMarket(obj) {
    return axiosRequest(interfaceObj.publishMarket, obj)
}

//技术
export function publishTechnology(obj) {
    return axiosRequest(interfaceObj.publishTechnology, obj)
}

//财务情况
export function publishFinancial(obj) {
    return axiosRequest(interfaceObj.publishFinancial, obj)
}

//资金构成
export function capitalComposition(obj) {
    return axiosRequest(interfaceObj.capitalComposition, obj)
}

//商业模式
export function publishBizModel(obj) {
    return axiosRequest(interfaceObj.publishBizModel, obj)
}

//项目评论列表
export function projectCommList(obj) {
    return axiosRequest(interfaceObj.projectCommList, obj)
}

//开启评论和关闭评论
export function modifyCommentStatus(obj) {
    return axiosRequest(interfaceObj.modifyCommentStatus, obj)
}

//单个项目评论列表
export function commentList(obj) {
    return axiosRequest(interfaceObj.commentList, obj)
}

//删除评论
export function delComment(obj) {
    return axiosRequest(interfaceObj.delComment, obj)
}

//消息推送列表
export function list(obj) {
    return axiosRequest(interfaceObj.list, obj)
}

//添加消息
export function insert(obj) {
    return axiosRequest(interfaceObj.insert, obj)
}

//消息详情
export function getById(obj) {
    return axiosRequest(interfaceObj.getById, obj)
}

//编辑消息
export function msgModify(obj) {
    return axiosRequest(interfaceObj.msgModify, obj)
}

//删除消息
export function delById(obj) {
    return axiosRequest(interfaceObj.delById, obj)
}

//推送消息
export function sendMessage(obj) {
    return axiosRequest(interfaceObj.sendMessage, obj)
}

//招拍挂列表
export function aucList(obj) {
    return axiosRequest(interfaceObj.aucList, obj)
}

//招拍挂添加
export function aucInsert(obj) {
    return axiosRequest(interfaceObj.aucInsert, obj)
}

//招拍挂删除
export function aucDelById(obj) {
    return axiosRequest(interfaceObj.aucDelById, obj)
}

//招拍挂信息
export function aucGetById(obj) {
    return axiosRequest(interfaceObj.aucGetById, obj)
}

//修改招拍挂信息
export function aucModify(obj) {
    return axiosRequest(interfaceObj.aucModify, obj)
}

//投资
//投资删除按钮
export function delCapitalSide(obj) {
    return axiosRequest(interfaceObj.delCapitalSide, obj)
}

//投资方资本详情
export function getIdCapitalSide(obj) {
    return axiosRequest(interfaceObj.getIdCapitalSide, obj)
}

//插入资本方
export function insertCapitalSide(obj) {
    return axiosRequest(interfaceObj.insertCapitalSide, obj)
}

//修改资本方
export function updataCapitalSide(obj) {
    return axiosRequest(interfaceObj.updataCapitalSide, obj)
}

//资本方列表
export function listCapitalSide(obj) {
    return axiosRequest(interfaceObj.listCapitalSide, obj)
}

//管理端-项目状态修改
export function projectUpdata(obj) {
    return axiosRequest(interfaceObj.projectUpdata, obj)
}


//园区
//获取列表数据
export function parkList(obj) {
    return axiosRequest(interfaceObj.parkList, obj)
}
export function getIdPark(obj) {
    return axiosRequest(interfaceObj.getIdPark, obj)
}

export function delPark(obj) {
    return axiosRequest(interfaceObj.delPark, obj)
}
export function updataPark(obj) {
    return axiosRequest(interfaceObj.updataPark, obj)
}

export function insertPark(obj) {
    return axiosRequest(interfaceObj.insertPark, obj)
}
//园区概况
export function parkSurveyList(obj) {
    return axiosRequest(interfaceObj.parkSurveyList, obj)
}
export function getIdParkSurvey(obj) {
    return axiosRequest(interfaceObj.getIdParkSurvey, obj)
}
export function insertSurvey(obj) {
    return axiosRequest(interfaceObj.insertSurvey, obj)
}
export function updataSurvey(obj) {
    return axiosRequest(interfaceObj.updataSurvey, obj)
}
//资质列表
export function qualificationList(obj) {
    return axiosRequest(interfaceObj.qualificationList, obj)
}
//资质删除
export function delList(obj) {
    return axiosRequest(interfaceObj.delList, obj)
}
//资质买卖回访详情
export function getByList(obj) {
    return axiosRequest(interfaceObj.getByList, obj)
}
//补充资质买卖回访详情
export function updateCallList(obj) {
    return axiosRequest(interfaceObj.updateCallList, obj)
}
//修改资质回访状态
export function updateList(obj) {
    return axiosRequest(interfaceObj.updateList, obj)
}
export function qualificationTwo(obj) {
    return axiosRequest(interfaceObj.qualificationTwo, obj)
}
export function modifyQualification(obj) {
    return axiosRequest(interfaceObj.modifyQualification, obj)
}
export function insertQualification(obj) {
    return axiosRequest(interfaceObj.insertQualification, obj)
}
export function getByTwo(obj) {
    return axiosRequest(interfaceObj.getByTwo, obj)
}
export function delTwo(obj) {
    return axiosRequest(interfaceObj.delTwo, obj)
}
//新闻公告列表
export function announcement(obj) {
    return axiosRequest(interfaceObj.announcement, obj)
}
export function bulletinStatus(obj) {
    return axiosRequest(interfaceObj.bulletinStatus, obj)
}
export function bulletindelById(obj) {
    return axiosRequest(interfaceObj.bulletindelById, obj)
}
export function bulletininsert(obj) {
    return axiosRequest(interfaceObj.bulletininsert, obj)
}
export function bulletingetById(obj) {
    return axiosRequest(interfaceObj.bulletingetById, obj)
}
export function bulletinmodifyById(obj) {
    return axiosRequest(interfaceObj.bulletinmodifyById, obj)
}
//分销数据列表
export function invitegetList(obj) {
    return axiosRequest(interfaceObj.invitegetList, obj)
}
//建议反馈
export function feedbacklist(obj) {
    return axiosRequest(interfaceObj.feedbacklist, obj)
}
export function feedbackgetById(obj) {
  return axiosRequest(interfaceObj.feedbackgetById, obj)
}
//土地资源
export function landAllDtl(obj) {
  return axiosRequest(interfaceObj.landAllDtl, obj)
}

export function landAllList(obj) {
  return axiosRequest(interfaceObj.landAllList, obj)
}
export function landAllAdd(obj) {
  return axiosRequest(interfaceObj.landAllAdd, obj)
}
export function landAllDel(obj) {
  return axiosRequest(interfaceObj.landAllDel, obj)
}
