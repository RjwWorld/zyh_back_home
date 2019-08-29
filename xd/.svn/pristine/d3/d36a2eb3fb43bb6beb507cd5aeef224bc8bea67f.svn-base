<template>
<el-dialog title="组图查看" :visible.sync="showDialog" @close="closeFuc" width="1200px" center>
    <div class="newslistDetails">
      <el-form label-width="100px" label-position="right" style="padding-left:250px;">
        <h1>
            组图属性
        </h1>
        <div class="form_div">
          <el-form-item label="标题：">
            <span>{{dataObj.title}}</span>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="分类：">
            <span>{{dataObj.classification}}</span>
          </el-form-item>
        </div>
        <div class="form_div">
          <el-form-item label="组图权重：">
            <span>{{dataObj.homeRecommend}}</span>
          </el-form-item>
        </div>
        <!-- <div class="form_div">
          <el-form-item label="图片权重：">
            <span>{{dataObj.recommend}}</span>
          </el-form-item>
        </div> -->
        <div class="form_div">
          <el-form-item label="组图："></el-form-item>
         </div>
         <div class="all">
              <div class="next" v-if="dataObj.staffImgDtlList!=undefined&&dataObj.staffImgDtlList.length>0">
                <img src="../../flies/img/right.png" style="width:36px;height:36px;">
              </div>
              <div class="prev" v-if="dataObj.staffImgDtlList!=undefined&&dataObj.staffImgDtlList.length>0">
                <img src="../../flies/img/left.png" style="width:36px;height:36px;">
              </div>
              <swiper :options="swiperOption">
                <swiper-slide 
                  class="swiper"
                  v-for="(value,index) in dataObj.staffImgDtlList"
                  :key="index"
                >
                  <img class="photo" :src="value.fileUrl">
                  <div class="content">{{value.content}}</div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer" v-if="dialogType == 'submit'">
      <el-button type="primary" @click="submitFuc" :loading="loadingBtn">发&nbsp;布</el-button>
    </span>
     </el-dialog>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
    data() {
    return {
      dialogType: "",
      showDialog: false,
      loadingBtn: false,
      dataObj: {},
      local: false,
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        navigation: {
          nextEl: ".next",
          prevEl: ".prev"
        }
      },
    };
  },
  methods: {
    showDialogFuc: function(type, showData) {
      this.dialogType = type;
      this.dataObj = showData;
      this.showDialog = true;
      console.log(type, showData);
    },
    closeFuc() {
      this.showDialog = false;
      this.loadingBtn = false;
    },
    closeLoadingFuc() {
      this.loadingBtn = false;
    },
    submitFuc() {
      this.$confirm("确定发布该项目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          this.loadingBtn = true;
          
          this.$emit("subFuc");
          this.showDialog = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发布"
          });
        });
    },
    resetForm() {
      this.showDialog = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
.swiper-pagination {
  position: relative;
}

.prev {
  position: absolute;
  width: 36px;
  height: 36px;
  top: 400px;
  left: 150px;
}

.prev:focus {
  outline: none;
}

.next {
  position: absolute;
  width: 36px;
  height: 36px;
  top: 400px;
  left: 1000px;
}

.next:focus {
  outline: none;
}

.img {
  width: 20px;
  height: 21px;
  position: absolute;
  right: -5px;
  top: 0px;
}

.all {
  width: 650px;
  .photo {
    width: 200px;
    height: 150px;
  }

  .content {
    line-height: 20px;
    text-align: center;
  }
}
</style>
