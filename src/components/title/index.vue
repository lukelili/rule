<template>
  <div class="title">
    {{ title }}
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
.title{
  font-size: 18px;
  line-height: 2;
  padding: 0 15px;
  border-bottom: 1px solid #eee;
  // margin-bottom: 15px;
  background-color: #eee;
}
</style>
