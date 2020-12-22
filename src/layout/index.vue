<template>
  <el-container id="app-wrapper">
    <Vaside />
    <el-container direction="vertical">
      <Vheader />
      <keep-alive>
        <div class="app-main">
          <router-view />
        </div>
      </keep-alive>
    </el-container>
  </el-container>
</template>
<script>
import Vheader from './Vheader/'
import Vaside from './Vaside/'
export default {
  components: { Vaside, Vheader }
}
</script>
