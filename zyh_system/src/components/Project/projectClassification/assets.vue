<template>
    <div class="assets">
        <el-form :model="a_obj" ref="A_form" label-position="left" size="medium" label-width="111px">
            <div class="must_div">

                <!--<div>-->
                    <!--<el-form-item label="项目需求：" prop="projectRequirement">-->
                        <!--<el-select v-model="a_obj.projectRequirement" placeholder="请选择">-->
                            <!--<el-option-->
                                <!--v-for="item in initData.pubProjectBaseInitRespVO.projectRequirementList"-->
                                <!--:key="item.code"-->
                                <!--:label="item.name"-->
                                <!--:value="item.code">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                <!--</div>-->



            </div>
            <div class="border"></div>
            <div class="optional_div">
                <h1 class="h1_title">非必填项</h1>
                <div class="form_div">
                    <el-form-item label="权证编号：" prop="warrantNo">
                            <el-input v-model="a_obj.warrantNo" type="text" placeholder="提示(不动产证/土地合同编号)" maxlength="10"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="使用期限：">
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
                    <el-form-item label="权利人是否行使优先受让权：" prop="hasUsePriority" label-width="233px" >
                        <el-radio-group v-model="a_obj.hasUsePriority">
                            <el-radio :label="item.code" v-for="item in initData.pubProjectAInitRespVO.yesOrNoList" :key="item.code">{{item.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
import UploadImg from '@/components/UploadImg/uploadImg'
import {upload} from '@/api'
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

            time:null,   //时间

            a_obj:{
                warrantNo:"", //权证编号
                startUseTime:"", //开始期限
                endUseTime:"",  //结束期限
                hasUsePriority:"", //权利人是否行使优先受让权
            }
        }
    },
    methods:{
        mergeFuc(){
            if(this.time && this.time.length > 0){
                this.a_obj.startUseTime = this.time[0]
                this.a_obj.endUseTime = this.time[1]
            }
            else{
                this.a_obj.startUseTime = "";
                this.a_obj.endUseTime = "";
            }
            this.$emit('mergeFuc',this.a_obj)
        },
        resetForm(){
            this.time=null
            this.$refs.A_form.resetFields();
        }
    }
}
</script>

<style lang="stylus" scoped>
.assets{
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
            width 50px;
        }
    }
    .border{
        border 1px solid #e6e6e6
    }

}
</style>
