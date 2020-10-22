<template>
  <el-select v-model="selectData[defaultOption.field]" :placeholder="'请选择' + defaultOption.label" :clearable="defaultOption.clearable" :loading="selectLoading">
    <el-option v-if="defaultOption.hideAll" label="全部" :value="null" />
    <el-option v-for="select in defaultOption.data" :key="select.mark" :label="select[defaultOption.props.label]" :value="select[defaultOption.props.value]" />
  </el-select>
</template>
<script>
import { Lteration } from '@/utils/tools.js'
export default {
  name: 'VSelect',
  props: {
    selectItem: {
      type: Object,
      default: () => {}
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
      selectLoading: true,
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
        clearable: true,
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
  },
  watch: {
    'selectItem.data': {
      handler(data) {
        // 监听到异步数据后再次初始化
        this.initOptions()
      }
    }
  },
  mounted() {
    this.initOptions()
  },
  methods: {
    initOptions() {
      const selectItem = this.selectItem // 传入的配置
      const defaultOption = this.defaultOption // 默认配置
      // 判断 数据长度大于零 loading状态设为false 否则loading状态设置为true
      selectItem.data.length ? this.selectLoading = false : this.selectLoading = true
      // 替换默认的配置
      Lteration(selectItem, defaultOption)
      // 给数据加个唯一标识
      this.dataMark(defaultOption.data)
    },
    dataMark(data) {
      data.forEach((item, index) => {
        if (!item.id) item.mark = 'select' + index
      })
    }
  }
}
</script>
