<template>
  <el-container id="app-wrapper">
    <Vaside />
    <el-container direction="vertical">
      <Vheader />
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <div class="app-main">
            <router-view />
          </div>
        </keep-alive>
      </transition>
    </el-container>
    <!-- <Tool /> -->
  </el-container>
</template>
<script>
import Vheader from './Vheader/'
import Vaside from './Vaside/'
import Tool from './Tool'
export default {
  components: { Vaside, Vheader, Tool }
}
</script>
