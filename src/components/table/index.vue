<template>
  <div class="component-table">
    <div class="operation">
      <div class="table-name">
        数据列表
      </div>
      <el-button-group>
        <el-button icon="el-icon-circle-plus-outline" type="default">添加</el-button>
        <el-button icon="el-icon-delete" type="default">删除</el-button>
        <el-button icon="el-icon-refresh" type="default">刷新</el-button>
      </el-button-group>
    </div>
    <el-table v-loading="tableOption.loading" :data="tableOption.tableList" height="500" border :header-cell-style="{ backgroundColor:'#F5F7FA' }">
      <template v-for="item in tableOption.tHead">
        <!-- 按钮组 -->
        <el-table-column v-if="item.columnType === 'slot'" :key="item.field" :label="item.label" :prop="item.field">
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row" :index="scope.$index" />
          </template>
        </el-table-column>
        <!-- 原始数据 -->
        <el-table-column v-else :key="item.field" :label="item.label" :prop="item.field" />
      </template>
    </el-table>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
      />
    </div>
  </div>
</template>
<script>
import { lteration } from '@/utils/tools.js'
export default {
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tableOption: {
        tHead: [],
        tableList: [],
        loading: false
      }
    }
  },
  mounted() {
    lteration(this.options, this.tableOption)
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
      color: #909399;
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
  flex: none;
  .el-table__header-wrapper{
    .gutter{
      background-color: rgb(245, 247, 250);
    }
  }
}
</style>
