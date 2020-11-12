<template>
  <div class="live-test">
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
  height: 600px;
  background-color: salmon;
}
</style>
