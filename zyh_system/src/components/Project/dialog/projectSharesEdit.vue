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
        <el-form :model="dataObj" label-position="left" ref="projectForm" size="medium" label-width="111px" :rules="rules3">
          <div class="must_div">
            <div class="form_div">
              <el-form-item label="项目分类：">
                <el-select v-model="dataObj.projectTypeCode" placeholder="请选择" disabled>
                  <el-option
                    v-for="item in initData.pubProjectBaseInitRespVO.projectCategoryList"
                    :key="item.typeCode"
                    :label="item.typeName"
                    :value="item.typeCode">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="项目领域：" prop="involvedDomain">
                <el-select v-model="dataObj.involvedDomain" placeholder="请选择">
                  <el-option
                    v-for="item in initData.myPreferenceInitRespVO.domainList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <!--<div class="form_div">-->
            <!--<el-form-item label="探探版领域：" prop="involvedDomainV2">-->
            <!--<el-select @change="involvedDomainV2Fuc" v-model="dataObj.involvedDomainV2" placeholder="请选择">-->
            <!--<el-option-->
            <!--v-for="item in TTaninvolvedDomainV2"-->
            <!--:key="item.code"-->
            <!--:label="item.name"-->
            <!--:value="item.code">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="探探版领域类型：" prop="domainSubCategory" label-width="136px">-->
            <!--<el-select v-model="dataObj.domainSubCategory" placeholder="请先选择探探版领域">-->
            <!--<el-option-->
            <!--v-for="item in TTaninvolvedDomainV2Type"-->
            <!--:key="item.code"-->
            <!--:label="item.name"-->
            <!--:value="item.code">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--</div>-->
            <div class="form_div">
              <el-form-item label="项目名称：" prop="projectName">
                <el-input v-model="dataObj.projectName" type="text" placeholder="项目名称" maxlength="25"></el-input>
              </el-form-item>
            </div>
            <div class="form_div1">
              <el-form-item label="公司：" prop="comName">
                <el-input v-model="dataObj.comName" type="text" placeholder="公司名称" maxlength="25"></el-input>
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
            <div class="form_div1">
              <el-form-item label="详细地址：" prop="comAddrDtl">
                <el-input v-model="dataObj.comAddrDtl" type="text" placeholder="详细地址" maxlength="50"></el-input>
              </el-form-item>
            </div>
            <div class="like_div">
              <el-form-item label="联系人：" prop="linkMan">
                <el-input v-model="dataObj.linkMan" type="text" placeholder="联系人" maxlength="15"></el-input>
              </el-form-item>
              <el-form-item label="联系人电话：" prop="linkTel">
                <el-input v-model="dataObj.linkTel" type="text" placeholder="联系人电话" maxlength="11"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="项目价格" class="item_title"></el-form-item>
              <div class="M_box">
                <el-form-item label="成交价：" prop="startAmt" label-width="88px">
                  <div class="form_divM">
                    <span class="spanInput">
                      <el-input :disabled="checkedM" v-model="dataObj.startAmt" type="text" placeholder="成交价" maxlength="10" @change="change">
                        <span slot="suffix">万元</span>
                      </el-input>
                    </span>
                    <el-checkbox v-model="checkedM" @change="dataObj.startAmt = checkedM ? '': dataObj.startAmt">面议</el-checkbox>
                  </div>
                </el-form-item>
                <el-form-item label="市场价：" prop="endAmt" label-width="88px">
                  <div>
                    <span class="spanInput">
                      <el-input v-model="dataObj.endAmt" type="text" placeholder="市场价" maxlength="10">
                        <span slot="suffix">万元</span>
                      </el-input>
                    </span>
                  </div>
                </el-form-item>
              </div>
            </div>
            <div class="tag_div" >
              <el-form-item label="关键字：" prop="keyWordList">
                <el-tag
                  :key="tag"
                  v-for="tag in dataObj.keyWordList"
                  closable
                  @close="delTag(tag)">
                  {{tag}}
                </el-tag>
                <span v-if="dataObj.keyWordList && dataObj.keyWordList.length < 3">
                                    <el-input
                                      class="input-new-tag"
                                      v-if="tabVisible"
                                      v-model="tabValue"
                                      ref="saveTagInput"
                                      size="small"
                                      maxlength="10"
                                      @keyup.enter.native="handleInputConfirm"
                                      @blur="handleInputConfirm"
                                    >
                                    </el-input>
                                    <el-button v-else class="button-new-tag" size="small" @click="showInput">点击添加关键字</el-button>
                                </span>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="图片：">
                <upload-img :more="true" :maxNumber="4" :imgList="showImg" @uploadFuc="uploadFuc" @delImg="delImg"/>
              </el-form-item>
            </div>
          </div>
          <div v-show="dataObj.projectTypeCode === 3000">
            <div class="must_div">
              <div>
                <el-form-item label="项目需求：" prop="projectRequirement">
                  <el-select v-model="dataObj.projectRequirement" placeholder="请选择">
                    <el-option
                      v-for="item in initData.pubProjectBaseInitRespVO.projectRequirementList"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="form_div1">
                <el-form-item label="项目详情信息：" prop="dtlInf" label-width="133px">
                  <el-input
                    type="textarea"
                    :rows="6"
                    placeholder="请输入内容"
                    v-model="dataObj.dtlInf">
                  </el-input>
                </el-form-item>
              </div>
            </div>
            <div class="border"></div>
            <div class="optional_div">
              <h1 class="h1_title">非必填项</h1>
              <div class="form_div1">
                <el-form-item label="企业名称：" prop="comNameC">
                                    <span class="spanInput">
                                        <el-input v-model="dataObj.comNameC" type="text" placeholder="企业名称"></el-input>
                                    </span>
                </el-form-item>
              </div>
              <div class="form_div1">
                <el-form-item label="注册地址：" prop="registAddr">
                                    <span class="spanInput">
                                        <el-input v-model="dataObj.registAddr" type="text" placeholder="注册地址"></el-input>
                                    </span>
                </el-form-item>
              </div>
              <div class="form_div1">
                <el-form-item label="法定代表人：" prop="legalPerson">
                                    <span class="spanInput">
                                        <el-input v-model="dataObj.legalPerson" type="text" placeholder="法定代表人"></el-input>
                                    </span>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="成立时间：" prop="establishTime">
                  <el-date-picker
                    v-model="dataObj.establishTime"
                    value-format="yyyy-MM-dd"
                    :editable="false"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </div>
              <div class="form_div1">
                <el-form-item label="注册资本：" prop="registAmt">
                                    <span class="spanInput">
                                        <el-input v-model="dataObj.registAmt" type="text" placeholder="注册资本">
                                            <span slot="suffix">&nbsp;万元&nbsp;</span>
                                        </el-input>
                                    </span>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="经济类型：" prop="economicType">
                  <el-select v-model="dataObj.economicType" clearable placeholder="请选择">
                    <el-option
                      v-for="item in initData.pubProjectCInitRespVO.economicTypeList"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="公司类型：" prop="comType">
                  <el-select v-model="dataObj.comType" clearable placeholder="请选择">
                    <el-option
                      v-for="item in initData.pubProjectCInitRespVO.companyTypeList"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="经营规模：" prop="manageScale">
                  <el-select v-model="dataObj.manageScale" clearable placeholder="请选择">
                    <el-option
                      v-for="item in initData.pubProjectCInitRespVO.manageScaleList"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="form_div1">
                <el-form-item label="统一社会信用代码或组织机构代码：" prop="orgCode" label-width="255px">
                  <el-input v-model="dataObj.orgCode" type="text" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="form_div1">
                <el-form-item label="经营范围：" prop="manageRange" >
                  <el-input v-model="dataObj.manageRange" type="text" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="form_div1">
                <el-form-item label="职工人数：" prop="employeeNum">
                  <span class="spanInput">
                    <el-input v-model="dataObj.employeeNum" type="text" placeholder="职工人数">
                      <span slot="suffix">&nbsp;人&nbsp;</span>
                    </el-input>
                  </span>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="交易条件" class="item_title"></el-form-item>
                <div class="children_div">
                  <el-form-item label="1.支付方式：" prop="dealPayMethod">
                    <el-select v-model="dataObj.dealPayMethod" clearable placeholder="请选择">
                      <el-option
                        v-for="item in initData.pubProjectCInitRespVO.dealPayMethodList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="2.对转让标的企业职工是否有继续聘用要求：" prop="employeeContinue" label-width="300px">
                    <el-radio-group v-model="dataObj.employeeContinue">
                      <el-radio :label="item.code" v-for="item in initData.pubProjectCInitRespVO.yesOrNoList" :key="item.code">{{item.name}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="3.对转让标的企业存续发展方面是否有要求：" prop="renewRequire" label-width="300px">
                    <el-radio-group v-model="dataObj.renewRequire">
                      <el-radio :label="item.code" v-for="item in initData.pubProjectCInitRespVO.yesOrNoList" :key="item.code">{{item.name}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="4.产权转让涉及的售权售务处置是否有要求：" prop="serviceRequire" label-width="300px">
                    <el-radio-group v-model="dataObj.serviceRequire">
                      <el-radio :label="item.code" v-for="item in initData.pubProjectCInitRespVO.yesOrNoList" :key="item.code">{{item.name}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
              </div>
              <div>
                <el-form-item label="受让方资格条件(多选)" class="item_title" label-width="188px"></el-form-item>
                <div class="children_div">
                  <el-form-item prop="transfereeConditionList" label-width="0">
                    <el-checkbox-group v-model="dataObj.transfereeConditionList">
                      <p v-for="item in initData.pubProjectCInitRespVO.transferConditionList" :key="item.code">
                        <el-checkbox :label="item.code">{{item.name}}</el-checkbox>
                      </p>
                    </el-checkbox-group>
                  </el-form-item>
                </div>
              </div>
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
  import {upload,modifyProjectA,modifyProjectB,modifyProjectC} from '@/api'
  import {cloneObj} from '@/files/js/cloneObj'
  import {findCode,findCodeArr,sortArr,findCodeArr2} from '@/files/js/findCode'
  import {isvalidPhone,isvalidSmallNum2,isvalidOrgCode,isvalidNum5,isvalidSmallNum1,isPercentage} from '@/files/js/rules'
  //判断
  var validProjectName=(rule, value,callback)=>{
    if (!value){
      callback(new Error('该输入框不能为空！'))
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
  var validSmallNum21=(rule, value,callback)=>{
    if(value==''||value==null){
      callback()
    }
    else if (!isvalidSmallNum2(value)){
      console.log(value ,'value')
      callback(new Error('请输入正确的格式！'))
    }else {
      callback()
    }
  };
  var validOrgCode=(rule, value,callback)=>{
    if(value==''){
      callback()
    }
    else if (!isvalidOrgCode(value)){
      callback(new Error('请输入18位 数字或大写字母！'))
    }else {
      callback()
    }
  };
  var validNumber5=(rule, value,callback)=>{
    if(value==''||value==null){
      callback()
    }
    else if (!isvalidNum5(value)){
      callback(new Error('请输入5位以下数字'))
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
        dataObj:{},
        //A类
        time:null,   //时间
        //B类
        // households:"",  //总户数
        // park:"", //车位
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
        rules3: {
          involvedDomain: [
            {hide: true, trigger: 'change', validator: validConstruction}
          ],
          projectRequirement: [
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
          linkMan: [
            {hide: true, trigger: 'blur', validator: validProjectName}
          ],
          linkTel: [
            {hide: true, trigger: 'blur', validator: validPhone}
          ],
          // startAmt: [
          //   {hide: true, trigger: 'blur', validator: validSmallNum2}
          // ],
          endAmt: [
            {hide: true, trigger: 'blur', validator: validSmallNum2}
          ],
          registAmt:[
            {hide: true, trigger: 'blur', validator: validSmallNum21}
          ],
          orgCode:[
            {hide: true, trigger: 'blur', validator: validOrgCode}
          ],
          employeeNum:[
            {hide: true, trigger: 'blur', validator: validNumber5}
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
          console.log(212121)
          if (valid) {
            console.log(1111)
            this.editFuc()
          } else {
            console.log(2222)
            return false;
          }
        });
      },
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
      editFuc(){
        this.$confirm('确定修改该项目?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.loadingBtn=true;
          this.dataObj.isConfer = this.checkedM ? 1 : 0  //面议
          sortArr(this.dataObj.transfereeConditionList)
          if (
            this.dataObj.isConfer == 0 &&
            this.dataObj.startAmt != "" &&
            this.dataObj.endAmt != ""
          ) {
            modifyProjectC(this.dataObj).then(res=>{
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
            modifyProjectC(this.dataObj).then(res=>{
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
              message: "选择成交价",
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
        //探探版领域
        Object.keys(tanTinvolvedDomainV2Type).forEach((key)=>{
          if(key.indexOf(this.dataObj.involvedDomainV2) == 0){
            this.TTaninvolvedDomainV2Type=tanTinvolvedDomainV2Type[key]
          }
        })
        if(data.projectTypeCode === 1000){
          if(this.dataObj.startUseTime && this.dataObj.endUseTime){
            this.time=[this.dataObj.startUseTime,this.dataObj.endUseTime]
          }
        }
        if(data.projectTypeCode === 2000){
          // if(this.dataObj.parkingRatio){
          //     this.households=this.dataObj.parkingRatio.split(":")[0]
          //     this.park=this.dataObj.parkingRatio.split(":")[1]
          // }
          if(!this.dataObj.peripheralMatchingList){
            this.dataObj.peripheralMatchingList = []
          }
          if(!this.dataObj.devUncertainFactorsList){
            this.dataObj.devUncertainFactorsList = []
          }
          this.provinceInfoLand = this.dataObj.landProvince
          this.cityInfoLand = this.dataObj.landCity
        }
        //面议
        this.dataObj.isConfer === 0 ? this.checkedM = false :this.checkedM = true
        //赋值图片列表
        this.showImg = [...this.dataObj.imageList]
        //地区
        this.provinceInfo = this.dataObj.comProvince
        this.cityInfo = this.dataObj.comCity
        this.showDialog = true
      },
      delImg(index,more){
        this.showImg.splice(index,1);
        this.dataObj.imageList.splice(index,1)
      },
      uploadFuc(data,more,type){
        upload(data).then(res=>{
          if(res && res.errorCode === 0){
            if(more){
              this.showImg.push(res.body.filePath);
              this.dataObj.imageList.push(res.body.fileId)
            }
            else{
              let classType = type.class;
              let typeType = type.type;
              if(classType === 1000){
                this.dataObj.ownershipCertificate = res.body.fileId
              }
              if(classType === 2000){
                switch(typeType){
                  case 'B_bdcImg':
                    this.dataObj.landUseCertificate = res.body.fileId
                    break;
                  case 'B_xkzImg':
                    this.dataObj.buildCertificate = res.body.fileId
                    break;
                  case 'B_pzsImg':
                    this.dataObj.landApprovalCertificate = res.body.fileId
                    break;
                }
              }
            }
          }
        })
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
        this.dataObj.keyWordList.splice(this.dataObj.keyWordList.indexOf(tag), 1);
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
          this.dataObj.keyWordList.push(tabValue);
        }
        this.tabVisible = false;
        this.tabValue = '';
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
      }
      .border{
        border 1px solid #e6e6e6
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
