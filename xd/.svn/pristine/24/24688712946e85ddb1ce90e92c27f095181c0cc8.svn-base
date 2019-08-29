<template>
  <div class="newsList">
    <div class="screening">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="项目分类：">
          <el-select
            v-model="tableObj.classification"
            @change="changeFuc('page',1)"
            placeholder="请选择"
          >
            <el-option
              v-for="item in initSelectData.staffstate"
              :key="item.text"
              :label="item.text"
              :value="item.text"
            ></el-option>
          </el-select>
        </el-form-item>
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
          <el-dialog title="组图添加" :visible.sync="open" width="1200px" @close="closeFuc" center>
            <div class="InformationAdd">
              <div class="newslistform">
                <h1>
                  组图属性
                  <span style="color:red">(必填)</span>
                </h1>
                <el-form
                  :model="dataObj"
                  label-position="right"
                  ref="newslistform"
                  size="medium"
                  label-width="90px;"
                  
                >
                  <div class="form_div2">
                    <el-form-item label="标题：" prop="title">
                      <el-input
                        :disabled="openIsDisabled"
                        v-model="dataObj.title"
                        type="text"
                        placeholder="标题"
                        style="width:540px;"
                        maxlength="30"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="form_div2">
                    <el-form-item label="分类：" prop="classification">
                      <!-- <el-input
                        v-model="dataObj.projectClassification"
                        type="text"
                        placeholder="项目分类"
                        style="width:540px;"
                      ></el-input>-->
                      <el-select v-model="dataObj.classification" placeholder="请选择">
                        <el-option
                          :disabled="openIsDisabled"
                          v-for="item in staffstatet1"
                          :key="item"
                          :label="item"
                          :value="item"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <div class="form_div">
                    <el-form-item label="组图权重：" prop="homeRecommend">
                      <el-input
                        :disabled="openIsDisabled"
                        v-model="dataObj.homeRecommend"
                        type="text"
                        placeholder="组图权重"
                        style="width:540px;"
                        maxlength="3"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <h1>
                    图片属性
                    <span style="color:red">(最少一张)</span>
                  </h1>
                  <div class="form_div2">
                    <el-form-item label="图片：" prop="fileUrl">
                      <upload-img
                        :type="{type:'fileUrl'}"
                        :showImage="showImg"
                        @uploadFuc="uploadFuc"
                        @delImg="delImg"
                      />
                    </el-form-item>
                  </div>
                  <div class="form_div">
                    <el-form-item label="图片权重：" prop="recommend">
                      <el-input
                        v-model="dataObj.recommend"
                        type="text"
                        maxlength="3"
                        placeholder="权重0~100"
                        style="width:540px;"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="form_div2">
                    <el-form-item label="内容：" prop="content">
                      <el-input v-model="dataObj.content" type="textarea" maxlength="200" @input="descInput" style="width:540px;"></el-input>
                      <span class="xianzhi">{{remnant}}/200</span>
                    </el-form-item>
                  </div>
                </el-form>
                <div class="btn">
                  <el-button type="primary" @click="addbtn">上传</el-button>
                  <el-button type="primary" @click="previeFuc">保存</el-button>
                </div>
              </div>
            </div>
            <div class="all">
              <div class="next" v-show="local==true">
                <img src="../../flies/img/right.png" style="width:36px;height:36px;">
              </div>
              <div class="prev" v-show="local==true">
                <img src="../../flies/img/left.png" style="width:36px;height:36px;">
              </div>
              <swiper :options="swiperOption">
                <swiper-slide
                  class="swiper"
                  v-for="(value,index) in imglist"
                  :key="index"
                  v-loading="loading"
                >
                  <img class="photo" :src="value.fileUrl">
                  <img class="img" src="../../flies/img/del.png" @click="imgdel(value.id)">
                  <div class="content">{{value.content}}</div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            </div>
          </el-dialog>
        </el-form-item>
      </el-form>
      <!-- <el-dialog>

      </el-dialog>-->
    </div>
    <table-list
      :tableHeader="tableHeader"
      :tableData="tableData"
      @changeFuc="changeFuc"
      @operation="operation"
    />
    <staffdetils ref="lookDialog"/>
    <staffedit ref="editDialog"/>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import staffdetils from "@/components/Staffpresence/staffdetils";
