<template>
  <div class="container">
    <div class="header">
      <el-button type="primary" size="small" @click="showRolesModel('addRoles')">添加角色</el-button>
    </div>
    <el-table
      :data="tableData"
      row-key="level"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="角色名" prop="name" align="center" />
      <el-table-column label="角色标识" prop="field" align="center" />
      <el-table-column label="状态" prop="status" align="center">
        <template slot-scope="{ row }">
          <el-switch v-model="row.status" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="showRolesModel('editRoles', row)">编辑</el-button>
          <el-button type="warning" size="mini" @click="showRolesModel('addChild', row)">添加子管理员</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-dialog :visible.sync="rolesModelVisible" :title="rolesModelTitle" :modal-append-to-body="false">
      <el-form ref="rolesForm" :model="rolesForm" :rules="rolesRules" label-width="100px">
        <el-form-item label="角色名" prop="name">
          <el-input v-model="rolesForm.name" placeholder="请输入角色名" />
        </el-form-item>
        <el-form-item label="角色标识" prop="field">
          <el-input v-model="rolesForm.field" placeholder="请输入角色标识" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="rolesForm.status" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" />
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-tree
            :data="rulesModelTable"
            :props="{ label: 'name' }"
            show-checkbox
            node-key="level"
            @check="getCheckedKeys"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="submitRolesForm('rolesForm')">提交</el-button>
          <el-button type="default" size="small" @click="resetRolesForm('rolesForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </v-dialog>
  </div>
</template>
<script>
import { rolesList } from '@/assets/data'
export default {
  data() {
    return {
      tableData: rolesList,
      rulesModelTable: this.$router.options.routes,
      rolesModelVisible: false,
      rolesModelTitle: '',
      rolesForm: {
        name: '',
        field: '',
        status: 1
      },
      rolesRules: {}
    }
  },
  watch: {
    rolesModelVisible(flag) {
      if (!flag) this.$refs.rolesForm.resetFields()
    }
  },
  methods: {
    showRolesModel(methodt, row) {
      this.rolesModelVisible = true
      this[methodt](row)
    },
    addRoles() {
      this.rolesModelTitle = `添加角色`
    },
    addChild(row) {
      this.rolesModelTitle = `【${row.name}】 添加子管理员`
    },
    editRoles(row) {
      this.rolesModelTitle = `编辑【${row.name}】`
      for (const key in this.rolesForm) {
        if (Object.prototype.hasOwnProperty.call(row, key)) {
          this.$nextTick(() => {
            this.rolesForm[key] = row[key]
          })
        } else {
          this.rolesForm.hidden = false
        }
      }
    },
    getCheckedKeys(le) {
      console.log(le)
    },
    submitRolesForm() {},
    resetRolesForm() {}
  }
}
</script>
<style lang="scss" scoped>
.header{
  display: flex;
  justify-content: flex-end;
}
</style>
