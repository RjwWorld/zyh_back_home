<template>
    <div class="projectDetails">
        <div class="imgListBox">
            <div class="imgBox" v-for="(item,index) in dataObj.imageList" :key="index">
                <img :src="item" alt="" height="150px">
            </div>
        </div>
        <div class="baseInfo">
            <el-form label-width="233px">
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
                <div class="form_div">
                    <el-form-item label="项目名称：" >
                        <span>{{dataObj.projectName}}</span>
                    </el-form-item>
                    <el-form-item label="权重：" >
                        <span>{{dataObj.homeRecommend}}</span>
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
                <div>
                    <el-form-item label="详细地址：" >
                        <span>{{dataObj.comAddrDtl}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="面积：" v-if="dataObj.projectTypeCode !== 3000">
                        <span>{{dataObj.landAcreage}}&nbsp;&nbsp;㎡</span>
                    </el-form-item>
                    <el-form-item label="项目需求：" >
                        <span>{{dataObj.projectRequirement}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="总价：" >
                        <span v-if="dataObj.isConfer === 0">{{dataObj.startAmt}}&nbsp;&nbsp;万元</span>
                        <span v-if="dataObj.isConfer === 1">面议</span>
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
                <div>
                    <el-form-item label="详细信息：" >
                        <span>{{dataObj.dtlInf}}</span>
                    </el-form-item>
                </div>
                <div class="tag_div">
                    <el-form-item label="标签：" >
                        <el-tag v-for="(item,index) in dataObj.tagCodeList" :key="index">{{item}}</el-tag>
                    </el-form-item>
                </div>
                <div class="tag_div">
                    <el-form-item label="关键字：" >
                        <el-tag v-for="(item,index) in dataObj.keyWordList" :key="index">{{item}}</el-tag>
                    </el-form-item>
                </div>

            </el-form>
        </div>

        <div class="border"></div>

        <div class="A_information" v-if="dataObj.projectTypeCode === 1000">
            <el-form label-width="233px">
                <div>
                    <el-form-item label="资产描述：" v-if="dataObj.modelReqVO.assetDesc">
                        <span>{{dataObj.modelReqVO.assetDesc}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="资产类别：" v-if="dataObj.modelReqVO.category">
                        <span>{{dataObj.modelReqVO.category}}</span>
                    </el-form-item>
                    <el-form-item label="权属性质：" v-if="dataObj.modelReqVO.ownerProperty">
                        <span>{{dataObj.modelReqVO.ownerProperty}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="权证编号：" v-if="dataObj.modelReqVO.warrantNo">
                        <span>{{dataObj.modelReqVO.warrantNo}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="规划用途：" v-if="dataObj.modelReqVO.planPurpose">
                        <span>{{dataObj.modelReqVO.planPurpose}}</span>
                    </el-form-item>
                    <el-form-item label="目前用途：" v-if="dataObj.modelReqVO.currentPurpose">
                        <span>{{dataObj.modelReqVO.currentPurpose}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="配套：" v-if="dataObj.modelReqVO.supporting">
                        <span>{{dataObj.modelReqVO.supporting}}</span>
                    </el-form-item>
                    <el-form-item label="建筑面积：" v-if="dataObj.modelReqVO.buildAcreage">
                        <span>{{dataObj.modelReqVO.buildAcreage}}&nbsp;&nbsp;㎡</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="使用期限：" v-if="dataObj.modelReqVO.startUseTime">
                        <span>{{dataObj.modelReqVO.startUseTime}}&nbsp;至&nbsp;{{dataObj.modelReqVO.endUseTime}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="共有情况：" v-if="dataObj.modelReqVO.ownedStatus">
                        <span>{{dataObj.modelReqVO.ownedStatus}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="抵押、租赁等其他项权利情况：" v-if="dataObj.modelReqVO.pledgeStatus">
                        <span>{{dataObj.modelReqVO.pledgeStatus}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="权利人是否行驶优先受让权：" v-if="dataObj.modelReqVO.hasUsePriority">
                        <span>{{dataObj.modelReqVO.hasUsePriority}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="授权书：" v-if="dataObj.modelReqVO.authorizationLetter">
                        <div class="imgBox">
                            <img :src="$store.state.user.ip+dataObj.modelReqVO.authorizationLetter" alt="" height="150px">
                        </div>
                    </el-form-item>
                </div>
            </el-form>
        </div>

        <div class="B_information" v-if="dataObj.projectTypeCode === 2000">
            <el-form label-width="233px">
                <div class="form_div">
                    <el-form-item label="绿化率：" v-if="dataObj.modelReqVO.greeningRate">
                        <span>{{dataObj.modelReqVO.greeningRate}}&nbsp;&nbsp;%</span>
                    </el-form-item>
                    <el-form-item label="容积率：" v-if="dataObj.modelReqVO.volumeRate">
                        <span>{{dataObj.modelReqVO.volumeRate}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="是否净地：" v-if="dataObj.modelReqVO.isTroublesome">
                        <span>{{dataObj.modelReqVO.isTroublesome}}</span>
                    </el-form-item>
                    <el-form-item label="出让方式：" v-if="dataObj.modelReqVO.transferMethod">
                        <span>{{dataObj.modelReqVO.transferMethod}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="土地使用性质：" v-if="dataObj.modelReqVO.useLimit">
                        <span>{{dataObj.modelReqVO.useLimit}}</span>
                    </el-form-item>
                    <el-form-item label="配套：" v-if="dataObj.modelReqVO.supporting" label-width="133px">
                        <span>{{dataObj.modelReqVO.supporting}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="不动产使用证：" v-if="dataObj.modelReqVO.landUseCertificate">
                        <div class="imgBox">
                            <img :src="$store.state.user.ip+dataObj.modelReqVO.landUseCertificate" alt="" height="150px">
                        </div>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="建设用地规划许可证：" v-if="dataObj.modelReqVO.buildCertificate">
                        <div class="imgBox">
                            <img :src="$store.state.user.ip+dataObj.modelReqVO.buildCertificate" alt="" height="150px">
                        </div>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="建设用地批准书：" v-if="dataObj.modelReqVO.landApprovalCertificate">
                        <div class="imgBox">
                            <img :src="$store.state.user.ip+dataObj.modelReqVO.landApprovalCertificate" alt="" height="150px">
                        </div>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="授权书：" v-if="dataObj.modelReqVO.authorizationLetter">
                        <div class="imgBox">
                            <img :src="$store.state.user.ip+dataObj.modelReqVO.authorizationLetter" alt="" height="150px">
                        </div>
                    </el-form-item>
                </div>
            </el-form>
        </div>

        <div class="C_information" v-if="dataObj.projectTypeCode === 3000">
            <el-form label-width="233px">
                <div>
                    <el-form-item label="企业名称：" v-if="dataObj.modelReqVO.comName">
                        <span>{{dataObj.modelReqVO.comName}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="注册地址：" v-if="dataObj.modelReqVO.registAddr">
                        <span>{{dataObj.modelReqVO.registAddr}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="法定代表人：" v-if="dataObj.modelReqVO.registAddr">
                        <span>{{dataObj.modelReqVO.legalPerson}}</span>
                    </el-form-item>
                    <el-form-item label="成立时间：" v-if="dataObj.modelReqVO.registAddr">
                        <span>{{dataObj.modelReqVO.establishTime}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="注册资本：" v-if="dataObj.modelReqVO.registAmt">
                        <span>{{dataObj.modelReqVO.registAmt}}&nbsp;&nbsp;万元</span>
                    </el-form-item>
                    <el-form-item label="经济类型：" v-if="dataObj.modelReqVO.economicType">
                        <span>{{dataObj.modelReqVO.economicType}}</span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="公司类型：" v-if="dataObj.modelReqVO.comType">
                        <span>{{dataObj.modelReqVO.comType}}</span>
                    </el-form-item>
                    <el-form-item label="经营规模：" v-if="dataObj.modelReqVO.manageScale">
                        <span>{{dataObj.modelReqVO.manageScale}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="统一社会信用代码或组织机构代码：" label-width="266px" v-if="dataObj.modelReqVO.orgCode">
                        <span>{{dataObj.modelReqVO.orgCode}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="经营范围：" v-if="dataObj.modelReqVO.manageRange">
                        <span>{{dataObj.modelReqVO.manageRange}}</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="职工：" v-if="dataObj.modelReqVO.employeeNum">
                        <span>{{dataObj.modelReqVO.employeeNum}}&nbsp;&nbsp;人</span>
                    </el-form-item>
                </div>
                <div class="form_div2" v-if="dataObj.modelReqVO.dealPayMethod&&dataObj.modelReqVO.employeeContinue&&dataObj.modelReqVO.renewRequire&&dataObj.modelReqVO.serviceRequire">
                    <div class="trading_title">
                        <el-form-item label="交易条件："></el-form-item>
                    </div>
                    <div class="form_div3">
                        <el-form-item label="1.支付方式" label-width="105px" v-if="dataObj.modelReqVO.dealPayMethod">
                            <span class="span_text">{{dataObj.modelReqVO.dealPayMethod}}</span>
                        </el-form-item>
                        <el-form-item label="2.对转让标的企业职工是否有继续聘用要求" label-width="300px" v-if="dataObj.modelReqVO.employeeContinue">
                            <span class="span_text">{{dataObj.modelReqVO.employeeContinue}}</span>
                        </el-form-item>
                        <el-form-item label="3.对转让标的企业存续发展方面是否有要求" label-width="300px" v-if="dataObj.modelReqVO.renewRequire">
                            <span class="span_text">{{dataObj.modelReqVO.renewRequire}}</span>
                        </el-form-item>
                        <el-form-item label="4.产权转让涉及的售权售务处置是否有要求" label-width="300px" v-if="dataObj.modelReqVO.serviceRequire">
                            <span class="span_text">{{dataObj.modelReqVO.serviceRequire}}</span>
                        </el-form-item>
                    </div>
                </div>
                <div class="form_div2" v-if="dataObj.modelReqVO.transfereeConditionList && dataObj.modelReqVO.transfereeConditionList.length!=0">
                    <div class="trading_title">
                        <el-form-item label="受让方资格条件(多选)：" label-width="310px"></el-form-item>
                    </div>
                    <div class="form_div3">
                        <p class="p_text" v-for="(item,index) of dataObj.modelReqVO.transfereeConditionList" :key="index">{{item}}</p>
                    </div>
                </div>
                <div>
                    <el-form-item label="授权书：" v-if="dataObj.modelReqVO.authorizationLetter">
                        <div class="imgBox">
                            <img :src="$store.state.user.ip+dataObj.modelReqVO.authorizationLetter" alt="" height="150px">
                        </div>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        dataObj:{
            type:Object,
        }
    },
}
</script>

<style lang="stylus" scoped>
.projectDetails{
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
        width 200px;
        height 150px;
        border-radius 3px;
    }
}
</style>
