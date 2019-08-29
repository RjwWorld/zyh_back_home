<template>
  <!-- 需求列表修改编辑 -->
  <div class="demandEditDialog">
    <el-dialog title="修改" :visible.sync="showDialog" width="900px" center @close="down('demandForm')">
      <div class="demandForm">
        <el-form :model="dataObj" ref="demandForm" size="medium" label-width="133px" :rules="rules">
          <div class="form_div">
            <el-form-item label="需求标题" prop="projectName">
              <el-input v-model="dataObj.projectName" type="text" placeholder="需求标题" maxlength="30"></el-input>
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
              <el-input v-model="dataObj.linkTel" type="text" placeholder="联系人电话" maxlength="11"></el-input>
            </el-form-item>
          </div>
          <div class="form_div1">
            <el-form-item label="需求详情" prop="dtlInf">
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                maxlength="300"
                v-model="dataObj.dtlInf"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>

        <div class="submitBtn">
          <el-button type="primary" :loading="loadingBtn" @click="submitForm('demandForm')">修&nbsp;改</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { provinceList, cityList } from "@/files/js/areaData";
import { cloneObj } from "@/files/js/cloneObj";
import { updateRequirement } from "@/api";
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
  data() {
    return {
      loadingBtn: false,

      checkedM: false, //是否面议
      showDialog: false,
      dataObj: {},

      //省 市下拉框
      province: provinceList,
      city: [],
      time: [],
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
        //   startAmt: [
        //     {hide: true, trigger: 'blur', validator: validSmallNum2}
        //   ],
        //   endAmt: [
        //     {hide: true, trigger: 'blur', validator: validSmallNum2}
        //   ],
        linkMan: [{ hide: true, trigger: "blur", validator: validProjectName }],
        linkTel: [{ hide: true, trigger: "blur", validator: validPhone }]
      }
    };
  },
  methods: {
      down(demandForm){
          this.$refs[demandForm].resetFields()
      },
    blur() {
      let reg = /^\d+.?\d{0,2}$/;
      if (!reg.test(this.dataObj.startAmt)) {
        this.$message({
          message: "请输入数字保留两位小数",
          type: "warning"
        });
        return false;
      }
    },
    blurtwo() {
      let reg = /^\d+.?\d{0,2}$/;
      if (!reg.test(this.dataObj.endAmt)) {
        this.$message({
          message: "请输入数字保留两位小数",
          type: "warning"
        });
        return false;
      }
    },
    submitForm(demandForm) {
      this.$refs[demandForm].validate(valid => {
        if (valid) {
          this.editFuc();
        } else {
          return false;
        }
      });
    },
    editFuc() {
      this.$confirm("确定修改该需求?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.loadingBtn = true;
          this.dataObj.isConfer = this.checkedM ? 1 : 0; //面议
          if (
            this.dataObj.isConfer == 0 &&
            this.dataObj.startAmt != "" &&
            this.dataObj.endAmt != ""
          ) {
            console.log("有内容");

            updateRequirement(this.dataObj)
              .then(res => {
                if (res.errorCode === 0) {
                  this.showDialog = false;
                  this.$emit("changeFuc");
                  this.$message({
                    showClose: true,
                    message: "修改成功",
                    type: "success"
                  });
                }
                this.loadingBtn = false;
              })
              .catch(() => {
                this.loadingBtn = false;
              });
          } else if (this.dataObj.isConfer == 1) {
            console.log(2);
            updateRequirement(this.dataObj)
              .then(res => {
                if (res.errorCode === 0) {
                  this.showDialog = false;
                  this.$emit("changeFuc");
                  this.$message({
                    showClose: true,
                    message: "修改成功",
                    type: "success"
                  });
                }
                this.loadingBtn = false;
              })
              .catch(() => {
                this.loadingBtn = false;
              });
          } else {
            this.$message({
              message: "选择总价",
              type: "warning"
            });
            this.loadingBtn = false;
            return false;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    showDialogFuc(data) {
      this.dataObj = cloneObj(data);
      //面议
      this.checkedM = this.dataObj.isConfer === 0 ? false : true;
      //地区
      this.provinceInfo = this.dataObj.comProvince;
      this.cityInfo = this.dataObj.comCity;

      this.showDialog = true;
    },
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
    }
  }
};
</script>

<style lang="stylus" scoped>
.demandEditDialog {
  .demandForm {
    padding: 30px;
    padding-bottom: 100px;

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

      >>>.el-form-item__content {
        width: 233px;
        margin-right: 66px;
      }
    }

    .form_div1 {
      width: 500px;

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
