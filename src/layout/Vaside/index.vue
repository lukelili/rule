<template>
  <el-aside :class="{'down': isCollapse}">
    <vuescroll :ops="scrollOps">
      <el-menu :default-active="activeIndex" :collapse="isCollapse" class="el-menu-vertical-demo" mode="vertical" background-color="#333640" text-color="#8f939a" active-text-color="#3ab2a4" router @select="handleSelect">
        <template v-for="route in routes">
          <template v-if="!route.hidden">
            <el-submenu :key="route.path" :index="route.path">
              <template slot="title">
                <i :class="route.icon" />
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
  name: 'Vaside',
  data() {
    return {
      activeIndex: this.$route.path,
      scrollOps: {
        bar: {
          background: '#eee',
          opacity: .2
        },
        vuescroll: {
          wheelScrollDuration: 800
        }
      }
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
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
.el-aside{
  width: 200px !important;
  height: 100%;
  transition: .3s;
  background-color: #333640;
  .el-menu{
    border-right: none;
  }
}
.down{
  width: 64px !important;
  transition: .3s;
}
</style>
