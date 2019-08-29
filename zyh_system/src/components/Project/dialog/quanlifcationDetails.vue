<template>
  <div class="quanlifcationDetails">
    <div class="baseInfo">
      <el-form label-width="150px" label-position="left">
        <div class="form_div1" v-if="dataObj.projectNo">
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
        <div>
            <el-form-item label="证书图片：" label-width="155px">
              <div class="imgs">
                <look-img
                  :imgUrl="item"
                  v-for="(item,index) in dataObj.certificateImgList"
                  :key="index"
                />
              </div>
            </el-form-item>
          </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import LookImg from "@/components/Common/lookImg.vue";
export default {
  components: {
    LookImg
  },
  props: {
    dataObj: {
      type: Object
    }
  }
};
</script>

<style lang="stylus" scoped>
.quanlifcationDetails{
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
    .imgs{
      display flex;
    }
    
}
</style>
