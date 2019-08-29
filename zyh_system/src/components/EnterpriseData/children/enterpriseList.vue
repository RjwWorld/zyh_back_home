<template>
  <!-- 表格按钮 -->
  <div class="enterpriseList">
    <!-- 企业列表表头搜索 -->
    <div class="box">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" id="one">
        <el-form-item label="状态:">
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
          <el-button type="primary" :loading="loadingBtn" @click="changeFuc('page',1)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData.item"
      border
      height="633"
      :highlight-current-row="true"
      :header-row-style="{height:'80px'}"
      :row-style="{height:'65px'}"
      :cell-style="{padding:0}"
      :header-cell-style="{'background-color':'#fafafa'}"
    >
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        v-for="(item,index) in tableHeader"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.width"
      >
        <template slot-scope="scope">
          <span
            v-if="item.prop =='companyProvince,companyCity'"
          >{{scope.row[item.prop.split(",")[0]]}}{{scope.row[item.prop.split(",")[1]]}}</span>
          <span v-else-if="item.prop =='status'">
            <span v-if="scope.row[item.prop] === 0">已下架</span>
            <span v-if="scope.row[item.prop] === 1">待审核</span>
            <span v-if="scope.row[item.prop] === 2">已上架</span>
            <span v-if="scope.row[item.prop] === 3">审核拒绝</span>
          </span>
          <span v-else-if="item.prop =='enterprise,naoTuImg,status'">
            <span v-if="scope.row[item.prop.split(',')[2]]==0">
              <el-button type="text" size="small" @click="operation('enterprise','up',scope.row)">上架</el-button>
              <el-button
                type="text"
                size="small"
                @click="operation('enterprise','edit',scope.row)"
              >编辑</el-button>
              <el-button
                type="text"
                size="small"
                @click="operation('enterprise','del',scope.row)"
                style="color:#F56c6c"
              >删除</el-button>
            </span>
            <span v-if="scope.row[item.prop.split(',')[2]]==1">
              <el-button
                type="text"
                size="small"
                @click="operation('enterprise','audit',scope.row)"
              >审核</el-button>
            </span>
            <span v-if="scope.row[item.prop.split(',')[2]]==2">
              <el-button
                type="text"
                size="small"
                @click="operation('enterprise','down',scope.row)"
              >下架</el-button>
            </span>
            <span v-if="scope.row[item.prop.split(',')[2]]==3">
              <el-button
                type="text"
                size="small"
                @click="operation('enterprise','edit',scope.row)"
              >编辑</el-button>
               <el-button
                type="text"
                size="small"
                @click="operation('enterprise','del',scope.row)"
                style="color:#F56c6c"
              >删除</el-button>
            </span>
            <span v-if="scope.row[item.prop.split(',')[1]]">
              <el-button
                type="text"
                size="small"
                @click="operation('enterprise','look',scope.row)"
              >查看脑图</el-button>
              <!-- <el-button
                type="text"
                size="small"
                @click="operation('enterprise','generate',scope.row)"
              >重新生成脑图</el-button> -->
            </span>
            <!--<span v-else>-->
              <!--<el-button-->
                <!--type="text"-->
                <!--size="small"-->
                <!--@click="operation('enterprise','generate',scope.row)"-->
              <!--&gt;生成脑图</el-button>-->
            <!--</span>-->
            <span>
              <el-button
                type="text"
                size="small"
                @click="operation('enterprise','toview',scope.row)"
              >查看</el-button>
            </span>
          </span>
          <span v-else>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="page_btn">
      <el-pagination
        @current-change="changePage"
        :current-page.sync="tableData.pageNum"
        background
        :page-size="8"
        layout="total, prev, pager, next, jumper"
        :total="tableData.rows"
      ></el-pagination>
    </div>

    <edit-dialog ref="editDialog" @initWeb="initWeb"/>
    <enterprise-audit ref="enterpriseAudit" @submitFuc="submitFuc"/>
  </div>
</template>

