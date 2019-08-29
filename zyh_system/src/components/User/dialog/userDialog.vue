<template>
    <div class="userDialog">
        <el-dialog
            :title="dialogType=='look'?'预览':'审核'"
            :visible.sync="showDialog"
            @close="closeFuc"
            width="1000px"
            center
        >
            <user-details :dataObj="dataObj" :type="dialogType"/>
            <el-form :model="auditObj" ref="audit_form" label-width="133px" v-if="dialogType != 'look'">
                <h1 class="h1_title">管理员审核</h1>
                <div class="form_div4">
                    <el-form-item label="审核结果：" prop="status">
                        <el-select v-model="auditObj.status" placeholder="请选择">
                        <el-option
                            v-for="item in auditArr"
                            :key="item.code"
                            :label="item.text"
                            :value="item.code"
                        >
                        </el-option>
                    </el-select>
                    </el-form-item>
                </div>
                <div class="form_div4">
                    <el-form-item label="审核说明：" prop="cause">
                        <el-input
                            type="textarea"
                            :rows="8"
                            placeholder="请输入审核说明"
                            v-model="auditObj.cause"
                        >
                        </el-input>
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer" v-if="dialogType != 'look'">
                <el-button type="primary" :loading="loadingBtn" @click="submitFuc">提&nbsp;交</el-button>
            </span>

        </el-dialog>
    </div>
</template>

<script>
import UserDetails from '@/components/User/dialog/userDetails'
export default {
    components:{
        UserDetails
    },
    data(){
        return{
            showDialog:false,
            dialogType:"",
            loadingBtn:false,
            auditArr:[{
                code:2,
                text:'通过'
            },{
                code:3,
                text:'不通过'
            }],
            dataObj:{},  //用户信息
            
            auditObj:{
                userId:"",
                authId:"",
                status:2,
                cause:""
            }
        }
    },
    methods:{
        showDialogFuc(type,data){
            this.dialogType = type;
            if(this.dialogType == 'individual'){
                this.auditObj.userId = data.userFilterRespVO.id
                this.auditObj.authId = data.individualAuthVO.id
            }
            if(this.dialogType =='biz'){
                this.auditObj.userId = data.userFilterRespVO.id
                this.auditObj.authId = data.bizAuthVO.id
            }
            if(this.dialogType =='fa'){
                this.auditObj.userId = data.userFilterRespVO.id
                this.auditObj.authId = data.faAuthRespVO.id
            }
            this.dataObj = data
            this.showDialog = true;
        },
        submitFuc(){
            this.loadingBtn = true;
            this.$emit('submitFuc',this.dialogType,this.auditObj)
        },
        closeFuc(){
            this.showDialog = false
            this.loadingBtn = false
            if(this.dialogType != 'look'){
                this.$refs.audit_form.resetFields()
            }
        },
    }
}
</script>

<style lang="stylus" scoped>
.userDialog{
    .h1_title{
        font-size 20px;
        padding-bottom 20px;
        text-align center;
    }
    .form_div4{
        width 500px;
        margin auto;
    }
}
</style>
