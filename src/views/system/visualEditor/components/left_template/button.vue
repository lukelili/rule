<template>
  <el-button type="default">{{ propValue }}</el-button>
</template>
<script>
export default {
  props: {
    propValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  }
}
</script>