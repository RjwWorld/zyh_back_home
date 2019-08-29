<template>
    <div class="inviteReward">
        <div class="box"></div>
        <table-list :tableTitle="tableHeader" :tableData="tableData" @changeFuc="changeFuc" @operation="operation"/>

        <el-dialog
            title="发放奖励"
            :visible.sync="showDialog"
            width="600px"
            center
        >
            <el-form :model="inviteObj" ref="invitForm" label-position="right" label-width="188px" size="medium " class="demo-ruleForm">
                <div class="input_box">
                    <el-form-item label="项目发布人奖励金额：" prop="accepterAmt">
                        <el-input type="text" v-model="inviteObj.accepterAmt">
                            <span slot="suffix">元</span>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="input_box">
                    <el-form-item label="邀请人奖励金额：" prop="inviterAmt">
                        <el-input type="text" v-model="inviteObj.inviterAmt">
                            <span slot="suffix">元</span>
                        </el-input>
                    </el-form-item>
                </div>
            </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取&nbsp;&nbsp;消</el-button>
            <el-button type="primary" @click="submitFuc">确&nbsp;&nbsp;定</el-button>
        </span>
        </el-dialog>

    </div>
</template>

<script>
import allTableHeader from '@/files/js/tableHeader'
import TableList from '@/components/Table/table'
import {getList,disReward} from '@/api'
export default {
    components:{
        TableList
    },
    data(){
        return{
            showDialog:false,

            tableData:{},
            tableHeader:allTableHeader.inviteRewardHeader,
            tableObj:{
                pageSize: 8,
                startPage: 1,
            },

            inviteObj:{
                id:"",
                accepterAmt:"",
                inviterAmt:""
            }
        }
    },
    activated(){
        this.changeFuc();
    },
    methods:{
        submitFuc(){
            disReward(this.inviteObj).then(res=>{
                if(res && res.errorCode === 0){
                    this.showDialog = false
                    this.changeFuc();
                    this.$message({
                        type: 'success',
                        message: `项目发布人发放奖励金额为${this.inviteObj.accepterAmt}元,邀请人发放奖励金额为${this.inviteObj.inviterAmt}元`
                    });
                    this.$refs.invitForm.resetFields();
                }
            })
        },
        //按钮操作
        operation(type,data){
            this.inviteObj.id = data.reWardId
            this.showDialog = true;
        },
        changeFuc(type,value){
            if(type == 'page'){
                this.tableObj.startPage = value;
            }
            getList(this.tableObj).then(res=>{
                if(res && res.errorCode == 0){
                    this.tableData = res.body
                }
            })
        },
    }
}
</script>

<style lang="stylus" scoped>
.inviteReward{
    .box{
        height 100px;
    }
    .input_box{
        width 333px;
    }
}
</style>
