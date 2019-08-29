<template>
<!-- 发布需求 -->
    <div class="publishDemand">
        <div class="demandForm">
            <el-form :model="dataObj" label-position="left" ref="demandForm" size="medium" label-width="111px">
                <div class="form_div">
                    <el-form-item label="需求标题" prop="projectName">
                        <el-input v-model="dataObj.projectName" type="text" placeholder="需求标题"></el-input>
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
                <div class="form_div1">
                    <el-form-item label="总价">
                        <div class="form_divM">
                            <span class="divM_span">
                                <el-form-item prop="startAmt">
                                    <el-input :disabled="checkedM" v-model="dataObj.startAmt" type="text" placeholder=""></el-input>
                                </el-form-item>
                            </span>
                            <span>&nbsp;&nbsp;---&nbsp;&nbsp;</span>
                            <span class="divM_span">
                                <el-form-item prop="endAmt">
                                    <el-input :disabled="checkedM" v-model="dataObj.endAmt" type="text" placeholder=""></el-input>
                                </el-form-item>
                            </span>
                            <span class="divM_unit">万元</span>
                            <el-checkbox
                                v-model="checkedM"
                                @change="dataObj.startAmt = checkedM ? '': dataObj.startAmt;
                                dataObj.endAmt = checkedM ? '': dataObj.endAmt"
                            >面议</el-checkbox>
                        </div>
                    </el-form-item>
                </div>
                <div class="like_div">
                    <el-form-item label="联系人" prop="linkMan">
                        <el-input v-model="dataObj.linkMan" type="text" placeholder="联系人"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人电话" prop="linkTel">
                        <el-input v-model="dataObj.linkTel" type="text" placeholder="联系人电话"></el-input>
                    </el-form-item>
                </div>
                <div class="form_div1">
                    <el-form-item label="需求详情" prop="dtlInf">
                        <el-input
                            type="textarea"
                            :rows="6"
                            placeholder="请输入内容"
                            v-model="dataObj.dtlInf">
                        </el-input>
                    </el-form-item>
                </div>
            </el-form>

            <div class="submitBtn">
                <el-button type="primary" @click="previewFuc">预&nbsp;览</el-button>
                <el-button @click="resetForm('demandForm')">重&nbsp;置</el-button>
            </div>
        </div>

        <demand-dialog ref="previewDialog" @submitFuc="submitFuc"/>
    </div>
</template>

<script>
import {provinceList,cityList} from '@/files/js/areaData'
import {cloneObj} from '@/files/js/cloneObj'
import DemandDialog from '@/components/Project/dialog/demandDialog'
import {publishRequirement} from '@/api'
export default {
    components:{
        DemandDialog
    },
    data(){
        return {
            checkedM:false,  //是否面议
            dataObj:{
                projectName :"",  //需求标题
                comProvince:"",  //省份
                comProvinceCode:"",  //省份code
                comCity:"",  //城市
                comCityCode:"", //城市code
                comAddrDtl:"",  //详细地址
                isConfer:"",  //面议
                startAmt:"",  //开始价钱
                endAmt:"",  //结束价钱
                linkMan:"",  //联系人
                linkTel:"",  //联系电话
                dtlInf:"",  //需求详情
            },

            //省 市下拉框
            province:provinceList,
            city:[],
            provinceInfo:"",
            cityInfo:"",
        }
    },
    methods:{
        previewFuc(){
            this.dataObj.isConfer = this.checkedM ? 1 : 0  //面议
            let baseObj = cloneObj(this.dataObj)
            this.$refs.previewDialog.showDialogFuc('submit',baseObj);
        },
        submitFuc(){
            publishRequirement(this.dataObj).then(res=>{
                if(res.errorCode === 0){
                    this.$message({
                        showClose: true,
                        message: '发布成功',
                        type: 'success'
                    });
                    this.resetForm('demandForm')
                }
                this.$refs.previewDialog.closeFuc();
            }).catch(()=>{
                this.$refs.previewDialog.closeLoadingFuc();
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
        resetForm(formName){
            this.provinceInfo="";
            this.cityInfo="";
            this.$refs[formName].resetFields();
        }
    },
}
</script>

<style lang="stylus" scoped>
.publishDemand{
    .demandForm{
        padding 30px;
        padding-bottom 100px;
        >>> .el-form{
            .el-form-item__label{
                padding-right 30px;
            }
            .el-form-item__label:before{
                content "*";
                color #f56c6c;
                margin-right 4px;
            }
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
                .divM_span{
                    display inline-block;
                    width 88px;
                }
                .divM_unit{
                    margin-left 8px;
                    color #606266;
                }
            }
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
        .spanInput{
            display inline-block;
            width 200px;
        }
        .submitBtn{
            width 777px;
            text-align center;
            padding 50px 0;
            box-sizing border-box;
        }
    }
}
</style>
