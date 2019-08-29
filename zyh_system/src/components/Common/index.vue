<template>
    <div class="index">
        <div class="index_chart">
            <div class="chart_box">
                <h1 class="h1_title">发布项目状态</h1>
                <div id="project" :style="{width: '550px', height: '350px'}"></div>
            </div>
            <div class="chart_box">
                <h1 class="h1_title">发布需求状态</h1>
                <div id="demand" :style="{width: '550px', height: '350px'}"></div>
            </div>
            <div class="chart_box">
                <h1 class="user_title">
                    <span class="title_text">用户增长</span>
                    <span class="chart_type">
                        <span style="cursor: pointer" :class="{isCheck:userCheck}" @click="userCheck = true">周</span>
                        <span style="cursor: pointer" :class="{isCheck:!userCheck}" @click="userCheck = false">季度</span>
                    </span>
                </h1>
                <div id="userAddZhou" :style="{width: '550px', height: '350px'}" v-show="userCheck"></div>
                <div id="userAddJiDu" :style="{width: '550px', height: '350px'}" v-show="!userCheck"></div>
            </div>
            <div class="chart_box">
                <h1 class="user_title">
                    <span class="title_text">个人认证与企业认证</span>
                    <span class="chart_type">
                        <span style="cursor: pointer" :class="{isCheck:bizCheck}" @click="bizCheck = true">周</span>
                        <span style="cursor: pointer" :class="{isCheck:!bizCheck}" @click="bizCheck = false">季度</span>
                    </span>
                </h1>
                <div id="bizZhou" :style="{width: '550px', height: '350px'}" v-show="bizCheck"></div>
                <div id="bizJiDu" :style="{width: '550px', height: '350px'}" v-show="!bizCheck"></div>
            </div>
        </div>
    </div>
</template>

<script>

// 引入基本模板
let echarts = require('echarts/lib/echarts')

// 引入柱状图、饼状组件
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/grid')

