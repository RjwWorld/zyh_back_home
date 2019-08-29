<template>
<!-- 股权资金构成 -->
    <div class="capitalConstitute">
        <el-form :model="dataObj" ref="capitalForm" label-width="111px" size="medium" label-position="left">
            <h1 class="h1_title">基础资本框架</h1>
            <div class="children_div">
                <el-form-item prop="basicCapitalFramework" label-width="0">
                    <!-- <upload-img
                        :showImage="dataObj.basicCapitalFramework?$store.state.user.ip+dataObj.basicCapitalFramework:''"
                        @uploadFuc="uploadFuc"
                        :type="{type:'bas'}"
                    /> -->
                    <upload-img
                        :type="{type:'bas'}"
                        :more="true"
                        :maxNumber="2"
                        :imgList="basicCapitalFrameworkList"
                        @uploadFuc="uploadFuc"
                        @delImg="delImg"
                    />
                </el-form-item>
            </div>
            <h1 class="h1_title">未来股东计划</h1>
                <el-form-item prop="futureHolderPlan" label-width="0">
                    <table-list :tableTitle="tableHeader" :tableData="dataObj.futureHolderPlan" @addDialogFuc="addDialogFuc" @delFuc="delFuc"/>
                </el-form-item>
            <h1 class="h1_title">资本库</h1>
            <div class="children_div">
                <el-form-item label="1.资本库：" class="item_title"></el-form-item>
                <div class="form_div">
                    <el-form-item  prop="capitalLibrary" label-width="0">
                        <el-input
                            type="textarea"
                            :rows="6"
                            placeholder="请输入内容"
                            v-model="dataObj.capitalLibrary">
                        </el-input>
                    </el-form-item>
                </div>
                <el-form-item label="2.董秘：" class="item_title"></el-form-item>
                <div class="form_div">
                    <el-form-item  prop="chairmanSecretary" label-width="0">
                        <el-input
                            type="textarea"
                            :rows="6"
                            placeholder="请输入内容"
                            v-model="dataObj.chairmanSecretary">
                        </el-input>
                    </el-form-item>
                </div>
            </div>

            <h1 class="h1_title">财务指标</h1>
            <div class="children_div">
                <el-form-item label="1.财务节点：" class="item_title"></el-form-item>
                <div class="form_div">
                    <el-form-item prop="financialNode" label-width="0">
                        <!-- <upload-img
                            :showImage="dataObj.financialNode?$store.state.user.ip+dataObj.financialNode:''"
                            @uploadFuc="uploadFuc"
                            :type="{type:'fin'}"
                        /> -->
                        <upload-img
                            :type="{type:'fin'}"
                            :more="true"
                            :maxNumber="2"
                            :imgList="financialNodeList"
                            @uploadFuc="uploadFuc"
                            @delImg="delImg"
                        />
                    </el-form-item>
                </div>
                <el-form-item label="2.问题节点：" class="item_title"></el-form-item>
                <div class="form_div">
                    <el-form-item  prop="problemNode" label-width="0">
                        <el-input
                            type="textarea"
                            :rows="6"
                            placeholder="请输入内容"
                            v-model="dataObj.problemNode">
                        </el-input>
                    </el-form-item>
                </div>
            </div>
        </el-form>

        <el-dialog
            title="未来股东计划"
            :visible.sync="showDialog"
            @close="closeFuc"
            width="700px"
            center
        >
            <el-form ref="futureForm" :model="futureObj" label-width="111px">
                <div class="form_div">
                    <el-form-item label="股权占比：" prop="equityRatio">
                        <el-input v-model="futureObj.equityRatio" type="text" placeholder="股权占比"></el-input>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="预计融资金额：" prop="financingAmount">
                        <el-input v-model="futureObj.financingAmount" type="text" placeholder="预计融资金额"></el-input>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="融资时间：" prop="financingTime">
                        <el-date-picker
                            v-model="futureObj.financingTime"
                            value-format="yyyy-MM-dd"
                            :editable="false"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveFuc" size="medium">保&nbsp;&nbsp;存</el-button>
                <el-button type="primary" @click="resetFuc" size="medium">重&nbsp;&nbsp;置</el-button>
            </span>
        </el-dialog>

        <div class="next_btn">
            <el-button type="primary" size="medium" @click="nextFuc">下一步</el-button>
            <el-button type="primary" size="medium" @click="resetCapital">重置</el-button>
        </div>


    </div>
