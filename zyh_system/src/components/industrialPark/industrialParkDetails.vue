<template>
  <!-- 项目列表资产查看详情 -->
  <div class="projectDetails">
    <div class="baseInfo">
      <h1 class="h1_title">基本信息</h1>
      <el-form label-width="85px" label-position="left">
        <div class="form_div">
          <el-form-item label="项目名称：" >
            <span>{{dataObj.projectName}}</span>
          </el-form-item>
          <el-form-item label="结构：" label-width="54px">
            <span v-if="dataObj.construction=='A'">标准结构</span>
            <span v-if="dataObj.construction=='B'">排架结构</span>
            <span v-if="dataObj.construction=='C'">框架结构</span>
            <span v-if="dataObj.construction=='D'">砖混结构</span>
            <span v-if="dataObj.construction=='E'">钢架结构</span>
          </el-form-item>
        </div>
        <div class="form_div" v-if="dataObj.projectNo">
          <el-form-item label="项目编号：" >
            <span>{{dataObj.projectNo}}</span>
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
        <div class="form_div">
          <el-form-item label="对接人：" >
            <span>{{dataObj.dockingMan}}</span>
          </el-form-item>
          <el-form-item label="对接人手机号：" label-width="110px">
            <span>{{dataObj.dockingTel}}</span>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="地址：" >
            <span>{{dataObj.comProvince}}{{dataObj.comCity}}</span>
          </el-form-item>
          <el-form-item label="详细地址：" >
            <span>{{dataObj.comAddrDtl}}</span>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="建筑面积：" >
            <span>{{dataObj.buildAcreage}}</span>
            <span>m²</span>
          </el-form-item>
          <el-form-item label="土地总面积：" label-width="110px">
            <span>{{dataObj.landAcreage}}</span>
            <span>m²</span>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="价格：" label-width="54px">
            <span v-if="dataObj.isConfer === 0">{{dataObj.startAmt}}元/平方米</span>
            <span v-if="dataObj.isConfer === 1" style="color:red">面议</span>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="园区等级：" >
            <span v-if="dataObj.parkLevel=='A'">国家级</span>
            <span v-if="dataObj.parkLevel=='B'">省级</span>
            <span v-if="dataObj.parkLevel=='C'">市级</span>
          </el-form-item>
          <el-form-item label="待征地面积：" label-width="110px">
            <span>{{dataObj.requisitionAcreage}}</span>
            <span>m²</span>
          </el-form-item>

        </div>
        <div class="form_div">
          <el-form-item label="类型：">
            <span v-if="dataObj.parkType=='A'">工业用地</span>
            <span v-if="dataObj.parkType=='B'">厂房</span>
            <span v-if="dataObj.parkType=='C'">租赁</span>
          </el-form-item>
          <el-form-item label="领域：" label-width="54px">
            <span>土地</span>
          </el-form-item>
        </div>
        <h1 class="h1_title">设施信息</h1>
        <div class="form_div">
          <el-form-item label="房产证：" >
            <span v-if="dataObj.hasHousePropertyCertificate=='1'">有</span>
            <span v-if="dataObj.hasHousePropertyCertificate=='0'">无</span>
          </el-form-item>
          <el-form-item label="地产证：">
            <span v-if="dataObj.hasRealEstateCertificate=='1'">有</span>
            <span v-if="dataObj.hasRealEstateCertificate=='0'">无</span>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="层高：" >
            <span>{{dataObj.storeyHeight}}</span>
            <span>米</span>
          </el-form-item>
          <el-form-item label="配电量：" label-width="74px">
            <span>{{dataObj.distributionOf}}</span>
            <span>KW.h</span>
          </el-form-item>
        </div>
        <div class="form_div1">
          <el-form-item label="使用年限：" >
            <span>{{dataObj.startTime}} —— {{dataObj.endTime}}</span>
          </el-form-item>
        </div>
        <div class="form-textarea">
          <p class="textarea-title">详情信息：</p>
          <span>{{dataObj.dtlInf}}</span>
        </div>
        <div class="form-textarea">
          <p class="textarea-title">税收政策：</p>
          <span>{{dataObj.taxPolicy}}</span>
        </div>
        <div class="form-textarea">
          <p class="textarea-title">当前产业定位规划：</p>
          <span>{{dataObj.industrialPricingPlanning}}</span>
        </div>
        <el-form-item label="房产证：" v-if="dataObj.housePropertyCertificate" label-width="155px" style="margin-top: 30px">
          <look-img :imgUrl ="$store.state.user.ip+dataObj.housePropertyCertificate"/>
        </el-form-item>
        <el-form-item label="地产证：" v-if="dataObj.realEstateCertificate" label-width="155px">
          <look-img :imgUrl ="$store.state.user.ip+dataObj.realEstateCertificate"/>
        </el-form-item>
      </el-form>
      <div class="imgListBox">
        <look-img :imgUrl="item" v-for="(item,index) in dataObj.imageList" :key="index"/>
      </div>
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
      /*padding-bottom 30px;*/
      /*border 1px solid red;*/
      /*padding 0 50px;*/
      box-sizing border-box;
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
