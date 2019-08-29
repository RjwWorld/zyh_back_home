<template>
  <div class="demandList">
    <div class="screening">
      <el-form :inline="true" class="demo-form-inline">
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
      <el-dialog title="添加需求" :visible.sync="open" width="1300px" center>
        <div class="publishDemand">
          <div class="demandForm">
            <el-form
              :model="dataObj"
              label-position="left"
              ref="demandForm"
              size="medium"
              label-width="111px"
              :rules="rules"
            >
              <div class="form_div">
                <el-form-item label="需求标题" prop="projectName">
                  <el-input
                    v-model="dataObj.projectName"
                    type="text"
                    placeholder="需求标题"
                    maxlength="30"
                  ></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="地址">
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
                <el-form-item label="详细地址" prop="comAddrDtl">
                  <el-input v-model="dataObj.comAddrDtl" type="text" placeholder maxlength="50"></el-input>
                </el-form-item>
              </div>
              <div class="form_div1">
                <el-form-item label="总价">
                  <div class="form_divM">
                    <span class="divM_span">
                      <el-form-item prop="startAmt">
                        <el-input
                          :disabled="checkedM"
                          v-model="dataObj.startAmt"
                          type="text"
                          placeholder
                          maxlength="10"
                          @change="blur"
                        ></el-input>
                      </el-form-item>
                    </span>
                    <span>&nbsp;&nbsp;---&nbsp;&nbsp;</span>
                    <span class="divM_span">
                      <el-form-item prop="endAmt">
                        <el-input
                          :disabled="checkedM"
                          v-model="dataObj.endAmt"
                          type="text"
                          placeholder
                          maxlength="10"
                          @change="blurtwo"
                        ></el-input>
                      </el-form-item>
                    </span>
                    <span class="divM_unit">万元</span>
                    <el-checkbox
                      v-model="checkedM"
                      @change="dataObj.startAmt = checkedM ? '': dataObj.startAmt;
                                dataObj.endAmt = checkedM ? '': dataObj.endAmt"
                    >面议</el-checkbox>
                  </div>
                </el-form-item>
              </div>
              <div class="like_div">
                <el-form-item label="联系人" prop="linkMan">
                  <el-input v-model="dataObj.linkMan" type="text" placeholder="联系人" maxlength="15"></el-input>
                </el-form-item>
                <el-form-item label="联系人电话" prop="linkTel">
                  <el-input
                    v-model="dataObj.linkTel"
                    type="text"
                    placeholder="联系人电话"
                    maxlength="11"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="form_div1">
                <el-form-item label="需求详情" prop="dtlInf">
                  <el-input
                    type="textarea"
                    :rows="6"
                    placeholder="请输入内容"
                    v-model="dataObj.dtlInf"
                    maxlength="300"
                  ></el-input>
                </el-form-item>
              </div>
            </el-form>

            <div class="submitBtn">
              <el-button type="primary" @click="submitForm('demandForm')">预&nbsp;览</el-button>
              <el-button @click="resetForm('demandForm')">重&nbsp;置</el-button>
              <!-- <demand-dialog ref="previewDialog" @submitFuc="submitFuc"/> -->
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <table-list
      :tableTitle="tableHeader"
      :tableData="tableData"
      @changeFuc="changeFuc"
      @operation="operation"
    />
    <demand-dialog ref="previewDialog" @submitFuc="submitFuc" @subFuc="subFuc"/>
    <demand-edit-dialog ref="editDialog" @changeFuc="changeFuc"/>
    <!-- <project-edit-dialog ref="editDialog" @editFuc="editFuc"/> -->
  </div>
</template>

