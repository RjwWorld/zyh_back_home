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
            <div class="form_div1">
              <el-form-item label="园区名称：" prop="projectName">
                <el-input v-model="dataObj.projectName" type="text" placeholder="项目名称" maxlength="25"></el-input>
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
                  ></el-option>
                </el-select>
                <span style="padding:0 20px">省</span>

                <el-select v-model="cityInfo" @change="changeCity" placeholder="请选择">
                  <el-option
                    v-for="item in city"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value+','+item.text"
                  ></el-option>
                </el-select>
                <span style="padding:0 20px">市</span>

                <el-select v-model="areaInfo" @change="changeArea" placeholder="请选择">
                  <el-option
                    v-for="item in area"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value+','+item.text"
                  ></el-option>
                </el-select>
                <span style="padding:0 20px">区</span>
              </el-form-item>
            </div>
            <div class="form_div1">
              <el-form-item label="详细地址：" prop="comAddrDtl">
                <el-input v-model="dataObj.comAddrDtl" type="text" placeholder="详细地址" maxlength="50"></el-input>
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
            <div class="tag_div">
              <el-form-item label="产业导向：" prop="industryGuideList">
                <el-tag
                  :key="tag"
                  v-for="tag in dataObj.industryGuideList"
                  closable
                  @close="delTag(tag)"
                >{{tag}}</el-tag>
                <span v-if="dataObj.industryGuideList && dataObj.industryGuideList.length < 3">
                    <el-input
                      class="input-new-tag"
                      v-if="tabVisible"
                      v-model="tabValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm"
                      maxlength="10"
                    ></el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">点击添加产业导向</el-button>
                  </span>
              </el-form-item>
            </div>
            <div class="form_div dw-div">
              <el-form-item label="标准厂房租价：" prop="startAmt">
                <el-input v-model="dataObj.startAmt" type="text" placeholder="标准厂房租价" maxlength="10"></el-input>
                <span class="dw-span">元/月/平方米</span>
              </el-form-item>
              <el-form-item label="园区面积：" prop="landAcreage">
                <el-input v-model="dataObj.landAcreage" type="text" placeholder="园区面积" maxlength="10"></el-input>
                <span class="dw-span">亩</span>
              </el-form-item>
            </div>
            <div class="form_div">
              <el-form-item label="园区概况：" prop="dtlInf" label-width="122px">
                <el-input type="textarea" v-model="dataObj.dtlInf" :rows="6" maxlength="500"></el-input>
              </el-form-item>
            </div>
            <h1 class="h1_title">选填项</h1>
            <div class="form_div">
              <el-form-item label="优惠政策：" prop="taxPolicy" label-width="122px">
                <el-input type="textarea" v-model="dataObj.taxPolicy" :rows="6" maxlength="500"></el-input>
              </el-form-item>
            </div>
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
  import {provinceList,cityList,areaList} from '@/files/js/areaData'
  import {updataSurvey} from '@/api'
  import {cloneObj} from '@/files/js/cloneObj'
  import {findCode,findCodeArr,sortArr} from '@/files/js/findCode'
  import { constructionArr ,ParkLv,ParkType } from "@/files/js/initData";//项目状态下拉选项
  import {isvalidPhone,isvalidSmallNum2} from '@/files/js/rules'
  var validProjectName=(rule, value,callback)=>{
    if (!value){
      callback(new Error('该输入框不能为空！'))
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
  var validSmallNum2=(rule, value,callback)=>{
    if (!value){
      callback(new Error('请输入数字，结果保留两位小数'))
    }else  if (!isvalidSmallNum2(value)){
      callback(new Error('请输入正确的格式！'))
    }else {
      callback()
    }
  };
  export default {
    data(){
      return{
        showDialog:false,
        loadingBtn:false,
        initData:{
          tagInfList:[]
        },
        tabVisible: false,  //添加标签
        tabValue: '',
        initSelectData: {
          constructionArr,
          ParkLv,
          ParkType,
        },
        dataObj:{},
        //省 市下拉框
        province:provinceList,
        city:[],
        provinceInfo:"",
        cityInfo:"",
        area:[],
        areaInfo: "",
        rules: {
          projectName: [
            {hide: true, trigger: 'blur', validator: validProjectName}
          ],
          comAddrDtl: [
            {hide: true, trigger: 'blur', validator: validProjectName}
          ],
          linkMan: [
            {hide: true, trigger: 'blur', validator: validProjectName}
          ],
          linkTel: [
            {hide: true, trigger: 'blur', validator: validPhone}
          ],
          startAmt: [
            {hide: true, trigger: 'blur', validator: validSmallNum2}
          ],
          landAcreage: [
            {hide: true, trigger: 'blur', validator: validSmallNum2}
          ],
          dtlInf: [
            {hide: true, trigger: 'blur', validator: validProjectName}
          ],
        }
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
          updataSurvey(this.dataObj).then(res=>{
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
      //地区选择
      changeProvince() {
        let provinceArr = this.provinceInfo.split(",");
        let provinceCode = provinceArr[0];
        Object.keys(cityList).forEach(key => {
          if (key.indexOf(provinceCode) == 0) {
            this.city = cityList[key];
            this.cityInfo = this.city[0].text;
            //选择了省份后后.用户不在选择城市
            this.dataObj.comProvince = provinceArr[1];
            this.dataObj.comProvinceCode = provinceArr[0];
            this.dataObj.comCity = this.city[0].text;
            this.dataObj.comCityCode = this.city[0].value;
          }
        });
      },
      changeCity() {
        let provinceArr = this.provinceInfo.split(",");
        let cityArr = this.cityInfo.split(",");
        let cityCode = cityArr[0];
        Object.keys(areaList).forEach(key => {
          if (key.indexOf(cityCode) == 0) {
            this.area = areaList[key];
            this.areaInfo = this.area[0].text;
            //选择了省份后后.用户不在选择城市
            this.dataObj.comProvince = provinceArr[1];
            this.dataObj.comProvinceCode = provinceArr[0];
            this.dataObj.comCity = cityArr[1];
            this.dataObj.comCityCode = cityArr[0];
          }
        });
      },
      changeArea() {
        let provinceArr = this.provinceInfo.split(",");
        let cityArr = this.cityInfo.split(",");
        let areaArr = this.areaInfo.split(",");
        this.dataObj.comProvince = provinceArr[1];
        this.dataObj.comProvinceCode = provinceArr[0];
        this.dataObj.comCity = cityArr[1];
        this.dataObj.comCityCode = cityArr[0];
        this.dataObj.comArea = areaArr[1];
        this.dataObj.comAreaCode = areaArr[0];
      },
      delTag(tag) {
        this.dataObj.industryGuideList.splice(this.dataObj.industryGuideList.indexOf(tag), 1);
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
          this.dataObj.industryGuideList.push(tabValue);
        }
        this.tabVisible = false;
        this.tabValue = [];
      },
    },
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
  .dw-div{
    position:relative;
  }
  .dw-span{
    position :absolute;
    right : 10px;
    top:0;
  }
  .dw-span2{
    position : absolute;
    right : -20px;
    top:0;
  }
  .m-position{
    position : absolute;
    right : -120px;
    top: 0;
  }
</style>
