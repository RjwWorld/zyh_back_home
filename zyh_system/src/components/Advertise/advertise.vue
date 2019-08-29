<template>
    <div class="advertise">
        <div class="addBtn">
            <el-button type="primary" icon="el-icon-plus" @click="$refs.addEditDialog.showDialogFuc('add')">添&nbsp;加</el-button>
        </div>
        <table-list :tableTitle="tableHeader" :tableData="tableData" @changeFuc="changeFuc" @operation="operation"/>
        <advertise-dialog ref="previewDialog"/>
        <advertise-edit-dialog ref="addEditDialog" @changeFuc="changeFuc"/>
    </div>
</template>

<script>
import allTableHeader from '@/files/js/tableHeader'
import TableList from '@/components/Table/table'
import {bannerList,bannerStatus,deleteBanner,getBannerDtl} from '@/api'
import AdvertiseDialog from '@/components/Advertise/dialog/advertiseDialog'
import AdvertiseEditDialog from '@/components/Advertise/dialog/advertiseEditDialog'
export default {
    components:{
        TableList,
        AdvertiseDialog,
        AdvertiseEditDialog
    },
    data(){
        return{
            tableData:{},
            tableHeader:allTableHeader.advertiseHeader,

            tableObj:{
                pageSize:8,
                startPage:1
            }
        }
    },
    created(){
        this.changeFuc();
    },
    methods:{
        operation(type,data){
            let obj = {id:data.id};
            switch(type){
                case 'up':
                    obj.status = 1;
                case 'down':
                    if(type == 'down'){
                        obj.status = 0;
                    }
                    this.$confirm(`确定${type == 'down' ? '下架' :'上架'}该广告?`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(() => {
                        bannerStatus(obj).then(res=>{
                            if(res.errorCode === 0){
                                this.changeFuc();
                                this.$message({
                                    showClose: true,
                                    message: `${type == 'down' ? '下架' :'上架'}成功`,
                                    type: 'success'
                                }); 
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消发布'
                        });          
                    });
                break;
                case 'del':
                    this.$confirm('确定删除该广告?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type:'warning'
                    }).then(() => {
                        deleteBanner(obj).then(res=>{
                            if(res.errorCode === 0){
                                this.changeFuc();
                                this.$message({
                                    showClose: true,
                                    message: '删除成功',
                                    type: 'success'
                                }); 
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消发布'
                        });          
                    });
                break;
                case 'look':
                    this.advertiseLook(data.id,type)
                break;
                case 'edit':
                    this.advertiseLook(data.id,type)
                break;
            }
        },
        advertiseLook(id,type){
            getBannerDtl({id}).then(res=>{
                if(res.errorCode === 0){
                    if(type == 'look'){
                        this.$refs.previewDialog.showDialogFuc(res.body);
                    }
                    if(type == 'edit'){
                        this.$refs.addEditDialog.showDialogFuc(type,res.body)
                    }
                }
            })
        },

        changeFuc(type,value){
            if(type == 'page'){
                this.tableObj.startPage = value;
            }
            bannerList(this.tableObj).then(res=>{
                if(res.errorCode == 0){
                    this.tableData = res.body
                }
            })
        },
    }
}
</script>

<style lang="stylus" scoped>
.advertise{
    width 100%;
    height 100%;
    background white;
    box-sizing border-box;
    .addBtn{
        height 100px;
        line-height 100px;
        padding-left 50px;
        box-sizing border-box;
    }
}
</style>
