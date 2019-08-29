<template>
    <el-dialog title="新闻查看" :visible.sync="showDialog" @close="closeFuc" width="1200px" center>
    <div class="newslistDetails">
      <el-form label-width="80px" label-position="left" style="padding-left:350px;">
        <div class="form_div">
          <el-form-item label="标题：">
            <span>{{dataObj.title}}</span>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="作者：">
            <span>{{dataObj.author}}</span>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="摘要：">
            <span>{{dataObj.description}}</span>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="权重：">
            <span>{{dataObj.homeRecommend}}</span>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="内容：">
            <!-- <div style="width:540px;line-height:20px;padding-top:10px;box-sizing: border-box">{{dataObj.content}}</div> -->
            <!-- <div class="inner ql-container ql-snow" v-html="dataObj.content" ></div> -->
            <div class="ql-container ql-snow">
              <div class="ql-editor" v-html="dataObj.content"></div>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer" v-if="dialogType == 'submit'">
      <el-button type="primary" @click="submitFuc" :loading="loadingBtn">发&nbsp;布</el-button>
    </span>
  </el-dialog> 
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
data() {
    return {
      dialogType: "",
      showDialog: false,
      loadingBtn: false,
      dataObj: {}
    };
  },
   methods: {
    showDialogFuc: function(type, showData) {
      this.dialogType = type;
      this.dataObj = showData;
      this.showDialog = true;
      console.log(type, showData);
    },
    closeFuc() {
      this.showDialog = false;
      this.loadingBtn = false;
    },
    closeLoadingFuc() {
      this.loadingBtn = false;
    },
    submitFuc() {
      this.$confirm("确定发布该项目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.loadingBtn = true;
          
          this.$emit("subFuc");
          this.showDialog = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发布"
          });
        });
    },
    resetForm() {
      this.showDialog = false;
    }
  }
}
</script>

<style scoped>
.el-dialog__header{
  padding: 0;
  line-height: 50px;
  background: #f2f2f2  !important;
}
.el-dialog__header > .el-dialog__title {
  font-size: 18px;
  font-weight: bold;
}
.ql-container {
  width: 400px;
  line-height: 20px;
  border: 0;
}

.ql-editor >>> img {
  width: 400px;
}
.ql-editor {
  padding-top: 10px;
  box-sizing: border-box;
  padding-left: 0;
}
.ql-editor >>> p {
  line-height: 20px;
}
</style>
