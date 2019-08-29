<template>
  <div class="header">
    <div class="header-item" @click="outLogin">
      <img src="@/flies/img/gogo.png" alt>
      <span>退出</span>
    </div>
    <div class="header-item">
      <img src="@/flies/img/user.png" alt>
      <span>翔达管理员</span>
    </div>
  </div>
</template>

<script>
import {out} from "@/api";
export default {
  methods: {
    outLogin() {
      out().then(res => {
        this.$confirm("确定退出该账号?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            out().then(res => {
              if (res.errorCode == 0) {
                console.log(res)
                this.$message({
                  type: "success",
                  message: "退出成功!"
                });
                window.location.href = "/admin/login";
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      });
    }
  }
};
</script>

<style scoped lang="less">
.header {
  height: 80px;
  width: 100%;
  background-color: white;
  .header-item {
    float: right;
    display: flex;
    align-items: center;
    line-height: 70px;
    margin-right: 40px;
    cursor: pointer;
  }
  img{
    margin-right: 10px;
  }
}
</style>
