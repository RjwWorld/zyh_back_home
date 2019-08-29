<template>
    <div class="msgPush">
        <div class="screening">
            <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
                <el-form-item>
                    <el-input  @keyup.enter.native="changeFuc('page',1)" placeholder="项目编号、项目名称" v-model="tableObj.keyWord" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loadingBtn" @click="changeFuc('page',1)">查&nbsp;询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="$refs.addEditDialog.showDialogFuc('add')">新增消息</el-button>
                </el-form-item>
            </el-form>
        </div>
        <table-list :tableTitle="tableHeader" :tableData="tableData" @changeFuc="changeFuc" @operation="operation"/>
        <add-msg-dialog ref="addEditDialog" @changeFuc="changeFuc"/>
    </div>
</template>

<script>
import allTableHeader from '@/files/js/tableHeader'
import TableList from '@/components/Table/table'
import AddMsgDialog from '@/components/MsgPush/addMsgDialog'
import {list,delById,sendMessage} from '@/api'
export default {
    components:{
        TableList,
        AddMsgDialog
    },
    data(){
        return{
            loadingBtn:false,

            tableData:{},
            tableHeader:allTableHeader.msgPushHeader,
            tableObj:{
                keyWord:'',
                pageSize: 8,
                startPage: 1,
            },
        }
    },
    created(){
        this.changeFuc()
    },
    methods:{
        operation(type,data){
            // console.log(type,data)
            switch(type){
                case 'edit':
                    this.$refs.addEditDialog.showDialogFuc('edit',data)
                break;
                case 'push':
                    this.$confirm('确定推送该信息?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(() => {
                        sendMessage({id:data.id}).then(res=>{
                            if(res && res.errorCode === 0){
                                this.changeFuc();
                                this.$message({
                                    type: 'success',
                                    message:'推送成功'
                                });  
                            }
                        })
                    }).catch(()=>{
                        this.$message({
                            type: 'info',
                            message:'取消推送'
                        });
                    })
                break;
                case 'del':
                    this.$confirm('确定删除该信息?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        delById({id:data.id}).then(res=>{
                            if(res && res.errorCode === 0){
                                this.changeFuc('page',1);
                                this.$message({
                                    type: 'success',
                                    message:'删除成功'
                                });  
                            }
                        })
                    }).catch(()=>{
                        this.$message({
                            type: 'info',
                            message:'取消删除'
                        });   
                    })
                        break
                    }
        },
        changeFuc(type,value){
            this.loadingBtn = true
            if(type == 'page'){
                this.tableObj.startPage = value
            }
            list(this.tableObj).then(res=>{
                console.log(res)
                if(res && res.errorCode === 0){
                    this.loadingBtn = false;
                    this.tableData = res.body
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.msgPush{
    .screening{
        padding 30px;
    }
    .el-form>>>.el-form-item{
        margin-bottom 0;
    }
}
</style>
