<template>
  <div class="landAll">
    <div class="screening">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input
            placeholder="宗地名称、宗地编号"
            v-model="tableObj.keyWord"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loadingBtn" @click="changeFuc('page',1)">查&nbsp;询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="open=true">添&nbsp;加</el-button>
        </el-form-item>
      </el-form>
      <!--点击添加弹出的对话框-->
      <el-dialog title="添加" :visible.sync="open" width="1300px" center>
        <div class="publishProject">
          <p class="title1">基本信息</p>
          <div class="projectForm">
            <el-form
              :model="dataObj"
              label-position="left"
              ref="projectForm"
              size="medium"
              label-width="122px"
            >
              <div class="form_div">
                <el-form-item label="联系人：" prop="linkMan">
                  <el-input v-model="dataObj.linkMan" type="text" placeholder="联系人" maxlength="25"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：" prop="linkTel">
                  <el-input v-model="dataObj.linkTel" type="text" placeholder="联系电话" maxlength="11"></el-input>
                </el-form-item>
              </div>
              <div class="form_div">
                <el-form-item label="联系地址：" prop="linkAddr">
                  <el-input v-model="dataObj.linkAddr" type="text" placeholder="联系地址" maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="省份：" prop="province">
                  <el-select v-model="provinceInfo" @change="changeProvince" placeholder="请选择">
                    <el-option
                      v-for="item in province"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value+','+item.text"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="form_div">
                <el-form-item label="拍卖时间：" >
                  <el-form-item prop="auctionTime">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      v-model="dataObj.auctionTime">
                    </el-date-picker>
                  </el-form-item>
                </el-form-item>
                <el-form-item label="成交时间：" >
                  <el-form-item prop="dealTime">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      v-model="dataObj.dealTime">
                    </el-date-picker>
                  </el-form-item>
                </el-form-item>
              </div>
              <p class="title2">土地基本情况</p>
              <table class="table2-sty">
                <tr>
                  <th>宗地名称：</th>
                  <td colspan="5"><input type="text" v-model="dataObj.title"></td>
                </tr>
                <tr>
                  <th>宗地编号：</th>
                  <td><input type="text" v-model="dataObj.landNo"></td>
                  <th>出让年限：</th>
                  <td><input type="text" v-model="dataObj.transferYear"></td>
                  <th>宗地坐落：</th>
                  <td style="width: 300px;"><input type="text" v-model="dataObj.position"></td>
                </tr>
                <tr>
                  <th>容积率：</th>
                  <td><input type="text" v-model="dataObj.volumeRatio"></td>
                  <th>建筑密度（%）：</th>
                  <td><input type="text" v-model="dataObj.buildDensity"></td>
                  <th>建筑限高（米）：</th>
                  <td style="width: 300px;"><input type="text" v-model="dataObj.heightLimit"></td>
                </tr>
                <tr>
                  <th>绿化率（%）：</th>
                  <td><input type="text" v-model="dataObj.greenRatio"></td>
                  <th>宗地面积：</th>
                  <td><input type="text" v-model="dataObj.landAcreage"></td>
                  <th>土地用途：</th>
                  <td style="width: 300px;"><input type="text" v-model="dataObj.landUseDtl"></td>
                </tr>
                <tr>
                  <th>其他商服用地：</th>
                  <td colspan="5"><input type="text" v-model="dataObj.otherCommercialLand"></td>
                </tr>
                <tr>
                  <th>投资强度：</th>
                  <td><input type="text" v-model="dataObj.investmentIntensity"></td>
                  <th>保证金：</th>
                  <td><input type="text" v-model="dataObj.earnestMoney"></td>
                  <th>估价报告备案号：</th>
                  <td style="width: 300px;"><input type="text" v-model="dataObj.appraisalRecordNo"></td>
                </tr>
                <tr>
                  <th>起始价：</th>
                  <td><input type="text" v-model="dataObj.startAmt"></td>
                  <th>加价幅度：</th>
                  <td colspan="3"><input type="text" v-model="dataObj.rangeIncreaseAmt"></td>
                </tr>
                <tr>
                  <th>拍卖公告编号：</th>
                  <td><input type="text" v-model="dataObj.auctionNoticeNo"></td>
                  <th>成交公告编号：</th>
                  <td colspan="3"><input type="text" v-model="dataObj.auctionTransactionNo"></td>
                </tr>
                <tr>
                  <th>拍卖地址：</th>
                  <td colspan="5"><input type="text" v-model="dataObj.auctionAddress"></td>
                </tr>
                <tr>
                  <th>成交单价(万元)：</th>
                  <td colspan="2"><input type="text" v-model="dataObj.dealUnit"></td>
                  <th>成交总价(万元)：</th>
                  <td colspan="2"><input type="text" v-model="dataObj.dealAmt"></td>
                </tr>
                <tr>
                  <th>甲方：</th>
                  <td colspan="5"><input type="text" v-model="dataObj.partyA"></td>
                </tr>
                <tr>
                  <th>乙方：</th>
                  <td colspan="5"><input type="text" v-model="dataObj.partyB"></td>
                </tr>
              </table>
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('projectForm')">预览</el-button>
          <el-button @click="resetForm('projectForm')">重置</el-button>
          <!-- <invest-dialog ref="previewDialog" @submitFuc="submitFuc"/> -->
        </span>
      </el-dialog>
    </div>
    <table-list
      :tableTitle="tableHeader"
      :tableData="tableData"
      @changeFuc="changeFuc"
      @operation="operation"
    />
    <!--operation 操作-->
    <land-all-dialog ref="previewDialog" @subFuc="subFuc"/>
  </div>
