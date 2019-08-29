<template>
    <div class="shares">
        <el-form
          :model="c_obj"
          ref="C_form"
          label-position="left"
          size="medium"
          label-width="111px"
          :rules="rules2"
        >
            <div class="border"></div>
            <div class="optional_div">
                <h1 class="h1_title">非必填项</h1>
                <div class="form_div">
                    <el-form-item label="企业名称：" prop="comNameC">
                        <span class="spanInput">
                            <el-input v-model="c_obj.comNameC" type="text" placeholder="企业名称" maxlength="25"></el-input>
                        </span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="注册地址：" prop="registAddr">
                        <span class="spanInput">
                            <el-input v-model="c_obj.registAddr" type="text" placeholder="注册地址" maxlength="25"></el-input>
                        </span>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="法定代表人：" prop="legalPerson">
                        <span class="spanInput">
                            <el-input v-model="c_obj.legalPerson" type="text" placeholder="法定代表人" maxlength="15"></el-input>
                        </span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="成立时间：" prop="establishTime">
                        <el-date-picker
                        v-model="c_obj.establishTime"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="注册资本：" prop="registAmt">
                        <span class="spanInput">
                            <el-input v-model="c_obj.registAmt" type="text" placeholder="注册资本" maxlength="10"></el-input>
                            <span class="danwei">万元</span>
                        </span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="经济类型：" prop="economicType">
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
                    <el-form-item label="公司类型：" prop="comType">
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
                    <el-form-item label="经营规模：" prop="manageScale">
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
                <div class="form_div">
                    <el-form-item label="统一社会信用代码或组织机构代码：" prop="orgCode" label-width="255px">
                        <el-input v-model="c_obj.orgCode" type="text" placeholder="请输入" maxlength="18"></el-input>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="经营范围：" prop="manageRange" >
                        <el-input v-model="c_obj.manageRange" type="text" placeholder="请输入" maxlength="100"></el-input>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="职工人数：" prop="employeeNum">
                        <span class="spanInput">
                            <el-input v-model="c_obj.employeeNum" type="text" placeholder="职工人数" maxlength="5"></el-input>
                            <span class="danwei">人</span>
                        </span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="交易条件" class="item_title"></el-form-item>
                    <div class="children_div">
                        <el-form-item label="1.支付方式：" prop="dealPayMethod">
                            <el-select v-model="c_obj.dealPayMethod" clearable placeholder="请选择">
                                <el-option
                                    v-for="item in initData.pubProjectCInitRespVO.dealPayMethodList"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="2.对转让标的企业职工是否有继续聘用要求：" prop="employeeContinue" label-width="300px">
                            <el-radio-group v-model="c_obj.employeeContinue">
                                <el-radio :label="item.code" v-for="item in initData.pubProjectCInitRespVO.yesOrNoList" :key="item.code">{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="3.对转让标的企业存续发展方面是否有要求：" prop="renewRequire" label-width="300px">
                            <el-radio-group v-model="c_obj.renewRequire">
                                <el-radio :label="item.code" v-for="item in initData.pubProjectCInitRespVO.yesOrNoList" :key="item.code">{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="4.产权转让涉及的售权售务处置是否有要求：" prop="serviceRequire" label-width="300px">
                            <el-radio-group v-model="c_obj.serviceRequire">
                                <el-radio :label="item.code" v-for="item in initData.pubProjectCInitRespVO.yesOrNoList" :key="item.code">{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </div>
                <div>
                    <el-form-item label="受让方资格条件(多选)" class="item_title" label-width="188px"></el-form-item>
                    <div class="children_div">
                        <el-form-item prop="transfereeConditionList" label-width="0">
                            <el-checkbox-group v-model="c_obj.transfereeConditionList">
                                <p v-for="item in initData.pubProjectCInitRespVO.transferConditionList" :key="item.code">
                                    <el-checkbox :label="item.code">{{item.name}}</el-checkbox>
                                </p>
                            </el-checkbox-group>
                        </el-form-item>
                    </div>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
  import {isvalidSmallNum2,isvalidOrgCode,isvalidNum5} from '@/files/js/rules'
  var validSmallNum2=(rule, value,callback)=>{
    if(value==''){
      callback()
    }
    else if (!isvalidSmallNum2(value)){
      callback(new Error('请输入正确的格式！'))
    }else {
      callback()
    }
  };
  var validOrgCode=(rule, value,callback)=>{
    if(value==''){
      callback()
    }
    else if (!isvalidOrgCode(value)){
      callback(new Error('请输入18位 数字或大写字母！'))
    }else {
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
    props:{
        initData:{
            type:Object
        }
    },
    data(){
        return{
            c_obj:{
                comNameC:"",  //企业名称
                registAddr:"",  //注册地址
                establishTime:null,  //成立时间
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
            },
            rules2:{
              registAmt:[
                {hide: true, trigger: 'blur', validator: validSmallNum2,require:false}
              ],
              orgCode:[
                {hide: true, trigger: 'blur', validator: validOrgCode,require:false}
              ],
              employeeNum:[
                {hide: true, trigger: 'blur', validator: validNumber5,require:false}
              ],
            },
        }
    },
    methods:{
        mergeFuc(){
            this.$emit('mergeFuc',this.c_obj)
        },
        resetForm(){
            this.$refs.C_form.resetFields();
        }
    }
}
</script>

<style lang="stylus" scoped>
.shares{
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
            width 50px
        }
    }
    .border{
        border 1px solid #e6e6e6
    }
}
</style>
