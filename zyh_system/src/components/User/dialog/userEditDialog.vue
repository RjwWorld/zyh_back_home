<template>
    <div class="userEditDialog">
        <el-dialog
            title="修改"
            :visible.sync="showDialog"
            @close="closeFuc"
            width="1000px"
            center
        >
            <div class="userForm">
                <el-form :model="dataObj" ref="userForm" size="medium" label-width="133px" :rules="rules">
                    <div class="form_div">
                        <el-form-item label="头像：" prop="userImg">
                            <upload-img
                                :header="true"
                                :headerImage="dataObj.avatar?$store.state.user.ip+dataObj.avatar:''"
                                @uploadFuc="uploadFuc"
                            />
                        </el-form-item>
                        <el-form-item label="昵称：" prop="nickName">
                            <el-input v-model="dataObj.nickName" type="text" placeholder="昵称"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="地址：">
                            <el-select v-model="provinceInfo" @change="changeProvince" placeholder="请选择">
                                <el-option
                                    v-for="item in province"
                                    :key="item.value"
                                    :label="item.text"
                                    :value="item.value+','+item.text"
                                >
                                </el-option>
                            </el-select>
                            <span style="padding:0 20px">省</span>

                            <el-select v-model="cityInfo" @change="changeCity" placeholder="请选择">
                                <el-option
                                    v-for="item in city"
                                    :key="item.value"
                                    :label="item.text"
                                    :value="item.value+','+item.text"
                                >
                                </el-option>
                            </el-select>
                            <span style="padding:0 20px">市</span>
                        </el-form-item>
                    </div>
                    <div class="form_div1">
                        <el-form-item label="邮箱：" prop="mail">
                            <el-input v-model="dataObj.mail" type="text" placeholder="邮箱"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form_div">
                        <el-form-item label="机构：" prop="company">
                            <el-input v-model="dataObj.company" type="text" placeholder="机构"></el-input>
                        </el-form-item>
                        <el-form-item label="职业：" prop="position">
                            <el-input v-model="dataObj.position" type="text" placeholder="职业"></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" :loading="loadingBtn" @click="submitForm('userForm')">修&nbsp;改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import UploadImg from '@/components/UploadImg/uploadImg'
import {provinceList,cityList} from '@/files/js/areaData'
import {cloneObj} from '@/files/js/cloneObj'
import {upload,updateUser} from '@/api'
import {isvalidEmail} from '@/files/js/rules'
var validEmail=(rule, value,callback)=>{
  if (!value){
    callback(new Error('请输入邮箱地址！'))
  }else  if (!isvalidEmail(value)){
    callback(new Error('请输入正确的邮箱地址！'))
  }else {
    callback()
  }
};
var validProjectName=(rule, value,callback)=>{
  if (value==''||value==null){
    callback(new Error('该输入框不能为空！'))
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
            showDialog:false,
            loadingBtn:false,
            dataObj:{},
            //省 市下拉框
            province:provinceList,
            city:[],
            provinceInfo:"",
            cityInfo:"",
            rules:{
              nickName: [
                {hide: true, trigger: 'blur', validator: validProjectName}
              ],
              mail: [
                {hide: true, trigger: 'blur', validator: validEmail}
              ],
            },
        }
    },
    methods:{
        submitForm(userForm) {
          this.$refs[userForm].validate((valid) => {
            if (valid) {
              this.editFuc()
            } else {
              return false;
            }
          });
        },
        editFuc(){
            this.$confirm('确定修改该用户信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                this.loadingBtn=true;
                updateUser(this.dataObj).then(res=>{
                    if(res.errorCode === 0){
                        this.showDialog = false
                        this.loadingBtn = false;
                        this.$emit('changeFuc')
                        this.$message({
                            showClose: true,
                            message: '修改成功',
                            type: 'success'
                        });
                    }
                }).catch(()=>{
                    this.loadingBtn = false;
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消修改'
                });
            });
        },
        showDialogFuc(data){
            this.dataObj = cloneObj(data.userFilterRespVO)

            //赋值城市
            this.provinceInfo = this.dataObj.addrProvince
            this.cityInfo = this.dataObj.addrCity



            this.showDialog = true;
        },
        closeFuc(){
            this.showDialog = false
            this.$refs.userForm.resetFields()
        },
        uploadFuc(data){
            upload(data).then(res=>{
                if(res.errorCode === 0){
                    this.dataObj.avatar = res.body.fileId
                }
            })
        },
        //地区选择
        changeProvince(){
            let provinceArr = this.provinceInfo.split(",")
            let provinceCode = provinceArr[0]
            Object.keys(cityList).forEach((key)=>{
                if(key.indexOf(provinceCode) == 0){
                    this.city=cityList[key]
                    this.cityInfo = this.city[0].text
                    //选择了省份后后.用户不在选择城市
                    this.dataObj.addrProvince = provinceArr[1]
                    this.dataObj.addrProvinceCode = provinceArr[0]
                    this.dataObj.addrCity = this.city[0].text
                    this.dataObj.addrCityCode = this.city[0].value
                }
            })
        },
        changeCity(){
            let provinceArr = this.provinceInfo.split(",")
            let cityArr = this.cityInfo.split(",")
            this.dataObj.addrProvince = provinceArr[1]
            this.dataObj.addrProvinceCode = provinceArr[0]
            this.dataObj.addrCity = cityArr[1]
            this.dataObj.addrCityCode = cityArr[0]
        },
    }
}
</script>

<style lang="stylus" scoped>
.userEditDialog{
    .userForm{
        .form_div{
            display flex
        }
        .form_div1{
            width 500px;
        }
    }
}
</style>
