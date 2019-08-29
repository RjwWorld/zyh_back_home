<template>
    <div class="comments">
        <div class="screening">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="项目类别：">
                   <el-select v-model="tableObj.projectTypeCode"  @change="changeFuc('page',1)" placeholder="请选择">
                        <el-option v-for="item in initSelectData.projectClassList" :key="item.code" :label="item.text" :value="item.code"></el-option>
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
        <all-comments-dialog ref="allCommentsDialog" @refresh="changeFuc"/>
    </div>
</template>

<script>
import allTableHeader from '@/files/js/tableHeader'
import TableList from '@/components/Table/table'
import AllCommentsDialog from '@/components/Comments/allCommentsDialog'
import {projectClassList} from '@/files/js/initData'
import {projectCommList,modifyCommentStatus} from '@/api'
export default {
    components:{
        TableList,
        AllCommentsDialog
    },
    data(){
        return{
            loadingBtn:false,
            initSelectData:{
                projectClassList,
            },
            tableData:{},
            tableHeader:allTableHeader.commentsHeader,
            tableObj:{
                keyWord:'',
                projectTypeCode: null,
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
            // console.log(data)
            let obj;
            switch(type){
                case 'open':
                    obj = {
                        id:data.id,
                        isComment:1
                    }
                    this.$confirm('确定开启该项目评论?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(() => {
                        modifyCommentStatus(obj).then(res=>{
                            if(res && res.errorCode === 0){
                                this.changeFuc();
                                this.$message({
                                    showClose: true,
                                    message: '开启成功',
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
                case 'close':
                    obj = {
                        id:data.id,
                        isComment:0
                    }
                    this.$confirm('确定关闭该项目评论?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(() => {
                        modifyCommentStatus(obj).then(res=>{
                            if(res && res.errorCode === 0){
                                this.changeFuc();
                                this.$message({
                                    showClose: true,
                                    message: '关闭成功',
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
                case 'look':
                    if(data.commentSum > 0){
                        this.$refs.allCommentsDialog.showDialogFuc(data.id)
                    }
                break;
            }
        },
        changeFuc(type,value){
            
            this.loadingBtn = true;
            if(type == 'page'){
                this.tableObj.startPage = value;
            }
            projectCommList(this.tableObj).then(res=>{
                if(res && res.errorCode === 0){
                    this.loadingBtn = false;
                    this.tableData = res.body
                }
            })
        },
    }
}
</script>

<style lang="stylus" scoped>
.comments{
    .screening{
        padding 30px;
    }
    .el-form>>>.el-form-item{
        margin-bottom 0;
    }
}
</style>