<script>
import { projectStatu } from "@/files/js/initData";
import { basicAll, getDtl, projectStatus,pubProjectInit,delB } from "@/api";
import allTableHeader from "@/files/js/tableHeader";
import {cloneObj} from '@/files/js/cloneObj'
import EditDialog from "@/components/EnterpriseData/dialog/editDialog";
import enterpriseAudit from "@/components/EnterpriseData/dialog/enterpriseAudit";
export default {
  components: {
    EditDialog,
    enterpriseAudit
  },
  data() {
    return {
      initd:{
        myPreferenceInitRespVO:{},
        pubProjectBaseInitRespVO:{},
        pubProjectAInitRespVO:{},
        pubProjectBInitRespVO:{},
        pubProjectCInitRespVO:{}
      },
      loadingBtn: false,
      formInline: {
        user: "",
        region: ""
      },
      tableHeader: allTableHeader.enterpriseHeader,
      initSelectData: {
        projectStatu
      },
      tableData: {},
      tableObj: {
        startPage: 1,
        pageSize: 8,
        status: null,
        keyWord: ""
      }
    };
  },
  activated() {
    this.initWeb();
  },
  created() {
    //初始化项目选项数据
    pubProjectInit({ projectCategoryCode: 0 }).then(res => {
      if (res && res.errorCode === 0) {
        this.initd = res.body;
      }
    });
  },
  methods: {
    //data点击的对应数据
    operation(section, type, data) {
      //  console.log('我是审核数据',section,type, data);
      let obj;
      switch (type) {
        //查看脑图
        case "look":
          window.open(data.naoTuImg);
          break;
        //上架
        case "up":
          obj = {
            projectId: data.projectId,
            status: 2,
            projectType: 0
          };
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
        //下架
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
        //生成脑图
        case "generate":
          window.open(
            window.location.host == "www.zyh0903.com"
              ? `http://www.zyh0903.com/siweidaotu/index.html?projectId=${
                  data.projectId
                }`
              : `http://t.zyh0903.com/siweidaotu/index.html?projectId=${
                  data.projectId
                }`
          );
          break;
        //编辑
        case "edit":
          getDtl({ id: data.id }).then(res => {
            if (res && res.errorCode === 0) {
              let projectData;
              if(res.body.basicDtlRespVO){
                  projectData = res.body.basicDtlRespVO
              }
              this.$refs.editDialog.editDialogFuc(res.body,this.initd,projectData);
            console.log(projectData, this.initd)
            }
          });
          this.enterpriseAudit(type,data,data.projectId)
          break;
        //查看
        case "toview":
         this.enterpriseAudit(type,data,data.projectId)
        break;
        case "audit":
         this.enterpriseAudit(type,data,data.projectId)
        break;
        case "del":
        console.log(data.projectId)
         this.$confirm("确定删除这条信息?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              delB({ projectId:data.projectId }).then(res => {
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
      }
    },
    //审核
      enterpriseAudit(type,data,projectId){
        //  console.log(data,123)
         getDtl({id:data.id,projectId}).then(res=>{
            if (res&&res.errorCode === 0) {
              let data=res.body
              if (type == "audit" || type == "toview") {
                this.$refs.enterpriseAudit.showDialogFuc(type,data);

              }
            }
          })
      },
      previewFuc(data){
        let modelReqVO ={}
        modelReqVO = cloneObj(data)
        if(modelReqVO.involvedDomain){
            modelReqVO.involvedDomain=findCode(
            this.initd.myPreferenceInitRespVO.domainList,
            data.involvedDomain)
        }
        return modelReqVO
      },
      //审核提交
      submitFuc(data){
        console.log('我是提交的data',data.status)
        projectStatus(data).then(res=>{
          if(res.errorCode===0){
            // console.log(data.projectId)
            this.changeFuc();
            if(data.status==3){
               this.$message({
                    showClose: true,
                    message: '提交成功',
                    type: 'success'
                });
            }else {
              window.open(
                window.location.host == "www.zyh0903.com"
                  ? `http://www.zyh0903.com/siweidaotu/index.html?projectId=${
                    data.projectId
                    }`
                  : `http://t.zyh0903.com/siweidaotu/index.html?projectId=${
                    data.projectId
                    }`
              );
            }
            this.$refs.enterpriseAudit.resetForm();
            this.$refs.enterpriseAudit.closeFuc();

          }
        })
      },
    //状态
    changeFuc(type, val) {
      this.loadingBtn = true;
      if (type == "page") {
        this.tableObj.startPage = val;
      }
      basicAll(this.tableObj).then(res => {
        if (res && res.errorCode == 0) {
          this.loadingBtn = false;
          this.tableData = res.body;
        }
      });
    },
    changePage(val) {
      this.tableObj.startPage = val;
      this.initWeb();
    },
    initWeb() {
      this.changeFuc();
      // basicAll(this.tableObj).then(res => {
      //   if (res && res.errorCode === 0) {
      //     this.tableData = res.body;
      //   }
      // });
    }
  }
};
</script>

<style lang="stylus" scoped>
.enterpriseList {
  .box {
    padding: 30px;
  }

  .el-form>>>.el-form-item {
    margin-bottom: 0;
  }

  .page_btn {
    padding-top: 45px;
    text-align: center;
  }
}
</style>
