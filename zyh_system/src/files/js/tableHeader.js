const allTableHeader = {
    //分销邀请好友表头
    Invitefriends: [{
            prop: 'levelNo',
            label: '等级',
            width: '99'
        },
        {
            prop: 'nickName',
            label: '用户名',
            width: '99'
        },
        {
            prop: 'mblNo',
            label: '手机号码',
            width: '99'
        },
        {
            prop: 'proportion',
            label: '比例分成',
            width: '99'
        },
        {
            prop: 'levelNo,status',
            label: '操作',
            width: '99'
        }
    ],
    //项目列表表头
    projectHeader: [{
            prop: 'projectNo',
            label: '项目编号',
            width: '99'
        }, {
            prop: 'projectTypeName',
            label: '项目类别',
            width: '88'
        }, {
            prop: 'projectName',
            label: '项目名称',
            width: '100'
        },
        //   {
        //     prop: 'comName',
        //     label: '公司',
        //     width: '100'
        // },
        {
            prop: 'comProvince,comCity',
            label: '地址',
            width: '100',
        }, {
            prop: 'projectRequirementName',
            label: '项目需求',
            width: '88'
        }, {
            prop: 'startAmt',
            label: '总价(万元)',
            width: '100'
        }, {
            prop: 'linkMan',
            label: '联系人',
            width: '88'
        }, {
            prop: 'linkTel',
            label: '联系人手机号',
            width: '120'
        }, {
            prop: 'viewNum',
            label: '浏览量',
            width: '66'
        }, {
            prop: 'collectNum',
            label: '收藏量',
            width: '66'
        }, {
            prop: 'tagVOList',
            label: '标签',
            width: '200'
        }, {
            prop: 'status',
            label: '状态',
            width: '88'
        }, {
            prop: 'creTime',
            label: '创建时间',
            width: '100'
        }, {
            prop: 'project,status',
            label: '操作',
            width: '233'
        }
    ],
    bulletinHeader: [{
            prop: 'id',
            label: '编号',
            width: '99'
        },
        {
            prop: 'creTime',
            label: '发布时间',
            width: '99'
        },
        {
            prop: 'msg',
            label: '新闻内容',
            width: '233'
        },
        {
            prop: 'bulletinc,status',
            label: '状态',
            width: '99'
        },
        {
            prop: 'bulletin,status',
            label: '操作',
            width: '233'
        }
    ],
    //需求列表表头
    demandHeader: [{
            prop: 'projectNo',
            label: '需求编号',
            width: '99'
        }, {
            prop: 'projectName',
            label: '需求标题',
            width: '100'
        },
        //   {
        //     prop: 'comName',
        //     label: '公司',
        //     width: '100'
        // },
        {
            prop: 'comProvince,comCity',
            label: '地址',
            width: '100'
        }, {
            prop: 'startAmt',
            label: '总价(万元)',
            width: '100'
        }, {
            prop: 'linkMan',
            label: '联系人',
            width: '88'
        }, {
            prop: 'linkTel',
            label: '联系人手机号',
            width: '120'
        }, {
            prop: 'viewNum',
            label: '浏览量',
            width: '66'
        }, {
            prop: 'collectNum',
            label: '收藏量',
            width: '66'
        }, {
            prop: 'status',
            label: '状态',
            width: '88'
        }, {
            prop: 'creTime',
            label: '创建时间',
            width: '100'
        }, {
            prop: 'demand,status',
            label: '操作',
            width: '233'
        }
    ],

    //邀请列表表头
    inviteRewardHeader: [{
        prop: 'projectNo',
        label: '项目编号',
        width: '133'
    }, {
        prop: 'projectType',
        label: '项目类别',
        width: '88'
    }, {
        prop: 'projectName',
        label: '项目名称',
        width: '100'
    }, {
        prop: 'comName',
        label: '公司',
        width: '100'
    }, {
        prop: 'linkMan',
        label: '联系人',
        width: '66'
    }, {
        prop: 'linkTel',
        label: '联系人手机号',
        width: '120'
    }, {
        prop: 'inviterName',
        label: '邀请人',
        width: '66'
    }, {
        prop: 'inviterMbl',
        label: '邀请人手机号',
        width: '120'
    }, {
        prop: 'inviterAmt',
        label: '邀请人奖励金额',
        width: '120'
    }, {
        prop: 'accepterName',
        label: '受邀人',
        width: '66'
    }, {
        prop: 'accepterMbl',
        label: '受邀人手机号',
        width: '120'
    }, {
        prop: 'accepterAmt',
        label: '项目发布人奖励金额',
        width: '166'
    }, {
        prop: 'reward',
        label: '是否已奖励',
        width: '99'
    }, {
        prop: 'creTime',
        label: '创建时间',
        width: '99'
    }, {
        prop: 'inviteRewardHeader,reward',
        label: '操作',
        width: '188'
    }],

    //用户列表表头
    userListHeader: [{
            prop: 'id',
            label: '用户ID',
            width: '133'
        }, {
            prop: 'nickName',
            label: '昵称',
            width: '99'
        }, {
            prop: 'levelNo',
            label: '等级',
            width: '66'
        }, {
            prop: 'mblNo',
            label: '手机号',
            width: '133'
        }, {
            prop: 'company',
            label: '机构',
            width: '88'
        }, {
            prop: 'position',
            label: '职位',
            width: '99'
        },
        // {
        //     prop: 'mail',
        //     label: '邮箱',
        //     width: '133'
        // }, {
        //     prop: 'addrProvince,addrCity',
        //     label: '地址',
        //     width: '133'
        // },

        {
            prop: 'individualStatus',
            label: '个人认证',
            width: '88'
        }, {
            prop: 'bizStatus',
            label: '企业认证',
            width: '88'
        }, {
            prop: 'faStatus',
            label: 'FA认证',
            width: '88'
        },
        {
            prop: 'creTime',
            label: '认证日期',
            width: '88'
        },
        {
            prop: 'user,individualStatus,bizStatus',
            label: '操作',
            width: '233'
        }
    ],

    //广告位表头
    advertiseHeader: [{
        prop: 'typeName',
        label: '广告位',
        width: '133'
    }, {
        prop: 'id',
        label: '广告编号',
        width: '133'
    }, {
        prop: 'bannerName',
        label: '广告名',
        width: '133',
    }, {
        prop: 'partner',
        label: '合作方',
        width: '133',
    }, {
        prop: 'weight',
        label: '权重',
        width: '99',
    }, {
        prop: 'advertisec,status',
        label: '状态',
        width: '99',
    }, {
        prop: 'cre_time',
        label: '创建时间',
        width: '133',
    }, {
        prop: 'advertise,status',
        label: '操作',
        width: '233',
    }],

    //企业参数表头
    enterpriseHeader: [{
            prop: 'projectNo',
            label: '项目编号',
            width: '120'
        }, {
            prop: 'projectName',
            label: '项目名称',
            width: '99'
        }, {
            prop: 'operatingActive',
            label: '市场运营-活跃度',
            width: '120'
        }, {
            prop: 'userNumber',
            label: '市场运营-0-1-2-5-0',
            width: '140'
        }, {
            prop: 'phase',
            label: '市场运营-所处阶段',
            width: '130'
        }, {
            prop: 'companyName',
            label: '公司名称',
            width: '99'
        }, {
            prop: 'companyProvince,companyCity',
            label: '公司地址',
            width: '99'
        }, {
            prop: 'companyDetailedAddress',
            label: '详细地址',
            width: '99'
        }, {
            prop: 'individualShareholder',
            label: '自然人股东',
            width: '99'
        }, {
            prop: 'legalPersonHolding',
            label: '法人控股人',
            width: '99'
        },
        {
            prop: 'status',
            label: '状态',
            width: '88'
        }, {
            prop: 'registrationTime',
            label: '公司注册时间',
            width: '99'
        }, {
            prop: 'enterprise,naoTuImg,status',
            label: '操作',
            width: '233',
        }
    ],

    //评论列表表头
    commentsHeader: [{
        prop: 'projectNo',
        label: '项目编号',
        width: '99'
    }, {
        prop: 'projectTypeCode',
        label: '项目类别',
        width: '99'
    }, {
        prop: 'projectTypeName',
        label: '项目名称',
        width: '99'
    }, {
        prop: 'isComment',
        label: '评论状态',
        width: '99'
    }, {
        prop: 'commentSum',
        label: '总评论数',
        width: '99'
    }, {
        prop: 'isComment,commentSum',
        label: '操作',
        width: '99'
    }],

    msgPushHeader: [{
        prop: 'projectNo',
        label: '编号',
        width: '99'
    }, {
        prop: 'pushTitle',
        label: '项目名称',
        width: '99'
    }, {
        prop: 'acceptObject',
        label: '接收对象',
        width: '99'
    }, {
        prop: 'pushDetails',
        label: '消息内容',
        width: '99'
    }, {
        prop: 'creTime',
        label: '创建时间',
        width: '99'
    }, {
        prop: 'msgc,status',
        label: '状态',
        width: '99'
    }, {
        prop: 'msg,status',
        label: '操作',
        width: '99'
    }],

    //投资表头
    investHeader: [{
        prop: 'projectNo',
        label: '项目编号',
        width: '99'
    }, {
        prop: 'projectName',
        label: '项目名称',
        width: '99'
    }, {
        prop: 'investmentDirection',
        label: '投资方向',
        width: '99'
    }, {
        prop: 'comName',
        label: '公司',
        width: '99'
    }, {
        prop: 'comProvince,comCity',
        label: '地址',
        width: '100'
    }, {
        prop: 'remaindInvestment',
        label: '剩余投量',
        width: '99'
    }, {
        prop: 'yearInvestment',
        label: '预计年投资量',
        width: '120'
    }, {
        prop: 'linkMan',
        label: '联系人',
        width: '99'
    }, {
        prop: 'linkTel',
        label: '联系人手机号',
        width: '120'
    }, {
        prop: 'viewNum',
        label: '浏览量',
        width: '99'
    }, {
        prop: 'collectNum',
        label: '收藏量',
        width: '99'
    }, {
        prop: 'status',
        label: '状态',
        width: '99',
    }, {
        prop: 'creTime',
        label: '创建时间',
        width: '133',
    }, {
        prop: 'invest,status',
        label: '操作',
        width: '233',
    }],

    //招拍挂表头
    auctionHeader: [{
        prop: 'planUsePurpose',
        label: '规划用途',
        width: '99'
    }, {
        prop: 'title',
        label: '项目名称',
        width: '99'
    }, {
        prop: 'contactTel',
        label: '联系人电话号码',
        width: '99'
    }, {
        prop: 'transactionPositon',
        label: '交易地点',
        width: '99'
    }, {
        prop: 'province',
        label: '省份',
        width: '99'
    }, {
        prop: 'endEnrollTime',
        label: '结束报名时间',
        width: '99'
    }, {
        prop: 'auctionTime',
        label: '拍卖出让时间',
        width: '99'
    }, {
        prop: 'auctionc,status',
        label: '状态',
        width: '99'
    }, {
        prop: 'auction,status',
        label: '操作',
        width: '99'
    }],

    //园区表头
    industrialParkHeader: [{
        prop: 'projectNo',
        label: '项目编号',
        width: '99'
    }, {
        prop: 'projectName',
        label: '项目名称',
        width: '99'
    }, {
        prop: 'linkMan',
        label: '联系人',
        width: '99'
    }, {
        prop: 'linkTel',
        label: '联系人电话',
        width: '120'
    }, {
        prop: 'construction',
        label: '结构',
        width: '100'
    }, {
        prop: 'landAcreage',
        label: '土地面积（平方米）',
        width: '99'
    }, {
        prop: 'status',
        label: '状态',
        width: '99',
    }, {
        prop: 'creTime',
        label: '创建时间',
        width: '180',
    }, {
        prop: 'invest,status',
        label: '操作',
        width: '233',
    }],
    parkSurveyHeader: [{
        prop: 'projectNo',
        label: '项目编号',
        width: '99'
    }, {
        prop: 'projectName',
        label: '项目名称',
        width: '99'
    }, {
        prop: 'industryGuide',
        label: '产业导向',
        width: '99'
    }, {
        prop: 'creTime',
        label: '创建时间',
        width: '180',
    }, {
        prop: 'status',
        label: '状态',
        width: '99',
    }, {
        prop: 'invest,status',
        label: '操作',
        width: '233',
    }],

    //资质模块一表头
    qualificationHeader: [{
            prop: 'projectNo',
            label: '项目编号',
            width: '99'
        },
        {
            prop: 'projectName',
            label: '项目名称',
            width: '99'
        },
        {
            prop: 'qualificationType',
            label: '资质种类',
            width: '99'
        },
        {
            prop: 'linkMan',
            label: '联系人',
            width: '99'
        },
        {
            prop: 'linkTel',
            label: '联系人手机号',
            width: '99'
        },
        {
            prop: 'dockingMan',
            label: '对接人',
            width: '99'
        },
        {
            prop: 'qualificationc,status',
            label: '状态',
            width: '99'
        }, {
            prop: 'creTime',
            label: '创建时间',
            width: '99'
        }, {
            prop: 'qualification,status',
            label: '操作',
            width: '99'
        }
    ],

    //资质模块二表头
    qualificHeader: [{
            prop: 'projectNo',
            label: '项目编号',
            width: '99'
        },
        {
            prop: 'projectName',
            label: '项目名称',
            width: '99'
        },
        {
            prop: 'qualificationType',
            label: '资质种类',
            width: '99'
        },
        {
            prop: 'linkMan',
            label: '联系人',
            width: '99'
        },
        {
            prop: 'linkTel',
            label: '联系人手机号',
            width: '99'
        },
        {
            prop: 'dockingMan',
            label: '对接人',
            width: '99'
        },
        {
            prop: 'status',
            label: '状态',
            width: '99'
        }, {
            prop: 'creTime',
            label: '创建时间',
            width: '99'
        }, {
            prop: 'qualificationb,status',
            label: '操作',
            width: '99'
        }
    ],
    //建议表头
    feedbackheader: [{
            prop: 'nickName',
            label: '昵称',
            width: '99'
        },
        {
            prop: 'creTime',
            label: '时间',
            width: '99'
        },
        {
            prop: 'mblNo',
            label: '电话号码',
            width: '99'
        },
        {
            prop: 'msg',
            label: '内容',
            width: '99'
        },
        {
            prop: 'status',
            label: '操作',
            width: '99'
        }
    ],
    //土地资源
    landAllHeader: [{
      prop: 'landNo',
      label: '宗地编号',
      width: '99'
    },
      {
        prop: 'title',
        label: '宗地名称',
        width: '99'
      },
      {
        prop: 'province',
        label: '省份',
        width: '99'
      },
      {
        prop: 'position',
        label: '宗地坐落',
        width: '99'
      },
      {
        prop: 'auctionTime',
        label: '拍卖时间',
        width: '199'
      },
      {
        prop:'landAll',
        label:'操作',
        width: '100'
      }
    ]
}

export default allTableHeader
