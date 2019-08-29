<template>
  <div class="table">
    <!-- <button @click="btn">123</button> -->
    <el-table
      :data="tableData.item"
      stripe
      :highlight-current-row="true"
      :header-row-style="{height:'53px'}"
      :row-style="{height:'53px'}"
      :cell-style="{padding:0}"
      :header-cell-style="{'background-color':'#fafafa'}"
    >
      <el-table-column
        align="left"
        :show-overflow-tooltip="true"
        v-for="(item,index) in tableHeader"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.width"
      >
        <template slot-scope="scope">
          <span v-if="item.prop =='status'">
            <span v-if="scope.row[item.prop] === 0">未发布</span>
            <span v-if="scope.row[item.prop] === 2">已发布</span>
          </span>
           <span v-else-if="item.prop=='hot'">
            <img v-if="scope.row.hot==true" src="../../flies/img/hot.png"/>
          </span>
          <!-- 最新咨询和新闻 -->
          <span v-else-if="item.prop=='private,status'">
            <span v-if="scope.row[item.prop.split(',')[1]] === 0">
              <el-button type="text" size="small" @click="operation('private','look',scope.row)">查看</el-button>
              <el-button type="text" size="small" @click="operation('private','up',scope.row)">发布</el-button>
              <el-button type="text" size="small" @click="operation('private','edit',scope.row)">编辑</el-button>
              <el-button
                type="text"
                size="small"
                @click="operation('private','del',scope.row)"
                style="color:#F56c6c"
              >删除</el-button>
            </span>
            <span v-if="scope.row[item.prop.split(',')[1]] === 2">
              <el-button type="text" size="small" @click="operation('private','look',scope.row)">查看</el-button>
              <el-button
                type="text"
                size="small"
                @click="operation('private','down',scope.row)"
                style="color:#F56c6c"
              >下架</el-button>
            </span>
          </span>
            <!-- 业务板块 -->
          <span v-else-if="item.prop=='business,status'">
            <span v-if="scope.row[item.prop.split(',')[1]] === 0">
              <el-button type="text" size="small" @click="operation('business','look',scope.row)">查看</el-button>
              <el-button type="text" size="small" @click="operation('business','up',scope.row)">发布</el-button>
              <el-button type="text" size="small" @click="operation('business','edit',scope.row)">编辑</el-button>
              <el-button
                type="text"
                size="small"
                @click="operation('business','del',scope.row)"
                style="color:#F56c6c"
              >删除</el-button>
            </span>
            <span v-if="scope.row[item.prop.split(',')[1]] === 2">
              <el-button type="text" size="small" @click="operation('business','look',scope.row)">查看</el-button>
              <el-button
                type="text"
                size="small"
                @click="operation('business','down',scope.row)"
                style="color:#F56c6c"
              >下架</el-button>
            </span>
          </span>
          <!-- 员工 -->
          <span v-else-if="item.prop=='staff,status'">
            <span v-if="scope.row[item.prop.split(',')[1]] === 0">
              <el-button type="text" size="small" @click="operation('staff','look',scope.row)">查看</el-button>
              <el-button type="text" size="small" @click="operation('staff','up',scope.row)">发布</el-button>
              <el-button type="text" size="small" @click="operation('staff','edit',scope.row)">编辑</el-button>
              <el-button
                type="text"
                size="small"
                @click="operation('staff','del',scope.row)"
                style="color:#F56c6c"
              >删除</el-button>
            </span>
            <span v-if="scope.row[item.prop.split(',')[1]] === 2">
              <el-button type="text" size="small" @click="operation('staff','look',scope.row)">查看</el-button>
              <el-button
                type="text"
                size="small"
                @click="operation('staff','down',scope.row)"
                style="color:#F56c6c"
              >下架</el-button>
            </span>
          </span>
          <span v-else>{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="page_btn">
      <el-pagination
        @current-change="changePage"
        :current-page.sync="tableData.pageNum"
        background
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="tableData.rows"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableHeader: {
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
    operation(section, type, data) {
      if (section == "private") {
        this.$emit("operation", type, data);
      }
      if (section == "business") {
        this.$emit("operation", type, data);
      }
      if (section == "staff") {
        this.$emit("operation", type, data);
      }
    },
    changePage(val) {
      this.$emit("changeFuc", "page", val);
    },
    // btn:function(){
    //   console.log(this.tableData)
    // }
  }
};
</script>

<style>
.page_btn {
  padding-top: 45px;
  text-align: right;
}
</style>
