<template>
    <div class="login">
        <div class="login_from">
            <el-form :model="userForm" status-icon :rules="validation"  ref="userForm" label-width="80px" class="demo-ruleForm">
                <el-form-item>
                    <h2 class="title">资源荟后台管理系统</h2>
                </el-form-item>
                <el-form-item prop="account">
                    <el-input @keyup.enter.native="loginFuc('userForm')" type="text" v-model="userForm.account" autocomplete="off" placeholder="账号" maxlength="15"></el-input>
                </el-form-item>
                <el-form-item prop="md5_pwd">
                    <el-input @keyup.enter.native="loginFuc('userForm')" type="password" v-model="userForm.md5_pwd" autocomplete="off" placeholder="密码" maxlength="16"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loadingBtn" @click="loginFuc('userForm')">登录</el-button>
                    <el-button @click="resetForm('userForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import {loginByPwd} from '@/api'
import axios from 'axios'
export default {
    data(){
        let admin = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('账号不能为空'));
            }
            else{
                if (!/^[0-9a-zA-Z]+$/.test(this.userForm.account)) {
                    return callback(new Error('只能输入字母或数字'));
                }
                callback();
            }
        };
        let password =(rule, value, callback) =>{
            if (!value) {
                return callback(new Error('密码不能为空'));
            }
            else{
                callback();
            }
        }
        return{
            loadingBtn:false,
            userForm:{
                account:"",
                password:"",
                md5_pwd:""
            },
            validation: {
                account: [
                    { validator: admin, trigger: 'blur' }
                ],
                md5_pwd: [
                    { validator: password, trigger: 'blur' }
                ],
            }
        }
    },
    computed:{
        ...mapState({userInformation: state => state.user.userInformation,})
    },
    methods:{
        loginFuc(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loadingBtn = true
                    this.userForm.password=this.$md5(this.userForm.md5_pwd)
                    // axios.post('/support-center/adminLogin/loginByPwd',this.userForm).then(res=>{
                    //     console.log(res)
                    // })

                    // return
                    loginByPwd(this.userForm).then(res=>{
                        if(res.errorCode === 0){
                            console.log(res)
                            this.add_Router(res.body.roles)
                            this.getRoles(res.body.roles)
                            this.getToken(res.body.sessionId)
                            this.getUserInfo(res.body)
                            this.$message({
                                showClose: true,
                                message: '登录成功',
                                type: 'success'
                            });
                            // window.location.href="/support/#/index";
                            window.location.href="/admin/index"
                            // alert('56465464564')
                            // this.$router.push('/index')
                        }
                        this.loadingBtn = false
                    }).catch(()=>{
                        this.loadingBtn = false
                    })


                    return

                } else {
                    this.$message({
                        showClose: true,
                        message: '请输入正确信息',
                        type: 'warning'
                    });
                    return false;
                }
            });
        },
        resetForm(formName){
            this.$refs[formName].resetFields();
        },
        a(){
            // window.location.reload()
            this.add_Router('admin')
            this.getRoles('admin')
            this.getToken('45646565sad65asd4a65s')
            this.$router.push('/')
            // window.location.reload()
        },
        ...mapActions(['add_Router','getRoles','getToken','getUserInfo'])
    }
}
</script>

<style lang="stylus" scoped>
.login_from >>> .el-form{
    margin auto;
    width 300px;
    padding 50px 0;
    .el-form-item__content{
        margin-left 0 !important;
        text-align center;
    }
    .el-button {
        width 100px
    }
}
.login{
    height 100%;
    position relative;
    .login_from{
        width 460px;
        position absolute;
        left 50%;
        top 50%;
        transform translate(-50%, -50%);
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title{
            text-align: center;
            color: #505458;
            font-size 20px;
        }
    }
}
</style>