</template>
<script>
  import allTableHeader from "@/files/js/tableHeader";
  import TableList from "@/components/Table/table";
  import { cloneObj } from "@/files/js/cloneObj";
  import { provinceList } from "@/files/js/areaData";
  import {
    landAllList,//表中的数据接口
    landAllDtl,//详情
    pubProjectInit,
    landAllDel,
    landAllAdd
  } from "@/api";
  import landAllDialog from "@/components/landResources/landAllDialog";
  export default {
    components: {
      TableList,//表格组件
      landAllDialog,//审核查看预览弹窗组件
    },
    data () {
      return {
        open: false,
        loadingBtn: false,
        formInline: {
          user: ""
        },
        //表头
        tableHeader: allTableHeader.landAllHeader,

        tableData: {},//表中的数据
        //传给后台的数据
        tableObj: {
          pageSize: 8,
          startPage: 1,
          keyWord:'',
        },
        dataObj: {},
        freeDataObj: {}, //上传的对象
        province: provinceList,
        provinceInfo: "",
      };
    },
    created () {
      this.initWeb();
      //初始化项目选项数据
      pubProjectInit({projectCategoryCode: 0}).then(res => {
        if (res && res.errorCode === 0) {
          this.initData = res.body;
          this.investmentOrientationArr = res.body.myPreferenceInitRespVO.domainList
        }
      });
    },
    methods: {
      //按钮操作
      operation (type, data) {
        let obj;
        switch (type) {
          case "del":
            this.$confirm("确定删除该项目?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                landAllDel({id: data.id,otherId:data.otherId}).then(res => {
                  if (res && res.errorCode === 0) {
                    this.changeFuc();
                    this.$message({
                      showClose: true,
                      message: "删除成功",
                      type: "success"
                    });
                  }
                });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "取消操作"
                });
              });
            break;
          //查看
          case "look":
            this.projectLook(data.id, type,data.otherId);
            break;
        }
      },
      //点击查看
      projectLook (id, type,otherId) {
        landAllDtl({id,otherId}).then(res => {
          if (res.errorCode === 0) {
            let projectData = res.body
            //这里数据已经处理好
            if (type == "look") {
              let data = projectData
              this.$refs.previewDialog.showDialogFuc(type,data);
            }
          }
        });
      },
      submitForm (projectForm) {
        this.$refs[projectForm].validate((valid) => {
          if (valid) {
            this.previeFuc()
          } else {
            return false;
          }
        });
      },
      previeFuc() {
        this.mergeFuc();//点击预览
      },
      mergeFuc(data) {
        let dataObjC = cloneObj(this.dataObj);
        let dataC = cloneObj(data);
        let mergeObj = Object.assign(dataObjC, dataC);
        this.freeDataObj = cloneObj(mergeObj);
        if (mergeObj.involvedDomain) {
          mergeObj.involvedDomain = findCode(
            this.initData.myPreferenceInitRespVO.domainList,
            this.dataObj.involvedDomain
          );
        }
        this.$refs.previewDialog.showDialogFuc("submit", mergeObj);
      },
      //初始化表中的数据将数据赋值给tableData
      changeFuc (type, value) {
        this.loadingBtn = true;
        if (type == "page") {
          this.tableObj.startPage = value;
        }
        landAllList(this.tableObj).then(res => {
          if (res && res.errorCode == 0) {
            this.loadingBtn = false;
            this.tableData = res.body;
          }
        });
      },
      initWeb () {
        this.changeFuc();
        //初始化项目选项数据
        pubProjectInit({projectCategoryCode: 0}).then(res => {
          if (res && res.errorCode === 0) {
            this.initData = res.body;
          }
        });
      },
      subFuc () {
        landAllAdd(this.freeDataObj)
          .then(res => {
            if (res && res.errorCode === 0) {
              this.$message({
                showClose: true,
                message: "保存成功",
                type: "success"
              });
              this.resetForm("projectForm");
            }
            this.$refs.previewDialog.closeFuc();
            this.open = false;
            this.changeFuc()
          })
          .catch(() => {
            this.$refs.previewDialog.closeLoadingFuc();
          });
      },
      //重置按钮
      resetForm (formName) {
        this.dataObj.linkMan = '';
        this.dataObj.linkTel = '';
        this.dataObj.linkAddr = '';
        this.dataObj.province = '';
        this.dataObj.auctionTime = '';
        this.dataObj.dealTime = '';
        this.dataObj.landNo = '';
        this.dataObj.transferYear = '';
        this.dataObj.position = '';
        this.dataObj.volumeRatio = '';
        this.dataObj.buildDensity = '';
        this.dataObj.heightLimit = '';
        this.dataObj.greenRatio = '';
        this.dataObj.landAcreage = '';
        this.dataObj.landUseDtl = '';
        this.dataObj.otherCommercialLand = '';
        this.dataObj.investmentIntensity = '';
        this.dataObj.earnestMoney = '';
        this.dataObj.appraisalRecordNo = '';
        this.dataObj.startAmt = '';
        this.dataObj.rangeIncreaseAmt = '';
        this.dataObj.auctionNoticeNo = '';
        this.dataObj.auctionTransactionNo = '';
        this.dataObj.auctionAddress = '';
        this.dataObj.dealUnit = '';
        this.dataObj.dealAmt = '';
        this.dataObj.partyA = '';
        this.dataObj.partyB = '';
        this.provinceInfo = "";
        this.dataObj.province = "";
        this.dataObj.title = "";
      },
      changeProvince() {
        let provinceArr = this.provinceInfo.split(",");
        this.dataObj.province = provinceArr[1];
        this.dataObj.provinceCode = provinceArr[0];
      },
    }
  }
