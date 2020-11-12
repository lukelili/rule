<template>
  <el-container id="app-wrapper">
    <el-aside />
    <el-container direction="vertical">
      <Breadcrumb />
      <keep-alive>
        <div class="app-main">
          <el-scrollbar ref="scrollBar" style="height: 100%">
            <router-view />
          </el-scrollbar>
        </div>
      </keep-alive>
    </el-container>
  </el-container>
</template>
<script>
import Breadcrumb from './breadcrumb/index.vue'
import elAside from './elAside/index'
export default {
  components: { elAside, Breadcrumb },
  mounted() {
    const scrollEl = this.$refs.scrollBar.wrap
    scrollEl.addEventListener('scroll', () => {
      const top = scrollEl.scrollTop
      this.$store.commit('SET_SCROLL_TOP', top)
    })
  }
}
</script>
<style lang="scss" scoped>
.el-container{
  height: inherit;
  .app-main{
    height: 100vh;
  }
}
</style>
