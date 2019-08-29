<template>
  <div class="newsList">
    <div class="screening">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="状态：">
          <el-select @change="changeFuc('page',1)" placeholder="请选择" v-model="tableObj.status">
            <el-option
              v-for="item in initSelectData.Consultstate"
              :key="item.code"
              :label="item.text"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            @keyup.enter.native="changeFuc('page',1)"
            placeholder="编号、标题关键字"
            v-model="tableObj.keyWord"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="changeFuc('page',1)"
            :loading="loadingBtn"
            style="background-color: #FF8800;border:0;"
            icon="el-icon-search"
          >查&nbsp;询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="open=true"
            style="background-color: #0ECC47;border:0;"
          >添&nbsp;加</el-button>
          <el-dialog title="资讯添加" :visible.sync="open" width="1200px" center @close="down('newslistform')">
            <div class="InformationAdd">
              <div class="newslistform">
                <el-form
                  :model="dataObj"
                  label-position="right"
                  ref="newslistform"
                  size="medium"
                  label-width="90px;"
                  :rules="rules"
                >
                  <div class="form_div">
                    <el-form-item label="标题：" prop="title">
                      <el-input
                        v-model="dataObj.title"
                        type="text"
                        placeholder="标题"
                        style="width:540px;"
                        maxlength="30"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="form_div">
                    <el-form-item label="作者：" prop="author">
                      <el-input
                        v-model="dataObj.author"
                        type="text"
                        placeholder="作者"
                        style="width:540px;"
                        maxlength="15"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="form_div">
                    <el-form-item label="摘要：" prop="description">
                      <el-input
                        v-model="dataObj.description"
                        type="text"
                        placeholder="摘要"
                        style="width:540px;"
                        maxlength="100"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="form_div">
                    <el-form-item label="权重：" prop="homeRecommend">
                      <el-input
                        v-model="dataObj.homeRecommend"
                        type="text"
                        placeholder="权重0~100"
                        style="width:540px;"
                        maxlength="3"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="form_divv">
                    <el-form-item label="内容：" prop="content">
                      <el-upload
                        class="avatar-uploader quill-img"
                        action="/xd/comm/file/v2/upload"
                        :show-file-list="false"
                        :on-success="quillImgSuccess"
                        :before-upload="beforeAvatarUpload"
                      ></el-upload>
                      <quill-editor
                        v-model="dataObj.content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)"
                      ></quill-editor>
                    </el-form-item>
                  </div>
                </el-form>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="previeFuc('newslistform')">预览</el-button>
              <el-button @click="resetForm('newslistform')">重置</el-button>
            </span>
          </el-dialog>
        </el-form-item>
      </el-form>
      <!-- <el-dialog>

      </el-dialog>-->
    </div>
    <table-list
      :tableHeader="tableHeader"
      :tableData="tableData"
      @operation="operation"
      @changeFuc="changeFuc"
    />
    <infor-mation ref="lookDialog" @subFuc="subFuc"/>
    <editing ref="editDialog" @changeFuc="changeFuc"/>
  </div>
</template>

