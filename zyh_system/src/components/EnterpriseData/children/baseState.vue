<template>
  <!-- 股权基本情况 -->
  <div>
    <el-steps :active="active" finish-status="success" process-status="finish" simple>
      <el-step title="基本信息" icon="el-icon-edit"></el-step>
      <el-step title="团队" icon="el-icon-edit"></el-step>
      <el-step title="市场" icon="el-icon-edit"></el-step>
      <el-step title="技术" icon="el-icon-edit"></el-step>
      <el-step title="财务情况" icon="el-icon-edit"></el-step>
      <el-step title="资金构成" icon="el-icon-edit"></el-step>
      <el-step title="商业模式" icon="el-icon-edit"></el-step>
    </el-steps>
    <div class="baseState" v-show="active === 0">
      <h1 class="h1_title">基础资料</h1>
      <el-form
        :model="dataObj"
        label-position="left"
        ref="baseForm"
        size="medium"
        label-width="111px"
        :rules="rules"
      >
        <div class="form_div">
          <el-form-item label="公司名称：" prop="companyName">
            <el-input v-model="dataObj.companyName" type="text" placeholder="公司名称" maxlength="25"></el-input>
          </el-form-item>
          <el-form-item label="项目领域：" prop="involvedDomain">
            <el-select v-model="dataObj.involvedDomain" placeholder="请选择">
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
              v-model="dataObj.companyDetailedAddress"
              type="text"
              placeholder="详细地址"
              maxlength="50"
            ></el-input>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="自然人股东：" prop="individualShareholder">
            <el-input
              v-model="dataObj.individualShareholder"
              type="text"
              placeholder="自然人股东"
              maxlength="15"
            ></el-input>
          </el-form-item>
          <el-form-item label="法人控股人：" prop="legalPersonHolding">
            <el-input
              v-model="dataObj.legalPersonHolding"
              type="text"
              placeholder="法人控股人"
              maxlength="15"
            ></el-input>
          </el-form-item>
        </div>
        <div class="form_div1">
          <el-form-item label="统一社会信用代码：" prop="socialCreditCode" label-width="166px">
            <el-input
              v-model="dataObj.socialCreditCode"
              type="text"
              placeholder="统一社会信用代码"
              maxlength="18"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="注册时间：" prop="registrationTime">
            <el-date-picker
              v-model="dataObj.registrationTime"
              value-format="yyyy-MM-dd"
              :editable="false"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="联系人：" prop="linkName">
            <el-input v-model="dataObj.linkName" type="text" placeholder="联系人" maxlength="15"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="linkTel">
            <el-input v-model="dataObj.linkTel" type="text" maxlength="11" placeholder="联系电话"></el-input>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="员工人数：" prop="numberEmployees">
            <span class="spanInput">
              <el-input
                v-model="dataObj.numberEmployees"
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
                v-model="dataObj.socialSecurityPayment"
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
            <!-- <el-select v-model="dataObj.welfarePolicy" placeholder="请选择">
              <el-option
                v-for="item in initData.welfarePolicyList"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>-->
            <el-checkbox-group v-model="dataObj.welfarePolicyList">
              <el-checkbox
                :label="item"
                v-for="(item,index) in initData.welfarePolicyList"
                :key="index"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="融资轮次：" prop="financeRound">
            <el-select v-model="dataObj.financeRound" placeholder="请选择">
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
                        :showImage="dataObj.businessLicense?$store.state.user.ip+dataObj.businessLicense:''"
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
                        :showImage="dataObj.licenseDocument?$store.state.user.ip+dataObj.licenseDocument:''"
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
                        :showImage="dataObj.investorAgreement?$store.state.user.ip+dataObj.investorAgreement:''"
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
        <div>
          <el-form-item label="下属公司：" class="item_title"></el-form-item>
          <el-form-item label-width="0" prop="subCompany">
            <table-list
              :tableTitle="tableHeader.comHeader"
              :tableData="dataObj.subCompany"
              type="company"
              @addDialogFuc="addDialogFuc"
              @delFuc="delFuc"
            />
          </el-form-item>
        </div>
        <div>
          <el-form-item label="工商变更：" class="item_title"></el-form-item>
          <el-form-item label-width="0" prop="industrialChange">
            <table-list
              :tableTitle="tableHeader.gongSHeader"
              :tableData="dataObj.industrialChange"
              type="gongShang"
              @addDialogFuc="addDialogFuc"
              @delFuc="delFuc"
            />
          </el-form-item>
        </div>
        <div>
          <el-form-item label="股权变更：" class="item_title"></el-form-item>
          <el-form-item label-width="0" prop="stockChange">
            <table-list
              :tableTitle="tableHeader.sharesHeader"
              :tableData="dataObj.stockChange"
              type="shares"
              @addDialogFuc="addDialogFuc"
              @delFuc="delFuc"
            />
          </el-form-item>
        </div>
        <div>
          <el-form-item label="注册资本变更：" class="item_title"></el-form-item>
          <el-form-item label-width="0" prop="registAmtChange">
            <table-list
              :tableTitle="tableHeader.regAmtHeader"
              :tableData="dataObj.registAmtChange"
              type="regAmt"
              @addDialogFuc="addDialogFuc"
              @delFuc="delFuc"
            />
          </el-form-item>
        </div>
        <div>
          <el-form-item label="法律诉讼：" class="item_title"></el-form-item>
          <el-form-item label-width="0" prop="lawAction">
            <table-list
              :tableTitle="tableHeader.lawHeader"
              :tableData="dataObj.lawAction"
              type="law"
              @addDialogFuc="addDialogFuc"
              @delFuc="delFuc"
            />
          </el-form-item>
        </div>
        <div class="form_div1">
          <el-form-item label="预期的诉讼仲裁：" prop="litigationArbitration" label-width="133px">
            <el-input
              v-model="dataObj.litigationArbitration"
              type="text"
              placeholder="预期的诉讼仲裁"
              maxlength="200"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="公司架构：" prop="corporateArchitecture">
            <!-- <upload-img
                        :type="{type:'corporateArchitecture'}"
                        :showImage="dataObj.corporateArchitecture?$store.state.user.ip+dataObj.corporateArchitecture:''"
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
                        :showImage="dataObj.companyOrganization?$store.state.user.ip+dataObj.companyOrganization:''"
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
            <upload-img
              :type="{type:'comLogo'}"
              :showImage="dataObj.comLogo?$store.state.user.ip+dataObj.comLogo:''"
              @uploadFuc="uploadFuc"
              @delImg="delImg"
            />
          </el-form-item>
          <div class="next_btn">
            <el-button type="primary" size="medium" @click="nextFuc('baseForm')">下一步</el-button>
            <el-button type="primary" size="medium" @click="resetFuc">重置</el-button>
          </div>
        </div>
      </el-form>
      <base-dialog ref="addDialog" @saveFuc="saveFuc"/>
    </div>
    <div class="team" v-show="active === 1">
      <h1 class="h1_title">人员构成</h1>
      <div class="form_div">
        <!-- <upload-img :showImage="dataObj.teamStructureImg?$store.state.user.ip+dataObj.teamStructureImg:''" @uploadFuc="uploadFuc"/> -->
        <upload-img
          :more="true"
          :maxNumber="2"
          :imgList="teamStructureImgList"
          @uploadFuc="uploadd"
          @delImg="delIm"
        />
      </div>
      <div class="fenge"></div>
      <h1 class="h1_title">履历分析</h1>
      <el-table
        :data="tableAata"
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
          v-for="(item,index) in tableTitle"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        ></el-table-column>
      </el-table>

      <div class="add_btn">
        <el-button type="primary" size="medium" @click="addFucc">增&nbsp;&nbsp;加</el-button>
        <el-button type="primary" size="medium" @click="del">删除表格</el-button>
      </div>

      <div class="next_btn">
        <el-button type="primary" size="medium" @click="next">下一步</el-button>
        <el-button type="primary" size="medium" @click="resetTeam">重置</el-button>
      </div>
      <!-- 增加弹窗 -->
      <el-dialog title="增加履历" :visible.sync="sh" @close="closeFucd" width="600px" center>
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
          <el-button type="primary" @click="save" size="medium">保&nbsp;&nbsp;存</el-button>
          <el-button type="primary" @click="reset" size="medium">重&nbsp;&nbsp;置</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="market" v-show="active === 2">
      <el-form
        :model="marketObj"
        label-position="left"
        ref="marketForm"
        size="medium"
        label-width="111px"
        :rules="rules"
      >
        <h1 class="h1_title">市场分析</h1>
        <div class="children_div">
          <div class="form_div1">
            <el-form-item label="项目名称：" prop="projectName">
              <el-input
                v-model="marketObj.projectName"
                type="text"
                placeholder="项目名称"
                maxlength="50"
              ></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="商业模式创新：" prop="bizModelCre">
              <el-select v-model="marketObj.bizModelCre" placeholder="请选择">
                <el-option
                  v-for="item in initData.bizModelCreList"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="价格定位：" prop="priceLocation">
              <el-select v-model="marketObj.priceLocation" placeholder="请选择">
                <el-option
                  v-for="item in initData.priceLocationList"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="产业链角色：" prop="industryChain">
              <el-select v-model="marketObj.industryChain" placeholder="请选择">
                <el-option
                  v-for="item in initData.industryChainList"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="属性标签：" prop="attributeTagList">
              <el-checkbox-group v-model="marketObj.attributeTagList">
                <el-checkbox
                  :label="item"
                  v-for="(item,index) in initData.attributeTagList"
                  :key="index"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="属性标签2：" prop="attributeTagTwoList">
              <el-checkbox-group v-model="marketObj.attributeTagTwoList">
                <el-checkbox
                  :label="item"
                  v-for="(item,index) in initData.attributeTagList2"
                  :key="index"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="市场痛点：" prop="marketPainSpot">
              <el-input v-model="marketObj.marketPainSpot" type="text" placeholder="市场痛点" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="是否真实：" prop="isReal">
              <el-select v-model="marketObj.isReal" placeholder="请选择">
                <el-option
                  v-for="item in initData.yesNoList"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="form_div1">
            <el-form-item label="痛点真伪：" prop="painAuthenticity">
              <span class="spanInput">
                <el-input v-model="marketObj.painAuthenticity" type="text" placeholder="痛点真伪" maxlength="30">
                  <span slot="suffix">&nbsp;分&nbsp;</span>
                </el-input>
              </span>
            </el-form-item>
          </div>
          <div class="form_div1">
            <el-form-item label="单客户利用率：" prop="singleCuRate">
              <span class="spanInput">
                <el-input v-model="marketObj.singleCuRate" type="text" placeholder="单客户利用率" maxlength="3">
                  <span slot="suffix">&nbsp;%&nbsp;</span>
                </el-input>
              </span>
            </el-form-item>
          </div>
          <div class="form_div1">
            <el-form-item label="客户规模：" prop="cuScale">
              <span class="spanInput">
                <el-input v-model="marketObj.cuScale" type="text" placeholder="客户规模" maxlength="10">
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
                <el-input v-model="marketObj.roughMachiningCapital" type="text" placeholder="资本" maxlength="80"></el-input>
              </el-form-item>
            </div>
            <div class="form_div1">
              <el-form-item label="方法：" prop="methods" label-width="66px">
                <el-input v-model="marketObj.methods" type="text" placeholder="方法" maxlength="80"></el-input>
              </el-form-item>
            </div>
          </div>
          <h2 class="h2_title">2.深加工</h2>
          <div class="children_div">
            <div class="form_div1">
              <el-form-item label="技术：" prop="technology" label-width="66px">
                <el-input v-model="marketObj.technology" type="text" placeholder="技术" maxlength="80"></el-input>
              </el-form-item>
            </div>
          </div>
          <h2 class="h2_title">3.渠道商</h2>
          <div class="children_div">
            <div class="form_div1">
              <el-form-item label="强大的渠道能力：" prop="channelCapacity" label-width="133px">
                <el-input v-model="marketObj.channelCapacity" type="text" placeholder="强大的渠道能力" maxlength="80"></el-input>
              </el-form-item>
            </div>
            <div class="form_div1">
              <el-form-item label="影响力：" prop="influence" label-width="88px">
                <el-input v-model="marketObj.influence" type="text" placeholder="影响力" maxlength="80"></el-input>
              </el-form-item>
            </div>
            <div class="form_div1">
              <el-form-item label="资本：" prop="distributorsCapital" label-width="88px">
                <el-input v-model="marketObj.distributorsCapital" type="text" placeholder="资本" maxlength="80"></el-input>
              </el-form-item>
            </div>
          </div>
          <h2 class="h2_title">4.终端</h2>
          <div class="children_div">
            <el-form-item label="销售：" prop="terminalSales" label-width="66px">
              <el-select v-model="marketObj.terminalSales" placeholder="请选择">
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
            <el-form-item label="市场壁垒：" prop="protectTechnicalBarriers">
              <el-input v-model="marketObj.protectTechnicalBarriers" type="text" placeholder="市场壁垒" maxlength="50"></el-input>
            </el-form-item>
          </div>
          <div class="form_div1">
            <el-form-item label="规模壁垒：" prop="scaleBarriers">
              <el-input v-model="marketObj.scaleBarriers" type="text" placeholder="规模壁垒" maxlength="50"></el-input>
            </el-form-item>
          </div>
        </div>
        <h1 class="h1_title">市场切入</h1>
        <div class="children_div">
          <div>
            <el-form-item label="产品发布会：" prop="productLaunchList">
              <div
                class="free_div"
                v-for="(item,index) in marketObj.productLaunchList"
                :key="index"
              >
                <el-input type="text" v-model="marketObj.productLaunchList[index]" maxlength="50">
                  <span slot="prefix">&nbsp;{{index+1}}</span>
                  <span
                    slot="suffix"
                    class="el-icon-close del_icon"
                    @click="delFucun('free',index)"
                  >&nbsp;</span>
                </el-input>
              </div>
              <div style="width:388px;text-align:center">
                <el-button type="primary" size="medium" @click="addFucunn('free')">增&nbsp;&nbsp;加</el-button>
              </div>
            </el-form-item>
          </div>
          <div class="form_div1">
            <el-form-item label="会销：" prop="willPin">
              <el-input v-model="marketObj.willPin" type="text" placeholder="会销" maxlength="50"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="技术壁垒：" prop="cutTechnicalBarriersList">
              <el-checkbox-group v-model="marketObj.cutTechnicalBarriersList">
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
                  v-model="marketObj.cutTechnicalBarriersContent"
                  maxlength="250"
                ></el-input>
              </div>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="贸易壁垒：" prop="cutBarriersTradeList">
              <el-checkbox-group v-model="marketObj.cutBarriersTradeList">
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
              <el-checkbox-group v-model="marketObj.marketinglist">
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
              :tableTitle="tableHeader1"
              :tableData="cutTable"
              @addFuc="addFucunn"
              @delFuc="delFucun"
              type="spread"
            />
          </div>
        </div>
        <h1 class="h1_title">市场运营</h1>
        <div class="children_div">
          <div>
            <el-form-item label="活跃度：" prop="operatingActive">
              <span class="spanInput">
                <el-input v-model="marketObj.operatingActive" type="text" placeholder="填写数字" maxlength="5">
                  <span slot="suffix">&nbsp;人&nbsp;</span>
                </el-input>
              </span>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="单个用户输出价值：" prop="userValue" label-width="166px">
              <span class="spanInput">
                <el-input v-model="marketObj.userValue" type="text" placeholder="输入数字" maxlength="5"></el-input>
              </span>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="增量：" class="item_title"></el-form-item>
            <table-obj
              :tableTitle="tableHeader1"
              :tableData="incrementalTable"
              @addFuc="addFucunn"
              @delFuc="delFucun"
              type="add"
            />
          </div>
          <div>
            <el-form-item label="流失：" class="item_title"></el-form-item>
            <table-obj
              :tableTitle="tableHeader1"
              :tableData="leaveTable"
              @addFuc="addFucunn"
              @delFuc="delFucun"
              type="loss"
            />
          </div>
          <div>
            <el-form-item label="0-1-2-5-0：" prop="userNumber">
              <span class="spanInput">
                <el-input v-model="marketObj.userNumber" type="text" placeholder="填写数字" maxlength="5"></el-input>
              </span>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="所处阶段：" prop="phase">
              <el-select v-model="marketObj.phase" placeholder="请选择">
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
                <el-input v-model="marketObj.dataAcceptance" type="text" placeholder="填写数字" maxlength="3"></el-input>
              </span>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="方案合理性：" prop="programRationality">
              <span class="spanInput">
                <el-input v-model="marketObj.programRationality" type="text" placeholder="填0-100" maxlength="3">
                  <span slot="suffix">&nbsp;人&nbsp;</span>
                </el-input>
              </span>
            </el-form-item>
          </div>
        </div>

        <div class="next_btn">
          <el-button type="primary" size="medium" @click="nextFucun('marketForm')">下一步</el-button>
          <el-button type="primary" size="medium" @click="resetMarket">重置</el-button>
        </div>
      </el-form>

      <el-dialog
        :title="dialogTitle"
        :visible.sync="so"
        @close="Fucun"
        width="600px"
        center
        :modal-append-to-body="false"
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
          <el-button type="primary" @click="saveFucun" size="medium">保&nbsp;&nbsp;存</el-button>
          <el-button type="primary" @click="resetFucun" size="medium">重&nbsp;&nbsp;置</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="technology" v-show="active === 3">
      <h1 class="h1_title">系统性创新</h1>
      <div class="children_div">
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="technologyObj.systematicInnovation"
          maxlength="2000"
        ></el-input>
      </div>
      <h1 class="h1_title">技术迭代</h1>
      <div class="children_div">
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="technologyObj.technologyIteration"
          maxlength="2000"
        ></el-input>
      </div>
      <div class="next_btn">
        <el-button type="primary" size="medium" @click="nextFuc2">下一步</el-button>
        <el-button type="primary" size="medium" @click="resetTechnology">重置</el-button>
      </div>
    </div>
    <div class="financialState" v-show="active === 4">
      <el-form
        :model="dataObj"
        label-position="left"
        ref="financialForm"
        size="medium"
        label-width="0"
      >
        <h1 class="h1_title">资产负债表</h1>
        <el-form-item prop="balanceSheetImg">
          <div class="children_div">
            <upload-img
              :type="{type:'balanceSheet'}"
              :more="true"
              :maxNumber="2"
              :imgList="balanceSheetImgList"
              @uploadFuc="uploadFuc3"
              @delImg="delImg3"
            />
          </div>
        </el-form-item>
        <h1 class="h1_title">利润表</h1>
        <el-form-item prop="incomeStatementImg">
          <div class="children_div">
            <upload-img
              :type="{type:'incomeStatement'}"
              :more="true"
              :maxNumber="2"
              :imgList="incomeStatementImgList"
              @uploadFuc="uploadFuc3"
              @delImg="delImg3"
            />
          </div>
        </el-form-item>
        <h1 class="h1_title">现金流表</h1>
        <el-form-item prop="cashFlowImg">
          <div class="children_div">
            <upload-img
              :type="{type:'cashFlow'}"
              :more="true"
              :maxNumber="2"
              :imgList="cashFlowImgList"
              @uploadFuc="uploadFuc3"
              @delImg="delImg3"
            />
          </div>
        </el-form-item>
        <h1 class="h1_title">财务报表</h1>
        <el-form-item prop="financialStatementsImg">
          <div class="children_div">
            <upload-img
              :type="{type:'financialStatements'}"
              :more="true"
              :maxNumber="2"
              :imgList="financialStatementsImgList"
              @uploadFuc="uploadFuc3"
              @delImg="delImg3"
            />
          </div>
        </el-form-item>
      </el-form>
      <div class="next_btn">
        <el-button type="primary" size="medium" @click="nextFuc3">下一步</el-button>
        <el-button type="primary" size="medium" @click="resetFin">重置</el-button>
      </div>
    </div>
    <div class="capitalConstitute" v-show="active === 5">
      <el-form
        :model="capitalConstituteObj"
        ref="capitalForm"
        label-width="111px"
        size="medium"
        label-position="left"
      >
        <h1 class="h1_title">基础资本框架</h1>
        <div class="children_div">
          <el-form-item prop="basicCapitalFramework" label-width="0">
            <upload-img
              :type="{type:'bas'}"
              :more="true"
              :maxNumber="2"
              :imgList="basicCapitalFrameworkList"
              @uploadFuc="upload1"
              @delImg="del2"
            />
          </el-form-item>
        </div>
        <h1 class="h1_title">未来股东计划</h1>
        <el-form-item prop="futureHolderPlan" label-width="0">
          <table-list
            :tableTitle="tableHeader2"
            :tableData="capitalConstituteObj.futureHolderPlan"
            @addDialogFuc="addDFuc"
            @delFuc="del1"
          />
        </el-form-item>
        <h1 class="h1_title">资本库</h1>
        <div class="children_div">
          <el-form-item label="1.资本库：" class="item_title"></el-form-item>
          <div class="form_div">
            <el-form-item prop="capitalLibrary" label-width="0">
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="capitalConstituteObj.capitalLibrary"
                maxlength="500"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item label="2.董秘：" class="item_title"></el-form-item>
          <div class="form_div">
            <el-form-item prop="chairmanSecretary" label-width="0">
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="capitalConstituteObj.chairmanSecretary"
                maxlength="500"
              ></el-input>
            </el-form-item>
          </div>
        </div>

        <h1 class="h1_title">财务指标</h1>
        <div class="children_div">
          <el-form-item label="1.财务节点：" class="item_title"></el-form-item>
          <div class="form_div">
            <el-form-item prop="financialNode" label-width="0">
              <upload-img
                :type="{type:'fin'}"
                :more="true"
                :maxNumber="2"
                :imgList="financialNodeList"
                @uploadFuc="upload1"
                @delImg="del2"
              />
            </el-form-item>
          </div>
          <el-form-item label="2.问题节点：" class="item_title"></el-form-item>
          <div class="form_div">
            <el-form-item prop="problemNode" label-width="0">
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="capitalConstituteObj.problemNode"
                maxlength="500"
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>

      <el-dialog title="未来股东计划" :visible.sync="showDialog" @close="closeFucc" width="700px" center>
        <el-form ref="futureForm" :model="futureObj" label-width="111px">
          <div class="form_div">
            <el-form-item label="股权占比：" prop="equityRatio">
              <el-input v-model="futureObj.equityRatio" type="text" placeholder="股权占比"></el-input>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="预计融资金额：" prop="financingAmount">
              <el-input v-model="futureObj.financingAmount" type="text" placeholder="预计融资金额"></el-input>
            </el-form-item>
          </div>
          <div class="form_div">
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
          <el-button type="primary" @click="saveFu" size="medium">保&nbsp;&nbsp;存</el-button>
          <el-button type="primary" @click="resetFucc" size="medium">重&nbsp;&nbsp;置</el-button>
        </span>
      </el-dialog>

      <div class="next_btn">
        <el-button type="primary" size="medium" @click="nextFuc4">下一步</el-button>
        <el-button type="primary" size="medium" @click="resetCapital">重置</el-button>
      </div>
    </div>
    <div class="businessModel" v-show="active === 6">
      <h1 class="h1_title">商业伦理</h1>
      <div class="children_div">
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="businessModelObj.businessEthics"
          maxlength="500"
        ></el-input>
      </div>
      <h1 class="h1_title">商业规律</h1>
      <div class="children_div">
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="businessModelObj.commercialLaw"
          maxlength="500"
        ></el-input>
      </div>
      <h1 class="h1_title">客观规律</h1>
      <div class="children_div">
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="businessModelObj.objectiveLaws"
          maxlength="500"
        ></el-input>
      </div>
      <div class="next_btn">
        <el-button type="primary" size="medium" @click="nextFuc5">完成</el-button>
        <el-button type="primary" size="medium" @click="resetBusiness">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import TableObj from "@/components/EnterpriseData/table/tableObj";
