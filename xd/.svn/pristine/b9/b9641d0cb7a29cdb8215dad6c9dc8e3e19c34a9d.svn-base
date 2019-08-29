<template>
  <div class="EditDialog">
    <el-dialog title="编辑" :visible.sync="showDialog" @close="closeFuc" width="1200px" center>
      <div class="editing">
        <h1>
          组图属性
          <span style="color:red">(必填)</span>
        </h1>
        <el-form
          :model="dataObj"
          label-position="right"
          ref="newslistform"
          size="medium"
          label-width="90px;"
        >
          <div class="form_div3">
            <el-form-item label="标题：">
              <el-input
                :disabled="openIsDisabled"
                v-model="dataObj.title"
                type="text"
                placeholder="标题"
                style="width:540px;"
              ></el-input>
            </el-form-item>
          </div>
          <div class="form_div2">
            <el-form-item label="分类：">
              <!-- <el-input
                        v-model="dataObj.projectClassification"
                        type="text"
                        placeholder="项目分类"
                        style="width:540px;"
              ></el-input>-->
              <el-select v-model="dataObj.classification" placeholder="请选择">
                <el-option
                  :disabled="openIsDisabled"
                  v-for="item in staffstatet1"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="组图权重：">
              <el-input
                :disabled="openIsDisabled"
                v-model="dataObj.homeRecommend"
                type="text"
                maxlength="3"
                placeholder="组图权重"
                style="width:540px;"
              ></el-input>
            </el-form-item>
          </div>
          <h1>
            图片属性
            <span style="color:red">(最少一张)</span>
          </h1>
          <div class="form_div3">
            <el-form-item label="图片：" prop="fileUrl">
              <upload-img
                :type="{type:'fileUrl'}"
                :showImage="showImg"
                @uploadFuc="uploadFuc"
                @delImg="delImg"
              />
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="图片权重：">
              <el-input
                v-model="dataObj.recommend"
                type="text"
                placeholder="权重0~100"
                style="width:540px;"
                maxlength="3"
              ></el-input>
            </el-form-item>
          </div>
          <div class="form_div2">
            <el-form-item label="内容：">
              <el-input
                v-model="dataObj.content"
                type="textarea"
                maxlength="200"
                @input="descInput"
                style="width:540px;"
              ></el-input>
              <div class="xianzhi">{{remnant}}/200</div>
            </el-form-item>
          </div>
        </el-form>
        <div class="btn">
          <el-button type="primary" @click="addbtn">保存</el-button>
          <!-- <el-button type="primary" @click="server">保存</el-button> -->
        </div>
      </div>
      <div class="all">
        <div
          class="next"
          v-if="dataObj.staffImgDtlList!=undefined&&dataObj.staffImgDtlList.length>0"
        >
          <img src="../../flies/img/right.png" style="width:36px;height:36px;">
        </div>
        <div
          class="prev"
          v-if="dataObj.staffImgDtlList!=undefined&&dataObj.staffImgDtlList.length>0"
        >
          <img src="../../flies/img/left.png" style="width:36px;height:36px;">
        </div>
        <swiper :options="swiperOption">
          <swiper-slide
            class="swiper"
            v-for="(value,index) in dataObj.staffImgDtlList"
            :key="index"
          >
            <img class="photo" :src="value.fileUrl">
            <img class="img" src="../../flies/img/del.png" @click="imgdel(value.id)">
            <div class="content">{{value.content}}</div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { staffstatet1 } from "@/flies/js/initData";
import UploadImg from "@/components/uploadImg/uploadImg";
import { staffmodify, staffdelImgById, upload } from "@/api";
export default {
  components: {
    UploadImg
  },
  data() {
    return {
      remnant: 200,
      loadingBtn: false,
      showDialog: false,
      local: false,
      dataObj: {},
      showImg: "",
      staffstatet1,
      openIsDisabled: true,
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        navigation: {
          nextEl: ".next",
          prevEl: ".prev"
        }
      }
    };
  },
  methods: {
    // server(){
    //   this.$confirm('确定保存吗?, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'success'
    //   }).then(() => {
    //     this.$message({
    //       type: 'success',
    //       message: '删除成功!'
    //     });
    //     this.openIsDisabled = false;
    //     this.showDialog=false;
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     });
    //   });
    // },
    closeFuc() {
      this.remnant = 200;
      (this.showImg = ""),
      (this.dataObj.content = ""),
      (this.dataObj.recommend = "");
    },
    descInput() {
      this.remnant = 200 - this.dataObj.content.length;
    },
    //修改
    addbtn() {
      staffmodify(this.dataObj).then(res => {
        console.log(res);
        if (res.errorCode == 0) {
          this.dataObj.staffImgDtlList = res.body.staffImgDtlList;
          (this.showImg = ""),
            (this.dataObj.content = ""),
            (this.dataObj.recommend = "");
          this.remnant = 200;
        } else {
          this.$message({
            showClose: true,
            message: res.errMsg,
            type: "warning"
          });
        }
      });
    },
    //删除图片
    imgdel(id) {
      // console.log("我是", id);
      // console.log(this.dataObj.staffImgDtlList.length)
      if (this.dataObj.staffImgDtlList.length <= 1) {
        this.$message({
          message: "警告哦，这是最后一条数据了",
          type: "warning"
        });
        return;
      } else {
        staffdelImgById({ id: id }).then(res => {
          // console.log(res)
          this.dataObj.staffImgDtlList = res.body.staffImgDtlList;
          // console.log(this.imglist, "del-img");
          if (this.dataObj.staffImgDtlList.length <= 0) {
            this.local = false;
          }
        });
      }
    },
    delImg(index, more) {
      this.showImg.splice(index, 1);
      this.dataObj.fileUrl = "";
    },
    //图片接口
    uploadFuc(data, more, type) {
      upload(data).then(res => {
        console.log(res);
        if (res && res.errorCode === 0) {
          //  if (more) {
          //     this.showImg.push(res.body.filePath);
          //     this.dataObj.imageList=res.body.fileId;
          //   }
          let typeType = type.type;
          switch (typeType) {
            case "fileUrl":
              this.showImg = res.body.filePath;
              this.dataObj.fileUrl = res.body.fileId;
              break;
          }
        }
      });
    },
    showDialogFuc(type, data) {
      console.log(data);
      this.dataObj = data;
      this.showDialog = true;
    }
  }
};
</script>

<style lang="stylus" scoped>
.xianzhi {
  position: absolute;
  right: 28px;
}

.btn {
  text-align: center;
  margin-top: 50px;
}

.form_div2 {
  margin-left: 30px;
}

.form_div3 {
  margin-left: 30px;
  margin-top: 40px;
}

.editing {
  padding: 0 250px;
}

.swiper-pagination {
  position: relative;
  box-sizing: border-box;
}

.prev {
  position: absolute;
  width: 36px;
  height: 36px;
  top: 50px;
  left: -80px;
}

.prev:focus {
  outline: none;
}

.next {
  position: absolute;
  width: 36px;
  height: 36px;
  top: 50px;
  left: 690px;
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
  margin: auto;
  margin-top: 60px;
  position: relative;

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
