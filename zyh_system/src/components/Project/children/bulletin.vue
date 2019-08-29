<template>
  <div class="bullentinlist">
    <div class="screening">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="open=true">添加</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="添加公告" :visible.sync="open" width="500px" center>
        <div class="bulletin">
          <el-form
            :model="dataObj"
            label-position="left"
            ref="demandForm"
            size="medium"
            label-width="90px"
          >
            <div class="form_div">
              <el-form-item label="新闻内容：" prop="msg">
                <el-input v-model="dataObj.msg" type="textarea" placeholder="新闻公告" rows="5" maxlength="50" show-word-limit></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div class="submitBtn">
            <el-button type="primary" @click="previewFuc">添&nbsp;加</el-button>
            <el-button @click="resetForm('demandForm')">重&nbsp;置</el-button>
            <!-- <demand-dialog ref="previewDialog" @submitFuc="submitFuc"/> -->
          </div>
        </div>
      </el-dialog>
    </div>
    <table-list
      :tableTitle="tableHeader"
      :tableData="tableData"
      @changeFuc="changeFuc"
      @operation="operation"
    />
    <announcementlook ref="lookDialog"/>
    <Announcementedit ref="editDialog" @changeFuc="changeFuc"/>
  </div>
</template>

<script>
import allTableHeader from "@/files/js/tableHeader";
import TableList from "@/components/Table/table";
import {
  announcement,
  bulletinStatus,
  bulletindelById,
  bulletininsert,
  bulletingetById
} from "@/api";
import announcementlook from "@/components/Project/dialog/announcement"
import Announcementedit from "@/components/Project/dialog/Announcementedit"
export default {
  components: {
    TableList,
    announcementlook,
    Announcementedit
  },
  data() {
    return {
      open: false,
      loadingBtn: false,
      tableHeader: allTableHeader.bulletinHeader,
      tableData: {},
      tableObj: {
        keyWord: "",
        status: null,
        pageSize: 8,
        startPage: 1
      },
      dataObj: {
        msg: ""
      }
    };
  },
  activated() {
    this.initWeb();
  },
  methods: {
    //添加
    previewFuc() {
      if (this.dataObj.msg != "") {
        this.$confirm("确定添加此公告?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(() => {
            bulletininsert(this.dataObj).then(res => {
              if (res.errorCode === 0) {
                this.$message({
                  showClose: true,
                  message: "添加成功",
                  type: "success"
                });
              }
              this.open = false;
              this.resetForm("demandForm");
              this.initWeb();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消操作"
            });
          });
      } else {
        this.$message({
          showClose: true,
          message: "请填写内容",
          type: "warning"
        });
        return false
      }
      // console.log(this)
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    operation(type, data) {
      let obj;
      //   console.log(type,data)
      switch (type) {
        case "up":
          obj = {
            id: data.id,
            status: 1
          };
          this.$confirm("确定上架此项目?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
            .then(() => {
              bulletinStatus(obj).then(res => {
                if (res.errorCode === 0) {
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
            id: data.id,
            status: 0
          };
          this.$confirm("确定下架此项目?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
            .then(() => {
              bulletinStatus(obj).then(res => {
                if (res.errorCode === 0) {
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
          this.$confirm("确定删除此项目?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              bulletindelById({ id: data.id }).then(res => {
                if (res.errorCode === 0) {
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
            bulletingetById({ id: data.id }).then(res => {
            if (res && res.errorCode === 0) {
              this.$refs.lookDialog.showDialogFuc("look", res.body);
            }
          });
        break;
        case "edit":
            bulletingetById({ id: data.id }).then(res => {
            if (res && res.errorCode === 0) {
              this.$refs.editDialog.showDialogFuc("edit", res.body);
            }
          });
        break;
      }
    },
    changeFuc(type, value) {
      // console.log(value)
      this.loadingBtn = true;
      if (type == "page") {
        // console.log(type,this)
        this.tableObj.startPage = value;
      }
      announcement(this.tableObj).then(res => {
        if (res.errorCode == 0) {
          this.loadingBtn = false;
          this.tableData = res.body;
        }
      });
    },
    initWeb() {
      this.changeFuc();
    }
  }
};
</script>

<style lang="stylus" scoped>
.screening {
  padding: 30px 0 0 30px;
  box-sizing: border-box;
}

.submitBtn {
  text-align: center;
}
</style>
