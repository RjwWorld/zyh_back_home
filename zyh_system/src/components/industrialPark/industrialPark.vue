<template>
  <div class="landList">
    <div class="screening">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="状态：">
          <el-select v-model="tableObj.status" @change="changeFuc('page',1)" placeholder="请选择">
            <el-option
              v-for="item in initSelectData.projectStatu"
              :key="item.code"
              :label="item.text"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            @keyup.enter.native="changeFuc('page',1)"
            placeholder="编号、项目名称"
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
      <el-dialog title="添加" :visible.sync="open" width="1300px" center>
        <div class="publishProject">
          <div class="projectForm">
            <h1 class="h1_title">基本信息</h1>
            <el-form
              :model="dataObj"
              label-position="left"
              ref="projectForm"
              size="medium"
              label-width="111px"
              :rules="rules"
            >

              <div class="form_div">
                <el-form-item label="项目名称：" prop="projectName">
                  <el-input v-model="dataObj.projectName" type="text" placeholder="项目名称" maxlength="25"></el-input>
                </el-form-item>
                <el-form-item label="结构：" prop="construction">
                  <el-select v-model="dataObj.construction" placeholder="请选择结构">
                    <el-option v-for="item in initSelectData.constructionArr" :key="item.code" :label="item.text" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="form_div">
                <el-form-item label="联系人：" prop="linkMan">
                  <el-input v-model="dataObj.linkMan" type="text" placeholder="联系人" maxlength="15"></el-input>
                </el-form-item>
                <el-form-item label="联系人电话：" prop="linkTel">
                  <el-input v-model="dataObj.linkTel" type="text" placeholder="联系人电话" maxlength="11"></el-input>
                </el-form-item>
              </div>
              <div class="form_div">
                <el-form-item label="对接人：" prop="dockingMan">
                  <el-input v-model="dataObj.dockingMan" type="text" placeholder="对接人" maxlength="15"></el-input>
                </el-form-item>
                <el-form-item label="对接人电话：" prop="dockingTel">
                  <el-input v-model="dataObj.dockingTel" type="text" placeholder="对接人电话" maxlength="11"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="地址：" prop="province">
                  <el-select v-model="provinceInfo" @change="changeProvince" placeholder="请选择">
                    <el-option
                      v-for="item in province"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value+','+item.text"
                    ></el-option>
                  </el-select>
                  <span style="padding:0 20px">省</span>
                  <el-select v-model="cityInfo" @change="changeCity" placeholder="请选择">
                    <el-option
                      v-for="item in city"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value+','+item.text"
                    ></el-option>
                  </el-select>
                  <span style="padding:0 20px">市</span>

                </el-form-item>
              </div>
              <div class="form_div dw-div">
                <el-form-item label="详细地址：" prop="comAddrDtl">
                  <el-input v-model="dataObj.comAddrDtl" type="text" placeholder="详细地址" maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="建筑面积：" prop="buildAcreage">
                  <el-input v-model="dataObj.buildAcreage" type="text" placeholder="建筑面积" maxlength="10"></el-input>
                  <span class="dw-span">m²</span>
                </el-form-item>
              </div>
              <div class="form_div dw-div">
                <el-form-item label="土地总面积：" prop="landAcreage">
                  <el-input v-model="dataObj.landAcreage" type="text" placeholder="土地总面积" maxlength="11"></el-input>
                  <span class="dw-span">m²</span>
                </el-form-item>
                <el-form-item label="待征地面积：" prop="requisitionAcreage">
                  <el-input v-model="dataObj.requisitionAcreage" type="text" placeholder="待征地面积" maxlength="11"></el-input>
                  <span class="dw-span">m²</span>
                </el-form-item>
              </div>
              <div class="form_div dw-div">
                <el-form-item label="价格：" prop="startAmt" label-width="111px">
                  <div class="form_divM">
                    <span class="spanInput">
                      <el-input
                        :disabled="checkedM"
                        v-model="dataObj.startAmt"
                        type="text"
                        placeholder="价格"
                        maxlength="10"
                        @change="change"
                       ></el-input>
                      <span class="dw-span2">元/平方米</span>
                    </span>
                        <el-checkbox class="m-position"
                          v-model="checkedM"
                          @change="dataObj.startAmt = checkedM ? '': dataObj.startAmt"
                        >面议</el-checkbox>
                      </div>
                </el-form-item>
              </div>
              <div class="form_div">
                <el-form-item label="园区等级：" prop="parkLevel">
                  <el-select v-model="dataObj.parkLevel" placeholder="请选择等级">
                    <el-option v-for="item in initSelectData.ParkLv" :key="item.code" :label="item.text" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="类型：" prop="parkType">
                  <el-select v-model="dataObj.parkType" placeholder="请选择类型">
                    <el-option v-for="item in initSelectData.ParkType" :key="item.code" :label="item.text" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="form_div">
                <el-form-item label="领域：" prop="involvedDomain">
                  <el-input  type="text" placeholder="土地" :disabled="true"></el-input>
                </el-form-item>
              </div>
              <h1 class="h1_title">设施信息</h1>
              <div class="form_div">
                <el-form-item label="房产证：" prop="hasHousePropertyCertificate">
                  <el-select v-model="dataObj.hasHousePropertyCertificate" placeholder="请选择">
                    <el-option label="有" value="1"></el-option>
                    <el-option label="无" value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="地产证：" prop="hasRealEstateCertificate">
                  <el-select v-model="dataObj.hasRealEstateCertificate" placeholder="请选择">
                    <el-option label="有" value="1"></el-option>
                    <el-option label="无" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="form_div dw-div">
                <el-form-item label="层高：" prop="storeyHeight">
                  <el-input v-model="dataObj.storeyHeight" type="text" placeholder="层高" maxlength="5"></el-input>
                  <span class="dw-span">米</span>
                </el-form-item>
                <el-form-item label="配电量：" prop="distributionOf">
                  <el-input v-model="dataObj.distributionOf" type="text" placeholder="配电量" maxlength="5"></el-input>
                  <span class="dw-span">KW.h</span>
                </el-form-item>
              </div>
              <div class="">
                <el-form-item label="使用年限" >
                  <el-form-item prop="startTime" style="width: 220px;float: left">
                    <el-date-picker
                      type="date"
                      placeholder="选择开始日期"
                      value-format="yyyy-MM-dd"
                      v-model="dataObj.startTime"
                    >
                    </el-date-picker>
                  </el-form-item>
                   &nbsp; <span style="float: left">——</span> &nbsp;
                  <el-form-item prop="endTime" style="width: 220px;float: left">
                    <el-date-picker
                      type="date"
                      placeholder="选择结束日期"
                      value-format="yyyy-MM-dd"
                      v-model="dataObj.endTime"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-form-item>
              </div>
              <div class="form_div">
                <el-form-item label="详情信息：" prop="dtlInf" label-width="122px">
                  <el-input type="textarea" v-model="dataObj.dtlInf" :rows="6" maxlength="200"></el-input>
                </el-form-item>
              </div>
              <div class="form_div">
                <el-form-item label="税收政策：" prop="taxPolicy" label-width="122px">
                  <el-input type="textarea" v-model="dataObj.taxPolicy" :rows="6" maxlength="200"></el-input>
                </el-form-item>
              </div>
              <div class="form_div">
                <el-form-item label="当前产业定位规划：" prop="industrialPricingPlanning" label-width="150px">
                  <el-input type="textarea" v-model="dataObj.industrialPricingPlanning" :rows="6" maxlength="200"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="房产证：" prop="housePropertyCertificate">
                  <upload-img
                    :type="{class:2000,type:'housePropertyCertificate'}"
                    :showImage="dataObj.housePropertyCertificate?$store.state.user.ip+dataObj.housePropertyCertificate:''"
                    @uploadFuc="uploadFuc"
                    @delImg="delImg"
                  />
                </el-form-item>
              </div>
              <div>
                <el-form-item label="地产证：" prop="realEstateCertificate">
                  <upload-img
                    :type="{class:2000,type:'realEstateCertificate'}"
                    :showImage="dataObj.realEstateCertificate?$store.state.user.ip+dataObj.realEstateCertificate:''"
                    @uploadFuc="uploadFuc"
                    @delImg="delImg"
                  />
                </el-form-item>
              </div>
              <div>
                <el-form-item label="项目图片：" prop="projectImg">
                  <upload-img
                    :more="true"
                    :maxNumber="4"
                    :imgList="showImg"
                    @uploadFuc="uploadFuc"
                    @delImg="delImg"
                  />
                </el-form-item>
              </div>
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="open = false">取 消</el-button>
          <el-button type="primary" @click="open = false">确 定</el-button>-->
          <el-button type="primary" @click="submitForm('projectForm')">预览</el-button>
          <el-button @click="resetForm('projectForm')">重置</el-button>
          <industrial-park-dialog ref="previewDialog" @submitFuc="submitFuc"/>
        </span>
      </el-dialog>
    </div>
    <table-list
      :tableTitle="tableHeader"
      :tableData="tableData"
      @changeFuc="changeFuc"
      @operation="operation"
    />
    <industrial-park-dialog ref="previewDialog" @submitFuc="submitFuc" @subFuc="subFuc"/>
    <industrial-park-edit-dialog ref="editDialog" @changeFuc="changeFuc"/>
  </div>
