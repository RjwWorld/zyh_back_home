<template>
  <div class="uploadImg">
    <!-- 显示头像图片 -->
    <div class="initImg" v-if="header">
      <div class="inputFileHeader">
        <img class="upload_img" :src="headerImage" alt v-if="headerImage">
        <i class="el-icon-plus upload_plus" v-else></i>
        <input
          class="upload_file"
          type="file"
          @change="changeFuc"
          accept="image/jpeg, image/jpg, image/png, image/svg"
        >
      </div>
    </div>
    <!-- 显示单张图片 -->
    <div class="initImg" v-if="!more && !header">
      <div class="inputFile">
        <img class="upload_img" :src="showImage" alt v-if="showImage">
        <i class="el-icon-plus upload_plus" v-else></i>
        <input
          class="upload_file"
          type="file"
          @change="changeFuc"
          accept="image/jpeg, image/jpg, image/png, image/svg"
        >
      </div>
    </div>
    <!-- 显示多张图片 -->
    <div class="initImg" v-if="more && !header">
      <div class="imgListBox" v-if="imgList.length>0">
        <div class="imgBox" v-for="(item,index) in imgList" :key="index">
          <img class="img_pic" :src="item" alt>
          <span
            class="look_del"
            @mouseenter="$event.target.style.opacity='1'"
            @mouseleave="$event.target.style.opacity='0'"
            style="opacity:0"
          >
            <i class="el-icon-zoom-in look_icon" @click="lookImg(item)"></i>
            <i class="el-icon-delete del_icon" @click="delImg(index)"></i>
          </span>
        </div>
      </div>
      <div class="inputFile" v-if="imgList.length <maxNumber">
        <i class="el-icon-plus upload_plus"></i>
        <input
          class="upload_file"
          type="file"
          @change="changeFuc"
          accept="image/jpeg, image/jpg, image/png, image/svg"
        >
      </div>
    </div>
    <el-dialog title="查看图片" :visible.sync="imgDialog" append-to-body center>
      <img :src="imgUrl" alt width="100%">
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: Boolean,
      default: false
    },
    more: {
      type: Boolean,
      default: false
    },
    imgList: {
      type: Array,
      default: () => []
    },
    showImage: {
      type: String
    },
    headerImage: {
      type: String
    },
    type: {
      type: Object
    },
    maxNumber: {
      type: Number
    }
  },
  data() {
    return {
      imgDialog: false,
      imgUrl: ""
    };
  },
  methods: {
    delImg(index) {
      this.$emit("delImg", index, this.type);
    },
    lookImg(data) {
      this.imgUrl = data;
      this.imgDialog = true;
    },
    httpRequest(file, type) {
      let uploadObj = {};
      if (type == "upload") {
        uploadObj.extName = file.type.split("/")[1]; //文件类型
        uploadObj.file = file.src.split(",")[1]; //base64
        uploadObj.fileType = 1;
      }
      if (type == "compress") {
        uploadObj.extName = "jpeg"; //文件类型
        uploadObj.file = file.split(",")[1]; //base64
        uploadObj.fileType = 1;
      }
      this.$emit("uploadFuc", uploadObj, this.more, this.type);
    },
    changeFuc() {
      let _this = this;
      let files = event.target.files[0];
      let reader = new FileReader();
      let image = new Image();
      if (!files) {
        return;
      }
      //判断是否为图片
      if (files.type.indexOf("image") == 0) {
        reader.readAsDataURL(files);
      } else {
        this.$message({
          showClose: true,
          message: "请上传正确的图片格式",
          type: "error"
        });
        return;
      }
      // 文件base64化，以便获知图片原始尺寸
      reader.onload = function(e) {
        image.src = e.target.result;
        files.src = e.target.result;
        //获取图片信息 并展示图片
        image.onload = function() {
          let width = image.width; //获取图片的宽
          let height = image.height; //获取图片的高
          files.width = width;
          files.height = height;
          _this.showImg = image.src; //给页面展示图片
        };
        //判断图片的大小，超过200K 进行压缩 不超过200K直接上传
        if (files.size / 1024 > 200) {
          _this.imgCompress(files, { quality: 0.5 });
        } else {
          _this.httpRequest(files, "upload");
        }
      };
    },
    imgCompress(files, obj) {
      let _this = this; //这里的this 是把vue的实例对象指向改变为_this
      var img = new Image();
      img.src = files.src;
      img.onload = function() {
        var that = this; //这里的this 是把img的对象指向改变为that
        // 默认按比例压缩
        var w = that.width,
          h = that.height,
          scale = w / h;
        w = obj.width || w;
        h = obj.height || w / scale;
        var quality = 0.7; // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
          quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL("image/jpeg", quality);
        _this.httpRequest(base64, "compress");

        // 回调函数返回base64的值
        var urlFile = _this.convertBase64UrlToBlob(base64); //这个地方的处理是为了把压缩的base64转化为对象，获得压缩后图片的大小size，方便对压缩后的图片再次进行判断；
        // console.log(urlFile)
      };
    },
    //将base64码转化为file（Blob）
    //此处函数对压缩后的base64经过处理返回{size: "", type: ""}
    convertBase64UrlToBlob(urlData) {
      var arr = urlData.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    }
  }
};
</script>

<style lang="stylus" scoped>
.uploadImg{
    .initImg{
        display flex;
        .inputFile{
            width 200px;
            height 150px;
            position relative;
            overflow hidden;
            border: 1px dashed #c0ccda;
            border-radius 6px;
            background #fbfdff;
            box-sizing border-box;
            .upload_file{
                position absolute;
                width 200px;
                height 150px;
                left 0;
                top 0;
                opacity 0;
                cursor: pointer;
                z-index 3;
            }
            .upload_img{
              width 200px;
                height 150px;
                position absolute;
                left 0;
                top 0;
            }
            .upload_plus{
                position absolute;
                left 50%;
                top 50%;
                font-size 28px;
                color #8c939d;
                transform translate(-50%,-50%)
            }
        }
        .inputFileHeader{
            width 133px;
            height 133px;
            position relative;
            overflow hidden;
            border: 1px dashed #c0ccda;
            border-radius 50%;
            background #fbfdff;
            box-sizing border-box;
            .upload_file{
                position absolute;
                width 133px;
                height 133px;
                border-radius 50%;
                left 0;
                top 0;
                opacity 0;
                cursor: pointer;
                z-index 3;
            }
            .upload_img{
                width 100%;
                height 100%;
                position absolute;
                left 0;
                top 0;
            }
            .upload_plus{
                position absolute;
                left 50%;
                top 50%;
                font-size 28px;
                color #8c939d;
                transform translate(-50%,-50%)
            }
        }
        .imgListBox{
            display flex;
            height 150px;
            overflow hidden;
            .imgBox{
                overflow hidden;
                width 200px;
                height 150px;
                position relative;
                border-radius 3px;
                margin-right 28px; 
                .img_pic{
                    position absolute;
                    height 150px;
                    z-index 1;
                }
                .look_del{
                    width 200px;
                    height 150px;
                    position absolute;
                    background rgba(0,0,0,.5);
                    border-radius 3px;
                    font-size 24px;
                    color white;
                    z-index 2;
                    text-align center;
                    line-height 150px;
                    .del_icon,.look_icon{
                        cursor pointer;
                    }
                    .del_icon{
                        margin-left 10px;
                    }
                }
            }
        }
        .inputFile:hover{
            border-color: #409EFF;
        }
        .inputFileHeader:hover{
            border-color: #409EFF;
        }
    }
}
</style>
