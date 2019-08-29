<template>
    <div class="lookImg">
        <div class="imgBox">
            <img class="img_pic" :src="imgUrl" alt="">
            <span class="look" @mouseenter="$event.target.style.opacity='1'" @mouseleave="$event.target.style.opacity='0'" style="opacity:0">
                <i class="el-icon-zoom-in look_icon" @click="lookImg"></i>
            </span>
        </div>


        <el-dialog
            title="查看图片"
            :visible.sync="imgDialog"
            append-to-body
            center
        >
            <img :src="imgUrl" alt="" width="100%">
        </el-dialog>
    </div>
</template>

<script>
export default {
    props:{
        imgUrl:{
            type:String
        }
    },
    data(){
        return{
            imgDialog:false,
        }
    },
    methods:{
        lookImg(){
            this.imgDialog = true;
        }
    }
}
</script>

<style lang="stylus" scoped>
.lookImg{
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
        .look{
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
            .look_icon{
                cursor pointer;
            }
        }
    }
}
</style>
