<template>
<!-- 项目列表管理员审核 -->
    <div class="projectDialog">
        <el-dialog
            :title="dialogType=='audit'?'审核':'查看预览'"
            :visible.sync="showDialog"
            @close="closeFuc"
            width="1000px"
            center
        >
            <project-details :dataObj="dataObj"/>

            <el-form :model="auditObj" ref="audit_form" label-width="133px" v-if="dialogType == 'audit'">
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
                  <el-form-item label="权重：" prop="homeRecommend">
                    <el-input-number size="mini" v-model='auditObj.homeRecommend' :min="0" :max="100">
                    </el-input-number>
                  </el-form-item>
                </div>
                <div class="form_div4">
                    <el-form-item label="审核说明：" prop="cause">
                        <el-input
                            type="textarea"
                            :rows="6"
                            placeholder="请输入审核说明"
                            v-model="auditObj.cause"
                        >
                        </el-input>
                    </el-form-item>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer" v-if="dialogType == 'submit'">
                <el-button type="primary" @click="submitFuc" :loading="loadingBtn">提&nbsp;交</el-button>
            </span>
            <span slot="footer" class="dialog-footer" v-if="dialogType == 'audit'">
                <el-button type="primary" :loading="loadingBtn" @click="submitFuc">提&nbsp;交</el-button>
            </span>

        </el-dialog>
    </div>
</template>

<script>
import ProjectDetails from '@/components/Project/dialog/projectDetails'
export default {
    components:{
        ProjectDetails
    },
    data(){
        return{
            dialogType:"",
            showDialog:false,
            loadingBtn:false,
            dataObj:{},
            auditArr:[{
                code:2,
                text:'通过'
            },{
                code:3,
                text:'不通过'
            }],
            auditObj:{
                projectType:0,
                projectId:"",
                status:2,
                cause:"",
                homeRecommend:0,
            },
        }
    },
    methods:{
        showDialogFuc(type,showData){
            this.dialogType = type
            if(this.dialogType == 'audit'){
                this.auditObj.projectId = showData.id
            }
            this.dataObj = showData
            this.showDialog= true;
        },
        closeFuc(){
            this.showDialog= false;
            this.loadingBtn=false;
        },
        closeLoadingFuc(){
            this.loadingBtn=false;
        },
        submitFuc(){
            if(this.dialogType =='submit'){
                this.$confirm('确定发布该项目?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.loadingBtn=true;
                    this.$emit('subFuc')
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消发布'
                    });
                });
            }
            if(this.dialogType =='audit'){
                console.log(this.dialogType)
                this.loadingBtn=true;
                this.$emit('submitFuc',this.auditObj)
            }
        },
        resetForm(){
            this.showDialog= false;
            this.$refs.audit_form.resetFields();
        }
    }
}
</script>

<style lang="stylus" scoped>
.projectDialog{
    .baseInfo{
        padding 30px;
        .tag_div{
            .el-tag + .el-tag {
                margin-left: 10px;
            }
        }
    }
    .A_information{
        padding 30px;
    }
    .B_information{
        padding 30px;
    }
    .C_information{
        padding 30px;
    }
    .h1_title{
        font-size 20px;
        padding-bottom 20px;
        text-align center;
    }
    .form_div{
        display flex;
    }
    .form_div2 >>> .el-form-item{
        margin-bottom 0px;
    }
    .form_div3{
        padding-left 166px;
        .span_text{
            color black;
            margin-left 30px;
        }
        .p_text{
            line-height 40px;
            color black;
        }
    }
    .form_div4{
        width 500px;
        margin auto;
    }
    .border{
        border 1px solid black
    }
    .imgListBox{
        display flex;
        justify-content space-around;
        width 100%;
        height 150px;
        overflow hidden;
    }
    .imgBox{
        overflow hidden;
        width 180px;
        height 150px;
        border-radius 3px;
    }
}
</style>
