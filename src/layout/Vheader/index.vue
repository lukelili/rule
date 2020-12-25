<template>
  <div class="header-bar">
    <div class="left-operator operator">
      <div class="menu-btn icon-btn" @click="handleIsOpenMenu">
        <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" />
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in levelList" :key="item.path">{{ item.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-operator operator">
      <div class="out-btn icon-btn" @click="handleLogOut">
        <i class="el-icon-switch-button" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { resetRouter } from '@/router'
import { clear } from '@/utils/storage'
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
    // 退出登录
    async handleLogOut() {
      const result = await this.$http.post('/logOut')
      if (!result) return
      // 清空本地存储
      clear()
      // 重置路由
      resetRouter()
      // 重置vuex
      this.$store.commit('menu/RESET_ROUTES')
      // 跳转登录页
      this.$router.push('/login')
    },
    // 菜单展开收起
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
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  .operator{
    display: flex;
    align-items: center;
    height: 100%;
    .menu-btn{
      margin-right: 15px;
      border-right: 1px solid #eee;
    }
    .out-btn{
      border-left: 1px solid #eee;
    }
    .icon-btn{
      width: 45px;
      height: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: .2s;
      cursor: pointer;
      &:hover{
        background-color: #eee;
      }
    }
  }
}
</style>
