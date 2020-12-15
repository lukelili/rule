<template>
  <el-form ref="Form" :model="formData" :hide-required-asterisk="true" label-width="100px" class="form-wrapper">
    <template v-for="(item, index) in formItem">
      <el-form-item :key="index" :label="!item.hideLabel ? item.label : ''" :rules="validationRule(item)" :prop="item.field">
        <template v-if="!item.hidden">
          <!-- 插槽 -->
          <slot v-if="item.type === 'slot'" :name="item.slotName" />
          <!-- 输入框 -->
          <el-input
            v-if="item.type === 'input'"
            v-model="formData[item.field]"
            :placeholder="'请输入' + item.label"
            :clearable="!item.clearable"
            :disabled="item.disabled"
          />
          <!-- 单选按钮 -->
          <el-radio-group v-if="item.type === 'radio'" v-model="formData[item.field]">
            <el-radio
              v-for="radio in item.option"
              :key="radio.value"
              border
              :label="radio.value"
            >{{ radio.label }}</el-radio>
          </el-radio-group>
          <!-- 下拉选择器 -->
          <v-select v-if="item.type === 'select'" :select-item="item" :select-data="formData" />
          <!-- 日期范围 -->
          <el-date-picker
            v-if="item.type === 'datePicker'"
            v-model="date['date'+index]"
            type="daterange"
            value-format="yy-mm-dd"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="dateChange($event, item)"
          />
        </template>
      </el-form-item>
    </template>
    <div class="footer">
      <el-button type="default" @click="handleClose">取 消</el-button>
      <el-button type="primary" class="confirm" @click="handleConfirm">提 交</el-button>
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
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      btnLoading: state => state.event.btnLoading
    })
  },
  watch: {
    visible(bool) {
      if (!bool) {
        // 监听表格关闭的时候 延迟200毫秒(视觉效果会好一些) 重置表单
        setTimeout(() => {
          this.$refs.Form.clearValidate()
          this.$refs.Form.resetFields()
        }, 200)
      }
    }
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
        // this.$store.commit('SET_LOADING', true)
        this.$emit('submit')
      })
    },
    validationRule(option) {
      const checkes = []
      // 必填
      if (option.required) {
        const message = `${this.tips(option.type)}${option.label}`
        const required = { required: true, message: message }
        checkes.push(required)
      }
      const rule = option.rule
      if (!rule) return checkes
      // 数组
      if (Array.isArray(rule)) {
        checkes.push(...rule)
        return checkes
      }
      // 对象
      if (this.isObject(rule)) {
        checkes.push(rule)
        return checkes
      }
      // 匹配内置规则
      if (typeof rule === 'string') {
        checkes.push(...this.matchCheckes(option))
        return checkes
      }
    },
    matchCheckes(option) {
      const label = option.label
      const item = option.rule.split(',')
      const rulesArray = []
      const roleName = this.checkes(item[0], label)
      roleName && rulesArray.push(roleName)
      // 最小个数
      const min = parseInt(item[1])
      if (min || min === 0) {
        const roleMin = this.checkes('min', label, min)
        rulesArray.push(roleMin)
      }
      // 最大个数
      const max = parseInt(item[2])
      if (max) {
        const roleMax = this.checkes('max', label, max)
        rulesArray.push(roleMax)
      }
      return rulesArray
    },
    checkes(field, label = '', min = 0, max = 1000) {
      const rules = {
        cn: { pattern: /^[\u4e00-\u9fa5\s]*$/g, message: `${label} 必须为中文` },
        en: { pattern: /^[a-zA-Z\s]*$/g, message: `${label} 必须为英文` },
        thai: { pattern: /^[\u0E00-\u0E7F\s]*$/g, message: `${label} 必须为泰文` },
        number: { pattern: /^\d+\.?\d*$/, message: `${label} 必须为数字类型` },
        min: { min: min, message: `${label} 最小长度 ${min}` },
        max: { max: max, message: `${label} 最大长度 ${max}` }
      }
      if (Object.prototype.hasOwnProperty.call(rules, field)) {
        return rules[field]
      }
    },
    // // 错误提示
    tips(type) {
      return type === 'input' ? '请输入' : '请选择'
    },
    // 对象判断
    isObject(port) {
      return Object.prototype.toString.call(port) === '[object Object]'
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
  .el-radio-group{
    .is-bordered{
      margin-right: 0;
    }
  }
}
</style>
