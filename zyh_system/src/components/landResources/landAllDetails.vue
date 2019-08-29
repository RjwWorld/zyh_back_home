<template>
  <!-- 项目列表资产查看详情 -->
  <div class="projectDetails">
    <div class="baseInfo">
      <p class="title1">
        {{dataObj.province}}-{{dataObj.landNo}}
      </p>
      <p class="url-local" v-if="dataObj.boardUrl" style="float: right;margin-left: 20px;">
        <a :href="dataObj.boardUrl" target="_blank">查看公告信息</a>
      </p>
      <p class="url-local" v-if="dataObj.resultUrl" style="float: right">
        <a :href="dataObj.resultUrl" target="_blank">查看结果信息</a>
      </p>
      <p class="title2">
        联系方式
      </p>
      <p class="title3">
        <span>联系人：</span>
        <span>{{dataObj.linkMan}}</span>
        <span style="margin-left: 80px;">联系电话：</span>
        <span>{{dataObj.linkTel}}</span>
      </p>
      <p class="title3">
        <span>联系地址：</span>
        <span>{{dataObj.linkAddr}}</span>
        <span style="margin-left: 80px;">省份：</span>
        <span>{{dataObj.province}}</span>
      </p>
      <p class="title3">
        <span>拍卖时间：</span>
        <span>{{dataObj.auctionTime}}</span>
        <span style="margin-left: 80px;">成交时间：</span>
        <span>{{dataObj.dealTime}}</span>
      </p>
      <p class="title2" style="margin-top: 30px;">
        土地基本情况
      </p>
      <table class="table2-sty">
        <tr>
          <th>宗地名称：</th>
          <td colspan="5">{{dataObj.title}}</td>
        </tr>
        <tr>
          <th>宗地编号：</th>
          <td>{{dataObj.landNo}}</td>
          <th>出让年限：</th>
          <td>{{dataObj.transferYear}}年</td>
          <th>宗地坐落：</th>
          <td style="width: 300px;">{{dataObj.position}}</td>
        </tr>
        <tr>
          <th>容积率：</th>
          <td>{{dataObj.volumeRatio}}</td>
          <th>建筑密度（%）：</th>
          <td>{{dataObj.buildDensity}}</td>
          <th>建筑限高（米）：</th>
          <td style="width: 300px;">{{dataObj.heightLimit}}</td>
        </tr>
        <tr>
          <th>绿化率（%）：</th>
          <td>{{dataObj.greenRatio}}</td>
          <th>宗地面积：</th>
          <td>{{dataObj.landAcreage}}</td>
          <th>土地用途：</th>
          <td style="width: 300px;">{{dataObj.landUseDtl}}</td>
        </tr>
        <tr>
          <th>其他商服用地：</th>
          <td colspan="5">{{dataObj.otherCommercialLand}}</td>
        </tr>
        <tr>
          <th>投资强度：</th>
          <td>{{dataObj.investmentIntensity}}</td>
          <th>保证金：</th>
          <td>{{dataObj.earnestMoney}}万元</td>
          <th>估价报告备案号：</th>
          <td style="width: 300px;">{{dataObj.appraisalRecordNo}}</td>
        </tr>
        <tr>
          <th>起始价：</th>
          <td>{{dataObj.startAmt}}</td>
          <th>加价幅度：</th>
          <td colspan="3">{{dataObj.rangeIncreaseAmt}}</td>
        </tr>
        <tr>
          <th>拍卖公告编号：</th>
          <td>{{dataObj.auctionNoticeNo}}</td>
          <th>成交公告编号：</th>
          <td colspan="3">{{dataObj.auctionTransactionNo}}</td>
        </tr>
        <tr>
          <th>拍卖地址：</th>
          <td colspan="5">{{dataObj.auctionAddress}}</td>
        </tr>
        <tr>
          <th>成交单价(万元)：</th>
          <td colspan="2">{{dataObj.dealUnit}}</td>
          <th>成交总价(万元)：</th>
          <td colspan="2">{{dataObj.dealAmt}}</td>
        </tr>
        <tr>
          <th>甲方：</th>
          <td colspan="5">{{dataObj.partyA}}</td>
        </tr>
        <tr>
          <th>乙方：</th>
          <td colspan="5">{{dataObj.partyB}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      dataObj:{
        type:Object,
      },
      freeDataObj:{
        type:Object
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .projectDetails{
    .baseInfo{
      padding 0 100px;
      .title1{
        text-align center
        color #000
        font-size 16px
      }
      .url-local{
        margin-top 20px;
        text-align right
      }
      .title2{
        color #000
        font-size 18px
        margin-top 20px
        font-weight bold
      }
      .title3{
        margin-top 30px;
      }
      .table2-sty{
        margin-top 30px
        tr{
          border 1px solid #bdbdbd
          th{
            width 120px;
            border 1px solid #bdbdbd
            padding-left 13px;
            height 50px;
          }
          td{
            width 160px;
            padding 0 19px
          }
        }
      }
    }
    .border{
      border 1px solid #e6e6e6
      margin-bottom 30px;
    }
  }
</style>
