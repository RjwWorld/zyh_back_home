<template>
<!-- 股权技术 -->
    <div class="technology">
        <h1 class="h1_title">系统性创兴</h1>
        <div class="children_div">
            <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="dataObj.systematicInnovation">
            </el-input>
        </div>
        <h1 class="h1_title">技术迭代</h1>
        <div class="children_div">
            <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="dataObj.technologyIteration">
            </el-input>
        </div>
        <div class="next_btn">
            <el-button type="primary" size="medium" @click="nextFuc">下一步</el-button>
            <el-button type="primary" size="medium" @click="resetTechnology">重置</el-button>
        </div>
    </div>
</template>

<script>
import {publishTechnology} from '@/api'
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState({
            projectId:state => state.data.companyId
        })
    },
    data(){
        return{
            dataObj:{
                projectId:"",  //项目id
                systematicInnovation:"",    //系统性创兴
                technologyIteration:'',     //技术迭代
            }
        }
    },
    methods:{
        nextFuc(){
            if(this.projectId){
                this.dataObj.projectId = this.projectId
                publishTechnology(this.dataObj).then(res=>{
                    if(res && res.errorCode === 0){
                        this.$message({
                            showClose: true,
                            message: '技术保存成功,跳转到第五步',
                            type: 'success'
                        });
                        this.$router.push('/financialState')
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
        resetTechnology(){
            this.dataObj.systematicInnovation="";
            this.dataObj.technologyIteration="";
        }
    }

}
</script>

<style lang="stylus" scoped>
.technology{
    padding 30px 88px;
    .h1_title{
        width 111px;
        font-size 18px;
        font-weight bold;
        padding 0 12px 23px 0;
        box-sizing border-box;
        color black;
    }
    .children_div{
        width 500px;
        padding-left 40px;
        padding-bottom 66px;
        box-sizing border-box;
    }
    .next_btn{
        width 600px;
        padding 50px 0 88px;
        text-align center;
    }
}
</style>
