<template>
  <div class="header-bar">
    <div class="menu-btn" @click="handleIsOpenMenu">
      <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" />
    </div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in levelList" :key="item.path">{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Vheader',
  data() {
    return {
      levelList: []
    }
  },
  computed: {
    ...mapState({
      'isCollapse': state => state.global.isCollapse
    })
  },
  watch: {
    $route() {
      this.levelList = this.$route.matched
    }
  },
  mounted() {
    this.levelList = this.$route.matched
  },
  methods: {
    handleIsOpenMenu() {
      this.$store.commit('global/SET_DATA', { key: 'isCollapse', value: !this.isCollapse })
    }
  }
}
</script>
<style lang="scss" scoped>
.header-bar{
  height: 45px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  .menu-btn{
    width: 45px;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    transition: .2s;
    cursor: pointer;
    background-color: #eee;
    &:hover{
      background-color: #ccc;
    }
  }
}
</style>
