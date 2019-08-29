<template>
    <div class="advertiseEditDialog">
        <el-dialog
            :title="dialogType == 'add' ? '添加广告' : '编辑'"
            :visible.sync="showDialog"
            @close="closeFuc"
            width="900px"
            center
        >
            <div class="advertiseForm">
                <el-form :model="dataObj" ref="advertiseForm" size="medium" label-width="233px" :rules="rules">
                    <div class="form_div">
                        <el-form-item label="广告名：" prop="bannerName">
                            <el-input v-model="dataObj.bannerName" placeholder="广告名" maxlength="20"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form_div">
                        <el-form-item label="广告标题：" prop="bannerTitle">
                            <el-input v-model="dataObj.bannerTitle" placeholder="广告标题" maxlength="30"></el-input>
                        </el-form-item>
                    </div>
                     <div class="form_div">
                        <el-form-item label="广告类型：" prop="type">
                            <el-select v-model="dataObj.type" placeholder="请选择">
                                <el-option
                                    v-for="item in typeArr"
                                    :key="item.code"
                                    :label="item.text"
                                    :value="item.code"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="form_div">
                        <el-form-item label="合作方：" prop="partner">
                            <el-input v-model="dataObj.partner" placeholder="合作方" maxlength="20"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form_div">
                        <el-form-item label="权重：" prop="weight">
                            <el-input v-model="dataObj.weight" placeholder="权重" maxlength="3"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form_div">
                        <el-form-item label="缩略图：" prop="img">
                            <upload-img
                                :showImage="dataObj.img?$store.state.user.ip+dataObj.img:''"
                                @uploadFuc="uploadFuc"
                            />
                        </el-form-item>
                    </div>
                    <div class="form_div">
                        <el-form-item label="链接：" prop="url">
                            <el-input v-model="dataObj.url" placeholder="链接"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" :loading="loadingBtn" @click="submitForm('advertiseForm')" v-if="dialogType == 'edit'">修&nbsp;改</el-button>
                <el-button type="primary" :loading="loadingBtn" @click="submitForm('advertiseForm')" v-if="dialogType == 'add'">提&nbsp;交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {cloneObj} from '@/files/js/cloneObj'
import UploadImg from '@/components/UploadImg/uploadImg'
import {upload,updateBanner,publishBanner} from '@/api'
import {isPercentage} from '@/files/js/rules'
var validProjectName=(rule, value,callback)=>{
  if (!value){
    callback(new Error('该输入框不能为空！'))
  }
  else {
    callback()
  }
};
var percentage=(rule, value,callback)=>{
  if (!value){
    callback(new Error('请输入小于100的整数'))
  }else  if (!isPercentage(value)){
    callback(new Error('请输入正确的格式！'))
  }else {
    callback()
  }
};
var validImg=(rule, value,callback)=>{
  if (!value){
    callback(new Error('该图片为必填！'))
  }
  else {
    callback()
  }
};
export default {
    components:{
        UploadImg
    },
    data(){
        return{
            dialogType:"",
            loadingBtn:false,
            showDialog:false,
            dataObj:{},

            typeArr:[{
                code:1,
                text:'首页banner'
            },{
                code:0,
                text:'启动页'
            }],
            rules: {
              bannerName: [
                {hide: true, trigger: 'blur', validator: validProjectName}
              ],
              bannerTitle: [
                {hide: true, trigger: 'blur', validator: validProjectName}
              ],
              partner: [
                {hide: true, trigger: 'blur', validator: validProjectName}
              ],
              weight: [
                {hide: true, trigger: 'blur', validator: percentage}
              ],
              img: [
                {hide: true, trigger: 'blur', validator: validImg}
              ],
            }
        }
    },
    methods:{
        submitForm(projectForm) {
          this.$refs[projectForm].validate((valid) => {
            if (valid) {
              this.submitFuc()
            } else {
              return false;
            }
          });
        },
        submitFuc(){
            this.$confirm(`确定${this.dialogType == 'edit' ? '修改' : '添加'}该广告?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                this.loadingBtn = true;
                if(this.dialogType == 'edit'){
                    updateBanner(this.dataObj).then(res=>{
                        if(res.errorCode === 0){
                            this.showDialog = false
                            this.$emit('changeFuc')
                            this.$message({
                                showClose: true,
                                message: '修改成功',
                                type: 'success'
                            });
                        }
                        this.loadingBtn = false
                    }).catch(()=>{
                        this.loadingBtn = false
                    })
                }
                if(this.dialogType == 'add'){
                    publishBanner(this.dataObj).then(res=>{
                        if(res.errorCode === 0){
                            this.showDialog = false
                            this.$emit('changeFuc')
                            this.$message({
                                showClose: true,
                                message: '添加成功',
                                type: 'success'
                            });
                        }
                        this.loadingBtn = false
                    }).catch(()=>{
                        this.loadingBtn = false
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: `已取消${this.dialogType == 'edit' ? '修改' : '添加'}`
                });
            })

        },
        uploadFuc(data){
            upload(data).then(res=>{
                if(res.errorCode === 0){
                    this.dataObj.img = res.body.fileId
                }
            })
        },
        showDialogFuc(type,data){
            this.dialogType = type
            if(type == 'edit'){
                this.dataObj = cloneObj(data);
            }
            if(type == 'add'){
                this.dataObj = {
                    bannerName:"",
                    bannerTitle:"",
                    img:"",
                    partner:"",
                    url:"",
                    weight:"",
                    type:1
                };
            }
            this.showDialog = true
        },
        closeFuc(){
            this.$refs.advertiseForm.resetFields()
        }
    }
}
</script>

<style lang="stylus" scoped>
.advertiseEditDialog{
    .advertiseForm{
        padding 30px;
        .form_div{
            width 555px;
        }
    }
}
</style>
