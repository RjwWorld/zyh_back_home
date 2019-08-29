<template>
  <div class="landList">
    <div class="screening">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
      <el-dialog title="添加" :visible.sync="open" width="1300px" center>
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
                  <span v-if="dataObj.industryGuideList.length < 4">
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
                <el-form-item label="标准厂房租价：" prop="startAmt" label-width="122px">
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
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('projectForm')">预览</el-button>
          <el-button @click="resetForm('projectForm')">重置</el-button>
          <park-survey-dialog ref="previewDialog" @submitFuc="submitFuc"/>
        </span>
      </el-dialog>
    </div>
    <table-list
      :tableTitle="tableHeader"
      :tableData="tableData"
      @changeFuc="changeFuc"
      @operation="operation"
    />
    <park-survey-dialog ref="previewDialog" @submitFuc="submitFuc" @subFuc="subFuc"/>
    <park-survey-edit-dialog ref="editDialog" @changeFuc="changeFuc"/>
  </div>
</template>
<script>
  import allTableHeader from "@/files/js/tableHeader";
  import TableList from "@/components/Table/table";
  import { projectStatu } from "@/files/js/initData";
  import {
    parkSurveyList, //列表接口
    projectStatus, //审核状态接口
    getIdParkSurvey, //查看详情接口
    insertSurvey,
    delPark,
    deleteProject,
    pubProjectInit,
    upload,
    publishProjectB,
    domainV2Init
  } from "@/api";
  import parkSurveyDialog from "@/components/industrialPark/parkSurveyDialog";
  import parkSurveyEditDialog from "@/components/industrialPark/parkSurveyEditDialog";
  import { cloneObj } from "@/files/js/cloneObj";
  import { findCode, findCodeArr, sortArr } from "@/files/js/findCode";
  import { provinceList, cityList, areaList } from "@/files/js/areaData";
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
    components: {
      TableList,
      parkSurveyDialog,
      parkSurveyEditDialog,
    },
    data() {
      return {
        open:false,
        checkedM: false,
        loadingBtn: false,
        showImg: [], //图片列表
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
        tableHeader: allTableHeader.parkSurveyHeader,
        initSelectData: {
          projectStatu,
        },
        tableData: {},
        tableObj: {
          keyWord: "",
          status: null,
          projectTypeCode: 2000,
          pageSize: 8,
          startPage: 1,
          type: 0
        },
        dataObj: {
          projectName: "", //名字
          comProvince: "", //省
          comProvinceCode: "", //省 区号
          comCity: "", //市
          comCityCode: "", //市 区号
          comArea: "",
          comAreaCode: "",
          comAddrDtl: "", //详细地址
          linkMan: "", //联系人
          linkTel: "", //联系人电话
          taxPolicy : '',//优惠政策
          dtlInf : '',//园区概况
          industryGuideList: [], //产业导向列表
          industryGuide: '',
          startAmt: '',//标准厂房租价
          imageList: [] //图片列表
        },
        freeDataObj: {}, //上传的对象
        //省 市下拉框
        province: provinceList,
        city: [],
        provinceInfo: "",
        cityInfo: "",
        area: [],
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
                delPark({ id: data.id }).then(res => {
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
      projectLook(id, type) {
        getIdParkSurvey({ id }).then(res => {
          if (res.errorCode === 0) {
            let projectData = res.body
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
        //return出处理好的数据
        return modelReqVO;
      },
      //将对象数据转化函数
      changeFuc(type, value) {
        this.loadingBtn = true;
        if (type == "page") {
          this.tableObj.startPage = value;
        }
        parkSurveyList(this.tableObj).then(res => {
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
        this.mergeFuc();
      },
      mergeFuc(data) {
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
        mergeObj.imageList = this.showImg;
        this.$refs.previewDialog.showDialogFuc("submit", mergeObj);
      },
      subFuc() {
        insertSurvey(this.freeDataObj)
          .then(res => {
            if (res && res.errorCode === 0) {
              this.$refs.previewDialog.closeFuc();
              this.$message({
                showClose: true,
                message: "发布成功",
                type: "success"
              });
              this.changeFuc();
              this.resetForm("projectForm");
            }
          })
          .catch(() => {
            this.$refs.previewDialog.closeLoadingFuc();
          });
      },
      //重置按钮
      resetForm(formName) {
        this.provinceInfo = "";
        this.cityInfo = "";
        (this.dataObj.comProvince = ""),
          (this.dataObj.comProvinceCode = ""),
          (this.dataObj.comCity = ""),
          (this.dataObj.comCityCode = ""),
          (this.dataObj.comArea = ""),
          (this.dataObj.comAreaCode = ""),
        this.$refs[formName].resetFields();
        this.$refs[this.projectComponent].resetForm();
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
        this.tabValue = "";
      },
      submitForm(projectForm) {
        this.$refs[projectForm].validate((valid) => {
          if (valid) {
            this.previeFuc()
          } else {
            return false;
          }
        });
      },
    }
  };
</script>
<style lang="stylus" scoped>
  .landList {
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


