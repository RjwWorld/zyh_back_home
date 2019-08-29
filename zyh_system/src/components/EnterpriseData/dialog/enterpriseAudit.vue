<!--企业列表审核-->
<template>
  <div class="enterpriseAudit">
    <el-dialog
      :title="dialogType=='audit'?'审核':'查看预览'"
      :visible.sync="showDialog"
      @close="closeFuc"
      width="1300px"
      center
    >
    <el-steps :active="active" finish-status="success" process-status="finish" simple>
      <el-step title="基本信息" icon="el-icon-edit" @click.native="baseState"></el-step>
      <el-step title="团队" icon="el-icon-edit" @click.native="team"></el-step>
      <el-step title="市场" icon="el-icon-edit" @click.native="market"></el-step>
      <el-step title="技术" icon="el-icon-edit" @click.native="technology"></el-step>
      <el-step title="财务情况" icon="el-icon-edit" @click.native="financialState"></el-step>
      <el-step title="资金构成" icon="el-icon-edit" @click.native="capitalConstitute"></el-step>
      <el-step title="商业模式" icon="el-icon-edit" @click.native="businessModel"></el-step>
    </el-steps>

      <enterprise-details
        :dataObj="dataObj"
        :active="active"
        :teamTable="teamTable"
        :cutTable="cutTable"
        :incrementalTable="incrementalTable"
        :leaveTable="leaveTable"
      />

      <div class="prev_next">
        <el-button size="small" @click="prevFuc">上一步</el-button>
        <el-button size="small" @click="nextFuc">下一步</el-button>
      </div>

      <el-form :model="auditObj" ref="audit_form" label-width="133px" v-if="dialogType == 'audit'">
        <div class="bor"></div>
        <h1 class="h1_title">管理员审核</h1>
        <div class="form_div4">
          <el-form-item label="审核结果：" prop="status">
            <el-select v-model="auditObj.status" placeholder="请选择">
              <el-option
                v-for="item in auditArr"
                :key="item.code"
                :label="item.text"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="form_div4">
          <el-form-item label="权重：" prop="homeRecommend">
            <el-input-number size="mini" v-model='auditObj.homeRecommend' :min="0" :max="100">
            </el-input-number>
          </el-form-item>
        </div>
        <div class="form_div4">
          <el-form-item label="审核说明：" prop="cause">
            <el-input type="textarea" :rows="6" placeholder="请输入审核说明" v-model="auditObj.cause"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="dialogType == 'submit'">
        <el-button type="primary" @click="submitFuc" :loading="loadingBtn">提&nbsp;交</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-if="dialogType == 'audit'">
        <el-button type="primary" :loading="loadingBtn" @click="submitFuc">提&nbsp;交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {projectStatus} from "@/api"
