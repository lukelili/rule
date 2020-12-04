<template>
  <el-date-picker v-model="dateData[dateItem.field]" :type="defaultOption.dateType" :value-format="valueFormat" :placeholder="'请选择' + defaultOption.label" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
</template>
<script>
export default {
  props: {
    dateItem: {
      type: Object,
      default: () => {}
    },
    dateData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      /** 默认配置
       * @param { label } String 表单名
       * @param { field } String 属性名
       * @param { dateType } String 日期类型 daterange日期范围 | year年 | month月 | date天 | datetime单选年月日时分秒 | datetimerange范围年月日时分秒
       * **/
      defaultOption: {
        label: '',
        field: '',
        dateType: 'daterange'

      },
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd'
    }
  },
  mounted() {
    this.$deepMatch(this.dateItem, this.defaultOption)
    this.initDateOption()
  },
  methods: {
    initDateOption() {
      const dateType = this.defaultOption.dateType
      const dateFormat = {
        daterange: 'yyyy-MM-dd',
        year: 'yyyy',
        month: 'yyyy-MM',
        date: 'yyyy-MM-dd',
        datetime: 'yyyy-MM-dd HH:mm:ss',
        datetimerange: 'yyyy-MM-dd HH:mm:ss'
      }
      this.valueFormat = dateFormat[dateType]
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