import staffedit from "@/components/Staffpresence/staffedit";
import UploadImg from "@/components/uploadImg/uploadImg";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import allTableHeader from "@/flies/js/tableHeader";
import { staffstate, staffstatet1, Consultstate } from "@/flies/js/initData";
import {
  stafflist,
  upload,
  staffadd,
  staffdelImgById,
  staffdtl,
  staffmodifyStatus,
  staffdelById
} from "@/api";
import cloneObj from "@/flies/js/cloneObj";
import TableList from "@/components/Table/table";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { isPercentage } from "@/flies/js/rules";
var validProjectName = (rule, value, callback) => {
  if (!value) {
    callback(new Error("该输入框不能为空！"));
  } else {
    callback();
  }
};
var validConstruction = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请选择！"));
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
    quillEditor,
    TableList,
    UploadImg,
    staffdetils,
    staffedit
  },
  data() {
    return {
      remnant: 200,
      loading: true,
      local: false,
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        navigation: {
          nextEl: ".next",
          prevEl: ".prev"
        }
      },
      openIsDisabled: false,
      closeIsDisabled: false,
      open: false,
      staffstatet1,
      showImg: "",
      tableObj: {
        keyWord: "",
        status: null,
        classification: "全部",
        pageSize: 10,
        startPage: 1
      },
      initSelectData: {
        Consultstate,
        staffstate
      },
      dataObj: {
        title: "", //标题
        classification: "",
        recommend: "",
        homeRecommend: "",
        fileUrl: "",
        content: ""
      },
      imglist: [],
      tableData: {},
      tableHeader: allTableHeader.staffheader,
    };
  },
  created() {
    this.initWeb();
  },
  methods: {
    descInput(){
    this.remnant=200-this.dataObj.content.length
    },
    closeFuc(){
      // console.log(123)
      // console.log(this.dataObj)
      this.dataObj.title="";
      this.dataObj.classification="";
      this.dataObj.recommend="";
      this.dataObj.homeRecommend="";
      this.dataObj.content="";
      this.showImg="";
      this.openIsDisabled = false;
      this.imglist="";
      this.local=false;
      this.initWeb();
      this.remnant=200;
    },
    //预览
    previeFuc() {
      this.open = false;
    },
    //按钮功能
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
              staffmodifyStatus(obj).then(res => {
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
              staffmodifyStatus(obj).then(res => {
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
              staffdelById(obj).then(res => {
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
          staffdtl({ id: data.id }).then(res => {
            if (res && res.errorCode === 0) {
              this.$refs.lookDialog.showDialogFuc("look", res.body);
            }
          });
          break;
        case "edit":
          staffdtl({ id: data.id }).then(res => {
            if (res && res.errorCode === 0) {
              this.$refs.editDialog.showDialogFuc("edit", res.body);
            }
          });
          break;
      }
    },
    //保存
    server() {
      this.open = false;
    },
    //删除图片
    imgdel(id) {
      // console.log(index)
      console.log(this);
      // console.log(this.imglist.id)
      //  this.imglist.splice(index,1)
      console.log("我是", id);
      staffdelImgById({ id: id }).then(res => {
        this.imglist = res.body.staffImgDtlList;
        console.log(this.imglist, "del-img");
        if (this.imglist.length <= 0) {
          this.local = false;
        }
      });
    },
    //上传
    addbtn() {
      // console.log(this.dataObj);
      if (this.dataObj.title == "") {
        this.$message({
          showClose: true,
          message: "标题不能为空",
          type: "warning"
        });
        return;
      }
      
      if (this.dataObj.classification == "") {
        this.$message({
          showClose: true,
          message: "请选择分类",
          type: "warning"
        });
        return;
      }
      if (
        this.dataObj.homeRecommend > 100 ||
        this.dataObj.homeRecommend ==""
      ) {
        this.$message({
          showClose: true,
          message: "请输入0~100的组图权重",
          type: "warning"
        });
        return;
      }
      if (this.showImg == "") {
        this.$message({
          showClose: true,
          message: "请添加图片",
          type: "warning"
        });
        return;
      }
      if (this.dataObj.recommend > 100 || this.dataObj.recommend =="") {
        this.$message({
          showClose: true,
          message: "请输入0~100的图片权重",
          type: "warning"
        });
        return;
      }
      if (this.dataObj.content == "") {
        this.$message({
          showClose: true,
          message: "请输入内容",
          type: "warning"
        });
        return;
      }
      staffadd(this.dataObj).then(res => {
        if (res.errorCode == 0) {
          this.openIsDisabled = true;
          this.imglist = res.body.staffImgDtlList;
          this.local = true;
          this.loading = false;
          (this.showImg = ""),
          (this.dataObj.content = ""),
          (this.dataObj.recommend = "");
          this.initWeb();
          this.remnant=200
        }
      });
    },
    delImg(index, more) {
      this.showImg.splice(index, 1);
      this.dataObj.fileUrl = "";
    },
    //图片接口
    uploadFuc(data, more, type) {
      upload(data).then(res => {
        console.log(res);
        if (res && res.errorCode === 0) {
          //  if (more) {
          //     this.showImg.push(res.body.filePath);
          //     this.dataObj.imageList=res.body.fileId;
          //   }
          let typeType = type.type;
          switch (typeType) {
            case "fileUrl":
              this.showImg = res.body.filePath;
              this.dataObj.fileUrl = res.body.fileId;
              break;
          }
        }
      });
    },
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件

    changeFuc(type, value) {
      this.loadingBtn = true;
      if (type == "page") {
        this.tableObj.startPage = value;
      }
      stafflist(this.tableObj)
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

<style lang="stylus" scoped>
// .swiper-pagination {
//   position: relative;
// }
.xianzhi{
  position absolute;
  right 0;
}
.prev {
  position: absolute;
  width: 36px;
  height: 36px;
  top: 50px;
  left: -80px;
}

.prev:focus {
  outline: none;
}

.next {
  position: absolute;
  width: 36px;
  height: 36px;
  top: 50px;
  left: 690px;
}

.next:focus {
  outline: none;
}

.img {
  width: 20px;
  height: 21px;
  position: absolute;
  right: -5px;
  top: 0px;
}

.all {
  width: 650px;
  margin: auto;
  margin-top: 60px;
  position relative;
  .photo {
    width: 200px;
    height: 150px;
  }
  .content {
    line-height: 20px;
    text-align: center;
  }
}

.btn {
  text-align: center;
  margin-top 40px;
}

.newslistform {
  padding: 0 250px;
  box-sizing: border-box;
}

.form_div2 {
  margin-left: 30px;
  margin-top 20px;
}
.form_div {
  margin-top 20px;
}
.newsList {
  background-color: #fff;
  padding: 40px 196px 100px 55px;
  box-sizing: border-box;
  height: 800px;
}

.screening {
  width: 1100px;
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
}

.el-dialog--center {
  height: 900px !important;
}

.form_div {
  display: flex;
  align-items: center;
}

.el-form-item__content {
  margin: 0 !important;
}
</style>
