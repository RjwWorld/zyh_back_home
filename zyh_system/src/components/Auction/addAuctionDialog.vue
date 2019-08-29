<template>
    <div class="addAuctionDialog">
        <el-dialog
            :title="dialogType == 'add' ? '新增项目信息' : (dialogType=='look' ? '查看项目信息' : '修改项目信息')"
            :visible.sync="showDialog"
            @close="closeFuc"
            width="1100px"
            center
        >
            <el-form :model="formObj" label-position="left" ref="auctionForm" size="small" label-width="111px">
                <h1 class="h1_title">土地基本信息</h1>
                <div class="children_div">
                    <div class="form_div">
                        <el-form-item label="项目名称：" prop="title">
                            <el-input :readonly="isReading" v-model="formObj.title" type="text" placeholder="项目名称"></el-input>
                        </el-form-item>
                        <el-form-item label="地块编号：" prop="landNo">
                            <el-input :readonly="isReading" v-model="formObj.landNo" type="text" placeholder="地块编号"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form_div">
                        <el-form-item label="用途：" prop="planUsePurpose">
                            <el-input :readonly="isReading" v-model="formObj.planUsePurpose" type="text" placeholder="用途"></el-input>
                        </el-form-item>
                        <el-form-item label="四至：" prop="fourSolstice">
                            <el-input :readonly="isReading" v-model="formObj.fourSolstice" type="text" placeholder="四至"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form_div">
                        <el-form-item label="商业比例：" prop="bizRatio">
                            <el-input :readonly="isReading" v-model="formObj.bizRatio" type="text" placeholder="商业比例"></el-input>
                        </el-form-item>
                        <el-form-item label="公告编号：" prop="boardNo">
                            <el-input :readonly="isReading" v-model="formObj.boardNo" type="text" placeholder="公告编号"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form_div">
                        <el-form-item label="省：" prop="province">
                            <el-input :readonly="isReading" v-model="formObj.province" type="text" placeholder="省"></el-input>
                        </el-form-item>
                        <el-form-item label="位置：" prop="position">
                            <el-input :readonly="isReading" v-model="formObj.position" type="text" placeholder="位置"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="容积率：" prop="volumeRatio">
                            <span class="spanInput">
                                <el-input :readonly="isReading" v-model="formObj.volumeRatio" type="text" placeholder="容积率"></el-input>
                            </span>
                        </el-form-item>
                    </div>
                    <div class="form_div">
                        <el-form-item label="建设密度：" prop="buildDensity">
                            <span class="spanInput">
                                <el-input :readonly="isReading" v-model="formObj.buildDensity" type="text" placeholder="建设密度"></el-input>
                                <span class="danwei">&nbsp;&nbsp;%</span>
                            </span>
                        </el-form-item>
                        <el-form-item label="出让年限：" prop="transferYear">
                            <span class="spanInput">
                                <el-input :readonly="isReading" v-model="formObj.transferYear" type="text" placeholder="出让年限"></el-input>
                                <span class="danwei">&nbsp;&nbsp;年</span>
                            </span>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="绿化率：" prop="greenRatio">
                            <span class="spanInput">
                                <el-input :readonly="isReading" v-model="formObj.greenRatio" type="text" placeholder="绿化率"></el-input>
                                <span class="danwei">&nbsp;&nbsp;%</span>
                            </span>
                        </el-form-item>
                    </div>
                    <div class="form_div">
                        <el-form-item label="规划用地面积：" prop="planLandAcreage">
                            <span class="spanInput">
                                <el-input :readonly="isReading" v-model="formObj.planLandAcreage" type="text" placeholder="规划用地面积"></el-input>
                                <span class="danwei">&nbsp;&nbsp;平方米</span>
                            </span>
                        </el-form-item>
                        <el-form-item label="建筑用地面积：" prop="buildLandAcreage">
                            <span class="spanInput">
                                <el-input :readonly="isReading" v-model="formObj.buildLandAcreage" type="text" placeholder="建筑用地面积"></el-input>
                                <span class="danwei">&nbsp;&nbsp;平方米</span>
                            </span>
                        </el-form-item>
                    </div>
                </div>
                <h1 class="h1_title">土地交易信息</h1>
                <div class="children_div">
                    <div class="form_div">
                        <el-form-item label="拍卖出让时间：" prop="auctionTime">
                            <el-date-picker
                                :readonly="isReading"
                                v-model="formObj.auctionTime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :editable="false"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="起始报名时间：" prop="startEnrollTime">
                            <el-date-picker
                                :readonly="isReading"
                                v-model="formObj.startEnrollTime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :editable="false"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="结束报名时间：" prop="endEnrollTime">
                            <el-date-picker
                                :readonly="isReading"
                                v-model="formObj.endEnrollTime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :editable="false"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="form_div">
                        <el-form-item label="保证金：" prop="earnestMoney">
                            <span class="spanInput">
                                <el-input :readonly="isReading" v-model="formObj.earnestMoney" type="text" placeholder="保证金"></el-input>
                                <span class="danwei">&nbsp;&nbsp;万元</span>
                            </span>
                        </el-form-item>
                        <el-form-item label="起始金额：" prop="startAmt">
                            <span class="spanInput">
                                <el-input :readonly="isReading" v-model="formObj.startAmt" type="text" placeholder="起始金额"></el-input>
                                <span class="danwei">&nbsp;&nbsp;万元</span>
                            </span>
                        </el-form-item>
                    </div>
                    <div class="form_div">
                        <el-form-item label="联系电话：" prop="contactTel">
                            <el-input :readonly="isReading" v-model="formObj.contactTel" type="text" placeholder="联系电话"></el-input>
                        </el-form-item>
                        <el-form-item label="最小涨幅：" prop="leastIncrease">
                            <span class="spanInput">
                                <el-input :readonly="isReading" v-model="formObj.leastIncrease" type="text" placeholder="最小涨幅"></el-input>
                                <span class="danwei">&nbsp;&nbsp;万元</span>
                            </span>
                        </el-form-item>
                    </div>
                    <div class="form_div">
                        <el-form-item label="交易地点：" prop="transactionPositon">
                            <el-input :readonly="isReading" v-model="formObj.transactionPositon" type="text" placeholder="交易地点"></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
            <span slot="footer">
                <el-button v-show="dialogType != 'look'" type="primary" size="medium" :loading="loadingBtn" @click="submitFuc">
                    {{this.dialogType == 'add' ? '增&nbsp;&nbsp;加' : '修&nbsp;&nbsp;改'}}
                </el-button>
                <el-button @click=" showDialog = false ">取&nbsp;&nbsp;消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {aucInsert,aucModify} from '@/api'
