export const constructionArr = [{
    code: 'A',
    text: '标准结构'
}, {
    code: 'B',
    text: '排架结构'
}, {
    code: 'C',
    text: '框架结构'
}, {
    code: 'D',
    text: '砖混结构'
}, {
    code: 'E',
    text: '钢架结构'
}]

export const ParkLv = [{
    code: 'A',
    text: '国家级'
}, {
    code: 'B',
    text: '省级'
}, {
    code: 'C',
    text: '市级'
}]

export const ParkType = [{
        code: 'A',
        text: '工业用地'
    }, {
        code: 'B',
        text: '厂房'
    }, {
        code: 'C',
        text: '租赁'
    }]
    //项目类别
export const projectClassList = [{
        code: null,
        text: '全部'
    }, {
        code: 1000,
        text: '资产',
    }, {
        code: 2000,
        text: '地产'
    }, {
        code: 3000,
        text: '项目股权'
    }, {
        code: 4000,
        text: '融资'
    }, {
        code: 5000,
        text: '投资'
    }, {
        code: 7000,
        text: '工业园区'
    }
];

//项目状态
export const projectStatu = [{
    code: null,
    text: '全部'
}, {
    code: 0,
    text: '已下架'
}, {
    code: 1,
    text: '待审核'
}, {
    code: 2,
    text: '已上架'
}, {
    code: 3,
    text: '审核拒绝'
}];

//资质状态
export const qualificationStatus = [{
        code: null,
        text: '全部'
    }, {
        code: 0,
        text: '需回访'
    },
    {
        code: 1,
        text: '已回访'
    }
]


//用户列表认证状态
export const userStatu = [{
    code: null,
    text: '全部',
}, {
    code: 1,
    text: '待审核',
}, {
    code: 2,
    text: '已认证',
}, {
    code: 3,
    text: '认证失败'
}]

//数字转化为中文的数字
export const numCode = {
    1: '第一周',
    2: '第二周',
    3: '第三周',
    4: '第四周',
    5: '第五周',
    6: '第六周',
    7: '第七周',
    8: '第八周',
    9: '第九周',
    10: '第十周',
    11: '第十一周',
    12: '第十二周',
    13: '第十三周',
    14: '第十四周',
    15: '第十五周',
    16: '第十六周',
    17: '第十七周',
    18: '第十八周',
    19: '第十九周',
    20: '第二十周',
    21: '第二十一周',
    22: '第二十二周',
    23: '第二十三周',
    24: '第二十四周',
    25: '第二十五周',
    26: '第二十六周',
    27: '第二十七周',
    28: '第二十八周',
    29: '第二十九周',
    30: '第三十周',
    31: '第三十一周',
    32: '第三十二周',
    33: '第三十三周',
    34: '第三十四周',
    35: '第三十五周',
    36: '第三十六周',
    37: '第三十七周',
    38: '第三十八周',
    39: '第三十九周',
    40: '第四十周',
    41: '第四十一周',
    42: '第四十二周',
    43: '第四十三周',
    44: '第四十四周',
    45: '第四十五周',
    46: '第四十六周',
    47: '第四十七周',
    48: '第四十八周',
    49: '第四十九周',
    50: '第五十周',
    51: '第五十一周',
    52: '第五十二周',
    53: '第五十三周',
    54: '第五十四周',
    55: '第五十五周',
    56: '第五十六周',
    57: '第五十七周',
    58: '第五十八周',
    59: '第五十九周',
    60: '第六十周',
    61: '第六十一周',
    62: '第六十二周',
    63: '第六十三周',
    64: '第六十四周',
    65: '第六十五周',
    66: '第六十六周',
}


//企业参数下拉框选择
export const enterpriseList = {
    welfarePolicyList: ['社保', '公积金', '年终奖', '双薪', '旅游', '家属福利'],
    bizModelCreList: ['传统商业模式', '创新商业模式', '淘汰商业模式'],
    priceLocationList: ['高于市场', '低于市场', '平于市场'],
    industryChainList: ['原料', '粗加工', '深加工', '渠道', '终端'],
    attributeTagList: [
        '教育',
        '采矿业',
        '制造业',
        '建筑业',
        '金融业',
        '房地产业',
        '国际组织',
        '批发和零售',
        '住宿和餐饮业',
        '租赁和商务服务',
        '农、林、牧、渔业',
        '居民服务和其他服务',
        '文化、体育和娱乐业',
        '公共管理和社会组织',
        '交通运输、仓储和邮政',
        '水利、环境和公共设施管理',
        '电力、燃气及水的生产和供应',
        '信息传输、计算机服务和软件业',
        '科学研究、技术服务和地质勘查',
        '卫生、社会保障和社会福利',
    ],
    financeRoundList: [{
            code: 'angel',
            text: '天使轮'
        },
        {
            code: 'A',
            text: 'A轮'
        },
        {
            code: 'B',
            text: 'B轮'
        },
        {
            code: 'C',
            text: 'C轮'
        },
        {
            code: 'D',
            text: 'D轮'
        },  {
            code: 'IPO',
            text: 'IPO上市'
        }
    ],
    attributeTagList2: ['融资', '借贷', '合作'],
    terminalSalesList: ['会销', '案销', '分销', '行销'],
    cutTechnicalBarriersList: ['FCC', 'UL', 'FTC', 'CPSC', 'FDA', 'USDA'],
    cutBarriersTradeList: ['ISO9000', 'ISO140000', 'OKO-Tex Standard100[1]'],
    marketinglist: [
        '服务营销',
        '个性营销',
        '会员营销',
        '知识营销',
        '情感营销',
        '教育营销',
        '差异营销',
        '整合营销',
        '联合营销',
        '绿色营销',
        '公益营销',
        '病毒营销',
        '事件营销',
        '体验式微营销',
        '网络营销体验营销'
    ],
    phaseList: ['增>失', '增<失', '增=失'],
    yesNoList: ['是', '否']
}

//消息推送初始化数据
export const msgPushList = [{
    code: 1,
    text: '普通推送'
}, {
    code: 2,
    text: '交易成功推送'
}]

//招牌挂
export const auctionList = [{
    code: null,
    text: '全部'
}, {
    code: 0,
    text: '待竞拍'
}, {
    code: 2,
    text: '已结束'
}]

export const dropdown = [
    '建筑工程施工总承包',
    '公路工程施工总承包',
    '港口与航道工程施工总承包',
    '水利水电工程施工总承包',
    '电力工程施工总承包',
    '市政公用工程施工总承包',
    '通信工程施工总承包',
    '机电工程施工总承包',
]
export const dropd = [
        '特级',
        '一级',
        '二级',
        '三级',
        '无',
    ]
    // 投资
export const comTypeOne = [{
    code: 'A',
    text: '存续',
}, {
    code: 'B',
    text: '在业'
}, {
    code: 'C',
    text: '吊销'
}, {
    code: 'D',
    text: '注销'
}, {
    code: 'E',
    text: '迁入'
}, {
    code: 'F',
    text: '停业'
}, {
    code: 'G',
    text: '清算'
}]

export const comTypeTwo = [{
    code: '1',
    text: '有限责任公司'
}, {
    code: '2',
    text: '股份制公司'
}, {
    code: '3',
    text: '集团公司'
}, {
    code: '4',
    text: '一人制公司'
}]
