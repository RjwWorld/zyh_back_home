<template>
  <div>
      <el-dialog title="查看" :visible.sync="open" width="500px" center>
         <el-form label-width="100px" label-position="right" >
                <div class="form_div">
                    <el-form-item label="建议内容：">
                        <span>{{dataObj.msg}}</span>
                    </el-form-item>
                </div>
            </el-form>
      </el-dialog>
    <table-list
      :tableTitle="tableHeader"
      :tableData="tableData"
      @changeFuc="changeFuc"
      @operation="operation"
    />
  </div>
</template>

<script>
import { feedbacklist, feedbackgetById } from "@/api";
import allTableHeader from "@/files/js/tableHeader";
import TableList from "@/components/Feedback/table";
export default {
  components: {
    TableList
  },
  data() {
    return {
        open:false,
        loadingBtn: false,
        tableObj: {
        keyWord: "",
        status: null,
        pageSize: 8,
        startPage: 1
      },
      tableData: {},
      tableHeader: allTableHeader.feedbackheader,
      dataObj:{
          msg:""
      }
    };
  },
//   activated() {
//     this.initWeb();
//   },
  created(){
      this.initWeb();
  },
  methods: {
    operation(type,data){
        switch(type){
            case "look":
              feedbackgetById({id:data.id}).then(res=>{
                  if(res&&res.errorCode==0){
                      this.open=true
                      this.dataObj=res.body
                  }
              })  
            break;
        }
    },
    changeFuc(type, value) {
      // console.log(value)
      this.loadingBtn = true;
      if (type == "page") {
        // console.log(type,this)
        this.tableObj.startPage = value;
      }
      feedbacklist(this.tableObj).then(res => {
        if (res.errorCode == 0) {
          this.loadingBtn = false;
          this.tableData = res.body;
        }
      });
    },
    initWeb() {
      this.changeFuc();
    }
  }
};
</script>

<style>
</style>
