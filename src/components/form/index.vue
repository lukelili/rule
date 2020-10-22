<template>
  <el-form ref="Form" :model="formData" label-width="100px">
    <template v-for="(item, index) in formItem">
      <el-form-item :key="index" :label="!item.hideLabel ? item.label : ''" :prop="item.field">
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
  </el-form>
</template>
<script>
import VSelect from '@c/select/index.vue'
export default {
  components: { VSelect },
  props: {
    /** formItem 是数组对象 每个对象可配置以下参数
     * @param { type } String input|select|radio|checkbox|datePicker|slot
     * @param { label } String 表单名
     * @param { slotName } String 插槽名 当type值为: slot 需传入slotName
     * @param { field } String 字段名
     * @param { hidden } Boolean 隐藏表单 默认值: false
     * @param { props } Object select 数据选项 具体前往select组件查看
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
  data() {
    return {}
  },
  methods: {
    submit() {
      this.$refs.Form.validate(valid => {
        console.log(valid)
      })
    }
  }
}
</script>
