<template>
  <div>
    <div class="login-container">
      <div class="left-box">
        <img src="@/flies/img/logo-one.jpg" alt class="left-img">
      </div>
      <div class="right-box">
        <!-- <p class="come-text">欢迎登陆</p>
          <div class="login-box">
            <div class="id-box">
              <span>账号</span>
              <input type="text" v-model="userMsg.account">
            </div>
            <div class="id-box" style="margin-top: 40px;">
              <span>密码</span>
              <input type="password" v-model="userMsg.pwd">
            </div>
          </div>
        <p class="login-btn" @click="loginFuc()">登陆</p>-->
        <el-form status-icon :rules="rules" :model="userMsg" ref="userMsg">
          <el-form-item>
            <h1 class="come-text">欢迎登陆</h1>
          </el-form-item>
          <el-form-item label="账号：" prop="account" class="it"  >
            <el-input @keyup.enter.native="loginFuc('userMsg')" type="text" v-model="userMsg.account" ></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="pwd" class="it">
            <el-input type="password" v-model="userMsg.pwd" @keyup.enter.native="loginFuc('userMsg')"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="loginFuc('userMsg')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { userLogin } from "@/api";
export default {
  data() {
    let admin = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    let password = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    return {
      userMsg: {
        account: "",
        pwd: ""
      },
      rules: {
        account: [{ validator: admin, trigger: "blur" }],
        pwd: [{ validator: password, trigger: "blur" }]
      }
    };
  },
  methods: {
    // loginFuc:function(){
    //      this.$router.push('/newsList')
    // }
    loginFuc(formName) {
      // console.log(formName);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userLogin(this.userMsg).then(res => {
            if (res.errorCode == 0) {
              // let username="xd7539510$";
              // let pass="xd7539510$"
              this.$message({
                showClose: true,
                message: "登录成功",
                type: "success"
              });
              window.location.href = "/admin/newsList";
            }
          });
        } else {
          this.$message({
            showClose: true,
            message: "请输入正确信息",
            type: "warning"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // a() {
    //   // window.location.reload()
    //   this.add_Router("admin");
    //   this.getRoles("admin");
    //   this.getToken("734C72975EE11C4F16AA91C915E9D4F5");
    //   this.$router.push("/");
    //   // window.location.reload()
    // },
    // ...mapActions(["add_Router", "getRoles", "getToken", "getUserInfo"])
  }
};
</script>

<style scoped lang="less">
.el-form-item__label{
   width: 80px !important;
}
.it {
  display: flex;
  padding-left: 50px;
  box-sizing: border-box;
}
.el-form {
  text-align: center;
}

.login-container {
  width: 100%;
  height: 99.5vh;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  .left-box {
    width: 80%;
    height: 99.5vh;
    .left-img {
      width: 100%;
      height: 99.5vh;
    }
  }
  .right-box {
    width: 20%;
    padding: 316px 0 315px 0;
    box-sizing: border-box;
    .come-text {
      border-bottom: 3px solid #007fff;
      width: 104px;
      margin: auto;
      height: 36px;
      font-size: 25px;
      text-align: center;
      color: black;
    }
    .login-box {
      width: 80%;
      margin: auto;
      margin-top: 50px;
      .id-box {
        width: 100%;
        border-bottom: 1px solid #ddd;
        font-size: 18px;
        color: #666;
        height: 33px;
        input {
          border: none;
          outline: medium;
          margin-left: 5px;
          font-size: 14px;
          letter-spacing: 2px;
        }
      }
    }
    .login-btn {
      width: 65%;
      height: 40px;
      background-color: #007fff;
      color: #fff;
      margin: 30px auto;
      text-align: center;
    }
  }
}
</style>
