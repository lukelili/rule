<template>
  <el-dialog :title="title" :visible="visible" :width="width" :before-close="handleClose" :close-on-click-modal="false" :close-on-press-escape="false">
    <div class="model">
      <slot />
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    /**
     * @param { title } String 弹窗标题
     * @param { width } String 弹窗宽度 默认 600px
     * @param { visible } Boolean 弹窗是否显示 默认 false
     * @param { fullscreen } Boolean 是否全屏 默认false
     * **/
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '600px'
    },
    visible: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 关闭窗口
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.confirm{
  padding: 9px 40px;
}
</style>
