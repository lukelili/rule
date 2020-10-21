<template>
  <el-form ref="searchForm" :inline="true" :model="searchData" class="demo-form-inline">
    <template v-for="(item, index) in searchItem">
      <el-form-item :key="index" :label="!item.hideLabel ? item.label : ''" :prop="item.field">
        <!-- 输入框 -->
        <el-input v-if="item.type === 'input'" v-model="searchData[item.field]" :placeholder="'请输入' + item.label" :clearable="!!item.clearable" />
        <!-- 下拉选择器 -->
        <el-select v-if="item.type === 'select'" v-model="searchData[item.field]" :placeholder="'请选择' + item.label" :clearable="!!item.clearable">
          <el-option label="全部" :value="null" />
          <el-option v-for="select in item.data" :key="select.id" :label="select.label" :value="select.value" />
        </el-select>
        <!-- 日期范围 -->
        <el-date-picker v-if="item.type === 'datePicker'" v-model="date['date'+index]" type="daterange" value-format="yy-mm-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" @change="dateChange($event, item)" />
      </el-form-item>
    </template>
    <el-form-item>
      <el-button icon="el-icon-search" type="danger" @click="btnSearch">搜索</el-button>
      <el-button type="default" @click="btnReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    /**
     * searchItem数组里每个对象代表一个表单 根据type来显示表单的类型 []里的代表该属性适用与哪种类型的表单
     * @param { type } String select/input/datePicker
     * @param { label } String 表单名                   [select/input/datePicker]
     * @param { hideLabel } Boolean 隐藏表单名称        [select/input/datePicker]
     * @param { field } String 表单属性                 [select/input/datePicker]
     * @param { clearable } Boolean 清空表单内容        [select/input/datePicker]
     * @param { props: {
     *                  label: 'label',
     *                  value: 'value'
     *                }
     *        } Object 定义数据的字段名 默认是label/value [select]
     * @param { split } Array 长度为2的日期范围 起始时间字段 和 结束时间字段 [datePicker]
    **/
    searchItem: {
      type: Array,
      default: () => []
    },
    searchData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      date: {}
    }
  },
  mounted() {
  },
  methods: {
    // 搜索按钮
    btnSearch() {
      this.$emit('handleSearch', this.searchData)
    },
    // 重置按钮 //就因为后端要拆解日期参数 我要写这么多代码
    btnReset() {
      this.date = {}
      const filter = ['datePicker']
      // 在表单配置项过滤出日期的表单
      const searchItem = this.searchItem.filter(item => filter.includes(item.type))
      // 二维数组 转换 一维数组
      const maps = searchItem.reduce((old, val) => old.split.concat(val.split))
      // 再遍历 取出参数对应的字段 清空
      maps.forEach(item => {
        if (Object.prototype.hasOwnProperty.call(this.searchData, item)) {
          this.searchData[item] = ''
        }
      })
      this.$refs.searchForm.resetFields()
      this.btnSearch()
    },
    // 日期选择
    dateChange(date, item) {
      // date是范围日期 item.split是数组 包含长度为2的两个字符串
      if (date !== null && (item.split && item.split.length === 2)) {
        this.searchData[item.split[0]] = date[0]
        this.searchData[item.split[1]] = date[1]
      } else {
        this.searchData[item.split[0]] = ''
        this.searchData[item.split[1]] = ''
      }
    }
  }
}
</script>
<style lang="scss">
.el-date-editor{
  width: 230px !important;
}
</style>
