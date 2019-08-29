import { routerComponents } from './routerComponents'

export const routerList = [{
        path: '/index',
        name: 'index',
        meta: {
            roles: ['king', 'admin'],
            title: '首页',
            icon: 'el-icon-menu'
        },
        component: routerComponents.index
    }, {
        path: '/user',
        name: 'user',
        redirect: '/userList',
        meta: {
            roles: ['king', 'admin'],
            title: '用户管理',
            icon: 'el-icon-cc-yonghuguanli'
        },
        component: routerComponents.user,
        children: [{
            path: '/userList',
            name: 'userList',
            meta: {
                roles: ['admin'],
                title: '用户列表'
            },
            component: routerComponents.userList,
        }, {
            path: '/systemUserList',
            name: 'systemUserList',
            meta: {
                roles: ['admin'],
                title: '后台用户列表'
            },
            component: routerComponents.systemUserList,
        }]
    }, {
        path: '/project',
        name: 'project',
        redirect: '/projectList',
        meta: {
            roles: ['king', 'admin'],
            title: '项目管理',
            icon: 'el-icon-tickets'
        },
        component: routerComponents.project,
        children: [
            // {
            //     path: '/publishDemand',
            //     name: 'publishDemand',
            //     meta: {
            //         roles: ['admin'],
            //         title: '发布需求'
            //     },
            //     component: routerComponents.publishDemand,
            // },

            {
                path: '/projectShares',
                name: 'projectShares',
                meta: {
                    roles: ['admin'],
                    title: '项目股权'
                },
                component: routerComponents.projectShares,
            },
            {
                path: '/bulletin',
                name: 'bulletin',
                meta: {
                    roles: ['admin'],
                    title: '新闻公告'
                },
                component: routerComponents.bulletin,
            }, {
                path: '/assetsList',
                name: 'assetsList',
                meta: {
                    roles: ['admin'],
                    title: '资产'
                },
                component: routerComponents.assetsList,
            }, {
                path: '/landList',
                name: 'landList',
                meta: {
                    roles: ['admin'],
                    title: '土地'
                },
                component: routerComponents.landList,
            },
            {
                path: '/invest',
                name: 'invest',
                meta: {
                    roles: ['admin'],
                    title: '投资'
                },
                component: routerComponents.invest,
            },
            {
                path: '/parkFather',
                name: 'parkFather',
                meta: {
                    roles: ['admin'],
                    title: '园区'
                },
                component: routerComponents.parkFather,
                children: [{
                    path: '/industrialPark',
                    name: 'industrialPark',
                    meta: {
                        roles: ['admin'],
                        title: '工业园区'
                    },
                    component: routerComponents.industrialPark
                }, {
                    path: '/parkSurvey',
                    name: 'parkSurvey',
                    meta: {
                        roles: ['admin'],
                        title: '园区概况'
                    },
                    component: routerComponents.parkSurvey
                }]
            },
            {
                path: '/qualificationList',
                name: 'qualificationList',
                meta: {
                    roles: ['admin'],
                    title: '资质'
                },
                component: routerComponents.qualificationList,
            },

            {
                path: '/enterpriseData',
                name: 'enterpriseData',
                meta: {
                    roles: ['king', 'admin'],
                    title: '融资',
                    icon: 'el-icon-cc-qiyezhuangtai'
                },
                component: routerComponents.enterpriseData,
                children: [{
                        path: '/enterpriseList',
                        name: 'enterpriseList',
                        meta: {
                            roles: ['admin'],
                            title: '企业列表'
                        },
                        component: routerComponents.enterpriseList,
                    }, {
                        path: '/baseState',
                        name: 'baseState',
                        meta: {
                            roles: ['admin'],
                            title: '基本情况'
                        },
                        component: routerComponents.baseState,
                    },
                    // {
                    //     path: '/team',
                    //     name: 'team',
                    //     meta: {
                    //         roles: ['admin'],
                    //         title: '团队',

                    //     },
                    //     component: routerComponents.team,
                    // },
                    // {
                    //     path: '/market',
                    //     name: 'market',
                    //     meta: {
                    //         roles: ['admin'],
                    //         title: '市场',
                    //     },
                    //     component: routerComponents.market,
                    // },
                    // {
                    //     path: '/technology',
                    //     name: 'technology',
                    //     meta: {
                    //         roles: ['admin'],
                    //         title: '技术'
                    //     },
                    //     component: routerComponents.technology,
                    // }, {
                    //     path: '/financialState',
                    //     name: 'financialState',
                    //     meta: {
                    //         roles: ['admin'],
                    //         title: '财务情况'
                    //     },
                    //     component: routerComponents.financialState,
                    // },
                    // {
                    //     path: '/capitalConstitute',
                    //     name: 'capitalConstitute',
                    //     meta: {
                    //         roles: ['admin'],
                    //         title: '资金构成'
                    //     },
                    //     component: routerComponents.capitalConstitute,
                    // },
                    //  {
                    //     path: '/businessModel',
                    //     name: 'businessModel',
                    //     meta: {
                    //         roles: ['admin'],
                    //         title: '商业模式'
                    //     },
                    //     component: routerComponents.businessModel,
                    // }
                ]
            },
            // {
            //     path: '/projectList',
            //     name: 'projectList',
            //     meta: {
            //         roles: ['admin'],
            //         title: '项目列表'
            //     },
            //     component: routerComponents.projectList,
            // },
            {
                path: '/demandList',
                name: 'demandList',
                meta: {
                    roles: ['admin,king'],
                    title: '需求列表'
                },
                component: routerComponents.demandList,
            },
            // {
            //     path: '/publishProject',
            //     name: 'publishProject',
            //     meta: {
            //         roles: ['admin'],
            //         title: '发布项目'
            //     },
            //     component: routerComponents.publishProject,
            // },

            {
                path: '/auction',
                name: 'auction',
                meta: {
                    roles: ['king', 'admin'],
                    title: '招拍挂',
                },
                component: routerComponents.auction
            },
        ]
    },
    {
        path: '/distribution',
        name: 'distribution',
        meta: {
            roles: ['king', 'admin'],
            title: '分销',
            icon: 'el-icon-mobile-phone'
        },
        component: routerComponents.distribution,
        children: [{
            path: '/distributionlist',
            name: 'distributionlist',
            meta: {
                roles: ['admin'],
                title: '邀请好友'
            },
            component: routerComponents.distributionlist,
        }, ]
    },
    {
        path: '/advertise',
        name: 'advertise',
        meta: {
            roles: ['king', 'admin'],
            title: '广告管理',
            icon: 'el-icon-cc-guanggao'
        },
        component: routerComponents.advertise,
    },
    {
        path: '/msgPush',
        name: 'msgPush',
        meta: {
            roles: ['king', 'admin'],
            title: '消息推送',
            icon: 'el-icon-cc-xiaoxi'
        },
        component: routerComponents.msgPush
    }, {
        path: '/comments',
        name: 'comments',
        meta: {
            roles: ['king', 'admin'],
            title: '评论管理',
            icon: 'el-icon-cc-pinglun',
        },
        component: routerComponents.comments
    },
    {
        path: '/inviteRewardList',
        name: 'inviteRewardList',
        meta: {
            roles: ['king', 'admin'],
            title: '邀请奖励',
            icon: 'el-icon-bell',
        },
        component: routerComponents.inviteRewardList,
    },
    {
        path: '/feedback',
        name: 'feedback',
        meta: {
            roles: ['king', 'admin'],
            title: '意见反馈',
            icon: 'el-icon-edit-outline',
        },
        component: routerComponents.feedback,
    },
    {
      path: '/landResource',
      name: 'landResource',
      meta: {
        roles: ['king', 'admin'],
        title: '土地资源',
        icon: 'el-icon-menu',
      },
      component: routerComponents.landResource,
    },
]