<script>
import { provinceList, cityList } from "@/files/js/areaData";
import { cloneObj } from "@/files/js/cloneObj";
import { publishRequirement } from "@/api";
import allTableHeader from "@/files/js/tableHeader";
import { projectStatu } from "@/files/js/initData";
import TableList from "@/components/Table/table";
import DemandDialog from "@/components/Project/dialog/demandDialog";
import DemandEditDialog from "@/components/Project/dialog/demandEditDialog";
import {
  projectList,
  projectStatus,
  deleteProject,
  getProjectDtl
} from "@/api";
import { isvalidPhone, isvalidSmallNum2 } from "@/files/js/rules";
var validProjectName = (rule, value, callback) => {
  if (!value) {
    callback(new Error("该输入框不能为空！"));
  } else {
    callback();
  }
};
var validPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入手机号码！"));
  } else if (!isvalidPhone(value)) {
    callback(new Error("请输入正确的11位手机号码！"));
  } else {
    callback();
  }
};
var validSmallNum2 = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入数字！"));
  } else if (!isvalidSmallNum2(value)) {
    callback(new Error("保留两位小数"));
  } else {
    callback();
  }
};
export default {
  components: {
    TableList,
    DemandDialog,
    DemandEditDialog
  },
  data() {
    return {
      open: false,
      loadingBtn: false,
      tableHeader: allTableHeader.demandHeader,
      initSelectData: {
        projectStatu
      },
      tableData: {},
      tableObj: {
        keyWord: "",
        status: null,
        pageSize: 8,
        startPage: 1,
        type: 1
      },
      checkedM: false, //是否面议
      dataObj: {
        projectName: "", //需求标题
        comProvince: "", //省份
        comProvinceCode: "", //省份code
        comCity: "", //城市
        comCityCode: "", //城市code
        comAddrDtl: "", //详细地址
        isConfer: "", //面议
        startAmt: "", //开始价钱
        endAmt: "", //结束价钱
        linkMan: "", //联系人
        linkTel: "", //联系电话
        dtlInf: "" //需求详情
      },

      //省 市下拉框
      province: provinceList,
      city: [],
      provinceInfo: "",
      cityInfo: "",
      rules: {
        projectName: [
          { hide: true, trigger: "blur", validator: validProjectName }
        ],
        comAddrDtl: [
          { hide: true, trigger: "blur", validator: validProjectName }
        ],
        dtlInf: [{ hide: true, trigger: "blur", validator: validProjectName }],
        // startAmt: [
        //   {hide: true, trigger: 'blur', validator: validSmallNum2}
        // ],
        // endAmt: [
        //   {hide: true, trigger: 'blur', validator: validSmallNum2}
        // ],
        linkMan: [{ hide: true, trigger: "blur", validator: validProjectName }],
        linkTel: [{ hide: true, trigger: "blur", validator: validPhone }]
      }
    };
  },
  activated() {
    this.initWeb();
  },
  methods: {
    previewFuc() {
     
      let baseObj = cloneObj(this.dataObj);
      this.$refs.previewDialog.showDialogFuc("submit", baseObj);
    },
    blur(){
      let reg =  /^\d+.?\d{0,2}$/
     if(!reg.test(this.dataObj.startAmt)){
       this.$message({
          message: "请输入数字保留两位小数",
          type: "warning"
        });
        return false
     }
    },
    blurtwo(){
let reg =  /^\d+.?\d{0,2}$/
     if(!reg.test(this.dataObj.endAmt)){
       this.$message({
          message: "请输入数字保留两位小数",
          type: "warning"
        });
        return false
     }
    },
    subFuc() {
     this.tijiao()
    },
    tijiao() {
      publishRequirement(this.dataObj)
        .then(res => {
          if (res.errorCode === 0) {
            this.$message({
              showClose: true,
              message: "发布成功",
              type: "success"
            });
            this.open = false;
            this.resetForm("demandForm");
          }
          this.$refs.previewDialog.closeFuc();
        })
        .catch(() => {
          this.$refs.previewDialog.closeLoadingFuc();
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
    resetForm(formName) {
      this.provinceInfo = "";
      this.cityInfo = "";
      this.$refs[formName].resetFields();
    },
    //按钮操作
    operation(type, data) {
      let obj;
      switch (type) {
        case "up":
          obj = {
            projectId: data.projectId,
            projectType: 1,
            status: 2
          };
          this.$confirm("确定上架此项目?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
            .then(() => {
              projectStatus(obj).then(res => {
                if (res.errorCode === 0) {
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
            projectType: 1,
            status: 0
          };
          this.$confirm("确定下架此项目?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
            .then(() => {
              projectStatus(obj).then(res => {
                if (res.errorCode === 0) {
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
          this.$confirm("确定删除此项目?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              deleteProject({ projectId: data.projectId }).then(res => {
                if (res.errorCode === 0) {
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
          this.demandLook(data.projectId, type);
          break;
        case "edit":
          this.demandLook(data.projectId, type);
          break;
        case "look":
          this.demandLook(data.projectId, type);
          break;
      }
    },
    //审核提交
    submitFuc(data) {
      projectStatus(data).then(res => {
        if (res.errorCode === 0) {
          this.$message({
            showClose: true,
            message: "提交成功",
            type: "success"
          });
          this.changeFuc();
          this.$refs.previewDialog.resetForm();
        }
      });
    },
    demandLook(projectId, type) {
      getProjectDtl({ projectId }).then(res => {
        if (res.errorCode === 0) {
          if (type == "audit" || type == "look") {
            // if(type == 'audit'){
            //     this.$refs.auditDialog.showDialogFuc(res.body);
            // }
            // if(type == 'look'){
            this.$refs.previewDialog.showDialogFuc(type, res.body);
            // }
          }
          if (type == "edit") {
            this.$refs.editDialog.showDialogFuc(res.body);
          }
        }
      });
    },
    changeFuc(type, value) {
      // console.log(value)
      this.loadingBtn = true;
      if (type == "page") {
        // console.log(type,this)
        this.tableObj.startPage = value;
      }
      projectList(this.tableObj).then(res => {
        if (res.errorCode == 0) {
          this.loadingBtn = false;
          this.tableData = res.body;
        }
      });
    },
    initWeb() {
      this.changeFuc();
    },
    submitForm(demandForm) {
       this.dataObj.isConfer = this.checkedM ? 1 : 0; //面议
      this.$refs[demandForm].validate(valid => {
        if (valid) {
          console.log(this.dataObj.isConfer)
          if(this.dataObj.isConfer == 0 &&
        this.dataObj.startAmt != "" &&
        this.dataObj.endAmt != ""){
            this.previewFuc();
          }else if(this.dataObj.isConfer == 1){
            this.previewFuc();
          }
          else{
            this.$message({
          message: "选择总价",
          type: "warning"
        });
        return false
          }
         
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.demandList {
  .screening {
    padding: 30px;
  }

  .el-form>>>.el-form-item {
    margin-bottom: 0;
  }
}

.publishDemand {
  .demandForm {
    padding: 30px 250px;
    box-sizing: border-box;

    >>> .el-form {
      .el-form-item__label {
        padding-right: 30px;
      }

      .el-form-item__label:before {
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
      }
    }

    .form_div {
      display: flex;
      margin-bottom: 20px;

      >>>.el-form-item__content {
        width: 233px;
        margin-right: 66px;
      }
    }

    .form_div1 {
      width: 500px;
      margin-top: 20px;

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

        .divM_span {
          display: inline-block;
          width: 88px;
        }

        .divM_unit {
          margin-left: 8px;
          color: #606266;
        }
      }
    }

    .like_div {
      display: flex;
      margin-top: 20px;

      >>>.el-form-item__content {
        margin-right: 66px;
      }

      >>> .el-form-item__label {
        font-weight: bold;
      }
    }

    .spanInput {
      display: inline-block;
      width: 200px;
    }

    .submitBtn {
      width: 777px;
      text-align: center;
      padding: 50px 0;
      box-sizing: border-box;
    }
  }
}
</style>