import { provinceList, cityList } from "@/files/js/areaData";
import UploadImg from "@/components/UploadImg/uploadImg";
import {
  upload,
  basic,
  publishMarket,
  team,
  publishTechnology,
  publishFinancial,
  capitalComposition,
  publishBizModel,
  pubProjectInit
} from "@/api";
import { cloneObj } from "@/files/js/cloneObj";
import {
  baseHeader,
  marketHeader,
  teamHeader,
  capitalHeader
} from "@/components/EnterpriseData/table/tableHeader";
import TableList from "@/components/EnterpriseData/table/table";
import BaseDialog from "@/components/EnterpriseData/dialog/baseDialog";
import { enterpriseList } from "@/files/js/initData";
import { mapActions, mapState } from "vuex";
import { isvalidPhone, isvalidNum5,isvalidOrgCode,isvalidNumN,isPercentage } from "@/files/js/rules";
var validNum5 = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入5位以下数字"));
  } else if (!isvalidNum5(value)) {
    callback(new Error("请输入正确的格式！"));
  } else {
    callback();
  }
};
var validNumN=(rule, value,callback)=>{
  if (!value){
    callback(new Error('请输入10位以下的数字'))
  }else  if (!isvalidNumN(value)){
    callback(new Error('请输入正确的格式！'))
  }else {
    callback()
  }
};
var Percentage=(rule, value,callback)=>{
  if (!value){
    callback(new Error('请输入不超过3位的数字'))
  }else  if (!isPercentage(value)){
    callback(new Error('请输入正确的格式！'))
  }else {
    callback()
  }
};
var validOrgCode=(rule, value,callback)=>{
  if (!value){
    callback(new Error('请输入18位 数字或者大写字母'))
  }else  if (!isvalidOrgCode(value)){
    callback(new Error('请输入正确的格式！'))
  }else {
    callback()
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
    BaseDialog,
    TableObj
  },
  computed: {
    ...mapState({
      projectId: state => state.data.companyId
    })
  },
  data() {
    return {
      businessModelObj: {
        businessEthics: "", //商业伦理
        commercialLaw: "", //商业规律
        objectiveLaws: "" //客观规律
      },
      initd: {
        myPreferenceInitRespVO: {},
        pubProjectBaseInitRespVO: {},
        pubProjectAInitRespVO: {},
        pubProjectBInitRespVO: {},
        pubProjectCInitRespVO: {},
        tagInfList: []
      },
      so: false,
      sh: false,
      active: 0,
      showDialog: false,
      dialogTitle: "",
      dialogType: "",
      tableTitle: teamHeader,
      tableAata: [],
      initData: enterpriseList,
      cutTable: [],
      incrementalTable: [],
      leaveTable: [],
      balanceSheetImgList: [], //资产负债
      incomeStatementImgList: [], //利润表
      cashFlowImgList: [], //现金流表
      financialStatementsImgList: [], //财务报表

      financialStateObj: {
        projectId: "",
        balanceSheetImg: [], //资产负债
        incomeStatementImg: [], //利润表
        cashFlowImg: [], //现金流表
        financialStatementsImg: [] //财务报表
      },
      dateObj: {
        name: "",
        day: "",
        week: "",
        month: ""
      },
      technologyObj: {
        projectId: "", //项目id
        systematicInnovation: "", //系统性创兴
        technologyIteration: "" //技术迭代
      },
      tableHeader2: capitalHeader,
      tableHeader1: marketHeader,
      tableHeader: baseHeader, //表头名字
      teamStructureImgList: [], //人员构成图片

      basicCapitalFrameworkList: [], //基础资本框架图
      financialNodeList: [], //财务节点

      capitalConstituteObj: {
        projectId: "",
        basicCapitalFramework: [], //基础资本框架图
        futureHolderPlan: [], //股东计划
        capitalLibrary: "", //资本库
        chairmanSecretary: "", //董秘
        financialNode: [], //财务节点
        problemNode: "" //问题节点
      },

      futureObj: {
        equityRatio: "",
        financingAmount: "",
        financingTime: ""
      },
      teamObj: {
        projectId: "",
        teamStructureImg: [] //人员构成图片
      },
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
      businessLicenseList: [], //营业执照图片
      licenseDocumentList: [], //许可性文件图片
      investorAgreementList: [], //发起人 出资人协议
      corporateArchitectureList: [], //公司架构图片
      companyOrganizationList: [], //公司组织机构图片
      marketObj: {
        projectId: "", //项目id
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
        cutTechnicalBarriersContent: "", //市场切入技术壁垒类容描述
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
      dataObj: {
        companyName: "", //公司名称
        involvedDomain: "", //项目领域
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
        welfarePolicyList: [], //福利集合
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
        industryChain:[
           { hide: true, trigger: "change", validator: validConstruction }
        ],
        // painAuthenticity:[
        //   { hide: true, trigger: "blur", validator: validProjectName }
        // ],
        // marketPainSpot:[
        //   { hide: true, trigger: "blur", validator: validProjectName }
        // ],
        // isReal:[
        //   { hide: true, trigger: "change", validator: validConstruction }
        // ],
        // singleCuRate:[
        //    { hide: true, trigger: "blur", validator: Percentage }
        // ],
        // cuScale:[
        //    { hide: true, trigger: "blur", validator: validNumN }
        // ]
      }
    };
  },
  created() {
    //初始化项目选项数据
    pubProjectInit({ projectCategoryCode: 0 }).then(res => {
      if (res && res.errorCode === 0) {
        this.initd = res.body;
      }
    });
  },
  methods: {
    //痛点
    PainSpot(){

    },
    //最后一步完成
    nextFuc5() {
      if (this.projectId) {
        this.businessModelObj.projectId = this.projectId;
        console.log(this.businessModelObj.projectId);
        console.log(this.projectId);
        publishBizModel(this.businessModelObj).then(res => {
          if (res && res.errorCode === 0) {
            this.getCompanyId("");
            this.$message({
              showClose: true,
              message: "企业参数添加完成,跳转到企业列表生成脑图",
              type: "success"
            });
            // this.$router.push('/enterpriseList')
            window.location.href = "/admin/enterpriseList";
          }
        });
      }
      // else{
      //     this.$message({
      //         showClose: true,
      //         message: '请先完善基本信息',
      //         type: 'warning'
      //     });
      // }
    },
    resetBusiness() {
      this.businessModelObj = {
        businessEthics: "", //商业伦理
        commercialLaw: "", //商业规律
        objectiveLaws: "" //客观规律
      };
    },
    //第五步的下一步
    nextFuc3() {
      this.active = 5;
      if (this.projectId) {
        this.financialStateObj.projectId = this.projectId;
        publishFinancial(this.financialStateObj).then(res => {
          if (res && res.errorCode === 0) {
            this.$message({
              showClose: true,
              message: "财务情况保存成功,跳转到第六步",
              type: "success"
            });
            // this.$router.push('/capitalConstitute')
          }
        });
      }
      // else{
      //     this.$message({
      //         showClose: true,
      //         message: '请先完善基本信息',
      //         type: 'warning'
      //     });
      // }
    },
    resetFin() {
      (this.balanceSheetImgList = []), //资产负债
        (this.incomeStatementImgList = []), //利润表
        (this.cashFlowImgList = []), //现金流表
        (this.financialStatementsImgList = []), //财务报表
        this.$refs.financialForm.resetFields();
    },
    uploadFuc3(data, more, type) {
      upload(data).then(res => {
        if (res && res.errorCode === 0) {
          switch (type.type) {
            case "balanceSheet":
              // this.dataObj.balanceSheetImg=res.body.fileId
              this.balanceSheetImgList.push(res.body.filePath);
              this.financialStateObj.balanceSheetImg.push(res.body.fileId);
              break;
            case "incomeStatement":
              // this.dataObj.incomeStatementImg=res.body.fileId
              this.incomeStatementImgList.push(res.body.filePath);
              this.financialStateObj.incomeStatementImg.push(res.body.fileId);
              break;
            case "cashFlow":
              // this.dataObj.cashFlowImg=res.body.fileId
              this.cashFlowImgList.push(res.body.filePath);
              this.financialStateObj.cashFlowImg.push(res.body.fileId);
              break;
            case "financialStatements":
              // this.dataObj.financialStatementsImg=res.body.fileId
              this.financialStatementsImgList.push(res.body.filePath);
              this.financialStateObj.financialStatementsImg.push(
                res.body.fileId
              );
              break;
          }
        }
      });
    },
    delImg3(index, type) {
      switch (type.type) {
        case "balanceSheet":
          this.balanceSheetImgList.splice(index, 1);
          this.financialStateObj.balanceSheetImg.splice(index, 1);
          break;
        case "incomeStatement":
          this.incomeStatementImgList.splice(index, 1);
          this.financialStateObj.incomeStatementImg.splice(index, 1);
          break;
        case "cashFlow":
          this.cashFlowImgList.splice(index, 1);
          this.financialStateObj.cashFlowImg.splice(index, 1);
          break;
        case "financialStatements":
          this.financialStatementsImgList.splice(index, 1);
          this.financialStateObj.financialStatementsImg.splice(index, 1);
          break;
      }
    },
    //第四步的下一步
    nextFuc2() {
      this.active = 4;
      if (this.projectId) {
        this.technologyObj.projectId = this.projectId;
        publishTechnology(this.technologyObj).then(res => {
          if (res && res.errorCode === 0) {
            this.$message({
              showClose: true,
              message: "技术保存成功,跳转到第五步",
              type: "success"
            });
            // this.$router.push('/financialState')
          }
        });
      }
      // else{
      //     this.$message({
      //         showClose: true,
      //         message: '请先完善基本信息',
      //         type: 'warning'
      //     });
      // }
    },
    //第六步的下一步
    nextFuc4() {
      this.active = 6;
      if (this.projectId) {
        this.capitalConstituteObj.projectId = this.projectId;
        capitalComposition(this.capitalConstituteObj).then(res => {
          if (res && res.errorCode === 0) {
            this.$message({
              showClose: true,
              message: "资金构成保存成功,跳转到第七步",
              type: "success"
            });
            // this.$router.push('/businessModel')
          }
        });
      }
      // else{
      //     this.$message({
      //         showClose: true,
      //         message: '请先完善基本信息',
      //         type: 'warning'
      //     });
      // }
    },
    resetTechnology() {
      // console.log(1);
      this.technologyObj.systematicInnovation = "";
      this.technologyObj.technologyIteration = "";
    },
    addDialogFuc(type) {
      this.$refs.addDialog.showDialogFuc(type);
    },
    //市场增加按钮
    addFucunn(type) {
      if (type == "free") {
        this.marketObj.productLaunchList.push("");
        return;
      } else {
        switch (type) {
          case "spread":
            this.dialogTitle = "传播效率";
            break;
          case "add":
            this.dialogTitle = "增量";
            break;
          case "loss":
            this.dialogTitle = "流失";
            break;
        }
        this.dialogType = type;
        this.so = true;
      }
    },
    //第二步的下一步
    next() {
      if (this.tableAata.length > 0) {
        this.teamObj.fullTimeDoctor = this.tableAata[0].doctor;
        this.teamObj.fullTimeMaster = this.tableAata[0].master;
        this.teamObj.fullTimeBachelor = this.tableAata[0].bachelor;
        this.teamObj.fullTimeJunior = this.tableAata[0].junior;

        this.teamObj.partTimeDoctor = this.tableAata[1].doctor;
        this.teamObj.partTimeMaster = this.tableAata[1].master;
        this.teamObj.partTimeBachelor = this.tableAata[1].bachelor;
        this.teamObj.partTimeJunior = this.tableAata[1].junior;
      }

      if (this.projectId) {
        this.teamObj.projectId = this.projectId;
        team(this.teamObj).then(res => {
          console.log(res.body);
          if (res && res.errorCode === 0) {
            this.$message({
              showClose: true,
              message: "团队保存成功,跳转到第三步",
              type: "success"
            });
            this.active = 2;
            // this.$router.push('/market')
          }
          else{
            this.$message({
              showClose: true,
              message: res.errMsg,
              type: "success"
            });
            return
          }
        });
      }
    },
    //第三步的下一步
    nextFucun(marketForm) {
      this.$refs[marketForm].validate(valid => {
        if (valid) {
          if (this.projectId) {
            this.marketObj.projectId = this.projectId;
            publishMarket(this.marketObj).then(res => {
              if (res && res.errorCode === 0) {
                this.$message({
                  showClose: true,
                  message: "市场保存成功,跳转到第四步",
                  type: "success"
                });
                this.active = 3;
                // this.$router.push('/technology')
              }
              else{
                 this.$message({
                  showClose: true,
                  message: res.errMsg,
                  type: "success"
                });
                return
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    delFucun(type, index) {
      console.log(type);
      switch (type) {
        case "free":
          if (this.marketObj.productLaunchList.length > 1) {
            this.marketObj.productLaunchList.splice(index, 1);
          } else {
            this.$message({
              message: "至少有一条输入框",
              type: "warning"
            });
          }
          break;
        case "spread":
          this.dataObj.cutDays = "";
          this.dataObj.cutWeeks = "";
          this.dataObj.cutMonth = "";
          this.cutTable = [];
          break;
        case "add":
          this.dataObj.incrementalDays = "";
          this.dataObj.incrementalWeeks = "";
          this.dataObj.incrementalMonth = "";
          this.incrementalTable = [];
          break;
        case "loss":
          this.dataObj.leaveDays = "";
          this.dataObj.leaveWeeks = "";
          this.dataObj.leaveMonth = "";
          this.leaveTable = [];
          break;
      }
    },
    del1(type, index) {
      this.capitalConstituteObj.futureHolderPlan.splice(index, 1);
    },
    //第一步的下一步
    nextFuc(baseForm) {
      this.$refs[baseForm].validate(valid => {
        if (valid) {
          basic(this.dataObj).then(res => {
            if (res && res.errorCode === 0) {
              this.getCompanyId(res.body.projectId);
              this.$message({
                showClose: true,
                message: "基本信息保存成功,跳转到第二步",
                type: "success"
              });
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
            } else {
              this.$message({
                showClose: true,
                message: res.errMsg,
                type: "success"
              });
              return;
            }
          });
        } else {
          return false;
        }
      });
    },
    saveFuc(type, data) {
      switch (type) {
        case "company":
          this.dataObj.subCompany.push(data);
          break;
        case "gongShang":
          this.dataObj.industrialChange.push(data);
          break;
        case "shares":
          this.dataObj.stockChange.push(data);
          break;
        case "regAmt":
          this.dataObj.registAmtChange.push(data);
          break;
        case "law":
          this.dataObj.lawAction.push(data);
      }
    },
    //团队保存按钮
    save() {
      this.tableAata = [];
      this.tableAata.push(cloneObj(this.fullObj));
      this.tableAata.push(cloneObj(this.partObj));

      this.closeFucd();
    },
    closeFucd() {
      this.sh = false;
      this.reset();
    },
    reset() {
      this.$refs.full.resetFields();
      this.$refs.part.resetFields();
    },
    addFucc() {
      this.sh = true;
    },
    saveFucun() {
      switch (this.dialogType) {
        case "spread":
          this.cutTable = [];
          this.marketObj.cutDays = this.dateObj.day;
          this.marketObj.cutWeeks = this.dateObj.week;
          this.marketObj.cutMonth = this.dateObj.month;
          this.dateObj.name = "%";
          this.cutTable.push(cloneObj(this.dateObj));
          break;
        case "add":
          this.incrementalTable = [];
          this.marketObj.incrementalDays = this.dateObj.day;
          this.marketObj.incrementalWeeks = this.dateObj.week;
          this.marketObj.incrementalMonth = this.dateObj.month;
          this.dateObj.name = "人数";
          this.incrementalTable.push(cloneObj(this.dateObj));
          break;
        case "loss":
          this.leaveTable = [];
          this.marketObj.leaveDays = this.dateObj.day;
          this.marketObj.leaveWeeks = this.dateObj.week;
          this.marketObj.leaveMonth = this.dateObj.month;
          this.dateObj.name = "人数";
          this.leaveTable.push(cloneObj(this.dateObj));
          break;
      }
      this.Fucun();
    },
    saveFu() {
      let obj = cloneObj(this.futureObj);
      this.capitalConstituteObj.futureHolderPlan.push(obj);
      this.closeFucc();
    },
    resetFucc() {
      (this.basicCapitalFrameworkList = []), //基础资本框架图
        (this.financialNodeList = []), //财务节点
        this.$refs.futureForm.resetFields();
    },
    closeFucc() {
      this.showDialog = false;
      this.resetFucc();
    },
    resetCapital() {
      this.$refs.capitalForm.resetFields();
    },
    Fucun() {
      this.so = false;
      this.resetFucun();
    },
    delFuc(type, index) {
      switch (type) {
        case "companyC":
          this.dataObj.subCompany.splice(index, 1);
          break;
        case "gongSC":
          this.dataObj.industrialChange.splice(index, 1);
          break;
        case "sharesC":
          this.dataObj.stockChange.splice(index, 1);
          break;
        case "regAmtC":
          this.dataObj.registAmtChange.splice(index, 1);
          break;
        case "lawC":
          this.dataObj.lawAction.splice(index, 1);
          break;
      }
    },
    del() {
      this.tableAata = [];
    },
    uploadFuc(data, ...type) {
      console.log(data);
      upload(data).then(res => {
        if (res && res.errorCode === 0) {
          switch (type[1].type) {
            case "businessLicense":
              // this.dataObj.businessLicense = res.body.fileId
              this.businessLicenseList.push(res.body.filePath);
              this.dataObj.businessLicense.push(res.body.fileId);
              break;
            case "licenseDocument":
              // this.dataObj.licenseDocument = res.body.fileId
              this.licenseDocumentList.push(res.body.filePath);
              this.dataObj.licenseDocument.push(res.body.fileId);
              break;
            case "investorAgreement":
              // this.dataObj.investorAgreement = res.body.fileId
              this.investorAgreementList.push(res.body.filePath);
              this.dataObj.investorAgreement.push(res.body.fileId);
              break;
            case "corporateArchitecture":
              // this.dataObj.corporateArchitecture = res.body.fileId
              this.corporateArchitectureList.push(res.body.filePath);
              this.dataObj.corporateArchitecture.push(res.body.fileId);
              break;
            case "companyOrganization":
              // this.dataObj.companyOrganization = res.body.fileId
              this.companyOrganizationList.push(res.body.filePath);
              this.dataObj.companyOrganization.push(res.body.fileId);
              break;
            case "comLogo":
              // this.dataObj.companyOrganization = res.body.fileId
              this.dataObj.comLogo = res.body.fileId;
              break;
          }
        }
      });
    },
    uploadd(data) {
      upload(data).then(res => {
        if (res && res.errorCode === 0) {
          this.teamStructureImgList.push(res.body.filePath);
          this.teamObj.teamStructureImg.push(res.body.fileId);
        }
      });
    },
    upload1(data, more, type) {
      upload(data).then(res => {
        if (res && res.errorCode === 0) {
          switch (type.type) {
            case "bas":
              // this.dataObj.basicCapitalFramework = res.body.fileId
              this.basicCapitalFrameworkList.push(res.body.filePath);
              this.capitalConstituteObj.basicCapitalFramework.push(
                res.body.fileId
              );
              break;
            case "fin":
              // this.dataObj.financialNode = res.body.fileId
              this.financialNodeList.push(res.body.filePath);
              this.capitalConstituteObj.financialNode.push(res.body.fileId);
              break;
          }
        }
      });
    },
    addDFuc() {
      this.showDialog = true;
    },
    del2(index, type) {
      switch (type.type) {
        case "bas":
          this.basicCapitalFrameworkList.splice(index, 1);
          this.capitalConstituteObj.basicCapitalFramework.splice(index, 1);
          break;
        case "fin":
          this.financialNodeList.splice(index, 1);
          this.capitalConstituteObj.financialNode.splice(index, 1);
          break;
      }
    },
    delImg(index, type) {
      switch (type.type) {
        case "businessLicense":
          this.businessLicenseList.splice(index, 1);
          this.dataObj.businessLicense.splice(index, 1);
          break;
        case "licenseDocument":
          this.licenseDocumentList.splice(index, 1);
          this.dataObj.licenseDocument.splice(index, 1);
          break;
        case "investorAgreement":
          this.investorAgreementList.splice(index, 1);
          this.dataObj.investorAgreement.splice(index, 1);
          break;
        case "corporateArchitecture":
          this.corporateArchitectureList.splice(index, 1);
          this.dataObj.corporateArchitecture.splice(index, 1);
          break;
        case "companyOrganization":
          this.companyOrganizationList.splice(index, 1);
          this.dataObj.companyOrganization.splice(index, 1);
          break;
      }
    },
    delIm(index) {
      this.teamStructureImgList.splice(index, 1);
      this.teamObj.teamStructureImg.splice(index, 1);
    },
    resetFuc() {
      this.provinceInfo = "";
      this.cityInfo = "";
      this.dataObj.companyProvince = "";
      this.dataObj.companyProvinceCode = "";
      this.dataObj.companyCity = "";
      this.dataObj.companyCityCode = "";
      this.dataObj.financeRound = "";

      (this.businessLicenseList = []), //营业执照图片
        (this.licenseDocumentList = []), //许可性文件图片
        (this.investorAgreementList = []), //发起人 出资人协议
        (this.corporateArchitectureList = []), //公司架构图片
        (this.companyOrganizationList = []), //公司组织机构图片
        (this.dataObj.businessLicense = []), //营业执照图片
        (this.dataObj.licenseDocument = []), //许可性文件图片
        (this.dataObj.investorAgreement = []), //发起人 出资人协议
        (this.dataObj.corporateArchitecture = []), //公司架构图片
        (this.dataObj.companyOrganization = []), //公司组织机构图片
        (this.dataObj.comLogo = "");
      this.$refs.baseForm.resetFields();
    },
    resetTeam() {
      this.tableAata = [];
      this.teamStructureImgList = [];
      this.teamObj = {
        projectId: "",
        teamStructureImg: []
      };
    },
    resetMarket() {
      this.cutTable = [];
      this.incrementalTable = [];
      this.leaveTable = [];

      this.marketObj.cutDays = "";
      this.marketObj.cutWeeks = "";
      this.marketObj.cutMonth = "";

      this.marketObj.incrementalDays = "";
      this.marketObj.incrementalWeeks = "";
      this.marketObj.incrementalMonth = "";

      this.marketObj.leaveDays = "";
      this.marketObj.leaveWeeks = "";
      this.marketObj.leaveMonth = "";

      this.$refs.marketForm.resetFields();
    },
    resetFucun() {
      this.$refs.dateForm.resetFields();
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
          this.dataObj.companyProvince = provinceArr[1];
          this.dataObj.companyProvinceCode = provinceArr[0];
          this.dataObj.companyCity = this.city[0].text;
          this.dataObj.companyCityCode = this.city[0].value;
        }
      });
    },
    changeCity() {
      let provinceArr = this.provinceInfo.split(",");
      let cityArr = this.cityInfo.split(",");
      this.dataObj.companyProvince = provinceArr[1];
      this.dataObj.companyProvinceCode = provinceArr[0];
      this.dataObj.companyCity = cityArr[1];
      this.dataObj.companyCityCode = cityArr[0];
    },
    ...mapActions(["getCompanyId"])
  }
};
</script>

<style lang="stylus" scoped>
// .el-dialog__wrapper{
// display:none;
// }
.baseState {
  padding: 30px 88px;

  .h1_title {
    width: 111px;
    font-size: 18px;
    font-weight: bold;
    padding: 0 12px 23px 0;
    box-sizing: border-box;
  }

  .form_div {
    display: flex;

    >>>.el-form-item__content {
      width: 233px;
      margin-right: 66px;
    }
  }

  .form_div1 {
    width: 500px;
  }

  .item_title {
    margin-bottom: 6px;

    >>> .el-form-item__label {
      color: black;
      // font-size 16px;
    }
  }

  .spanInput {
    display: inline-block;
    width: 200px;
  }

  .next_btn {
    width: 600px;
    padding: 50px 0 88px;
    text-align: center;
  }
}

.team {
  padding: 30px 88px;

  .h1_title {
    width: 111px;
    font-size: 18px;
    font-weight: bold;
    padding: 0 12px 23px 0;
    box-sizing: border-box;
    color: black;
  }

  .fenge {
    height: 33px;
  }

  .add_btn {
    padding: 16px 0 24px;
  }

  .next_btn {
    width: 600px;
    padding: 50px 0 88px;
    text-align: center;
  }

  >>>.el-form {
    width: 388px;
    margin: auto;
  }

  >>>.el-table th {
    padding: 0;
  }
}

.market {
  padding: 30px 88px;

  .h1_title {
    color: #1f2f3d;
    width: 111px;
    font-size: 20px;
    font-weight: bold;
    padding: 0 12px 23px 0;
    box-sizing: border-box;
  }

  .h2_title {
    color: #1f2f3d;
    font-size: 16px;
    font-weight: bold;
    box-sizing: border-box;
    padding-bottom: 20px;
  }

  .form_div {
    display: flex;

    >>>.el-form-item__content {
      width: 233px;
      margin-right: 66px;
    }
  }

  .form_div1 {
    width: 500px;
  }

  .free_div {
    width: 388px;
    margin-bottom: 22px;
  }

  .children_div {
    padding-left: 40px;
  }

  .item_title {
    margin-bottom: 6px;

    >>> .el-form-item__label {
      color: black;
      // font-size 16px;
    }
  }

  .add_btn {
    padding: 16px 0 24px;
  }

  .spanInput {
    display: inline-block;
    width: 188px;
  }

  .next_btn {
    width: 600px;
    padding: 50px 0 88px;
    text-align: center;
  }

  .del_icon {
    cursor: pointer;
  }

  >>>.el-dialog {
    .el-form {
      width: 388px;
      margin: auto;
    }
  }

  >>>.el-checkbox {
    margin-left: 0px;
    width: 233px;
  }
}

.technology {
  padding: 30px 88px;

  .h1_title {
    width: 111px;
    font-size: 18px;
    font-weight: bold;
    padding: 0 12px 23px 0;
    box-sizing: border-box;
    color: black;
  }

  .children_div {
    width: 500px;
    padding-left: 40px;
    padding-bottom: 66px;
    box-sizing: border-box;
  }

  .next_btn {
    width: 600px;
    padding: 50px 0 88px;
    text-align: center;
  }
}

.financialState {
  padding: 30px 88px;

  .h1_title {
    color: #1f2f3d;
    width: 133px;
    font-size: 18px;
    font-weight: bold;
    padding: 0 12px 23px 0;
    box-sizing: border-box;
  }

  .children_div {
    padding-left: 40px;
    padding-bottom: 40px;
  }

  .next_btn {
    width: 600px;
    padding: 50px 0 88px;
    text-align: center;
  }
}

.capitalConstitute {
  padding: 30px 88px;

  .h1_title {
    font-size: 18px;
    font-weight: bold;
    padding: 0 12px 23px 0;
    box-sizing: border-box;
    color: black;
  }

  .item_title {
    margin-bottom: 6px;

    >>> .el-form-item__label {
      color: black;
      // font-size 16px;
    }
  }

  .children_div {
    padding-left: 40px;
  }

  .form_div {
    width: 388px;
  }

  .next_btn {
    width: 600px;
    padding: 50px 0 88px;
    text-align: center;
  }

  >>>.el-dialog {
    .el-form {
      width: 388px;
      margin: auto;
    }
  }
}

.businessModel {
  padding: 30px 88px;

  .h1_title {
    width: 111px;
    font-size: 18px;
    font-weight: bold;
    padding: 0 12px 23px 0;
    box-sizing: border-box;
  }

  .children_div {
    width: 500px;
    padding-left: 40px;
    padding-bottom: 20px;
    box-sizing: border-box;
  }

  .next_btn {
    width: 600px;
    padding: 50px 0 20px;
    text-align: center;
  }
}
</style>
