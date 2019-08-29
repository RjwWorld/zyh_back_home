<template>
    <div class="auction">
        <div class="screening">
            <el-button type="success" @click="$refs.addEditDialog.showDialogFuc('add')">&nbsp;添&nbsp;加&nbsp;</el-button>
            <el-form :inline="true" class="demo-form-inline" size="medium">
                <el-form-item>
                    <el-input  @keyup.enter.native="changeFuc('page',1)" placeholder="名称,用途,省份" v-model="tableObj.keyWord" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loadingBtn" @click="changeFuc('page',1)">查&nbsp;询</el-button>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-select v-model="tableObj.status" @change="changeFuc('page',1)" placeholder="请选择">
                        <el-option v-for="item in auctionList" :key="item.code" :label="item.text" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>

        <table-list :tableTitle="tableHeader" :tableData="tableData" @changeFuc="changeFuc" @operation="operation"/>
        <add-auction-dialog ref="addEditDialog" @changeFuc="changeFuc"/>
    </div>
</template>

<script>
import allTableHeader from '@/files/js/tableHeader'
import TableList from '@/components/Table/table'
import {auctionList} from '@/files/js/initData'
import AddAuctionDialog from '@/components/Auction/addAuctionDialog'
import {aucList,aucDelById,aucGetById} from '@/api'
export default {
    components:{
        TableList,
        AddAuctionDialog
    },
    data(){
        return{
            loadingBtn:false,
            auctionList,

            tableData:{},
            tableHeader:allTableHeader.auctionHeader,
            tableObj:{
                status:null,
                keyWord:'',
                pageSize: 8,
                startPage: 1,
            },
        }
    },
    created(){
        this.changeFuc();
    },
    methods:{
        operation(type,data){
            switch(type){
                case 'del' :
                    this.$confirm('确定删除这条招拍挂信息?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(()=>{
                        aucDelById({id:data.id}).then(res=>{
                            if(res && res.errorCode === 0){
                                this.changeFuc('page',1)
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                            }
                        })
                    }).catch(()=>{})
                break;
                case 'edit' :
                    aucGetById({id:data.id}).then(res=>{
                        if(res && res.errorCode === 0){
                            this.$refs.addEditDialog.showDialogFuc('edit',res.body)
                        }
                    })
                break;
                case 'look' :
                    aucGetById({id:data.id}).then(res=>{
                        if(res && res.errorCode === 0){
                            this.$refs.addEditDialog.showDialogFuc('look',res.body)
                        }
                    })
                break;
                
            }
        },
        changeFuc(type,value){         
            if(type == 'page'){
                this.tableObj.startPage = value
            }
            aucList(this.tableObj).then(res=>{
                if(res && res.errorCode === 0){
                    this.tableData =res.body
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.auction{
    .screening{
        display flex;
        align-items center;
        padding 30px;
        height 100px;
        box-sizing border-box;
        
    }
    .el-form{
        margin-left 30px;
        >>>.el-form-item{
            margin-bottom 0;
        }
    }
}
</style>
