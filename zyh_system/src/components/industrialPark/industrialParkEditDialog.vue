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
        <h1 class="h1_title">基本信息</h1>
        <el-form :model="dataObj" label-position="left" ref="projectForm" size="medium" label-width="111px" :rules="rules">
          <div class="must_div">
            <div class="form_div">
              <el-form-item label="项目名称：" prop="projectName">
                <el-input v-model="dataObj.projectName" type="text" placeholder="项目名称" maxlength="25"></el-input>
              </el-form-item>
              <el-form-item label="结构：" prop="construction">
                <el-select v-model="dataObj.construction" placeholder="请选择结构">
                  <el-option v-for="item in initSelectData.constructionArr" :key="item.code" :label="item.text" :value="item.code"></el-option>
                </el-select>
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
            <div class="form_div">
              <el-form-item label="对接人：" prop="dockingMan">
                <el-input v-model="dataObj.dockingMan" type="text" placeholder="对接人" maxlength="15"></el-input>
              </el-form-item>
              <el-form-item label="对接人电话：" prop="dockingTel">
                <el-input v-model="dataObj.dockingTel" type="text" placeholder="对接人电话" maxlength="11"></el-input>
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
              </el-form-item>

            </div>
            <div class="form_div dw-div">
              <el-form-item label="详细地址：" prop="comAddrDtl">
                <el-input v-model="dataObj.comAddrDtl" type="text" placeholder="详细地址" maxlength="50"></el-input>
              </el-form-item>
              <el-form-item label="建筑面积：" prop="buildAcreage">
                <el-input v-model="dataObj.buildAcreage" type="text" placeholder="建筑面积" maxlength="10"></el-input>
                <span class="dw-span">m²</span>
              </el-form-item>
            </div>
            <div class="form_div dw-div">
              <el-form-item label="土地总面积：" prop="landAcreage">
                <el-input v-model="dataObj.landAcreage" type="text" placeholder="土地总面积" maxlength="11"></el-input>
                <span class="dw-span">m²</span>
              </el-form-item>
              <el-form-item label="特征地面积：" prop="requisitionAcreage">
                <el-input v-model="dataObj.requisitionAcreage" type="text" placeholder="特征地面积" maxlength="11"></el-input>
                <span class="dw-span">m²</span>
              </el-form-item>
            </div>
            <div class="form_div dw-div">
              <el-form-item label="价格：" prop="startAmt" label-width="111px">
                <div class="form_divM">
                    <span class="spanInput">
                      <el-input
                        :disabled="checkedM"
                        v-model="dataObj.startAmt"
                        type="text"
                        placeholder="价格"
                        maxlength="10"
                        @change="change"
                      ></el-input>
                      <span class="dw-span2">元/平方米</span>
                    </span>
                  <el-checkbox class="m-position"
                               v-model="checkedM"
                               @change="dataObj.startAmt = checkedM ? '': dataObj.startAmt"
                  >面议</el-checkbox>
                </div>
              </el-form-item>
            </div>
            <div class="form_div">
              <el-form-item label="园区等级：" prop="parkLevel">
                <el-select v-model="dataObj.parkLevel" placeholder="请选择等级">
                  <el-option v-for="item in initSelectData.ParkLv" :key="item.code" :label="item.text" :value="item.code"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="类型：" prop="parkType">
                <el-select v-model="dataObj.parkType" placeholder="请选择类型">
                  <el-option v-for="item in initSelectData.ParkType" :key="item.code" :label="item.text" :value="item.code"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form_div">
              <el-form-item label="领域：" prop="involvedDomain">
                <el-input v-model="dataObj.involvedDomain=='A'?'土地':''" type="text" placeholder="领域" :disabled="true"></el-input>
              </el-form-item>
            </div>
            <h1 class="h1_title">设施信息</h1>
            <div class="form_div">
              <el-form-item label="房产证：" prop="hasHousePropertyCertificate">
                <el-select v-model="dataObj.hasHousePropertyCertificate" placeholder="请选择">
                  <el-option label="有" value="1"></el-option>
                  <el-option label="无" value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="地产证：" prop="hasRealEstateCertificate">
                <el-select v-model="dataObj.hasRealEstateCertificate" placeholder="请选择">
                  <el-option label="有" value="1"></el-option>
                  <el-option label="无" value="0"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form_div dw-div">
              <el-form-item label="层高：" prop="storeyHeight">
                <el-input v-model="dataObj.storeyHeight" type="text" placeholder="层高" maxlength="5"></el-input>
                <span class="dw-span">米</span>
              </el-form-item>
              <el-form-item label="配电量：" prop="distributionOf">
                <el-input v-model="dataObj.distributionOf" type="text" placeholder="配电量" maxlength="5"></el-input>
                <span class="dw-span">KW.h</span>
              </el-form-item>
            </div>
            <div class="">
              <el-form-item label="使用年限">
                <el-date-picker
                  type="date"
                  placeholder="选择开始日期"
                  value-format="yyyy-MM-dd"
                  v-model="dataObj.startTime"
                >
                </el-date-picker> &nbsp; <span>——</span> &nbsp;
                <el-date-picker
                  type="date"
                  placeholder="选择结束日期"
                  value-format="yyyy-MM-dd"
                  v-model="dataObj.endTime"
                >
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="form_div">
              <el-form-item label="详情信息：" prop="dtlInf" label-width="122px">
                <el-input type="textarea" v-model="dataObj.dtlInf" :rows="6" maxlength="200"></el-input>
              </el-form-item>
            </div>
            <div class="form_div">
              <el-form-item label="税收政策：" prop="taxPolicy" label-width="122px">
                <el-input type="textarea" v-model="dataObj.taxPolicy" :rows="6" maxlength="200"></el-input>
              </el-form-item>
            </div>
            <div class="form_div">
              <el-form-item label="当前产业定位规化：" prop="industrialPricingPlanning" label-width="150px">
                <el-input type="textarea" v-model="dataObj.industrialPricingPlanning" :rows="6" maxlength="200"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="房产证：" prop="housePropertyCertificate">
                <upload-img
                  :type="{class:2000,type:'housePropertyCertificate'}"
                  :showImage="dataObj.housePropertyCertificate?$store.state.user.ip+dataObj.housePropertyCertificate:''"
                  @uploadFuc="uploadFuc"
                  @delImg="delImg"
                />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="地产证：" prop="realEstateCertificate">
                <upload-img
                  :type="{class:2000,type:'realEstateCertificate'}"
                  :showImage="dataObj.realEstateCertificate?$store.state.user.ip+dataObj.realEstateCertificate:''"
                  @uploadFuc="uploadFuc"
                  @delImg="delImg"
                />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="项目图片：">
                <upload-img :more="true" :maxNumber="4" :imgList="showImg" @uploadFuc="uploadFuc" @delImg="delImg"/>
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
  import UploadImg from '@/components/UploadImg/uploadImg'
  import {provinceList,cityList} from '@/files/js/areaData'
  import {tanTinvolvedDomainV2,tanTinvolvedDomainV2Type} from '@/files/js/tanTInvolvedDomain'
  import {upload,updataPark,modifyProjectB,modifyProjectC} from '@/api'
  import {cloneObj} from '@/files/js/cloneObj'
  import {findCode,findCodeArr,sortArr} from '@/files/js/findCode'
  import { constructionArr ,ParkLv,ParkType } from "@/files/js/initData";//项目状态下拉选项
  import {isvalidPhone,isvalidSmallNum2} from '@/files/js/rules'
  //判断
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
          constructionArr,
          ParkLv,
          ParkType,
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
          projectName: [
            {hide: true, trigger: 'blur', validator: validProjectName}
          ],
          construction: [
            {hide: true, trigger: 'change', validator: validConstruction}
          ],
          parkLevel: [
            {hide: true, trigger: 'change', validator: validConstruction}
          ],
          parkType: [
            {hide: true, trigger: 'change', validator: validConstruction}
          ],
          hasHousePropertyCertificate: [
            {hide: true, trigger: 'change', validator: validConstruction}
          ],
          hasRealEstateCertificate: [
            {hide: true, trigger: 'change', validator: validConstruction}
          ],
          startTime: [
            {hide: true, trigger: 'change', validator: validConstruction}
          ],
          endTime: [
            {hide: true, trigger: 'change', validator: validConstruction}
          ],
          linkMan: [
            {hide: true, trigger: 'blur', validator: validProjectName}
          ],
          linkTel: [
            {hide: true, trigger: 'blur', validator: validPhone}
          ],
          dockingMan: [
            {hide: true, trigger: 'blur', validator: validProjectName}
          ],
          dockingTel: [
            {hide: true, trigger: 'blur', validator: validPhone}
          ],
          // province: [
          //   {hide: true, trigger: 'change', validator: validConstruction}
          // ],
          comAddrDtl: [
            {hide: true, trigger: 'blur', validator: validProjectName}
          ],
          buildAcreage: [
            {hide: true, trigger: 'blur', validator: validSmallNum2}
          ],
          landAcreage: [
            {hide: true, trigger: 'blur', validator: validSmallNum2}
          ],
          requisitionAcreage: [
            {hide: true, trigger: 'blur', validator: validSmallNum2}
          ],
          // startAmt: [
          //   {hide: true, trigger: 'blur', validator: validSmallNum2}
          // ],
          storeyHeight: [
            {hide: true, trigger: 'blur', validator: validSmallNum2}
          ],
          distributionOf: [
            {hide: true, trigger: 'blur', validator: validProjectName}
          ],
          dtlInf: [
            {hide: true, trigger: 'blur', validator: validProjectName}
          ],
          taxPolicy: [
            {hide: true, trigger: 'blur', validator: validProjectName}
          ],
          industrialPricingPlanning: [
            {hide: true, trigger: 'blur', validator: validProjectName}
          ],
          housePropertyCertificate: [
            {hide: true, trigger: 'blur', validator: validImg}
          ],
          realEstateCertificate: [
            {hide: true, trigger: 'blur', validator: validImg}
          ],
        }
      }
    },
    methods:{
      change() {
        let reg = /^\d+.?\d{0,2}$/;
        if (!reg.test(this.dataObj.startAmt)) {
          this.$message({
            message: "请输入数字保留两位小数",
            type: "warning"
          });
          return false;
        }
      },
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
          this.dataObj.isConfer = this.checkedM ? 1 : 0; //面议
          if (
            this.dataObj.isConfer == 0 &&
            this.dataObj.startAmt != ""
          ) {
            updataPark(this.dataObj).then(res=>{
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
          }else if(this.dataObj.isConfer == 1){
            updataPark(this.dataObj).then(res=>{
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
          }else{
            this.$message({
              message: "选择价格",
              type: "warning"
            });
            this.loadingBtn = false;
            return false;
          }
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
        this.showImg = [...this.dataObj.imageList]
      },
      delImg(index,more){
        this.showImg.splice(index,1);
        this.dataObj.imageList.splice(index,1)
        console.log(this.dataObj.imageList,'图片数组')
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
        this.dataObj.comProvince = provinceArr[1];
        this.dataObj.comProvinceCode = provinceArr[0];
        this.dataObj.comCity = cityArr[1];
        this.dataObj.comCityCode = cityArr[0];
      },

      showInput() {
        this.tabVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      uploadFuc(data, more, type) {
        upload(data).then(res => {
          if (res && res.errorCode === 0) {
            if(!more){
              let typeType = type.type;
              switch (typeType) {
                case 'housePropertyCertificate':
                  this.dataObj.housePropertyCertificate = res.body.fileId;
                  break;
                case 'realEstateCertificate':
                  this.dataObj.realEstateCertificate = res.body.fileId;
                  break;
              }
            }
            if (more) {
              this.showImg.push(res.body.filePath);
              this.dataObj.imageList.push(res.body.fileId);
            }

          }
        });
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
    right : -70px;
    top:0;
  }
  .m-position{
    position : absolute;
    right : -120px;
    top: 0;
  }
</style>
