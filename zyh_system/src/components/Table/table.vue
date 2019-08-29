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
        align="center"
        :show-overflow-tooltip="true"
        v-for="(item,index) in tableTitle"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.width"
      >
        <template slot-scope="scope">
          <!-- 项目、需求 -->
          <span
            v-if="item.prop =='comProvince,comCity'"
          >{{scope.row[item.prop.split(",")[0]]}}{{scope.row[item.prop.split(",")[1]]}}</span>
          <!-- 总价 -->
          <span
            v-else-if="item.prop =='startAmt'"
          >{{scope.row.isConfer ==1?'面议':scope.row[item.prop]}}</span>
          <!-- 标签 -->
          <span v-else-if="item.prop =='tagVOList'">
            <el-tag v-for="(item,index) in scope.row[item.prop]" :key="index">{{item.tagName}}</el-tag>
          </span>
          <!-- 状态 -->
          <span v-else-if="item.prop =='status'">
            <span v-if="scope.row[item.prop] === 0">已下架</span>
            <span v-if="scope.row[item.prop] === 1">待审核</span>
            <span v-if="scope.row[item.prop] === 2">已上架</span>
            <span v-if="scope.row[item.prop] === 3">审核拒绝</span>
          </span>
          <!-- 项目操作 和 需求操作 可以合并,但是为了保险起见,虽然完全重复,但是还是分开写 -->
          <span v-else-if="item.prop =='project,status'">
            <span v-if="scope.row[item.prop.split(',')[1]] === 0">
              <el-button type="text" size="small" @click="operation('project','up',scope.row)">上架</el-button>
              <el-button type="text" size="small" @click="operation('project','edit',scope.row)">编辑</el-button>
              <el-button
                type="text"
                size="small"
                style="color:#F56c6c"
                @click="operation('project','del',scope.row)"
              >删除</el-button>
            </span>
            <span v-if="scope.row[item.prop.split(',')[1]] === 1">
              <el-button type="text" size="small" @click="operation('project','audit',scope.row)">审核</el-button>
              <!--<el-button type="text" size="small" @click="operation('project','look',scope.row)">查看</el-button>-->
            </span>
            <span v-if="scope.row[item.prop.split(',')[1]] === 2">
              <el-button type="text" size="small" @click="operation('project','down',scope.row)">下架</el-button>
            </span>
            <span v-if="scope.row[item.prop.split(',')[1]] === 3">
              <!--<el-button type="text" size="small" @click="operation('project','look',scope.row)">查看</el-button>-->
              <el-button type="text" size="small" @click="operation('project','edit',scope.row)">编辑</el-button>
            </span>
            <span>
              <el-button type="text" size="small" @click="operation('project','look',scope.row)">查看</el-button>
            </span>
          </span>
          <!-- 需求操作 -->
          <span v-else-if="item.prop =='demand,status'">
            <span v-if="scope.row[item.prop.split(',')[1]] === 0">
              <el-button type="text" size="small" @click="operation('demand','up',scope.row)">上架</el-button>
              <el-button type="text" size="small" @click="operation('demand','edit',scope.row)">编辑</el-button>
              <el-button
                type="text"
                size="small"
                style="color:#F56c6c"
                @click="operation('demand','del',scope.row)"
              >删除</el-button>
              <el-button type="text" size="small" @click="operation('demand','look',scope.row)">查看</el-button>
            </span>
            <span v-if="scope.row[item.prop.split(',')[1]] === 1">
              <el-button type="text" size="small" @click="operation('demand','audit',scope.row)">审核</el-button>
              <el-button type="text" size="small" @click="operation('demand','look',scope.row)">查看</el-button>
            </span>
            <span v-if="scope.row[item.prop.split(',')[1]] === 2">
              <el-button type="text" size="small" @click="operation('demand','down',scope.row)">下架</el-button>
              <el-button type="text" size="small" @click="operation('demand','look',scope.row)">查看</el-button>
            </span>
            <span v-if="scope.row[item.prop.split(',')[1]] === 3">
              <el-button type="text" size="small" @click="operation('demand','look',scope.row)">查看</el-button>
              <el-button type="text" size="small" @click="operation('demand','edit',scope.row)">编辑</el-button>
            </span>
          </span>
          <!-- 发放奖励 -->
          <span v-else-if="item.prop =='reward'">
            <span v-if="scope.row[item.prop] === 0" style="color:#ff5e6c">未发放</span>
            <span v-if="scope.row[item.prop] === 1" style="color:#66b1ff">已发放</span>
          </span>
          <span v-else-if="item.prop =='inviteRewardHeader,reward'">
            <el-button
              v-if="scope.row[item.prop.split(',')[1]] === 0"
              type="text"
              size="small"
              @click="operation('inviteRewardHeader','cc',scope.row)"
            >发放奖励</el-button>
          </span>

          <!-- 用户 -->
          <span
            v-else-if="item.prop =='addrProvince,addrCity'"
          >{{scope.row[item.prop.split(",")[0]]}}{{scope.row[item.prop.split(",")[1]]}}</span>
          <span v-else-if="item.prop =='individualStatus'">
            <span v-if="scope.row[item.prop] === 0">未认证</span>
            <span v-if="scope.row[item.prop] === 1">
              <el-button
                type="text"
                size="small"
                @click="operation('user','individual',scope.row)"
              >待审核</el-button>
            </span>
            <span v-if="scope.row[item.prop] === 2" style="color:#67c23a">已认证</span>
            <span v-if="scope.row[item.prop] === 3" style="color:#F56c6c">认证失败</span>
          </span>
          <span v-else-if="item.prop =='bizStatus'">
            <span v-if="scope.row[item.prop] === 0">未认证</span>
            <span v-if="scope.row[item.prop] === 1">
              <el-button type="text" size="small" @click="operation('user','biz',scope.row)">待审核</el-button>
            </span>
            <span v-if="scope.row[item.prop] === 2" style="color:#67c23a">已认证</span>
            <span v-if="scope.row[item.prop] === 3" style="color:#F56c6c">认证失败</span>
          </span>
          <span v-else-if="item.prop =='faStatus'">
            <span v-if="scope.row[item.prop] === 0">未认证</span>
            <span v-if="scope.row[item.prop] === 1">
              <el-button type="text" size="small" @click="operation('user','fa',scope.row)">待审核</el-button>
            </span>
            <span v-if="scope.row[item.prop] === 2" style="color:#67c23a">已认证</span>
            <span v-if="scope.row[item.prop] === 3" style="color:#F56c6c">认证失败</span>
          </span>
          <span v-else-if="item.prop =='user,individualStatus,bizStatus'">
            <!-- <el-button v-if="scope.row[item.prop.split(',')[1]] === 1" type="text" size="small" @click="operation('user','individual',scope.row)">个人认证</el-button>
            <el-button v-if="scope.row[item.prop.split(',')[2]] === 1" type="text" size="small" @click="operation('user','biz',scope.row)">企业认证</el-button>-->
            <el-button type="text" size="small" @click="operation('user','look',scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="operation('user','edit',scope.row)">编辑</el-button>
            <!-- <el-button type="text" size="small" @click="operation('user','del',scope.row)">删除</el-button> -->
          </span>

          <!-- 广告位的状态,多加了一个advertisec 跟项目需求的status区分开 -->
          <span v-else-if="item.prop =='advertisec,status'">
            <span v-if="scope.row[item.prop.split(',')[1]] === 0">已下架</span>
            <span v-if="scope.row[item.prop.split(',')[1]] === 1">已上架</span>
          </span>
          <span v-else-if="item.prop =='advertise,status'">
            <span v-if="scope.row[item.prop.split(',')[1]] === 0">
              <el-button type="text" size="small" @click="operation('advertise','up',scope.row)">上架</el-button>
              <el-button
                type="text"
                size="small"
                style="color:#F56c6c"
                @click="operation('advertise','del',scope.row)"
              >删除</el-button>
              <el-button
                type="text"
                size="small"
                @click="operation('advertise','edit',scope.row)"
              >编辑</el-button>
            </span>
            <span v-if="scope.row[item.prop.split(',')[1]] === 1">
              <el-button
                type="text"
                size="small"
                @click="operation('advertise','down',scope.row)"
              >下架</el-button>
              <el-button
                type="text"
                size="small"
                @click="operation('advertise','look',scope.row)"
              >查看</el-button>
            </span>
          </span>

          <!-- 评论管理 -->
          <span v-else-if="item.prop == 'projectTypeCode'">
            <span v-if="scope.row[item.prop] === 1000">资产</span>
            <span v-if="scope.row[item.prop] === 2000">地产</span>
            <span v-if="scope.row[item.prop] === 3000">项目股权</span>
            <span v-if="scope.row[item.prop] === 4000">融资</span>
          </span>
          <span v-else-if="item.prop == 'isComment'">
            <span v-if="scope.row[item.prop] === 0" style="color:#F56c6c">评论关闭</span>
            <span v-if="scope.row[item.prop] === 1" style="color:#67c23a">评论开启</span>
          </span>
          <span v-else-if="item.prop == 'isComment,commentSum'">
            <el-button
              v-if="scope.row[item.prop.split(',')[0]] === 0"
              type="text"
              size="small"
              @click="operation('comments','open',scope.row)"
            >开启</el-button>
            <el-button
              v-if="scope.row[item.prop.split(',')[0]] === 1"
              type="text"
              size="small"
              @click="operation('comments','close',scope.row)"
            >关闭</el-button>
            <el-button
              v-if="scope.row[item.prop.split(',')[1]] > 0"
              type="text"
              size="small"
              @click="operation('comments','look',scope.row)"
            >查看</el-button>
          </span>

          <!-- 消息推送 -->
          <span v-else-if="item.prop == 'msgc,status'">
            <span v-if="scope.row[item.prop.split(',')[1]] === 0" style="color:#F56c6c">未发送</span>
            <span v-if="scope.row[item.prop.split(',')[1]] === 1">已发送</span>
          </span>
          <span v-else-if="item.prop == 'msg,status'">
            <span v-if="scope.row[item.prop.split(',')[1]] === 0">
              <el-button type="text" size="small" @click="operation('msg','edit',scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="operation('msg','push',scope.row)">发送</el-button>
            </span>
            <el-button
              type="text"
              size="small"
              style="color:#F56c6c"
              @click="operation('msg','del',scope.row)"
            >删除</el-button>
          </span>
                    <!-- 评论管理 -->
                    <span v-else-if="item.prop == 'projectTypeCode'">
                        <span v-if="scope.row[item.prop] === 1000">资产</span>
                        <span v-if="scope.row[item.prop] === 2000">地产</span>
                        <span v-if="scope.row[item.prop] === 3000">项目股权</span>
                        <span v-if="scope.row[item.prop] === 4000">融资</span>
                        <span v-if="scope.row[item.prop] === 5000">投资</span>
                        <span v-if="scope.row[item.prop] === 7000">工业园区</span>
                    </span>
                    <span v-else-if="item.prop == 'isComment'">
                        <span v-if="scope.row[item.prop] === 0" style="color:#F56c6c">评论关闭</span>
                        <span v-if="scope.row[item.prop] === 1" style="color:#67c23a">评论开启</span>
                    </span>
                    <span v-else-if="item.prop == 'isComment,commentSum'">
                        <el-button v-if="scope.row[item.prop.split(',')[0]] === 0" type="text" size="small" @click="operation('comments','open',scope.row)">开启</el-button>
                        <el-button v-if="scope.row[item.prop.split(',')[0]] === 1" type="text" size="small" @click="operation('comments','close',scope.row)">关闭</el-button>
                        <el-button v-if="scope.row[item.prop.split(',')[1]] > 0" type="text" size="small" @click="operation('comments','look',scope.row)">查看</el-button>
                    </span>

          <!-- 招拍挂 -->
          <span v-else-if="item.prop == 'auctionc,status'">
            <span v-if="scope.row[item.prop.split(',')[1]] === 0" style="color:#F56c6c">待竞拍</span>
            <span v-if="scope.row[item.prop.split(',')[1]] === 2" style="color:#909399">已结束</span>
          </span>
          <span v-else-if="item.prop == 'auction,status'">
            <el-button type="text" size="small" @click="operation('auction','look',scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="operation('auction','edit',scope.row)">编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="operation('auction','del',scope.row)"
              style="color:#F56c6c"
            >删除</el-button>
          </span>
          <!-- 新闻公告 -->
          <span v-else-if="item.prop == 'bulletinc,status'">
            <span v-if="scope.row[item.prop.split(',')[1]] === 0" style="color:#F56c6c">未上架</span>
            <span v-if="scope.row[item.prop.split(',')[1]] === 1" style="color:#55a8fd">已上架</span>
          </span>
          <span v-else-if="item.prop =='bulletin,status'">
            <span v-if="scope.row[item.prop.split(',')[1]] === 0">
              <el-button
                type="text"
                size="small"
                @click="operation('bulletin','up',scope.row)"
              >上架</el-button>
              <el-button
                type="text"
                size="small"
                @click="operation('bulletin','look',scope.row)"
              >查看</el-button>
              <el-button
                type="text"
                size="small"
                @click="operation('bulletin','edit',scope.row)"
              >编辑</el-button>
              <el-button
                type="text"
                size="small"
                @click="operation('bulletin','del',scope.row)"
                style="color:#F56c6c"
              >删除</el-button>
            </span>
             <span v-if="scope.row[item.prop.split(',')[1]] === 1">
              <el-button
                type="text"
                size="small"
                @click="operation('bulletin','down',scope.row)"
              >下架</el-button>
              <el-button
                type="text"
                size="small"
                @click="operation('bulletin','look',scope.row)"
              >查看</el-button>
              <el-button
                type="text"
                size="small"
                @click="operation('bulletin','edit',scope.row)"
              >编辑</el-button>
            </span>
          </span>
          <!-- 资质模块一 -->
          <span v-else-if="item.prop=='qualificationc,status'">
            <span v-if="scope.row[item.prop.split(',')[1]]===0">
              <el-button
                type="text"
                size="small"
                @click="operation('qualificationc','topay',scope.row)"
              >需回访</el-button>
            </span>
            <span v-if="scope.row[item.prop.split(',')[1]]===1" style="color:#909399">已回访</span>
          </span>
          <span v-else-if="item.prop =='qualification,status'">
            <el-button
              type="text"
              size="small"
              @click="operation('qualification','look',scope.row)"
            >查看</el-button>
            <el-button
              type="text"
              size="small"
              @click="operation('qualification','edit',scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="operation('qualification','del',scope.row)"
              style="color:#F56c6c"
            >删除</el-button>
          </span>
          <!-- 资质模块二 -->
          <span v-else-if="item.prop =='qualificationb,status'">
            <span v-if="scope.row[item.prop.split(',')[1]] === 0">
              <el-button
                type="text"
                size="small"
                @click="operation('qualificationb','up',scope.row)"
              >上架</el-button>
              <el-button
                type="text"
                size="small"
                @click="operation('qualificationb','edit',scope.row)"
              >编辑</el-button>
              <el-button
                type="text"
                size="small"
                @click="operation('qualificationb','del',scope.row)"
                style="color:#F56c6c"
              >删除</el-button>
            </span>
            <span v-if="scope.row[item.prop.split(',')[1]] === 1">
              <el-button
                type="text"
                size="small"
                @click="operation('qualificationb','audit',scope.row)"
              >审核</el-button>
            </span>
            <span v-if="scope.row[item.prop.split(',')[1]] === 2">
              <el-button
                type="text"
                size="small"
                @click="operation('qualificationb','down',scope.row)"
              >下架</el-button>
            </span>
            <span v-if="scope.row[item.prop.split(',')[1]] === 3">
              <el-button
                type="text"
                size="small"
                @click="operation('qualificationb','edit',scope.row)"
              >编辑</el-button>
            </span>
            <span>
              <el-button
                type="text"
                size="small"
                @click="operation('qualificationb','look',scope.row)"
              >查看</el-button>
            </span>
          </span>
          <!--投资按钮-->
          <span v-else-if="item.prop =='invest,status'">
            <!--已下架时的按钮-->
            <span v-if="scope.row[item.prop.split(',')[1]] === 0">
              <el-button type="text" size="small" @click="operation('invest','up',scope.row)">上架</el-button>
              <el-button type="text" size="small" @click="operation('invest','edit',scope.row)">编辑</el-button>
              <el-button
                type="text"
                size="small"
                style="color:#F56c6c"
                @click="operation('invest','del',scope.row)"
              >删除</el-button>
              <el-button type="text" size="small" @click="operation('invest','look',scope.row)">查看</el-button>
            </span>
            <!--待审核时的按钮-->
            <span v-if="scope.row[item.prop.split(',')[1]] === 1">
              <el-button type="text" size="small" @click="operation('invest','audit',scope.row)">审核</el-button>
              <el-button type="text" size="small" @click="operation('invest','look',scope.row)">查看</el-button>
            </span>
            <!--已上架时的按钮-->
            <span v-if="scope.row[item.prop.split(',')[1]] === 2">
              <el-button type="text" size="small" @click="operation('invest','down',scope.row)">下架</el-button>
              <el-button type="text" size="small" @click="operation('invest','look',scope.row)">查看</el-button>
            </span>
            <!--审核拒绝时的按钮-->
            <span v-if="scope.row[item.prop.split(',')[1]] === 3">
              <el-button type="text" size="small" @click="operation('invest','look',scope.row)">查看</el-button>
              <el-button type="text" size="small" @click="operation('invest','edit',scope.row)">编辑</el-button>
            </span>
          </span>
          <span v-else-if="item.prop == 'landAll'">
            <el-button type="text" size="small" @click="operation('landAll','look',scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="operation('landAll','del',scope.row)">删除</el-button>
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
    operation(section, type, data) {
      console.log(section, type, data);
      console.log(this.tableData);
      // this.$emit('operation',type,data)
      if (section == "project" || section == "demand") {
        this.$emit("operation", type, data);
        //   console.log(data)
      }
      if (section == "user") {
        this.$emit("operation", type, data);
      }
      if (section == "advertise") {
        this.$emit("operation", type, data);
      }
      if (section == "inviteRewardHeader") {
        this.$emit("operation", type, data);
      }
      if (section == "comments") {
        this.$emit("operation", type, data);
      }
      if (section == "msg") {
        this.$emit("operation", type, data);
      }
      if (section == "auction") {
        this.$emit("operation", type, data);
      }
      //投资页面的按钮
      if (section == "invest") {
        this.$emit("operation", type, data);
      }
      if (section == "qualification") {
        this.$emit("operation", type, data);
      }
      if (section == "qualificationc") {
        this.$emit("operation", type, data);
      }
      if (section == "qualificationb") {
        this.$emit("operation", type, data);
      }
      if (section == "bulletin") {
        this.$emit("operation", type, data);
      }
      if (section == "landAll") {
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
