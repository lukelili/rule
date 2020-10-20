<template>
  <div class="table">
    <div class="operation">
      <el-button-group>
        <el-button icon="el-icon-circle-plus-outline" type="primary">添加</el-button>
        <el-button icon="el-icon-delete" type="danger">删除</el-button>
        <el-button icon="el-icon-refresh" type="success">刷新</el-button>
      </el-button-group>
    </div>
    <el-table v-loading="tableOption.loading" :data="tableOption.tableList" border :header-cell-style="{ backgroundColor:'#F5F7FA' }">
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
    console
  }
}
</script>
<style lang="scss" scoped>
.table{
  height: 100%;
  display: flex;
  flex-direction: column;
  // background: #ccc;
  .el-table{
    flex: 1;
  }
  .operation{
    text-align: right;
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
