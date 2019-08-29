<template>
  <!-- 项目列表管理员审核 -->
  <div class="projectDialog">
    <el-dialog
      title="查看预览"
      :visible.sync="showDialog"
      @close="closeFuc"
      width="1300px"
      center
    >
      <land-all-details :dataObj="dataObj" :freeDataObj="freeDataObj"/>
      <span slot="footer" class="dialog-footer" v-if="dialogType == 'submit'">
                <el-button type="primary" @click="submitFuc"  :loading="loadingBtn">保&nbsp;存</el-button>
            </span>
      <span slot="footer" class="dialog-footer" v-if="dialogType == 'audit'">
                <el-button type="primary" :loading="loadingBtn" @click="submitFuc">提&nbsp;交</el-button>
            </span>

    </el-dialog>
  </div>
</template>

<script>
  import landAllDetails from '@/components/landResources/landAllDetails/'
  export default {
    components:{
      landAllDetails
    },
    props:{

    },
    data(){
      return{
        dialogType:"",
        showDialog:false,
        loadingBtn:false,
        dataObj:{},//接收从investDetails传过来的dataObj
        freeDataObj:{},
      }
    },
    created(){

    },
    methods:{
      closeFuc(){
        this.showDialog= false;
        this.loadingBtn=false;
      },
      closeLoadingFuc(){
        this.loadingBtn=false;
      },
      showDialogFuc(type,showData){
        this.dialogType = type
        if(this.dialogType == 'audit'){
          this.auditObj.projectId = showData.projectId//点击审查按钮传入接口的为projectId
        }
        this.dataObj = showData
        this.showDialog= true;

      },
      //发布
      submitFuc(){
        if(this.dialogType =='submit'){
          this.$confirm('确定保存该项目?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            this.loadingBtn=true;
            this.$emit('subFuc')
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消保存'
            });
          });
        }
      },
      resetForm(){
        this.showDialog= false;
        this.$refs.audit_form.resetFields();
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .projectDialog{
    .baseInfo{
      padding 30px;
      .tag_div{
        .el-tag + .el-tag {
          margin-left: 10px;
        }
      }
    }
    .A_information{
      padding 30px;
    }
    .B_information{
      padding 30px;
    }
    .C_information{
      padding 30px;
    }
    .h1_title{
      font-size 20px;
      padding-bottom 20px;
      text-align center;
    }
    .form_div{
      display flex;
    }
    .form_div2 >>> .el-form-item{
      margin-bottom 0px;
    }
    .form_div3{
      padding-left 166px;
      .span_text{
        color black;
        margin-left 30px;
      }
      .p_text{
        line-height 40px;
        color black;
      }
    }
    .form_div4{
      width 500px;
      margin auto;
    }
    .border{
      border 1px solid black
    }
    .imgListBox{
      display flex;
      justify-content space-around;
      width 100%;
      height 150px;
      overflow hidden;
    }
    .imgBox{
      overflow hidden;
      width 180px;
      height 150px;
      border-radius 3px;
    }
  }
</style>
