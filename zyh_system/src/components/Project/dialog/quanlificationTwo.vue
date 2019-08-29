<template>
     <div class="moduleB">
          <div class="screening">
            <el-button
              type="success"
              @click="open=true"
            >&nbsp;添&nbsp;加&nbsp;</el-button>
            <!-- 添加按钮 -->
            <el-dialog title="添加" :visible.sync="open" width="1100px" center>
              <div class="publishProject">
                  <div class="projectForm">
                    <el-form
                      :model="dataObj"
                      label-position="left"
                      ref="projectForm"
                      size="medium"
                      label-width="122px"
                      :rules="rules"
                     >
                     <h1 class="h1_title">资质信息</h1>
                      <div class="form_div">
                        <el-form-item label="项目名称：" prop="projectName">
                          <el-input v-model="dataObj.projectName" type="text" placeholder="项目名称" maxlength="25"></el-input>
                        </el-form-item>
                        <el-form-item label="需求形式：" prop="demandForm">
                          <el-input v-model="dataObj.demandForm" type="text" placeholder="需求形式" maxlength="25"></el-input>
                        </el-form-item>
                      </div>
                     
                        <h1 class="h1_title">资质选择</h1>
                          <div class="form_div"> 
                              <el-form-item label="总承包资质：" prop="qualificationType">
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
                    
                      <div>
                      <h1 class="h1_title">对接信息</h1>
                      <div class="form_div">
                        <el-form-item label="联系人：" prop="linkMan">
                          <el-input v-model="dataObj.linkMan" type="text" placeholder="联系人" maxlength="15"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话：" prop="linkTel">
                          <el-input v-model="dataObj.linkTel" type="text" placeholder="联系电话" maxlength="11"></el-input>
                        </el-form-item>
                      </div>
                      <div class="form_div">
                        <el-form-item label="对接人：" prop="dockingMan">
                          <el-input v-model="dataObj.dockingMan" type="text" placeholder="对接人" maxlength="15"></el-input>
                        </el-form-item>
                        <el-form-item label="对接人电话：" prop="dockingTel">
                          <el-input v-model="dataObj.dockingTel" type="text" placeholder="对接人电话" maxlength="11"></el-input>
                        </el-form-item>
                      </div>
                      <div>
                  <el-form-item label="证书图片：">
                    <upload-img
                    :more="true"
                    :maxNumber="2"
                    :imgList="showImg"
                    @uploadFuc="uploadFuc"
                    @delImg="delImg"
                  />
                  </el-form-item>
                   </div>
                      </div>
                    </el-form>
                  </div>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('projectForm')">预览</el-button>
                 <el-button @click="resetForm('projectForm')">重置</el-button>
               </span>
           </el-dialog>
            <el-form :inline="true" class="demo-form-inline" size="medium">
              <el-form-item>
                <el-input
                  @keyup.enter.native="changeFuc('page',1)"
                  placeholder="项目编号、资质种类、项目名称等"
                  v-model="tableObj.keyWord"
                  clearable
                  class="inp"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  :loading="loadingBtn"
                  @click="changeFuc('page',1)"
                >查&nbsp;询</el-button>
              </el-form-item>
              <el-form-item label="状态：">
                <el-select
                  v-model="tableObj.status"
                  @change="changeFuc('page',1)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in projectStatu"
                    :key="item.code"
                    :label="item.text"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <table-list
            :tableTitle="tableHeader"
            :tableData="tableData"
            @changeFuc="changeFuc"
            @operation="operation"
          />
          <quanlification-dialog ref="previewDialog" @submitFuc="submitFuc" @subFuc="subFuc"/>
          <quanlification-edit ref="editDialog" @changeFuc="changeFuc"/>
        </div>
</template>

