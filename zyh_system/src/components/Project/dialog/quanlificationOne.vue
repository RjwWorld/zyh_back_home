<template>
    <div class="moduleA">
          <div class="screening">
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
                    v-for="item in qualificationStatus"
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
          <quanlifcation-deat ref="addEditDialog"/>
          <quanlifiaction-di ref="editDialog"/>
        </div>
        
</template>

<script>
import quanlifiactionDi from "@/components/Project/dialog/quanlifiactionDi"
import quanlifcationDeat from "@/components/Project/dialog/quanlifcationDeat"
import { qualificationStatus } from "@/files/js/initData";
import TableList from "@/components/Table/table";
import allTableHeader from "@/files/js/tableHeader";
import { delList, qualificationList,updateList,getByList } from "@/api";
export default {
    components: {
    TableList,
    quanlifcationDeat,
    quanlifiactionDi
  },
  data() {
    return {
      loadingBtn: false,
      qualificationStatus,

      tableData: {},
      tableHeader: allTableHeader.qualificationHeader,
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
        demandForm:"",
        dockingMan:"",//对接人
        dockingTel:"",//对接人电话
        demandForm:"",//需求形式
        // certificateImgList:[],//证书图片
      },
    };
  },
  //初始化
  created() {
    this.changeFuc();
  },
   methods: {
    operation(type, data) {
      let obj;
      switch (type) {
        case "del":
          this.$confirm("确定删除这条信息?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              delList({ id: data.id }).then(res => {
                if (res && res.errorCode === 0) {
                  this.changeFuc("page", 1);
                  this.$message({
                    message: "删除成功",
                    type: "success"
                  });
                }
              });
            })
            .catch(() => {});
          break;
        case "edit":
          this.projectLook(data.id,type);
          break;
        case "look":
          this.projectLook(data.id,type);
          break;
        case "topay":
          this.$confirm("确定改为已访问?, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
          })
            .then(() => {
              updateList({id:data.id}).then(res => {
                if (res && res.errorCode === 0) {
                  this.changeFuc("page", 1);
                  this.$message({
                    message: "成功!",
                    type: "success"
                  });
                }
              }); 
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消"
              });
            });
        break;
      }
    },
    projectLook(id,type){
        getByList({ id}).then(res => {
            if (res && res.errorCode === 0) {
              let data=res.body
              if(type=="look"){
                this.$refs.addEditDialog.showDialogFuc(type, data);
              }
              if(type=="edit"){
                  this.$refs.editDialog.showDialogFuc(data,this.tableData);
              }
            }
        });
    },
    changeFuc(type, value) {
      if (type == "page") {
        this.tableObj.startPage = value;
      }
      qualificationList(this.tableObj).then(res => {
        if (res && res.errorCode === 0) {
          this.tableData = res.body;
        }
      });
    }
  }
}
</script>

<style lang="stylus">
.moduleA{
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
</style>
