//线上
// let ow = 'ow/admin'

//测试
let ow = '/ow'

export const interfaceObj = {
    upload: ow + '/comm/file/upload', //上传图片

    loginByPwd: ow + '/adminLogin/loginByPwd', //登录
    logout: ow + '/adminLogin/logout', //退出登录

    countAll: ow + '/total/countAll', //获取图表数据

    userFilter: ow + '/userMange/userFilter', //用户列表
    userManageDtl: ow + '/userMange/userManageDtl', //用户详情
    userDelete: ow + '/userMange/userDelete', //删除用户
    updateUser: ow + '/userMange/updateUser', //修改用户信息
    individualAuth: ow + '/userMange/individualAuth', //个人认证
    bizAuth: ow + '/userMange/bizAuth', //企业认证
    FAAuth: ow + '/userMange/FAAuth', //FA认证


    pubProjectInit: ow + '/projectManage/pubProjectInit', //项目初始化数据
    domainV2Init: ow + '/projectManage/domainV2Init', //探探版领域初始化
    publishProject: ow + '/projectManage/publishProject', //发布项目--老
    publishProjectA: ow + '/projectManage/publishProjectA', //发布项目A --新
    publishProjectB: ow + '/projectManage/publishProjectB', //发布项目B --新
    publishProjectC: ow + '/projectManage/publishProjectC', //发布项目C --新
    projectList: ow + '/projectManage/projectList', //项目列表
    projectStatus: ow + '/projectManage/projectStatus', //修改项目状态
    getProjectDtl: ow + '/projectManage/getProjectDtl', //项目详情  --老
    projectDtlAppend: ow + '/projectManage/projectDtlAppend', //项目详情 --新
    updateProject: ow + '/projectManage/updateProject', //修改项目 --老
    modifyProjectA: ow + '/projectManage/modifyProjectA', //修改项目A --新
    modifyProjectB: ow + '/projectManage/modifyProjectB', //修改项目B --新
    modifyProjectC: ow + '/projectManage/modifyProjectC', //修改项目C --新
    deleteProject: ow + '/projectManage/deleteProject', //删除项目

    getList: ow + '/invite/getList', //邀请奖励
    disReward: ow + '/invite/disReward', //发放奖励

    publishRequirement: ow + '/projectManage/publishRequirement', //发布需求
    updateRequirement: ow + '/projectManage/updateRequirement', //修改需求

    announcement: ow + '/announcement/list', //新闻公告列表
    bulletinStatus: ow + '/announcement/projectStatus', //上架下架
    bulletindelById: ow + '/announcement/delById', //删除
    bulletininsert: ow + '/announcement/insert', //添加
    bulletingetById: ow + '/announcement/getById', //查看
    bulletinmodifyById: ow + '/announcement/modifyById', //确定编辑

    bannerList: ow + '/bannerManage/bannerList', //广告管理
    bannerStatus: ow + '/bannerManage/bannerStatus', //修改广告状态
    deleteBanner: ow + '/bannerManage/deleteBanner', //删除背景
    getBannerDtl: ow + '/bannerManage/getBannerDtl', //获取广告详情
    updateBanner: ow + '/bannerManage/updateBanner', //编辑广告
    publishBanner: ow + '/bannerManage/publishBanner', //添加广告

    //分销
    invitegetList: ow + '/invite/invitationBonusSharing', //列表接口

    //企业参数
    basicAll: ow + '/firm/getAll/basicAll', //企业列表
    getDtl: ow + '/firm/getAll/getDtl', //企业详情
    modify: ow + '/firm/add/modify', //修改企业详情
    basic: ow + '/firm/add/basic', //基本信息
    team: ow + '/firm/add/team', //团队
    publishMarket: ow + '/firm/add/publishMarket', //市场
    publishTechnology: ow + '/firm/add/publishTechnology', //技术
    publishFinancial: ow + '/firm/add/publishFinancial', //财务情况
    capitalComposition: ow + '/firm/add/capitalComposition', //资金构成
    publishBizModel: ow + '/firm/add/publishBizModel', //商业模式
    delB: ow + '/firm/getAll/delById', //删除

    //评论管理
    projectCommList: ow + '/comment/projectCommList', //项目评论列表
    modifyCommentStatus: ow + '/comment/modifyCommentStatus', //开启评论和关闭评论
    commentList: ow + '/comment/commentList', //单个项目评论列表
    delComment: ow + '/comment/delComment', //删除评论

    //消息推送
    list: ow + '/message/list', //消息推送列表
    insert: ow + '/message/insert', //添加消息
    getById: ow + '/message/getById', //消息详情
    msgModify: ow + '/message/modify', //消息修改
    delById: ow + '/message/delById', //删除
    sendMessage: ow + '/message/sendMessage', //推送消息

    //招拍挂
    aucList: ow + '/signsHang/list', //招拍挂列表
    aucInsert: ow + '/signsHang/insert', //招拍挂添加
    aucDelById: ow + '/signsHang/delById', //删除招拍挂
    aucGetById: ow + '/signsHang/getById', //获取招拍挂信息
    aucModify: ow + '/signsHang/modify', //修改招拍挂

    //投资
    delCapitalSide: ow + '/capitalSide/delById', //投资删除按钮
    getIdCapitalSide: ow + '/capitalSide/getById', //资本方详情
    insertCapitalSide: ow + '/capitalSide/insert', //插入资本方
    updataCapitalSide: ow + '/capitalSide/modifyById', //修改资本方
    listCapitalSide: ow + '/capitalSide/projectList', //资本方列表
    //园区
    parkList: ow + '/industrialPark/parkList', //园区列表
    getIdPark: ow + '/industrialPark/getById', //查看
    delPark: ow + '/industrialPark/delById', //删除
    updataPark: ow + '/industrialPark/modifyPark', //修改
    insertPark: ow + '/industrialPark/insertPark', //插入园区

    //园区概况
    parkSurveyList: ow + '/industrialPark/briefParkList', //园区概况列表
    getIdParkSurvey: ow + '/industrialPark/getBriefById', //工业园区概况详情
    insertSurvey: ow + '/industrialPark/insertBriefPark', //插入工业园区概况
    updataSurvey: ow + '/industrialPark/modifyBriefPark', //修改工业园区概况

    //资质模块一
    qualificationList: ow + '/callRecord/callRecordList', //资质买卖回访列表
    delList: ow + '/callRecord/delById', //删除
    getByList: ow + '/callRecord/getById', //资质买卖回访详情
    updateCallList: ow + '/callRecord/updateCallRecord', //补充资质买卖回访详情
    updateList: ow + '/callRecord/updateStatus', //修改资质回访状态

    //资质模块二
    qualificationTwo: ow + '/qualification/qualificationList', //模块二列表
    modifyQualification: ow + '/qualification/modifyQualification', //修改
    insertQualification: ow + '/qualification/insertQualification', //插入资质
    getByTwo: ow + '/qualification/getById', //详情
    delTwo: ow + '/qualification/delById', //删除

    //建议反馈
    feedbacklist: ow + '/suggestion/list', //初始数据
    feedbackgetById: ow + '/suggestion/getById', //查询

    //土地资源
    landAllDtl: ow + '/gov/landAll/dtl',//详情
    landAllList: ow + '/gov/landAll/list',//列表
    landAllAdd: ow + '/gov/landAll/add',//添加
    landAllDel: ow + '/gov/landAll/deleteById',//删除
}
