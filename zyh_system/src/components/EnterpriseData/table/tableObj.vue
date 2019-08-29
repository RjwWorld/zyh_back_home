<template>
    <div class="tableObj">
        <el-table
            :data="tableData"
            border
            :header-row-style="{height:'33px'}"
            :row-style="{height:'50px'}"
            :cell-style="{padding:0}"
            :header-cell-style="{'background-color':'#fafafa'}"
            style="width: 666px"
        >
            <el-table-column 
                align="center"
                :show-overflow-tooltip="true"
                v-for="(item,index) in tableTitle" 
                :key="index"
                :label="item.label"
                :prop="item.prop"
            >

            </el-table-column>
        </el-table>
        <div class="add_btn">
            <el-button type="primary" size="medium" @click="addFuc">增&nbsp;&nbsp;加</el-button>
            <el-button type="primary" size="medium" @click="delFuc">删除表格</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        tableTitle:{
            type:Array
        },
        tableData:{
            type:Array
        },
        type:{
            type:String
        }
    },
    methods:{
        addFuc(){
            this.$emit('addFuc',this.type)
        },
        delFuc(){
            this.$emit('delFuc',this.type)
        }
    }
}
</script>

<style lang="stylus" scoped>
.tableObj{
    padding-left 33px;
    .add_btn{
        padding 16px 0 24px;
    }
    >>>.el-table th {
        padding 0;
    }
}
</style>
