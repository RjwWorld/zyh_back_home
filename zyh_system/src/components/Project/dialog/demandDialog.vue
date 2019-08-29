<template>
<!-- 需求列表审核 -->
    <div class="demandDialog">
        <el-dialog
            :title="dialogType=='audit'?'审核':'查看预览'"
            :visible.sync="showDialog"
            @close="closeFuc"
            width="900px"
            center
        >
            <!-- <div class="demandInfo">
                <el-form label-width="233px">
                    <div class="form_div">
                        <el-form-item label="需求标题：" >
                            <span>{{dataObj.projectName}}</span>
                        </el-form-item>
                        <el-form-item label="权重：" >
                            <span>{{dataObj.homeRecommend}}</span>
                        </el-form-item>
                    </div>
                    <div class="form_div">
                        <el-form-item label="地址：" >
                            <span>{{dataObj.comProvince}}{{dataObj.comCity}}</span>
                        </el-form-item>
                        <el-form-item label="详细地址：" >
                            <span>{{dataObj.comAddrDtl}}</span>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="总价：" >
                            <span v-if="dataObj.isConfer === 0">{{dataObj.startAmt}}-{{dataObj.endAmt}}&nbsp;&nbsp;万元</span>
                            <span v-if="dataObj.isConfer === 1">面议</span>
                        </el-form-item>
                    </div>
                    <div class="form_div">
                        <el-form-item label="联系人：" >
                            <span>{{dataObj.linkMan}}</span>
                        </el-form-item>
                        <el-form-item label="联系电话：" >
                            <span>{{dataObj.linkTel}}</span>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="需求详情：" >
                            <span>{{dataObj.dtlInf}}</span>
                        </el-form-item>
                    </div>
                </el-form>
            </div> -->
            <demand-details :dataObj="dataObj"/>

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
                <el-button type="primary" @click="submitFuc">提&nbsp;交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import DemandDetails from '@/components/Project/dialog/demandDetails'
export default {
    components:{
        DemandDetails
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
                projectType:1,
                projectId:"",
                status:2,
                cause:"",
                homeRecommend:0,
            }
        }
    },
    methods:{
        showDialogFuc(type,data){
            this.dialogType = type
            if(this.dialogType == 'audit'){
                this.auditObj.projectId = data.id
            }
            this.dataObj = data
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
            if(this.dialogType == 'submit'){
                this.$confirm('确定发布该需求?', '提示', {
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
            if(this.dialogType == 'audit'){
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
.demandDialog{
    // .demandInfo{
    //     .form_div{
    //         display flex;
    //     }
    // }
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
