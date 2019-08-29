<template>
    <div class="userList">
        <div class="screening">
            <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
                <el-form-item label="状态：">
                    <el-select v-model="tableObj.status" @change="changeFuc('page',1)" placeholder="请选择">
                        <el-option v-for="item in initSelectData.userStatu" :key="item.code" :label="item.text" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input  @keyup.enter.native="changeFuc('page',1)" placeholder="搜索手机号" v-model="tableObj.keyWord" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loadingBtn" @click="changeFuc('page',1)">查&nbsp;询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <table-list :tableTitle="tableHeader" :tableData="tableData" @changeFuc="changeFuc" @operation="operation"/>
    
        <user-dialog ref="previewDialog" @submitFuc="submitFuc"/>
        <user-edit-dialog ref="editDialog" @changeFuc="changeFuc"/>
    </div>
</template>

<script>
import allTableHeader from '@/files/js/tableHeader'
import TableList from '@/components/Table/table'
import {userStatu} from '@/files/js/initData'
import {userFilter,userManageDtl,userDelete,individualAuth,bizAuth,FAAuth} from '@/api'
import UserDialog from '@/components/User/dialog/userDialog'
import UserEditDialog from '@/components/User/dialog/userEditDialog'
export default {
    components:{
        TableList,
        UserDialog,
        UserEditDialog
    },
    data(){
        return{
            initSelectData:{
                userStatu
            },

            loadingBtn:false,

            tableData:{},
            tableHeader:allTableHeader.userListHeader,
            tableObj:{
                keyWord:"",
                status:null,
                pageSize: 8,
                startPage: 1,
            },
        }
    },
    activated(){
        this.changeFuc()
    },
    methods:{
        //按钮操作
        operation(type,data){
            switch(type){
                case 'del':
                    this.$confirm('确定删除该用户?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        userDelete({id:data.id}).then(res=>{
                            if(res.errorCode === 0){
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
                            message: '已取消发布'
                        });          
                    });
                break;
                case 'look':
                    this.userLook(data.id,type);
                break;
                case 'edit':
                    this.userLook(data.id,type)
                break;
                case 'individual':
                    this.userLook(data.id,type)
                break;
                case 'biz':
                    this.userLook(data.id,type)
                break;
                case 'fa':
                    this.userLook(data.id,type)
                break;
            }
        },
        //审核提交
        submitFuc(type,data){
            if(type =='individual'){
                individualAuth(data).then(res=>{
                    if(res.errorCode === 0){
                        this.changeFuc();
                        this.$refs.previewDialog.closeFuc();
                         this.$message({
                            showClose: true,
                            message: '提交成功',
                            type: 'success'
                        });
                    }
                })
            }
            if(type =='biz'){
                bizAuth(data).then(res=>{
                    if(res.errorCode === 0){
                        this.changeFuc();
                        this.$refs.previewDialog.closeFuc();
                         this.$message({
                            showClose: true,
                            message: '提交成功',
                            type: 'success'
                        });
                    }
                })
            }
            if(type =='fa'){
                FAAuth(data).then(res=>{
                    if(res.errorCode === 0){
                        this.changeFuc();
                        this.$refs.previewDialog.closeFuc();
                         this.$message({
                            showClose: true,
                            message: '提交成功',
                            type: 'success'
                        });
                    }
                })
            }
        },
        userLook(id,type){
            userManageDtl({id}).then(res=>{
                if(res.errorCode === 0){
                    if( type == 'look' || type == 'individual' || type == 'biz' || type == 'fa'){
                        this.$refs.previewDialog.showDialogFuc(type,res.body)
                    }
                    if( type == 'edit'){
                        this.$refs.editDialog.showDialogFuc(res.body)
                    }
                    
                }
            })
        },
        changeFuc(type,value){
            this.loadingBtn=true
            if(type =='page'){
                this.tableObj.startPage = value;
            }
            userFilter(this.tableObj).then(res=>{
                if(res.errorCode === 0){
                    this.loadingBtn = false
                    this.tableData = res.body
                }
            })
        },
    }
}
</script>

<style lang="stylus" scoped>
.userList{
    .screening{
        padding 30px;
    }
    .el-form>>>.el-form-item{
        margin-bottom 0;
    }
}
</style>