</template>

<script>
import UploadImg from '@/components/UploadImg/uploadImg'
import {upload,capitalComposition} from '@/api'
import {capitalHeader} from '@/components/EnterpriseData/table/tableHeader'
import TableList from '@/components/EnterpriseData/table/table'
import {cloneObj} from '@/files/js/cloneObj'
import {mapState} from 'vuex'
export default {
    components:{
        UploadImg,
        TableList,
    },
    computed:{
        ...mapState({
            projectId:state => state.data.companyId
        })
    },
    data(){
        return {
            showDialog:false,
            tableHeader:capitalHeader,


            basicCapitalFrameworkList:[],  //基础资本框架图
            financialNodeList:[],  //财务节点

            dataObj:{
                projectId:"",
                basicCapitalFramework:[],   //基础资本框架图
                futureHolderPlan:[],   //股东计划
                capitalLibrary:"",  //资本库
                chairmanSecretary:"",  //董秘
                financialNode:[],   //财务节点
                problemNode:"",   //问题节点
            },

            futureObj:{
                equityRatio:"",
                financingAmount:"",
                financingTime:""
            }
        }
    },
    methods:{
        delFuc(type,index){
            this.dataObj.futureHolderPlan.splice(index,1)
        },
        uploadFuc(data,more,type){
            upload(data).then(res=>{
                if(res && res.errorCode === 0){
                    switch(type.type){
                        case 'bas':
                            // this.dataObj.basicCapitalFramework = res.body.fileId
                            this.basicCapitalFrameworkList.push(res.body.filePath);
                            this.dataObj.basicCapitalFramework.push(res.body.fileId)
                        break;
                        case 'fin':
                            // this.dataObj.financialNode = res.body.fileId
                            this.financialNodeList.push(res.body.filePath);
                            this.dataObj.financialNode.push(res.body.fileId)
                        break
                    }
                }
            })
        },
        delImg(index,type){
            switch(type.type){
                case 'bas':
                    this.basicCapitalFrameworkList.splice(index,1);
                    this.dataObj.basicCapitalFramework.splice(index,1)
                break;
                case 'fin':
                    this.financialNodeList.splice(index,1);
                    this.dataObj.financialNode.splice(index,1)
                break
            }
        },
        addDialogFuc(){
            this.showDialog = true;
        },
        nextFuc(){
            if(this.projectId){
                this.dataObj.projectId = this.projectId
                capitalComposition(this.dataObj).then(res=>{
                    if(res && res.errorCode === 0){
                        this.$message({
                            showClose: true,
                            message: '资金构成保存成功,跳转到第七步',
                            type: 'success'
                        });
                        this.$router.push('/businessModel')
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
        saveFuc(){
            let obj = cloneObj(this.futureObj)
            this.dataObj.futureHolderPlan.push(obj)
            this.closeFuc();
        },
        resetFuc(){
            this.basicCapitalFrameworkList=[],  //基础资本框架图
            this.financialNodeList=[],  //财务节点
            this.$refs.futureForm.resetFields();
        },
        closeFuc(){
            this.showDialog = false
            this.resetFuc();
        },
        resetCapital(){
            this.$refs.capitalForm.resetFields();
        }
    }
}
</script>

<style lang="stylus" scoped>
.capitalConstitute{
    padding 30px 88px;
    .h1_title{
        font-size 18px;
        font-weight bold;
        padding 0 12px 23px 0;
        box-sizing border-box;
        color black;
    }
    .item_title{
        margin-bottom 6px;
        >>> .el-form-item__label{
            color black;
            // font-size 16px;
        }
    }
    .children_div{
        padding-left 40px;
    }
    .form_div{
        width 388px;
    }
    .next_btn{
        width 600px;
        padding 50px 0 88px;
        text-align center;
    }
    >>>.el-dialog{
        .el-form{
            width 388px;
            margin auto;
        }
    }
}
</style>
