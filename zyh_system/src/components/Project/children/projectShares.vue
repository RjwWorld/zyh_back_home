<template>
  <div class="projectShares">
    <div class="screening">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="项目类别：">
          <el-input v-model="formInline.user" placeholder="项目股权" disabled></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select v-model="tableObj.status" @change="changeFuc('page',1)" placeholder="请选择">
            <el-option
              v-for="item in initSelectData.projectStatu"
              :key="item.code"
              :label="item.text"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            @keyup.enter.native="changeFuc('page',1)"
            placeholder="编号、项目名称"
            v-model="tableObj.keyWord"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loadingBtn" @click="changeFuc('page',1)">查&nbsp;询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="open=true">添&nbsp;加</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="添加项目股权" :visible.sync="open" width="1300px" center>
        <div class="publishProject">
          <div class="projectForm">
            <h1 class="h1_title">必填项</h1>
            <el-form
              :model="dataObj"
              label-position="left"
              ref="projectForm"
              size="medium"
              label-width="111px"
              :rules="rules"
            >
              <div class="form_div">
                <el-form-item label="项目分类：">
                  <el-select
                    v-model="dataObj.projectTypeCode"
                    placeholder="请选择"
                    @change="projectComponent =
                    dataObj.projectTypeCode == 1000 ? 'Assets' :
                    dataObj.projectTypeCode == 2000 ? 'Land' : 'Shares'"
                     disabled
                  >
                    <el-option
                      v-for="item in initData.pubProjectBaseInitRespVO.projectCategoryList"
                      :key="item.typeCode"
                      :label="item.typeName"
                      :value="item.typeCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="项目领域：" prop="involvedDomain">
                  <el-select v-model="dataObj.involvedDomain" placeholder="请选择">
                    <el-option
                      v-for="item in initData.myPreferenceInitRespVO.domainList"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <!-- <div class="form_div">
                <el-form-item label="探探版领域：" prop="involvedDomainV2">
                  <el-select
                    @change="involvedDomainV2Fuc"
                    v-model="dataObj.involvedDomainV2"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in TTaninvolvedDomainV2"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="探探版领域类型：" prop="domainSubCategory" label-width="136px">
                  <el-select v-model="dataObj.domainSubCategory" placeholder="请先选择探探版领域">
                    <el-option
                      v-for="item in TTaninvolvedDomainV2Type"
                      :key="item.code"
                      :label="item.name"
                      :value="item.code"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div> -->
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
              <div class="form_div1">
                <el-form-item label="详细地址：" prop="comAddrDtl">
                  <el-input v-model="dataObj.comAddrDtl" type="text" placeholder="详细地址" maxlength="50"></el-input>
                </el-form-item>
              </div>
              <!-- <div class="form_div1">
                <el-form-item label="摘要：" prop="digest">
                  <el-input v-model="dataObj.digest" type="text" placeholder="不得多余20个字符"></el-input>
                </el-form-item>
              </div> -->
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
                        <el-input
                          :disabled="checkedM"
                          v-model="dataObj.startAmt"
                          type="text"
                          placeholder="成交价"
                          maxlength="10"
                          @change="change"
                        ></el-input>
                        <span class="danwei">万元</span>
                      </span>
                      <el-checkbox
                        v-model="checkedM"
                        @change="dataObj.startAmt = checkedM ? '': dataObj.startAmt"
                      >面议</el-checkbox>
                    </div>
                  </el-form-item>
                  <el-form-item label="市场价：" prop="endAmt" label-width="88px">
                    <div>
                      <span class="spanInput">
                        <el-input v-model="dataObj.endAmt" type="text" placeholder="市场价" maxlength="10"></el-input>
                        <span class="danwei">万元</span>
                      </span>
                    </div>
                  </el-form-item>
                </div>
              </div>
              <div class="tag_div">
                <el-form-item label="关键字：" prop="keyWordList">
                  <el-tag
                    :key="tag"
                    v-for="tag in dataObj.keyWordList"
                    closable
                    @close="delTag(tag)"
                  >{{tag}}</el-tag>
                  <span v-if="dataObj.keyWordList.length < 3">
                    <el-input
                      class="input-new-tag"
                      v-if="tabVisible"
                      v-model="tabValue"
                      ref="saveTagInput"
                      size="small"
                      maxlength="10"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm"
                    ></el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">点击添加关键字</el-button>
                  </span>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="图片：" prop="projectImg">
                  <upload-img
                    :more="true"
                    :maxNumber="4"
                    :imgList="showImg"
                    @uploadFuc="uploadFuc"
                    @delImg="delImg"
                  />
                </el-form-item>
              </div>
              <div class="form_div">
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
              <div class="form_div">
                <el-form-item label="项目详情信息：" prop="dtlInf" label-width="133px">
                  <el-input
                    type="textarea"
                    :rows="6"
                    placeholder="请输入内容"
                    maxlength="500"
                    v-model="dataObj.dtlInf">
                  </el-input>
                </el-form-item>
              </div>
            </el-form>
          </div>
          <component
            :is="projectComponent"
            :initData="initData"
            :ref="projectComponent"
            @mergeFuc="mergeFuc"
            @uploadFuc="uploadFuc"
          />
        </div>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="open = false">取 消</el-button>
          <el-button type="primary" @click="open = false">确 定</el-button>-->
          <el-button type="primary" @click="submitForm('projectForm')">预览</el-button>
          <el-button @click="resetForm('projectForm')">重置</el-button>
          <project-dialog ref="previewDialog" @submitFuc="submitFuc"/>
        </span>
    </el-dialog>
    </div>
    <table-list
      :tableTitle="tableHeader"
      :tableData="tableData"
      @changeFuc="changeFuc"
      @operation="operation"
    />
    <project-dialog ref="previewDialog" @submitFuc="submitFuc" @subFuc="subFuc"/>
    <project-shares-edit ref="editDialog" @changeFuc="changeFuc"/>
  </div>
