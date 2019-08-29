<template>
  <div class="projectEditDialog">
    <el-dialog title="修改" :visible.sync="showDialog" width="1000px" center>
      <div class="projectForm">
        <el-form
          :model="dataObj"
          label-position="left"
          ref="projectForm"
          size="medium"
          label-width="122px"
        >
          <h1 class="h1_title">基本信息</h1>
          <div class="form_div">
            <el-form-item label="资质类型：" prop="qualificationType">
              <el-select v-model="dataObj.qualificationType" placeholder="请选择">
                <el-option v-for="item in dropdown" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="资质等级：" prop="qualificationLevel">
              <el-select v-model="dataObj.qualificationLevel" placeholder="请选择">
                <el-option v-for="item in dropd" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="form_div1">
            <el-form-item label="需求形式：" prop="demandForm">
              <el-input v-model="dataObj.demandForm" type="text" placeholder="需求形式" maxlength="25"></el-input>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="对接人：" prop="dockingMan">
              <el-input v-model="dataObj.dockingMan" type="text" placeholder="对接人"></el-input>
            </el-form-item>
            <el-form-item label="对接人电话：" prop="dockingTel">
              <el-input v-model="dataObj.dockingTel" type="text" placeholder="对接人电话" maxlength="11"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="loadingBtn" @click="editFuc">修&nbsp;改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { cloneObj } from "@/files/js/cloneObj";
import { upload, modifyQualification, updateCallList } from "@/api";
import { projectStatu, dropdown, dropd } from "@/files/js/initData";
export default {
  data() {
    return {
      showDialog: false,
      loadingBtn: false,
      dropdown,
      dropd,
      dataObj: {}
    };
  },
  methods: {
    showDialogFuc(data, init) {
      this.initData = init;
      this.showDialog = true;
      this.dataObj = cloneObj(data);
    },

    editFuc() {
      this.$confirm("确定修改该项目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.loadingBtn = true;
          updateCallList(this.dataObj)
            .then(res => {
              if (res && res.errorCode === 0) {
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.projectEditDialog {
  .projectForm {
    padding: 30px 88px 0;

    .base_form {
      >>> .el-form-item__label:before {
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
      }
    }

    .must_div {
      >>> .el-form-item__label:before {
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
      }
    }

    .optional_div {
      padding-top: 50px;
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
        width: 200px;
        margin-right: 66px;
      }
    }

    .form_div1 {
      width: 320px;

      .form_divH {
        display: flex;

        .house_park {
          display: inline-block;
          width: 88px;
        }
      }
    }

    .children_div {
      padding-left: 40px;
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
      display: inline-block;
      width: 188px;
      position: relative;

      .danwei {
        display: inline-block;
        width: 50px;
        position: absolute;
        top: 0;
        right: -60px;
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
