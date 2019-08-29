<template>
  <!-- 企业列表编辑 -->
  <div class="editDialog">
    <el-dialog
      title="企业参数编辑"
      :visible.sync="showDialog"
      width="1300px"
      center
      @close="down('baseForm')"
    >
      <el-steps :active="active" finish-status="success" process-status="finish" simple>
        <el-step title="基本信息" icon="el-icon-edit"></el-step>
        <el-step title="团队" icon="el-icon-edit"></el-step>
        <el-step title="市场" icon="el-icon-edit"></el-step>
        <el-step title="技术" icon="el-icon-edit"></el-step>
        <el-step title="财务情况" icon="el-icon-edit"></el-step>
        <el-step title="资金构成" icon="el-icon-edit"></el-step>
        <el-step title="商业模式" icon="el-icon-edit"></el-step>
      </el-steps>
      <!-- 基本信息 -->
      <div class="baseState" v-show="active === 0">
        <h1 class="h1_title">基础资料</h1>
        <div class="children_div">
          <el-form
            :model="dataObj.basicDtlRespVO"
            label-position="left"
            ref="baseForm"
            size="medium"
            label-width="130px"
            :rules="rules"
          >
            <div class="form_div">
              <el-form-item label="公司名称：" prop="companyName">
                <el-input
                  v-model="dataObj.basicDtlRespVO.companyName"
                  type="text"
                  placeholder="公司名称"
                  maxlength="25"
                ></el-input>
              </el-form-item>
              <el-form-item label="项目领域：" prop="involvedDomain">
                <el-select v-model="dataObj.basicDtlRespVO.involvedDomain" placeholder="请选择">
                  <el-option
                    v-for="item in initd.myPreferenceInitRespVO.domainList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="地址：">
                <el-select v-model="provinceInfo" @change="changeProvince" placeholder="请选择">
                  <el-option
                    v-for="item in province"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value+','+item.text"
                  ></el-option>
                </el-select>
                <span style="padding:0 20px">省</span>

                <el-select v-model="cityInfo" @change="changeCity" placeholder="请选择">
                  <el-option
                    v-for="item in city"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value+','+item.text"
                  ></el-option>
                </el-select>
                <span style="padding:0 20px">市</span>
              </el-form-item>
            </div>
            <div class="form_div1">
              <el-form-item label="详细地址：" prop="companyDetailedAddress">
                <el-input
                  v-model="dataObj.basicDtlRespVO.companyDetailedAddress"
                  type="text"
                  placeholder="详细地址"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </div>
            <div class="form_div">
              <el-form-item label="自然人股东：" prop="individualShareholder">
                <el-input
                  v-model="dataObj.basicDtlRespVO.individualShareholder"
                  type="text"
                  placeholder="自然人股东"
                  maxlength="15"
                ></el-input>
              </el-form-item>
              <el-form-item label="法人控股人：" prop="legalPersonHolding">
                <el-input
                  v-model="dataObj.basicDtlRespVO.legalPersonHolding"
                  type="text"
                  placeholder="法人控股人"
                  maxlength="15"
                ></el-input>
              </el-form-item>
            </div>
            <div class="form_div1">
              <el-form-item label="统一社会信用代码：" prop="socialCreditCode" label-width="166px">
                <el-input
                  v-model="dataObj.basicDtlRespVO.socialCreditCode"
                  type="text"
                  placeholder="统一社会信用代码"
                  maxlength="18"
                ></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="注册时间：" prop="registrationTime">
                <el-date-picker
                  v-model="dataObj.basicDtlRespVO.registrationTime"
                  value-format="yyyy-MM-dd"
                  :editable="false"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </div>
            <div class="form_div">
              <el-form-item label="联系人：" prop="linkName">
                <el-input
                  v-model="dataObj.basicDtlRespVO.linkName"
                  type="text"
                  placeholder="联系人"
                  maxlength="15"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系电话：" prop="linkTel">
                <el-input
                  v-model="dataObj.basicDtlRespVO.linkTel"
                  type="text"
                  placeholder="联系电话"
                  maxlength="11"
                ></el-input>
              </el-form-item>
            </div>
            <div class="form_div">
              <el-form-item label="员工人数：" prop="numberEmployees">
                <span class="spanInput">
                  <el-input
                    v-model="dataObj.basicDtlRespVO.numberEmployees"
                    type="text"
                    placeholder="员工人数"
                    maxlength="5"
                  >
                    <span slot="suffix">&nbsp;人&nbsp;</span>
                  </el-input>
                </span>
              </el-form-item>
              <el-form-item label="社保缴纳：" prop="socialSecurityPayment">
                <span class="spanInput">
                  <el-input
                    v-model="dataObj.basicDtlRespVO.socialSecurityPayment"
                    type="text"
                    placeholder="社保缴纳"
                    maxlength="5"
                  >
                    <span slot="suffix">&nbsp;人&nbsp;</span>
                  </el-input>
                </span>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="福利政策：" prop="welfarePolicyList">
                <!-- <el-select v-model="dataObj.basicDtlRespVO.welfarePolicy" placeholder="请选择">
                                    <el-option
                                        v-for="item in initData.welfarePolicyList"
                                        :key="item"
                                        :label="item"
                                        :value="item">
                                    </el-option>
                </el-select>-->
                <el-checkbox-group v-model="dataObj.basicDtlRespVO.welfarePolicyList">
                  <el-checkbox
                    :label="item"
                    v-for="(item,index) in initData.welfarePolicyList"
                    :key="index"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="融资轮次" prop="financeRoundList">
                <el-select v-model="dataObj.basicDtlRespVO.financeRound" placeholder="请选择经营状态">
                  <el-option
                    v-for="item in initData.financeRoundList"
                    :key="item.code"
                    :label="item.text"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="营业执照：" prop="businessLicense">
                <!-- <upload-img
                                    :type="{type:'businessLicense'}"
                                    :showImage="dataObj.basicDtlRespVO.businessLicense?$store.state.user.ip+dataObj.basicDtlRespVO.businessLicense:''"
                                    @uploadFuc="uploadFuc"
                />-->
                <upload-img
                  :type="{type:'businessLicense'}"
                  :more="true"
                  :maxNumber="2"
                  :imgList="businessLicenseList"
                  @uploadFuc="uploadFuc"
                  @delImg="delImg"
                />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="许可性文件：" prop="licenseDocument">
                <!-- <upload-img
                                    :type="{type:'licenseDocument'}"
                                    :showImage="dataObj.basicDtlRespVO.licenseDocument?$store.state.user.ip+dataObj.basicDtlRespVO.licenseDocument:''"
                                    @uploadFuc="uploadFuc"
                />-->
                <upload-img
                  :type="{type:'licenseDocument'}"
                  :more="true"
                  :maxNumber="2"
                  :imgList="licenseDocumentList"
                  @uploadFuc="uploadFuc"
                  @delImg="delImg"
                />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="发起人/出资人协议：" prop="investorAgreement" label-width="166px">
                <!-- <upload-img
                                    :type="{type:'investorAgreement'}"
                                    :showImage="dataObj.basicDtlRespVO.investorAgreement?$store.state.user.ip+dataObj.basicDtlRespVO.investorAgreement:''"
                                    @uploadFuc="uploadFuc"
                />-->
                <upload-img
                  :type="{type:'investorAgreement'}"
                  :more="true"
                  :maxNumber="2"
                  :imgList="investorAgreementList"
                  @uploadFuc="uploadFuc"
                  @delImg="delImg"
                />
              </el-form-item>
            </div>
            <div class="form_divv">
              <el-form-item label="下属公司：" class="item_title"></el-form-item>
              <el-form-item label-width="0" prop="subCompany">
                <table-list
                  :tableTitle="tableHeader.comHeader"
                  :tableData="dataObj.basicDtlRespVO.subCompany"
                  type="company"
                  @addDialogFuc="baseAddDialog"
                  @delFuc="delFuc"
                />
              </el-form-item>
            </div>
            <div class="form_divv">
              <el-form-item label="工商变更：" class="item_title"></el-form-item>
              <el-form-item label-width="0" prop="industrialChange">
                <table-list
                  :tableTitle="tableHeader.gongSHeader"
                  :tableData="dataObj.basicDtlRespVO.industrialChange"
                  type="gongShang"
                  @addDialogFuc="baseAddDialog"
                  @delFuc="delFuc"
                />
              </el-form-item>
            </div>
            <div class="form_divv">
              <el-form-item label="股权变更：" class="item_title"></el-form-item>
              <el-form-item label-width="0" prop="stockChange">
                <table-list
                  :tableTitle="tableHeader.sharesHeader"
                  :tableData="dataObj.basicDtlRespVO.stockChange"
                  type="shares"
                  @addDialogFuc="baseAddDialog"
                  @delFuc="delFuc"
                />
              </el-form-item>
            </div>
            <div class="form_divv">
              <el-form-item label="注册资本变更：" class="item_title"></el-form-item>
              <el-form-item label-width="0" prop="registAmtChange">
                <table-list
                  :tableTitle="tableHeader.regAmtHeader"
                  :tableData="dataObj.basicDtlRespVO.registAmtChange"
                  type="regAmt"
                  @addDialogFuc="baseAddDialog"
                  @delFuc="delFuc"
                />
              </el-form-item>
            </div>
            <div class="form_divv">
              <el-form-item label="法律诉讼：" class="item_title"></el-form-item>
              <el-form-item label-width="0" prop="lawAction">
                <table-list
                  :tableTitle="tableHeader.lawHeader"
                  :tableData="dataObj.basicDtlRespVO.lawAction"
                  type="law"
                  @addDialogFuc="baseAddDialog"
                  @delFuc="delFuc"
                />
              </el-form-item>
            </div>
            <div class="form_div1">
              <el-form-item label="预期的诉讼仲裁：" prop="litigationArbitration" label-width="140px">
                <el-input
                  v-model="dataObj.basicDtlRespVO.litigationArbitration"
                  type="text"
                  placeholder="预期的诉讼仲裁"
                ></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="公司架构：" prop="corporateArchitecture">
                <!-- <upload-img
                                    :type="{type:'corporateArchitecture'}"
                                    :showImage="dataObj.basicDtlRespVO.corporateArchitecture?$store.state.user.ip+dataObj.basicDtlRespVO.corporateArchitecture:''"
                                    @uploadFuc="uploadFuc"
                />-->
                <upload-img
                  :type="{type:'corporateArchitecture'}"
                  :more="true"
                  :maxNumber="2"
                  :imgList="corporateArchitectureList"
                  @uploadFuc="uploadFuc"
                  @delImg="delImg"
                />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="公司组织机构：" prop="companyOrganization">
                <!-- <upload-img
                                    :type="{type:'companyOrganization'}"
                                    :showImage="dataObj.basicDtlRespVO.companyOrganization?$store.state.user.ip+dataObj.basicDtlRespVO.companyOrganization:''"
                                    @uploadFuc="uploadFuc"
                />-->
                <upload-img
                  :type="{type:'companyOrganization'}"
                  :more="true"
                  :maxNumber="2"
                  :imgList="companyOrganizationList"
                  @uploadFuc="uploadFuc"
                  @delImg="delImg"
                />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="公司logo：" prop="comLogo">
                <!-- <upload-img
                                    :type="{type:'companyOrganization'}"
                                    :showImage="dataObj.basicDtlRespVO.companyOrganization?$store.state.user.ip+dataObj.basicDtlRespVO.companyOrganization:''"
                                    @uploadFuc="uploadFuc"
                />-->
                <upload-img
                  :type="{class:2000,type:'comLogo'}"
                  :showImage="dataObj.basicDtlRespVO.comLogo?$store.state.user.ip+dataObj.basicDtlRespVO.comLogo:''"
                  @uploadFuc="uploadFuc"
                  @delImg="delImg"
                />
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <!-- 团队 -->
      <div class="team" v-show="active === 1">
        <h1 class="h1_title">人员构成</h1>
        <div class="children_div">
          <div class="form_div">
            <!-- <upload-img
                        :showImage="dataObj.teamRespVO.teamStructureImg?$store.state.user.ip+dataObj.teamRespVO.teamStructureImg:''"
                        @uploadFuc="uploadFuc"
            :type="{type:'team'}"/>-->
            <upload-img
              :type="{type:'team'}"
              :more="true"
              :maxNumber="2"
              :imgList="teamStructureImgList"
              @uploadFuc="uploadFuc"
              @delImg="delImg"
            />
          </div>
        </div>
        <div class="fenge"></div>
        <h1 class="h3_title">履历分析</h1>
        <div class="children_div">
          <el-table
            :data="teamTable"
            show-summary
            border
            :header-row-style="{height:'33px'}"
            :row-style="{height:'50px'}"
            :cell-style="{padding:0}"
            :header-cell-style="{'background-color':'#fafafa'}"
            style="width: 666px"
          >
            <el-table-column
              align="center"
              :show-overflow-tooltip="true"
              v-for="(item,index) in teamHeader"
              :key="index"
              :label="item.label"
              :prop="item.prop"
            ></el-table-column>
          </el-table>
          <div class="add_btn">
            <el-button type="primary" size="medium" @click="teamDialog = true">增&nbsp;&nbsp;加</el-button>
            <el-button type="primary" size="medium" @click="delFuc('team')">删除表格</el-button>
          </div>
        </div>
      </div>
      <!-- 市场 -->
      <div class="market" v-show="active === 2">
        <el-form
          :model="dataObj.financingMarketReqVO"
          label-position="left"
          ref="marketForm"
          size="medium"
          label-width="130px"
          :rules="rules"
        >
          <h1 class="h1_title">市场分析</h1>
          <div class="children_div">
            <div class="form_div4">
              <el-form-item label="项目名称：" prop="projectName">
                <el-input
                  v-model="dataObj.financingMarketReqVO.projectName"
                  type="text"
                  placeholder="项目名称"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </div>
            <div class="form_div4">
              <el-form-item label="商业模式创新：" prop="bizModelCre">
                <el-select v-model="dataObj.financingMarketReqVO.bizModelCre" placeholder="请选择">
                  <el-option
                    v-for="item in initData.bizModelCreList"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form_div4">
              <el-form-item label="价格定位：" prop="priceLocation">
                <el-select v-model="dataObj.financingMarketReqVO.priceLocation" placeholder="请选择">
                  <el-option
                    v-for="item in initData.priceLocationList"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form_div4">
              <el-form-item label="产业链角色：" prop="industryChain">
                <el-select v-model="dataObj.financingMarketReqVO.industryChain" placeholder="请选择">
                  <el-option
                    v-for="item in initData.industryChainList"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form_div5">
              <el-form-item label="属性标签：" prop="attributeTagList">
                <el-checkbox-group v-model="dataObj.financingMarketReqVO.attributeTagList">
                  <el-checkbox
                    :label="item"
                    v-for="(item,index) in initData.attributeTagList"
                    :key="index"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <div class="form_div5">
              <el-form-item label="属性标签2：" prop="attributeTagTwoList">
                <el-checkbox-group v-model="dataObj.financingMarketReqVO.attributeTagTwoList">
                  <el-checkbox
                    :label="item"
                    v-for="(item,index) in initData.attributeTagList2"
                    :key="index"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <div class="form_div7">
              <el-form-item label="市场痛点：" prop="marketPainSpot">
                <el-input
                  v-model="dataObj.financingMarketReqVO.marketPainSpot"
                  type="text"
                  placeholder="市场痛点"
                  maxlength="30"
                ></el-input>
              </el-form-item>
              <el-form-item label="是否真实：" prop="isReal">
                <el-select v-model="dataObj.financingMarketReqVO.isReal" placeholder="请选择">
                  <el-option
                    v-for="item in initData.yesNoList"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form_div6">
              <el-form-item label="痛点真伪：" prop="painAuthenticity">
                <span class="spanInput">
                  <el-input
                    v-model="dataObj.financingMarketReqVO.painAuthenticity"
                    type="text"
                    placeholder="痛点真伪"
                  >
                    <span slot="suffix">&nbsp;分&nbsp;</span>
                  </el-input>
                </span>
              </el-form-item>
            </div>
            <div class="form_div6">
              <el-form-item label="单客户利用率：" prop="singleCuRate">
                <span class="spanInput">
                  <el-input
                    v-model="dataObj.financingMarketReqVO.singleCuRate"
                    type="text"
                    placeholder="单客户利用率"
                    maxlength="3"
                  >
                    <span slot="suffix">&nbsp;%&nbsp;</span>
                  </el-input>
                </span>
              </el-form-item>
            </div>
            <div class="form_div6">
              <el-form-item label="客户规模：" prop="cuScale">
                <span class="spanInput">
                  <el-input
                    v-model="dataObj.financingMarketReqVO.cuScale"
                    type="text"
                    placeholder="客户规模"
                    maxlength="10"
                  >
                    <span slot="suffix">&nbsp;人&nbsp;</span>
                  </el-input>
                </span>
              </el-form-item>
            </div>
          </div>

          <h1 class="h1_title">产业链条</h1>
          <div class="children_div">
            <h2 class="h2_title">1.粗加工</h2>
            <div class="children_div">
              <div class="form_div1">
                <el-form-item label="资本：" prop="roughMachiningCapital" label-width="66px">
                  <el-input
                    v-model="dataObj.financingMarketReqVO.roughMachiningCapital"
                    type="text"
                    placeholder="资本"
                    maxlength="80"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="form_div1">
                <el-form-item label="方法：" prop="methods" label-width="66px">
                  <el-input
                    v-model="dataObj.financingMarketReqVO.methods"
                    type="text"
                    placeholder="方法"
                    maxlength="80"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <h2 class="h2_title">2.深加工</h2>
            <div class="children_div">
              <div class="form_div1">
                <el-form-item label="技术：" prop="technology" label-width="66px">
                  <el-input
                    v-model="dataObj.financingMarketReqVO.technology"
                    type="text"
                    placeholder="技术"
                    maxlength="80"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <h2 class="h2_title">3.渠道商</h2>
            <div class="children_div">
              <div class="form_div1">
                <el-form-item label="强大的渠道能力：" prop="channelCapacity" label-width="133px">
                  <el-input
                    v-model="dataObj.financingMarketReqVO.channelCapacity"
                    type="text"
                    placeholder="强大的渠道能力"
                    maxlength="80"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="form_div1">
                <el-form-item label="影响力：" prop="influence" label-width="88px">
                  <el-input
                    v-model="dataObj.financingMarketReqVO.influence"
                    type="text"
                    placeholder="影响力"
                    maxlength="80"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="form_div1">
                <el-form-item label="资本：" prop="distributorsCapital" label-width="88px">
                  <el-input
                    v-model="dataObj.financingMarketReqVO.distributorsCapital"
                    type="text"
                    placeholder="资本"
                    maxlength="80"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <h2 class="h2_title">4.终端</h2>
            <div class="children_div">
              <el-form-item label="销售：" prop="terminalSales" label-width="66px">
                <el-select v-model="dataObj.financingMarketReqVO.terminalSales" placeholder="请选择">
                  <el-option
                    v-for="item in initData.terminalSalesList"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <h1 class="h1_title">市场保护</h1>
          <div class="children_div">
            <div class="form_div1">
              <el-form-item label="技术壁垒：" prop="protectTechnicalBarriers">
                <el-input
                  v-model="dataObj.financingMarketReqVO.protectTechnicalBarriers"
                  type="text"
                  placeholder="技术壁垒"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </div>
            <div class="form_div1">
              <el-form-item label="规模壁垒：" prop="scaleBarriers">
                <el-input
                  v-model="dataObj.financingMarketReqVO.scaleBarriers"
                  type="text"
                  placeholder="规模壁垒"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <h1 class="h1_title">市场切入</h1>
          <div class="children_div">
            <div>
              <el-form-item label="产品发布会：" prop="productLaunchList">
                <div
                  class="free_div"
                  v-for="(item,index) in dataObj.financingMarketReqVO.productLaunchList"
                  :key="index"
                >
                  <el-input
                    type="text"
                    v-model="dataObj.financingMarketReqVO.productLaunchList[index]"
                    maxlength="50"
                  >
                    <span slot="prefix">&nbsp;{{index+1}}</span>
                    <span
                      slot="suffix"
                      class="el-icon-close del_icon"
                      @click="delFuc('free',index)"
                    >&nbsp;</span>
                  </el-input>
                </div>
                <div style="width:388px;text-align:center">
                  <el-button type="primary" size="medium" @click="addFuc('free')">增&nbsp;&nbsp;加</el-button>
                </div>
              </el-form-item>
            </div>
            <div class="form_div1">
              <el-form-item label="会销：" prop="willPin">
                <el-input
                  v-model="dataObj.financingMarketReqVO.willPin"
                  type="text"
                  placeholder="会销"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="技术壁垒：" prop="cutTechnicalBarriersList">
                <el-checkbox-group v-model="dataObj.financingMarketReqVO.cutTechnicalBarriersList">
                  <el-checkbox
                    :label="item"
                    v-for="(item,index) in initData.cutTechnicalBarriersList"
                    :key="index"
                  ></el-checkbox>
                </el-checkbox-group>
                <div style="width:500px">
                  <el-input
                    type="textarea"
                    :rows="6"
                    placeholder="请输入内容"
                    v-model="dataObj.financingMarketReqVO.cutTechnicalBarriersContent"
                    maxlength="250"
                  ></el-input>
                </div>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="贸易壁垒：" prop="cutBarriersTradeList">
                <el-checkbox-group v-model="dataObj.financingMarketReqVO.cutBarriersTradeList">
                  <el-checkbox
                    :label="item"
                    v-for="(item,index) in initData.cutBarriersTradeList"
                    :key="index"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="营销手段：" prop="marketinglist">
                <el-checkbox-group v-model="dataObj.financingMarketReqVO.marketinglist">
                  <el-checkbox
                    :label="item"
                    v-for="(item,index) in initData.marketinglist"
                    :key="index"
                  ></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="传播效率：" class="item_title"></el-form-item>
              <table-obj
                :tableTitle="marketHeader"
                :tableData="cutTable"
                @addFuc="addFuc"
                @delFuc="delFuc"
                type="spread"
              />
            </div>
          </div>
          <h1 class="h1_title">市场运营</h1>
          <div class="children_div">
            <div>
              <el-form-item label="活跃度：" prop="operatingActive">
                <span class="spanInput">
                  <el-input
                    v-model="dataObj.financingMarketReqVO.operatingActive"
                    type="text"
                    placeholder="填写数字"
                    maxlength="5"
                  >
                    <span slot="suffix">&nbsp;人&nbsp;</span>
                  </el-input>
                </span>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="单个用户输出价值：" prop="userValue" label-width="166px">
                <span class="spanInput">
                  <el-input
                    v-model="dataObj.financingMarketReqVO.userValue"
                    type="text"
                    placeholder="单个用户输出价值"
                    maxlength="5"
                  ></el-input>
                </span>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="增量：" class="item_title"></el-form-item>
              <table-obj
                :tableTitle="marketHeader"
                :tableData="incrementalTable"
                @addFuc="addFuc"
                @delFuc="delFuc"
                type="add"
              />
            </div>
            <div>
              <el-form-item label="流失：" class="item_title"></el-form-item>
              <table-obj
                :tableTitle="marketHeader"
                :tableData="leaveTable"
                @addFuc="addFuc"
                @delFuc="delFuc"
                type="loss"
              />
            </div>
            <div>
              <el-form-item label="0-1-2-5-0：" prop="userNumber">
                <span class="spanInput">
                  <el-input
                    v-model="dataObj.financingMarketReqVO.userNumber"
                    type="text"
                    placeholder="填写数字"
                    maxlength="5"
                  ></el-input>
                </span>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="所处阶段：" prop="phase">
                <el-select v-model="dataObj.financingMarketReqVO.phase" placeholder="请选择">
                  <el-option
                    v-for="item in initData.phaseList"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="数据验收：" prop="dataAcceptance">
                <span class="spanInput">
                  <el-input
                    v-model="dataObj.financingMarketReqVO.dataAcceptance"
                    type="text"
                    placeholder="填写数字"
                    maxlength="3"
                  ></el-input>
                </span>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="方案合理性：" prop="programRationality">
                <span class="spanInput">
                  <el-input
                    v-model="dataObj.financingMarketReqVO.programRationality"
                    type="text"
                    placeholder="填0-100"
                    maxlength="3"
                  >
                    <span slot="suffix">&nbsp;人&nbsp;</span>
                  </el-input>
                </span>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <!-- 技术 -->
      <div class="technology" v-show="active === 3">
        <h1 class="h1_title">系统性创兴</h1>
        <div class="children_div">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            maxlength="2000"
            v-model="dataObj.technologyReqVO.systematicInnovation"
          ></el-input>
        </div>
        <h1 class="h1_title">技术迭代</h1>
        <div class="children_div">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            maxlength="2000"
            v-model="dataObj.technologyReqVO.technologyIteration"
          ></el-input>
        </div>
      </div>
      <!-- 财务情况 -->
      <div class="financialState" v-show="active === 4">
        <el-form
          :model="dataObj.financialSituationReqVO"
          label-position="left"
          ref="financialForm"
          size="medium"
          label-width="0"
        >
          <h1 class="h1_title">资产负载表</h1>
          <el-form-item prop="balanceSheetImg">
            <div class="children_div">
              <!-- <upload-img
                                :showImage="dataObj.financialSituationReqVO.balanceSheetImg?$store.state.user.ip+dataObj.financialSituationReqVO.balanceSheetImg:''"
                                @uploadFuc="uploadFuc"
                                :type="{type:'balanceSheet'}"
              />-->
              <upload-img
                :type="{type:'balanceSheet'}"
                :more="true"
                :maxNumber="2"
                :imgList="balanceSheetImgList"
                @uploadFuc="uploadFuc"
                @delImg="delImg"
              />
            </div>
          </el-form-item>
          <h1 class="h1_title">利润表</h1>
          <el-form-item prop="incomeStatementImg">
            <div class="children_div">
              <!-- <upload-img
                                :showImage="dataObj.financialSituationReqVO.incomeStatementImg?$store.state.user.ip+dataObj.financialSituationReqVO.incomeStatementImg:''"
                                @uploadFuc="uploadFuc"
                                :type="{type:'incomeStatement'}"
              />-->
              <upload-img
                :type="{type:'incomeStatement'}"
                :more="true"
                :maxNumber="2"
                :imgList="incomeStatementImgList"
                @uploadFuc="uploadFuc"
                @delImg="delImg"
              />
            </div>
          </el-form-item>
          <h1 class="h1_title">现金流表</h1>
          <el-form-item prop="cashFlowImg">
            <div class="children_div">
              <!-- <upload-img
                                :showImage="dataObj.financialSituationReqVO.cashFlowImg?$store.state.user.ip+dataObj.financialSituationReqVO.cashFlowImg:''"
                                @uploadFuc="uploadFuc"
                                :type="{type:'cashFlow'}"
              />-->
              <upload-img
                :type="{type:'cashFlow'}"
                :more="true"
                :maxNumber="2"
                :imgList="cashFlowImgList"
                @uploadFuc="uploadFuc"
                @delImg="delImg"
              />
            </div>
          </el-form-item>
          <h1 class="h1_title">财务报表</h1>
          <el-form-item prop="financialStatementsImg">
            <div class="children_div">
              <!-- <upload-img
                                :showImage="dataObj.financialSituationReqVO.financialStatementsImg?$store.state.user.ip+dataObj.financialSituationReqVO.financialStatementsImg:''"
                                @uploadFuc="uploadFuc"
                                :type="{type:'financialStatements'}"
              />-->
              <upload-img
                :type="{type:'financialStatements'}"
                :more="true"
                :maxNumber="2"
                :imgList="financialStatementsImgList"
                @uploadFuc="uploadFuc"
                @delImg="delImg"
              />
            </div>
          </el-form-item>
        </el-form>
      </div>
      <!-- 资金构成 -->
      <div class="capitalConstitute" v-show="active === 5">
        <el-form
          :model="dataObj.compositionReqVO"
          ref="capitalForm"
          label-width="111px"
          size="medium"
          label-position="left"
        >
          <h1 class="h1_title">基础资本框架</h1>
          <div class="children_div">
            <el-form-item prop="basicCapitalFramework" label-width="0">
              <!-- <upload-img
                                :showImage="dataObj.compositionReqVO.basicCapitalFramework?$store.state.user.ip+dataObj.compositionReqVO.basicCapitalFramework:''"
                                @uploadFuc="uploadFuc"
                                :type="{type:'bas'}"
              />-->
              <upload-img
                :type="{type:'bas'}"
                :more="true"
                :maxNumber="2"
                :imgList="basicCapitalFrameworkList"
                @uploadFuc="uploadFuc"
                @delImg="delImg"
              />
            </el-form-item>
          </div>
          <h1 class="h1_title">未来股东计划</h1>
          <el-form-item prop="futureHolderPlan" label-width="0">
            <table-list
              :tableTitle="capitalHeader"
              :tableData="dataObj.compositionReqVO.futureHolderPlan"
              type="financial"
              @addDialogFuc="baseAddDialog"
              @delFuc="delFuc"
            />
          </el-form-item>
          <h1 class="h1_title">资本库</h1>
          <div class="children_div">
            <el-form-item label="1.资本库：" class="item_title"></el-form-item>
            <div class="form_div1">
              <el-form-item prop="capitalLibrary" label-width="0">
                <el-input
                  type="textarea"
                  :rows="6"
                  placeholder="请输入内容"
                  maxlength="500"
                  v-model="dataObj.compositionReqVO.capitalLibrary"
                ></el-input>
              </el-form-item>
            </div>
            <el-form-item label="2.董秘：" class="item_title"></el-form-item>
            <div class="form_div1">
              <el-form-item prop="chairmanSecretary" label-width="0">
                <el-input
                  type="textarea"
                  :rows="6"
                  placeholder="请输入内容"
                  maxlength="500"
                  v-model="dataObj.compositionReqVO.chairmanSecretary"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <h1 class="h1_title">财务指标</h1>
          <div class="children_div">
            <el-form-item label="1.财务节点：" class="item_title"></el-form-item>
            <div>
              <el-form-item prop="financialNode" label-width="0">
                <!-- <upload-img
                                    :showImage="dataObj.compositionReqVO.financialNode?$store.state.user.ip+dataObj.compositionReqVO.financialNode:''"
                                    @uploadFuc="uploadFuc"
                                    :type="{type:'fin'}"
                />-->
                <upload-img
                  :type="{type:'fin'}"
                  :more="true"
                  :maxNumber="2"
                  :imgList="financialNodeList"
                  @uploadFuc="uploadFuc"
                  @delImg="delImg"
                />
              </el-form-item>
            </div>
            <el-form-item label="2.问题节点：" class="item_title"></el-form-item>
            <div class="form_div1">
              <el-form-item prop="problemNode" label-width="0">
                <el-input
                  type="textarea"
                  :rows="6"
                  placeholder="请输入内容"
                  v-model="dataObj.compositionReqVO.problemNode"
                ></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <!-- 商业模式 -->
      <div class="businessModel" v-show="active === 6">
        <el-form :model="dataObj.bizModelReqVO" ref="bizForm">
          <h1 class="h1_title">商业伦理</h1>
          <el-form-item prop="businessEthics">
            <div class="children_div">
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                maxlength="500"
                v-model="dataObj.bizModelReqVO.businessEthics"
              ></el-input>
            </div>
          </el-form-item>
          <h1 class="h1_title">商业规律</h1>
          <el-form-item prop="commercialLaw">
            <div class="children_div">
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                maxlength="500"
                v-model="dataObj.bizModelReqVO.commercialLaw"
              ></el-input>
            </div>
          </el-form-item>
          <h1 class="h1_title">客观规律</h1>
          <el-form-item prop="objectiveLaws">
            <div class="children_div">
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                maxlength="500"
                v-model="dataObj.bizModelReqVO.objectiveLaws"
              ></el-input>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <div class="prev_next">
        <el-button size="small" @click="prevFuc">上一步</el-button>
        <el-button size="small" @click="nextFuc">下一步</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click="editFuc('baseForm')">修&nbsp;改</el-button>
        <!-- <el-button size="medium" @click="resetForm">重置当前页面</el-button> -->
      </span>
    </el-dialog>

    <!-- Dialog模块 -->
    <base-dialog ref="addDialog" @saveFuc="saveFuc"/>
    <!-- 团队Dialog -->
    <el-dialog
      title="增加履历"
      :visible.sync="teamDialog"
      @close="closeFuc('team')"
      width="600px"
      center
    >
      <el-form :model="fullObj" ref="full" label-width="133px" size="medium">
        <h1 class="h1_title">全日制</h1>
        <div class="form_div">
          <el-form-item label="博士：" prop="doctor">
            <el-input v-model="fullObj.doctor" type="text" placeholder="博士">
              <span slot="suffix">&nbsp;人&nbsp;</span>
            </el-input>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="硕士：" prop="master">
            <el-input v-model="fullObj.master" type="text" placeholder="硕士">
              <span slot="suffix">&nbsp;人&nbsp;</span>
            </el-input>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="本科：" prop="bachelor">
            <el-input v-model="fullObj.bachelor" type="text" placeholder="本科">
              <span slot="suffix">&nbsp;人&nbsp;</span>
            </el-input>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="专科：" prop="junior">
            <el-input v-model="fullObj.junior" type="text" placeholder="专科">
              <span slot="suffix">&nbsp;人&nbsp;</span>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
      <el-form :model="partObj" ref="part" label-width="133px" size="medium">
        <h1 class="h1_title">非全日制</h1>
        <div class="form_div">
          <el-form-item label="博士：" prop="doctor">
            <el-input v-model="partObj.doctor" type="text" placeholder="博士">
              <span slot="suffix">&nbsp;人&nbsp;</span>
            </el-input>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="硕士：" prop="master">
            <el-input v-model="partObj.master" type="text" placeholder="硕士">
              <span slot="suffix">&nbsp;人&nbsp;</span>
            </el-input>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="本科：" prop="bachelor">
            <el-input v-model="partObj.bachelor" type="text" placeholder="本科">
              <span slot="suffix">&nbsp;人&nbsp;</span>
            </el-input>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="专科：" prop="junior">
            <el-input v-model="partObj.junior" type="text" placeholder="专科">
              <span slot="suffix">&nbsp;人&nbsp;</span>
            </el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveFuc('team')" size="medium">保&nbsp;&nbsp;存</el-button>
        <el-button type="primary" @click="resetFuc('team')" size="medium">重&nbsp;&nbsp;置</el-button>
      </span>
    </el-dialog>
    <!-- 市场dialog -->
    <el-dialog
      :title="marketDialogTitle"
      :visible.sync="marketDialog"
      @close="closeFuc('market')"
      width="600px"
      center
    >
      <el-form ref="dateForm" :model="dateObj" label-width="111px">
        <div>
          <el-form-item label="日：" prop="day">
            <el-input v-model="dateObj.day" type="text" placeholder="日"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="周：" prop="week">
            <el-input v-model="dateObj.week" type="text" placeholder="周"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="月：" prop="month">
            <el-input v-model="dateObj.month" type="text" placeholder="月"></el-input>
          </el-form-item>
        </div>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveFuc('market')" size="medium">保&nbsp;&nbsp;存</el-button>
        <el-button type="primary" @click="resetFuc('market')" size="medium">重&nbsp;&nbsp;置</el-button>
      </span>
    </el-dialog>
    <!-- 资金构成dialog -->
    <el-dialog
      title="未来股东计划"
      :visible.sync="capitalDialog"
      @close="closeFuc('financial')"
      width="600px"
      center
    >
      <el-form ref="futureForm" :model="futureObj" label-width="111px">
        <div>
          <el-form-item label="股权占比：" prop="equityRatio">
            <el-input v-model="futureObj.equityRatio" type="text" placeholder="股权占比"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="预计融资金额：" prop="financingAmount">
            <el-input v-model="futureObj.financingAmount" type="text" placeholder="预计融资金额"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="融资时间：" prop="financingTime">
            <el-date-picker
              v-model="futureObj.financingTime"
              value-format="yyyy-MM-dd"
              :editable="false"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveFuc('financial')" size="medium">保&nbsp;&nbsp;存</el-button>
        <el-button type="primary" @click="resetFuc('financial')" size="medium">重&nbsp;&nbsp;置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { provinceList, cityList } from "@/files/js/areaData";
