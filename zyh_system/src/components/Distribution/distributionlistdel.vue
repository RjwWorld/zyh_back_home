<template>
  <el-dialog title="查看" :visible.sync="showDialog" width="1000px" center >
    <div class="bullrtinDetails">
      <el-form label-width="100px" label-position="left">
        <div class="baseForm">
          <h1 class="h1_title">基本资料</h1>
          <div class="form_div1">
            <el-form-item label="头像：">
              <div class="header_img">
                <img
                  :src="$store.state.user.ip+dataObj.userFilterRespVO.avatar"
                  @click="lookImg($store.state.user.ip+dataObj.userFilterRespVO.avatar)"
                >
              </div>
            </el-form-item>
          </div>
          <div class="form_div">
             <el-form-item label="用户ID：">
              <span>{{dataObj.userFilterRespVO.id}}</span>
            </el-form-item>
            <el-form-item label="用户昵称：">
              <span>{{dataObj.userFilterRespVO.nickName}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="手机号：">
              <span>{{dataObj.userFilterRespVO.mblNo}}</span>
            </el-form-item>
            <el-form-item label="微信号：">
              <span>{{dataObj.userFilterRespVO.wechatNo}}</span>
            </el-form-item>
            <el-form-item label="机构：">
              <span>{{dataObj.userFilterRespVO.company}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="职位：">
              <span>{{dataObj.userFilterRespVO.position}}</span>
            </el-form-item>
            <el-form-item label="邮箱：">
              <span>{{dataObj.userFilterRespVO.mail}}</span>
            </el-form-item>
            <el-form-item label="地址：">
              <span>{{dataObj.userFilterRespVO.addrProvince}}{{dataObj.userFilterRespVO.addrCity}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="等级：">
              <span>{{dataObj.userFilterRespVO.levelNo}}</span>
            </el-form-item>
            <el-form-item label="荟商值：">
              <span>{{dataObj.userFilterRespVO.huishangzhi}}</span>
            </el-form-item>
          </div>
        </div>
        <div class="individualForm" v-if="dataObj.individualAuthVO.status!=null">
          <h1 class="h1_title">个人认证</h1>
          <div class="form_div">
            <el-form-item label="姓名：">
              <span>{{dataObj.individualAuthVO.userName}}</span>
            </el-form-item>
            <el-form-item label="身份证号：">
              <span>{{dataObj.individualAuthVO.idNo}}</span>
            </el-form-item>
            <el-form-item label="状态：">
              <span v-if="!dataObj.individualAuthVO.status">未认证</span>
              <span v-if="dataObj.individualAuthVO.status === 1">待审核</span>
              <span v-if="dataObj.individualAuthVO.status === 2">审核通过</span>
              <span v-if="dataObj.individualAuthVO.status === 3">审核失败</span>
            </el-form-item>
          </div>
          <div class="form_div2">
            <el-form-item label-width="133px">
              <figure>
                <div class="idCard_img">
                  <img
                    :src="$store.state.user.ip+dataObj.individualAuthVO.cardFace"
                    @click="lookImg($store.state.user.ip+dataObj.individualAuthVO.cardFace)"
                    alt
                  >
                </div>
                <figcaption>身份证正面</figcaption>
              </figure>
            </el-form-item>
            <el-form-item label-width="133px">
              <figure>
                <div class="idCard_img">
                  <img
                    :src="$store.state.user.ip+dataObj.individualAuthVO.cardBack"
                    @click="lookImg($store.state.user.ip+dataObj.individualAuthVO.cardBack)"
                    alt
                  >
                </div>
                <figcaption>身份证反面</figcaption>
              </figure>
            </el-form-item>
          </div>
        </div>
        <div class="bizForm" v-if="dataObj.bizAuthVO.status!=null">
          <h1 class="h1_title">企业认证</h1>
          <div class="form_div">
            <el-form-item label="企业单位：">
              <span>{{dataObj.bizAuthVO.comName}}</span>
            </el-form-item>
            <el-form-item label="单位组织机构代码：" label-width="155px">
              <span>{{dataObj.bizAuthVO.comCode}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="联系人：">
              <span>{{dataObj.bizAuthVO.linkMan}}</span>
            </el-form-item>
            <el-form-item label="联系人手机号：" label-width="155px">
              <span>{{dataObj.bizAuthVO.linkTel}}</span>
            </el-form-item>
            <el-form-item label="状态：">
              <span v-if="!dataObj.bizAuthVO.status">未认证</span>
              <span v-if="dataObj.bizAuthVO.status === 1">待审核</span>
              <span v-if="dataObj.bizAuthVO.status === 2">审核通过</span>
              <span v-if="dataObj.bizAuthVO.status === 3">审核失败</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="营业执照：" label-width="100px">
              <figure>
                <div class="idCard_img">
                  <img
                    :src="$store.state.user.ip+dataObj.bizAuthVO.bizLiscens"
                    @click="lookImg($store.state.user.ip+dataObj.bizAuthVO.bizLiscens)"
                    alt
                  >
                </div>
                <figcaption>营业执照</figcaption>
              </figure>
            </el-form-item>
          </div>
        </div>
        <div class="faForm" v-if="dataObj.faAuthRespVO.status!=null">
          <h1 class="h1_title">FA认证</h1>
          <div class="form_div">
            <el-form-item label="姓名：">
              <span>{{dataObj.faAuthRespVO.name}}</span>
            </el-form-item>
            <el-form-item label="机构：">
              <span>{{dataObj.faAuthRespVO.org}}</span>
            </el-form-item>
            <el-form-item label="职位：">
              <span>{{dataObj.faAuthRespVO.position}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="邮箱：">
              <span>{{dataObj.faAuthRespVO.mail}}</span>
            </el-form-item>
            <el-form-item label="微信：">
              <span>{{dataObj.faAuthRespVO.weichat}}</span>
            </el-form-item>
            <el-form-item label="地址：">
              <span>{{dataObj.faAuthRespVO.addrProvince}}{{dataObj.faAuthRespVO.addrCity}}</span>
            </el-form-item>
          </div>
          <div class="form_div">
            <el-form-item label="状态：">
              <span v-if="!dataObj.faAuthRespVO.status">未认证</span>
              <span v-if="dataObj.faAuthRespVO.status === 1">待审核</span>
              <span v-if="dataObj.faAuthRespVO.status === 2">审核通过</span>
              <span v-if="dataObj.faAuthRespVO.status === 3">审核失败</span>
            </el-form-item>
          </div>
          <div class="form_div3">
            <el-form-item>
              <figure>
                <div class="idCard_img">
                  <img
                    :src="$store.state.user.ip+dataObj.faAuthRespVO.callingCard"
                    @click="lookImg($store.state.user.ip+dataObj.faAuthRespVO.callingCard)"
                    alt
                  >
                </div>
                <figcaption>名片</figcaption>
              </figure>
            </el-form-item>
          </div>
          <div class="form_div2">
            <el-form-item label-width="133px">
              <figure>
                <div class="idCard_img">
                  <img
                    :src="$store.state.user.ip+dataObj.faAuthRespVO.cardFace"
                    @click="lookImg($store.state.user.ip+dataObj.faAuthRespVO.cardFace)"
                    alt
                  >
                </div>
                <figcaption>身份证正面</figcaption>
              </figure>
            </el-form-item>
            <el-form-item label-width="133px">
              <figure>
                <div class="idCard_img">
                  <img
                    :src="$store.state.user.ip+dataObj.faAuthRespVO.cardBack"
                    @click="lookImg($store.state.user.ip+dataObj.faAuthRespVO.cardBack)"
                    alt
                  >
                </div>
                <figcaption>身份证反面</figcaption>
              </figure>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <el-dialog title="查看图片" :visible.sync="show" center append-to-body>
        <img :src="this.imgUrl" alt width="100%">
      </el-dialog>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitFuc">确&nbsp;定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dataObj: {
        bizAuthVO:{},
        faAuthRespVO:{},
        individualAuthVO:{},
        userFilterRespVO:{}
      },
      showDialog: false,
      show: false,
      imgUrl: "",
    };
  },
  methods: {
    showDialogFuc: function(type, showData) {
      this.dataObj = showData;
      this.showDialog = true;
    },
    submitFuc() {
      this.showDialog = false;
    },
    lookImg(data) {
      this.show = true;
      this.imgUrl = data;
    }
  }
};
</script>

<style lang="stylus" scoped>
.bullrtinDetails {
  .h1_title {
    font-size: 18px;
    color: black;
    font-weight: bold;
    padding-bottom: 20px;
    text-align: left;
    margin-left: 70px;
  }
  .form_div1{
    display: flex;
    width: 80%;
    margin: auto; 
     >>>.el-form-item__content {
      width: 166px;
    }
  }
  .form_div2{
    display: flex;
    .idCard_img {
      overflow: hidden;
      width: 280px;
      height: 180px;
      border-radius: 6px;
      border: 1px solid #e6e6e6;

      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
     figcaption {
      width: 280px;
      text-align: center;
      padding: 20px 0;
    }
  }
  .form_div3{
    padding-left 35px;
    box-sizing border-box;
     .idCard_img {
      overflow: hidden;
      width: 280px;
      height: 180px;
      border-radius: 6px;
      border: 1px solid #e6e6e6;

      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
     figcaption {
      width: 280px;
      text-align: center;
      padding: 20px 0;
    }
  }
  .form_div {
    display: flex;
    width: 80%;
    margin: auto;

    >>>.el-form-item__content {
      width: 166px;
    }

    .idCard_img {
      overflow: hidden;
      width: 280px;
      height: 180px;
      border-radius: 6px;
      border: 1px solid #e6e6e6;

      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }

    figcaption {
      width: 280px;
      text-align: center;
      padding: 20px 0;
    }
  }

  .header_img {
    overflow: hidden;
    width: 133px;
    height: 133px;
    border-radius: 50%;
    border: 1px solid #e6e6e6;

    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
}
</style>
