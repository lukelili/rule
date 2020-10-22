<template>
  <el-dialog :title="title" :visible="visible" :width="width" :before-close="handleClose">
    <div class="model">
      <slot />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="default" @click="handleClose">取 消</el-button>
      <el-button type="primary" class="confirm" :loading="confirmLoding" @click="handleConfirm">确 认</el-button>
    </span>
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
  data() {
    return {
      confirmLoding: false
    }
  },
  methods: {
    // 关闭窗口
    handleClose() {
      this.confirmLoding = false
      this.$emit('update:visible', false)
    },
    // 确认按钮
    handleConfirm() {
      this.confirmLoding = true
      this.$emit('handleConfirm')
    }
  }
}
</script>
<style lang="scss" scoped>
.confirm{
  padding: 9px 40px;
}
</style>
