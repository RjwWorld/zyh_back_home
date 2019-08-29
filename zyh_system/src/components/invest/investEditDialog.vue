<template>
<!-- 项目列表修改 -->
    <div class="projectEditDialog">
        <el-dialog
            title="修改"
            :visible.sync="showDialog"
            width="1300px"
            center
            @close="down('projectForm')"
        >
            <div class="projectForm">
                <h1 class="h1_title">必填项</h1>
                <el-form :model="dataObj" label-position="left" ref="projectForm" size="medium" label-width="111px" :rules="rules">
                    <div class="must_div">
                        <div class="form_div">
                            <el-form-item label="公司名称：" prop="comName">
                                <el-input v-model="dataObj.comName" type="text" placeholder="公司名称" maxlength="25"></el-input>
                            </el-form-item>
                            <el-form-item label="法人控股人：" prop="legalPersonHolding">
                                <el-input v-model="dataObj.legalPersonHolding" type="text" placeholder="法人控股人" maxlength="15"></el-input>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="地址：">
                                <el-select v-model="provinceInfo" @change="changeProvince('all')" placeholder="请选择">
                                    <el-option
                                        v-for="item in province"
                                        :key="item.value"
                                        :label="item.text"
                                        :value="item.value+','+item.text"
                                    >
                                    </el-option>
                                </el-select>
                                <span style="padding:0 20px">省</span>

                                <el-select v-model="cityInfo" @change="changeCity('all')" placeholder="请选择">
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
                        <div class="form_div">
                            <el-form-item label="详细地址：" prop="comAddrDtl">
                              <el-input v-model="dataObj.comAddrDtl" type="text" placeholder="详细地址" maxlength="50"></el-input>
                            </el-form-item>
                            <el-form-item label="项目名称：" prop="projectName">
                              <el-input v-model="dataObj.projectName" type="text" placeholder="项目名称" maxlength="25"></el-input>
                            </el-form-item>
                        </div>

                        <div class="form_div">
                            <el-form-item label="注册时间：" prop="registrationTime ">
                              <el-date-picker type="date" placeholder="选择日期" v-model="dataObj.registrationTime"></el-date-picker>
                            </el-form-item>
                        </div>

                        <div class="form_div">
                            <el-form-item label="统一社会信用代码:" prop="socialCreditCode" label-width="150px">
                              <el-input v-model="dataObj.socialCreditCode" type="text" placeholder="统一社会信用代码" maxlength="18"></el-input>
                            </el-form-item>
                            <el-form-item label="登记机关：" prop="registrationAuthority">
                            <el-input v-model="dataObj.registrationAuthority" type="text" placeholder="登记机关" maxlength="50"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form_div">
                            <el-form-item label="联系人：" prop="linkMan">
                            <el-input v-model="dataObj.linkMan" type="text" placeholder="联系人" maxlength="15"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人电话：" prop="linkTel">
                            <el-input v-model="dataObj.linkTel" type="text" placeholder="联系人电话" maxlength="11"></el-input>
                            </el-form-item>
                        </div>
                        <div>
                          <el-form-item label="营业期限：" >
                            <el-form-item prop="startBizTime" style="float:left;">
                              <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                v-model="dataObj.startBizTime">
                              </el-date-picker>
                            </el-form-item>
                            <span style="float:left;">-</span>
                            <el-form-item prop="endBizTime" style="float:left;">
                              <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                v-model="dataObj.endBizTime">
                              </el-date-picker>
                            </el-form-item>
                          </el-form-item>
                        </div>
                        <div class="form_div">
                            <el-form-item label="营业状态：" prop="dealStatus">
                                <el-select v-model="dataObj.dealStatus" placeholder="请选择经营状态">
                                    <el-option v-for="item in initSelectData.comTypeOne" :key="item.code" :label="item.text" :value="item.code"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="公司类型：" prop="comType">
                                <el-select v-model="dataObj.comType" placeholder="请选择">
                                    <el-option v-for="item in initSelectData.comTypeTwo" :key="item.code" :label="item.text" :value="item.code"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="form_div">
                            <el-form-item label="投资方向：" prop="investmentDirection">
                                <el-select v-model="dataObj.investmentDirection" placeholder="请选择投资方向">
                                    <el-option
                                    v-for="item in initData.myPreferenceInitRespVO.domainList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                      <div class="tag_div" >
                        <el-form-item label="关键字：" prop="keyWordsList">
                          <el-tag
                            :key="tag"
                            v-for="tag in dataObj.keyWordsList"
                            closable
                            @close="delTag(tag)">
                            {{tag}}
                          </el-tag>
                          <span v-if="dataObj.keyWordsList && dataObj.keyWordsList.length < 3">
                            <el-input
                              class="input-new-tag"
                              v-if="tabVisible"
                              v-model="tabValue"
                              ref="saveTagInput"
                              size="small"
                              maxlength="10"
                              @keyup.enter.native="handleInputConfirm"
                              @blur="handleInputConfirm">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">点击添加关键字</el-button>
                          </span>
                        </el-form-item>
                      </div>

                        <div class="form_div">
                            <el-form-item label="预计年投资量：" prop="yearInvestment" label-width="122px">
                                <div>
                                <span class="spanInput">
                                    <el-input v-model="dataObj.yearInvestment" type="text" placeholder="年投资量" maxlength="8"></el-input>
                                    <span class="danwei">万元</span>
                                </span>
                                </div>
                            </el-form-item>
                            <el-form-item label="集团总资产：" prop="groupAssets" label-width="122px">
                            <div>
                                <span class="spanInput">
                                    <el-input v-model="dataObj.groupAssets" type="text" placeholder="总资产" maxlength="8"></el-input>
                                    <span class="danwei">万元</span>
                                </span>
                                </div>
                            </el-form-item>
                        </div>
                        <div class="form_div">
                            <el-form-item label="剩余投量：" prop="remaindInvestment" label-width="122px">
                                <div>
                                <span class="spanInput">
                                    <el-input v-model="dataObj.remaindInvestment" type="text" placeholder="剩余投量" maxlength="8"></el-input>
                                    <span class="danwei">万元</span>
                                </span>
                                </div>
                            </el-form-item>
                            <el-form-item label="已投放比：" prop="putRatio" label-width="122px">
                            <div>
                                <span class="spanInput">
                                    <el-input v-model="dataObj.putRatio" type="text" placeholder="已投放比：" maxlength="3"></el-input>
                                    <span class="danwei">%</span>
                                </span>
                                </div>
                            </el-form-item>
                        </div>
                        <div class="form_div">
                            <el-form-item label="经营范围：" prop="bizScope" label-width="122px">
                            <el-input type="textarea" v-model="dataObj.bizScope" :rows="6" maxlength="200"></el-input>
                            </el-form-item>
                        </div>
                        <div class="form_div">
                            <el-form-item label="公司介绍：" prop="comIntroduction" label-width="122px">
                            <el-input type="textarea" v-model="dataObj.comIntroduction" :rows="6" maxlength="200"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                      <el-form-item label="公司Logo：" prop="comLogo">
                        <upload-img
                          :type="{class:2000,type:'comLogo'}"
                          :showImage="dataObj.comLogo?$store.state.user.ip+dataObj.comLogo:''"
                          @uploadFuc="uploadFuc"
                          @delImg="delImg"
                        />
                      </el-form-item>
                    </div>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" :loading="loadingBtn" @click="submitForm('projectForm')">修&nbsp;改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import UploadImg from '@/components/UploadImg/uploadImg'
