<template>
<!-- 股权商业模式 -->
    <div class="businessModel">
        <h1 class="h1_title">商业伦理</h1>
        <div class="children_div">
            <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="dataObj.businessEthics">
            </el-input>
        </div>
        <h1 class="h1_title">商业规律</h1>
        <div class="children_div">
            <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="dataObj.commercialLaw">
            </el-input>
        </div>
        <h1 class="h1_title">客观规律</h1>
        <div class="children_div">
            <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="dataObj.objectiveLaws">
            </el-input>
        </div>
        <div class="next_btn">
            <el-button type="primary" size="medium" @click="nextFuc">完成</el-button>
            <el-button type="primary" size="medium" @click="resetBusiness">重置</el-button>
        </div>
    </div>
</template>

<script>
import {publishBizModel} from '@/api'
import {mapState,mapActions} from 'vuex'
export default {
    computed:{
        ...mapState({
            projectId:state => state.data.companyId
        })
    },
    data(){
        return{
            dataObj:{
                businessEthics:"",    //商业伦理
                commercialLaw:"",  //商业规律
                objectiveLaws:"",  //客观规律
            }
        }
    },
    methods:{
        nextFuc(){
            if(this.projectId){
                this.dataObj.projectId = this.projectId
                publishBizModel(this.dataObj).then(res=>{
                    if(res && res.errorCode === 0){
                        this.getCompanyId('');
                        this.$message({
                            showClose: true,
                            message: '企业参数添加完成,跳转到企业列表生成脑图',
                            type: 'success'
                        });
                        // this.$router.push('/enterpriseList')
                        window.location.href = '/admin/enterpriseList'
                    }
                })
            }
            else{
                this.$message({
                    showClose: true,
                    message: '请先完善基本信息',
                    type: 'warning'
                });
            }
        },
        resetBusiness(){
            this.dataObj={
                businessEthics:"",    //商业伦理
                commercialLaw:"",  //商业规律
                objectiveLaws:"",  //客观规律
            }
        },
        ...mapActions(['getCompanyId'])
    }
}
</script>

<style lang="stylus" scoped>
.businessModel{
    padding 30px 88px;
    .h1_title{
        width 111px;
        font-size 18px;
        font-weight bold;
        padding 0 12px 23px 0;
        box-sizing border-box;
    }
    .children_div{
        width 500px;
        padding-left 40px;
        padding-bottom 20px;
        box-sizing border-box;
    }
    .next_btn{
        width 600px;
        padding 50px 0 20px;
        text-align center;
    }
}
</style>
