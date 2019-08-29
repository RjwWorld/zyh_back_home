<template>
    <div class="projectList">
        <div class="screening">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="项目类别：">
                   <el-select v-model="tableObj.projectTypeCode"  @change="changeFuc('page',1)" placeholder="请选择">
                        <el-option v-for="item in initSelectData.projectClassList" :key="item.code" :label="item.text" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-select v-model="tableObj.status" @change="changeFuc('page',1)" placeholder="请选择">
                        <el-option v-for="item in initSelectData.projectStatu" :key="item.code" :label="item.text" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input  @keyup.enter.native="changeFuc('page',1)" placeholder="编号、项目名称" v-model="tableObj.keyWord" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loadingBtn" @click="changeFuc('page',1)">查&nbsp;询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <table-list :tableTitle="tableHeader" :tableData="tableData" @changeFuc="changeFuc" @operation="operation"/>

        <project-dialog ref="previewDialog" @submitFuc="submitFuc"/>
        <project-edit-dialog ref="editDialog" @changeFuc="changeFuc"/>
    </div>
</template>

<script>
import allTableHeader from '@/files/js/tableHeader'
import TableList from '@/components/Table/table'
import {projectClassList,projectStatu} from '@/files/js/initData'
import {tanTinvolvedDomainV2,tanTinvolvedDomainV2Type} from '@/files/js/tanTInvolvedDomain'
import {projectList,projectStatus,projectDtlAppend,deleteProject,pubProjectInit} from '@/api'
import ProjectDialog from '@/components/Project/dialog/projectDialog'
import ProjectEditDialog from '@/components/Project/dialog/projectEditDialog'
import {cloneObj} from '@/files/js/cloneObj'
import {findCode,findCodeArr,sortArr} from '@/files/js/findCode'
export default {
    components:{
        TableList,
        ProjectDialog,
        ProjectEditDialog
    },
    data(){
        return{
            loadingBtn:false,
            initData:{
                myPreferenceInitRespVO:{},
                pubProjectBaseInitRespVO:{},
                pubProjectAInitRespVO:{},
                pubProjectBInitRespVO:{},
                pubProjectCInitRespVO:{},
                tagInfList:[]
            },
            initSelectData:{
                projectClassList,
                projectStatu
            },

            tableData:{},
            tableHeader:allTableHeader.projectHeader,
            tableObj:{
                keyWord:'',
                status:null,
                projectTypeCode: null,
                pageSize: 8,
                startPage: 1,
                type: 0
            },
        }
    },
    activated(){
        this.initWeb();
    },
    methods:{
        //按钮操作
        operation(type,data){
            let obj;
            switch(type){
                case 'up':
                    obj = {
                        projectId:data.projectId,
                        projectType:0,
                        status:2
                    }
                    this.$confirm('确定上架该项目?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(() => {
                        projectStatus(obj).then(res=>{
                            if(res && res.errorCode === 0){
                                this.changeFuc();
                                this.$message({
                                    showClose: true,
                                    message: '上架成功',
                                    type: 'success'
                                });
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消操作'
                        });
                    });
                break;
                case 'down':
                    obj = {
                        projectId:data.projectId,
                        projectType:0,
                        status:0
                    }
                    this.$confirm('确定下架该项目?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(() => {
                        projectStatus(obj).then(res=>{
                            if(res && res.errorCode === 0){
                                this.changeFuc();
                                this.$message({
                                    showClose: true,
                                    message: '下架成功',
                                    type: 'success'
                                });
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消操作'
                        });
                    });
                break;
                case 'del':
                    this.$confirm('确定删除该项目?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        deleteProject({projectId:data.projectId}).then(res=>{
                            if(res && res.errorCode === 0){
                                this.changeFuc();
                                this.$message({
                                    showClose: true,
                                    message: '删除成功',
                                    type: 'success'
                                });
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消操作'
                        });
                    });
                break;
                case 'audit':
                    this.projectLook(data.projectId,type)
                break;
                case 'edit':
                    this.projectLook(data.projectId,type)
                break;
                case 'look':
                    this.projectLook(data.projectId,type)
                break;
            }
        },
        //审核提交
        submitFuc(data){
            // console.log(data)
            projectStatus(data).then(res=>{
                if(res.errorCode === 0){
                    this.changeFuc();
                    this.$refs.previewDialog.resetForm();
                    this.$refs.previewDialog.closeFuc();

                    if(res.body.isReward === 1){
                        this.$confirm('是否到邀请奖励页面发放奖励?', '提交成功', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'success',
                            center: true
                        }).then(() => {
                            this.$router.push('/inviteRewardList')
                        }).catch(() => {

                        });
                    }
                    else{
                        this.$message({
                            showClose: true,
                            message: '提交成功',
                            type: 'success'
                        });
                    }

                }
            }).catch(()=>{
                this.$refs.previewDialog.closeLoadingFuc();
            })
        },
        //点击查看、审核、修改
        projectLook(projectId,type){
            projectDtlAppend({projectId}).then(res=>{
                if(res.errorCode === 0){
                    let projectData;
                    if(res.body.projectOneARespVO){
                        projectData = res.body.projectOneARespVO
                    }
                    if(res.body.projectOneBRespVO){
                        projectData = res.body.projectOneBRespVO
                    }
                    if(res.body.projectOneCRespVO){
                        projectData = res.body.projectOneCRespVO
                    }
                    //这里数据已经处理好
                    if(type =='audit' || type == 'look'){
                        let data = this.previewFuc(projectData)
                        this.$refs.previewDialog.showDialogFuc(type,data);

                    }
                    if(type == 'edit'){
                        this.$refs.editDialog.showDialogFuc(projectData,this.initData);
                        console.log(projectData,this.initData)
                    }
                }
            })
        },
        previewFuc(data){
            let modelReqVO ={}
            modelReqVO = cloneObj(data)
            this.modelReqVOFuc(data.projectTypeCode,modelReqVO,data)
            //将父对象数据转化
            if(modelReqVO.involvedDomain){
                modelReqVO.involvedDomain=findCode(this.initData.myPreferenceInitRespVO.domainList,data.involvedDomain)
                }
            modelReqVO.projectRequirement=findCode(this.initData.pubProjectBaseInitRespVO.projectRequirementList,data.projectRequirement)
            if(modelReqVO.involvedDomainV2){modelReqVO.involvedDomainV2=findCode(tanTinvolvedDomainV2,data.involvedDomainV2)}
            //return出处理好的数据
            return modelReqVO
        },
        //将对象数据转化函数
        modelReqVOFuc(code,data,oldData){
            //探探版领域
            Object.keys(tanTinvolvedDomainV2Type).forEach((key)=>{
                if(key.indexOf(oldData.involvedDomainV2) == 0){
                    if(data.domainSubCategory){data.domainSubCategory = findCode(tanTinvolvedDomainV2Type[key],oldData.domainSubCategory)}
                }
            })
            let Ainit = this.initData.pubProjectAInitRespVO
            let Binit = this.initData.pubProjectBInitRespVO
            let Cinit = this.initData.pubProjectCInitRespVO
            //这是A类
            if(code === 1000){
                if(data.category){data.category = findCode(Ainit.assetCategoryList,oldData.category)}
                if(data.ownerProperty){data.ownerProperty = findCode(Ainit.ownerPropertyList,oldData.ownerProperty)}
                if(data.currentPurpose){data.currentPurpose = findCode(Ainit.usePurposeList,oldData.currentPurpose)}
                if(data.planPurpose){data.planPurpose = findCode(Ainit.usePurposeList,oldData.planPurpose)}
                if(data.nature){data.nature = findCode(Ainit.natureList,oldData.nature)}
                if(data.transferForm){data.transferForm = findCode(Ainit.transferFormList,oldData.transferForm)}
                if(data.changeApartment || data.changeApartment === 0){data.changeApartment = findCode(Ainit.yesOrNoList,oldData.changeApartment)}
                if(data.makeLoans || data.makeLoans === 0){data.makeLoans = findCode(Ainit.yesOrNoList,oldData.makeLoans)}
                if(data.ownedStatus || data.ownedStatus === 0){data.ownedStatus = findCode(Ainit.hasOrNotList,oldData.ownedStatus)}
                if(data.pledgeStatus || data.pledgeStatus === 0){data.pledgeStatus = findCode(Ainit.hasOrNotList,oldData.pledgeStatus)}
                if(data.hasUsePriority || data.hasUsePriority === 0){
                    data.hasUsePriority = findCode(Ainit.yesOrNoList,oldData.hasUsePriority)
                }
            }
            //这是B类
            if(code === 2000){
                if(data.isTroublesome || data.isTroublesome === 0){data.isTroublesome = findCode(Binit.yesOrNoList,oldData.isTroublesome)}
                if(data.landNature){data.landNature = findCode(Binit.landNatureList,oldData.landNature)}
                if(data.peripheralMatchingList){data.peripheralMatchingList=findCodeArr(Binit.peripheralMatchingList,oldData.peripheralMatchingList)}
                if(data.devUncertainFactorsList){data.devUncertainFactorsList=findCodeArr(Binit.devUncertainFactorsList,oldData.devUncertainFactorsList)}
                if(data.transferMode){data.transferMode = findCode(Binit.transferModeList,oldData.transferMode)}
                if(data.isClean || data.isClean === 0){data.isClean = findCode(Binit.yesOrNoList,oldData.isClean)}
                if(data.transferMethod){
                    data.transferMethod = findCode(Binit.transferMethodList,oldData.transferMethod)
                }
            }
            //这是C类
            if(code === 3000){
                if(data.establishTime){
                    var time = new Date(oldData.establishTime);
                    var Y = time.getFullYear() + '-';
                    var M = (time.getMonth()+1 < 10 ? '0'+(time.getMonth()+1) : time.getMonth()+1) + '-';
                    var D = time.getDate() + '';
                    data.establishTime =Y+M+D;
                }
                if(data.economicType){
                    data.economicType = findCode(Cinit.economicTypeList,oldData.economicType)
                }
                if(data.comType){
                    data.comType = findCode(Cinit.companyTypeList,oldData.comType)
                }
                if(data.manageScale){
                    data.manageScale = findCode(Cinit.manageScaleList,oldData.manageScale)
                }
                if(data.dealPayMethod){
                    data.dealPayMethod = findCode(Cinit.dealPayMethodList,oldData.dealPayMethod)
                }
                if(data.employeeContinue || data.employeeContinue === 0){
                    data.employeeContinue = findCode(Cinit.yesOrNoList,oldData.employeeContinue)
                }
                if(data.renewRequire || data.renewRequire === 0){
                    data.renewRequire = findCode(Cinit.yesOrNoList,oldData.renewRequire)
                }
                if(data.serviceRequire || data.renewRequire === 0){
                    data.serviceRequire = findCode(Cinit.yesOrNoList,oldData.serviceRequire)
                }
                if(data.transfereeConditionList){
                    data.transfereeConditionList=findCodeArr(Cinit.transferConditionList,oldData.transfereeConditionList)
                }
            }
        },
        changeFuc(type,value){
            this.loadingBtn = true;
            if(type == 'page'){
                this.tableObj.startPage = value;
            }
            projectList(this.tableObj).then(res=>{
                if(res && res.errorCode == 0){
                    this.loadingBtn = false;
                    this.tableData = res.body
                }
            })
        },
        initWeb(){
            this.changeFuc();
            //初始化项目选项数据
            pubProjectInit({projectCategoryCode:0}).then(res=>{
                if(res && res.errorCode === 0){
                    this.initData=res.body
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.projectList{
    .screening{
        padding 30px;
    }
    .el-form>>>.el-form-item{
        margin-bottom 0;
    }
}
</style>
