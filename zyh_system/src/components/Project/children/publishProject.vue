<template>
<!-- 发布项目 -->
    <div class="publishProject">
        <div class="projectForm">
            <h1 class="h1_title">必填项</h1>
            <el-form :model="dataObj" label-position="left" ref="projectForm" size="medium" label-width="111px">
                <div class="form_div">
                    <el-form-item label="项目分类：">
                        <el-select 
                            v-model="dataObj.projectTypeCode" 
                            placeholder="请选择"
                            @change="projectComponent = 
                            dataObj.projectTypeCode == 1000 ? 'Assets' : 
                            dataObj.projectTypeCode == 2000 ? 'Land' : 'Shares'"
                        >
                            <el-option
                                v-for="item in initData.pubProjectBaseInitRespVO.projectCategoryList"
                                :key="item.typeCode"
                                :label="item.typeName"
                                :value="item.typeCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="项目领域：" prop="involvedDomain">
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
                    <el-form-item label="探探版领域：" prop="involvedDomainV2">
                        <el-select @change="involvedDomainV2Fuc" v-model="dataObj.involvedDomainV2" placeholder="请选择">
                            <el-option
                                v-for="item in TTaninvolvedDomainV2"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="探探版领域类型：" prop="domainSubCategory" label-width="136px">
                        <el-select v-model="dataObj.domainSubCategory" placeholder="请先选择探探版领域">
                            <el-option
                                v-for="item in TTaninvolvedDomainV2Type"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="项目名称：" prop="projectName">
                        <el-input v-model="dataObj.projectName" type="text" placeholder="项目名称"></el-input>
                    </el-form-item>
                    <el-form-item label="权重：" prop="homeRecommend">
                        <el-input v-model="dataObj.homeRecommend" type="text" placeholder="0-100"></el-input>
                    </el-form-item>
                </div>
                <div class="form_div1">
                    <el-form-item label="公司：" prop="comName">
                        <el-input v-model="dataObj.comName" type="text" placeholder="公司名称"></el-input>
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
                    <el-form-item label="详细地址：" prop="comAddrDtl">
                        <el-input v-model="dataObj.comAddrDtl" type="text" placeholder="详细地址"></el-input>
                    </el-form-item>
                </div>
                <div class="form_div1">
                    <el-form-item label="摘要：" prop="digest">
                        <el-input v-model="dataObj.digest" type="text" placeholder="不得多余20个字符"></el-input>
                    </el-form-item>
                </div>
                <div class="like_div">
                    <el-form-item label="联系人：" prop="linkMan">
                        <el-input v-model="dataObj.linkMan" type="text" placeholder="联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人电话：" prop="linkTel">
                        <el-input v-model="dataObj.linkTel" type="text" placeholder="联系人电话"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="项目价格" class="item_title"></el-form-item>
                    <div class="M_box">
                        <el-form-item label="成交价：" prop="startAmt" label-width="88px">
                            <div class="form_divM">
                                <span class="spanInput">
                                    <el-input :disabled="checkedM" v-model="dataObj.startAmt" type="text" placeholder="成交价"></el-input>
                                    <span class="danwei">万元</span>
                                </span>
                                <el-checkbox v-model="checkedM" @change="dataObj.startAmt = checkedM ? '': dataObj.startAmt">面议</el-checkbox>
                            </div>
                        </el-form-item>
                        <el-form-item label="市场价：" prop="endAmt" label-width="88px">
                            <div>
                                <span class="spanInput">
                                    <el-input v-model="dataObj.endAmt" type="text" placeholder="市场价"></el-input>
                                    <span class="danwei">万元</span>
                                </span>
                            </div>
                        </el-form-item>
                    </div>
                </div>
                <div class="tag_div" >
                    <el-form-item label="关键字：" prop="keyWordList">
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
                    <el-form-item label="图片：">
                        <upload-img :more="true" :maxNumber="4" :imgList="showImg" @uploadFuc="uploadFuc" @delImg="delImg"/>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <component 
            :is="projectComponent" 
            :initData="initData" 
            :ref="projectComponent" 
            @mergeFuc="mergeFuc"
            @uploadFuc="uploadFuc"
        />
        <div class="submitBtn">
            <el-button type="primary" @click="previewFuc">预览</el-button>
            <el-button @click="resetForm('projectForm')">重置</el-button>
        </div>
        <project-dialog ref="previewDialog" @submitFuc="submitFuc"/>
    </div>
