<template>
    <div class="land">
        <el-form :model="b_obj" ref="B_form" label-position="left" size="medium" label-width="111px" :rules="rules2">
            <div class="must_div">
                <div>
                    <el-form-item label="面积：" prop="landAcreage">
                            <span class="spanInput">
                                <el-input v-model="b_obj.landAcreage" type="text" placeholder="面积  (单位：亩)" maxlength="10"></el-input>
                                <span class="danwei">亩</span>
                            </span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="规划条件" class="item_title"></el-form-item>
                    <div class="children_div">
                        <el-form-item label="容积率：" prop="volumeRate">
                            <span class="spanInput">
                                <el-input v-model="b_obj.volumeRate" type="text" placeholder="容积率" maxlength="5">
                                </el-input>
                            </span>
                        </el-form-item>
                        <div>
                            <el-form-item label="建筑密度：" prop="buildingDensity">
                                <span class="spanInput">
                                    <el-input v-model="b_obj.buildingDensity" type="text" placeholder="建筑密度" maxlength="3"></el-input>
                                    <span class="danwei">%</span>
                                </span>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="限高：" prop="heightPermitted">
                                <span class="spanInput">
                                    <el-input v-model="b_obj.heightPermitted" type="text" placeholder="限高" maxlength="5"></el-input>
                                    <span class="danwei">m</span>
                                </span>
                            </el-form-item>
                        </div>
                        <div class="form_div">
                            <el-form-item label="车位比：">
                                <div class="form_divH">
                                  <el-form-item prop="households">
                                    <span class="house_park">
                                        <el-input v-model="b_obj.households" type="text" placeholder="总户数" maxlength="5"></el-input>
                                    </span>
                                  </el-form-item>
                                    <span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>
                                  <el-form-item prop="parkingSpaces">
                                    <span class="house_park">
                                        <el-input v-model="b_obj.parkingSpaces" type="text" placeholder="车位总数" maxlength="5"></el-input>
                                    </span>
                                  </el-form-item>

                                </div>
                            </el-form-item>
                        </div>
                    </div>
                </div>
                <div>
                    <el-form-item label="项目需求：" prop="projectRequirement">
                        <el-select v-model="b_obj.projectRequirement" placeholder="请选择">
                            <el-option
                                v-for="item in initData.pubProjectBaseInitRespVO.projectRequirementList"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="项目详情信息：" prop="dtlInf" label-width="133px">
                        <el-input
                            type="textarea"
                            :rows="6"
                            placeholder="请输入内容"
                            maxlength="500"
                            v-model="b_obj.dtlInf">
                        </el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="是否净地：" prop="isTroublesome">
                        <el-radio-group v-model="b_obj.isTroublesome">
                            <el-radio :label="item.code" v-for="item in initData.pubProjectBInitRespVO.yesOrNoList" :key="item.code">{{item.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="土地使用性质：" prop="landNature">
                        <el-select v-model="b_obj.landNature" placeholder="请选择">
                            <el-option
                                v-for="item in initData.pubProjectBInitRespVO.landNatureList"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="配套：" prop="supporting">
                      <el-select v-model="b_obj.supporting" placeholder="请选择">
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
                    <el-form-item label="土地位置：">
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
                <div>
                    <el-form-item label="周边配套（多选）：" class="item_title" label-width="200px"></el-form-item>
                    <div class="children_div">
                        <el-form-item prop="peripheralMatchingList" label-width="0">
                            <el-checkbox-group v-model="b_obj.peripheralMatchingList">
                                <el-checkbox :label="item.code" v-for="(item,index) in initData.pubProjectBInitRespVO.peripheralMatchingList" :key="index">{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </div>
                </div>
                <div>
                    <el-form-item label="开发不定因素（多选）：" class="item_title" label-width="200px"></el-form-item>
                    <div class="children_div">
                        <el-form-item prop="devUncertainFactorsList" label-width="0">
                            <el-checkbox-group v-model="b_obj.devUncertainFactorsList">
                                <el-checkbox :label="item.code" v-for="(item,index) in initData.pubProjectBInitRespVO.devUncertainFactorsList" :key="index">{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                            <el-form-item v-if="b_obj.devUncertainFactorsList.indexOf('F') > -1" label="其他：" prop="other" label-width="66px" size="mini">
                                <span class="spanInput" style="width:333px">
                                    <el-input v-model="b_obj.other" type="text" placeholder="其他因素" maxlength="10"></el-input>
                                </span>
                            </el-form-item>
                        </el-form-item>
                    </div>
                </div>
                <div>
                    <el-form-item label="过户方式：" prop="transferMode" >
                        <el-radio-group v-model="b_obj.transferMode">
                            <el-radio :label="item.code" v-for="item in initData.pubProjectBInitRespVO.transferModeList" :key="item.code">{{item.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="是否干净：" prop="isClean">
                        <el-radio-group v-model="b_obj.isClean">
                            <el-radio :label="item.code" v-for="item in initData.pubProjectBInitRespVO.yesOrNoList" :key="item.code">{{item.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
            </div>
            <div class="border"></div>
            <div class="optional_div">
                <h1 class="h1_title">非必填项</h1>
                <div>
                    <el-form-item label="绿化率：" prop="greeningRate">
                            <span class="spanInput">
                                <el-input v-model="b_obj.greeningRate" type="text" placeholder="绿化率)" maxlength="5"> </el-input>
                                <span class="danwei">%</span>
                            </span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="出让方式：" prop="transferMethod">
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
                    <el-form-item label="不动产使用证：" prop="landUseCertificate" label-width="160px">
                        <upload-img
                            :type="{class:2000,type:'B_bdcImg'}"
                            :showImage="b_obj.landUseCertificate?$store.state.user.ip+b_obj.landUseCertificate:''"
                            @uploadFuc="uploadFuc"
                        />
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="建设用地规划许可证：" prop="buildCertificate" label-width="160px">
                        <upload-img
                            :type="{class:2000,type:'B_xkzImg'}"
                            :showImage="b_obj.buildCertificate?$store.state.user.ip+b_obj.buildCertificate:''"
                            @uploadFuc="uploadFuc"
                        />
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="建设用地批准书：" prop="landApprovalCertificate" label-width="160px">
                        <upload-img
                            :type="{class:2000,type:'B_pzsImg'}"
                            :showImage="b_obj.landApprovalCertificate?$store.state.user.ip+b_obj.landApprovalCertificate:''"
                            @uploadFuc="uploadFuc"
                        />
                    </el-form-item>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
import {provinceList,cityList} from '@/files/js/areaData'
import UploadImg from '@/components/UploadImg/uploadImg'
import {upload} from '@/api'
import {isvalidSmallNum2,isvalidSmallNum1,isPercentage,isvalidNum5} from '@/files/js/rules'
var validSmallNum2=(rule, value,callback)=>{
  if (!value){
    callback(new Error('请输入数字，结果保留两位小数'))
  }else  if (!isvalidSmallNum2(value)){
    callback(new Error('请输入正确的格式！'))
  }else {
    callback()
  }
};
var validSmallNum1=(rule, value,callback)=>{
  if (!value){
    callback(new Error('请输入数字，结果保留一位小数'))
  }else  if (!isvalidSmallNum1(value)){
    callback(new Error('请输入正确的格式！'))
  }else {
    callback()
  }
};
var percentage=(rule, value,callback)=>{
  if (!value){
    callback(new Error('请输入小于100的整数'))
  }else  if (!isPercentage(value)){
    callback(new Error('请输入正确的格式！'))
  }else {
    callback()
  }
};
var validConstruction=(rule, value,callback)=>{
  if (!value){
    callback(new Error('请选择！'))
  }
  else {
    callback()
  }
};
var validProjectName=(rule, value,callback)=>{
  if (!value){
    callback(new Error('该输入框不能为空！'))
  }
  else {
    callback()
  }
};
var validTrueFalse=(rule, value,callback)=>{
  if (value===''||value===null){
    callback(new Error('请选择！'))
  }
  else if (value===0) {
    callback()
  }else if(value===1){
    callback()
  }
};
var validNumber5=(rule, value,callback)=>{
  if(value==''){
    callback()
  }
  else if (!isvalidNum5(value)){
    callback(new Error('请输入5位以下数字'))
  }else {
    callback()
  }
};
export default {
    components:{
        UploadImg
    },
    props:{
        initData:{
            type:Object
        }
    },
    data(){
        return{
            households:"",  //总户数
            park:"", //车位

            b_obj:{
                landAcreage:"",  //面积
                volumeRate:"",  //容积率
                buildingDensity:"", //建筑密度
                heightPermitted:"", //限高
                parkingRatio:"", //车位比
                households: '', //总户数
                parkingSpaces: '',//车位数
                projectRequirement:"", //项目需求
                dtlInf:"",  //项目详细信息
                isTroublesome:"",  //是否净地
                landNature:"",  //土地性质
                landProvince:"",  //土地 省name
                landProvinceCode:"",  //土地  省code
                landCity:"",   //土地 省name
                landCityCode:"",  //土地 省code
                peripheralMatchingList:[],  //周边配套
                devUncertainFactorsList:[],  //开发不定因素
                other:"",  //开发不定因素的时候--选择其他
                transferMode:"",  //过户方式
                isClean:"",  //是否干净
                greeningRate:"", //绿化率
                transferMethod:"",  //出让方式
                landUseCertificate :"",  //不动产使用证
                buildCertificate :"",  //建设证
                landApprovalCertificate :"",  //建设批准书
                supporting :"", //配套
            },
          rules2:{
            landAcreage: [
              { hide:true, trigger: 'blur', validator: validSmallNum2 }
            ],
            volumeRate: [
              { hide:true, trigger: 'blur', validator: validSmallNum1 }
            ],
            buildingDensity: [
              { hide:true, trigger: 'blur', validator: percentage }
            ],
            heightPermitted: [
              { hide:true, trigger: 'blur', validator: validSmallNum1 }
            ],
            households: [
              { hide:true, trigger: 'blur', validator: validSmallNum1 }
            ],
            parkingSpaces: [
              { hide:true, trigger: 'blur', validator: validSmallNum1 }
            ],
            projectRequirement: [
              { hide:true, trigger: 'change', validator: validConstruction }
            ],
            landNature: [
              { hide:true, trigger: 'change', validator: validConstruction }
            ],
            supporting: [
              { hide:true, trigger: 'change', validator: validConstruction }
            ],
            dtlInf: [
              { hide:true, trigger: 'blur', validator: validProjectName }
            ],
            isTroublesome: [
              { hide:true, trigger: 'change', validator: validTrueFalse }
            ],
            transferMode: [
              { hide:true, trigger: 'change', validator: validTrueFalse }
            ],
            isClean: [
              { hide:true, trigger: 'change', validator: validTrueFalse }
            ],
            greeningRate: [
              { hide:true, trigger: 'blur', validator: validNumber5 }
            ],
          },

            //省 市下拉框
            province:provinceList,
            city:[],
            provinceInfo:"",
            cityInfo:"",
        }
    },
    methods:{
        mergeFuc(){
            this.b_obj.other=this.b_obj.devUncertainFactorsList.indexOf('F') > -1 ? this.b_obj.other :'';
            // this.b_obj.parkingRatio = `${this.households}:${this.park}`
            this.$emit('mergeFuc',this.b_obj)
        },
        uploadFuc(data,more,type){
            upload(data).then(res=>{
                if(res && res.errorCode === 0){
                    let typeType = type.type;
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
                    }
                }
            })
        },
        resetForm(){
            this.provinceInfo="";
            this.cityInfo="";
            this.households="";
            this.park="";
            this.b_obj.parkingRatio="";
            this.b_obj.landProvince="";
            this.b_obj.landProvinceCode="";
            this.b_obj.landCity="";
            this.b_obj.landCityCode="";
            this.$refs.B_form.resetFields();
        },
        submitForm(B_form) {
          this.$refs.B_form.validate((valid) => {
            if (!valid) {
              return false;
            }
          });

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
                    this.b_obj.landProvince = provinceArr[1]
                    this.b_obj.landProvinceCode = provinceArr[0]
                    this.b_obj.landCity = this.city[0].text
                    this.b_obj.landCityCode = this.city[0].value
                }
            })
        },
        changeCity(){
            let provinceArr = this.provinceInfo.split(",")
            let cityArr = this.cityInfo.split(",")
            this.b_obj.landProvince = provinceArr[1]
            this.b_obj.landProvinceCode = provinceArr[0]
            this.b_obj.landCity = cityArr[1]
            this.b_obj.landCityCode = cityArr[0]
        },
    }
}
</script>

<style lang="stylus" scoped>
.land{
    .must_div{
        padding 0 88px;
        >>> .el-form-item__label:before{
            content "*";
            color #f56c6c;
            margin-right 4px;
        }
    }
    .optional_div{
        padding 0 88px;
        padding-top 50px;
    }
    .h1_title{
        width 111px;
        font-size 18px;
        font-weight bold;
        padding 0 12px 23px 0;
        box-sizing border-box;
    }
    .form_div{
        width 500px;
        .form_divH{
            display flex;
            .house_park{
                display inline-block;
                width 188px;
            }
        }
    }
    .children_div{
        padding-left 40px;
    }
    .item_title{
        margin-bottom 12px;
        >>> .el-form-item__label{
            color black;
            font-size 16px;
        }
    }
    .spanInput{
        display flex;
        width 200px;
        .danwei{
            display inline-block;
            width 50px;
        }
    }
    .border{
        border 1px solid #e6e6e6
    }
}
</style>
