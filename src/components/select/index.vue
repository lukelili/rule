<template>
  <el-select v-model="selectData[defaultOption.field]" :placeholder="placeholder" :clearable="defaultOption.clearable" :loading="selectLoading" @focus="focus">
    <el-option v-if="defaultOption.hideAll" label="全部" value="" />
    <el-option
      v-for="(select, index) in defaultOption.data"
      :key="index"
      :label="select[defaultOption.props.label]"
      :value="select[defaultOption.props.value]"
    />
  </el-select>
</template>
<script>
export default {
  name: 'VSelect',
  props: {
    selectItem: {
      type: Object,
      required: true
    },
    selectData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      /**
       * @param { selectLoading } Boolean 下拉菜单loading状态
      * **/
      selectLoading: false,
      /**
       * @param { label } String 表单的提示文字
       * @param { field } String 表单属性
       * @param { calearable } Boolean 表单清空 默认值: true
       * @param { hideAll } Boolean 隐藏全部选项 默认值: false
       * @param { data } Array 表单数据
       * @param { props } Object 配置选项
      * **/
      defaultOption: {
        label: '',
        field: '',
        clearable: false,
        hideAll: false,
        data: [],
        /**
         * @param { label } Array 指定选项标签为选项对象的某个属性值
         * @param { value } Object 指定选项标签为选项对象的某个属性值
        * **/
        props: {
          label: 'label',
          value: 'value'
        }
      }
    }
  },
  computed: {
    placeholder() {
      const label = this.selectItem.label
      if (label) {
        return `请选择${label}`
      } else {
        return `请选择下拉框`
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    focus() {
      this.initData()
    },
    async initData() {
      const selectItem = this.selectItem // 传入的配置
      const defaultOption = this.defaultOption // 默认配置
      const data = selectItem.data
      this.$deepMatch(selectItem, defaultOption)
      if (data === '' && !data.length || !Object.keys(data).length) {
        this.defaultOption.data = []
        return
      }
      // 私有数据
      if (typeof data === 'object') {
        this.defaultOption.data = data
        return
      }
      // 共享数据
      if (typeof data === 'string') {
        const vuexData = await this.$store.getters[data]
        this.defaultOption.data = vuexData
        return
      }
    }
  }
}
</script>
