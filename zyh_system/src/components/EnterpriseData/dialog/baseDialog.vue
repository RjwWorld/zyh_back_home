<template>
    <div class="baseDialog">
        <el-dialog
            :title="dialogTitle"
            :visible.sync="showDialog"
            @close="closeFuc"
            width="600px"
            center
        >
        <el-form ref="company" :model="comObj" label-width="111px"  v-if="dialogType=='company'">
            <div class="form_div">
                <el-form-item label="公司名称：" prop="companyName">
                    <el-input v-model="comObj.companyName" type="text" placeholder="公司名称"></el-input>
                </el-form-item>
            </div>
            <div class="form_div">
                <el-form-item label="注册资本：" prop="registAmt">
                    <el-input v-model="comObj.registAmt" type="text" placeholder="注册资本">
                        <span slot="suffix">&nbsp;万&nbsp;</span>
                    </el-input>
                </el-form-item>
            </div>
            <div class="form_div">
                <el-form-item label="注册时间：" prop="registTime">
                    <el-date-picker
                        v-model="comObj.registTime"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </div>
            <div class="form_div">
                <el-form-item label="股权占比：" prop="bquityRatio">
                    <el-input v-model="comObj.bquityRatio" type="text" placeholder="股权占比"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <el-form ref="gongShang" :model="gongSregAmtObj" label-width="111px" v-if="dialogType=='gongShang'">
            <div class="form_div">
                <el-form-item label="变更时间：" prop="changeTime">
                    <el-date-picker
                        v-model="gongSregAmtObj.changeTime"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </div>
            <div class="form_div">
                <el-form-item label="变更前：" prop="changeBefore">
                    <el-input v-model="gongSregAmtObj.changeBefore" type="text" placeholder="变更前"></el-input>
                </el-form-item>
            </div>
            <div class="form_div">
                <el-form-item label="变更后：" prop="changeAfter">
                    <el-input v-model="gongSregAmtObj.changeAfter" type="text" placeholder="变更后"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <el-form ref="shares" :model="sharesObj" label-width="111px" v-if="dialogType=='shares'">
            <div class="form_div">
                <el-form-item label="股东（发起人）：" prop="shareholders" label-width="133px">
                    <el-input v-model="sharesObj.shareholders" type="text" placeholder="股东（发起人）"></el-input>
                </el-form-item>
            </div>
            <div class="form_div">
                <el-form-item label="出资比例：" prop="investmentProportion">
                    <el-input v-model="sharesObj.investmentProportion" type="text" placeholder="出资比例"></el-input>
                </el-form-item>
            </div>
            <div class="form_div">
                <el-form-item label="认缴出资：" prop="subscribedCapital">
                    <el-input v-model="sharesObj.subscribedCapital" type="text" placeholder="认缴出资"></el-input>
                </el-form-item>
            </div>
            <div class="form_div">
                <el-form-item label="出资时间：" prop="capitalContribution">
                    <el-date-picker
                        v-model="sharesObj.capitalContribution"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </div>
        </el-form>
        <el-form ref="regAmt" :model="gongSregAmtObj" label-width="111px" v-if="dialogType=='regAmt'">
            <div class="form_div">
                <el-form-item label="变更时间：" prop="changeTime">
                    <el-date-picker
                        v-model="gongSregAmtObj.changeTime"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </div>
            <div class="form_div">
                <el-form-item label="变更前：" prop="changeBefore">
                    <el-input v-model="gongSregAmtObj.changeBefore" type="text" placeholder="变更前"></el-input>
                </el-form-item>
            </div>
            <div class="form_div">
                <el-form-item label="变更后：" prop="changeAfter">
                    <el-input v-model="gongSregAmtObj.changeAfter" type="text" placeholder="变更后"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <el-form ref="law" :model="lawObj" label-width="111px" v-if="dialogType=='law'">
            <div class="form_div">
                <el-form-item label="日期：" prop="actionDate">
                    <el-date-picker
                        v-model="lawObj.actionDate"
                        value-format="yyyy-MM-dd"
                        :editable="false"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </div>
            <div class="form_div">
                <el-form-item label="裁判文书：" prop="judicativePaper">
                    <el-input
                        type="textarea"
                        :rows="6"
                        placeholder="请输入内容"
                        v-model="lawObj.judicativePaper">
                    </el-input>
                </el-form-item>
            </div>
            <div class="form_div">
                <el-form-item label="案由：" prop="brief">
                    <el-input
                        type="textarea"
                        :rows="6"
                        placeholder="请输入内容"
                        v-model="lawObj.brief">
                    </el-input>
                </el-form-item>
            </div>
            <div class="form_div">
                <el-form-item label="案件身份：" prop="caseStatus">
                    <el-input v-model="lawObj.caseStatus" type="text" placeholder="案件身份"></el-input>
                </el-form-item>
            </div>
            <div class="form_div">
                <el-form-item label="案号：" prop="reference">
                    <el-input v-model="lawObj.reference" type="text" placeholder="案号"></el-input>
                </el-form-item>
            </div>

        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveFuc" size="medium">保&nbsp;&nbsp;存</el-button>
            <el-button type="primary" @click="resetFuc" size="medium">重&nbsp;&nbsp;置</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import {cloneObj} from '@/files/js/cloneObj'
export default {
    data(){
        return{
            showDialog:false,
            dialogType:"",
            dialogTitle:"",

            comObj:{
                companyName:"",
                registAmt:"",
                registTime:"",
                bquityRatio:""
            },
            gongSregAmtObj:{
                changeTime:"",
                changeBefore:"",
                changeAfter:""
            },
            sharesObj:{
                shareholders:"",
                investmentProportion:"",
                subscribedCapital:"",
                capitalContribution:""
            },
            lawObj:{
                actionDate:"",
                judicativePaper:"",
                brief:"",
                caseStatus:"",
                reference:""
            }

        }
    },
    methods:{
        showDialogFuc(type){
            this.dialogType = type;
            switch(this.dialogType){
                case 'company' :
                    this.dialogTitle = '增加下属公司'
                break;
                case 'gongShang' :
                    this.dialogTitle = '增加工商变更'
                break;
                case 'shares' :
                    this.dialogTitle = '增加股权变更'
                break;
                case 'regAmt' :
                    this.dialogTitle = '增加注册资本变更'
                break;
                case 'law' :
                    this.dialogTitle = '增加法律诉讼'
                break;
            }


            this.showDialog = true;

        },
        saveFuc(){
            let obj;
            switch(this.dialogType){
                case 'company' :
                    obj = cloneObj(this.comObj)
                break;
                case 'gongShang' :
                    obj = cloneObj(this.gongSregAmtObj)
                break;
                case 'shares' :
                    obj = cloneObj(this.sharesObj)
                break;
                case 'regAmt' :
                    obj = cloneObj(this.gongSregAmtObj)
                break;
                case 'law' :
                    obj = cloneObj(this.lawObj)
                break;
            }
            this.$emit("saveFuc",this.dialogType,obj)
            this.closeFuc();
        },
        closeFuc(){
            this.showDialog = false;
            this.resetFuc();
        },
        resetFuc(){
            this.$refs[this.dialogType].resetFields();
        }
    }
}
</script>

<style lang="stylus" scoped>
.baseDialog{
    .form_div{
        width 388px;
        margin auto;
    }
}
</style>
