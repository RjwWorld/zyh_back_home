<template>
  <!-- 项目列表资产查看详情 -->
  <div class="projectDetails">
    <div class="baseInfo">
      <el-form label-width="110px" label-position="left">
        <div class="form_div">
          <el-form-item label="园区名称：" >
            <span>{{dataObj.projectName}}</span>
          </el-form-item>
          <el-form-item label="项目编号：" v-if="dataObj.projectNo">
            <span>{{dataObj.projectNo}}</span>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="地址：" >
            <span>{{dataObj.comProvince}}{{dataObj.comCity}}{{dataObj.comArea}}</span>
          </el-form-item>
          <el-form-item label="详细地址：" >
            <span>{{dataObj.comAddrDtl}}</span>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="联系人：" >
            <span>{{dataObj.linkMan}}</span>
          </el-form-item>
          <el-form-item label="联系人手机号：" label-width="110px">
            <span>{{dataObj.linkTel}}</span>
          </el-form-item>
        </div>
        <div class="tag_div">
          <el-form-item label="产业导向：" >
            <el-tag v-for="(item,index) in dataObj.industryGuideList" :key="index">{{item}}</el-tag>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="标准厂房租价：">
            <span>{{dataObj.startAmt}}</span>
            <span>元/平方米</span>
          </el-form-item>
          <el-form-item label="园区面积：">
            <span>{{dataObj.landAcreage}}</span>
            <span>亩</span>
          </el-form-item>
        </div>
        <div class="form-textarea">
          <p class="textarea-title">园区概况：</p>
          <span>{{dataObj.dtlInf}}</span>
        </div>
        <div class="form-textarea" v-if="dataObj.taxPolicy">
          <p class="textarea-title">优惠政策：</p>
          <span>{{dataObj.taxPolicy}}</span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import LookImg from '@/components/Common/lookImg.vue'
  export default {
    components:{
      LookImg
    },
    props:{
      dataObj:{
        type:Object,
      },
      freeDataObj:{
        type:Object
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .projectDetails{
    .baseInfo{
      padding 0 100px;
      .tag_div{
        .el-tag + .el-tag {
          margin-left: 10px;
        }
      }
    }
    .form_div{
      display flex;
      >>>.el-form-item__content{
        width 233px;
      }
    }
    .item_title{
      margin-bottom 22px;
      >>> .el-form-item{
        margin-bottom 0;
      }
    }
    .item_title_c{
      margin-bottom 0;
    }
    .p_text{
      color black;
      text-indent 28px;
    }
    .children_div{
      padding-left 40px;
    }
    .children_div_c{
      padding-left 40px;
      >>> .el-form-item{
        margin-bottom 0;
      }
      .p_c{
        line-height 40px;
      }
    }
    .border{
      border 1px solid #e6e6e6
      margin-bottom 30px;
    }
    .imgListBox{
      display flex;
      justify-content space-around;
      width 100%;
      height 150px;
      overflow hidden;
      padding-bottom 30px;
    }
  }
  .h1_title {
    width: 111px;
    font-size: 18px;
    font-weight: bold;
    padding: 0 12px 23px 0;
    box-sizing: border-box;
  }
  .form-textarea{
    margin-top 40px;
  }
  .textarea-title{
    margin-bottom 10px;
    line-height 30px;
  }
</style>
