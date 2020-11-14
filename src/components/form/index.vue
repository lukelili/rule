<template>
  <el-form ref="Form" :model="formData" label-width="100px" class="form-wrapper">
    <template v-for="(item, index) in formItem">
      <el-form-item :key="index" :label="!item.hideLabel ? item.label : ''" :rules="matchRules(item)" :prop="item.field">
        <template v-if="!item.hidden">
          <!-- 插槽 -->
          <slot v-if="item.type === 'slot'" :name="item.slotName" />
          <!-- 输入框 -->
          <el-input v-if="item.type === 'input'" v-model="formData[item.field]" :placeholder="'请输入' + item.label" :clearable="!item.clearable" />
          <!-- 下拉选择器 -->
          <v-select v-if="item.type === 'select'" :select-item="item" :select-data="formData" />
          <!-- 日期范围 -->
          <el-date-picker v-if="item.type === 'datePicker'" v-model="date['date'+index]" type="daterange" value-format="yy-mm-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" @change="dateChange($event, item)" />
        </template>
      </el-form-item>
    </template>
    <div class="footer">
      <el-button type="default" @click="handleClose">取 消</el-button>
      <el-button type="primary" class="confirm" :loading="btnLoading" @click="handleConfirm">提 交</el-button>
    </div>
  </el-form>
</template>
<script>
import { mapState } from 'vuex'
import VSelect from '@c/select/index.vue'
export default {
  components: { VSelect },
  props: {
    /** formItem[Object] 是数组对象 每个对象可配置以下参数
     * @param { type } String input|select|radio|checkbox|datePicker|slot
     * @param { label } String 表单名
     * @param { slotName } String 插槽名 当type值为: slot 需传入slotName
     * @param { field } String 字段名
     * @param { hidden } Boolean 隐藏表单 默认值: false
     * @param { props } Object select 数据选项 具体配置前往select组件查看
     * @param { required } Boolean 是否为必填项 默认值: false
     * @param { rules } Array 是数组
     * **/
    formItem: {
      type: Array,
      default: () => []
    },
    // 传送给后端的参数信息
    formData: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState({
      btnLoading: state => state.event.btnLoading
    })
    // confirmLoding() {
    //   return this.$store.state.global.loading
    // }
  },
  methods: {
    // 取消
    handleClose() {
      this.$emit('update:visible', false)
    },
    // 提交
    handleConfirm() {
      this.$refs.Form.validate(valid => {
        if (!valid) return
        this.$store.commit('SET_LOADING', true)
        this.$emit('submit')
      })
    },
    matchRules(rule) {
      const rulesArray = []
      const type = rule.type
      const label = rule.label
      const msg = type === 'input' ? '请输入' : '请选择'
      const required = rule.required
      if (required) {
        rulesArray.push({ required: true, message: msg + label })
      }
      return rulesArray
      // const rules = option.rules
      // if (rules && Array.isArray(rules)) {

      // }
    }
  }
}
</script>
<style lang="scss" scoped>
.form-wrapper{
  .footer{
    text-align: right;
    padding-bottom: 15px;
    .el-button{
      padding: 10px 20px;
    }
    .confirm{
      padding: 10px 40px;
    }
  }
}
</style>
