<template>
    <div class="publishProject">
        <div class="projectForm">
            <div class="baseInfo">
                <el-form :model="dataObj" status-icon  ref="projectForm" size="medium" label-width="133px">
                    <div class="form_div">
                        <el-form-item label="项目分类" prop="projectTypeCode">
                            <el-select v-model="dataObj.projectTypeCode" placeholder="请选择">
                                <el-option
                                    v-for="item in initData.pubProjectBaseInitRespVO.projectCategoryList"
                                    :key="item.typeCode"
                                    :label="item.typeName"
                                    :value="item.typeCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="项目领域" prop="involvedDomain">
                            <el-select v-model="dataObj.involvedDomain" placeholder="请选择">
                                <el-option
                                    v-for="item in initData.myPreferenceInitRespVO.domainList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="form_div">
                        <el-form-item label="项目名称" prop="projectName">
                            <el-input v-model="dataObj.projectName" type="text" placeholder="项目名称"></el-input>
                        </el-form-item>
                        <el-form-item label="权重" prop="homeRecommend">
                            <el-input v-model="dataObj.homeRecommend" type="text" placeholder=""></el-input>
                        </el-form-item>
                    </div>
                    <div class="form_div1">
                        <el-form-item label="公司" prop="comName">
                            <el-input v-model="dataObj.comName" type="text" placeholder=""></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="地址">
                            <el-select v-model="provinceInfo" @change="changeProvince" placeholder="请选择">
                                <el-option
                                    v-for="item in province"
                                    :key="item.value"
                                    :label="item.text"
                                    :value="item.value+','+item.text"
                                >
                                </el-option>
                            </el-select>
                            <span style="padding:0 20px">省</span>

                            <el-select v-model="cityInfo" @change="changeCity" placeholder="请选择">
                                <el-option
                                    v-for="item in city"
                                    :key="item.value"
                                    :label="item.text"
                                    :value="item.value+','+item.text"
                                >
                                </el-option>
                            </el-select>
                            <span style="padding:0 20px">市</span>
                        </el-form-item>
                    </div>
                    <div class="form_div1">
                        <el-form-item label="详细地址" prop="comAddrDtl">
                            <el-input v-model="dataObj.comAddrDtl" type="text" placeholder=""></el-input>
                        </el-form-item>
                    </div>
                    <div class="form_div1" v-if="dataObj.projectTypeCode !== 3000">
                        <el-form-item label="面积" prop="landAcreage">
                            <span class="spanInput">
                                <el-input v-model="dataObj.landAcreage" type="text" placeholder="">
                                    <span slot="suffix">&nbsp;㎡&nbsp;</span>
                                </el-input>
                            </span>
                        </el-form-item>
                    </div>
                    <div class="form_div1">
                        <el-form-item label="项目需求" prop="projectRequirement">
                            <el-select v-model="dataObj.projectRequirement" placeholder="请选择">
                                <el-option
                                    v-for="item in initData.pubProjectBaseInitRespVO.projectRequirementList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="form_div1">
                        <el-form-item label="总价" prop="startAmt">
                            <div class="form_divM">
                                <span class="spanInput">
                                    <el-input :disabled="checkedM" v-model="dataObj.startAmt" type="text" placeholder="">
                                        <span slot="suffix">&nbsp;万元&nbsp;</span>
                                    </el-input>
                                </span>
                                <el-checkbox v-model="checkedM">面议</el-checkbox>
                            </div>
                        </el-form-item>
                    </div>
                    <div class="form_div">
                        <el-form-item label="联系人" prop="linkMan">
                            <el-input v-model="dataObj.linkMan" type="text" placeholder="联系人"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人电话" prop="linkTel">
                            <el-input v-model="dataObj.linkTel" type="text" placeholder="联系人电话"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form_div1">
                        <el-form-item label="详细信息" prop="dtlInf">
                            <el-input
                                type="textarea"
                                :rows="6"
                                placeholder="请输入内容"
                                v-model="dataObj.dtlInf">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="标签" prop="tagCodeList">
                            <el-checkbox-group v-model="dataObj.tagCodeList">
                                <el-checkbox :label="item.code" v-for="(item,index) in initData.tagInfList" :key="index">{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </div>
                    <div class="tag_div" >
                        <el-form-item label="关键字" prop="keyWordList">
                            <el-tag
                                :key="tag"
                                v-for="tag in dataObj.keyWordList"
                                closable
                                @close="delTag(tag)">
                                {{tag}}
                            </el-tag>
                            <span v-if="dataObj.keyWordList.length < 3">
                                <el-input
                                    class="input-new-tag"
                                    v-if="tabVisible"
                                    v-model="tabValue"
                                    ref="saveTagInput"
                                    size="small"
                                    @keyup.enter.native="handleInputConfirm"
                                    @blur="handleInputConfirm"
                                >
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput">点击添加关键字</el-button>
                            </span>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="图片">
                            <upload-img :more="true" :imgList="showImg" @uploadFuc="uploadFuc" @delImg="delImg"/>
                        </el-form-item>
                    </div>
                </el-form>
            </div>

            <div class="border"></div>

            <div class="A_information" v-show="dataObj.projectTypeCode === 1000">
                <el-form :model="a_obj" status-icon  ref="A_form" size="medium" label-width="133px">
                    <div class="form_div1">
                        <el-form-item label="资产描述" prop="assetDesc">
                                <el-input v-model="a_obj.assetDesc" type="text" placeholder="资产描述"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="资产类别" prop="category">
                            <el-select v-model="a_obj.category" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in initData.pubProjectAInitRespVO.assetCategoryList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="权属性质" prop="ownerProperty">
                            <el-select v-model="a_obj.ownerProperty" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in initData.pubProjectAInitRespVO.ownerPropertyList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="form_div1">
                        <el-form-item label="权证编号" prop="warrantNo">
                                <el-input v-model="a_obj.warrantNo" type="text" placeholder="权证编号(18位)"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="规划用途" prop="planPurpose">
                            <el-select v-model="a_obj.planPurpose" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in initData.pubProjectAInitRespVO.usePurposeList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="目前用途" prop="currentPurpose">
                            <el-select v-model="a_obj.currentPurpose" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in initData.pubProjectAInitRespVO.usePurposeList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="配套" prop="supporting">
                            <el-select v-model="a_obj.supporting" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in initData.pubProjectAInitRespVO.supportingList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="form_div1">
                        <el-form-item label="建筑面积" prop="buildAcreage">
                            <span class="spanInput">
                                <el-input v-model="a_obj.buildAcreage" type="text" placeholder="建筑面积">
                                    <span slot="suffix">㎡</span>
                                </el-input>
                            </span>
                        </el-form-item>
                    </div>
                    <div class="form_div1">
                        <el-form-item label="使用期限">
                            <el-date-picker
                                v-model="time"
                                value-format="yyyy-MM-dd"
                                type="daterange"
                                :editable="false"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="共有情况" prop="ownedStatus">
                            <el-radio-group v-model="a_obj.ownedStatus">
                                <el-radio :label="item.code" v-for="item in initData.pubProjectAInitRespVO.hasOrNotList" :key="item.code">{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="抵押、租赁等其他项权利情况" prop="pledgeStatus" label-width="260px" >
                            <el-radio-group v-model="a_obj.pledgeStatus">
                                <el-radio :label="item.code" v-for="item in initData.pubProjectAInitRespVO.hasOrNotList" :key="item.code">{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="权利人是否行驶优先受让权" prop="hasUsePriority" label-width="245px" >
                            <el-radio-group v-model="a_obj.hasUsePriority">
                                <el-radio :label="item.code" v-for="item in initData.pubProjectAInitRespVO.yesOrNoList" :key="item.code">{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="授权书" prop="authorizationLetter" >
                            <upload-img
                                :type="{class:dataObj.projectTypeCode,type:'A_sqsImg'}"
                                :showImage="a_obj.authorizationLetter?$store.state.user.ip+a_obj.authorizationLetter:''"
                                @uploadFuc="uploadFuc"
                            />
                        </el-form-item>
                    </div>
                </el-form>
            </div>

            <div class="B_information" v-show="dataObj.projectTypeCode === 2000">
                <el-form :model="b_obj" status-icon  ref="B_form" size="medium" label-width="133px">
                    <div class="form_div1">
                        <el-form-item label="绿化率" prop="greeningRate">
                            <span class="spanInput">
                                <el-input v-model="b_obj.greeningRate" type="text" placeholder="绿化率">
                                    <span slot="suffix">&nbsp;%&nbsp;</span>
                                </el-input>
                            </span>
                        </el-form-item>
                    </div>
                    <div class="form_div1">
                        <el-form-item label="容积率" prop="volumeRate">
                            <span class="spanInput">
                                <el-input v-model="b_obj.volumeRate" type="text" placeholder="容积率"></el-input>
                            </span>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="是否净地" prop="isTroublesome">
                            <el-radio-group v-model="b_obj.isTroublesome">
                                <el-radio :label="item.code" v-for="item in initData.pubProjectBInitRespVO.yesOrNoList" :key="item.value">{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="出让方式" prop="transferMethod">
                            <el-select v-model="b_obj.transferMethod" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in initData.pubProjectBInitRespVO.transferMethodList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="土地使用性质" prop="useLimit">
                            <el-select v-model="b_obj.useLimit" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in initData.pubProjectBInitRespVO.landUseLimitList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="配套" prop="supporting">
                            <el-select v-model="b_obj.supporting" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in initData.pubProjectBInitRespVO.supportingList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="不动产使用证" prop="landUseCertificate" label-width="160px">
                            <upload-img
                                :type="{class:dataObj.projectTypeCode,type:'B_bdcImg'}"
                                :showImage="b_obj.landUseCertificate?$store.state.user.ip+b_obj.landUseCertificate:''"
                                @uploadFuc="uploadFuc"
                            />
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="建设用地规划许可证" prop="buildCertificate" label-width="160px">
                            <upload-img
                                :type="{class:dataObj.projectTypeCode,type:'B_xkzImg'}"
                                :showImage="b_obj.buildCertificate?$store.state.user.ip+b_obj.buildCertificate:''"
                                @uploadFuc="uploadFuc"
                            />
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="建设用地批准书" prop="landApprovalCertificate" label-width="160px">
                            <upload-img
                                :type="{class:dataObj.projectTypeCode,type:'B_pzsImg'}"
                                :showImage="b_obj.landApprovalCertificate?$store.state.user.ip+b_obj.landApprovalCertificate:''"
                                @uploadFuc="uploadFuc"
                            />
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="授权书" prop="authorizationLetter" label-width="160px">
                            <upload-img
                                :type="{class:dataObj.projectTypeCode,type:'B_sqsImg'}"
                                :showImage="b_obj.authorizationLetter?$store.state.user.ip+b_obj.authorizationLetter:''"
                                @uploadFuc="uploadFuc"
                            />
                        </el-form-item>
                    </div>

                </el-form>
            </div>

            <div class="C_information" v-show="dataObj.projectTypeCode === 3000">
                <el-form :model="c_obj" status-icon  ref="C_form" size="medium" label-width="133px">
                    <div class="form_div1">
                        <el-form-item label="企业名称" prop="comName">
                            <span class="spanInput">
                                <el-input v-model="c_obj.comName" type="text" placeholder="企业名称"></el-input>
                            </span>
                        </el-form-item>
                    </div>
                    <div class="form_div1">
                        <el-form-item label="注册地址" prop="registAddr">
                            <span class="spanInput">
                                <el-input v-model="c_obj.registAddr" type="text" placeholder="注册地址"></el-input>
                            </span>
                        </el-form-item>
                    </div>
                    <div class="form_div1">
                        <el-form-item label="法定代表人" prop="legalPerson">
                            <span class="spanInput">
                                <el-input v-model="c_obj.legalPerson" type="text" placeholder="法定代表人"></el-input>
                            </span>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="成立时间" prop="establishTime">
                            <el-date-picker
                            v-model="c_obj.establishTime"
                            value-format="yyyy-MM-dd"
                            :editable="false"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="form_div1">
                        <el-form-item label="注册资本" prop="registAmt">
                            <span class="spanInput">
                                <el-input v-model="c_obj.registAmt" type="text" placeholder="注册资本">
                                    <span slot="suffix">&nbsp;万元&nbsp;</span>
                                </el-input>
                            </span>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="经济类型" prop="economicType">
                            <el-select v-model="c_obj.economicType" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in initData.pubProjectCInitRespVO.economicTypeList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="公司类型" prop="comType">
                            <el-select v-model="c_obj.comType" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in initData.pubProjectCInitRespVO.companyTypeList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="经营规模" prop="manageScale">
                            <el-select v-model="c_obj.manageScale" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in initData.pubProjectCInitRespVO.manageScaleList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="form_div1">
                        <el-form-item label="统一社会信用代码或组织机构代码" prop="orgCode" label-width="288px">
                            <el-input v-model="c_obj.orgCode" type="text" placeholder="请输入"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form_div1">
                        <el-form-item label="经营范围" prop="manageRange" >
                            <el-input v-model="c_obj.manageRange" type="text" placeholder="请输入"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form_div1">
                        <el-form-item label="职工人数" prop="employeeNum">
                            <span class="spanInput">
                                <el-input v-model="c_obj.employeeNum" type="text" placeholder="职工人数">
                                    <span slot="suffix">&nbsp;人&nbsp;</span>
                                </el-input>
                            </span>
                        </el-form-item>
                    </div>
                    <div class="form_div2">
                        <div class="trading_title">
                            <el-form-item label="交易条件"></el-form-item>
                        </div>
                        <div class="form_div3">
                            <el-form-item label="1.支付方式" prop="dealPayMethod" label-width="105px">
                                <el-select v-model="c_obj.dealPayMethod" clearable placeholder="请选择">
                                    <el-option
                                        v-for="item in initData.pubProjectCInitRespVO.dealPayMethodList"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="2.对转让标的企业职工是否有继续聘用要求" prop="employeeContinue" label-width="300px">
                                <el-radio-group v-model="c_obj.employeeContinue">
                                    <el-radio :label="item.code" v-for="item in initData.pubProjectCInitRespVO.yesOrNoList" :key="item.code">{{item.name}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="3.对转让标的企业存续发展方面是否有要求" prop="renewRequire" label-width="300px">
                                <el-radio-group v-model="c_obj.renewRequire">
                                    <el-radio :label="item.code" v-for="item in initData.pubProjectCInitRespVO.yesOrNoList" :key="item.code">{{item.name}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="4.产权转让涉及的售权售务处置是否有要求" prop="serviceRequire" label-width="300px">
                                <el-radio-group v-model="c_obj.serviceRequire">
                                    <el-radio :label="item.code" v-for="item in initData.pubProjectCInitRespVO.yesOrNoList" :key="item.code">{{item.name}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="form_div2">
                        <div class="trading_title">
                            <el-form-item label="受让方资格条件(多选)" label-width="210px"></el-form-item>
                        </div>
                        <div class="form_div3">
                            <el-form-item prop="transfereeConditionList" label-width="0">
                                <el-checkbox-group v-model="c_obj.transfereeConditionList">
                                    <p class="check_p" v-for="item in initData.pubProjectCInitRespVO.transferConditionList" :key="item.code">
                                        <el-checkbox :label="item.code">{{item.name}}</el-checkbox>
                                    </p>
                                </el-checkbox-group>
                            </el-form-item>
                        </div>
                    </div>
                    <div>
                        <el-form-item label="授权书" prop="authorizationLetter">
                            <upload-img
                                :type="{class:dataObj.projectTypeCode,type:'C_sqsImg'}"
                                :showImage="c_obj.authorizationLetter?$store.state.user.ip+c_obj.authorizationLetter:''"
                                @uploadFuc="uploadFuc"
                            />
                        </el-form-item>
                    </div>

                </el-form>
            </div>
            <div class="submitBtn">
                <el-button type="primary" @click="previewFuc">预览</el-button>
                <el-button @click="resetForm('projectForm','A_form','B_form','C_form')">重置</el-button>
            </div>
        </div>

        <project-dialog ref="previewDialog" @submitFuc="submitFuc"/>
    </div>
</template>

<script>
import UploadImg from '@/components/UploadImg/uploadImg'
import {provinceList,cityList} from '@/files/js/areaData'
import ProjectDialog from '@/components/Project/dialog/projectDialog'
import {upload,publishProject,pubProjectInit} from '@/api'
import {cloneObj} from '@/files/js/cloneObj'
import {findCode,findCodeArr,sortArr} from '@/files/js/findCode'
export default {
    components:{
        UploadImg,
        ProjectDialog
    },
    data(){
        return{
            initData:{
                myPreferenceInitRespVO:{},
                pubProjectBaseInitRespVO:{},
                pubProjectAInitRespVO:{},
                pubProjectBInitRespVO:{},
                pubProjectCInitRespVO:{},
                tagInfList:[]
            },

            checkedM:false,  //是否面议
            tabVisible: false,  //添加标签
            tabValue: '',
            showImg:[],
            dataObj:{
                projectTypeCode:1000,    //类别
                involvedDomain:"",  //项目领域
                projectName:"",  //名字
                homeRecommend:0,  //权重
                comName:"",  //公司
                comProvince:"",  //省
                comProvinceCode:"",//省 区号
                comCity:"", //市
                comCityCode:"", //市 区号
                comAddrDtl:"",  //详细地址
                landAcreage :"",  //面积
                projectRequirement :"", //项目需求
                isConfer:0,  //面议
                startAmt:"",   //总价
                linkMan :"",  //联系人
                linkTel :"",  //联系人电话
                dtlInf :"",  //详细信息
                tagCodeList:[], //标签
                keyWordList:[],  //关键字
                imageList:[],  //上传图片的列表
            },
            a_obj:{
                assetDesc:"",    //资产描述
                category:"",  //资产类别
                ownerProperty:"", //权属性质
                warrantNo:"", //权证编号
                planPurpose:"",  //规划用途
                currentPurpose:"",  //当前用途
                supporting:"",  //配套
                buildAcreage:"", //建筑面积
                startUseTime:"", //开始期限
                endUseTime:"",  //结束期限
                ownedStatus:"", //共有情况
                pledgeStatus:"", //抵押情况
                hasUsePriority:"", //是否行驶优先权
                authorizationLetter:"", //授权书
            },
            b_obj:{
                greeningRate :"", //绿化率
                volumeRate :"", //容积率
                isTroublesome:"", //是否净地
                transferMethod :"", //出让方式
                useLimit :"",  //使用性质
                supporting :"",  //配套

                landUseCertificate :"",  //不动产使用证
                buildCertificate :"",  //建设证
                landApprovalCertificate :"",  //建设批准书
                authorizationLetter :"",  //授权书
            },
            c_obj:{
                comName :"",  //企业名称
                registAddr:"", //注册地址
                legalPerson :"",  //法定代表人
                establishTime :"",  //成立时间
                registAmt :"", //注册资本
                economicType :"",//经济类型
                comType :"",  //公司类型
                manageScale :"",  //经营规模
                orgCode :"",  //机构代码
                manageRange :"", //经营范围
                employeeNum:"", //职工人数
                dealPayMethod :"",  //支付方式
                employeeContinue :"", // 职工留用/转让
                renewRequire :"",//对企业续存发展是否有要求
                serviceRequire :"", // 产权转让涉及的售权售务处置是否有要求
                transfereeConditionList :[], //受让方资格条件
                authorizationLetter:"",  //授权书
            },

            //省 市下拉框
            province:provinceList,
            city:[],
            time:[],
            provinceInfo:"",
            cityInfo:"",
        }
    },
    created(){
        //初始化项目选项数据
        pubProjectInit({projectCategoryCode:0}).then(res=>{
            if(res.errorCode === 0){
                this.initData=res.body
            }
        })
    },
    methods:{
        previewFuc(){
            this.dataObj.isConfer = this.checkedM ? 1 : 0  //面议
            sortArr(this.dataObj.tagCodeList)
            let baseObj = cloneObj(this.dataObj)
            let Ainit = this.initData.pubProjectAInitRespVO
            let Binit = this.initData.pubProjectBInitRespVO
            let Cinit = this.initData.pubProjectCInitRespVO
            baseObj.involvedDomain=findCode(this.initData.myPreferenceInitRespVO.domainList,this.dataObj.involvedDomain)
            baseObj.projectRequirement=findCode(this.initData.pubProjectBaseInitRespVO.projectRequirementList,this.dataObj.projectRequirement)
            baseObj.tagCodeList=findCodeArr(this.initData.tagInfList,this.dataObj.tagCodeList)
            baseObj.imageList = this.showImg
            if(this.dataObj.projectTypeCode === 1000){
                this.a_obj.startUseTime = this.time[0]
                this.a_obj.endUseTime = this.time[1]
                baseObj.modelReqVO = cloneObj(this.a_obj)
                baseObj.modelReqVO.category = findCode(Ainit.assetCategoryList,this.a_obj.category)
                baseObj.modelReqVO.ownerProperty = findCode(Ainit.ownerPropertyList,this.a_obj.ownerProperty)
                baseObj.modelReqVO.planPurpose = findCode(Ainit.usePurposeList,this.a_obj.planPurpose)
                baseObj.modelReqVO.currentPurpose = findCode(Ainit.usePurposeList,this.a_obj.currentPurpose)
                baseObj.modelReqVO.supporting = findCode(Ainit.supportingList,this.a_obj.supporting)
                baseObj.modelReqVO.ownedStatus = findCode(Ainit.hasOrNotList,this.a_obj.ownedStatus)
                baseObj.modelReqVO.pledgeStatus = findCode(Ainit.hasOrNotList,this.a_obj.pledgeStatus)
                baseObj.modelReqVO.hasUsePriority = findCode(Ainit.yesOrNoList,this.a_obj.hasUsePriority)
            }
            if(this.dataObj.projectTypeCode === 2000){
                baseObj.modelReqVO = cloneObj(this.b_obj)
                baseObj.modelReqVO.isTroublesome = findCode(Binit.yesOrNoList,this.b_obj.isTroublesome)
                baseObj.modelReqVO.transferMethod = findCode(Binit.transferMethodList,this.b_obj.transferMethod)
                baseObj.modelReqVO.useLimit = findCode(Binit.landUseLimitList,this.b_obj.useLimit)
                baseObj.modelReqVO.supporting = findCode(Binit.supportingList,this.b_obj.supporting)
            }
            if(this.dataObj.projectTypeCode === 3000){
                sortArr(this.c_obj.transfereeConditionList)
                baseObj.modelReqVO = cloneObj(this.c_obj)
                baseObj.modelReqVO.economicType = findCode(Cinit.economicTypeList,this.c_obj.economicType)
                baseObj.modelReqVO.comType = findCode(Cinit.companyTypeList,this.c_obj.comType)
                baseObj.modelReqVO.manageScale = findCode(Cinit.manageScaleList,this.c_obj.manageScale)
                baseObj.modelReqVO.dealPayMethod = findCode(Cinit.dealPayMethodList,this.c_obj.dealPayMethod)
                baseObj.modelReqVO.employeeContinue = findCode(Cinit.yesOrNoList,this.c_obj.employeeContinue)
                baseObj.modelReqVO.renewRequire = findCode(Cinit.yesOrNoList,this.c_obj.renewRequire)
                baseObj.modelReqVO.serviceRequire = findCode(Cinit.yesOrNoList,this.c_obj.serviceRequire)
                baseObj.modelReqVO.transfereeConditionList=findCodeArr(Cinit.transferConditionList,this.c_obj.transfereeConditionList)
            }
            this.$refs.previewDialog.showDialogFuc('submit',baseObj);
        },
        submitFuc(){
            if(this.dataObj.projectTypeCode === 1000){
                this.dataObj.modelAReqVO = this.a_obj;
            }
            if(this.dataObj.projectTypeCode === 2000){
                this.dataObj.modelBReqVO = this.b_obj;
            }
            if(this.dataObj.projectTypeCode === 3000){
                this.dataObj.modelCReqVO = this.c_obj;
            }
            publishProject(this.dataObj).then(res=>{
                if(res.errorCode === 0){
                    this.$message({
                        showClose: true,
                        message: '发布成功',
                        type: 'success'
                    });
                    this.resetForm('projectForm','A_form','B_form','C_form')
                }
                this.$refs.previewDialog.closeFuc();
            }).catch(()=>{
                this.$refs.previewDialog.closeLoadingFuc();
            })
        },
        delImg(index,more){
            this.showImg.splice(index,1);
            this.dataObj.imageList.splice(index,1)
        },
        uploadFuc(data,more,type){
            upload(data).then(res=>{
                if(res.errorCode === 0){
                    if(more){
                        this.showImg.push(res.body.filePath);
                        this.dataObj.imageList.push(res.body.fileId)
                    }
                    else{
                        let classType = type.class;
                        let typeType = type.type;
                        if(classType === 1000){
                            this.a_obj.authorizationLetter = res.body.fileId
                        }
                        if(classType === 2000){
                            switch(typeType){
                                case 'B_bdcImg':
                                    this.b_obj.landUseCertificate = res.body.fileId
                                break;
                                case 'B_xkzImg':
                                    this.b_obj.buildCertificate = res.body.fileId
                                break;
                                case 'B_pzsImg':
                                    this.b_obj.landApprovalCertificate = res.body.fileId
                                break;
                                case 'B_sqsImg':
                                    this.b_obj.authorizationLetter = res.body.fileId
                                break;
                            }
                        }
                        if(classType === 3000){
                            this.c_obj.authorizationLetter = res.body.fileId
                        }
                    }
                }
            })
        },
        resetForm(formName,A,B,C){
            this.provinceInfo="";
            this.cityInfo="";
            this.time=[];
            this.showImg=[];
            this.dataObj.imageList = [];
            this.$refs[formName].resetFields();
            this.$refs[A].resetFields();
            this.$refs[B].resetFields();
            this.$refs[C].resetFields();
        },
        //地区选择
        changeProvince(){
            let provinceArr = this.provinceInfo.split(",")
            let provinceCode = provinceArr[0]
            Object.keys(cityList).forEach((key)=>{
                if(key.indexOf(provinceCode) == 0){
                    this.city=cityList[key]
                    this.cityInfo = this.city[0].text
                    //选择了省份后后.用户不在选择城市
                    this.dataObj.comProvince = provinceArr[1]
                    this.dataObj.comProvinceCode = provinceArr[0]
                    this.dataObj.comCity = this.city[0].text
                    this.dataObj.comCityCode = this.city[0].value
                }
            })
        },
        changeCity(){
            let provinceArr = this.provinceInfo.split(",")
            let cityArr = this.cityInfo.split(",")
            this.dataObj.comProvince = provinceArr[1]
            this.dataObj.comProvinceCode = provinceArr[0]
            this.dataObj.comCity = cityArr[1]
            this.dataObj.comCityCode = cityArr[0]
        },
        delTag(tag) {
            this.dataObj.keyWordList.splice(this.dataObj.keyWordList.indexOf(tag), 1);
        },
        showInput() {
            this.tabVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let tabValue = this.tabValue;
            if (tabValue) {
                this.dataObj.keyWordList.push(tabValue);
            }
            this.tabVisible = false;
            this.tabValue = '';
        },
    }
}
</script>

<style lang="stylus" scoped>
.publishProject{
    .projectForm{
        padding-bottom 100px;
        .baseInfo{
            padding 30px;
        }
        .baseInfo >>> .el-form-item__label:before{
            content "*";
            color #f56c6c;
            margin-right 4px;
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
        .form_div1{
            width 500px;
            .form_divM{
                display flex;
            }
        }
        .trading_title >>> .el-form-item{
            margin-bottom 12px;
            .el-form-item__label{
                color black;
            }
        }
        .form_div3{
            padding-left 60px;
            .check_p{
                margin-bottom 16px;
            }
        }
        .spanInput{
            display inline-block;
            width 200px;
        }
        .submitBtn{
            width 666px;
            text-align center;
            padding 50px 0;
            box-sizing border-box;
        }
    }
    .tag_div{
        .el-tag + .el-tag {
            margin-left: 10px;
        }
        .button-new-tag {
            margin-left: 10px;
            height: 32px;
            line-height: 30px;
            padding-top: 0;
            padding-bottom: 0;
        }
        .input-new-tag {
            width: 90px;
            margin-left: 10px;
            vertical-align: bottom;
        }
    }
    .form_divM >>> .el-checkbox{
        margin-left 30px;
        .el-checkbox__inner{
            width 16px;
            height 16px;
        }
        .el-checkbox__label{
            font-size 16px;
        }
    }
    .projectForm >>> .el-form{
        .el-form-item__label{
            padding-right 30px;
        }
    }
    .border{
        border 1px solid black
    }
}
</style>
