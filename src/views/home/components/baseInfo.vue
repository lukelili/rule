<template>
  <div class="base-info">
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
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.main{
  height: 400px;
  background-color: yellow;
}
</style>
