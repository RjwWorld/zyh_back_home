<template>
  <div class="quanlificationList">
    <el-tabs v-model="activeName">
      <el-tab-pane label="模块一" name="first">
        <quan></quan>
      </el-tab-pane>
      <el-tab-pane label="模块二" name="second">
        <quanl></quanl>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import quanlificationOne from "@/components/Project/dialog/quanlificationOne"
import quanlificationTwo from "@/components/Project/dialog/quanlificationTwo"
export default {
  name:"quanlificationList",
  components: {
    quan:quanlificationOne,
    quanl:quanlificationTwo
  },
  data() {
    return {
      activeName: "first",
    };
  },
};
</script>

<style lang="stylus">
.el-tabs {
  margin-left: 15px;
}

.el-tabs__item {
  font-size: 20px !important;
  height: 50px;
}


</style>
