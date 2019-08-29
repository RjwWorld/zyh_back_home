<template>
    <div class="addMsgDialog">
        <el-dialog
            :title="dialogType == 'add' ? '新增' : '修改'"
            :visible.sync="showDialog"
            width="800px"
            @close="closeFuc"
            center>
            <el-form :model="formObj" label-position="left" label-width="111px" size="small" ref="msgForm">
                <el-form-item label="推送类型：" prop="pushType">
                    <el-select v-model="formObj.pushType" placeholder="请选择" @change="formObj.projectNo = formObj.pushType === 2 ? formObj.projectNo : ''">
                        <el-option
                            v-for="item in msgPushList"
                            :key="item.code"
                            :label="item.text"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接收对象：" prop="accType">
                    <el-radio-group v-model="formObj.accType" @change="formObj.acceptObject = formObj.accType === 2 ? formObj.acceptObject:''">
                        <el-radio :label="1">全部用户</el-radio>
                        <el-radio :label="2">
                            <el-input v-model="formObj.acceptObject" size="mini" :disabled="formObj.accType === 1" placeholder="请输入手机号" maxlength="11"></el-input>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="项目编号：" v-if="formObj.pushType === 2" prop="projectNo">
                    <el-input v-model="formObj.projectNo" placeholder="请输入交易成功项目编号" maxlength="4"></el-input>
                </el-form-item>
                <el-form-item label="标题：" prop="pushTitle">
                    <el-input v-model="formObj.pushTitle" placeholder="推送消息标题" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="详情：" prop="pushDetails">
                    <el-input
                        type="textarea"
                        :rows="6"
                        placeholder="请输入推送内容"
                        maxlength="200"
                        v-model="formObj.pushDetails">
                    </el-input>
                </el-form-item>
                <el-form-item label="跳转链接URL：" prop="pushUrl">
                    <el-input v-model="formObj.pushUrl" placeholder="url"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button v-if="dialogType == 'add'" type="primary" @click="addFuc" size="medium" :loading="loadingBtn">增&nbsp;加</el-button>
                <el-button v-if="dialogType == 'edit'" type="primary" @click="addFuc" size="medium" :loading="loadingBtn">修&nbsp;改</el-button>
                <!-- <el-button @click="resetFuc" size="medium" v-if="dialogType == 'add'">重&nbsp;置</el-button> -->
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {msgPushList} from '@/files/js/initData'
import {cloneObj} from '@/files/js/cloneObj'
import {insert,getById,msgModify} from '@/api'
export default {
    data(){
        return{
            msgPushList,
            dialogType:'',
            showDialog:false,

            loadingBtn:false,

            formObj:{
                pushType:1,  //推送类型
                accType:1,
                acceptObject:'',        //接收对象
                projectNo:'',   //项目编号
                pushTitle:'',  //标题
                pushDetails:'',  //详情,
                pushUrl:'',  //跳转链接url
            }
        }
    },
    methods:{
        addFuc(){
            if(this.formObj.accType === 1){
                this.formObj.acceptObject = '全部用户'
            }
            if(this.dialogType == 'add'){
                this.loadingBtn = true;
                insert(this.formObj).then(res=>{
                    if(res && res.errorCode === 0){
                        this.showDialog = false
                        this.$emit('changeFuc')
                        this.$message({
                            showClose: true,
                            message: '添加成功',
                            type: 'success'
                        });
                    }
                    this.loadingBtn = false
                })
            }
            if(this.dialogType == 'edit'){
                this.$confirm('确定修改这条推送消息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loadingBtn = true;
                    msgModify(this.formObj).then(res=>{
                        if(res && res.errorCode === 0){
                            this.showDialog = false
                            this.$emit('changeFuc')
                            this.$message({
                                showClose: true,
                                message: '修改成功',
                                type: 'success'
                            });
                        }
                        this.loadingBtn = false
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    });
                })
            }

        },
        showDialogFuc(type,data){
            this.loadingBtn = false;
            this.dialogType = type;
            if(type == 'edit'){
                getById({id:data.id}).then(res=>{
                    if(res && res.errorCode === 0){
                        this.formObj = res.body;
                        if(this.formObj.accType === 1){
                            this.formObj.acceptObject ="";
                        }
                        this.showDialog = true;
                    }
                })
            }
            else{
                this.showDialog = true;
            }
        },
        closeFuc(){
            this.formObj = {
                pushType:1,  //推送类型
                accType:1,
                acceptObject:'',        //接收对象
                projectNo:'',   //项目编号
                pushTitle:'',  //标题
                pushDetails:'',  //详情,
                pushUrl:'',  //跳转链接url
            }
            this.loadingBtn =false;
        },
    }
}
</script>

<style lang="stylus" scoped>
.addMsgDialog{
    >>>.el-dialog{
        .el-form{
            width 433px;
            margin auto;
        }
    }
}
</style>