export default {
    data(){
        return{
            showDialog:false,
            loadingBtn:false,
            isReading:false,
            dialogType:'',

            formObj:{
                title:"",  //项目名称
                landNo:"",  //地块编号
                planUsePurpose:"", //用途
                fourSolstice:"",  //四至
                bizRatio:"",  //商业比例
                boardNo:"",  //公告编号
                volumeRatio:"", //容积率
                position:"",  //位置
                province:"",  //省
                transactionPositon:"",  //交易地点
                buildDensity:"",  //建筑密度
                transferYear:"",   //出让年限
                greenRatio:"",  //绿化率
                buildLandAcreage:"",  //建设用地面积
                planLandAcreage:"",  //规划用地面积
                auctionTime:"",  //拍卖出让日期
                startEnrollTime:"",  //报名起始日期
                endEnrollTime:"",  //结束结束日期
                earnestMoney:"",  //保证金
                startAmt:"",  //起始金额
                contactTel:"",  //咨询电话
                leastIncrease:"",  //最小涨幅
                transactionPositon:"",  //交易地点
            }
        }
    },
    methods:{
        submitFuc(){
            if(this.dialogType == 'add'){
                this.loadingBtn = true;
                aucInsert(this.formObj).then(res=>{
                    if( res && res.errorCode === 0){
                        this.showDialog = false;
                        this.$emit('changeFuc');
                        this.$message({
                            showClose: true,
                            message: '成功',
                            type: 'success'
                        });
                    }
                    this.loadingBtn = false
                })
            }
            if(this.dialogType == 'edit'){
                this.$confirm('确定修改这条招拍挂信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loadingBtn = true;
                    aucModify(this.formObj).then(res=>{
                        if(res && res.errorCode === 0){
                            this.showDialog = false;
                            this.$emit('changeFuc');
                            this.$message({
                                showClose: true,
                                message: '成功',
                                type: 'success'
                            });
                        }
                        this.loadingBtn = false
                    })
                }).catch(()=>{})
            }
        },
        showDialogFuc(type,data){
            this.dialogType = type;
            if(this.dialogType == 'edit'){
                this.formObj = data
            }
            if(this.dialogType == 'look'){
                this.formObj = data
                this.isReading = true;
            }
            else{
                this.isReading = false
            }
            this.showDialog = true
        },

        closeFuc(){
            this.formObj={
                title:"",  //项目名称
                landNo:"",  //地块编号
                planUsePurpose:"", //用途
                fourSolstice:"",  //四至
                bizRatio:"",  //商业比例
                boardNo:"",  //公告编号
                volumeRatio:"", //容积率
                position:"",  //位置
                province:"",  //省
                transactionPositon:"",  //交易地点
                buildDensity:"",  //建筑密度
                transferYear:"",   //出让年限
                greenRatio:"",  //绿化率
                buildLandAcreage:"",  //建设用地面积
                planLandAcreage:"",  //规划用地面积
                auctionTime:"",  //拍卖出让日期
                startEnrollTime:"",  //报名起始日期
                endEnrollTime:"",  //结束结束日期
                earnestMoney:"",  //保证金
                startAmt:"",  //起始金额
                contactTel:"",  //咨询电话
                leastIncrease:"",  //最小涨幅
                transactionPositon:"",  //交易地点
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.addAuctionDialog{
    .h1_title{
        color #1f2f3d;
        font-size 18px;
        font-weight bold;
        padding-bottom 20px;
        box-sizing border-box;
    }
    .form_div{
        display flex;
        >>>.el-form-item__content{
            width 233px;
            margin-right 66px;
        }
    }
    .children_div{
        padding-left 40px;
    }
    .spanInput{
        display flex;
        width 233px;
        .danwei{
            display inline-block;
            width 70px;
        }
    }
    >>>.el-form{
        width 900px;
        margin auto;
    }
    >>>.el-dialog{
        .el-dialog__header{
            padding 0;
            line-height 50px;
            background #f2f2f2;
            .el-dialog__title{
                font-size 18px;
                font-weight bold
            }
        }
    }
}
</style>