import {countAll} from '@/api'
import {numCode} from '@/files/js/initData'
export default {
    data(){
        return{
            userCheck:true,
            bizCheck:true
        }
    },
    created() {
        this.initWeb();
    },
    methods:{
        initWeb(){
            countAll().then(res=>{
                if(res && res.errorCode === 0){
                    this.getChart(res.body);
                }
            })
        },
        getChart(data){
            //获取项目容器
            let project = echarts.init(document.getElementById('project'))
            //获取需求容器
            let demand = echarts.init(document.getElementById('demand'))
            //获取用户增长周容器
            let userAddZhou = echarts.init(document.getElementById('userAddZhou'))
            //获取用户增长季度容器
            let userAddJiDu = echarts.init(document.getElementById('userAddJiDu'))
            //获取个人、企业周容器
            let bizZhou = echarts.init(document.getElementById('bizZhou'))
            //获取个人、企业季度容器
            let bizJiDu = echarts.init(document.getElementById('bizJiDu'))
            //处理项目数据
            let week=[]
            for(let item of data.userGrowthCount.dateNumberList){
                Object.keys(numCode).forEach((key)=>{
                    if(Number(key) === item){
                        week.push(numCode[key])
                    }
                    
                })
            }

            //绘制项目图表
            project.setOption({
                legend:{
                    orient : 'vertical',
                    x :'80%',
                    y:'70%',
                    data:['已上架','已下架','待审核'],
                },
                title : {
                    text: `${data.projectCountNumber.allTotal}个`,
                    subtext: '项目总计',
                    textAlign:'center',
                    x:'13%',
                    y:'3%'
                },
                series : [{
                    name:'发布项目',
                    type:'pie',
                    radius: '70%',//饼图的半径大小
                    center: ['50%','50%'],//饼图的位置
                    data:[
                        {value:data.projectCountNumber.putawayTotal,name:'已上架',selected:true,itemStyle: { color: '#9d61f0' }},
                        {value:data.projectCountNumber.unShelvesTotal,name:'已下架',selected:true,itemStyle: { color: '#f6d438' }},
                        {value:data.projectCountNumber.auditTotal,name:'待审核',selected:true,itemStyle: { color: '#f2637c' }}
                        ].sort(function (a, b) { return a.value - b.value; }),
                    // roseType: 'radius',
                    itemStyle: {
                        emphasis: {
                            label: {
                                show:true,
                                formatter: '{a|{a}}\n{hr|}\n {b|{b}：}{c}个 {per|{d}%} ',
                                backgroundColor: '#eee',
                                borderColor: '#aaa',
                                borderWidth: 1,
                                borderRadius: 4,
                                rich:{
                                    a: {
                                        color: '#999',
                                        lineHeight: 22,
                                        align: 'center'
                                    },
                                    hr: {
                                        borderColor: '#aaa',
                                        width: '100%',
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 16,
                                        lineHeight: 33
                                    },
                                    per: {
                                        color: '#eee',
                                        backgroundColor: '#334455',
                                        padding: [2, 4],
                                        borderRadius: 2
                                    }
                                }
                            },
                            shadowBlur: 13,
                            shadowOffsetX: 5,
                            shadowOffsetY: 5,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                        normal: {
                            label: {
                                show:false,
                            }
                        }
                    },
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    },
                }]
            })
            // 绘制需求图表
            demand.setOption({
                legend: {
                    orient : 'vertical',
                    x :'80%',
                    y:'70%',
                    data:['已上架','已下架','待审核'],
                },
                title : {
                    text: `${data.requirementCountNumber.allTotal}个`,
                    subtext: '需求总计',
                    textAlign:'center',
                    x:'13%',
                    y:'3%'
                },
                series : [{
                    name:'发布需求',
                    type:'pie',
                    radius: '70%',//饼图的半径大小
                    center: ['50%','50%'],//饼图的位置
                    data:[
                        {value:data.requirementCountNumber.putawayTotal,name:'已上架',selected:true,itemStyle: { color: '#399ffe' }},
                        {value:data.requirementCountNumber.unShelvesTotal,name:'已下架',selected:true,itemStyle: { color: '#f6d438' }},
                        {value:data.requirementCountNumber.auditTotal,name:'待审核',selected:true,itemStyle: { color: '#34cfcc' }}
                        ].sort(function (a, b) { return a.value - b.value; }),
                    // roseType: 'radius',
                    itemStyle: {
                        emphasis: {
                            label: {
                                show:true,
                                formatter: '{a|{a}}\n{hr|}\n {b|{b}：}{c}个 {per|{d}%} ',
                                backgroundColor: '#eee',
                                borderColor: '#aaa',
                                borderWidth: 1,
                                borderRadius: 4,
                                rich:{
                                    a: {
                                        color: '#999',
                                        lineHeight: 22,
                                        align: 'center'
                                    },
                                    hr: {
                                        borderColor: '#aaa',
                                        width: '100%',
                                        borderWidth: 0.5,
                                        height: 0
                                    },
                                    b: {
                                        fontSize: 16,
                                        lineHeight: 33
                                    },
                                    per: {
                                        color: '#eee',
                                        backgroundColor: '#334455',
                                        padding: [2, 4],
                                        borderRadius: 2
                                    }
                                }
                            },
                            shadowBlur: 13,
                            shadowOffsetX: 5,
                            shadowOffsetY: 5,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                        normal: {
                            label: {
                                show:false,
                            }
                        }
                    },
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    },
                }]
            })
            //绘制用户增长周图表
            userAddZhou.setOption({
                color: ['#339ffe'],
                title : {
                    text: `${data.userGrowthCountWeeks.totalNumber}人`,
                    subtext: '用户总数',
                    textAlign:'center',
                    x:'13%',
                    y:'0'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis : [{
                    data : ['第一天', '第二天', '第三天', '第四天', '第五天', '第六天', '今天'],
                    axisTick: {
                        length:0,
                    },
                }],
                yAxis : [{
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        length:0
                    },
                    splitLine:{
                        lineStyle:{
                            type:"dashed", 
                            width:1,
                            opacity:1,
                        }
                    }
                }],
                series : [{
                    name:'用户增长',
                    type:'bar',
                    barWidth: '23px',
                    data:data.userGrowthCountWeeks.countNumberList
                }]
            })
            //绘制用户增长季度图表
            userAddJiDu.setOption({
                color: ['#339ffe'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                title : {
                    text: `${data.userGrowthCount.totalNumber}人`,
                    subtext: '用户总数',
                    textAlign:'center',
                    x:'13%',
                    y:'0'
                },
                xAxis : [{
                    data : week,
                    axisTick: {
                        length:0,
                    },
                }],
                yAxis : [{
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        length:0
                    },
                    splitLine:{
                        lineStyle:{
                            type:"dashed", 
                            width:1,
                            opacity:1,
                        }
                    }
                }],
                series : [{
                    name:'用户增长',
                    type:'bar',
                    barWidth: '23px',
                    data:data.userGrowthCount.countNumberList,
                }]
            })
            //个人认证、企业认证周图表
            bizZhou.setOption({
                color: ['#339ffe','#f2637c'],
                legend:{
                    x :'20px',
                    y:'10px',
                    data:['个人认证','企业认证'],
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis : [{
                    data : ['第一天', '第二天', '第三天', '第四天', '第五天', '第六天', '今天'],
                    axisTick: {
                        inside:true
                    },
                }],
                yAxis : [{
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        length:0
                    },
                    splitLine:{
                        lineStyle:{
                            type:"dashed", 
                            width:1,
                            opacity:1,
                        }
                    }
                }],
                series : [{
                    name:'个人认证',
                    type:'bar',
                    data:data.individualAuthNumberWeeks.countNumberList
                },{
                    name:'企业认证',
                    type:'bar',
                    data:data.bizAuthNumberWeeks.countNumberList
                }]
            })
            //个人认证、企业认证季度图表
            bizJiDu.setOption({
                color: ['#339ffe','#f2637c'],
                legend:{
                    x :'20px',
                    y:'10px',
                    data:['个人认证','企业认证'],
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis : [{
                    data : week,
                    axisTick: {
                        inside:true
                    },
                }],
                yAxis : [{
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        length:0
                    },
                    splitLine:{
                        lineStyle:{
                            type:"dashed", 
                            width:1,
                            opacity:1,
                        }
                    }
                }],
                series : [{
                    name:'个人认证',
                    type:'bar',
                    data:data.individualAuthNumber.countNumberList
                },{
                    name:'企业认证',
                    type:'bar',
                    data:data.bizAuthNumber.countNumberList
                }]
            })
        },
    }
}
</script>

<style lang="stylus" scoped>
.index{
    padding 30px 30px 0;
    // border 1px solid black;
    min-height 873px;
    background #f0f3f5;
    box-sizing border-box;
    .index_chart{
        width 1150px;
        display flex;
        flex-wrap wrap;
        justify-content space-between;
        .chart_box{
            width 550px;
            height 400px;
            background white;
            margin-bottom 20px;
            .h1_title{
                font-size 18px;
                font-weight bold;
                line-height 50px;
                padding 0 30px;
                border-bottom 1px solid #e6e6e6;
            }
            .user_title{
                line-height 50px;
                padding 0 30px;
                border-bottom 1px solid #e6e6e6;
                overflow hidden;
                .title_text{
                    float left;
                    font-size 18px;
                    font-weight bold;
                }
                .chart_type{
                    float right;
                    display flex;
                    width 66px;
                    justify-content space-between;
                }
            }
        }
    }
    .isCheck{
        color #339ffe;
        font-weight bold;
    }
}
</style>
