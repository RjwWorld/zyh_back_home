<template>
    <div class="navs">
        <!-- 菜单栏后台管理logo -->
        <div class="logo_img">
            <img src="@/files/img/logo.png" alt=""/>
        </div>
        <el-menu
            :default-active="onRoutes"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#132347"
            text-color="#bfcbd9"
            active-text-color="#ffd04b"
            router
            unique-opened 
        >
        <!-- <el-button type="primary" @click="open">123</el-button> -->
            <template v-for="(item,index) in menuList" >
                <template v-if="item.children&&item.children.length"> 
                    <!-- 用户管理 -->
                    <el-submenu :index="item.name" :key="index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{item.title}}</span>
                        </template>
                        <!-- 项目管理 -->
                        <!-- <el-menu-item :index="item.name" v-for="(item,index) in item.children" :key="index">
                            {{ item.title }}
                        </el-menu-item> -->
                        <!-- <el-menu-item :index="itemChild.name" v-for="(itemChild,index) in item.children" :key="index">
                            <el-submenu index="2" v-if="itemChild.children&&itemChild.children.length">
                                <template slot="title">{{itemChild.title}}</template>                                
                                <el-menu-item :index="grandChild.name" v-for="(grandChild,index) in itemChild.children" :key="index">
                                {{ grandChild.title }}
                                </el-menu-item> 
                            </el-submenu>  
                            <template v-else slot="title">{{itemChild.title}}</template>          
                        </el-menu-item> -->

                         <template v-for="(itemChild,index) in item.children">
                            <template v-if="itemChild.children && itemChild.children.length">
                                <el-submenu :index="itemChild.name" :key="index">
                                    <template slot="title">
                                        <!-- <i :class="itemChild.icon"></i> -->
                                        <span class="guquan">{{itemChild.title}}</span>
                                    </template>
                                    <el-menu-item :index="itemGrandChild.name" v-for="(itemGrandChild,index) in itemChild.children" :key="index"
                                      >                   
                                        <span class="ziji">{{itemGrandChild.title}}</span>
                                    </el-menu-item>
                                </el-submenu>
                            </template>
                            <template v-else>
                                <el-menu-item :index="itemChild.name" :key="index" >
                                    <span slot="title">{{ itemChild.title }}</span>
                                </el-menu-item>
                            </template>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <!-- 广告管理 -->
                    <el-menu-item :index="item.name" :key="index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span> 
                    </el-menu-item>
                </template>    
            </template>
            
        </el-menu>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'Navs',
    computed:{
        onRoutes(){
            return this.$route.path.replace('/','');
        },
        ...mapState({menuList: state => state.menu.menuList,})
    },
    methods:{
        handleOpen(){},
        handleClose(){},
        // open(){
        // console.log(this.menuList,1)
    // }
    }
}
</script>

<style lang="stylus" scoped>
.navs >>> .el-menu{
    border none;
    .el-submenu__title,.el-menu-item{
        padding-left 40px !important;
    }
    .el-submenu{
        .el-menu-item{
            padding-left 80px !important;
        }
    }
}
.navs >>>
.navs{
    height 100%;
    background #132347;
    .logo_img{
        padding 30px;
        border-bottom 1px solid #1d2e53;
        box-sizing border-box;
    }
    //菜单关闭箭头
    .el-submenu>.el-submenu__title .el-submenu__icon-arrow{
	-webkit-transform: rotateZ(-90deg); 
	-ms-transform: rotate(-90deg);
	transform: rotateZ(-90deg); 
    }
    //菜单打开箭头
    .el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow{
	-webkit-transform: rotateZ(0deg); 
	-ms-transform: rotate(0deg);
	transform: rotateZ(0deg); 
    }
    //选中菜单背景颜色字体颜色
    .el-menu-item.is-active {
    color: #55a8fd !important;
    background-color :#283c69 !important;
    }
    //鼠标爱移入子菜单
    .el-menu-item:hover{
        
    }
    //鼠标移入主菜单
    .el-submenu__title:focus, .el-submenu__title:hover{

    }
}
.guquan{
    padding-left :40px !important;
}
.ziji{
    padding-left :40px !important;
}



</style>
