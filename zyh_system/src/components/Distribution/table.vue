<template>
  <div class="table">
    <!-- <el-button @click="func">123</el-button> -->
    <el-table
      :data="tableData"
      border
      height="633"
      :highlight-current-row="true"
      :header-row-style="{height:'80px'}"
      :row-style="{height:'65px'}"
      :cell-style="{padding:0}"
      :header-cell-style="{'background-color':'#fafafa'}"
    >
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
          <span v-if="item.prop=='levelNo,status'">
            <el-button type="text" size="small" @click="operation('levelNo','look',scope.row)">查看</el-button>
          </span>
          <span v-else>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableTitle: {
      type: Array
    },
    tableData: {
      type: Array
    }
  },
  data() {
    return {};
  },
  methods: {
    // func() {
    //   console.log(this.tableData);
    // },
    operation(section, type, data) {
      if (section == "levelNo") {
        this.$emit("operation", type, data);
      }
    }
  }
};
</script>

<style>
</style>