import UploadImg from "@/components/UploadImg/uploadImg";
import { upload, modify } from "@/api";
import {
  baseHeader,
  teamHeader,
  marketHeader,
  capitalHeader
} from "@/components/EnterpriseData/table/tableHeader";
import TableList from "@/components/EnterpriseData/table/table";
import TableObj from "@/components/EnterpriseData/table/tableObj";
import BaseDialog from "@/components/EnterpriseData/dialog/baseDialog";
import { enterpriseList } from "@/files/js/initData";
import { cloneObj } from "@/files/js/cloneObj";
import {
  isvalidPhone,
  isvalidNum5,
  isvalidOrgCode,
  isvalidNumN,
  isPercentage
} from "@/files/js/rules";
var validNum5 = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入5位以下数字"));
  } else if (!isvalidNum5(value)) {
    callback(new Error("请输入正确的格式！"));
  } else {
    callback();
  }
};
var validNumN = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入10位以下的数字"));
  } else if (!isvalidNumN(value)) {
    callback(new Error("请输入正确的格式！"));
  } else {
    callback();
  }
};
var Percentage = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入不超过3位的数字"));
  } else if (!isPercentage(value)) {
    callback(new Error("请输入正确的格式！"));
  } else {
    callback();
  }
};
var validOrgCode = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入18位 数字或者大写字母"));
  } else if (!isvalidOrgCode(value)) {
    callback(new Error("请输入正确的格式！"));
  } else {
    callback();
  }
};
var validProjectName = (rule, value, callback) => {
  if (!value) {
    callback(new Error("该输入框不能为空！"));
  } else {
    callback();
  }
};
var validImg = (rule, value, callback) => {
  if (!value) {
    callback(new Error("该图片为必填！"));
  } else {
    callback();
  }
};
var validPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入手机号码！"));
  } else if (!isvalidPhone(value)) {
    callback(new Error("请输入正确的11位手机号码！"));
  } else {
    callback();
  }
};
var validConstruction = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请选择！"));
  } else {
    callback();
  }
};
export default {
  components: {
    UploadImg,
    TableList,
    TableObj,
    BaseDialog
  },
  data() {
    return {
      active: 0,
      initd: {
        myPreferenceInitRespVO: {},
        pubProjectBaseInitRespVO: {},
        pubProjectAInitRespVO: {},
        pubProjectBInitRespVO: {},
        pubProjectCInitRespVO: {},
        tagInfList: []
      },
      marketDialogTitle: "",
      marketDialogType: "",

      showDialog: false,
      teamDialog: false, //团队小Dialog
      marketDialog: false, //市场小Dialog
      capitalDialog: false, //资金小Dialog

      initData: enterpriseList, //初始下拉框数据

      tableHeader: baseHeader, //表头名字
      teamHeader,
      marketHeader,
      capitalHeader,

      businessLicenseList: [], //营业执照图片
      licenseDocumentList: [], //许可性文件图片
      investorAgreementList: [], //发起人 出资人协议
      corporateArchitectureList: [], //公司架构图片
      companyOrganizationList: [], //公司组织机构图片

      teamStructureImgList: [], //人员构成

      balanceSheetImgList: [], //资产负债
      incomeStatementImgList: [], //利润表
      cashFlowImgList: [], //现金流表
      financialStatementsImgList: [], //财务报表

      basicCapitalFrameworkList: [], //基础资本框架图
      financialNodeList: [], //财务节点

      dataObj: {
        basicDtlRespVO: {
          involvedDomain: "", //项目领域
          companyName: "", //公司名称
          companyProvince: "", //省
          companyProvinceCode: "", //省code
          companyCity: "", //市
          companyCityCode: "", //市code
          companyDetailedAddress: "", //详细地址
          socialCreditCode: "", //统一社会信用代码
          individualShareholder: "", //自然人股东
          legalPersonHolding: "", //法人控股人
          registrationTime: "", //注册时间
          linkName: "", //联系人
          linkTel: "", //联系电话
          numberEmployees: "", //职工人数
          socialSecurityPayment: "", //社保缴纳
          welfarePolicy: "", //福利政策
          welfarePolicyList: [], //福利正常集合
          businessLicense: [], //营业执照
          licenseDocument: [], //许可性文件
          investorAgreement: [], //发起人 出资人协议
          subCompany: [], //下属公司
          industrialChange: [], //工商变更
          stockChange: [], //股权变更
          registAmtChange: [], //注册资本变更
          lawAction: [], //法律诉讼
          litigationArbitration: "", //预期的诉讼仲裁
          corporateArchitecture: [], //公司架构
          companyOrganization: [], //公司组织机构
          comLogo: "", //公司logo
          financeRound: "" //融资伦次
        },
        teamRespVO: {
          teamStructureImg: [] //人员构成图片
        },
        financingMarketReqVO: {
          projectName: "", //项目名称
          bizModelCre: "", //商业模式创新
          priceLocation: "", //价格定位
          industryChain: "", //产业链角色
          attributeTagList: [], //属性标签
          attributeTagTwoList: [], //属性标签2
          marketPainSpot: "", //市场痛点
          isReal: "", //痛点是否真是
          painAuthenticity: "", //痛点真伪
          singleCuRate: "", //单用户利用率
          cuScale: "", //客户规模
          roughMachiningCapital: "", //资本
          methods: "", //方法
          technology: "", //技术
          channelCapacity: "", //强大的渠道能力
          influence: "", //影响力
          distributorsCapital: "", //渠道商资本
          terminalSales: "", //终端销售
          protectTechnicalBarriers: "", //市场保护 技术壁垒
          scaleBarriers: "", //市场保护  规模壁垒
          productLaunchList: [""], //产品发布会集合
          willPin: "", //会销
          cutTechnicalBarriersList: [], //市场切入技术壁垒
          cutTechnicalBarriersContent: "", //市场切入技术壁垒描述
          cutBarriersTradeList: [], //市场切入贸易壁垒
          marketinglist: [], //营销手段
          //传播效率
          cutDays: "", //天
          cutWeeks: "", //周
          cutMonth: "", //月
          //增量
          incrementalDays: "", //天
          incrementalWeeks: "", //周
          incrementalMonth: "", //月
          //流失
          leaveDays: "", //天
          leaveWeeks: "", //周
          leaveMonth: "", //月

          operatingActive: "", //活跃度
          userValue: "", //单个用户输出价值
          userNumber: "", //0-1-2-5-0
          phase: "", //所处阶段
          dataAcceptance: "", //数据验收
          programRationality: "" //方案合理性
        },
        technologyReqVO: {
          systematicInnovation: "", //系统性创兴
          technologyIteration: "" //技术迭代
        },
        financialSituationReqVO: {
          balanceSheetImg: [], //资产负债
          incomeStatementImg: [], //利润表
          cashFlowImg: [], //现金流表
          financialStatementsImg: [] //财务报表
        },
        compositionReqVO: {
          basicCapitalFramework: [], //基础资本框架图
          futureHolderPlan: [], //股东计划
          capitalLibrary: "", //资本库
          chairmanSecretary: "", //董秘
          financialNode: [], //财务节点
          problemNode: "" //问题节点
        },
        bizModelReqVO: {
          businessEthics: "", //商业伦理
          commercialLaw: "", //商业规律
          objectiveLaws: "" //客观规律
        }
      },

      //团队
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
      //市场
      cutTable: [],
      incrementalTable: [],
      leaveTable: [],
      dateObj: {
        name: "",
        day: "",
        week: "",
        month: ""
      },
      //资金构成
      futureObj: {
        equityRatio: "",
        financingAmount: "",
        financingTime: ""
      },
      //省 市下拉框
      province: provinceList,
      city: [],
      provinceInfo: "",
      cityInfo: "",
      rules: {
        numberEmployees: [
          { hide: true, trigger: "blur", validator: validNum5 }
        ],
        socialSecurityPayment: [
          { hide: true, trigger: "blur", validator: validNum5 }
        ],
        litigationArbitration: [
          { hide: true, trigger: "blur", validator: validProjectName }
        ],
        companyName: [
          { hide: true, trigger: "blur", validator: validProjectName }
        ],
        involvedDomain: [
          { hide: true, trigger: "change", validator: validConstruction }
        ],
        financeRound: [
          { hide: true, trigger: "change", validator: validConstruction }
        ],
        companyDetailedAddress: [
          { hide: true, trigger: "blur", validator: validProjectName }
        ],
        legalPersonHolding: [
          { hide: true, trigger: "blur", validator: validProjectName }
        ],
        individualShareholder: [
          { hide: true, trigger: "blur", validator: validProjectName }
        ],
        socialCreditCode: [
          { hide: true, trigger: "blur", validator: validOrgCode }
        ],
        registrationTime: [
          { hide: true, trigger: "change", validator: validConstruction }
        ],
        linkName: [
          { hide: true, trigger: "blur", validator: validProjectName }
        ],
        linkTel: [{ hide: true, trigger: "blur", validator: validPhone }],
        comLogo: [{ hide: true, trigger: "blur", validator: validImg }],
        projectName: [
          { hide: true, trigger: "blur", validator: validProjectName }
        ],
        bizModelCre: [
          { hide: true, trigger: "change", validator: validConstruction }
        ],
        bizModelCre: [
          { hide: true, trigger: "change", validator: validConstruction }
        ],
        priceLocation: [
          { hide: true, trigger: "change", validator: validConstruction }
        ],
        industryChain: [
          { hide: true, trigger: "change", validator: validConstruction }
        ],
        // painAuthenticity: [
        //   { hide: true, trigger: "blur", validator: validProjectName }
        // ],
        // marketPainSpot: [
        //   { hide: true, trigger: "blur", validator: validProjectName }
        // ],
        // isReal: [
        //   { hide: true, trigger: "change", validator: validConstruction }
        // ],
        // singleCuRate: [{ hide: true, trigger: "blur", validator: Percentage }],
        // cuScale: [{ hide: true, trigger: "blur", validator: validNumN }]
      }
    };
  },
  methods: {
    down(baseForm) {
      this.$refs[baseForm].resetFields();
    },
    //修改函数
    editFuc(baseForm) {
      // console.log(1)
      this.$refs[baseForm].validate(valid => {
        if (valid) {
         
            this.dataObj.basicReqVO = cloneObj(this.dataObj.basicDtlRespVO);
            this.dataObj.teamReqVO = cloneObj(this.dataObj.teamRespVO);
            modify(this.dataObj).then(res => {
              if (res && res.errorCode === 0) {
                this.showDialog = false;
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.$emit("initWeb");
              }
            });
          
        } else {
          return false;
        }
      });
    },
    //修改Dialog打开
    editDialogFuc(data, init, type) {
      this.initd = init;
      this.showDialog = true;
      this.active = 0;
      this.dataObj = cloneObj(data);
      console.log(this.dataObj);
      //第一步 地区
      this.provinceInfo = this.dataObj.basicDtlRespVO.companyProvince;
      this.cityInfo = this.dataObj.basicDtlRespVO.companyCity;
      //图片
      this.businessLicenseList = [
        ...this.dataObj.basicDtlRespVO.businessLicense
      ];
      this.licenseDocumentList = [
        ...this.dataObj.basicDtlRespVO.licenseDocument
      ];
      this.investorAgreementList = [
        ...this.dataObj.basicDtlRespVO.investorAgreement
      ];
      this.corporateArchitectureList = [
        ...this.dataObj.basicDtlRespVO.corporateArchitecture
      ];
      this.companyOrganizationList = [
        ...this.dataObj.basicDtlRespVO.companyOrganization
      ];

      //第二步 履历分析
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
        //  console.log(this.teamTable)
      }
      //图片
      this.teamStructureImgList = [...this.dataObj.teamRespVO.teamStructureImg];

      //第三步 传播效率  增量 流失
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

      //第五步 图片
      this.balanceSheetImgList = [
        ...this.dataObj.financialSituationReqVO.balanceSheetImg
      ];
      this.incomeStatementImgList = [
        ...this.dataObj.financialSituationReqVO.incomeStatementImg
      ];
      this.cashFlowImgList = [
        ...this.dataObj.financialSituationReqVO.cashFlowImg
      ];
      this.financialStatementsImgList = [
        ...this.dataObj.financialSituationReqVO.financialStatementsImg
      ];
      //第六步 图片
      this.basicCapitalFrameworkList = [
        ...this.dataObj.compositionReqVO.basicCapitalFramework
      ];
      this.financialNodeList = [...this.dataObj.compositionReqVO.financialNode];
    },
    //基本信息表格添加Dialog
    baseAddDialog(type) {
      if (type === "financial") {
        this.capitalDialog = true;
        return;
      }
      this.$refs.addDialog.showDialogFuc(type);
    },
    //表格添加dialog  ---除去基本信息表 因为基本里面的表格单独封装
    addFuc(type) {
      switch (type) {
        case "free":
          this.dataObj.financingMarketReqVO.productLaunchList.push("");
          break;
        case "spread":
          this.marketDialogType = type;
          this.marketDialogTitle = "传播效率";
          this.marketDialog = true;
          break;
        case "add":
          this.marketDialogType = type;
          this.marketDialogTitle = "增量";
          this.marketDialog = true;
          break;
        case "loss":
          this.marketDialogType = type;
          this.marketDialogTitle = "流失";
          this.marketDialog = true;
          break;
      }
    },
    //表格删除dialog
    delFuc(type, index) {
      switch (type) {
        case "companyC":
          this.dataObj.basicDtlRespVO.subCompany.splice(index, 1);
          break;
        case "gongSC":
          this.dataObj.basicDtlRespVO.industrialChange.splice(index, 1);
          break;
        case "sharesC":
          this.dataObj.basicDtlRespVO.stockChange.splice(index, 1);
          break;
        case "regAmtC":
          this.dataObj.basicDtlRespVO.registAmtChange.splice(index, 1);
          break;
        case "lawC":
          this.dataObj.basicDtlRespVO.lawAction.splice(index, 1);
          break;
        case "team":
          this.teamTable = [];
          this.dataObj.teamRespVO.fullTimeDoctor = "";
          this.dataObj.teamRespVO.fullTimeMaster = "";
          this.dataObj.teamRespVO.fullTimeBachelor = "";
          this.dataObj.teamRespVO.fullTimeJunior = "";
          this.dataObj.teamRespVO.partTimeDoctor = "";
          this.dataObj.teamRespVO.partTimeMaster = "";
          this.dataObj.teamRespVO.partTimeBachelor = "";
          this.dataObj.teamRespVO.partTimeJunior = "";
          break;
        case "free":
          if (this.dataObj.financingMarketReqVO.productLaunchList.length > 1) {
            this.dataObj.financingMarketReqVO.productLaunchList.splice(
              index,
              1
            );
          } else {
            this.$message({
              message: "至少有一条输入框",
              type: "warning"
            });
          }
          break;
        case "spread":
          this.dataObj.financingMarketReqVO.cutDays = "";
          this.dataObj.financingMarketReqVO.cutWeeks = "";
          this.dataObj.financingMarketReqVO.cutMonth = "";
          this.cutTable = [];
          break;
        case "add":
          this.dataObj.financingMarketReqVO.incrementalDays = "";
          this.dataObj.financingMarketReqVO.incrementalWeeks = "";
          this.dataObj.financingMarketReqVO.incrementalMonth = "";
          this.incrementalTable = [];
          break;
        case "loss":
          this.dataObj.financingMarketReqVO.leaveDays = "";
          this.dataObj.financingMarketReqVO.leaveWeeks = "";
          this.dataObj.financingMarketReqVO.leaveMonth = "";
          this.leaveTable = [];
          break;
        case "capitalC":
          this.dataObj.compositionReqVO.futureHolderPlan.splice(index, 1);
          break;
      }
    },
    //dialog保存按钮
    saveFuc(type, data) {
      switch (type) {
        case "company":
          this.dataObj.basicDtlRespVO.subCompany.push(data);
          break;
        case "gongShang":
          this.dataObj.basicDtlRespVO.industrialChange.push(data);
          break;
        case "shares":
          this.dataObj.basicDtlRespVO.stockChange.push(data);
          break;
        case "regAmt":
          this.dataObj.basicDtlRespVO.registAmtChange.push(data);
          break;
        case "law":
          this.dataObj.basicDtlRespVO.lawAction.push(data);
          break;
        case "team":
          this.teamTable = [];
          this.teamTable.push(cloneObj(this.fullObj));
          this.teamTable.push(cloneObj(this.partObj));
          this.dataObj.teamRespVO.fullTimeDoctor = this.teamTable[0].doctor;
          this.dataObj.teamRespVO.fullTimeMaster = this.teamTable[0].master;
          this.dataObj.teamRespVO.fullTimeBachelor = this.teamTable[0].bachelor;
          this.dataObj.teamRespVO.fullTimeJunior = this.teamTable[0].junior;
          this.dataObj.teamRespVO.partTimeDoctor = this.teamTable[1].doctor;
          this.dataObj.teamRespVO.partTimeMaster = this.teamTable[1].master;
          this.dataObj.teamRespVO.partTimeBachelor = this.teamTable[1].bachelor;
          this.dataObj.teamRespVO.partTimeJunior = this.teamTable[1].junior;
          this.closeFuc("team");
          break;
        case "market":
          switch (this.marketDialogType) {
            case "spread":
              this.cutTable = [];
              this.dataObj.financingMarketReqVO.cutDays = this.dateObj.day;
              this.dataObj.financingMarketReqVO.cutWeeks = this.dateObj.week;
              this.dataObj.financingMarketReqVO.cutMonth = this.dateObj.month;
              this.dateObj.name = "%";
              this.cutTable.push(cloneObj(this.dateObj));
              break;
            case "add":
              this.incrementalTable = [];
              this.dataObj.financingMarketReqVO.incrementalDays = this.dateObj.day;
              this.dataObj.financingMarketReqVO.incrementalWeeks = this.dateObj.week;
              this.dataObj.financingMarketReqVO.incrementalMonth = this.dateObj.month;
              this.dateObj.name = "人数";
              this.incrementalTable.push(cloneObj(this.dateObj));
              break;
            case "loss":
              this.leaveTable = [];
              this.dataObj.financingMarketReqVO.leaveDays = this.dateObj.day;
              this.dataObj.financingMarketReqVO.leaveWeeks = this.dateObj.week;
              this.dataObj.financingMarketReqVO.leaveMonth = this.dateObj.month;
              this.dateObj.name = "人数";
              this.leaveTable.push(cloneObj(this.dateObj));
              break;
          }
          this.closeFuc("market");
          break;
        case "financial":
          this.dataObj.compositionReqVO.futureHolderPlan.push(
            cloneObj(this.futureObj)
          );
          this.closeFuc("financial");
          break;
      }
    },
    //dialog关闭
    closeFuc(type) {
      switch (type) {
        case "team":
          this.teamDialog = false;
          this.resetFuc("team");
          break;
        case "market":
          this.marketDialog = false;
          this.resetFuc("market");
          break;
        case "financial":
          this.capitalDialog = false;
          this.resetFuc("financial");
          break;
      }
    },
    //dialog重置
    resetFuc(type) {
      switch (type) {
        case "team":
          this.$refs.full.resetFields();
          this.$refs.part.resetFields();
          break;
        case "market":
          this.$refs.dateForm.resetFields();
          break;
        case "financial":
          this.$refs.futureForm.resetFields();
          break;
      }
    },
    //修改各个页面重置
    resetForm() {
      switch (this.active) {
        case 0:
          this.provinceInfo = "";
          this.cityInfo = "";
          this.dataObj.basicDtlRespVO.companyProvince = "";
          this.dataObj.basicDtlRespVO.companyProvinceCode = "";
          this.dataObj.basicDtlRespVO.companyCity = "";
          this.dataObj.basicDtlRespVO.companyCityCode = "";
          this.$refs.baseForm.resetFields();
          break;
        case 1:
          this.teamTable = [];
          this.dataObj.teamRespVO.teamStructureImg = "";
          break;
        case 2:
          this.cutTable = [];
          this.incrementalTable = [];
          this.leaveTable = [];

          this.dataObj.financingMarketReqVO.cutDays = "";
          this.dataObj.financingMarketReqVO.cutWeeks = "";
          this.dataObj.financingMarketReqVO.cutMonth = "";

          this.dataObj.financingMarketReqVO.incrementalDays = "";
          this.dataObj.financingMarketReqVO.incrementalWeeks = "";
          this.dataObj.financingMarketReqVO.incrementalMonth = "";

          this.dataObj.financingMarketReqVO.leaveDays = "";
          this.dataObj.financingMarketReqVO.leaveWeeks = "";
          this.dataObj.financingMarketReqVO.leaveMonth = "";
          this.$refs.marketForm.resetFields();
          break;
        case 3:
          this.dataObj.technologyReqVO.systematicInnovation = "";
          this.dataObj.technologyReqVO.technologyIteration = "";
          break;
        case 4:
          this.$refs.financialForm.resetFields();
          break;
        case 5:
          this.$refs.capitalForm.resetFields();
          break;
        case 6:
          this.$refs.bizForm.resetFields();
          break;
      }
    },
    uploadFuc(data, more, type) {
      // console.log(data,more,type)
      upload(data).then(res => {
        if (res && res.errorCode === 0) {
          switch (type.type) {
            case "businessLicense":
              // this.dataObj.basicDtlRespVO.businessLicense = res.body.fileId
              this.businessLicenseList.push(res.body.filePath);
              this.dataObj.basicDtlRespVO.businessLicense.push(res.body.fileId);
              break;
            case "licenseDocument":
              // this.dataObj.basicDtlRespVO.licenseDocument = res.body.fileId
              this.licenseDocumentList.push(res.body.filePath);
              this.dataObj.basicDtlRespVO.licenseDocument.push(res.body.fileId);
              break;
            case "investorAgreement":
              // this.dataObj.basicDtlRespVO.investorAgreement = res.body.fileId
              this.investorAgreementList.push(res.body.filePath);
              this.dataObj.basicDtlRespVO.investorAgreement.push(
                res.body.fileId
              );
              break;
            case "corporateArchitecture":
              // this.dataObj.basicDtlRespVO.corporateArchitecture = res.body.fileId
              this.corporateArchitectureList.push(res.body.filePath);
              this.dataObj.basicDtlRespVO.corporateArchitecture.push(
                res.body.fileId
              );
              break;
            case "companyOrganization":
              // this.dataObj.basicDtlRespVO.companyOrganization = res.body.fileId
              this.companyOrganizationList.push(res.body.filePath);
              this.dataObj.basicDtlRespVO.companyOrganization.push(
                res.body.fileId
              );
              break;
            case "team":
              // this.dataObj.teamRespVO.teamStructureImg = res.body.fileId
              this.teamStructureImgList.push(res.body.filePath);
              this.dataObj.teamRespVO.teamStructureImg.push(res.body.fileId);
              break;
            case "balanceSheet":
              // this.dataObj.financialSituationReqVO.balanceSheetImg=res.body.fileId
              this.balanceSheetImgList.push(res.body.filePath);
              this.dataObj.financialSituationReqVO.balanceSheetImg.push(
                res.body.fileId
              );
              break;
            case "incomeStatement":
              // this.dataObj.financialSituationReqVO.incomeStatementImg=res.body.fileId
              this.incomeStatementImgList.push(res.body.filePath);
              this.dataObj.financialSituationReqVO.incomeStatementImg.push(
                res.body.fileId
              );
              break;
            case "cashFlow":
              // this.dataObj.financialSituationReqVO.cashFlowImg=res.body.fileId
              this.cashFlowImgList.push(res.body.filePath);
              this.dataObj.financialSituationReqVO.cashFlowImg.push(
                res.body.fileId
              );
              break;
            case "financialStatements":
              // this.dataObj.financialSituationReqVO.financialStatementsImg=res.body.fileId
              this.financialStatementsImgList.push(res.body.filePath);
              this.dataObj.financialSituationReqVO.financialStatementsImg.push(
                res.body.fileId
              );
              break;
            case "bas":
              this.basicCapitalFrameworkList.push(res.body.filePath);
              this.dataObj.compositionReqVO.basicCapitalFramework.push(
                res.body.fileId
              );
              // this.dataObj.compositionReqVO.basicCapitalFramework=res.body.fileId
              break;
            case "fin":
              this.financialNodeList.push(res.body.filePath);
              this.dataObj.compositionReqVO.financialNode.push(res.body.fileId);
              // this.dataObj.compositionReqVO.financialNode=res.body.fileId
              break;
            case "comLogo":
              this.dataObj.basicDtlRespVO.comLogo = res.body.fileId;
              break;
          }
        }
      });
    },
    delImg(index, type) {
      // console.log(index,type)
      switch (type.type) {
        case "businessLicense":
          this.businessLicenseList.splice(index, 1);
          this.dataObj.basicDtlRespVO.businessLicense.splice(index, 1);
          break;
        case "licenseDocument":
          this.licenseDocumentList.splice(index, 1);
          this.dataObj.basicDtlRespVO.licenseDocument.splice(index, 1);
          break;
        case "investorAgreement":
          this.investorAgreementList.splice(index, 1);
          this.dataObj.basicDtlRespVO.investorAgreement.splice(index, 1);
          break;
        case "corporateArchitecture":
          this.corporateArchitectureList.splice(index, 1);
          this.dataObj.basicDtlRespVO.corporateArchitecture.splice(index, 1);
          break;
        case "companyOrganization":
          this.companyOrganizationList.splice(index, 1);
          this.dataObj.basicDtlRespVO.companyOrganization.splice(index, 1);
          break;
        case "team":
          this.teamStructureImgList.splice(index, 1);
          this.dataObj.teamRespVO.teamStructureImg.splice(index, 1);
          break;
        case "balanceSheet":
          this.balanceSheetImgList.splice(index, 1);
          this.dataObj.financialSituationReqVO.balanceSheetImg.splice(index, 1);
          break;
        case "incomeStatement":
          this.incomeStatementImgList.splice(index, 1);
          this.dataObj.financialSituationReqVO.incomeStatementImg.splice(
            index,
            1
          );
          break;
        case "cashFlow":
          this.cashFlowImgList.splice(index, 1);
          this.dataObj.financialSituationReqVO.cashFlowImg.splice(index, 1);
          break;
        case "financialStatements":
          this.financialStatementsImgList.splice(index, 1);
          this.dataObj.financialSituationReqVO.financialStatementsImg.splice(
            index,
            1
          );
          break;
        case "bas":
          this.basicCapitalFrameworkList.splice(index, 1);
          this.dataObj.compositionReqVO.basicCapitalFramework.splice(index, 1);
          break;
        case "fin":
          this.financialNodeList.splice(index, 1);
          this.dataObj.compositionReqVO.financialNode.splice(index, 1);
          break;
      }
    },
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
    },
    //地区选择
    changeProvince() {
      let provinceArr = this.provinceInfo.split(",");
      let provinceCode = provinceArr[0];
      Object.keys(cityList).forEach(key => {
        if (key.indexOf(provinceCode) == 0) {
          this.city = cityList[key];
          this.cityInfo = this.city[0].text;
          //选择了省份后后.用户不在选择城市
          this.dataObj.basicDtlRespVO.companyProvince = provinceArr[1];
          this.dataObj.basicDtlRespVO.companyProvinceCode = provinceArr[0];
          this.dataObj.basicDtlRespVO.companyCity = this.city[0].text;
          this.dataObj.basicDtlRespVO.companyCityCode = this.city[0].value;
        }
      });
    },
    changeCity() {
      let provinceArr = this.provinceInfo.split(",");
      let cityArr = this.cityInfo.split(",");
      this.dataObj.basicDtlRespVO.companyProvince = provinceArr[1];
      this.dataObj.basicDtlRespVO.companyProvinceCode = provinceArr[0];
      this.dataObj.basicDtlRespVO.companyCity = cityArr[1];
      this.dataObj.basicDtlRespVO.companyCityCode = cityArr[0];
    }
  }
};
</script>