<script>
import { Consultstate } from "@/flies/js/initData";
import { latestNew, modifyStatus, delById, dtl, add, upload } from "@/api";
import allTableHeader from "@/flies/js/tableHeader";
import cloneObj from "@/flies/js/cloneObj";
import TableList from "@/components/Table/table";
import inforMation from "@/components/news/inforMation";
import editing from "@/components/news/editing";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { isPercentage } from "@/flies/js/rules";
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image"],
  ["clean"]
];
var validProjectName = (rule, value, callback) => {
  if (!value) {
    callback(new Error("该输入框不能为空！"));
  } else {
    callback();
  }
};
var percentage = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入小于100的整数"));
  } else if (!isPercentage(value)) {
    callback(new Error("请输入正确的格式！"));
  } else {
    callback();
  }
};
export default {
  components: {
    TableList,
    inforMation,
    quillEditor,
    editing
  },
  data() {
    return {
      editorOption: {
        placeholder: "请输入内容...",
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".quill-img input").click();
                  console.log(value);
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      },
      open: false,
      loadingBtn: false,
      checkedM: false,
      initSelectData: {
        Consultstate
      },
      tableObj: {
        keyWord: "",
        status: null,
        pageSize: 10,
        startPage: 1
      },
      tableData: {},
      tableHeader: allTableHeader.Consultheader,
      dataObj: {
        title: "", //标题
        author: "", //作者
        homeRecommend: "", //权重
        content: "", //内容
        description: "" //摘要
      },
      freeDataObj: {}, //上传的对象
      rules: {
        title: [{ hide: true, trigger: "blur", validator: validProjectName }],
        author: [{ hide: true, trigger: "blur", validator: validProjectName }],
        description: [
          { hide: true, trigger: "blur", validator: validProjectName }
        ],
        homeRecommend: [{ hide: true, trigger: "blur", validator: percentage }]
      }
    };
  },
  created() {
    this.initWeb();
  },
  methods: {
    down(newslistform){
      this.$refs[newslistform].resetFields();
    },
    quillImgSuccess(res, file) {
      console.log(res, file);
      let quill = this.$refs.myQuillEditor.quill;
      console.log(quill);
      if (res.error == 0) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(length, "image", res.url);
        console.log(res);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 1MB!");
      }
      return isLt2M;
    },
    //发布
    subFuc() {
      if (this.freeDataObj.content == "") {
        this.$message({
          showClose: true,
          message: "请填写内容",
          type: "warning"
        });
      } else {
        add(this.freeDataObj)
          .then(res => {
            if (res && res.errorCode == 0) {
              this.$message({
                showClose: true,
                message: "发布成功",
                type: "success"
              });
              this.resetForm("newslistform");
              this.initWeb();
              this.open = false;
            }
            this.$refs.lookDialog.closeFuc();
          })
          .catch(() => {
            this.$refs.lookDialog.closeLoadingFuc();
          });
      }
    },
    //预览按钮
    previeFuc(newslistform) {
      this.$refs[newslistform].validate(valid => {
        if (valid) {
          this.mergeFuc();
        } else {
          return false;
        }
      });
    },
    mergeFuc(data) {
      let dataObjC = cloneObj(this.dataObj);
      let dataC = cloneObj(data);
      let mergeObj = Object.assign(dataObjC, dataC);
      console.log(mergeObj);
      this.freeDataObj = cloneObj(mergeObj);
      // console.log(freeDataObj);
      this.$refs.lookDialog.showDialogFuc("submit", mergeObj);
    },
    //重置按钮
    resetForm(formName) {
      this.checkedM = false;
      this.dataObj.title = "";
      (this.dataObj.author = ""), //作者
        (this.dataObj.homeRecommend = ""), //权重
        (this.dataObj.content = ""), //内容
        (this.dataObj.description = ""); //摘要
      this.$refs[formName].resetFields();
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
      console.log("editor change!", this.content);
    }, // 内容改变事件

    //删除 发布 下架按钮操作
    operation(type, data) {
      console.log(type, data);
      let obj;
      switch (type) {
        case "up":
          obj = {
            id: data.id,
            status: 2
          };
          this.$confirm("确定发布该项目?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
            .then(() => {
              modifyStatus(obj).then(res => {
                if (res && res.errorCode == 0) {
                  this.changeFuc();
                  this.$message({
                    showClose: true,
                    message: "发布成功",
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
            id: data.id,
            status: 0
          };
          this.$confirm("确定下架该项目?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
            .then(() => {
              modifyStatus(obj).then(res => {
                if (res && res.errorCode == 0) {
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
          obj = {
            id: data.id
          };
          this.$confirm("确定删除该项目?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              delById(obj).then(res => {
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
        case "look":
          dtl({ id: data.id }).then(res => {
            if (res && res.errorCode === 0) {
              this.$refs.lookDialog.showDialogFuc("look", res.body);
            }
          });
          break;
        case "edit":
          dtl({ id: data.id }).then(res => {
            if (res && res.errorCode === 0) {
              this.$refs.editDialog.showDialogFuc("edit", res.body);
            }
          });
          break;
      }
    },

    changeFuc(type, value) {
      this.loadingBtn = true;
      if (type == "page") {
        this.tableObj.startPage = value;
      }
      latestNew(this.tableObj)
        .then(res => {
          if (res && res.errorCode == 0) {
            this.loadingBtn = false;
            this.tableData = res.body;
            console.log(this.tableData);
          }
        })
        .catch();
    },
    initWeb() {
      this.changeFuc();
      //初始化项目选项数据
      // latestNew({}).then(res => {
      //   if (res && res.errorCode === 0) {
      //     console.log(res);
      //   }
      // });
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  }
};
</script>

<style scoped>
.newsList {
  background-color: #fff;
  padding: 40px 196px 100px 55px;
  box-sizing: border-box;
  height: 800px;
}
.screening {
  width: 750px;
  height: 80px;
}
.el-dialog__body {
  text-align: center;
}
.el-form-item {
  margin-bottom: 20px;
}

.quill-editor {
  width: 540px;
  height: 200px;
}
.form_divv{
display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
  height: 300px;
}
.el-dialog--center {
  height: 900px !important;
}
.form_div {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
}
.el-form-item__content {
  margin: 0 !important;
}
</style>
