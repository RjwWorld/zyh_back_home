<template>
<!-- 股权市场 -->
    <div class="market">
        <el-form :model="dataObj" label-position="left" ref="marketForm" size="medium" label-width="111px">
            <h1 class="h1_title">市场分析</h1>
            <div class="children_div">
                <div class="form_div1">
                    <el-form-item label="项目名称：" prop="projectName">
                            <el-input v-model="dataObj.projectName" type="text" placeholder="项目名称"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="商业模式创新：" prop="bizModelCre">
                        <el-select v-model="dataObj.bizModelCre" placeholder="请选择">
                            <el-option
                                v-for="item in initData.bizModelCreList"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="价格定位：" prop="priceLocation">
                        <el-select v-model="dataObj.priceLocation" placeholder="请选择">
                            <el-option
                                v-for="item in initData.priceLocationList"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="产业链角色：" prop="industryChain">
                        <el-select v-model="dataObj.industryChain" placeholder="请选择">
                            <el-option
                                v-for="item in initData.industryChainList"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="属性标签：" prop="attributeTagList">
                        <el-checkbox-group v-model="dataObj.attributeTagList">
                            <el-checkbox :label="item" v-for="(item,index) in initData.attributeTagList" :key="index"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="属性标签2：" prop="attributeTagTwoList">
                        <el-checkbox-group v-model="dataObj.attributeTagTwoList">
                            <el-checkbox :label="item" v-for="(item,index) in initData.attributeTagList2" :key="index"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="市场痛点：" prop="marketPainSpot">
                        <el-input v-model="dataObj.marketPainSpot" type="text" placeholder="市场痛点"></el-input>
                    </el-form-item>
                    <el-form-item label="是否真实：" prop="isReal">
                        <el-select v-model="dataObj.isReal" placeholder="请选择">
                            <el-option
                                v-for="item in initData.yesNoList"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="form_div1">
                    <el-form-item label="痛点真伪：" prop="painAuthenticity">
                        <span class="spanInput">
                            <el-input v-model="dataObj.painAuthenticity" type="text" placeholder="痛点真伪">
                                <span slot="suffix">&nbsp;分&nbsp;</span>
                            </el-input>
                        </span>
                    </el-form-item>
                </div>
                <div class="form_div1">
                    <el-form-item label="单客户利用率：" prop="singleCuRate">
                        <span class="spanInput">
                            <el-input v-model="dataObj.singleCuRate" type="text" placeholder="单客户利用率">
                                <span slot="suffix">&nbsp;%&nbsp;</span>
                            </el-input>
                        </span>
                    </el-form-item>
                </div>
                <div class="form_div1">
                    <el-form-item label="客户规模：" prop="cuScale">
                        <span class="spanInput">
                            <el-input v-model="dataObj.cuScale" type="text" placeholder="客户规模">
                                <span slot="suffix">&nbsp;人&nbsp;</span>
                            </el-input>
                        </span>
                    </el-form-item>
                </div>
            </div>

            <h1 class="h1_title">产业链条</h1>
            <div class="children_div">
                <h2 class="h2_title">1.粗加工</h2>
                <div class="children_div">
                    <div class="form_div1">
                        <el-form-item label="资本：" prop="roughMachiningCapital" label-width="66px">
                                <el-input v-model="dataObj.roughMachiningCapital" type="text" placeholder="资本"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form_div1">
                        <el-form-item label="方法：" prop="methods" label-width="66px">
                                <el-input v-model="dataObj.methods" type="text" placeholder="方法"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <h2 class="h2_title">2.深加工</h2>
                <div class="children_div">
                    <div class="form_div1">
                        <el-form-item label="技术：" prop="technology" label-width="66px">
                            <el-input v-model="dataObj.technology" type="text" placeholder="技术"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <h2 class="h2_title">3.渠道商</h2>
                <div class="children_div">
                    <div class="form_div1">
                        <el-form-item label="强大的渠道能力：" prop="channelCapacity" label-width="133px">
                            <el-input v-model="dataObj.channelCapacity" type="text" placeholder="强大的渠道能力"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form_div1">
                        <el-form-item label="影响力：" prop="influence" label-width="88px">
                            <el-input v-model="dataObj.influence" type="text" placeholder="影响力"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form_div1">
                        <el-form-item label="资本：" prop="distributorsCapital" label-width="88px">
                            <el-input v-model="dataObj.distributorsCapital" type="text" placeholder="资本"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <h2 class="h2_title">4.终端</h2>
                <div class="children_div">
                    <el-form-item label="销售：" prop="terminalSales" label-width="66px">
                        <el-select v-model="dataObj.terminalSales" placeholder="请选择">
                            <el-option
                                v-for="item in initData.terminalSalesList"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </div>
            <h1 class="h1_title">市场保护</h1>
            <div class="children_div">
                <div class="form_div1">
                    <el-form-item label="市场壁垒：" prop="protectTechnicalBarriers">
                        <el-input v-model="dataObj.protectTechnicalBarriers" type="text" placeholder="市场壁垒"></el-input>
                    </el-form-item>
                </div>
                <div class="form_div1">
                    <el-form-item label="规模壁垒：" prop="scaleBarriers">
                        <el-input v-model="dataObj.scaleBarriers" type="text" placeholder="规模壁垒"></el-input>
                    </el-form-item>
                </div>
            </div>
            <h1 class="h1_title">市场切入</h1>
            <div class="children_div">
                <div>
                    <el-form-item label="产品发布会：" prop="productLaunchList">
                        <div class="free_div" v-for="(item,index) in dataObj.productLaunchList" :key="index">
                            <el-input type="text" v-model="dataObj.productLaunchList[index]">
                                <span slot="prefix">&nbsp;{{index+1}}</span>
                                <span slot="suffix" class="el-icon-close del_icon" @click="delFuc('free',index)">&nbsp;</span>
                            </el-input>
                        </div>
                        <div style="width:388px;text-align:center">
                            <el-button type="primary" size="medium" @click="addFuc('free')">增&nbsp;&nbsp;加</el-button>
                        </div>
                    </el-form-item>
                </div>
                <div class="form_div1">
                    <el-form-item label="会销：" prop="willPin">
                        <el-input v-model="dataObj.willPin" type="text" placeholder="会销"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="技术壁垒：" prop="cutTechnicalBarriersList">
                        <el-checkbox-group v-model="dataObj.cutTechnicalBarriersList">
                            <el-checkbox :label="item" v-for="(item,index) in initData.cutTechnicalBarriersList" :key="index"></el-checkbox>
                        </el-checkbox-group>
                        <div style="width:500px">
                            <el-input
                                type="textarea"
                                :rows="6"
                                placeholder="请输入内容"
                                v-model="dataObj.cutTechnicalBarriersContent">
                            </el-input>
                        </div>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="贸易壁垒：" prop="cutBarriersTradeList">
                        <el-checkbox-group v-model="dataObj.cutBarriersTradeList">
                            <el-checkbox :label="item" v-for="(item,index) in initData.cutBarriersTradeList" :key="index"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="营销手段：" prop="marketinglist">
                        <el-checkbox-group v-model="dataObj.marketinglist">
                            <el-checkbox :label="item" v-for="(item,index) in initData.marketinglist" :key="index"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="传播效率：" class="item_title"></el-form-item>
                    <table-obj
                    :tableTitle="tableHeader"
                    :tableData="cutTable"
                     @addFuc="addFuc"
                     @delFuc="delFuc"
                     type="spread"/>
                </div>
            </div>
            <h1 class="h1_title">市场运营</h1>
            <div class="children_div">
                <div>
                    <el-form-item label="活跃度：" prop="operatingActive">
                        <span class="spanInput">
                            <el-input v-model="dataObj.operatingActive" type="text" placeholder="填写数字">
                                <span slot="suffix">&nbsp;人&nbsp;</span>
                            </el-input>
                        </span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="单个用户输出价值：" prop="userValue" label-width="166px">
                        <span class="spanInput">
                            <el-input v-model="dataObj.userValue" type="text" placeholder="输入数字"></el-input>
                        </span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="增量：" class="item_title"></el-form-item>
                    <table-obj :tableTitle="tableHeader" :tableData="incrementalTable" @addFuc="addFuc" @delFuc="delFuc" type="add"/>
                </div>
                <div>
                    <el-form-item label="流失：" class="item_title"></el-form-item>
                    <table-obj :tableTitle="tableHeader" :tableData="leaveTable" @addFuc="addFuc" @delFuc="delFuc" type="loss"/>
                </div>
                <div>
                    <el-form-item label="0-1-2-5-0：" prop="userNumber">
                        <span class="spanInput">
                            <el-input v-model="dataObj.userNumber" type="text" placeholder="填写数字"></el-input>
                        </span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="所处阶段：" prop="phase">
                        <el-select v-model="dataObj.phase" placeholder="请选择">
                            <el-option
                                v-for="item in initData.phaseList"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="数据验收：" prop="dataAcceptance">
                        <span class="spanInput">
                            <el-input v-model="dataObj.dataAcceptance" type="text" placeholder="填写数字"></el-input>
                        </span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="方案合理性：" prop="programRationality">
                        <span class="spanInput">
                            <el-input v-model="dataObj.programRationality" type="text" placeholder="填0-100">
                                <span slot="suffix">&nbsp;人&nbsp;</span>
                            </el-input>
                        </span>
                    </el-form-item>
                </div>
            </div>


            <div class="next_btn">
                <el-button type="primary" size="medium" @click="nextFuc">下一步</el-button>
                <el-button type="primary" size="medium" @click="resetMarket">重置</el-button>
            </div>
        </el-form>

        <el-dialog
            :title="dialogTitle"
            :visible.sync="showDialog"
            @close="closeFuc"
            width="600px"
            center
        >
            <el-form ref="dateForm" :model="dateObj" label-width="111px" >
                <div>
                    <el-form-item label="日：" prop="day">
                        <el-input v-model="dateObj.day" type="text" placeholder="日"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="周：" prop="week">
                        <el-input v-model="dateObj.week" type="text" placeholder="周"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="月：" prop="month">
                        <el-input v-model="dateObj.month" type="text" placeholder="月"></el-input>
                    </el-form-item>
                </div>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveFuc" size="medium">保&nbsp;&nbsp;存</el-button>
                <el-button type="primary" @click="resetFuc" size="medium">重&nbsp;&nbsp;置</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import TableObj from '@/components/EnterpriseData/table/tableObj'
