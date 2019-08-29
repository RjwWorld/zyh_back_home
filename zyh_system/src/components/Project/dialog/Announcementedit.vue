<template>
  <div class="EditDialog">
    <el-dialog title="编辑" :visible.sync="showDialog" width="500px" center>
      <div class="editing">
        <el-form :model="dataObj" ref="newslistform" size="medium" label-width="90px">
          <div class="form_div">
            <el-form-item label="新闻公告：" prop="msg">
              <el-input v-model="dataObj.msg" type="textarea" rows="5" maxlength="50"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div class="submitBtn">
          <el-button type="primary" :loading="loadingBtn" @click="editFuc">修&nbsp;改</el-button>
          <el-button @click="Fucc">取&nbsp;消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { bulletinmodifyById } from "@/api";
export default {
  data() {
    return {
      dataObj: {},
      showDialog: false,
      loadingBtn: false
    };
  },
  methods: {
    showDialogFuc(type, data) {
      this.dataObj = data;
      this.showDialog = true;
    },
    editFuc() {
      this.$confirm("确定修改该需求?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.loadingBtn = true;
          bulletinmodifyById(this.dataObj)
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
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    Fucc() {
    this.showDialog = false;
  }
  },
  
};
</script>

<style scoped>
.submitBtn {
  text-align: center;
}
</style>
