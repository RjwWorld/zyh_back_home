<template>
    <div class="allCommentsDialog">
        <el-dialog
            :title="'全部评论（'+tableData.rows+'）'"
            :visible.sync="showDialog"
            width="666px"
            center>
            <div>
                <div class="contentBox" v-for="(item,index) in tableData.commentList" :key="index">
                    <div class="header">
                        <img :src="item.simpleUserInf.avatar" alt="">
                        <span class="name">{{item.simpleUserInf.nickName}}</span>
                        <span>{{item.creTime}}</span>
                    </div>
                    <div class="text">{{item.content}}</div>
                    <div class="del_button">
                        <el-button size="medium" type="text" @click="delComments(item.commentId)">删除</el-button>
                    </div>
                </div>
                <div class="page_btn">
                    <el-pagination
                        @current-change="changeFuc"
                        :current-page.sync="tableData.pageNum"
                        background
                        :page-size="6"
                        layout="total, prev, pager, next, jumper"
                        :total="tableData.rows"
                    >
                    </el-pagination>
                </div>
            </div>
            <span slot="footer">
                <el-button size="medium" type="primary" @click="showDialog = false">关&nbsp;闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {commentList,delComment} from '@/api'
export default {
    data(){
        return{
            showDialog:false,
            tableData:{},
            tableObj:{
                projectId:'',
                pageSize:6,
                startPage:1
            },
        }
    },
    methods:{
        showDialogFuc(id){
            this.tableObj.projectId = id
            this.changeFuc(1);

        },
        delComments(id){
            this.$confirm('确定删除该评论', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delComment({id}).then(res=>{
                    if(res && res.errorCode === 0){
                        this.changeFuc(1)
                        this.$emit('refresh')
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        changeFuc(value){
            if(value){
                this.tableObj.startPage = value
            }
            commentList(this.tableObj).then(res=>{
                if(res && res.errorCode === 0){
                    this.tableData = res.body
                    if(res.body.rows > 0){
                        this.showDialog = true;
                    }
                    else{
                        this.showDialog = false
                    }
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.allCommentsDialog{
    .contentBox{
        border-bottom 2px solid #f2f2f2;
        padding 20px 10px;
        .header{
            height 70px;
            display flex;
            align-items center;
            .name{
                color black;
                margin-left 20px;
                flex 1;
                font-size 16px;
                font-weight bold;
            }
            img{
                width 70px;
                height 70px;
                border-radius 50%;
            }
        }
        .text{
            padding-top 20px;
            line-height 30px;
            letter-spacing .5px;
            font-size 16px;
            color #7a7a7a;
        }
        .del_button{
            text-align right;
        }
    }
    .page_btn{
        padding-top 30px;
        text-align center;
    }
    >>>.el-dialog__title{
        font-size 24px;
        line-height 30px;
    }
}
</style>