<style lang="stylus" scoped>
.editDialog {
  .baseState {
    width: 88%;
    margin: auto;

    >>>.el-form-item__label:before {
      content: '*';
      color: #f56c6c;
      margin-right: 4px;
    }
  }
  .form_divv{
     >>>.el-form-item__label:before {
      content: '';
      color: #f56c6c;
      margin-right: 4px;
    }
  }
  .team {
    width: 66%;
    margin: auto;

    .add_btn {
      padding: 16px 0 24px;
    }

    >>>.el-table th {
      padding: 0;
    }

    .h1_title:before {
      content: '*';
      color: #f56c6c;
      margin-right: 4px;
    }
  }

  .market {
    width: 88%;
    margin: auto;
  
    .h2_title {
      color: #1f2f3d;
      font-size: 16px;
      font-weight: bold;
      box-sizing: border-box;
      padding-bottom: 20px;
    }

    .free_div {
      width: 388px;
      margin-bottom: 22px;
    }

    .del_icon {
      cursor: pointer;
    }

    >>>.el-checkbox {
      margin-left: 0px;
      width: 233px;
    }
  }

  .technology {
    width: 66%;
    margin: auto;

    .children_div {
      width: 500px;
      padding-left: 40px;
      padding-bottom: 66px;
      box-sizing: border-box;
    }
  }

  .financialState {
    width: 66%;
    margin: auto;

    .children_div {
      padding-left: 40px;
      padding-bottom: 40px;
    }
  }

  .capitalConstitute {
    width: 66%;
    margin: auto;
  }

  .businessModel {
    width: 66%;
    margin: auto;
  }

  .h1_title {
    font-size: 18px;
    font-weight: bold;
    padding: 0 12px 23px 0;
    box-sizing: border-box;
    color: #1f2f3d;
  }

  .h3_title {
    font-size: 18px;
    font-weight: bold;
    padding: 0 12px 23px 0;
    box-sizing: border-box;
    color: #1f2f3d;
  }

  .form_div {
    display: flex;

    >>>.el-form-item__content {
      width: 233px;
      margin-right: 66px;
    }
  }
 .form_div7{
    width: 500px;
    
  }
  .form_div1 {
    width: 500px;
  }

  .form_div4 {
    width: 500px;

    >>> .el-form-item__label:before {
      content: '*';
      color: #f56c6c;
      margin-right: 4px;
    }
  }

  .form_div5 {
    >>> .el-form-item__label:before {
      content: '*';
      color: #f56c6c;
      margin-right: 4px;
    }
  }
 
  .item_title {
    margin-bottom: 6px;

    >>> .el-form-item__label {
      color: black;
    }
  }

  .spanInput {
    display: inline-block;
    width: 200px;
  }

  .prev_next {
    text-align: center;
  }

  .children_div {
    padding-left: 40px;
  }

  .fenge {
    height: 33px;
  }
}
</style>
