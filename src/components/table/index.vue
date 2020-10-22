<template>
  <div class="component-table">
    <!-- 头部 -->
    <div class="operation">
      <div class="table-name">
        <i class="icon el-icon-s-unfold" />
        {{ tableOption.name }}
      </div>
      <el-button-group>
        <el-button icon="el-icon-circle-plus-outline" type="default">添加</el-button>
        <el-button icon="el-icon-delete" type="default">删除</el-button>
        <el-button icon="el-icon-refresh" type="default">刷新</el-button>
      </el-button-group>
    </div>
    <!-- 表格 -->
    <el-table v-loading="tableOption.loading" :data="tableOption.tableList" height="500" border :header-cell-style="{ backgroundColor:'#F5F7FA' }">
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
    <div class="page">
      <el-pagination
        background
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import page from './page.js'
import { Lteration } from '@/utils/tools.js'
export default {
  mixins: [page],
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tableOption: {
        name: '数据列表',
        /** tHead 是数组对象 每个对象可配置以下这些参数
         * @param { label } String 表头名
         * @param { field } String 字段名
         * @param { slotName } String 插槽名
         * @param { hidden } Boolaean 隐藏列 默认值: false
         * @param { width } String 单元格的宽度
         * @param { align } String /left|center|right/
         * **/
        tHead: [],
        tableList: [],
        loading: false
      }
    }
  },
  mounted() {
    Lteration(this.options, this.tableOption)
  }
}
</script>
<style lang="scss" scoped>
.component-table{
  display: flex;
  flex-direction: column;
  .operation{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    border: 1px solid #EBEEF5;
    background-color: rgb(245, 247, 250);
    border-bottom: none;
    .table-name{
      font-size: 14px;
      font-weight: 700;
      display: flex;
      align-items: center;
      color: #909399;
      .icon{
        margin-right: 4px;
        font-size: 18px;
      }
    }
  }
  .page{
    padding-top: 15px;
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
