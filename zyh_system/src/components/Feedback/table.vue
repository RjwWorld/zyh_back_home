<template>
  <div class="table">
    <el-table
      :data="tableData.item"
      border
      height="633"
      :highlight-current-row="true"
      :header-row-style="{height:'80px'}"
      :row-style="{height:'65px'}"
      :cell-style="{padding:0}"
      :header-cell-style="{'background-color':'#fafafa'}"
    >
        <el-table-column 
        type="index"
        :index="typeIndex"
        label="序号"
            width="99"
            align="center"
        ></el-table-column>
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
        <span v-if="item.prop=='status'">
         <el-button type="text" size="small" @click="operation('feedback','look',scope.row)">查看</el-button>
        </span>
        <span v-else>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页按钮-->
    <div class="page_btn">
      <el-pagination
        @current-change="changePage"
        :current-page.sync="tableData.pageNum"
        background
        :page-size="8"
        layout="total, prev, pager, next, jumper"
        :total="tableData.rows"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableTitle: {
      type: Array
    },
    tableData: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    typeIndex(index){
        return index + (this.tableData.pageNum - 1) * 8 + 1;
    },
    operation(section, type, data) {
     if (section == "feedback") {
        this.$emit("operation", type, data);
      }
    },
    changePage(val) {
      this.$emit("changeFuc", "page", val);
    }
  }
};
</script>

<style lang="stylus" scoped>
.table {
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .page_btn {
    padding-top: 45px;
    text-align: center;
  }
}
</style>
