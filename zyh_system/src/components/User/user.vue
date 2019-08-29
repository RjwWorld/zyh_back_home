<template>
    <div class="user">
        <transition name="move" mode="out-in">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.user{
    width 100%;
    height 100%;
    background white;
    box-sizing border-box;
}
</style>
