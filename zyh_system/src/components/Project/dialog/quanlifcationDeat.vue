<template>
  <div>
    <el-dialog title="查看" :visible.sync="showDialog" @close="closeFuc" width="1000px" center>
      <div class="quanlifcationDetails">
          <div class="baseInfo">
        <el-form label-width="150px" label-position="left">
          <div class="form_div1">
            <el-form-item label="项目编号：">
              <span>{{dataObj.projectNo}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="项目名称：">
              <span>{{dataObj.projectName}}</span>
            </el-form-item>
            <el-form-item label="需求形式：">
              <span>{{dataObj.demandForm}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="资质类型：">
              <span>{{dataObj.qualificationType}}</span>
            </el-form-item>
            <el-form-item label="资质等级：">
              <span>{{dataObj.qualificationLevel}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="联系人：">
              <span>{{dataObj.linkMan}}</span>
            </el-form-item>
            <el-form-item label="联系电话：">
              <span>{{dataObj.linkTel}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="对接人：">
              <span>{{dataObj.dockingMan}}</span>
            </el-form-item>
            <el-form-item label="对接人电话：">
              <span>{{dataObj.dockingTel}}</span>
            </el-form-item>
          </div>
        </el-form>
      </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import LookImg from "@/components/Common/lookImg.vue";
export default {
  components: {
    LookImg
  },
  data() {
    return {
      dialogType: "",
      showDialog: false,
      loadingBtn: false,
      dataObj: {},
      auditObj: {
        projectType: 0,
        projectId: "",
        status: 2,
        cause: ""
      }
    };
  },
  methods: {
    showDialogFuc(type, showData) {
      this.dialogType = type;
      this.dataObj = showData;
      this.showDialog = true;
    },
    closeFuc() {
      this.showDialog = false;
      this.loadingBtn = false;
    },
    closeLoadingFuc() {
      this.loadingBtn = false;
    },
    resetForm() {
      this.showDialog = false;
      this.$refs.audit_form.resetFields();
    }
  }
};
</script>

<style lang="stylus" scoped>
.quanlifcationDetails {
  .baseInfo {
    padding: 30px;
    width: 800px;
  }

  .form_div{
        display flex;
        >>>.el-form-item__content{
            width 233px;
        }
    }
}
</style>
