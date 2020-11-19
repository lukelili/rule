<template>
  <el-container id="app-wrapper">
    <el-aside />
    <el-container direction="vertical">
      <Breadcrumb />
      <keep-alive>
        <div class="app-main">
          <router-view />
        </div>
      </keep-alive>
    </el-container>
  </el-container>
</template>
<script>
import Breadcrumb from './breadcrumb/index.vue'
import elAside from './elAside/index'
export default {
  components: { elAside, Breadcrumb }
}
</script>
<style lang="scss" scoped>
.el-container{
  height: inherit;
  .app-main{
    flex: 1;
    display: flex;
  }
}
</style>
