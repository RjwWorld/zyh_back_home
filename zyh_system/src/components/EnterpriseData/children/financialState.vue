<template>
<!-- 股权财务情况 -->
    <div class="financialState">
        <el-form :model="dataObj" label-position="left" ref="financialForm" size="medium" label-width="0">
            <h1 class="h1_title">资产负债表</h1>
            <el-form-item prop="balanceSheetImg">
                <div class="children_div">
                    <!-- <upload-img 
                        :showImage="dataObj.balanceSheetImg?$store.state.user.ip+dataObj.balanceSheetImg:''" 
                        @uploadFuc="uploadFuc"
                        :type="{type:'balanceSheet'}"
                    /> -->
                    <upload-img 
                        :type="{type:'balanceSheet'}"
                        :more="true" 
                        :maxNumber="2" 
                        :imgList="balanceSheetImgList" 
                        @uploadFuc="uploadFuc" 
                        @delImg="delImg"
                    />
                </div>
            </el-form-item>
            <h1 class="h1_title">利润表</h1>
            <el-form-item prop="incomeStatementImg">
                <div class="children_div">
                    <!-- <upload-img 
                        :showImage="dataObj.incomeStatementImg?$store.state.user.ip+dataObj.incomeStatementImg:''" 
                        @uploadFuc="uploadFuc"
                        :type="{type:'incomeStatement'}"
                    /> -->
                    <upload-img 
                        :type="{type:'incomeStatement'}"
                        :more="true" 
                        :maxNumber="2" 
                        :imgList="incomeStatementImgList" 
                        @uploadFuc="uploadFuc" 
                        @delImg="delImg"
                    />
                </div>
            </el-form-item>
            <h1 class="h1_title">现金流表</h1>
            <el-form-item prop="cashFlowImg">
                <div class="children_div">
                    <!-- <upload-img 
                        :showImage="dataObj.cashFlowImg?$store.state.user.ip+dataObj.cashFlowImg:''" 
                        @uploadFuc="uploadFuc"
                        :type="{type:'cashFlow'}"
                    /> -->
                    <upload-img 
                        :type="{type:'cashFlow'}"
                        :more="true" 
                        :maxNumber="2" 
                        :imgList="cashFlowImgList" 
                        @uploadFuc="uploadFuc" 
                        @delImg="delImg"
                    />
                </div>
            </el-form-item>
            <h1 class="h1_title">财务报表</h1>
            <el-form-item prop="financialStatementsImg">
                <div class="children_div">
                    <!-- <upload-img 
                        :showImage="dataObj.financialStatementsImg?$store.state.user.ip+dataObj.financialStatementsImg:''" 
                        @uploadFuc="uploadFuc"
                        :type="{type:'financialStatements'}"
                    /> -->
                    <upload-img 
                        :type="{type:'financialStatements'}"
                        :more="true" 
                        :maxNumber="2" 
                        :imgList="financialStatementsImgList" 
                        @uploadFuc="uploadFuc" 
                        @delImg="delImg"
                    />
                </div>
            </el-form-item>
        </el-form>
        <div class="next_btn">
            <el-button type="primary" size="medium" @click="nextFuc">下一步</el-button>
            <el-button type="primary" size="medium" @click="resetFin">重置</el-button>
        </div>
    </div>
</template>

<script>
import UploadImg from '@/components/UploadImg/uploadImg'
import {upload,publishFinancial} from '@/api'
import {mapState} from 'vuex'
export default {
    components:{
        UploadImg,
    },
    computed:{
        ...mapState({
            projectId:state => state.data.companyId
        })
    },
    data(){
        return{

            balanceSheetImgList:[],  //资产负债
            incomeStatementImgList:[],  //利润表
            cashFlowImgList:[],   //现金流表
            financialStatementsImgList:[],   //财务报表

            dataObj:{
                projectId:"",
                balanceSheetImg:[],  //资产负债
                incomeStatementImg:[],  //利润表
                cashFlowImg:[],   //现金流表
                financialStatementsImg:[],   //财务报表
            }
        }
    },
    methods:{
        nextFuc(){
            if(this.projectId){
                this.dataObj.projectId = this.projectId
                publishFinancial(this.dataObj).then(res=>{
                    if(res && res.errorCode === 0){
                        this.$message({
                            showClose: true,
                            message: '财务情况保存成功,跳转到第六步',
                            type: 'success'
                        });
                        this.$router.push('/capitalConstitute')
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
        resetFin(){
            this.balanceSheetImgList=[],  //资产负债
            this.incomeStatementImgList=[],  //利润表
            this.cashFlowImgList=[],   //现金流表
            this.financialStatementsImgList=[],   //财务报表
            this.$refs.financialForm.resetFields();
        },
        uploadFuc(data,more,type){
            upload(data).then(res=>{
                if(res && res.errorCode === 0){
                    switch(type.type){
                        case 'balanceSheet':
                            // this.dataObj.balanceSheetImg=res.body.fileId
                            this.balanceSheetImgList.push(res.body.filePath);
                            this.dataObj.balanceSheetImg.push(res.body.fileId)
                        break;
                        case 'incomeStatement':
                            // this.dataObj.incomeStatementImg=res.body.fileId
                            this.incomeStatementImgList.push(res.body.filePath);
                            this.dataObj.incomeStatementImg.push(res.body.fileId)
                        break;
                        case 'cashFlow':
                            // this.dataObj.cashFlowImg=res.body.fileId
                            this.cashFlowImgList.push(res.body.filePath);
                            this.dataObj.cashFlowImg.push(res.body.fileId)
                        break;
                        case 'financialStatements':
                            // this.dataObj.financialStatementsImg=res.body.fileId
                            this.financialStatementsImgList.push(res.body.filePath);
                            this.dataObj.financialStatementsImg.push(res.body.fileId)
                        break;
                    }
                }
            })
        },
        delImg(index,type){
            switch(type.type){
                case 'balanceSheet':
                    this.balanceSheetImgList.splice(index,1);
                    this.dataObj.balanceSheetImg.splice(index,1)
                break;
                case 'incomeStatement':
                    this.incomeStatementImgList.splice(index,1);
                    this.dataObj.incomeStatementImg.splice(index,1)
                break;
                case 'cashFlow':
                    this.cashFlowImgList.splice(index,1);
                    this.dataObj.cashFlowImg.splice(index,1)
                break;
                case 'financialStatements':
                    this.financialStatementsImgList.splice(index,1);
                    this.dataObj.financialStatementsImg.splice(index,1)
                break;
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.financialState{
    padding 30px 88px;
    .h1_title{
        color #1f2f3d;
        width 133px;
        font-size 18px;
        font-weight bold;
        padding 0 12px 23px 0;
        box-sizing border-box;
    }
    .children_div{
        padding-left 40px;
        padding-bottom 40px;
    }
    .next_btn{
        width 600px;
        padding 50px 0 88px;
        text-align center;
    }
}
</style>
