<template>
<!-- 股权团队 -->
    <div class="team">
        <h1 class="h1_title">人员构成</h1>
        <div class="form_div">
            <!-- <upload-img :showImage="dataObj.teamStructureImg?$store.state.user.ip+dataObj.teamStructureImg:''" @uploadFuc="uploadFuc"/> -->
            <upload-img 
                :more="true" 
                :maxNumber="2" 
                :imgList="teamStructureImgList" 
                @uploadFuc="uploadFuc" 
                @delImg="delImg"
            />
        </div>
        <div class="fenge"></div>
        <h1 class="h1_title">履历分析</h1>
        <el-table
            :data="tableData"
            show-summary 
            border
            :header-row-style="{height:'33px'}"
            :row-style="{height:'50px'}"
            :cell-style="{padding:0}"
            :header-cell-style="{'background-color':'#fafafa'}"
            style="width: 666px"
        >
            <el-table-column 
                align="center"
                :show-overflow-tooltip="true"
                v-for="(item,index) in tableTitle" 
                :key="index"
                :label="item.label"
                :prop="item.prop"
            >
            </el-table-column>
        </el-table>
        <div class="add_btn">
            <el-button type="primary" size="medium" @click="addFuc">增&nbsp;&nbsp;加</el-button>
            <el-button type="primary" size="medium" @click="delFuc">删除表格</el-button>
        </div>

        <div class="next_btn">
            <el-button type="primary" size="medium" @click="nextFuc">下一步</el-button>
            <el-button type="primary" size="medium" @click="resetTeam">重置</el-button>
        </div>
        <el-dialog
            title="增加履历"
            :visible.sync="showDialog"
            @close="closeFuc"
            width="600px"
            center
            >
            <el-form :model="fullObj" ref="full" label-width="133px" size="medium">
                <h1 class="h1_title">全日制</h1>
                <div class="form_div">
                    <el-form-item label="博士：" prop="doctor">
                        <el-input v-model="fullObj.doctor" type="text" placeholder="博士">
                            <span slot="suffix">&nbsp;人&nbsp;</span>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="硕士：" prop="master">
                        <el-input v-model="fullObj.master" type="text" placeholder="硕士">
                            <span slot="suffix">&nbsp;人&nbsp;</span>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="本科：" prop="bachelor">
                        <el-input v-model="fullObj.bachelor" type="text" placeholder="本科">
                            <span slot="suffix">&nbsp;人&nbsp;</span>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="专科：" prop="junior">
                        <el-input v-model="fullObj.junior" type="text" placeholder="专科">
                            <span slot="suffix">&nbsp;人&nbsp;</span>
                        </el-input>
                    </el-form-item>
                </div>
            </el-form>
            <el-form :model="partObj" ref="part" label-width="133px" size="medium">
                <h1 class="h1_title">非全日制</h1>
                <div class="form_div">
                    <el-form-item label="博士：" prop="doctor">
                        <el-input v-model="partObj.doctor" type="text" placeholder="博士">
                            <span slot="suffix">&nbsp;人&nbsp;</span>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="硕士：" prop="master">
                        <el-input v-model="partObj.master" type="text" placeholder="硕士">
                            <span slot="suffix">&nbsp;人&nbsp;</span>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="本科：" prop="bachelor">
                        <el-input v-model="partObj.bachelor" type="text" placeholder="本科">
                            <span slot="suffix">&nbsp;人&nbsp;</span>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="form_div">
                    <el-form-item label="专科：" prop="junior">
                        <el-input v-model="partObj.junior" type="text" placeholder="专科">
                            <span slot="suffix">&nbsp;人&nbsp;</span>
                        </el-input>
                    </el-form-item>
                </div>
            </el-form>
            
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveFuc" size="medium">保&nbsp;&nbsp;存</el-button>
                <el-button type="primary" @click="resetFuc" size="medium">重&nbsp;&nbsp;置</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

import UploadImg from '@/components/UploadImg/uploadImg'
import {teamHeader} from '@/components/EnterpriseData/table/tableHeader'
import {cloneObj} from '@/files/js/cloneObj'
import {upload,team} from '@/api'
import {mapState} from 'vuex'
export default {
    components:{
        UploadImg,
    },
    computed:{
        ...mapState({
            projectId:state => state.data.companyId
        })
    },
    data(){
        return{
            showDialog:false,

            tableTitle:teamHeader,
            tableData:[],

            teamStructureImgList:[],  //人员构成图片

            dataObj:{
                projectId:"",
                teamStructureImg:[],    //人员构成图片
            },
            fullObj:{
                name:'全日制(人数)',
                doctor:"",
                master:"",
                bachelor:"",
                junior:""
            },
            partObj:{
                name:'非全日制(人数)',
                doctor:"",
                master:"",
                bachelor:"",
                junior:""
            }
        }
    },
    methods:{
        nextFuc(){
            
            if(this.tableData.length >0){
                this.dataObj.fullTimeDoctor = this.tableData[0].doctor
                this.dataObj.fullTimeMaster = this.tableData[0].master
                this.dataObj.fullTimeBachelor = this.tableData[0].bachelor
                this.dataObj.fullTimeJunior = this.tableData[0].junior

                this.dataObj.partTimeDoctor = this.tableData[1].doctor
                this.dataObj.partTimeMaster = this.tableData[1].master
                this.dataObj.partTimeBachelor = this.tableData[1].bachelor
                this.dataObj.partTimeJunior = this.tableData[1].junior
            }
            
            
            if(this.projectId){
                this.dataObj.projectId = this.projectId
                team(this.dataObj).then(res=>{
                    if(res && res.errorCode === 0){
                        this.$message({
                            showClose: true,
                            message: '团队保存成功,跳转到第三步',
                            type: 'success'
                        });
                        this.$router.push('/market')
                    }
                })
            }
            else{
                this.$message({
                    showClose: true,
                    message: '请先完善基本信息',
                    type: 'warning'
                });
            }
            
        },
        delFuc(){
            this.tableData=[]
        },
        saveFuc(){
            this.tableData=[]
            this.tableData.push(cloneObj(this.fullObj));
            this.tableData.push(cloneObj(this.partObj))

            this.closeFuc();
        },
        uploadFuc(data){
            upload(data).then(res=>{
                if(res && res.errorCode === 0){
                    this.teamStructureImgList.push(res.body.filePath);
                    this.dataObj.teamStructureImg.push(res.body.fileId)
                }
            })
        },
        delImg(index){
            this.teamStructureImgList.splice(index,1);
            this.dataObj.teamStructureImg.splice(index,1) 
        },
        closeFuc(){
            this.showDialog = false
            this.resetFuc();
        },
        resetTeam(){
            this.tableData=[];
            this.teamStructureImgList=[];
            this.dataObj ={
                projectId:"",
                teamStructureImg:[], 
            }
        },
        resetFuc(){
            this.$refs.full.resetFields();
            this.$refs.part.resetFields();
        },
        addFuc(){
            this.showDialog = true;
        }
    }
}
</script>

<style lang="stylus" scoped>
.team{
    padding 30px 88px;
    .h1_title{
        width 111px;
        font-size 18px;
        font-weight bold;
        padding 0 12px 23px 0;
        box-sizing border-box;
        color black;
    }
    .fenge{
        height 33px;
    }
    .add_btn{
        padding 16px 0 24px;
    }
    .next_btn{
        width 600px;
        padding 50px 0 88px;
        text-align center;
    }
    >>>.el-form{
        width 388px;
        margin auto;
    }
    >>>.el-table th {
        padding 0;
    }
}
</style>
