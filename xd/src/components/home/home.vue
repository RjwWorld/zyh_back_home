<template>
  <div class="home">
    <el-container style="height:100%;">
      <el-aside width="204px">
        <navs/>
      </el-aside>
    <el-container>
        <el-header>
           <keep-alive>
                <header-top/>
            </keep-alive>
        </el-header>
        <el-main>
          <tags/>
          <!-- <newsList/> -->
            <keep-alive>
              <router-view/>
            </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import navs from "@/components/navs/navs";
// import newsList from "@/components/news/newsList";
import headerTop from "@/components/header/header";
import tags from "@/components/home/tags";
export default {
  name: "home",
  components: {
    // newsList,
    headerTop,
    navs,
    tags
  }
};
</script>

<style>
.home {
  height: 100%;
  background-color: #f6fafd;
}
.el-header {
  padding: 0;
  height: 80px !important;
}
</style>
