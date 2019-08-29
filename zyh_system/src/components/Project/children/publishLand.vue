<template>
  <div class="publishLand">
    <el-dialog title="发布新土地" :visible.sync="showDialog" width="1300px" center>
        <div class="publishForm">
            <h1>必填项</h1>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return{
            showDialog:false
        }
    }
};
</script>

<style scoped>
</style>
