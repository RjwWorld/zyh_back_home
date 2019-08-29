<template>
<!-- 项目列表资产查看详情 -->
    <div class="projectDetails">
        <div class="baseInfo">
            <el-form label-width="150px" label-position="left">
                <div class="form_div">
                    <el-form-item label="公司：" >
                        <span>{{dataObj.comName}}</span>
                    </el-form-item>
                    <el-form-item label="项目名称：" >
                      <span>{{dataObj.projectName}}</span>
                    </el-form-item>
                </div>
              <div class="form_div" v-if="dataObj.projectNo">
                <el-form-item label="项目编号：" >
                  <span>{{dataObj.projectNo}}</span>
                </el-form-item>
              </div>
                <div class="form_div">
                    <el-form-item label="地址：" >
                        <span>{{dataObj.comProvince}}{{dataObj.comCity}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="详细地址：" >
                        <span>{{dataObj.comAddrDtl}}</span>
                    </el-form-item>
                    <el-form-item label="法人控股人：" >
                      <span>{{dataObj.legalPersonHolding}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="注册时间：" >
                        <span>{{dataObj.registrationTime}}</span>
                    </el-form-item>
                    <el-form-item label="注册号：" >
                        <span>{{dataObj.registrationNumber}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="统一社会信用代码：" >
                        <span>{{dataObj.socialCreditCode}}</span>
                    </el-form-item>
                    <el-form-item label="登记机关：" >
                        <span>{{dataObj.registrationAuthority}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="联系人：" >
                        <span>{{dataObj.linkMan}}</span>
                    </el-form-item>
                    <el-form-item label="联系人手机号：" >
                        <span>{{dataObj.linkTel}}</span>
                    </el-form-item>
                </div>
                <div class="form_div1">
                    <el-form-item label="营业期限：" >
                        <span>{{dataObj.startBizTime}}--{{dataObj.endBizTime}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="营业状态：">
                        <span v-if="dataObj.dealStatus=='A'">存续</span>
                        <span v-if="dataObj.dealStatus=='B'">在业</span>
                        <span v-if="dataObj.dealStatus=='C'">吊销</span>
                        <span v-if="dataObj.dealStatus=='D'">注销</span>
                        <span v-if="dataObj.dealStatus=='E'">迁入</span>
                        <span v-if="dataObj.dealStatus=='F'">停业</span>
                        <span v-if="dataObj.dealStatus=='G'">清算</span>
                    </el-form-item>
                    <el-form-item label="公司类型：" >
                        <span v-if="dataObj.comType==1">有限责任公司</span>
                        <span v-if="dataObj.comType==2">股份制公司</span>
                        <span v-if="dataObj.comType==3">集团公司</span>
                        <span v-if="dataObj.comType==4">一人制公司</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="投资方向：" >
                        <span v-if="dataObj.investmentDirection=='A'">土地</span>
                        <span v-if="dataObj.investmentDirection=='B'">资产</span>
                        <span v-if="dataObj.investmentDirection=='C'">消费</span>
                        <span v-if="dataObj.investmentDirection=='D'">企业服务</span>
                        <span v-if="dataObj.investmentDirection=='E'">教育</span>
                        <span v-if="dataObj.investmentDirection=='F'">医疗健康</span>
                        <span v-if="dataObj.investmentDirection=='G'">高科技</span>
                        <span v-if="dataObj.investmentDirection=='H'">智能硬件</span>
                        <span v-if="dataObj.investmentDirection=='I'">金融科技</span>
                        <span v-if="dataObj.investmentDirection=='J'">现代制造</span>
                        <span v-if="dataObj.investmentDirection=='K'">旅游</span>
                        <span v-if="dataObj.investmentDirection=='L'">O2O</span>
                        <span v-if="dataObj.investmentDirection=='M'">人工智能</span>
                        <span v-if="dataObj.investmentDirection=='N'">房产</span>
                        <span v-if="dataObj.investmentDirection=='O'">交通</span>
                        <span v-if="dataObj.investmentDirection=='P'">社交</span>
                        <span v-if="dataObj.investmentDirection=='Q'">体育</span>
                        <span v-if="dataObj.investmentDirection=='R'">物流</span>
                        <span v-if="dataObj.investmentDirection=='S'">能源</span>
                        <span v-if="dataObj.investmentDirection=='T'">共享经济</span>
                        <span v-if="dataObj.investmentDirection=='U'">区块链</span>
                        <span v-if="dataObj.investmentDirection=='V'">农业</span>
                        <span v-if="dataObj.investmentDirection=='W'">大数据</span>
                        <span v-if="dataObj.investmentDirection=='X'">其他</span>
                        <span v-if="dataObj.investmentDirection=='Y'">生活服务</span>
                    </el-form-item>
                </div>
                <div class="tag_div">
                  <el-form-item label="关键字：" >
                    <el-tag v-for="(item,index) in dataObj.keyWordsList" :key="index">{{item}}</el-tag>
                  </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="预计年投资量：" >
                        <span>{{dataObj.yearInvestment}}万元</span>
                    </el-form-item>
                    <el-form-item label="集团总资产：" >
                        <span>{{dataObj.groupAssets}}万元</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="剩余投量：" >
                        <span>{{dataObj.remaindInvestment}}万元</span>
                    </el-form-item>
                    <el-form-item label="已投放比：" >
                        <span>{{dataObj.putRatio}}%</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="经营范围：" >
                        <span>{{dataObj.bizScope}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="公司介绍：" >
                        <span>{{dataObj.comIntroduction}}</span>
                    </el-form-item>
                </div>
                <el-form-item label="公司Logo：" v-if="dataObj.comLogo" label-width="155px">
                  <look-img :imgUrl ="$store.state.user.ip+dataObj.comLogo"/>
                </el-form-item>
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
</style>
