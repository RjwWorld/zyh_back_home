<template>
  <div class="invest">
    <div class="screening">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="项目类别：">
          <el-select v-model="tableObj.status" @change="changeFuc('page',1)" placeholder="请选择">
            <el-option v-for="item in initSelectData.projectStatu" :key="item.code" :label="item.text" :value="item.code"></el-option>
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
      <!--点击添加弹出的对话框-->
     <el-dialog title="添加投资" :visible.sync="open" width="1300px" center>
        <div class="publishProject">
          <div class="projectForm">
            <el-form
              :model="dataObj"
              label-position="left"
              ref="projectForm"
              size="medium"
              label-width="122px"
            >

              <div class="form_div">
                <el-form-item label="公司名称：" prop="involvedDomainV2">
                  <el-input v-model="dataObj.comName" type="text" placeholder="公司名称"></el-input>
                </el-form-item>

                <el-form-item label="项目名称：" prop="projectName">
                  <el-input v-model="dataObj.projectName" type="text" placeholder="项目名称"></el-input>
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
              <div class="form_div">
                <el-form-item label="详细地址：" prop="comAddrDtl">
                  <el-input v-model="dataObj.comAddrDtl" type="text" placeholder="详细地址"></el-input>
                </el-form-item>
                <el-form-item label="法人控股人：" prop="legalPersonHolding">
                  <el-input v-model="dataObj.legalPersonHolding" type="text" placeholder="法人控股人"></el-input>
                </el-form-item>
              </div>
              <div class="form_div">
                <el-form-item label="注册时间：" prop="registrationTime ">
                  <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="dataObj.registrationTime"></el-date-picker>
                </el-form-item>
                <el-form-item label="注册号：" prop="registrationNumber">
                  <el-input v-model="dataObj.registrationNumber" type="text" placeholder="注册号"></el-input>
                </el-form-item>
              </div>

              <div class="form_div">
                <el-form-item label="统一社会信用代码:" prop="socialCreditCode" label-width="150px">
                  <el-input v-model="dataObj.socialCreditCode" type="text" placeholder="统一社会信用代码"></el-input>
                </el-form-item>
                <el-form-item label="登记机关：" prop="registrationAuthority">
                  <el-input v-model="dataObj.registrationAuthority" type="text" placeholder="登记机关"></el-input>
                </el-form-item>
              </div>
              <div class="form_div">
                <el-form-item label="联系人：" prop="linkMan">
                  <el-input v-model="dataObj.linkMan" type="text" placeholder="联系人"></el-input>
                </el-form-item>
                <el-form-item label="联系人电话：" prop="linkTel">
                  <el-input v-model="dataObj.linkTel" type="text" placeholder="联系人电话"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="营业期限：" prop="startBizTime ">
                  <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  v-model="dataObj.startBizTime">
                </el-date-picker> -
                  <el-date-picker
                  type="date"
                   placeholder="选择日期"
                   value-format="yyyy-MM-dd"
                   v-model="dataObj.endBizTime">
                  </el-date-picker>
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
              <div class="tag_div">
                <el-form-item label="关键字：" prop="keyWordsList">
                  <el-tag
                    :key="tag"
                    v-for="tag in dataObj.keyWordsList"
                    closable
                    @close="delTag(tag)"
                  >{{tag}}</el-tag>
                  <span v-if="dataObj.keyWordsList.length < 3">
                    <el-input
                      class="input-new-tag"
                      v-if="tabVisible"
                      v-model="tabValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm"
                    ></el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">点击添加关键字</el-button>
                  </span>
                </el-form-item>
              </div>
              <div class="form_div">
                <el-form-item label="预计年投资量：" prop="yearInvestment" label-width="122px">
                    <div>
                      <span class="spanInput">
                        <el-input v-model="dataObj.yearInvestment" type="text" placeholder="年投资量"></el-input>
                        <span class="danwei">万元</span>
                      </span>
                    </div>
                </el-form-item>
                <el-form-item label="集团总资产：" prop="groupAssets" label-width="122px">
                  <div>
                      <span class="spanInput">
                        <el-input v-model="dataObj.groupAssets" type="text" placeholder="总资产"></el-input>
                        <span class="danwei">万元</span>
                      </span>
                    </div>
                </el-form-item>
              </div>
              <div class="form_div">
                <el-form-item label="剩余投量：" prop="remaindInvestment" label-width="122px">
                    <div>
                      <span class="spanInput">
                        <el-input v-model="dataObj.remaindInvestment" type="text" placeholder="剩余投量"></el-input>
                        <span class="danwei">万元</span>
                      </span>
                    </div>
                </el-form-item>
                <el-form-item label="已投放比：" prop="putRatio" label-width="122px">
                  <div>
                      <span class="spanInput">
                        <el-input v-model="dataObj.putRatio" type="text" placeholder="已投放比"></el-input>
                        <span class="danwei">%</span>
                      </span>
                    </div>
                </el-form-item>
              </div>
              <div class="form_div">
                <el-form-item label="经营范围：" prop="bizScope" label-width="122px">
                  <el-input type="textarea" v-model="dataObj.bizScope" :rows="6"></el-input>
                </el-form-item>
              </div>
              <div class="form_div">
                <el-form-item label="公司介绍：" prop="comIntroduction" label-width="122px">
                  <el-input type="textarea" v-model="dataObj.comIntroduction" :rows="6"></el-input>
                </el-form-item>
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
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="previeFuc">预览</el-button>
          <el-button @click="resetForm('projectForm')">重置</el-button>
          <!-- <invest-dialog ref="previewDialog" @submitFuc="submitFuc"/> -->
        </span>
      </el-dialog>
    </div>
    <table-list
      :tableTitle="tableHeader"
      :tableData="tableData"
      @changeFuc="changeFuc"
      @operation="operation"
    />
    <!--operation 操作-->
    <invest-dialog ref="previewDialog" @submitFuc="submitFuc" @subFuc="subFuc"/>
    <invest-edit-dialog ref="editDialog" @changeFuc="changeFuc"/>
  </div>
