<template>
  <div class="ocr-identify">
    <v-title :title="title" />
    <div class="main"></div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.main{
  height: 800;
  background-color: sandybrown;
}
</style>
