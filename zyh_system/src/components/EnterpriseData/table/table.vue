<template>
    <div class="table">
        <el-table
            :data="tableData"
            border
            :header-row-style="{height:'33px'}"
            :row-style="{height:'50px'}"
            :cell-style="{padding:0}"
            :header-cell-style="{'background-color':'#fafafa'}"
            style="width: 666px"
        >
            <el-table-column align="center" type="index"></el-table-column>
            <el-table-column
                align="center"
                :show-overflow-tooltip="true"
                v-for="(item,index) in tableTitle"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                :min-width="item.width"
            >
                <template slot-scope="scope">
                    <span v-if="item.label === '操作'">
                        <el-button type="text" size="small" @click="delFuc(item.prop,scope.$index)">删除</el-button>
                    </span>
                    <span v-else>{{scope.row[item.prop]}}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="add_btn">
            <el-button type="primary" size="medium" @click="addFuc">增&nbsp;&nbsp;加</el-button>
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
            this.$emit('addDialogFuc',this.type)
        },
        delFuc(type,index){
            this.$emit('delFuc',type,index)
        }
    }
}
</script>

<style lang="stylus" scoped>
.table{
    padding-left 40px;
    .add_btn{
        padding 16px 0 24px;
    }
    >>>.el-table th {
        padding 0;
    }
}
</style>
