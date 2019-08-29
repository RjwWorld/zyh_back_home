<template>
    <div class="advertiseDialog">
        <el-dialog
            title="查看广告详情"
            :visible.sync="showDialog"
            @close="closeFuc"
            width="900px"
            center
        >
            <div class="advertiseForm">
                <el-form label-width="233px">
                    <div>
                        <el-form-item label="广告名：">{{dataObj.bannerName}}</el-form-item>
                    </div>
                    <div>
                        <el-form-item label="广告标题：">{{dataObj.typeName}}</el-form-item>
                    </div>
                    <div>
                        <el-form-item label="合作方：">{{dataObj.partner}}</el-form-item>
                    </div>
                    <div>
                        <el-form-item label="权重：">{{dataObj.weight}}</el-form-item>
                    </div>
                    <div>
                        <el-form-item label="列表缩略图：">
                            <img :src="dataObj.img?$store.state.user.ip+dataObj.img:''" alt="" width="333px">
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="链接：">{{dataObj.url}}</el-form-item>
                    </div>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            showDialog:false,
            dataObj:{}
        }
    },
    methods:{
        showDialogFuc(data){
            this.dataObj = data
            this.showDialog = true
        },
        closeFuc(){
            this.showDialog = false
        }
    }
}
</script>

<style lang="stylus" scoped>
.advertiseDialog{

}
</style>