import {marketHeader} from '@/components/EnterpriseData/table/tableHeader'
import {cloneObj} from '@/files/js/cloneObj'
import {enterpriseList} from '@/files/js/initData'
import {publishMarket} from '@/api'
import {mapState} from 'vuex'
export default {
    components:{
        TableObj
    },
    computed:{
        ...mapState({
            projectId:state => state.data.companyId
        })
    },
    data(){
        return{
            showDialog:false,
            dialogTitle:"",
            dialogType:"",

            initData:enterpriseList,

            tableHeader:marketHeader,

            dataObj:{
                projectId:"",  //项目id
                projectName:"",  //项目名称
                bizModelCre:"",  //商业模式创新
                priceLocation:"", //价格定位
                industryChain:"",  //产业链角色
                attributeTagList:[],  //属性标签
                attributeTagTwoList:[],  //属性标签2
                marketPainSpot:"",  //市场痛点
                isReal:"",  //痛点是否真是
                painAuthenticity:"",  //痛点真伪
                singleCuRate:"",  //单用户利用率
                cuScale:"",   //客户规模
                roughMachiningCapital:"",  //资本
                methods:"",   //方法
                technology:"",   //技术
                channelCapacity:"",  //强大的渠道能力
                influence:"",  //影响力
                distributorsCapital:"",   //渠道商资本
                terminalSales:"",  //终端销售
                protectTechnicalBarriers:"",  //市场保护 技术壁垒
                scaleBarriers:"",  //市场保护  规模壁垒
                productLaunchList:[''],  //产品发布会集合
                willPin:"",  //会销
                cutTechnicalBarriersList:[],  //市场切入技术壁垒
                cutTechnicalBarriersContent:"", //市场切入技术壁垒类容描述
                cutBarriersTradeList:[],  //市场切入贸易壁垒
                marketinglist:[],  //营销手段
                //传播效率
                cutDays:"", //天
                cutWeeks:"", //周
                cutMonth:"", //月
                //增量
                incrementalDays:"", //天
                incrementalWeeks:"", //周
                incrementalMonth:"", //月
                //流失
                leaveDays:"", //天
                leaveWeeks:"", //周
                leaveMonth:"", //月

                operatingActive:"",  //活跃度
                userValue:"",  //单个用户输出价值
                userNumber:"",  //0-1-2-5-0
                phase:"",  //所处阶段
                dataAcceptance:"",  //数据验收
                programRationality:"",  //方案合理性
            },

            cutTable:[],
            incrementalTable:[],
            leaveTable:[],

            dateObj:{
                name:'',
                day:"",
                week:"",
                month:""
            }
        }
    },
    methods:{
        addFuc(type){
            if(type == 'free'){
                this.dataObj.productLaunchList.push('')
                return
            }
            else{
                switch(type){
                    case 'spread':
                        this.dialogTitle = '传播效率'
                    break;
                    case 'add' :
                        this.dialogTitle = '增量'
                    break;
                    case 'loss':
                        this.dialogTitle = '流失'
                    break
                }
                this.dialogType = type;
                this.showDialog = true;
            }
        },
        delFuc(type,index){
            console.log(type)
            switch(type){
                case 'free':
                    if(this.dataObj.productLaunchList.length > 1){
                        this.dataObj.productLaunchList.splice(index,1)
                    }
                    else{
                        this.$message({
                            message: '至少有一条输入框',
                            type: 'warning'
                        });
                    }
                break;
                case 'spread':
                    this.dataObj.cutDays = ""
                    this.dataObj.cutWeeks = ""
                    this.dataObj.cutMonth = ""
                    this.cutTable=[];
                break;
                case 'add' :
                    this.dataObj.incrementalDays = ""
                    this.dataObj.incrementalWeeks = ""
                    this.dataObj.incrementalMonth = ""
                    this.incrementalTable=[];
                break;
                case 'loss':
                    this.dataObj.leaveDays = ""
                    this.dataObj.leaveWeeks = ""
                    this.dataObj.leaveMonth = ""
                    this.leaveTable=[];
                break;
            }
        },
        saveFuc(){
            switch(this.dialogType){
                case 'spread':
                    this.cutTable=[]
                    this.dataObj.cutDays = this.dateObj.day
                    this.dataObj.cutWeeks = this.dateObj.week
                    this.dataObj.cutMonth = this.dateObj.month
                    this.dateObj.name='%'
                    this.cutTable.push(cloneObj(this.dateObj))
                break;
                case 'add' :
                    this.incrementalTable=[]
                    this.dataObj.incrementalDays = this.dateObj.day
                    this.dataObj.incrementalWeeks = this.dateObj.week
                    this.dataObj.incrementalMonth = this.dateObj.month
                    this.dateObj.name='人数'
                    this.incrementalTable.push(cloneObj(this.dateObj))
                break;
                case 'loss':
                    this.leaveTable=[]
                    this.dataObj.leaveDays = this.dateObj.day
                    this.dataObj.leaveWeeks = this.dateObj.week
                    this.dataObj.leaveMonth = this.dateObj.month
                    this.dateObj.name='人数'
                    this.leaveTable.push(cloneObj(this.dateObj))
                break
            }
            this.closeFuc();
        },
        nextFuc(){
            if(this.projectId){
                this.dataObj.projectId = this.projectId
                publishMarket(this.dataObj).then(res=>{
                    if(res && res.errorCode === 0){
                        this.$message({
                            showClose: true,
                            message: '市场保存成功,跳转到第四步',
                            type: 'success'
                        });
                        this.$router.push('/technology')
                    }
                })
            }
            else{
                this.$message({
                    showClose: true,
                    message: '请先完善基本信息',
                    type: 'warning'
                });
            }
        },
        closeFuc(){
            this.showDialog= false;
            this.resetFuc();
        },
        resetMarket(){
            this.cutTable=[];
            this.incrementalTable=[];
            this.leaveTable=[]

            this.dataObj.cutDays="";
            this.dataObj.cutWeeks="";
            this.dataObj.cutMonth="";

            this.dataObj.incrementalDays="";
            this.dataObj.incrementalWeeks="";
            this.dataObj.incrementalMonth="";

            this.dataObj.leaveDays="";
            this.dataObj.leaveWeeks="";
            this.dataObj.leaveMonth="";



            this.$refs.marketForm.resetFields();
        },
        resetFuc(){
            this.$refs.dateForm.resetFields();
        },
    }
}
</script>

