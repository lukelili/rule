<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in levelList" :key="item.path">{{ item.name }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  data() {
    return {
      levelList: []
    }
  },
  watch: {
    $route() {
      this.levelList = this.$route.matched
    }
  },
  mounted() {
    this.levelList = this.$route.matched
  }
}
</script>
<style lang="scss" scoped>
.el-breadcrumb{
  padding: 15px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
}
</style>
