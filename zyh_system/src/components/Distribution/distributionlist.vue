<template>
  <div class="assetsList">
    <div class="screening">
      <el-form :inline="true" class="demo-form-inline" size="medium">
        <el-form-item>
          <el-input
            @keyup.enter.native="changeFuc()"
            placeholder="手机号"
            v-model="tableObj.mblNo"
            clearable
            maxlength="11"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loadingBtn" @click="changeFuc()">查&nbsp;询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <table-list
      v-if="this.tableData.length>0"
      :tableTitle="tableHeader"
      :tableData="tableData"
      @changeFuc="changeFuc"
      @operation="operation"
    />
    <distributionlistdel ref="lookDialog"/>
  </div>
</template>

<script>
import allTableHeader from "@/files/js/tableHeader";
import TableList from "@/components/Distribution/table";
import { invitegetList,userManageDtl } from "@/api";
import distributionlistdel from"@/components/Distribution/distributionlistdel"
export default {
  components: {
    TableList,
    distributionlistdel
  },
  data() {
    return {
      loadingBtn: false,
      tableHeader: allTableHeader.Invitefriends,
      tableObj: {
        mblNo: ""
      },
      tableData: [],
    };
  },
  methods: {
    operation(type, data) {
        switch(type){
            case "look":
            userManageDtl({ id: data.id }).then(res => {
            if (res && res.errorCode === 0) {
              this.$refs.lookDialog.showDialogFuc(type, res.body);
            }
          });
            break;
        }
    },
    changeFuc() {
    //   console.log(this.tableObj.mblNo);
      if (this.tableObj.mblNo == "" || this.tableObj.mblNo.length < 11) {
        this.$message({
          message: "请输入手机号",
          type: "warning"
        });
      } else {
        invitegetList(this.tableObj).then(res => {
          if (res.errorCode == 0) {
            this.loadingBtn = false;
            this.tableData = res.body;
          }
        //   console.log(this.tableData);
        });
      }
    }
  }
};
</script>

<style scoped>
.screening {
  padding: 30px 0 0 30px;
  box-sizing: border-box;
}
</style>
