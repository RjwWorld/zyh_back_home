<template>
  <div id="app">
        <keep-alive>
            <router-view/>
        </keep-alive>
  </div>
</template>

<script>
export default {
    name: 'App',
}
</script>

<style lang="stylus">
@import '~@/files/css/varibles.styl'
html,body{
  height 100%;
}
#app{
  height 100%;
}
.move-enter-active,
.move-leave-active {
    transition: opacity .3s;
}

.move-enter,
.move-leave {
    opacity: 0;
}
</style>
