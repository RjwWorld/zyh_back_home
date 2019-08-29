<template>
<!-- 需求列表查看详情 -->
    <div class="demandDetails">
        <el-form label-width="111px" label-position="left">
            <div class="form_div">
                <el-form-item label="需求标题：" >
                    <span>{{dataObj.projectName}}</span>
                </el-form-item>
            </div>
            <div class="form_div">
                <el-form-item label="地址：" >
                    <span>{{dataObj.comProvince}}{{dataObj.comCity}}</span>
                </el-form-item>
                <el-form-item label="详细地址：" >
                    <span>{{dataObj.comAddrDtl}}</span>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="总价：" >
                    <span v-if="dataObj.isConfer === 0">{{dataObj.startAmt}}-{{dataObj.endAmt}}&nbsp;&nbsp;万元</span>
                    <span v-if="dataObj.isConfer === 1">面议</span>
                </el-form-item>
            </div>
            <div class="form_div">
                <el-form-item label="联系人：" >
                    <span>{{dataObj.linkMan}}</span>
                </el-form-item>
                <el-form-item label="联系电话：" >
                    <span>{{dataObj.linkTel}}</span>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="需求详情：" >
                    <span>{{dataObj.dtlInf}}</span>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    props:{
        dataObj:{
            type:Object,
        }
    },
}
</script>

<style lang="stylus" scoped>
.demandDetails{
    padding 0 100px;
    .form_div{
        display flex;
        >>>.el-form-item__content{
            width 233px;
        }
    }
}
</style>