import {provinceList,cityList} from '@/files/js/areaData'
import {tanTinvolvedDomainV2,tanTinvolvedDomainV2Type} from '@/files/js/tanTInvolvedDomain'
import {upload,updataCapitalSide,modifyProjectB,modifyProjectC} from '@/api'
import {cloneObj} from '@/files/js/cloneObj'
import {findCode,findCodeArr,sortArr} from '@/files/js/findCode'
import { comTypeOne,comTypeTwo } from "@/files/js/initData";//项目状态下拉选项
import {isvalidPhone,isvalidOrgCode,isvalidNum8,isvalidNum3} from '@/files/js/rules'
var validProjectName=(rule, value,callback)=>{
  if (!value){
    callback(new Error('该输入框不能为空！'))
  }
  else {
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
var validConstruction=(rule, value,callback)=>{
  if (!value){
    callback(new Error('请选择！'))
  }
  else {
    callback()
  }
};
var validPhone=(rule, value,callback)=>{
  if (!value){
    callback(new Error('请输入手机号码！'))
  }else  if (!isvalidPhone(value)){
    callback(new Error('请输入正确的11位手机号码！'))
  }else {
    callback()
  }
};
var validOrgCode=(rule, value,callback)=>{
  if (!value){
    callback(new Error('请输入18位 数字或者大写字母'))
  }else  if (!isvalidOrgCode(value)){
    callback(new Error('请输入正确的格式！'))
  }else {
    callback()
  }
};
var validNum8=(rule, value,callback)=>{
  if (!value){
    callback(new Error('请输入8位以下数字'))
  }else  if (!isvalidNum8(value)){
    callback(new Error('请输入正确的格式！'))
  }else {
    callback()
  }
};
var validNum3=(rule, value,callback)=>{
  if (!value){
    callback(new Error('请输入3位以下数字'))
  }else  if (!isvalidNum3(value)){
    callback(new Error('请输入正确的格式！'))
  }else {
    callback()
  }
};
export default {
    components:{
        UploadImg,
    },
    data(){
        return{
            showDialog:false,
            loadingBtn:false,
            checkedM:false,  //是否面议

            initData:{
                myPreferenceInitRespVO:{},
                pubProjectBaseInitRespVO:{},
                pubProjectAInitRespVO:{},
                pubProjectBInitRespVO:{},
                pubProjectCInitRespVO:{},
                tagInfList:[]
            },
            showImg:[],   //图片列表
            tabVisible: false,  //添加标签
            tabValue: '',
            initSelectData: {
                comTypeOne,
                comTypeTwo
            },
            dataObj:{},
            //A类
            time:null,   //时间
            //B类
            households:"",  //总户数
            park:"", //车位
            provinceLand:provinceList,
            cityLand:[],
            provinceInfoLand:"",
            cityInfoLand:"",

            //探探下拉框
            TTaninvolvedDomainV2:tanTinvolvedDomainV2,
            TTaninvolvedDomainV2Type:[],
            //省 市下拉框
            province:provinceList,
            city:[],
            provinceInfo:"",
            cityInfo:"",
            rules: {
            involvedDomain: [
              {hide: true, trigger: 'change', validator: validConstruction}
            ],
            projectRequirement: [
              {hide: true, trigger: 'change', validator: validConstruction}
            ],
            registrationTime: [
              {hide: true, trigger: 'change', validator: validConstruction}
            ],
            startBizTime: [
              {hide: true, trigger: 'change', validator: validConstruction}
            ],
            endBizTime: [
              {hide: true, trigger: 'change', validator: validConstruction}
            ],
            dealStatus: [
              {hide: true, trigger: 'change', validator: validConstruction}
            ],
            comType: [
              {hide: true, trigger: 'change', validator: validConstruction}
            ],
            investmentDirection: [
              {hide: true, trigger: 'change', validator: validConstruction}
            ],
            projectName: [
              {hide: true, trigger: 'blur', validator: validProjectName}
            ],
            comName: [
              {hide: true, trigger: 'blur', validator: validProjectName}
            ],
            comAddrDtl: [
              {hide: true, trigger: 'blur', validator: validProjectName}
            ],
            dtlInf: [
              {hide: true, trigger: 'blur', validator: validProjectName}
            ],
            registrationAuthority: [
              {hide: true, trigger: 'blur', validator: validProjectName}
            ],
            legalPersonHolding: [
              {hide: true, trigger: 'blur', validator: validProjectName}
            ],
            bizScope: [
              {hide: true, trigger: 'blur', validator: validProjectName}
            ],
            comIntroduction: [
              {hide: true, trigger: 'blur', validator: validProjectName}
            ],
            linkMan: [
              {hide: true, trigger: 'blur', validator: validProjectName}
            ],
            linkTel: [
              {hide: true, trigger: 'blur', validator: validPhone}
            ],
            socialCreditCode: [
              {hide: true, trigger: 'blur', validator: validOrgCode}
            ],
            yearInvestment: [
              {hide: true, trigger: 'blur', validator: validNum8}
            ],
            groupAssets: [
              {hide: true, trigger: 'blur', validator: validNum8}
            ],
            remaindInvestment: [
              {hide: true, trigger: 'blur', validator: validNum8}
            ],
            putRatio: [
              {hide: true, trigger: 'blur', validator: validNum3}
            ],
            comLogo: [
              {hide: true, trigger: 'blur', validator: validImg}
            ],
          },
        }
    },
    methods:{
      down(projectForm){
        this.$refs[projectForm].resetFields()
      },
        submitForm(projectForm) {
          this.$refs[projectForm].validate((valid) => {
            if (valid) {
              this.editFuc()
            } else {
              return false;
            }
          });
        },
        editFuc(){
            this.$confirm('确定修改该项目?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info'
            }).then(() => {
                this.loadingBtn=true;
                updataCapitalSide(this.dataObj).then(res=>{
                        if(res && res.errorCode === 0){
                            this.showDialog = false
                            this.$emit('changeFuc')
                            this.$message({
                                showClose: true,
                                message: '修改成功',
                                type: 'success'
                            });
                        }
                        this.loadingBtn = false;
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
        showDialogFuc(data,init){
            //初始选项值
            this.initData=init;
            this.dataObj = cloneObj(data);

            //地区
            this.provinceInfo = this.dataObj.comProvince
            this.cityInfo = this.dataObj.comCity
            this.showDialog = true
        },
        delImg(index,more){
            this.showImg.splice(index,1);
            this.dataObj.imageList.splice(index,1)
        },

        involvedDomainV2Fuc(){
            let code = this.dataObj.involvedDomainV2
            Object.keys(tanTinvolvedDomainV2Type).forEach((key)=>{
                if(key.indexOf(code) == 0){
                    this.TTaninvolvedDomainV2Type=tanTinvolvedDomainV2Type[key]
                    this.dataObj.domainSubCategory = this.TTaninvolvedDomainV2Type[0].code
                }
            })
        },
        //地区选择
        changeProvince(type){
            if(type == 'all'){
                let provinceArr = this.provinceInfo.split(",")
                let provinceCode = provinceArr[0]
                Object.keys(cityList).forEach((key)=>{
                    if(key.indexOf(provinceCode) == 0){
                        this.city=cityList[key]
                        this.cityInfo = this.city[0].text
                        //选择了省份后后.用户不在选择城市
                        this.dataObj.comProvince = provinceArr[1]
                        this.dataObj.comProvinceCode = provinceArr[0]
                        this.dataObj.comCity = this.city[0].text
                        this.dataObj.comCityCode = this.city[0].value
                    }
                })
            }
            if(type == 'land'){
                let provinceArr = this.provinceInfoLand.split(",")
                let provinceCode = provinceArr[0]
                Object.keys(cityList).forEach((key)=>{
                    if(key.indexOf(provinceCode) == 0){
                        this.cityLand=cityList[key]
                        this.cityInfoLand = this.cityLand[0].text
                        //选择了省份后后.用户不在选择城市
                        this.dataObj.landProvince = provinceArr[1]
                        this.dataObj.landProvinceCode = provinceArr[0]
                        this.dataObj.landCity = this.cityLand[0].text
                        this.dataObj.landCityCode = this.cityLand[0].value
                    }
                })
            }
        },
        changeCity(type){
            if(type == 'all'){
                let provinceArr = this.provinceInfo.split(",")
                let cityArr = this.cityInfo.split(",")
                this.dataObj.comProvince = provinceArr[1]
                this.dataObj.comProvinceCode = provinceArr[0]
                this.dataObj.comCity = cityArr[1]
                this.dataObj.comCityCode = cityArr[0]
            }
            if(type == 'land'){
                let provinceArr = this.provinceInfoLand.split(",")
                let cityArr = this.cityInfoLand.split(",")
                this.dataObj.landProvince = provinceArr[1]
                this.dataObj.landProvinceCode = provinceArr[0]
                this.dataObj.landCity = cityArr[1]
                this.dataObj.landCityCode = cityArr[0]
            }
        },
        delTag(tag) {
            this.dataObj.keyWordsList.splice(this.dataObj.keyWordsList.indexOf(tag), 1);
        },
        showInput() {
            this.tabVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let tabValue = this.tabValue;
            if (tabValue) {
                this.dataObj.keyWordsList.push(tabValue);
            }
            this.tabVisible = false;
            this.tabValue = '';
        },
        uploadFuc(data,more,type) {
        upload(data).then(res => {
          if (res && res.errorCode === 0) {
            let typeType = type.type;
            switch(typeType){
              case 'comLogo':
                this.dataObj.comLogo = res.body.fileId
                break;
            }
          }
        });
      },
    }
}
</script>

<style lang="stylus" scoped>
.projectEditDialog{
    .projectForm{
        padding 30px 88px 0;
        .base_form{
            >>> .el-form-item__label:before{
                content "*";
                color #f56c6c;
                margin-right 4px;
            }
        }
        .must_div{
            >>> .el-form-item__label:before{
                content "*";
                color #f56c6c;
                margin-right 4px;
            }
        }
        .optional_div{
            padding-top 50px;
        }
        .h1_title{
            width 111px;
            font-size 18px;
            font-weight bold;
            padding 0 12px 23px 0;
            box-sizing border-box;
        }
        .form_div{
            display flex;
            >>>.el-form-item__content{
                width 233px;
                margin-right 66px;
            }
        }
        .form_div1{
            width 500px;
            .form_divH{
                display flex;
                .house_park{
                    display inline-block;
                    width 88px;
                }
            }
        }
        .children_div{
            padding-left 40px;
        }
        .like_div{
            display flex;
            >>>.el-form-item__content{
                margin-right 66px;
            }
            >>> .el-form-item__label{
                font-weight bold;
            }
        }
        .M_box{
            padding-left 40px;
            .form_divM{
                display flex;
                >>> .el-checkbox{
                    margin-left 30px;
                    .el-checkbox__inner{
                        width 16px;
                        height 16px;
                    }
                    .el-checkbox__label{
                        font-size 16px;
                    }
                }
            }
        }
        .item_title{
            margin-bottom 12px;
            >>> .el-form-item__label{
                color black;
                font-size 16px;
            }
        }
        .tag_div{
            .el-tag + .el-tag {
                margin-left: 10px;
            }
            .button-new-tag {
                margin-left: 10px;
                height: 32px;
                line-height: 30px;
                padding-top: 0;
                padding-bottom: 0;
            }
            .input-new-tag {
                width: 90px;
                margin-left: 10px;
                vertical-align: bottom;
            }
        }
        .spanInput{
            display inline-block;
            width 188px;
            position: relative;

             .danwei {
                display: inline-block;
                width: 50px;
                position:absolute;
                top: 0;
                right:-60px;

            }
        }

    }
    .submitBtn{
        width 666px;
        text-align center;
        padding 50px 0;
        box-sizing border-box;
    }
}
</style>
