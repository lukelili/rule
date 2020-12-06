<template>
  <div class="component-table">
    <!-- 头部 -->
    <div class="operation">
      <div class="table-name">
        <i class="iconfont icontable" />
        {{ tableOption.name }}
      </div>
      <div>
        <template v-for="(item, index) in tableOption.operates">
          <el-button :key="index" :icon="item.icon" :type="item.type" @click="operateEvent(item.event)">{{ item.label }}</el-button>
        </template>
        <el-button icon="el-icon-refresh" type="default">刷新</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      v-loading="tableOption.loading"
      :height="tableHeight"
      :data="tableOption.tableList"
      fit
      border
      row-key="_id"
      :header-cell-style="{ backgroundColor:'#F5F7FA' }"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <!-- 复选框 -->
      <el-table-column v-if="tableOption.selection" type="selection" width="55" align="center" />
      <template v-for="item in tableOption.tHead">
        <template v-if="!item.hidden">
          <!-- 插槽 -->
          <el-table-column v-if="item.slotName" :key="item.field" :label="item.label" :prop="item.field" :width="item.width" :align="item.align">
            <template slot-scope="scope">
              <slot :name="item.slotName" :data="scope.row" :index="scope.$index" />
            </template>
          </el-table-column>
          <!-- 默认 -->
          <el-table-column v-else :key="item.field" :label="item.label" :prop="item.field" :width="item.width" :align="item.align" />
        </template>
      </template>
    </el-table>
    <!-- 分页 -->
    <div v-if="tableOption.total" class="page">
      <el-pagination
        background
        :current-page="page.pageNumber"
        :page-sizes="[20, 40, 60, 100]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import page from './page.js'
export default {
  mixins: [page],
  props: {
    options: {
      type: Object,
      required: true
    },
    param: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tableHeight: 0,
      tableOption: {
        name: '数据列表',
        /** operates 表格头部操作按钮数组对象 每个对象包含以下配置参数
         * @param { label } String 按钮文字
         * @param { type } String 按钮类型
         * @param { icon } String 按钮图标
         * @param { event } Function 事件
         * **/
        operates: [],
        /** tHead 表头数组对象 每个对象包含以下配置参数
         * @param { label } String 表头名
         * @param { field } String 字段名
         * @param { slotName } String 插槽名
         * @param { hidden } Boolaean 隐藏列 默认值: false
         * @param { width } String 单元格的宽度
         * @param { align } String /left|center|right/
         * **/
        tHead: [],
        // 复选框
        selection: false,
        // 表格数据
        tableList: [],
        // 加载状态
        loading: false,
        // 数据条数
        total: 0
      },
      page: {
        pageNumber: 1,
        pageSize: 10
      }
    }
  },
  watch: {
    'options': {
      handler(data) {
        this.initOPtion()
      },
      deep: true
    }
  },
  mounted() {
    this.initOPtion()
    this.$nextTick(() => {
      this.resize()
    })
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize() {
      this.tableHeight = 0
      const breadcrumb = document.querySelector('.header-bar')
      const searchWrap = document.querySelector('#search-wrapper')
      const searchHeight = (searchWrap && searchWrap.clientHeight) || 0
      // 搜索框高 + 面包屑高 + 表格操作栏高 + 分页高 + 上下的内边距
      const height = searchHeight + breadcrumb.clientHeight + 51 + 42 + 20
      this.tableHeight = window.innerHeight - height
    },
    // 初始化配置参数
    initOPtion() {
      this.param && this.$deepMatch(this.param, this.page)
      this.$deepMatch(this.options, this.tableOption)
    },
    // 操作按钮事件
    operateEvent(event) {
      if (event) event()
    },
    // 页码
    handleSizeChange(size) {
      this.param.pageSize = size
      this.$emit('pageChange')
    },
    // 翻页
    handleCurrentChange(num) {
      this.param.pageNumber = num
      this.$emit('pageChange')
    }
  }
}
</script>
<style lang="scss" scoped>
.component-table{
  flex: 1;
  position: relative;
  .operation{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    border: 1px solid #EBEEF5;
    background-color: rgb(245, 247, 250);
    border-bottom: none;
    .table-name{
      font-size: 14px;
      font-weight: 700;
      display: flex;
      align-items: center;
      color: #909399;
      .iconfont{
        margin-top: 1px;
        margin-right: 4px;
        font-size: 12px;
      }
    }
  }
  .page{
    padding-top: 10px;
    text-align: right;
    .el-pagination{
      padding: 2px 0;
    }
  }
}
</style>
<style lang="scss">
.el-table{
  flex: none !important;
  .el-table__header-wrapper{
    .gutter{
      background-color: rgb(245, 247, 250);
    }
  }
}
</style>