<style lang="stylus" scoped>
.market{
    padding 30px 88px;
    .h1_title{
        color #1f2f3d;
        width 111px;
        font-size 20px;
        font-weight bold;
        padding 0 12px 23px 0;
        box-sizing border-box;
    }
    .h2_title{
        color #1f2f3d;
        font-size 16px;
        font-weight bold;
        box-sizing border-box;
        padding-bottom 20px;
    }
    .form_div{
        display flex;
        >>>.el-form-item__content{
            width 233px;
            margin-right 66px;
        }
    }
    .form_div1{
        width 500px;
    }
    .free_div{
        width 388px;
        margin-bottom 22px;
    }
    .children_div{
        padding-left 40px;
    }
    .item_title{
        margin-bottom 6px;
        >>> .el-form-item__label{
            color black;
            // font-size 16px;
        }
    }
    .add_btn{
        padding 16px 0 24px;
    }
    .spanInput{
        display inline-block;
        width 188px;
    }
    .next_btn{
        width 600px;
        padding 50px 0 88px;
        text-align center;
    }
    .del_icon{
        cursor pointer;
    }
    >>>.el-dialog{
        .el-form{
            width 388px;
            margin auto;
        }
    }
    >>>.el-checkbox{
        margin-left 0px;
        width 233px;
    }
}
</style>
