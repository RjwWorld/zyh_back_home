<template>
  <div class="tags">
    <div class="tag_div">
      <el-tag
        @close="deltag(index)"
        v-for="(item,index) in tagList"
        :key="index"
        :class="{'active': isActive(item.path)}"
        size="medium"
        closable
      >
        <router-link :to="item.path" class="tag_title">{{item.title}}</router-link>
      </el-tag>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagList: []
    };
  },
  created() {
    this.addTags(this.$route);
  },
  methods: {
    isActive(path) {
      return path === this.$route.path;
    },
    addTags(route) {
      const isExist = this.tagList.some(item => {
        return item.path === route.fullPath;
      });

      !isExist &&
        this.tagList.push({ path: route.fullPath, title: route.meta.title });
    },
    deltag(index) {
      //获取删除的tag
      const closeTag = this.tagList.splice(index, 1)[0];
      //获取删除后应该调到哪个的tag
      const tag = this.tagList[index]
        ? this.tagList[index]
        : this.tagList[index - 1];
      //判断tag是否删除完
      if (tag) {
        //判断删除的tag是否 是当前页面
        closeTag.path === this.$route.fullPath && this.$router.push(tag.path);
      } else {
        this.$router.push("/");
      }
    }
  },
  watch: {
    $route(to, from) {
      this.addTags(to);
    }
  }
};
</script>


<style lang="stylus" scoped>
.tags{
    height 40px;
    overflow: hidden;
    display flex
    align-items center;
    box-sizing border-box;
    border-bottom 1px solid #e6e6e6;
    .tag_ul{
        width 100%;
        height 28px;
        overflow: hidden;
        box-sizing: border-box;
        .tag_li{
            float left;
            margin-left 13px;
            border-radius 3px;
            height 100%;
            line-height 26px;
            border 1px solid #e9eaec;
            box-sizing border-box;
            font-size 14px;
            color: #666;
            padding 0 6px 0 6px;
            cursor pointer;
            -webkit-transition: all .3s ease-in;
            -moz-transition: all .3s ease-in;
            transition: all .3s ease-in;
            .tag_title{
                color #666;
                max-width: 80px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                padding-right: 3px;
                text-decoration none;
            }
            .close_icon{
                font-size 12px;
            }
        }
    }
    .tag_div{
        width 100%;
        height 28px;
        overflow: hidden;
        box-sizing: border-box;
        >>>.el-tag{
            margin-left 13px;
            -webkit-transition: all .2s ease-in;
            -moz-transition: all .2s ease-in;
            transition: all .2s ease-in;
            .el-icon-close{
                font-size 16px;
                color #666;
            }
            .el-icon-close:hover{
                color #fff;
            }
        }
        .tag_title{
            color #666;
            max-width: 80px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding-right: 3px;
            text-decoration none;
        }
    }
    .active{
        background #409eff;
        .tag_title{
            color #fff !important;
        }
        >>>.el-icon-close{
            color #fff !important;
        }
        >>>.el-icon-close:hover{
            color #d7d1d1 !important;
            // background red !important;
        }
    }
    >>>.el-tag:not(.active):hover {
        background: rgba(64,158,255,.3);
    }
}
</style>