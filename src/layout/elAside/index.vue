<template>
  <el-aside width="200px">
    <vuescroll>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="vertical" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router @select="handleSelect">
        <template v-for="route in routes">
          <el-submenu :key="route.path" :index="route.path">
            <template slot="title">{{ route.name }}</template>
            <template v-for="child in route.children">
              <el-menu-item :key="child.path" :index="child.path">{{ child.name }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </vuescroll>
  </el-aside>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: '1',
      routes: this.$router.options.routes
    }
  },
  mounted() {
    // console.log(this.routes)
  },
  methods: {
    handleSelect() {
      // console.log('aa')
    }
  }
}
</script>
<style lang="scss" scoped>
.el-aside{
  height: 100%;
  background-color: rgb(84, 92, 100);
  .el-menu{
    border-right: none;
  }
}
</style>