</script>
<style lang="stylus" scoped>
  .landAll {
    .screening {
      padding: 30px;
    }

    .el-form>>>.el-form-item {
      margin-bottom: 0;
    }
  }
  .publishProject {
    .title1{
      font-size 20px;
      margin-left 86px;
      font-weight bold;
    }
    .projectForm {
      padding: 30px 88px 0;

      .el-form>>>.el-form-item{
        margin-bottom: 22px;
      }
      .h1_title {
        width: 111px;
        font-size: 18px;
        font-weight: bold;
        padding: 0 12px 23px 0;
        box-sizing: border-box;
      }

      .form_div {
        display: flex;
        >>>.el-form-item__content {
          width: 233px;
          margin-right: 66px;
        }
      }
      .title2{
        font-size 20px;
        font-weight bold;
        margin-top 30px;
      }
      .table2-sty{
        margin-top 30px
        tr{
          border 1px solid #bdbdbd
          th{
            width 120px;
            border 1px solid #bdbdbd
            padding 0 13px;
            height 50px;
          }
          td{
            width 160px;
            input{
              width 100%;
              height 50px;
              border none;
              padding-left 19px;
              box-sizing border-box;
            }
          }
        }
      }
      .form_div1 {
        width: 500px;
      }
      .like_div {
        display: flex;

        >>>.el-form-item__content {
          margin-right: 66px;
        }

        >>> .el-form-item__label {
          font-weight: bold;
        }
      }

      .M_box {
        padding-left: 40px;

        .form_divM {
          display: flex;

          >>> .el-checkbox {
            margin-left: 30px;

            .el-checkbox__inner {
              width: 16px;
              height: 16px;
            }

            .el-checkbox__label {
              font-size: 16px;
            }
          }
        }
      }

      .item_title {
        margin-bottom: 12px;

        >>> .el-form-item__label {
          color: black;
          font-size: 16px;
        }
      }

      .tag_div {
        .el-tag + .el-tag {
          margin-left: 10px;
        }

        .button-new-tag {
          margin-left: 10px;
          height: 32px;
          line-height: 30px;
          padding-top: 0;
          padding-bottom: 0;
        }

        .input-new-tag {
          width: 90px;
          margin-left: 10px;
          vertical-align: bottom;
        }
      }

      .spanInput {
        display: flex;
        width: 188px;

        .danwei {
          display: inline-block;
          width: 50px;
        }
      }
    }

    .submitBtn {
      width: 666px;
      text-align: center;
      padding: 50px 0;
      box-sizing: border-box;
    }
  }
</style>