<script>
import quanlificationEdit from "@/components/Project/dialog/quanlificationEdit";
import quanlificationDialog from "@/components/Project/dialog/quanlificationDialog";
import { projectStatu,dropdown,dropd} from "@/files/js/initData";
import TableList from "@/components/Table/table";
import allTableHeader from "@/files/js/tableHeader";
import UploadImg from "@/components/UploadImg/uploadImg";
import { cloneObj } from "@/files/js/cloneObj";
import {isvalidPhone} from '@/files/js/rules'
import { qualificationTwo,projectStatus,delTwo,getByTwo,upload,insertQualification} from "@/api";
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
var validConstruction=(rule, value,callback)=>{
  if (!value){
    callback(new Error('请选择！'))
  }
  else {
    callback()
  }
};
export default {
    components: {
    TableList,
    UploadImg,
    quanlificationDialog,
    quanlificationEdit
  },
  data() {
    return {
      loadingBtn: false,
      projectStatu,
      dropdown,
      dropd,
      checkedM: false,
      showImg: [], //图片列表
      open:false,
      tableData: {},
      tableHeader: allTableHeader.qualificHeader,
      tableObj: {
        status: null,
        keyWord: "",
        pageSize: 8,
        startPage: 1
      },
      dataObj:{
        projectName:"",//项目名称
        qualificationLevel:"",//资质等级
        qualificationType:"",//资质类型
        linkMan:"",//联系人
        linkTel:"",//联系电话
        dockingMan:"",//对接人
        dockingTel:"",//对接人电话
        demandForm:"",//需求形式
        certificateImgList:[],//证书图片
      },
      freeDataObj: {}, //上传的对象
      rules:{
        projectName:[
          {hide: true, trigger: 'blur', validator: validProjectName}
        ],
        demandForm:[
          {
            hide: true, trigger: 'blur', validator: validProjectName
          }
        ],
        linkMan:[
          {
            hide: true, trigger: 'blur', validator: validProjectName
          }
        ],
        dockingMan:[
          {
            hide: true, trigger: 'blur', validator: validProjectName
          }
        ],
        qualificationType:[
          {hide: true, trigger: 'change', validator: validConstruction}
        ],
        qualificationLevel:[
          {hide: true, trigger: 'change', validator: validConstruction}
        ],
        linkTel: [
          {hide: true, trigger: 'blur', validator: validPhone}
        ],
        dockingTel: [
          {hide: true, trigger: 'blur', validator: validPhone}
        ],
      }
    };
  },
  //初始化
  created() {
    this.changeFuc();
  },
  methods: {
    submitForm(projectForm) {
      this.$refs[projectForm].validate((valid) => {
        if (valid) {
          this.previeFuc()
        } else {
          return false;
        }
      });
    },
    //预览
    previeFuc(){
      this.mergeFuc();
    },
    mergeFuc(data){
      console.log(data)
      let dataObjC = cloneObj(this.dataObj);
      let dataC = cloneObj(data);
      let mergeObj = Object.assign(dataObjC, dataC);
      console.log(mergeObj)
      this.freeDataObj = cloneObj(mergeObj);
       mergeObj.certificateImgList = this.showImg;
      this.$refs.previewDialog.showDialogFuc("submit", mergeObj);
    },
    //发布
    subFuc(){
      insertQualification(this.freeDataObj).then(res=>{
        console.log(this.freeDataObj)
        this.$refs.previewDialog.closeFuc();
        if(res&&res.errorCode==0){
          this.$message({
              showClose: true,
              message: "发布成功",
              type: "success"
            });
            this.changeFuc();
            this.resetForm("projectForm"); 
          }
          
      }).catch(() => {
          this.$refs.previewDialog.closeLoadingFuc();
        });
    },
    //审核提交
    submitFuc(data){
      // console.log(1)
      projectStatus(data).then(res=>{
        if(res.errorCode===0){
          this.changeFuc();
            this.$refs.previewDialog.resetForm();
            this.$refs.previewDialog.closeFuc();
            this.$message({
              showClose: true,
              message: "提交成功",
              type: "success"
            });
        }
      }) .catch(() => {
          this.$refs.previewDialog.closeLoadingFuc();
        });
    },
     delImg(index, more) {
      this.showImg.splice(index, 1);
      this.dataObj.certificateImgList.splice(index, 1);
      console.log(this.dataObj.certificateImgList)
    },
    uploadFuc(data, more, type) {
      upload(data).then(res => {
        if (res && res.errorCode === 0) {
          if (more) {
            this.showImg.push(res.body.filePath);
            this.dataObj.certificateImgList.push(res.body.fileId);
          }
        }
      });
    },
    //重置按钮
    resetForm(formName){
     this.checkedM = false;
      this.dataObj.projectName="",
      this.dataObj.qualificationLevel="",
      this.dataObj.qualificationType="",
        this.dataObj.linkMan="",
        this.dataObj.linkTel="",
        this.dataObj.dockingMan="",
        this.dataObj.dockingTel="",
        this.dataObj.demandForm="",
       this.showImg=[];
       this.dataObj.certificateImgList=[];
      this.$refs[formName].resetFields();
    },

    operation(type, data) {
        // console.log(data)
      let obj;
      switch (type) {
        case "up":
            obj={
            projectType: 0,
            status: 2,
            projectId: data.projectId
            }
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
          this.$confirm("确定删除这条信息?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              delTwo({ id: data.id }).then(res => {
                if (res && res.errorCode === 0) {
                  this.changeFuc("page", 1);
                  this.$message({
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
            this.projectLook(data.id,type);
        break;
        case "edit":
            this.projectLook(data.id,type);
        //   updateCallList({ id: data.id }).then(res => {
        //     if (res && res.errorCode === 0) {
        //       this.$refs.addEditDialog.showDialogFuc("edit", res.body);
        //     }
        //   });
        break;
        case "look":
            this.projectLook(data.id,type);
        //   getByList({ id: data.id }).then(res => {
        //     if (res && res.errorCode === 0) {
        //       this.$refs.addEditDialog.showDialogFuc("look", res.body);
        //     }
        //   });
        break;
      }
    },
    projectLook(id,type){
        // console.log(projectId, type,id)
        getByTwo({id}).then(res=>{
            if(res.errorCode===0){
                let data=res.body;
                if(type=="audit"||type=="look"){
                    this.$refs.previewDialog.showDialogFuc(type,data);
                    // console.log(type,data)
                }
                if(type=="edit"){
                  this.$refs.editDialog.showDialogFuc(data,this.tableData);
                }
            }
        })

    },
    changeFuc(type, value) {
      // Console.log(value)
      if (type == "page") {
        this.tableObj.startPage = value;
      }
      qualificationTwo(this.tableObj).then(res => {
        if (res && res.errorCode === 0) {
          this.tableData = res.body;
        }
      });
    }
  }
}
</script>

<style lang="stylus">
.moduleB{
  .screening {
    display: flex;
    align-item: unset;
    padding: 30px;
    height: 100px;
    box-sizing: border-box;
  }

  .inp {
    width: 280px;
  }

  .el-form {
    margin-left: 30px;

    >>>.el-form-item {
      margin-bottom: 0;
    }
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
    .el-select--medium{
      width :200px;
    }

    .h1_title {
      width: 111px;
      font-size: 18px;
      font-weight: bold;
      padding: 0 12px 23px 0;
      box-sizing: border-box;
      margin-left:-20px;
    }

    .form_div {
      display: flex;
      justify-content :space-between
      >>>.el-form-item__content {
        width: 233px;
        margin-right: 66px;
      }
    }

    .form_div1 {
      width: 320px;
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


    // .item_title {
    //   margin-bottom: 12px;

    //   >>> .el-form-item__label {
    //     color: black;
    //     font-size: 16px;
    //   }
    // }

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
