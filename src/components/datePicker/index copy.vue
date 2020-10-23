<template>
  <el-date-picker v-model="date" :type="defaultOption.dateType" :value-format="valueFormat" :placeholder="'请选择' + defaultOption.label" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" @change="dateChange" />
</template>
<script>
import { Lteration } from '@/utils/tools.js'
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
      date: '',
      /** 默认配置
       * @param { label } String 表单名
       * @param { field } String 属性名 当dateType值为: year年 | month月 | date天 | datetime 取field属性赋值
       * @param { dateType } String 日期类型 daterange日期范围 | year年 | month月 | date天 | datetime单选年月日时分秒 | datetimerange范围年月日时分秒
       * @param { fields } Array 范围属性的起始和结束属性 当dateType值为: daterange日期范围 | datetimerange范围年月日时分秒 取fields属性复制
       * **/
      defaultOption: {
        label: '',
        dateType: 'daterange'

      },
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd'
    }
  },
  mounted() {
    Lteration(this.dateItem, this.defaultOption)
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
    },
    dateChange(date) {
      const dateType = this.defaultOption.dateType
      if ((dateType === 'daterange' || dateType === 'datetimerange') && date !== null) {
        const fields = this.dateItem.fields
        this.dateData[fields[0]] = date[0]
        this.dateData[fields[1]] = date[1]
      } else {
        const field = this.dateItem.field
        this.dateData[field] = date
      }
      console.log(date)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
