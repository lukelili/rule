<template>
  <div class="container">
    <div class="header">
      <div class="search">
        <el-cascader :options="rolesList" :props="props" collapse-tags clearable />
        <el-button type="danger" icon="el-icon-search">搜索</el-button>
      </div>
      <el-button type="primary" size="small">添加角色</el-button>
    </div>
    <el-table
      :data="tableData"
      row-key="level"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="姓名" prop="name" align="center" />
      <el-table-column label="角色" prop="roles" align="center">
        <template slot-scope="{ row }">
          {{ transRolesText(row.roles) }}
        </template>
      </el-table-column>
      <el-table-column label="性别" prop="gender" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.gender ? '' : 'danger'">{{ row.gender ? '男' : '女' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="手机号" prop="phone" align="center" />
      <el-table-column label="状态" prop="status" align="center">
        <template slot-scope="{ row }">
          <el-switch v-model="row.status" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <el-button type="primary" size="mini">编辑</el-button>
        <el-button type="default" size="mini">添加子级</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { rolesList, accountList } from '@/assets/data'
export default {
  data() {
    return {
      tableData: accountList,
      rolesList: rolesList,
      searchData: {
        roles: ''
      },
      props: {
        multiple: true,
        value: 'field',
        label: 'name'
      }
    }
  },
  mounted() {
    const current = this.emeab(rolesList, 'first_checker')
    console.log(current)
  },
  methods: {
    transRolesText(roles) {
      const current = this.emeab(rolesList, roles)
      return current.name
    },
    emeab(rolesList, roles, result = []) {
      rolesList.forEach(item => {
        if (item.field === roles) {
          result.push(item)
        } else {
          if (item.children && item.children.length) {
            this.emeab(item.children, roles, result)
          }
        }
      })
      return result[0]
    }
  }
}
</script>
<style lang="scss" scoped>
.header{
  display: flex;
  justify-content: space-between;
  .search{
    .el-button{
      margin-left: 15px;
    }
  }
}
</style>