</template>

<script>
import allTableHeader from "@/files/js/tableHeader";
import TableList from "@/components/Table/table";
import { projectStatu } from "@/files/js/initData";
import {tanTinvolvedDomainV2, tanTinvolvedDomainV2Type} from "@/files/js/tanTInvolvedDomain";
import {
  projectList,
  projectStatus,
  projectDtlAppend,
  deleteProject,
  pubProjectInit,
  upload,
  publishProjectC,
  domainV2Init
} from "@/api";
import ProjectDialog from "@/components/Project/dialog/projectDialog";
// import ProjectEditDialog from "@/components/Project/dialog/projectEditDialog";
import projectSharesEdit from '@/components/Project/dialog/projectSharesEdit'
import { cloneObj } from "@/files/js/cloneObj";
import { findCode, findCodeArr, sortArr } from "@/files/js/findCode";
import UploadImg from "@/components/UploadImg/uploadImg";
import { provinceList, cityList } from "@/files/js/areaData";
import Assets from "@/components/Project/projectClassification/assets";
import Land from "@/components/Project/projectClassification/land";
import Shares from "@/components/Project/projectClassification/shares";
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
  components: {
    TableList,
    ProjectDialog,
    // ProjectEditDialog,
    projectSharesEdit,
    Assets,
    Land,
    Shares,
    UploadImg,
    ProjectDialog
  },
  data() {
    return {
      open: false,
      checkedM: false,
      loadingBtn: false,
      showImg: [], //图片列表
      projectComponent: "Shares",
      tabVisible: false, //添加标签
      tabValue: "",
      initData: {
        myPreferenceInitRespVO: {},
        pubProjectBaseInitRespVO: {},
        pubProjectAInitRespVO: {},
        pubProjectBInitRespVO: {},
        pubProjectCInitRespVO: {},
        tagInfList: []
      },
      formInline: {
        user: ""
      },
      tableHeader: allTableHeader.projectHeader,
      initSelectData: {
        projectStatu
      },
      tableData: {},
      tableObj: {
        keyWord: "",
        status: null,
        projectTypeCode: 3000,
        pageSize: 8,
        startPage: 1,
        type: 0
      },
      dataObj: {
        projectTypeCode: 3000, //类别
        involvedDomain: "", //项目领域
        involvedDomainV2: "", //探探版领域
        domainSubCategory: "", //探探版领域类型
        projectName: "", //名字
        comName: "", //公司
        comProvince: "", //省
        comProvinceCode: "", //省 区号
        comCity: "", //市
        comCityCode: "", //市 区号
        comAddrDtl: "", //详细地址
        linkMan: "", //联系人
        linkTel: "", //联系人电话
        isConfer: 0, //是否面议
        startAmt: "", //成交价
        endAmt: "", //市场价
        keyWordList: [], //关键字
        imageList: [], //图片列表
        projectRequirement:'',//项目需求
        dtlInf:"", //项目详情信息
      },
      freeDataObj: {}, //上传的对象

      //探探下拉框
      TTaninvolvedDomainV2: tanTinvolvedDomainV2,
      TTaninvolvedDomainV2Type: [],
      //省 市下拉框
      province: provinceList,
      city: [],
      provinceInfo: "",
      cityInfo: "",
      rules: {
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
      },
    };
  },
  activated() {
    this.initWeb();
  },
  created() {
    //初始化项目选项数据
    pubProjectInit({ projectCategoryCode: 0 }).then(res => {
      if (res && res.errorCode === 0) {
        this.initData = res.body;
      }
    });
  },
  methods: {
    //按钮操作
    operation(type, data) {
      let obj;
      switch (type) {
        case "up":
          obj = {
            projectId: data.projectId,
            projectType: 0,
            status: 2
          };
          this.$confirm("确定上架该项目?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
            .then(() => {
              projectStatus(obj).then(res => {
                if (res && res.errorCode === 0) {
                  this.changeFuc();
                  this.$message({
                    showClose: true,
                    message: "上架成功",
                    type: "success"
                  });
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "取消操作"
              });
            });
          break;
        case "down":
          obj = {
            projectId: data.projectId,
            projectType: 0,
            status: 0
          };
          this.$confirm("确定下架该项目?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
            .then(() => {
              projectStatus(obj).then(res => {
                if (res && res.errorCode === 0) {
                  this.changeFuc();
                  this.$message({
                    showClose: true,
                    message: "下架成功",
                    type: "success"
                  });
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "取消操作"
              });
            });
          break;
        case "del":
          this.$confirm("确定删除该项目?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              deleteProject({ projectId: data.projectId }).then(res => {
                if (res && res.errorCode === 0) {
                  this.changeFuc();
                  this.$message({
                    showClose: true,
                    message: "删除成功",
                    type: "success"
                  });
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "取消操作"
              });
            });
          break;
        case "audit":
          this.projectLook(data.projectId, type);
          break;
        case "edit":
          this.projectLook(data.projectId, type);
          break;
        case "look":
          this.projectLook(data.projectId, type);
          break;
      }
    },
    //审核提交
    submitFuc(data) {
      projectStatus(data)
        .then(res => {
          if (res.errorCode === 0) {
            this.changeFuc();
            this.$refs.previewDialog.resetForm();
            this.$refs.previewDialog.closeFuc();

            if (res.body.isReward === 1) {
              this.$confirm("是否到邀请奖励页面发放奖励?", "提交成功", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "success",
                center: true
              })
                .then(() => {
                  this.$router.push("/inviteRewardList");
                })
                .catch(() => {});
            } else {
              this.$message({
                showClose: true,
                message: "提交成功",
                type: "success"
              });
            }
          }
        })
        .catch(() => {
          this.$refs.previewDialog.closeLoadingFuc();
        });
    },
    //点击查看、审核、修改
    projectLook(projectId, type) {
      projectDtlAppend({ projectId }).then(res => {
        if (res.errorCode === 0) {
          let projectData;
          if (res.body.projectOneARespVO) {
            projectData = res.body.projectOneARespVO;
          }
          if (res.body.projectOneBRespVO) {
            projectData = res.body.projectOneBRespVO;
          }
          if (res.body.projectOneCRespVO) {
            projectData = res.body.projectOneCRespVO;
          }

          //这里数据已经处理好
          if (type == "audit" || type == "look") {
            let data = this.previewFuc(projectData);
            this.$refs.previewDialog.showDialogFuc(type, data);
          }
          if (type == "edit") {
            this.$refs.editDialog.showDialogFuc(projectData, this.initData);
          }
        }
      });
    },
    previewFuc(data) {
      let modelReqVO = {};
      modelReqVO = cloneObj(data);
      this.modelReqVOFuc(data.projectTypeCode, modelReqVO, data);
      //将父对象数据转化
      if (modelReqVO.involvedDomain) {
        modelReqVO.involvedDomain = findCode(
          this.initData.myPreferenceInitRespVO.domainList,
          data.involvedDomain
        );
      }
      modelReqVO.projectRequirement = findCode(
        this.initData.pubProjectBaseInitRespVO.projectRequirementList,
        data.projectRequirement
      );
      if (modelReqVO.involvedDomainV2) {
        modelReqVO.involvedDomainV2 = findCode(
          tanTinvolvedDomainV2,
          data.involvedDomainV2
        );
      }
      //return出处理好的数据
      return modelReqVO;
    },
    submitForm(projectForm) {
      this.dataObj.isConfer = this.checkedM ? 1 : 0; //面议
      this.$refs[projectForm].validate((valid) => {
        if (valid) {
          if (
            this.dataObj.isConfer == 0 &&
            this.dataObj.startAmt != ""
          ) {
            this.previeFuc()
          }
          else if (this.dataObj.isConfer ==1) {
            this.previeFuc()
          }
          else {
            this.$message({
              message: "请输入成交价",
              type: "warning"
            });
            return false
          }
        } else {
          return false;
        }
      });
    },
    //将对象数据转化函数
    modelReqVOFuc(code, data, oldData) {
      //探探版领域
      Object.keys(tanTinvolvedDomainV2Type).forEach(key => {
        if (key.indexOf(oldData.involvedDomainV2) == 0) {
          if (data.domainSubCategory) {
            data.domainSubCategory = findCode(
              tanTinvolvedDomainV2Type[key],
              oldData.domainSubCategory
            );
          }
        }
      });
      let Ainit = this.initData.pubProjectAInitRespVO;
      let Binit = this.initData.pubProjectBInitRespVO;
      let Cinit = this.initData.pubProjectCInitRespVO;
      //这是A类
      if (code === 1000) {
        if (data.category) {
          data.category = findCode(Ainit.assetCategoryList, oldData.category);
        }
        if (data.ownerProperty) {
          data.ownerProperty = findCode(
            Ainit.ownerPropertyList,
            oldData.ownerProperty
          );
        }
        if (data.currentPurpose) {
          data.currentPurpose = findCode(
            Ainit.usePurposeList,
            oldData.currentPurpose
          );
        }
        if (data.planPurpose) {
          data.planPurpose = findCode(
            Ainit.usePurposeList,
            oldData.planPurpose
          );
        }
        if (data.nature) {
          data.nature = findCode(Ainit.natureList, oldData.nature);
        }
        if (data.transferForm) {
          data.transferForm = findCode(
            Ainit.transferFormList,
            oldData.transferForm
          );
        }
        if (data.changeApartment || data.changeApartment === 0) {
          data.changeApartment = findCode(
            Ainit.yesOrNoList,
            oldData.changeApartment
          );
        }
        if (data.makeLoans || data.makeLoans === 0) {
          data.makeLoans = findCode(Ainit.yesOrNoList, oldData.makeLoans);
        }
        if (data.ownedStatus || data.ownedStatus === 0) {
          data.ownedStatus = findCode(Ainit.hasOrNotList, oldData.ownedStatus);
        }
        if (data.pledgeStatus || data.pledgeStatus === 0) {
          data.pledgeStatus = findCode(
            Ainit.hasOrNotList,
            oldData.pledgeStatus
          );
        }
        if (data.hasUsePriority || data.hasUsePriority === 0) {
          data.hasUsePriority = findCode(
            Ainit.yesOrNoList,
            oldData.hasUsePriority
          );
        }
      }
      //这是B类
      if (code === 2000) {
        if (data.isTroublesome || data.isTroublesome === 0) {
          data.isTroublesome = findCode(
            Binit.yesOrNoList,
            oldData.isTroublesome
          );
        }
        if (data.landNature) {
          data.landNature = findCode(Binit.landNatureList, oldData.landNature);
        }
        if (data.peripheralMatchingList) {
          data.peripheralMatchingList = findCodeArr(
            Binit.peripheralMatchingList,
            oldData.peripheralMatchingList
          );
        }
        if (data.devUncertainFactorsList) {
          data.devUncertainFactorsList = findCodeArr(
            Binit.devUncertainFactorsList,
            oldData.devUncertainFactorsList
          );
        }
        if (data.transferMode) {
          data.transferMode = findCode(
            Binit.transferModeList,
            oldData.transferMode
          );
        }
        if (data.isClean || data.isClean === 0) {
          data.isClean = findCode(Binit.yesOrNoList, oldData.isClean);
        }
        if (data.transferMethod) {
          data.transferMethod = findCode(
            Binit.transferMethodList,
            oldData.transferMethod
          );
        }
      }
      //这是C类
      if (code === 3000) {
        if (data.establishTime) {
          var time = new Date(oldData.establishTime);
          var Y = time.getFullYear() + "-";
          var M =
            (time.getMonth() + 1 < 10
              ? "0" + (time.getMonth() + 1)
              : time.getMonth() + 1) + "-";
          var D = time.getDate() + "";
          data.establishTime = Y + M + D;
        }
        if (data.economicType) {
          data.economicType = findCode(
            Cinit.economicTypeList,
            oldData.economicType
          );
        }
        if (data.comType) {
          data.comType = findCode(Cinit.companyTypeList, oldData.comType);
        }
        if (data.manageScale) {
          data.manageScale = findCode(
            Cinit.manageScaleList,
            oldData.manageScale
          );
        }
        if (data.dealPayMethod) {
          data.dealPayMethod = findCode(
            Cinit.dealPayMethodList,
            oldData.dealPayMethod
          );
        }
        if (data.employeeContinue || data.employeeContinue === 0) {
          data.employeeContinue = findCode(
            Cinit.yesOrNoList,
            oldData.employeeContinue
          );
        }
        if (data.renewRequire || data.renewRequire === 0) {
          data.renewRequire = findCode(Cinit.yesOrNoList, oldData.renewRequire);
        }
        if (data.serviceRequire || data.renewRequire === 0) {
          data.serviceRequire = findCode(
            Cinit.yesOrNoList,
            oldData.serviceRequire
          );
        }
        if (data.transfereeConditionList) {
          data.transfereeConditionList = findCodeArr(
            Cinit.transferConditionList,
            oldData.transfereeConditionList
          );
        }
      }
    },
    changeFuc(type, value) {
      // console.log(1)
      this.loadingBtn = true;
      if (type == "page") {
        this.tableObj.startPage = value;
      }
      projectList(this.tableObj).then(res => {
        if (res && res.errorCode == 0) {
          this.loadingBtn = false;
          this.tableData = res.body;
        }
      });
    },
    initWeb() {
      this.changeFuc();
      //初始化项目选项数据
      pubProjectInit({ projectCategoryCode: 0 }).then(res => {
        if (res && res.errorCode === 0) {
          this.initData = res.body;
        }
      });
    },
    previeFuc() {
      this.dataObj.isConfer = this.checkedM ? 1 : 0; //面议
      this.$refs[this.projectComponent].mergeFuc();
    },
    mergeFuc(data) {
      let Ainit = this.initData.pubProjectAInitRespVO;
      let Binit = this.initData.pubProjectBInitRespVO;
      let Cinit = this.initData.pubProjectCInitRespVO;
      let dataObjC = cloneObj(this.dataObj);
      let dataC = cloneObj(data);
      let mergeObj = Object.assign(dataObjC, dataC);
      this.freeDataObj = cloneObj(mergeObj);
      if (mergeObj.involvedDomain) {
        mergeObj.involvedDomain = findCode(
          this.initData.myPreferenceInitRespVO.domainList,
          this.dataObj.involvedDomain
        );
      }
      if (mergeObj.involvedDomainV2) {
        mergeObj.involvedDomainV2 = findCode(
          tanTinvolvedDomainV2,
          this.dataObj.involvedDomainV2
        );
      }
      if (mergeObj.domainSubCategory) {
        mergeObj.domainSubCategory = findCode(
          this.TTaninvolvedDomainV2Type,
          this.dataObj.domainSubCategory
        );
      }
      mergeObj.imageList = this.showImg;
      if (this.dataObj.projectTypeCode === 1000) {
        mergeObj.projectRequirement = findCode(
          this.initData.pubProjectBaseInitRespVO.projectRequirementList,
          data.projectRequirement
        );
        if (mergeObj.category) {
          mergeObj.category = findCode(Ainit.assetCategoryList, data.category);
        }
        if (mergeObj.ownerProperty) {
          mergeObj.ownerProperty = findCode(
            Ainit.ownerPropertyList,
            data.ownerProperty
          );
        }
        if (mergeObj.currentPurpose) {
          mergeObj.currentPurpose = findCode(
            Ainit.usePurposeList,
            data.currentPurpose
          );
        }
        if (mergeObj.planPurpose) {
          mergeObj.planPurpose = findCode(
            Ainit.usePurposeList,
            data.planPurpose
          );
        }
        if (mergeObj.nature) {
          mergeObj.nature = findCode(Ainit.natureList, data.nature);
        }
        if (mergeObj.transferForm) {
          mergeObj.transferForm = findCode(
            Ainit.transferFormList,
            data.transferForm
          );
        }
        if (mergeObj.changeApartment || mergeObj.changeApartment === 0) {
          mergeObj.changeApartment = findCode(
            Ainit.yesOrNoList,
            data.changeApartment
          );
        }
        if (mergeObj.makeLoans || mergeObj.makeLoans === 0) {
          mergeObj.makeLoans = findCode(Ainit.yesOrNoList, data.makeLoans);
        }
        if (mergeObj.ownedStatus || mergeObj.ownedStatus === 0) {
          mergeObj.ownedStatus = findCode(Ainit.yesOrNoList, data.ownedStatus);
        }
        if (mergeObj.pledgeStatus || mergeObj.pledgeStatus === 0) {
          mergeObj.pledgeStatus = findCode(
            Ainit.yesOrNoList,
            data.pledgeStatus
          );
        }
        if (mergeObj.hasUsePriority || mergeObj.hasUsePriority === 0) {
          mergeObj.hasUsePriority = findCode(
            Ainit.yesOrNoList,
            data.hasUsePriority
          );
        }
      }
      if (this.dataObj.projectTypeCode === 2000) {
        mergeObj.projectRequirement = findCode(
          this.initData.pubProjectBaseInitRespVO.projectRequirementList,
          data.projectRequirement
        );
        if (mergeObj.isTroublesome || mergeObj.isTroublesome === 0) {
          mergeObj.isTroublesome = findCode(
            Binit.yesOrNoList,
            data.isTroublesome
          );
        }
        if (mergeObj.landNature) {
          mergeObj.landNature = findCode(Binit.landNatureList, data.landNature);
        }
        if (mergeObj.peripheralMatchingList) {
          mergeObj.peripheralMatchingList = findCodeArr(
            Binit.peripheralMatchingList,
            data.peripheralMatchingList
          );
        }
        if (mergeObj.devUncertainFactorsList) {
          mergeObj.devUncertainFactorsList = findCodeArr(
            Binit.devUncertainFactorsList,
            data.devUncertainFactorsList
          );
        }
        if (mergeObj.transferMode) {
          mergeObj.transferMode = findCode(
            Binit.transferModeList,
            data.transferMode
          );
        }
        if (mergeObj.isClean || mergeObj.isClean === 0) {
          mergeObj.isClean = findCode(Binit.yesOrNoList, data.isClean);
        }
        if (mergeObj.transferMethod) {
          mergeObj.transferMethod = findCode(
            Binit.transferMethodList,
            data.transferMethod
          );
        }
      }
      if (this.dataObj.projectTypeCode === 3000) {
        // mergeObj.projectRequirement = findCode(
        //   this.initData.pubProjectBaseInitRespVO.projectRequirementList,
        //   data.projectRequirement
        // );
        sortArr(mergeObj.transfereeConditionList);
        if (mergeObj.economicType) {
          mergeObj.economicType = findCode(
            Cinit.economicTypeList,
            data.economicType
          );
        }
        if (mergeObj.comType) {
          mergeObj.comType = findCode(Cinit.companyTypeList, data.comType);
        }
        if (mergeObj.manageScale) {
          mergeObj.manageScale = findCode(
            Cinit.manageScaleList,
            data.manageScale
          );
        }
        if (mergeObj.dealPayMethod) {
          mergeObj.dealPayMethod = findCode(
            Cinit.dealPayMethodList,
            data.dealPayMethod
          );
        }
        if (mergeObj.employeeContinue || mergeObj.employeeContinue === 0) {
          mergeObj.employeeContinue = findCode(
            Cinit.yesOrNoList,
            data.employeeContinue
          );
        }
        if (mergeObj.renewRequire || mergeObj.renewRequire === 0) {
          mergeObj.renewRequire = findCode(
            Cinit.yesOrNoList,
            data.renewRequire
          );
        }
        if (mergeObj.serviceRequire || mergeObj.serviceRequire === 0) {
          mergeObj.serviceRequire = findCode(
            Cinit.yesOrNoList,
            data.serviceRequire
          );
        }
        mergeObj.transfereeConditionList = findCodeArr(
          Cinit.transferConditionList,
          data.transfereeConditionList
        );
      }

      this.$refs.previewDialog.showDialogFuc("submit", mergeObj);
    },
    change(){
      let reg =  /^\d+.?\d{0,2}$/
      if(!reg.test(this.dataObj.startAmt)){
        this.$message({
          message: "请输入数字保留两位小数",
          type: "warning"
        });
        return false
      }
    },
    subFuc() {
      this.upThisForm()
    },
    upThisForm(){
      switch (this.dataObj.projectTypeCode) {
        case 3000:
          publishProjectC(this.freeDataObj)
            .then(res => {
              if (res && res.errorCode === 0) {
                this.$message({
                  showClose: true,
                  message: "发布成功",
                  type: "success"
                });
                this.resetForm("projectForm");
              }
              this.$refs.previewDialog.closeFuc();
            })
            .catch(() => {
              this.$refs.previewDialog.closeLoadingFuc();
            });
          break;
      }
    },
    //重置按钮
    resetForm(formName) {
      this.checkedM = false;
      this.dataObj.isConfer = 0;
      this.provinceInfo = "";
      this.cityInfo = "";
      (this.dataObj.comProvince = ""),
        (this.dataObj.comProvinceCode = ""),
        (this.dataObj.comCity = ""),
        (this.dataObj.comCityCode = ""),
        (this.showImg = []);
      this.dataObj.imageList = [];
      this.$refs[formName].resetFields();
      this.$refs[this.projectComponent].resetForm();
    },
    delImg(index, more) {
      this.showImg.splice(index, 1);
      this.dataObj.imageList.splice(index, 1);
    },
    uploadFuc(data, more, type) {
      upload(data).then(res => {
        if (res && res.errorCode === 0) {
          if (more) {
            this.showImg.push(res.body.filePath);
            this.dataObj.imageList.push(res.body.fileId);
          }
        }
      });
    },
    //探探版领域选择
    involvedDomainV2Fuc() {
      let code = this.dataObj.involvedDomainV2;
      Object.keys(tanTinvolvedDomainV2Type).forEach(key => {
        if (key.indexOf(code) == 0) {
          this.TTaninvolvedDomainV2Type = tanTinvolvedDomainV2Type[key];
          this.dataObj.domainSubCategory = this.TTaninvolvedDomainV2Type[0].code;
        }
      });
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
      this.tabValue = "";
    }
  }
};
</script>
<style lang="stylus" scoped>
.projectShares {
  .screening {
    padding: 30px;
  }

  .el-form>>>.el-form-item {
    margin-bottom: 0;
  }
}
.publishProject {
  .projectForm {
    padding: 30px 88px 0;

    .el-form>>>.el-form-item{
    margin-bottom: 22px;
  }
    >>> .el-form-item__label:before {
      content: '*';
      color: #f56c6c;
      margin-right: 4px;
    }

    .h1_title {
      width: 111px;
      font-size: 18px;
      font-weight: bold;
      padding: 0 12px 23px 0;
      box-sizing: border-box;
    }

    .form_div {
      display: flex;

      >>>.el-form-item__content {
        width: 233px;
        margin-right: 66px;
      }
    }

    .form_div1 {
      width: 500px;
    }

    .like_div {
      display: flex;

      >>>.el-form-item__content {
        margin-right: 66px;
      }

      >>> .el-form-item__label {
        font-weight: bold;
      }
    }

    .M_box {
      padding-left: 40px;

      .form_divM {
        display: flex;

        >>> .el-checkbox {
          margin-left: 30px;

          .el-checkbox__inner {
            width: 16px;
            height: 16px;
          }

          .el-checkbox__label {
            font-size: 16px;
          }
        }
      }
    }

    .item_title {
      margin-bottom: 12px;

      >>> .el-form-item__label {
        color: black;
        font-size: 16px;
      }
    }

    .tag_div {
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

    .spanInput {
      display: flex;
      width: 188px;

      .danwei {
        display: inline-block;
        width: 50px;
      }
    }
  }

  .submitBtn {
    width: 666px;
    text-align: center;
    padding: 50px 0;
    box-sizing: border-box;
  }
}
</style>
