<template>
  <div>

    <!-- 查看详情 -->
    <div class="enterpriseDetails">
      <!-- 基本信息 -->
      <div class="baseState" v-show="active===0">
        <el-form label-width="150px" label-position="left">
          <div class="form_div1">
            <el-form-item label="公司名称：">
              <span>{{dataObj.basicDtlRespVO.companyName}}</span>
            </el-form-item>
            <el-form-item label="项目领域：">
              <!-- <span>{{dataObj.basicDtlRespVO.involvedDomain}}</span> -->
               <span v-if="dataObj.basicDtlRespVO.involvedDomain=='A'">土地</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='B'">资产</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='C'">消费</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='D'">企业服务</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='E'">教育</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='F'">医疗健康</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='G'">高科技</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='H'">智能硬件</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='I'">金融科技</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='J'">现代制造</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='K'">旅游</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='L'">O2O</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='M'">人工智能</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='N'">房产</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='O'">交通</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='P'">社交</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='Q'">体育</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='R'">物流</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='S'">能源</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='T'">共享经济</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='U'">区块链</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='V'">农业</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='W'">大数据</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='X'">其他</span>
                        <span v-if="dataObj.basicDtlRespVO.involvedDomain=='Y'">生活服务</span>
            </el-form-item>
          </div>
          <div class="form_div1">
            <el-form-item label="地址：">
              <span>{{dataObj.basicDtlRespVO.companyProvince}}{{dataObj.basicDtlRespVO.companyCity}}</span>
            </el-form-item>
            <el-form-item label="项目编号：">
              <span>{{dataObj.basicDtlRespVO.projectNo}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="详细地址：">
              <span>{{dataObj.basicDtlRespVO.companyDetailedAddress}}</span>
            </el-form-item>
          </div>
          <div class="form_div1">
            <el-form-item label="自然人股东：">
              <span>{{dataObj.basicDtlRespVO.individualShareholder}}</span>
            </el-form-item>
            <el-form-item label="法人控股人：">
              <span>{{dataObj.basicDtlRespVO.legalPersonHolding}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="统一社会信用代码：">
              <span>{{dataObj.basicDtlRespVO.socialCreditCode}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="注册时间：">
              <span>{{dataObj.basicDtlRespVO.registrationTime}}</span>
            </el-form-item>
          </div>
          <div class="form_div1">
            <el-form-item label="联系人：">
              <span>{{dataObj.basicDtlRespVO.linkName}}</span>
            </el-form-item>
            <el-form-item label="联系电话：">
              <span>{{dataObj.basicDtlRespVO.linkTel}}</span>
            </el-form-item>
          </div>
          <div class="form_div1">
            <el-form-item label="职工人数：">
              <span>{{dataObj.basicDtlRespVO.numberEmployees}}</span>
            </el-form-item>
            <el-form-item label="社保缴纳：">
              <span>{{dataObj.basicDtlRespVO.socialSecurityPayment}}</span>
            </el-form-item>
          </div>
          <div class="tag_div">
            <el-form-item label="福利政策：">
              <!-- <span>{{dataObj.basicDtlRespVO.welfarePolicy}}</span> -->
               <el-tag
                v-for="(item,index) in dataObj.basicDtlRespVO.welfarePolicyList"
                :key="index"
              >{{item}}</el-tag>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="融资轮次">
              <span v-if="dataObj.basicDtlRespVO.financeRound=='angel'">天使轮</span>
              <span v-if="dataObj.basicDtlRespVO.financeRound=='A'">A轮</span>
              <span v-if="dataObj.basicDtlRespVO.financeRound=='B'">B轮</span>
              <span v-if="dataObj.basicDtlRespVO.financeRound=='C'">C轮</span>
              <span v-if="dataObj.basicDtlRespVO.financeRound=='D'">D轮</span>
              <span v-if="dataObj.basicDtlRespVO.financeRound=='IPO'">IPO上市</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="营业执照图片：">
              <div class="imgs">
                <look-img
                  :imgUrl="item"
                  v-for="(item,index) in dataObj.basicDtlRespVO.businessLicense"
                  :key="index"
                />
              </div>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="许可性文件">
              <div class="imgs">
                <look-img
                  :imgUrl="item"
                  v-for="(item,index) in dataObj.basicDtlRespVO.licenseDocument"
                  :key="index"
                />
              </div>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="发起人/出资人协议：">
              <div class="imgs">
                <look-img
                  :imgUrl="item"
                  v-for="(item,index) in dataObj.basicDtlRespVO.investorAgreement"
                  :key="index"
                />
              </div>
            </el-form-item>
          </div>
          <div class="form_div2">
            <el-form-item label="下属公司："></el-form-item>
            <div class="table">
              <el-table
                :data="dataObj.basicDtlRespVO.subCompany"
                border
                :header-row-style="{height:'33px'}"
                :row-style="{height:'50px'}"
                :cell-style="{padding:0}"
                :header-cell-style="{'background-color':'#fafafa'}"
                style="width: 666px"
              >
                <el-table-column align="center" type="index"></el-table-column>
                <el-table-column
                  align="center"
                  :show-overflow-tooltip="true"
                  v-for="(item,index) in tableHeader.cHeader"
                  :key="index"
                  :prop="item.prop"
                  :label="item.label"
                  :min-width="item.width"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row[item.prop]}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="form_div2">
            <el-form-item label="工商变更："></el-form-item>
            <div class="table">
              <el-table
                :data="dataObj.basicDtlRespVO.industrialChange"
                border
                :header-row-style="{height:'33px'}"
                :row-style="{height:'50px'}"
                :cell-style="{padding:0}"
                :header-cell-style="{'background-color':'#fafafa'}"
                style="width: 666px"
              >
                <el-table-column align="center" type="index"></el-table-column>
                <el-table-column
                  align="center"
                  :show-overflow-tooltip="true"
                  v-for="(item,index) in tableHeader.gSHeader"
                  :key="index"
                  :prop="item.prop"
                  :label="item.label"
                  :min-width="item.width"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row[item.prop]}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="form_div2">
            <el-form-item label="股权变更："></el-form-item>
            <div class="table">
              <el-table
                :data="dataObj.basicDtlRespVO.stockChange"
                border
                :header-row-style="{height:'33px'}"
                :row-style="{height:'50px'}"
                :cell-style="{padding:0}"
                :header-cell-style="{'background-color':'#fafafa'}"
                style="width: 666px"
              >
                <el-table-column align="center" type="index"></el-table-column>
                <el-table-column
                  align="center"
                  :show-overflow-tooltip="true"
                  v-for="(item,index) in tableHeader.sHeader"
                  :key="index"
                  :prop="item.prop"
                  :label="item.label"
                  :min-width="item.width"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row[item.prop]}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="form_div2">
            <el-form-item label="注册资本变更："></el-form-item>
            <div class="table">
              <el-table
                :data="dataObj.basicDtlRespVO.registAmtChange"
                border
                :header-row-style="{height:'33px'}"
                :row-style="{height:'50px'}"
                :cell-style="{padding:0}"
                :header-cell-style="{'background-color':'#fafafa'}"
                style="width: 666px"
              >
                <el-table-column align="center" type="index"></el-table-column>
                <el-table-column
                  align="center"
                  :show-overflow-tooltip="true"
                  v-for="(item,index) in tableHeader.rHeader"
                  :key="index"
                  :prop="item.prop"
                  :label="item.label"
                  :min-width="item.width"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row[item.prop]}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="form_div2">
            <el-form-item label="法律诉讼："></el-form-item>
            <div class="table">
              <el-table
                :data="dataObj.basicDtlRespVO.lawAction"
                border
                :header-row-style="{height:'33px'}"
                :row-style="{height:'50px'}"
                :cell-style="{padding:0}"
                :header-cell-style="{'background-color':'#fafafa'}"
                style="width: 666px"
              >
                <el-table-column align="center" type="index"></el-table-column>
                <el-table-column
                  align="center"
                  :show-overflow-tooltip="true"
                  v-for="(item,index) in tableHeader.lHeader"
                  :key="index"
                  :prop="item.prop"
                  :label="item.label"
                  :min-width="item.width"
                >
                  <template slot-scope="scope">
                    <span>{{scope.row[item.prop]}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="form_div">
            <el-form-item label="预期的诉讼仲裁：">
              <span>{{dataObj.basicDtlRespVO.litigationArbitration}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="公司架构：">
              <div class="imgs">
                <look-img
                  :imgUrl="item"
                  v-for="(item,index) in dataObj.basicDtlRespVO.corporateArchitecture"
                  :key="index"
                />
              </div>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="公司组织机构：">
              <div class="imgs">
                <look-img
                  :imgUrl="item"
                  v-for="(item,index) in dataObj.basicDtlRespVO.companyOrganization"
                  :key="index"
                />
              </div>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="公司logo：" v-if="dataObj.basicDtlRespVO.comLogo">
              <div class="imgs">
                <look-img
                  :imgUrl="$store.state.user.ip+dataObj.basicDtlRespVO.comLogo"
                />
              </div>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="team" v-show="active===1">
        <el-form label-width="150px" label-position="left">
          <el-form-item label="人员构成：">
            <div class="imgs">
              <look-img
                :imgUrl="item"
                v-for="(item,index) in dataObj.teamRespVO.teamStructureImg"
                :key="index"
              />
            </div>
          </el-form-item>
          <div class="form_div2">
            <el-form-item label="履历分析："></el-form-item>
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
              </div>

          </div>
        </el-form>
      </div>
      <div class="market" v-show="active===2">
        <el-form label-width="150px" label-position="left">
          <div class="form_div">
            <el-form-item label="项目名称：">
              <span>{{dataObj.financingMarketReqVO.projectName}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="商业模式创新：">
              <span>{{dataObj.financingMarketReqVO.bizModelCre}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="价格定位：">
              <span>{{dataObj.financingMarketReqVO.priceLocation}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="产业链角色：">
              <span>{{dataObj.financingMarketReqVO.industryChain}}</span>
            </el-form-item>
          </div>
          <div class="tag_div">
            <el-form-item label="属性标签：">
              <el-tag
                v-for="(item,index) in dataObj.financingMarketReqVO.attributeTagList"
                :key="index"
              >{{item}}</el-tag>
            </el-form-item>
          </div>
          <div class="tag_div">
            <el-form-item label="属性标签2：">
              <el-tag
                v-for="(item,index) in dataObj.financingMarketReqVO.attributeTagTwoList"
                :key="index"
              >{{item}}</el-tag>
            </el-form-item>
          </div>
          <div class="form_div1">
            <el-form-item label="市场痛点：">
              <span>{{dataObj.financingMarketReqVO.marketPainSpot}}</span>
            </el-form-item>
            <el-form-item label="是否真实：">
              <span>{{dataObj.financingMarketReqVO.isReal}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="痛点真伪：">
              <span>{{dataObj.financingMarketReqVO.painAuthenticity}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="单用户利用率：">
              <span>{{dataObj.financingMarketReqVO.singleCuRate}}</span>
            </el-form-item>
          </div>
          <div class="children_div">
            <h2 class="h2_title">1.粗加工</h2>
            <div class="form_div">
              <el-form-item label="资本：">
                <span>{{dataObj.financingMarketReqVO.roughMachiningCapital}}</span>
              </el-form-item>
            </div>
            <div class="form_div">
              <el-form-item label="方法：">
                <span>{{dataObj.financingMarketReqVO.methods}}</span>
              </el-form-item>
            </div>
          </div>
          <div class="children_div">
            <h2 class="h2_title">2.深加工</h2>
            <div class="form_div">
              <el-form-item label="技术：">
                <span>{{dataObj.financingMarketReqVO.technology}}</span>
              </el-form-item>
            </div>
          </div>
          <div class="children_div">
            <h2 class="h2_title">3.渠道商</h2>
            <div class="form_div">
              <el-form-item label="强大的渠道能力：">
                <span>{{dataObj.financingMarketReqVO.channelCapacity}}</span>
              </el-form-item>
            </div>
            <div class="form_div">
              <el-form-item label="影响力：">
                <span>{{dataObj.financingMarketReqVO.influence}}</span>
              </el-form-item>
            </div>
            <div class="form_div">
              <el-form-item label="渠道商资本：">
                <span>{{dataObj.financingMarketReqVO.distributorsCapital}}</span>
              </el-form-item>
            </div>
          </div>
          <div class="children_div">
            <h2 class="h2_title">4.终端</h2>
            <div class="form_div">
              <el-form-item label="销售：">
                <span>{{dataObj.financingMarketReqVO.terminalSales}}</span>
              </el-form-item>
            </div>
          </div>
          <div class="form_div">
            <el-form-item label="技术壁垒：">
              <span>{{dataObj.financingMarketReqVO.protectTechnicalBarriers}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="规模壁垒：">
              <span>{{dataObj.financingMarketReqVO.scaleBarriers}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="产品发布会：">
              <div v-for="(item,index) in dataObj.financingMarketReqVO.productLaunchList" :key="index">
                <span >
                  {{item}}
                </span>
              </div>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="会销：">
              <span>{{dataObj.financingMarketReqVO.willPin}}</span>
            </el-form-item>
          </div>
          <div class="tag_div">
            <el-form-item label="技术壁垒：">
              <el-tag
                v-for="(item,index) in dataObj.financingMarketReqVO.cutTechnicalBarriersList"
                :key="index"
              >{{item}}</el-tag>
              <!-- <div style="width:500px">
                <span>{{dataObj.financingMarketReqVO.cutTechnicalBarriersContent}}</span>

              </div> -->
              <div class="children_div" style="width:500px">
              <el-input
              type="textarea"
              :rows="6"
              v-model="dataObj.financingMarketReqVO.cutTechnicalBarriersContent"
              disabled
              >
              </el-input>
            </div>
            </el-form-item>
          </div>
          <div class="tag_div">
            <el-form-item label="贸易壁垒：">
              <el-tag
                v-for="(item,index) in dataObj.financingMarketReqVO.cutBarriersTradeList"
                :key="index"
              >{{item}}</el-tag>
            </el-form-item>
          </div>
          <div class="tag_div">
            <el-form-item label="营销手段：">
              <el-tag
                v-for="(item,index) in dataObj.financingMarketReqVO.marketinglist"
                :key="index"
              >{{item}}</el-tag>
            </el-form-item>
          </div>
           <div class="form_div2">
            <el-form-item label="传播效率："></el-form-item>
              <div class="children_div">
                <el-table
                  :data="cutTable"
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
                    v-for="(item,index) in marketHeader"
                    :key="index"
                    :label="item.label"
                    :prop="item.prop"
                  ></el-table-column>
                </el-table>
              </div>

          </div>
          <div class="form_div">
            <el-form-item label="活跃度：">
              <span>{{dataObj.financingMarketReqVO.operatingActive}}人</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="单个用户输出价值：">
              <span>{{dataObj.financingMarketReqVO.userValue}}</span>
            </el-form-item>
          </div>
          <div class="form_div2">
            <el-form-item label="增量："></el-form-item>
              <div class="children_div">
                <el-table
                  :data="incrementalTable"
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
                    v-for="(item,index) in marketHeader"
                    :key="index"
                    :label="item.label"
                    :prop="item.prop"
                  ></el-table-column>
                </el-table>
              </div>
          </div>
           <div class="form_div2">
            <el-form-item label="流失："></el-form-item>
              <div class="children_div">
                <el-table
                  :data="leaveTable"
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
                    v-for="(item,index) in marketHeader"
                    :key="index"
                    :label="item.label"
                    :prop="item.prop"
                  ></el-table-column>
                </el-table>
              </div>
          </div>
          <div class="form_div">
            <el-form-item label="0-1-2-5-0：">
              <span>{{dataObj.financingMarketReqVO.userNumber}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="所处阶段：">
              <span>{{dataObj.financingMarketReqVO.phase}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="数据验收：">
              <span>{{dataObj.financingMarketReqVO.dataAcceptance}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="方案合理性：">
              <span>{{dataObj.financingMarketReqVO.programRationality}}人</span>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="technology" v-show="active === 3">
        <el-form label-width="150px" label-position="left">
          <el-form-item label="系统性创新："></el-form-item>
            <div class="children_div" style="width:500px">
              <el-input
              type="textarea"
              :rows="6"
              v-model="dataObj.technologyReqVO.systematicInnovation"
              disabled
              >
              </el-input>
            </div>
          <el-form-item label="技术迭代："></el-form-item>
            <div class="children_div" style="width:500px">
              <el-input
              type="textarea"
              :rows="6"
              v-model="dataObj.technologyReqVO.technologyIteration"
              disabled
              >
              </el-input>
            </div>
        </el-form>
      </div>
       <div class="financialState" v-show="active === 4">
        <el-form label-width="150px" label-position="left">
          <el-form-item label="资产负载表：">
            <div class="imgs">
              <look-img
                :imgUrl="item"
                v-for="(item,index) in dataObj.financialSituationReqVO.balanceSheetImg"
                :key="index"
              />
            </div>
          </el-form-item>
          <el-form-item label="利润表：">
            <div class="imgs">
              <look-img
                :imgUrl="item"
                v-for="(item,index) in dataObj.financialSituationReqVO.incomeStatementImg"
                :key="index"
              />
            </div>
          </el-form-item>
          <el-form-item label="现金流表：">
            <div class="imgs">
              <look-img
                :imgUrl="item"
                v-for="(item,index) in dataObj.financialSituationReqVO.cashFlowImg"
                :key="index"
              />
            </div>
          </el-form-item>
          <el-form-item label="财务报表：">
            <div class="imgs">
              <look-img
                :imgUrl="item"
                v-for="(item,index) in dataObj.financialSituationReqVO.financialStatementsImg"
                :key="index"
              />
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="capitalConstitute" v-show="active === 5">
        <el-form label-width="180px" label-position="left">
          <el-form-item label="基础资本框架图：">
            <div class="imgs">
              <look-img
                :imgUrl="item"
                v-for="(item,index) in dataObj.compositionReqVO.basicCapitalFramework"
                :key="index"
              />
            </div>
          </el-form-item>
          <div class="form_div2">
            <el-form-item label="未来股东计划："></el-form-item>
              <div class="children_div">
                <el-table
                  :data="dataObj.compositionReqVO.futureHolderPlan"
                  border
                  :header-row-style="{height:'33px'}"
                  :row-style="{height:'50px'}"
                  :cell-style="{padding:0}"
                  :header-cell-style="{'background-color':'#fafafa'}"
                  style="width: 666px"
                >
                <el-table-column align="center" type="index"></el-table-column>
                  <el-table-column
                    align="center"
                    :show-overflow-tooltip="true"
                    v-for="(item,index) in cHeader"
                    :key="index"
                    :label="item.label"
                    :prop="item.prop"
                    :min-width="item.width"
                  >
                  <template slot-scope="scope">
                    <span>{{scope.row[item.prop]}}</span>
                  </template>
                  </el-table-column>
                </el-table>
              </div>
          </div>
            <div>
              <el-form-item label="资本库："></el-form-item>
              <div class="children_div" style="width:500px">
                <h1>1.资本</h1>
                <el-input
                type="textarea"
                :rows="6"
                v-model="dataObj.compositionReqVO.capitalLibrary"
                disabled
                >
                </el-input>
                <h1>2.董秘</h1>
                <el-input
                type="textarea"
                :rows="6"
                v-model="dataObj.compositionReqVO.chairmanSecretary"
                disabled
                >
                </el-input>
              </div>
            </div>
            <div>
              <el-form-item label="财务指标："></el-form-item>
              <h1 class="caiwu">1.财务节点:</h1>
               <div class="imgs">
              <look-img
                :imgUrl="item"
                v-for="(item,index) in dataObj.compositionReqVO.financialNode"
                :key="index"
              />
            </div>
            <h2 class="wenti">2.问题节点:</h2>
            <div class="children_div" style="width:500px">
              <el-input
                type="textarea"
                :rows="6"
                v-model="dataObj.compositionReqVO.problemNode"
                disabled
                >
                </el-input>
            </div>
            </div>
        </el-form>
      </div>
       <div class="businessModel" v-show="active === 6">
        <el-form label-width="180px" label-position="left">
          <div>
            <el-form-item label="商业伦理："></el-form-item>
            <div class="children_div" style="width:500px">
              <el-input
              type="textarea"
              :rows="6"
              v-model="dataObj.bizModelReqVO.businessEthics"
              disabled
              >
              </el-input>
            </div>
          </div>
          <div>
            <el-form-item label="商业规律："></el-form-item>
            <div class="children_div" style="width:500px">
              <el-input
              type="textarea"
              :rows="6"
              v-model="dataObj.bizModelReqVO.commercialLaw"
              disabled
              >
              </el-input>
            </div>
          </div>
          <div>
            <el-form-item label="客观规律："></el-form-item>
            <div class="children_div" style="width:500px">
              <el-input
              type="textarea"
              :rows="6"
              v-model="dataObj.bizModelReqVO.objectiveLaws"
              disabled
              >
              </el-input>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  baseHeader,
  teamHeader,
  marketHeader,
  cHeader
} from "@/components/EnterpriseData/table/tableHeader";
import TableList from "@/components/EnterpriseData/table/table";
import LookImg from "@/components/Common/lookImg.vue";
export default {
  components: {
    LookImg,
    TableList
  },
  data() {
    return {
      tableHeader: baseHeader,
      teamHeader,
      marketHeader,
      cHeader
    };
  },
  props: {
    dataObj: {
      type: Object
    },
    teamTable: {
      type: Array
    },
    active:{},
    cutTable:{
      type:Array
    },
    leaveTable:{
      type:Array
    },
    incrementalTable:{
      type:Array
    }
  },

};
</script>

<style lang="stylus" scoped>
.enterpriseDetails {
  width: 88%;
  margin: auto;
  padding-left 200px;
  padding-top: 50px;
  box-sizing: border-box;
}

.form_div1 {
  display: flex;

  >>>.el-form-item__content {
    width: 233px;
    margin-right: 66px;
  }
}

.form_div {
  width: 500px;
}

.imgs {
  display: flex;
}

.table {
  margin-left: 40px;
}

.team {
  >>>.el-form-item__label {
    font-size: 18px;
    font-weight: bold;
    color: #1f2f3d;
  }
}
.financialState {
  >>>.el-form-item__label {
    font-size: 18px;
    font-weight: bold;
    color: #1f2f3d;
  }
}
.technology {
  >>>.el-form-item__label {
    font-size: 18px;
    font-weight: bold;
    color: #1f2f3d;
    margin-left :-20px;
  }
}
.businessModel {
  >>>.el-form-item__label {
    font-size: 18px;
    font-weight: bold;
    color: #1f2f3d;
    margin-left :-20px;
  }
}
.caiwu{
    margin-bottom :20px;
  }
.wenti{
  margin-top:20px;
  }
.capitalConstitute{
  >>>.el-form-item__label {
    font-size: 18px;
    font-weight: bold;
    color: #1f2f3d;
    margin-left :-20px;
  }
}
.tag_div {
  .el-tag + .el-tag {
    margin-left: 10px;
  }
}
.h2_title{
  font-size :16px;
  font-weight: bold;
  color: #1f2f3d;
  margin-left :-30px;
  margin-bottom :10px;
}
.children_div{
>>>.el-textarea__inner{
    resize :none;
    background-color :white;
    color:#000;
    height :150px;
    border:0;
    padding:10px 0 0 0;
}
}



</style>
