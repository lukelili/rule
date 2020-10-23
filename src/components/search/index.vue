<template>
  <el-form ref="searchForm" :inline="true" :model="searchData" class="search-form-inline">
    <template v-for="(item, index) in searchItem">
      <el-form-item :key="index" :label="item.showLabel ? item.label : ''" :prop="item.field">
        <!-- 输入框 -->
        <el-input v-if="item.type === 'input'" v-model="searchData[item.field]" :placeholder="'请输入' + item.label" :clearable="!!item.clearable" />
        <!-- 下拉选择器 -->
        <v-select v-if="item.type === 'select'" :select-item="item" :select-data="searchData" />
        <!-- 日期范围 -->
        <date-picker v-if="item.type === 'datePicker'" :date-item="item" :date-data="searchData" />
      </el-form-item>
    </template>
    <el-form-item>
      <el-button icon="el-icon-search" type="danger" @click="btnSearch">搜索</el-button>
      <el-button type="default" @click="btnReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import VSelect from '@c/select/'
import datePicker from '@c/datePicker/'
export default {
  components: { VSelect, datePicker },
  props: {
    /**
     * searchItem数组里每个对象代表一个表单 根据type来显示表单的类型 []里的代表该属性适用与哪种类型的表单
     * @param { type } String select/input/datePicker
     * @param { label } String 表单名
     * @param { showLabel } Boolean 显示表单名称
     * @param { field } String 表单属性
     * @param { clearable } Boolean 清空表单内容
     * @param { props } Object 定义数据的字段名 数据选项 具体配置前往select组件查看
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
      this.$refs.searchForm.resetFields()
      // for (const key in this.searchData) {
      //   this.searchData[key] = ''
      // }
      // this.searchData.pageSize = 10
      // this.searchData.pageNumber = 1
      this.btnSearch()
    }
  }
}
</script>
<style lang="scss">
.el-date-editor{
  width: 230px !important;
}
.search-form-inline{
  .el-form-item{
    margin-bottom: 10px !important;
  }
}
</style>