</template>
<script>
  import allTableHeader from "@/files/js/tableHeader";
  import TableList from "@/components/Table/table";
  import { projectStatu , constructionArr ,ParkLv,ParkType} from "@/files/js/initData";
  import {
    parkList, //列表接口
    projectStatus, //审核状态接口
    getIdPark, //查看详情接口
    insertPark,
    delPark,
    deleteProject,
    pubProjectInit,
    upload,
    publishProjectB,
    domainV2Init
  } from "@/api";
  import industrialParkDialog from "@/components/industrialPark/industrialParkDialog";
  import industrialParkEditDialog from "@/components/industrialPark/industrialParkEditDialog";
  import { cloneObj } from "@/files/js/cloneObj";
  import { findCode, findCodeArr, sortArr } from "@/files/js/findCode";
  import UploadImg from "@/components/UploadImg/uploadImg";
  import { provinceList, cityList } from "@/files/js/areaData";
  import {isvalidPhone,isvalidSmallNum2} from '@/files/js/rules'
  //判断
  var validProjectName=(rule, value,callback)=>{
    if (!value){
      callback(new Error('该输入框不能为空！'))
    }
    else {
      callback()
    }
  };
  var validImg=(rule, value,callback)=>{
    if (!value){
      callback(new Error('该图片为必填！'))
    }
    else {
      callback()
    }
  };
  var validConstruction=(rule, value,callback)=>{
    if (!value){
      callback(new Error('请选择！'))
    }
    else {
      callback()
    }
  };
  var validPhone=(rule, value,callback)=>{
    if (!value){
      callback(new Error('请输入手机号码！'))
    }else  if (!isvalidPhone(value)){
      callback(new Error('请输入正确的11位手机号码！'))
    }else {
      callback()
    }
  };
  var validSmallNum2=(rule, value,callback)=>{
    if (!value){
      callback(new Error('请输入数字，结果保留两位小数'))
    }else  if (!isvalidSmallNum2(value)){
      callback(new Error('请输入正确的格式！'))
    }else {
      callback()
    }
  };
  export default {
    components: {
      TableList,
      industrialParkDialog,
      // ProjectEditDialog,
      UploadImg,
      industrialParkEditDialog,

    },
    data() {
      return {
        open:false,
        checkedM: false,
        loadingBtn: false,
        showImg: [], //图片列表
        tabVisible: false, //添加标签
        tabValue: "",
        initData: {
          myPreferenceInitRespVO: {},
          pubProjectBaseInitRespVO: {},
          pubProjectAInitRespVO: {},
          pubProjectBInitRespVO: {},
          pubProjectCInitRespVO: {},
          tagInfList: []
        },
        formInline: {
          user: ""
        },
        tableHeader: allTableHeader.industrialParkHeader,
        initSelectData: {
          projectStatu,
          constructionArr,
          ParkLv,
          ParkType,
        },
        tableData: {},
        tableObj: {
          keyWord: "",
          status: null,
          projectTypeCode: 2000,
          pageSize: 8,
          startPage: 1,
          type: 0
        },
        dataObj: {
          projectName: "", //名字
          comProvince: "", //省
          comProvinceCode: "", //省 区号
          comCity: "", //市
          comCityCode: "", //市 区号
          comAddrDtl: "", //详细地址
          linkMan: "", //联系人
          linkTel: "", //联系人电话
          isConfer: 0, //是否面议
          dockingMan :'',//对接人
          dockingTel :'',//对接人电话
          buildAcreage :'',//建筑面积
          landAcreage :'',//土地总面积
          startAmt :'',//价格
          requisitionAcreage: '',//特征地面积
          parkLevel: '',//园区等级
          parkType: '',//园区类型
          involvedDomain : 'A',//领域
          hasHousePropertyCertificate : '',//有无房产证
          hasRealEstateCertificate : '',//有无地产证
          storeyHeight : '',//层高
          distributionOf  : '',//配电量
          startTime : '',//使用开始时间
          endTime : '',//使用结束时间
          taxPolicy : '',//税收政策
          dtlInf : '',//详情信息
          industrialPricingPlanning : '',//当前产业定价规范
          housePropertyCertificate : '',//房产证
          realEstateCertificate : '',//地产证
          imageList: [] //图片列表
        },
        freeDataObj: {}, //上传的对象
        //省 市下拉框
        province: provinceList,
        city: [],
        provinceInfo: "",
        cityInfo: "",
        rules: {
          projectName: [
            {hide: true, trigger: 'blur', validator: validProjectName}
          ],
          construction: [
            {hide: true, trigger: 'change', validator: validConstruction}
          ],
          parkLevel: [
            {hide: true, trigger: 'change', validator: validConstruction}
          ],
          parkType: [
            {hide: true, trigger: 'change', validator: validConstruction}
          ],
          hasHousePropertyCertificate: [
            {hide: true, trigger: 'change', validator: validConstruction}
          ],
          hasRealEstateCertificate: [
            {hide: true, trigger: 'change', validator: validConstruction}
          ],
          startTime: [
            {hide: true, trigger: 'change', validator: validConstruction}
          ],
          endTime: [
            {hide: true, trigger: 'change', validator: validConstruction}
          ],
          linkMan: [
            {hide: true, trigger: 'blur', validator: validProjectName}
          ],
          linkTel: [
            {hide: true, trigger: 'blur', validator: validPhone}
          ],
          dockingMan: [
            {hide: true, trigger: 'blur', validator: validProjectName}
          ],
          dockingTel: [
            {hide: true, trigger: 'blur', validator: validPhone}
          ],
          // province: [
          //   {hide: true, trigger: 'change', validator: validConstruction}
          // ],
          comAddrDtl: [
            {hide: true, trigger: 'blur', validator: validProjectName}
          ],
          buildAcreage: [
            {hide: true, trigger: 'blur', validator: validSmallNum2}
          ],
          landAcreage: [
            {hide: true, trigger: 'blur', validator: validSmallNum2}
          ],
          requisitionAcreage: [
            {hide: true, trigger: 'blur', validator: validSmallNum2}
          ],
          // startAmt: [
          //   {hide: true, trigger: 'blur', validator: validSmallNum2}
          // ],
          storeyHeight: [
            {hide: true, trigger: 'blur', validator: validSmallNum2}
          ],
          distributionOf: [
            {hide: true, trigger: 'blur', validator: validProjectName}
          ],
          dtlInf: [
            {hide: true, trigger: 'blur', validator: validProjectName}
          ],
          taxPolicy: [
            {hide: true, trigger: 'blur', validator: validProjectName}
          ],
          industrialPricingPlanning: [
            {hide: true, trigger: 'blur', validator: validProjectName}
          ],
          housePropertyCertificate: [
            {hide: true, trigger: 'blur', validator: validImg}
          ],
          realEstateCertificate: [
            {hide: true, trigger: 'blur', validator: validImg}
          ],
        }
      };
    },
    activated() {
      this.initWeb();
    },
    created() {
      //初始化项目选项数据
      pubProjectInit({ projectCategoryCode: 0 }).then(res => {
        if (res && res.errorCode === 0) {
          this.initData = res.body;
        }
      });
    },
    methods: {
      change() {
        let reg = /^\d+.?\d{0,2}$/;
        if (!reg.test(this.dataObj.startAmt)) {
          this.$message({
            message: "请输入数字保留两位小数",
            type: "warning"
          });
          return false;
        }
      },
      //按钮操作
      operation(type, data) {
        let obj;
        switch (type) {
          case "up":
            obj = {
              projectType: 0,
              status: 2,
              projectId: data.projectId
            };
            this.$confirm("确定上架该项目?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消"
            })
              .then(() => {
                projectStatus(obj).then(res => {
                  if (res && res.errorCode === 0) {
                    this.changeFuc();
                    this.$message({
                      showClose: true,
                      message: "上架成功",
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
          case "down":
            obj = {
              projectId: data.projectId,
              projectType: 0,
              status: 0
            };
            this.$confirm("确定下架该项目?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消"
            })
              .then(() => {
                projectStatus(obj).then(res => {
                  if (res && res.errorCode === 0) {
                    this.changeFuc();
                    this.$message({
                      showClose: true,
                      message: "下架成功",
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
          case "del":
            this.$confirm("确定删除该项目?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                delPark({ id: data.id }).then(res => {
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
          //审核
          case "audit":
            this.projectLook(data.id, type);
            break;
          //编辑
          case "edit":
            this.projectLook(data.id, type);
            break;
          //查看
          case "look":
            this.projectLook(data.id, type);
            break;
        }
      },
      //审核提交
      submitFuc(data) {
        projectStatus(data)
          .then(res => {
            if (res.errorCode === 0) {
              this.changeFuc();
              this.$refs.previewDialog.resetForm();
              this.$refs.previewDialog.closeFuc();

              if (res.body.isReward === 1) {
                this.$confirm("是否到邀请奖励页面发放奖励?", "提交成功", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "success",
                  center: true
                })
                  .then(() => {
                    this.$router.push("/inviteRewardList");
                  })
                  .catch(() => {});
              } else {
                this.$message({
                  showClose: true,
                  message: "提交成功",
                  type: "success"
                });
              }
            }
          })
          .catch(() => {
            this.$refs.previewDialog.closeLoadingFuc();
          });
      },
      //点击查看、审核、修改
      projectLook(id, type) {
        getIdPark({ id }).then(res => {
          if (res.errorCode === 0) {
            let projectData = res.body
            //这里数据已经处理好
            if (type == "audit" || type == "look") {
              let data = this.previewFuc(projectData);
              this.$refs.previewDialog.showDialogFuc(type, data);
            }
            if (type == "edit") {
              this.$refs.editDialog.showDialogFuc(projectData, this.initData);
            }
          }
        });
      },
      previewFuc(data) {
        let modelReqVO = {};
        modelReqVO = cloneObj(data);
        // this.modelReqVOFuc(data.projectTypeCode, modelReqVO, data);
        //将父对象数据转化
        if (modelReqVO.involvedDomain) {
          // modelReqVO.involvedDomain = findCode(
          //   this.initData.myPreferenceInitRespVO.domainList,
          //   data.involvedDomain
          // );
        }
        modelReqVO.projectRequirement = findCode(
          this.initData.pubProjectBaseInitRespVO.projectRequirementList,
          data.projectRequirement
        );
        if (modelReqVO.involvedDomainV2) {
          modelReqVO.involvedDomainV2 = findCode(
            tanTinvolvedDomainV2,
            data.involvedDomainV2
          );
        }
        //return出处理好的数据
        return modelReqVO;
      },
      changeFuc(type, value) {
        this.loadingBtn = true;
        if (type == "page") {
          this.tableObj.startPage = value;
        }
        parkList(this.tableObj).then(res => {
          if (res && res.errorCode == 0) {
            this.loadingBtn = false;
            this.tableData = res.body;
          }
        });
      },
      initWeb() {
        this.changeFuc();
        //初始化项目选项数据
        pubProjectInit({ projectCategoryCode: 0 }).then(res => {
          if (res && res.errorCode === 0) {
            this.initData = res.body;
          }
        });
      },
      submitForm(projectForm) {
        this.dataObj.isConfer = this.checkedM ? 1 : 0; //面议
        this.$refs[projectForm].validate((valid) => {
          if (valid) {
            if (
              this.dataObj.isConfer == 0 &&
              this.dataObj.startAmt != ""
            ) {
              this.previeFuc()
            }
            else if (this.dataObj.isConfer == 1) {
              this.previeFuc()
            }
            else {
              this.$message({
                message: "选择价格",
                type: "warning"
              });
              return false
            }

          } else {
            return false;
          }
        });
      },
      previeFuc() {
        this.dataObj.isConfer = this.checkedM ? 1 : 0; //面议
        this.mergeFuc();
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
        mergeObj.imageList = this.showImg;
        this.$refs.previewDialog.showDialogFuc("submit", mergeObj);
      },
      subFuc() {
       this.tijiao()
      },
      tijiao(){
        insertPark(this.freeDataObj)
          .then(res => {
            if (res && res.errorCode === 0) {
              this.$refs.previewDialog.closeFuc();
              this.$message({
                showClose: true,
                message: "发布成功",
                type: "success"
              });
              this.changeFuc();
              this.imageList = [];
              this.showImg = [];
              this.resetForm("projectForm");
            }
          })
          .catch(() => {
            this.$refs.previewDialog.closeLoadingFuc();
          });
      },
      //重置按钮
      resetForm(formName) {
        this.checkedM = false;
        this.dataObj.isConfer = 0;
        this.provinceInfo = "";
        this.cityInfo = "";
        (this.dataObj.comProvince = ""),
          (this.dataObj.comProvinceCode = ""),
          (this.dataObj.comCity = ""),
          (this.dataObj.comCityCode = ""),
          (this.showImg = []);
        this.dataObj.imageList = [];
        this.dataObj.startTime = '',
        this.dataObj.endTime = '',
        this.$refs[formName].resetFields();
      },
      delImg(index, more) {
        this.showImg.splice(index, 1);
        this.dataObj.imageList.splice(index, 1);
      },
      uploadFuc(data, more, type) {
        upload(data).then(res => {
          if (res && res.errorCode === 0) {
            if(!more){
              let typeType = type.type;
              switch (typeType) {
                case 'housePropertyCertificate':
                  this.dataObj.housePropertyCertificate = res.body.fileId;
                  break;
                case 'realEstateCertificate':
                  this.dataObj.realEstateCertificate = res.body.fileId;
                  break;
              }
            }
            if (more) {
              this.showImg.push(res.body.filePath);
              this.dataObj.imageList.push(res.body.fileId);
            }

          }
        });
      },
      //地区选择
      changeProvince() {
        let provinceArr = this.provinceInfo.split(",");
        let provinceCode = provinceArr[0];
        Object.keys(cityList).forEach(key => {
          if (key.indexOf(provinceCode) == 0) {
            this.city = cityList[key];
            this.cityInfo = this.city[0].text;
            //选择了省份后后.用户不在选择城市
            this.dataObj.comProvince = provinceArr[1];
            this.dataObj.comProvinceCode = provinceArr[0];
            this.dataObj.comCity = this.city[0].text;
            this.dataObj.comCityCode = this.city[0].value;
          }
        });
      },
      changeCity() {
        let provinceArr = this.provinceInfo.split(",");
        let cityArr = this.cityInfo.split(",");
        this.dataObj.comProvince = provinceArr[1];
        this.dataObj.comProvinceCode = provinceArr[0];
        this.dataObj.comCity = cityArr[1];
        this.dataObj.comCityCode = cityArr[0];
      },
      delTag(tag) {
        this.dataObj.keyWordList.splice(this.dataObj.keyWordList.indexOf(tag), 1);
      },
      showInput() {
        this.tabVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let tabValue = this.tabValue;
        if (tabValue) {
          this.dataObj.keyWordList.push(tabValue);
        }
        this.tabVisible = false;
        this.tabValue = "";
      }
    }
  };
</script>
<style lang="stylus" scoped>
  .landList {
    .screening {
      padding: 30px;
    }

    .el-form>>>.el-form-item {
      margin-bottom: 0;
    }
  }
  .publishProject {
    .projectForm {
      padding: 30px 88px 0;

      .el-form>>>.el-form-item{
        margin-bottom: 22px;
      }
      >>> .el-form-item__label:before {
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
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

  .dw-div{
    position:relative;
  }
  .dw-span{
    position :absolute;
    right : 10px;
    top:0;
  }
  .dw-span2{
    position : absolute;
    right : -20px;
    top:0;
  }
  .m-position{
    position : absolute;
    right : -120px;
    top: 0;
  }
</style>


