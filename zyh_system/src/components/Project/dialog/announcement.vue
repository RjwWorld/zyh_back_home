<template>
    <el-dialog title="公告查看" :visible.sync="showDialog" width="500px" center>
        <div class="bullrtinDetails">
            <el-form label-width="100px" label-position="right" >
                <div class="form_div">
                    <el-form-item label="新闻公告：">
                        <span>{{dataObj.msg}}</span>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitFuc" >确&nbsp;定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
data(){
    return{
        dataObj:{},
        showDialog: false,
    }
},
methods:{
     showDialogFuc: function(type, showData) {
      this.dialogType = type;
      this.dataObj = showData;
      this.showDialog = true;
    },
    submitFuc(){
        this.showDialog=false
    }
}
}
</script>

<style>

</style>