</template>

<script>
import UploadImg from '@/components/UploadImg/uploadImg'
import {provinceList,cityList} from '@/files/js/areaData'
import {tanTinvolvedDomainV2,tanTinvolvedDomainV2Type} from '@/files/js/tanTInvolvedDomain'
import {upload,publishProjectA,publishProjectB,publishProjectC,pubProjectInit,domainV2Init} from '@/api'
import ProjectDialog from '@/components/Project/dialog/projectDialog'
import Assets from '@/components/Project/projectClassification/assets'
import Land from '@/components/Project/projectClassification/land'
import Shares from '@/components/Project/projectClassification/shares'
import {cloneObj} from '@/files/js/cloneObj'
import {findCode,findCodeArr,sortArr} from '@/files/js/findCode'
export default {
    components:{
        Assets,
        Land,
        Shares,
        UploadImg,
        ProjectDialog
    },
    data(){
        return{
            checkedM:false,  //是否面议
  
            initData:{
                myPreferenceInitRespVO:{},
                pubProjectBaseInitRespVO:{},
                pubProjectAInitRespVO:{},
                pubProjectBInitRespVO:{},
                pubProjectCInitRespVO:{},
            },
            showImg:[],   //图片列表
            projectComponent:"Assets",
            tabVisible: false,  //添加标签
            tabValue: '',

            dataObj:{
                projectTypeCode:1000,  //类别
                involvedDomain:"",  //项目领域
                involvedDomainV2:"", //探探版领域
                domainSubCategory:"", //探探版领域类型
                projectName:"",  //名字
                homeRecommend:0,  //权重
                comName:"",  //公司
                comProvince:"",  //省
                comProvinceCode:"",//省 区号
                comCity:"", //市
                comCityCode:"", //市 区号
                comAddrDtl:"",  //详细地址
                digest:"",  //摘要
                linkMan :"",  //联系人
                linkTel :"",  //联系人电话
                isConfer:0, //是否面议
                startAmt:"",  //成交价
                endAmt:"",  //市场价
                keyWordList:[],  //关键字
                imageList:[],  //图片列表
            },
            freeDataObj:{},  //上传的对象

            //探探下拉框
            TTaninvolvedDomainV2:tanTinvolvedDomainV2,
            TTaninvolvedDomainV2Type:[],
            //省 市下拉框
            province:provinceList,
            city:[],
            provinceInfo:"",
            cityInfo:"",
        }
    },
    created(){
        console.log(1)
        //初始化项目选项数据
        pubProjectInit({projectCategoryCode:0}).then(res=>{
            if(res && res.errorCode === 0){
                this.initData=res.body
            }
        })
    },
    methods:{
        submitFuc(){
            switch(this.dataObj.projectTypeCode){
                case 1000:
                    publishProjectA(this.freeDataObj).then(res=>{
                        if(res && res.errorCode === 0){
                            this.$message({
                                showClose: true,
                                message: '发布成功',
                                type: 'success'
                            });
                            this.resetForm('projectForm')
                        }
                        this.$refs.previewDialog.closeFuc();
                    }).catch(()=>{
                        this.$refs.previewDialog.closeLoadingFuc();
                    })
                break
                case 2000:
                    publishProjectB(this.freeDataObj).then(res=>{
                        if(res && res.errorCode === 0){
                            this.$message({
                                showClose: true,
                                message: '发布成功',
                                type: 'success'
                            });
                            this.resetForm('projectForm')
                        }
                        this.$refs.previewDialog.closeFuc();
                    }).catch(()=>{
                        this.$refs.previewDialog.closeLoadingFuc();
                    })
                break;
                case 3000:
                    publishProjectC(this.freeDataObj).then(res=>{
                        if(res && res.errorCode === 0){
                            this.$message({
                                showClose: true,
                                message: '发布成功',
                                type: 'success'
                            });
                            this.resetForm('projectForm')
                        }
                        this.$refs.previewDialog.closeFuc();
                    }).catch(()=>{
                        this.$refs.previewDialog.closeLoadingFuc();
                    })
                break;
            }
        },
        previewFuc(){
            this.dataObj.isConfer = this.checkedM ? 1 : 0  //面议
            this.$refs[this.projectComponent].mergeFuc();
        },
        mergeFuc(data){
            let Ainit = this.initData.pubProjectAInitRespVO
            let Binit = this.initData.pubProjectBInitRespVO
            let Cinit = this.initData.pubProjectCInitRespVO
            let dataObjC = cloneObj(this.dataObj);
            let dataC = cloneObj(data)
            let mergeObj = Object.assign(dataObjC,dataC)
            this.freeDataObj = cloneObj(mergeObj)
            if(mergeObj.involvedDomain){mergeObj.involvedDomain=findCode(this.initData.myPreferenceInitRespVO.domainList,this.dataObj.involvedDomain)}
            if(mergeObj.involvedDomainV2){mergeObj.involvedDomainV2=findCode(tanTinvolvedDomainV2,this.dataObj.involvedDomainV2)}
            if(mergeObj.domainSubCategory){mergeObj.domainSubCategory=findCode(this.TTaninvolvedDomainV2Type,this.dataObj.domainSubCategory)}
            mergeObj.imageList = this.showImg
            if(this.dataObj.projectTypeCode === 1000){
                mergeObj.projectRequirement = findCode(this.initData.pubProjectBaseInitRespVO.projectRequirementList,data.projectRequirement)
                if(mergeObj.category){mergeObj.category = findCode(Ainit.assetCategoryList,data.category)}
                if(mergeObj.ownerProperty){mergeObj.ownerProperty = findCode(Ainit.ownerPropertyList,data.ownerProperty)}
                if(mergeObj.currentPurpose){mergeObj.currentPurpose = findCode(Ainit.usePurposeList,data.currentPurpose)}
                if(mergeObj.planPurpose){mergeObj.planPurpose = findCode(Ainit.usePurposeList,data.planPurpose)}
                if(mergeObj.nature){mergeObj.nature = findCode(Ainit.natureList,data.nature)}
                if(mergeObj.transferForm){mergeObj.transferForm = findCode(Ainit.transferFormList,data.transferForm)}
                if(mergeObj.changeApartment || mergeObj.changeApartment === 0){mergeObj.changeApartment = findCode(Ainit.yesOrNoList,data.changeApartment)}
                if(mergeObj.makeLoans || mergeObj.makeLoans === 0){mergeObj.makeLoans = findCode(Ainit.yesOrNoList,data.makeLoans)}
                if(mergeObj.ownedStatus || mergeObj.ownedStatus === 0){mergeObj.ownedStatus = findCode(Ainit.yesOrNoList,data.ownedStatus)}
                if(mergeObj.pledgeStatus || mergeObj.pledgeStatus === 0){mergeObj.pledgeStatus = findCode(Ainit.yesOrNoList,data.pledgeStatus)}
                if(mergeObj.hasUsePriority || mergeObj.hasUsePriority === 0){mergeObj.hasUsePriority = findCode(Ainit.yesOrNoList,data.hasUsePriority)}
            }
            if(this.dataObj.projectTypeCode === 2000){
                mergeObj.projectRequirement = findCode(this.initData.pubProjectBaseInitRespVO.projectRequirementList,data.projectRequirement)
                if(mergeObj.isTroublesome || mergeObj.isTroublesome === 0){mergeObj.isTroublesome = findCode(Binit.yesOrNoList,data.isTroublesome)}
                if(mergeObj.landNature){mergeObj.landNature = findCode(Binit.landNatureList,data.landNature)}
                if(mergeObj.peripheralMatchingList){mergeObj.peripheralMatchingList=findCodeArr(Binit.peripheralMatchingList,data.peripheralMatchingList)}
                if(mergeObj.devUncertainFactorsList){mergeObj.devUncertainFactorsList=findCodeArr(Binit.devUncertainFactorsList,data.devUncertainFactorsList)}
                if(mergeObj.transferMode){mergeObj.transferMode = findCode(Binit.transferModeList,data.transferMode)}
                if(mergeObj.isClean || mergeObj.isClean === 0){mergeObj.isClean = findCode(Binit.yesOrNoList,data.isClean)}
                if(mergeObj.transferMethod){mergeObj.transferMethod = findCode(Binit.transferMethodList,data.transferMethod)}
            }
            if(this.dataObj.projectTypeCode === 3000){
                mergeObj.projectRequirement = findCode(this.initData.pubProjectBaseInitRespVO.projectRequirementList,data.projectRequirement)
                sortArr(mergeObj.transfereeConditionList)
                if(mergeObj.economicType){mergeObj.economicType = findCode(Cinit.economicTypeList,data.economicType)}
                if(mergeObj.comType){mergeObj.comType = findCode(Cinit.companyTypeList,data.comType)}
                if(mergeObj.manageScale){mergeObj.manageScale = findCode(Cinit.manageScaleList,data.manageScale)}
                if(mergeObj.dealPayMethod){mergeObj.dealPayMethod = findCode(Cinit.dealPayMethodList,data.dealPayMethod)}
                if(mergeObj.employeeContinue || mergeObj.employeeContinue === 0){mergeObj.employeeContinue = findCode(Cinit.yesOrNoList,data.employeeContinue)}
                if(mergeObj.renewRequire || mergeObj.renewRequire === 0){mergeObj.renewRequire = findCode(Cinit.yesOrNoList,data.renewRequire)}
                if(mergeObj.serviceRequire || mergeObj.serviceRequire === 0){mergeObj.serviceRequire = findCode(Cinit.yesOrNoList,data.serviceRequire)}
                mergeObj.transfereeConditionList=findCodeArr(Cinit.transferConditionList,data.transfereeConditionList)
            }

            this.$refs.previewDialog.showDialogFuc('submit',mergeObj);
        },
        resetForm(formName){
            this.checkedM = false
            this.dataObj.isConfer = 0;
            this.provinceInfo="";
            this.cityInfo="";
            this.dataObj.comProvince="",  
            this.dataObj.comProvinceCode="",
            this.dataObj.comCity="", 
            this.dataObj.comCityCode="",
            this.showImg=[];
            this.dataObj.imageList = [];
            this.$refs[formName].resetFields();
            this.$refs[this.projectComponent].resetForm();
        },
        delImg(index,more){
            this.showImg.splice(index,1);
            this.dataObj.imageList.splice(index,1)
        },
        uploadFuc(data,more,type){
            upload(data).then(res=>{
                if(res && res.errorCode === 0){
                    if(more){
                        this.showImg.push(res.body.filePath);
                        this.dataObj.imageList.push(res.body.fileId)
                    }
                }
            })
        },
        //探探版领域选择
        involvedDomainV2Fuc(){
            let code = this.dataObj.involvedDomainV2
            Object.keys(tanTinvolvedDomainV2Type).forEach((key)=>{
                if(key.indexOf(code) == 0){
                    this.TTaninvolvedDomainV2Type=tanTinvolvedDomainV2Type[key]
                    this.dataObj.domainSubCategory = this.TTaninvolvedDomainV2Type[0].code
                }
            })
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
        padding 30px 88px 0;
        >>> .el-form-item__label:before{
            content "*";
            color #f56c6c;
            margin-right 4px;
        }
        .h1_title{
            width 111px;
            font-size 18px;
            font-weight bold;
            padding 0 12px 23px 0;
            box-sizing border-box;
        }
        .form_div{
            display flex;
            >>>.el-form-item__content{
                width 233px;
                margin-right 66px;
            }
        }
        .form_div1{
            width 500px;
        }
        .like_div{
            display flex;
            >>>.el-form-item__content{
                margin-right 66px;
            }
            >>> .el-form-item__label{
                font-weight bold;
            }
        }
        .M_box{
            padding-left 40px;
            .form_divM{
                display flex;
                >>> .el-checkbox{
                    margin-left 30px;
                    .el-checkbox__inner{
                        width 16px;
                        height 16px;
                    }
                    .el-checkbox__label{
                        font-size 16px;
                    }
                }
            }
        }
        .item_title{
            margin-bottom 12px;
            >>> .el-form-item__label{
                color black;
                font-size 16px;
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
        .spanInput{
            display flex;
            width 188px;
            .danwei{
                display inline-block;
                width 50px;
            }
        }
    }
    .submitBtn{
        width 666px;
        text-align center;
        padding 50px 0;
        box-sizing border-box;
    }
}
</style>
