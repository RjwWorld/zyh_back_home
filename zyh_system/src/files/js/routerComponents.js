export const routerComponents = {
    //首页
    index: resolve => require(['@/components/Common/index'], resolve),
    //用户列表
    user: resolve => require(['@/components/User/user'], resolve),
    userList: resolve => require(['@/components/User/children/userList'], resolve),
    systemUserList: resolve => require(['@/components/User/children/systemUserList'], resolve),
    //项目管理
    project: resolve => require(['@/components/Project/project'], resolve),
    bulletin: resolve => require(['@/components/Project/children/bulletin'], resolve),
    landList: resolve => require(['@/components/Project/children/landList'], resolve),
    assetsList: resolve => require(['@/components/Project/children/assetsList'], resolve),
    projectShares: resolve => require(['@/components/Project/children/projectShares'], resolve),
    projectList: resolve => require(['@/components/Project/children/projectList'], resolve),
    demandList: resolve => require(['@/components/Project/children/demandList'], resolve),
    inviteRewardList: resolve => require(['@/components/Project/children/inviteRewardList'], resolve),
    publishProject: resolve => require(['@/components/Project/children/publishProject'], resolve),
    publishDemand: resolve => require(['@/components/Project/children/publishDemand'], resolve),
    qualificationList: resolve => require(['@/components/Project/children/qualificationList'], resolve),
    //分销
    distribution: resolve => require(['@/components/Distribution/distribution'], resolve),
    distributionlist: resolve => require(['@/components/Distribution/distributionlist'], resolve),
    //广告管理
    advertise: resolve => require(['@/components/Advertise/advertise'], resolve),
    //企业参数
    enterpriseData: resolve => require(['@/components/EnterpriseData/enterpriseData'], resolve),
    team: resolve => require(['@/components/EnterpriseData/children/team'], resolve),
    market: resolve => require(['@/components/EnterpriseData/children/market'], resolve),
    technology: resolve => require(['@/components/EnterpriseData/children/technology'], resolve),
    financialState: resolve => require(['@/components/EnterpriseData/children/financialState'], resolve),
    baseState: resolve => require(['@/components/EnterpriseData/children/baseState'], resolve),
    capitalConstitute: resolve => require(['@/components/EnterpriseData/children/capitalConstitute'], resolve),
    businessModel: resolve => require(['@/components/EnterpriseData/children/businessModel'], resolve),
    enterpriseList: resolve => require(['@/components/EnterpriseData/children/enterpriseList'], resolve),
    //消息推送
    msgPush: resolve => require(['@/components/MsgPush/msgPush'], resolve),
    //评论管理
    comments: resolve => require(['@/components/Comments/comments'], resolve),
    //招拍挂
    auction: resolve => require(['@/components/Auction/auction'], resolve),
    //投资
    invest: resolve => require(['@/components/invest/invest'], resolve),
    //园区
    parkFather: resolve => require(['@/components/industrialPark/parkFather'], resolve),
    industrialPark: resolve => require(['@/components/industrialPark/industrialPark'], resolve),
    parkSurvey: resolve => require(['@/components/industrialPark/parkSurvey'], resolve),
    //意见反馈
    feedback: resolve => require(['@/components/Feedback/feedback'], resolve),
    landResource: resolve => require(['@/components/landResources/landResource'], resolve)
}
