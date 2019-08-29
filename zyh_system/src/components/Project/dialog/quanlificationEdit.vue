<template>
  <div class="projectEditDialog">
    <el-dialog title="修改" :visible.sync="showDialog" width="1000px" center @close="down('projecForm')">
      <div class="projectForm">
        <el-form
          :model="dataObj"
          label-position="left"
          ref="projecForm"
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
              <el-form-item label="证书图片：" prop="certificateImgList">
                <upload-img
                  :type="{type:'certificateImgList'}"
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
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="loadingBtn" @click="editFuc('projecForm')">修&nbsp;改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { upload, modifyQualification } from "@/api";
import UploadImg from "@/components/UploadImg/uploadImg";
import { cloneObj } from "@/files/js/cloneObj";
import { projectStatu, dropdown, dropd } from "@/files/js/initData";
import {isvalidPhone} from '@/files/js/rules'
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
    UploadImg
  },
  data() {
    return {
      showDialog: false,
      loadingBtn: false,
      showImg: [], //图片列表
      dropdown,
      dropd,
      dataObj: {},
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
  methods: {
    down(projecForm){
      this.$refs[projecForm].resetFields();
    },
        editFuc(projecForm) {
      this.$refs[projecForm].validate((valid) => {
        if (valid) {
          this.$confirm("确定修改该项目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.loadingBtn = true;
          modifyQualification(this.dataObj)
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
        } else {
          return false;
        }
      });
      
    },
    showDialogFuc(data,init) {
      //初始选项值
      this.initData = init;
     
      this.dataObj = cloneObj(data);
      this.showImg=[...this.dataObj.certificateImgList]
      
      //地区
      // this.provinceInfo = this.dataObj.comProvince
      // this.cityInfo = this.dataObj.comCity
      this.showDialog = true;
    },
    delImg(index, more) {
      this.showImg.splice(index, 1);
      this.dataObj.certificateImgList.splice(index, 1);
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
  }
};
</script>

<style lang="stylus" scoped>
.projectEditDialog{
    .projectForm{
        padding 30px 88px 0;
        .base_form{
            >>> .el-form-item__label:before{
                content "*";
                color #f56c6c;
                margin-right 4px;
            }
        }
        .must_div{
            >>> .el-form-item__label:before{
                content "*";
                color #f56c6c;
                margin-right 4px;
            }
        }
        .optional_div{
            padding-top 50px;
        }
        .h1_title{
            width 111px;
            font-size 18px;
            font-weight bold;
            padding 0 12px 23px 0;
            box-sizing border-box;
        }
        .form_div{
            display flex;
            >>>.el-form-item__content{
                width 233px;
                margin-right 66px;
            }
        }
        .form_div1{
            width 500px;
            .form_divH{
                display flex;
                .house_park{
                    display inline-block;
                    width 88px;
                }
            }
        }
        .children_div{
            padding-left 40px;
        }
        .like_div{
            display flex;
            >>>.el-form-item__content{
                margin-right 66px;
            }
            >>> .el-form-item__label{
                font-weight bold;
            }
        }
        .M_box{
            padding-left 40px;
            .form_divM{
                display flex;
                >>> .el-checkbox{
                    margin-left 30px;
                    .el-checkbox__inner{
                        width 16px;
                        height 16px;
                    }
                    .el-checkbox__label{
                        font-size 16px;
                    }
                }
            }
        }
        .item_title{
            margin-bottom 12px;
            >>> .el-form-item__label{
                color black;
                font-size 16px;
            }
        }
        .tag_div{
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
        .spanInput{
            display inline-block;
            width 188px;
            position: relative;

             .danwei {
                display: inline-block;
                width: 50px;
                position:absolute;
                top: 0;
                right:-60px;

            }
        }

    }
    .submitBtn{
        width 666px;
        text-align center;
        padding 50px 0;
        box-sizing border-box;
    }
}
</style>