</template>
<script>
import allTableHeader from "@/files/js/tableHeader";
import TableList from "@/components/Table/table";
import { projectStatu,comTypeOne,comTypeTwo } from "@/files/js/initData";//项目状态下拉选项
import {
  tanTinvolvedDomainV2,//公司类别选项
  tanTinvolvedDomainV2Type//土地和融资状态
} from "@/files/js/tanTInvolvedDomain";
import {
  listCapitalSide,//表中的数据接口
  projectStatus,//审核上架下架接口
  getIdCapitalSide,//资本方详情
  delCapitalSide,
  pubProjectInit,
  insertCapitalSide,
  upload,
  publishProjectA,
  publishProjectB,
  domainV2Init
} from "@/api";
import investDialog from "@/components/invest/investDialog";
import investEditDialog from "@/components/invest/investEditDialog";
import { cloneObj } from "@/files/js/cloneObj";
import { findCode, findCodeArr, sortArr } from "@/files/js/findCode";
import UploadImg from "@/components/UploadImg/uploadImg";
import { provinceList, cityList } from "@/files/js/areaData";
export default {
  components: {
    TableList,//表格组件
    investDialog,//审核查看预览弹窗组件
    // ProjectEditDialog,//需求列表修改编辑
    UploadImg,
    investEditDialog,//编辑页面
  },
  data() {
    return {
      open:false,
      checkedM: false,
      loadingBtn: false,
      // showImg: [], //图片列表
      tabVisible: false, //添加标签
      tabValue: "",
      initData: {
        myPreferenceInitRespVO: {},//项目领域下拉选项
        // pubProjectBaseInitRespVO: {},//探探版领域下拉选项
        // pubProjectAInitRespVO: {},
        // pubProjectBInitRespVO: {},
        // pubProjectCInitRespVO: {},
        body: []
      },
      investmentOrientationArr: "",//投资方向
      formInline: {
        user: ""
      },
      //表头
      tableHeader: allTableHeader.investHeader,
      //项目下拉选项
      initSelectData: {
        projectStatu,
        comTypeOne,
        comTypeTwo
      },
      tableData: {},//表中的数据
      //传给后台的数据
      tableObj: {
        keyWord: "",
        status: null,
        pageSize: 8,
        startPage: 1,
      },
      dataObj: {
        comName: "", //公司
        comProvince: "", //省
        comProvinceCode: "", //省 区号
        comCity: "", //市
        comCityCode: "", //市 区号
        comAddrDtl: "", //详细地址
        linkMan: "", //联系人
        linkTel: "", //联系人电话
        registrationTime: "",//注册时间
        registrationNumber: "",//注册号
        socialCreditCode: "",//组织机构代码
        registrationAuthority: "",//登记机关
        startBizTime: "",//起止营业时间
        endBizTime: "",//结束营业时间
        comType: "",//公司类型
        investmentDirection: "",//投资方向
        yearInvestment: "",//预计年投资量
        groupAssets: "",//集团总资产
        remaindInvestment: "",//剩余投量
        putRatio: "",//已投资比
        bizScope: "",//经营范围
        comIntroduction:"",//公司介绍
        dealStatus: "",//经营状态
        legalPersonHolding:"",//法人控股人
        projectName: "",//项目名称
        keyWordsList: [],//关键字
        comLogo: '', //公司logo
      },
      freeDataObj: {}, //上传的对象
      //省 市下拉框
      province: provinceList,
      city: [],
      provinceInfo: "",
      cityInfo: ""
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
        this.investmentOrientationArr=res.body.myPreferenceInitRespVO.domainList
        console.log(this.investmentOrientationArr)
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
            projectType: 0,
            status: 2,
            projectId: data.projectId
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
              delCapitalSide({ id: data.id }).then(res => {
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
        //审核
        case "audit":
          this.projectLook(data.id, type);
          break;
        //编辑
        case "edit":
          this.projectLook(data.id, type);
          break;
        //查看
        case "look":
          this.projectLook(data.id, type);
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
            this.$message({
              showClose: true,
              message: "提交成功",
              type: "success"
            });
          }
        })
        .catch(() => {
          this.$refs.previewDialog.closeLoadingFuc();
        });
    },
    //点击查看、审核、修改
    projectLook(id, type) {
      getIdCapitalSide({ id }).then(res => {
        if (res.errorCode === 0) {
          let projectData = res.body
          console.log(res.body,'我是详情')

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
      // this.modelReqVOFuc(data.projectTypeCode, modelReqVO, data);
      // if (modelReqVO.involvedDomain) {
      //   modelReqVO.involvedDomain = findCode(
      //     this.initData.myPreferenceInitRespVO.domainList,
      //     data.involvedDomain
      //   );
      // }
      // modelReqVO.projectRequirement = findCode(
      //   this.initData.pubProjectBaseInitRespVO.projectRequirementList,
      //   data.projectRequirement
      // );
      if (modelReqVO.involvedDomainV2) {
        modelReqVO.involvedDomainV2 = findCode(
          tanTinvolvedDomainV2,
          data.involvedDomainV2
        );
      }
      //return出处理好的数据
      return modelReqVO;
    },



    //初始化表中的数据将数据赋值给tableData
    changeFuc(type, value) {
      // console.log(1)
      this.loadingBtn = true;
      if (type == "page") {
        this.tableObj.startPage = value;
      }
      listCapitalSide(this.tableObj).then(res => {
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
      this.mergeFuc();//点击预览
    },
    mergeFuc(data) {
      let dataObjC = cloneObj(this.dataObj);
      let dataC = cloneObj(data);
      let mergeObj = Object.assign(dataObjC, dataC);
      // console.log(mergeObj)
      this.freeDataObj = cloneObj(mergeObj);
      if (mergeObj.involvedDomain) {
        mergeObj.involvedDomain = findCode(
          this.initData.myPreferenceInitRespVO.domainList,
          this.dataObj.involvedDomain
        );
      }
      mergeObj.imageList = this.showImg;
      this.$refs.previewDialog.showDialogFuc("submit", mergeObj);
    },
    subFuc() {
      insertCapitalSide(this.freeDataObj)
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
    },
    //重置按钮
    resetForm(formName) {
      this.checkedM = false;
      this.provinceInfo = "";
      this.cityInfo = "";
      (this.dataObj.comProvince = ""),
      (this.dataObj.comProvinceCode = ""),
      (this.dataObj.comCity = ""),
      (this.dataObj.comCityCode = ""),
      (this.dataObj.comName = ""),
      (this.dataObj.comType = ""),
      (this.dataObj.dealStatus = ""),
      (this.dataObj.registrationTime = ""),
      (this.dataObj.startBizTime = ""),
      (this.dataObj.endBizTime = ""),
        // (this.showImg = []);
      this.dataObj.comLogo = '';
      this.$refs[formName].resetFields();
    },
    delImg(index) {
      // this.showImg.splice(index, 1);
      // this.dataObj.imageList.splice(index, 1);
    },
    uploadFuc(data,more,type) {
      upload(data).then(res => {
        if (res && res.errorCode === 0) {
          let typeType = type.type;
           console.log(res);
          switch(typeType){
            case 'comLogo':
              this.dataObj.comLogo = res.body.fileId
              break;
            }
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
      this.tabValue = "";
    }
  }
};
</script>
<style lang="stylus" scoped>
.invest {
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
