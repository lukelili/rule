<template>
  <el-aside :class="{'down': isCollapse}">
    <vuescroll>
      <el-menu :default-active="activeIndex" :collapse="isCollapse" class="el-menu-demo" mode="vertical" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router @select="handleSelect">
        <template v-for="route in routes">
          <template v-if="!route.hidden">
            <el-submenu :key="route.path" :index="route.path">
              <template slot="title">
                <!-- <i class="el-icon-menu" /> -->
                <span slot="title">{{ route.name }}</span>
              </template>
              <template v-for="child in route.children">
                <el-menu-item :key="child.path" :index="child.path">{{ child.name }}</el-menu-item>
              </template>
            </el-submenu>
          </template>
        </template>
      </el-menu>
    </vuescroll>
  </el-aside>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      activeIndex: this.$route.path
    }
  },
  computed: {
    ...mapState({
      isCollapse: state => state.global.isCollapse,
      routes: state => state.menu.routes
    })
  },
  methods: {
    handleSelect() {}
  }
}
</script>
<style lang="scss" scoped>
.el-aside{
  width: 200px !important;
  height: 100%;
  transition: .2s;
  background-color: rgb(84, 92, 100);
  .el-menu{
    border-right: none;
  }
}
.down{
  width: 64px !important;
  transition: .2s;
}
</style>
