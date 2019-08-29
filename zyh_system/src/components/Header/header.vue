<template>
    <div class="header">
        <div class="userInfo">
            <span class="date">
                {{dateStr}}&nbsp;&nbsp;{{week}}
            </span>
            <span class="name_text">
                {{userInformation.userName}},欢迎您
            </span>
            <span class="roles" v-if="userInformation.roles == 'admin'">管理员</span>
            <span class="roles" v-else-if="userInformation.roles == 'king'">最高权限</span>
            <span class="el-icon-bell"></span>
            <span v-if="token" class="outLogin">
                <span class="out_text" @click="outLogin">退出</span>
            </span>
        </div>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import {logout} from '@/api'
export default {
    computed:{
        ...mapState({
            userInformation: state => state.user.userInformation,
            token:state => state.user.token
        })
    },
    data(){
        return{
            dateStr:"",
            week:""
        }
    },
    created(){
        this.getDate();
    },
    methods:{
        outLogin(){
            this.$confirm('确定退出该账号?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                logout().then(res=>{
                    if(res.errorCode === 0){
                        this.add_Router('')
                        this.getRoles('')
                        this.getToken('')
                        this.getUserInfo({})
                        // this.$router.push('/login')
                        this.$message({
                            type: 'success',
                            message: '退出成功!'
                        });
                        window.location.href="/admin/login"
                    }
                })
            }).catch(() => {});
        },
        getDate(){
            var time = new Date()
            var mytime=time.toLocaleTimeString()
            let year = time.getFullYear();
            let month = time.getMonth()+1
            let day = time.getDate();
            let weekDay = time.getDay();
            let weekDayArr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
            this.dateStr = `${year}年${month}月${day}日`
            this.week = weekDayArr[weekDay]
        },
        ...mapActions(['add_Router','getRoles','getToken','getUserInfo'])
    }
}
</script>

<style lang="stylus" scoped>
.header{
    height 100%;
    line-height 60px;
    border-bottom 1px solid #e6e6e6;
    box-sizing border-box;
    overflow hidden;
    background #f0f3f5
    .userInfo{
        float right;
        // color #424242;
        // color #fff;
        .name_text{
            padding 0 20px 0 30px;
        }
        .roles{
            padding 0 20px;
            border-left 1px solid #cacaca;
        }
        .outLogin{
            padding-left 20px;
            padding-right 53px;
            .out_text{
                cursor pointer;
                border-bottom 1px solid transparent
            }
            .out_text:hover{
                cursor pointer;
                border-bottom 1px solid #424242 
            }
        }
    }
}
</style>
