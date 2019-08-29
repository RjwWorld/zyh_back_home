<template>
<!-- 项目列表资产查看详情 -->
    <div class="projectDetails">
        <div class="imgListBox">
            <look-img :imgUrl="item" v-for="(item,index) in dataObj.imageList" :key="index"/>
        </div>
        <div class="baseInfo">
            <el-form label-width="111px" label-position="left">
                <div class="form_div">
                    <el-form-item label="项目分类：">
                        <span v-if="dataObj.projectTypeCode === 1000">资产</span>
                        <span v-if="dataObj.projectTypeCode === 2000">地产</span>
                        <span v-if="dataObj.projectTypeCode === 3000">项目股权</span>
                    </el-form-item>
                    <el-form-item label="项目领域：" >
                        <span>{{dataObj.involvedDomain}}</span>
                    </el-form-item>
                </div>
                <div class="form_div" v-if="dataObj.projectNo">
                  <el-form-item label="项目编号：" >
                    <span>{{dataObj.projectNo}}</span>
                  </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="项目名称：" >
                        <span>{{dataObj.projectName}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="公司：" >
                        <span>{{dataObj.comName}}</span>
                    </el-form-item>
                    <el-form-item label="地址：" >
                        <span>{{dataObj.comProvince}}{{dataObj.comCity}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="详细地址：" >
                        <span>{{dataObj.comAddrDtl}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="成交价格：" >
                        <span v-if="dataObj.isConfer === 0">{{dataObj.startAmt}}&nbsp;&nbsp;万元</span>
                        <span v-if="dataObj.isConfer === 1" style="color:red">面议</span>
                    </el-form-item>
                    <el-form-item label="市场价格：" >
                        <span>{{dataObj.endAmt}}&nbsp;&nbsp;万元</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="项目需求：">
                        <span v-if="dataObj.projectRequirement==='A'">出售</span>
                        <span v-else-if="dataObj.projectRequirement==='B'">融资</span>
                        <span v-else-if="dataObj.projectRequirement==='C'">其他</span>
                        <span v-else-if="dataObj.projectRequirement==='D'">出租</span>
                        <span v-else-if="dataObj.projectRequirement==='E'">收购</span>
                        <span v-else>{{dataObj.projectRequirement}}</span>
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
                <div class="tag_div">
                    <el-form-item label="关键字：" >
                        <el-tag v-for="(item,index) in dataObj.keyWordList" :key="index">{{item}}</el-tag>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="baseInfo" v-if="dataObj.projectTypeCode === 1000">
            <el-form label-width="111px" label-position="left">
                <div class="form_div">
                    <el-form-item label="土地面积：">
                        <span>{{dataObj.landAcreage}}&nbsp;&nbsp;㎡</span>
                    </el-form-item>
                    <el-form-item label="权属性质：">
                        <span v-if="dataObj.ownerProperty=='1'">国有</span>
                        <span v-else-if="dataObj.ownerProperty=='2'">集体所有</span>
                        <span v-else-if="dataObj.ownerProperty=='3'">私有</span>
                        <span v-else-if="dataObj.ownerProperty=='4'">联营企业</span>
                        <span v-else-if="dataObj.ownerProperty=='5'">港、澳、台投资</span>
                        <span v-else-if="dataObj.ownerProperty=='6'">其他</span>
                        <span v-else>{{dataObj.ownerProperty}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="资产类别：">
                        <span v-if="dataObj.category==1">不动产</span>
                        <span v-else-if="dataObj.category==2">其他</span>
                        <span v-else>{{dataObj.category}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="目前用途：">
                        <span v-if="dataObj.currentPurpose=='1'">商业</span>
                        <span v-else-if="dataObj.currentPurpose=='2'">办公</span>
                        <span v-else-if="dataObj.currentPurpose=='3'">工业</span>
                        <span v-else-if="dataObj.currentPurpose=='4'">农业</span>
                        <span v-else-if="dataObj.currentPurpose=='5'">特殊用途</span>
                        <span v-else-if="dataObj.currentPurpose=='6'">住宅</span>
                        <span v-else>{{dataObj.currentPurpose}}</span>
                    </el-form-item>
                    <el-form-item label="规划用途：">
                      <span v-if="dataObj.planPurpose=='1'">商业</span>
                      <span v-else-if="dataObj.planPurpose=='2'">办公</span>
                      <span v-else-if="dataObj.planPurpose=='3'">工业</span>
                      <span v-else-if="dataObj.planPurpose=='4'">农业</span>
                      <span v-else-if="dataObj.planPurpose=='5'">特殊用途</span>
                      <span v-else-if="dataObj.planPurpose=='6'">住宅</span>
                      <span v-else>{{dataObj.planPurpose}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="性质：">
                      <span v-if="dataObj.nature=='biz'">商业</span>
                      <span v-else-if="dataObj.nature=='biz_reside'">商住</span>
                      <span v-else-if="dataObj.nature=='collective'">集体建筑用地</span>
                      <span v-else-if="dataObj.nature=='industry'">工业</span>
                      <span v-else-if="dataObj.nature=='other'">其他</span>
                      <span v-else-if="dataObj.nature=='reside'">住宅</span>
                      <span v-else>{{dataObj.nature}}</span>
                    </el-form-item>
                    <el-form-item label="过户形式：">
                        <span v-if="dataObj.transferForm=='A'">现金转让</span>
                        <span v-else-if="dataObj.transferForm=='B'">股权转让</span>
                        <span v-else>{{dataObj.transferForm}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="是否改公寓：">
                        <span v-if="dataObj.changeApartment=='0'">否</span>
                        <span v-else-if="dataObj.changeApartment=='1'">是</span>
                        <span v-else>{{dataObj.changeApartment}}</span>
                    </el-form-item>
                    <el-form-item label="是否做贷款：">
                      <span v-if="dataObj.makeLoans=='0'">否</span>
                      <span v-else-if="dataObj.makeLoans=='1'">是</span>
                      <span v-else>{{dataObj.makeLoans}}</span>
                    </el-form-item>
                </div>
                <div class="item_title">
                    <el-form-item label-width="133px" label="权属证明：">
                        <!-- <div>
                            <img @click="lookImg($store.state.user.ip+dataObj.ownershipCertificate)" :src="dataObj.ownershipCertificate?$store.state.user.ip+dataObj.ownershipCertificate:''" alt="" height="150px">
                        </div> -->
                        <look-img :imgUrl ="$store.state.user.ip+dataObj.ownershipCertificate" />
                    </el-form-item>
                </div>
                <div class="item_title">
                    <el-form-item label-width="133px" label="改造的关键环节："></el-form-item>
                    <p class="p_text">{{dataObj.remakeKey}}</p>
                </div>
                <div class="item_title">
                    <el-form-item label-width="133px" label="税收情况："></el-form-item>
                    <p class="p_text">{{dataObj.taxSituation}}</p>
                </div>
                <div class="item_title">
                    <el-form-item label-width="133px" label="项目详细信息："></el-form-item>
                    <p class="p_text">{{dataObj.dtlInf}}</p>
                </div>
                <div>
                    <el-form-item label="共有情况：" >
                        <span v-if="dataObj.ownedStatus=='0'">无</span>
                        <span v-else-if="dataObj.ownedStatus=='1'">有</span>
                        <span v-else>{{dataObj.ownedStatus}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label-width="233px" label="抵押、租赁等其他项权利情况：">
                        <span v-if="dataObj.pledgeStatus=='0'">无</span>
                        <span v-else-if="dataObj.pledgeStatus=='1'">有</span>
                        <span v-else>{{dataObj.pledgeStatus}}</span>
                    </el-form-item>
                </div>
                <div class="border"></div>
                <div>
                    <el-form-item label="权证编号：" v-if="dataObj.warrantNo">
                        <span>{{dataObj.warrantNo}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="使用期限：" v-if="dataObj.startUseTime">
                        <span>{{dataObj.startUseTime}}&nbsp;至&nbsp;{{dataObj.endUseTime}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label-width="200px" label="权利人是否行驶优先受让权：" v-if="dataObj.hasUsePriority">
                        <span>{{dataObj.hasUsePriority}}</span>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="baseInfo" v-if="dataObj.projectTypeCode === 2000">
            <el-form label-width="111px" label-position="left">
                <div class="form_div">
                    <el-form-item label="面积：">
                        <span>{{dataObj.landAcreage}}&nbsp;&nbsp;亩</span>
                    </el-form-item>
                    <el-form-item label="容积率：">
                        <span>{{dataObj.volumeRate}}&nbsp;&nbsp;</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="建筑密度：">
                        <span>{{dataObj.buildingDensity}}&nbsp;&nbsp;%</span>
                    </el-form-item>
                    <el-form-item label="限高：">
                        <span>{{dataObj.heightPermitted}}&nbsp;&nbsp;m</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="车位比：">
                        <span v-if="dataObj.parkingRatio">{{dataObj.parkingRatio}}</span>
                        <span v-else>{{dataObj.households}} : {{dataObj.parkingSpaces}}</span>
                    </el-form-item>
                </div>
                <div class="item_title">
                    <el-form-item label-width="133px" label="项目详细信息："></el-form-item>
                    <p class="p_text">{{dataObj.dtlInf}}</p>
                </div>
                <div class="form_div">
                    <el-form-item label="是否净地：">
                        <span>{{dataObj.isTroublesome}}</span>
                    </el-form-item>
                    <el-form-item label="土地性质：">
                        <span>{{dataObj.landNature}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="土地位置：">
                        <span>{{dataObj.landProvince}}{{dataObj.landCity}}</span>
                    </el-form-item>
                    <el-form-item label="配套：">
                      <span v-if="dataObj.supporting=='8'">三通一平</span>
                      <span v-if="dataObj.supporting=='9'">五通一平</span>
                      <span v-if="dataObj.supporting=='10'">七通一平</span>
                    </el-form-item>
                </div>
                <div class="tag_div">
                    <el-form-item label="周边配套：" >
                        <el-tag v-for="(item,index) in dataObj.peripheralMatchingList" :key="index">{{item}}</el-tag>
                    </el-form-item>
                </div>
                <div class="tag_div">
                    <el-form-item label="开发不定因素：" >
                        <el-tag v-for="(item,index) in dataObj.devUncertainFactorsList" :key="index">{{item}}</el-tag>
                        <el-tag v-if="dataObj.other">其他因素：{{dataObj.other}}</el-tag>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="过户方式：">
                        <span>{{dataObj.transferMode}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="是否干净：">
                        <span>{{dataObj.isClean}}</span>
                    </el-form-item>
                </div>
                <div class="border"></div>
                <div class="form_div">
                    <el-form-item label="绿化率：" v-if="dataObj.greeningRate">
                        <span>{{dataObj.greeningRate}}&nbsp;&nbsp;%</span>
                    </el-form-item>
                    <el-form-item label="出让方式：" v-if="dataObj.transferMethod">
                        <span>{{dataObj.transferMethod}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="不动产使用证：" v-if="dataObj.landUseCertificate" label-width="155px">
                        <!-- <div>
                            <img :src="$store.state.user.ip+dataObj.landUseCertificate" alt="" height="150px" @click="lookImg($store.state.user.ip+dataObj.landUseCertificate)">
                        </div> -->
                        <look-img :imgUrl ="$store.state.user.ip+dataObj.landUseCertificate"/>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="建设用地规划许可证：" v-if="dataObj.buildCertificate" label-width="155px">
                        <!-- <div>
                            <img :src="$store.state.user.ip+dataObj.buildCertificate" alt="" height="150px" @click="lookImg($store.state.user.ip+dataObj.buildCertificate)">
                        </div> -->
                        <look-img :imgUrl ="$store.state.user.ip+dataObj.buildCertificate"/>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="建设用地批准书：" v-if="dataObj.landApprovalCertificate" label-width="155px">
                        <!-- <div>
                            <img :src="$store.state.user.ip+dataObj.landApprovalCertificate" alt="" height="150px" @click="lookImg($store.state.user.ip+dataObj.landApprovalCertificate)">
                        </div> -->
                        <look-img :imgUrl ="$store.state.user.ip+dataObj.landApprovalCertificate"/>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="baseInfo" v-if="dataObj.projectTypeCode === 3000">
            <el-form label-width="111px" label-position="left">
                <div class="item_title">
                    <el-form-item label-width="133px" label="项目详细信息："></el-form-item>
                    <p class="p_text">{{dataObj.dtlInf}}</p>
                </div>
                <div class="form_div">
                    <el-form-item label="企业名称：" v-if="dataObj.comNameC">
                        <span>{{dataObj.comNameC}}</span>
                    </el-form-item>
                    <el-form-item label="注册地址：" v-if="dataObj.registAddr">
                        <span>{{dataObj.registAddr}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="法定代表人：" v-if="dataObj.registAddr">
                        <span>{{dataObj.legalPerson}}</span>
                    </el-form-item>
                    <el-form-item label="成立时间：" v-if="dataObj.registAddr">
                        <span>{{dataObj.establishTime}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="注册资本：" v-if="dataObj.registAmt">
                        <span>{{dataObj.registAmt}}&nbsp;&nbsp;万元</span>
                    </el-form-item>
                    <el-form-item label="经济类型：" v-if="dataObj.economicType">
                        <span>{{dataObj.economicType}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="公司类型：" v-if="dataObj.comType">
                        <span>{{dataObj.comType}}</span>
                    </el-form-item>
                    <el-form-item label="经营规模：" v-if="dataObj.manageScale">
                        <span>{{dataObj.manageScale}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="统一社会信用代码或组织机构代码：" label-width="255px" v-if="dataObj.orgCode">
                        <span>{{dataObj.orgCode}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="经营范围：" v-if="dataObj.manageRange">
                        <span>{{dataObj.manageRange}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="职工：" v-if="dataObj.employeeNum">
                        <span>{{dataObj.employeeNum}}&nbsp;&nbsp;人</span>
                    </el-form-item>
                </div>
                <div v-if="dataObj.dealPayMethod&&dataObj.employeeContinue&&dataObj.renewRequire&&dataObj.serviceRequire">
                    <el-form-item label="交易条件：" class="item_title_c"></el-form-item>
                    <div class="children_div_c">
                        <el-form-item label="1.支付方式" label-width="105px" v-if="dataObj.dealPayMethod">
                            <span class="span_text">{{dataObj.dealPayMethod}}</span>
                        </el-form-item>
                        <el-form-item label="2.对转让标的企业职工是否有继续聘用要求" label-width="300px" v-if="dataObj.employeeContinue">
                            <span class="span_text">{{dataObj.employeeContinue}}</span>
                        </el-form-item>
                        <el-form-item label="3.对转让标的企业存续发展方面是否有要求" label-width="300px" v-if="dataObj.renewRequire">
                            <span class="span_text">{{dataObj.renewRequire}}</span>
                        </el-form-item>
                        <el-form-item label="4.产权转让涉及的售权售务处置是否有要求" label-width="300px" v-if="dataObj.serviceRequire">
                            <span class="span_text">{{dataObj.serviceRequire}}</span>
                        </el-form-item>
                    </div>
                </div>
                <div v-if="dataObj.transfereeConditionList && dataObj.transfereeConditionList.length!=0">
                    <el-form-item label="受让方资格条件(多选)：" class="item_title_c" label-width="188px"></el-form-item>
                    <div class="children_div_c">
                        <p class="p_c" v-for="(item,index) of dataObj.transfereeConditionList" :key="index">{{item}}</p>
                    </div>
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
        }
    },
  created(){
    console.log(this.dataObj,'dataObj')
  },
  data () {
    return {
      // suppo: '',
    }
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