import TableList from "@/components/EnterpriseData/table/table";
import LookImg from "@/components/Common/lookImg.vue";
import {
  baseHeader,
  teamHeader,
  marketHeader,
  capitalHeader
} from "@/components/EnterpriseData/table/tableHeader";
import EnterpriseDetails from "@/components/EnterpriseData/dialog/enterpriseDetails";
export default {
  components: {
    EnterpriseDetails,
    LookImg,
    TableList
  },
  data() {
    return {
      active: 0,
      tableHeader: baseHeader,
      teamHeader,
      dialogType: "",
      showDialog: false,
      loadingBtn: false,
      dataObj: {},
      auditArr: [
        {
          code: 2,
          text: "通过"
        },
        {
          code: 3,
          text: "不通过"
        }
      ],
      auditObj: {
        projectType: 0,
        projectId: "",
        status: 2,
        cause: "",
        homeRecommend:0,
      },
      teamTable: [],
      fullObj: {
        name: "全日制(人数)",
        doctor: "",
        master: "",
        bachelor: "",
        junior: ""
      },
      partObj: {
        name: "非全日制(人数)",
        doctor: "",
        master: "",
        bachelor: "",
        junior: ""
      },
      cutTable: [],
      incrementalTable: [],
      leaveTable: [],
      dateObj: {
        name: "",
        day: "",
        week: "",
        month: ""
      }
    };
  },
  methods: {
    //step点击跳转
    baseState(){
      this.active=0
    },
    team(){
      this.active=1
    },
     market(){
      this.active=2
    },
     technology(){
      this.active=3
    },
     financialState(){
      this.active=4
    },
     capitalConstitute(){
      this.active=5
    },
     businessModel(){
      this.active=6
    },
    showDialogFuc(type, showData) {
      console.log(type, showData);
      this.active = 0;
      this.dialogType = type;
      if (this.dialogType == "audit") {
        this.auditObj.projectId = showData.projectId;
      }
      this.dataObj = showData;
      this.showDialog = true;
      if (
        this.dataObj.teamRespVO.fullTimeDoctor !== null &&
        this.dataObj.teamRespVO.fullTimeMaster !== null &&
        this.dataObj.teamRespVO.fullTimeBachelor !== null &&
        this.dataObj.teamRespVO.fullTimeJunior !== null &&
        this.dataObj.teamRespVO.partTimeDoctor !== null &&
        this.dataObj.teamRespVO.partTimeMaster !== null &&
        this.dataObj.teamRespVO.partTimeBachelor !== null &&
        this.dataObj.teamRespVO.partTimeJunior !== null
      ) {
        this.teamTable = [
          {
            name: "全日制(人数)",
            doctor: this.dataObj.teamRespVO.fullTimeDoctor,
            master: this.dataObj.teamRespVO.fullTimeMaster,
            bachelor: this.dataObj.teamRespVO.fullTimeBachelor,
            junior: this.dataObj.teamRespVO.fullTimeJunior
          },
          {
            name: "非全日制(人数)",
            doctor: this.dataObj.teamRespVO.partTimeDoctor,
            master: this.dataObj.teamRespVO.partTimeMaster,
            bachelor: this.dataObj.teamRespVO.partTimeBachelor,
            junior: this.dataObj.teamRespVO.partTimeJunior
          }
        ];
        // console.log(this.teamTable);
      } else {
        this.teamTable = [];
      }
      this.cutTable = [
        {
          name: "%",
          day: this.dataObj.financingMarketReqVO.cutDays,
          week: this.dataObj.financingMarketReqVO.cutWeeks,
          month: this.dataObj.financingMarketReqVO.cutMonth
        }
      ];
      this.incrementalTable = [
        {
          name: "人数",
          day: this.dataObj.financingMarketReqVO.incrementalDays,
          week: this.dataObj.financingMarketReqVO.incrementalWeeks,
          month: this.dataObj.financingMarketReqVO.incrementalMonth
        }
      ];
      this.leaveTable = [
        {
          name: "人数",
          day: this.dataObj.financingMarketReqVO.leaveDays,
          week: this.dataObj.financingMarketReqVO.leaveWeeks,
          month: this.dataObj.financingMarketReqVO.leaveMonth
        }
      ];
    },
    closeFuc() {
      this.showDialog = false;
      this.loadingBtn = false;
    },
    closeLoadingFuc() {
      this.loadingBtn = false;
    },
    submitFuc() {
      if (this.dialogType == "submit") {
        this.$confirm("确定发布该项目?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        })
          .then(() => {
            this.loadingBtn = true;
            this.$emit("submitFuc");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消发布"
            });
          });
      }
      if (this.dialogType == "audit") {
          this.loadingBtn=true;
        this.$emit("submitFuc", this.auditObj);
      }
    },

    resetForm() {
      this.showDialog = false;
      this.$refs.audit_form.resetFields();
    },
    //导航提示栏
    prevFuc() {
      if (this.active > 0) {
        this.active--;
      } else {
        this.$message({
          message: "当前步骤已是第一步",
          type: "warning"
        });
      }
    },
    nextFuc() {
      switch (this.active) {
        case 0:
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
      }
      if (this.active < 6) {
        this.active++;
      } else {
        this.$message({
          message: "当前步骤已是最后一步",
          type: "warning"
        });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.prev_next {
  text-align: center;
  margin-top: 20px;
}
.h1_title{
        font-size 20px;
        padding-bottom 20px;
        text-align center;
        margin-top :20px;
    }
.form_div4{
        width 500px;
        margin auto;
    }
.el-step{
  cursor:pointer
}

.el-form{
  margin-top :30px;
}

.bor{
  width 700px;
  border:1px solid #e6e6e6;
  margin :auto;
  margin-top 40px;
}
</style>

