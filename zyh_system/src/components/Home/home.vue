<template>
    <div class="home">
        <el-container>
            <el-aside width="250px">
                <navs/>
            </el-aside>
            <el-container>
                <el-header>
                    <header-top/>
                </el-header>
                <el-main>
                    <tags/>
                    <transition name="move" mode="out-in">
                        <!-- <keep-alive> --> 
                            <router-view/>
                        <!-- </keep-alive> -->
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Navs from '@/components/Navs/navs'
import {toRouter} from '@/store/routerMenu/converRouter'
import HeaderTop from '@/components/Header/header'
import Tags from '@/components/Home/tags'
export default {
    name:'Home',
    components:{
        Navs,
        HeaderTop,
        Tags
    },
}
</script>

<style lang="stylus" scoped>
.home{
    height 100%;
}
.el-container{
    height 100%;
    .el-header {
        height 60px;
        padding 0;
    }
    .el-aside {
        background-color: #D3DCE6;
    }
    
    .el-main {
        padding 0;
    }
}
</style>
