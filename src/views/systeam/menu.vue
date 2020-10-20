<template>
  <div class="container">
    <div class="header">
      <el-button type="primary" size="small" @click="showAddMenuModel('addDir')">添加一级目录</el-button>
    </div>
    <el-table
      :data="tableData"
      row-key="level"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="菜单名" prop="name" />
      <el-table-column label="访问地址" prop="path" align="center" />
      <el-table-column label="启用状态" prop="status" align="center">
        <template slot-scope="{ row }">
          <el-switch v-model="row.status" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" />
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="sort" align="center">
        <template v-if="!row.hiddenSort" slot-scope="{ row }">
          <el-input-number v-model="row.sort" size="small" :controls="false" controls-position="right" :min="1" :max="10" @change="handleSortChange" />
        </template>
      </el-table-column>
      <el-table-column label="是否显示" prop="status" align="center">
        <template slot-scope="{ row }">
          {{ !row.hidden ? '显示' : '隐藏' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="left" width="280px">
        <template slot-scope="{ row }">
          <el-button size="mini" @click="showAddMenuModel('addChild', row)">添加子菜单</el-button>
          <el-button size="mini" type="primary" @click="showAddMenuModel('edit', row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="menuModelVisible" :title="menuModelTitle">
      <el-form ref="menuForm" :model="menuForm" :rules="menuRules" label-width="100px">
        <el-form-item label="菜单名" prop="name">
          <el-input v-model="menuForm.name" placeholder="请输入菜单名" />
        </el-form-item>
        <el-form-item label="访问地址" prop="path">
          <el-input v-model="menuForm.path" placeholder="请输入访问地址" />
        </el-form-item>
        <el-form-item label="启用状态" prop="status">
          <el-switch v-model="menuForm.status" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="menuForm.sort" size="small" :controls="false" controls-position="right" :min="1" :max="10" @change="handleSortChange" />
        </el-form-item>
        <el-form-item label="是否显示" prop="hidden">
          <el-radio-group v-model="menuForm.hidden">
            <el-radio :label="false">显示</el-radio>
            <el-radio :label="true">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="isShowBtnRules" label="按钮权限">
          <el-checkbox-group v-model="menuForm.btnRules">
            <template v-for="item in btnRules">
              <el-checkbox :key="item.key" :label="item.key" name="type">{{ item.name }}</el-checkbox>
            </template>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="submitMenuForm('menuForm')">提交</el-button>
          <el-button type="default" size="small" @click="resetMenuForm('menuForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getInfo } from '@/api/system'
import { btnRules } from '@/assets/data'
export default {
  data() {
    return {
      menuModelTitle: '添加菜单',
      menuModelVisible: false,
      btnRules: btnRules,
      isShowBtnRules: false,
      tableData: this.$router.options.routes,
      menuForm: {
        name: '',
        path: '',
        status: 1,
        sort: '',
        hidden: false,
        btnRules: []
      },
      menuRules: {
        name: [{ required: true }],
        path: [{ required: true }]
      }
    }
  },
  watch: {
    menuModelVisible(flag) {
      if (!flag) this.$refs.menuForm.resetFields()
    }
  },
  mounted() {
    this.initRoutes(this.tableData)
    getInfo().then(res => {
      console.log(res)
    })
  },
  methods: {
    showAddMenuModel(methodt, row) {
      this.menuModelVisible = true
      this[methodt](row)
    },
    // 添加一级目录
    addDir() {
      this.menuModelTitle = `添加一级目录`
    },
    // 添加子级目录
    addChild(row) {
      this.isShowRuleBtn(row)
      this.menuModelTitle = `【${row.name}】添加子级目录`
    },
    // 编辑
    edit(row) {
      this.isShowRuleBtn(row)
      this.menuModelTitle = `【${row.name}】编辑目录`
      for (const key in this.menuForm) {
        if (Object.prototype.hasOwnProperty.call(row, key)) {
          this.$nextTick(() => {
            this.menuForm[key] = row[key]
          })
        } else {
          this.menuForm.hidden = false
        }
      }
    },
    // 提交
    submitMenuForm(form) {
      this.$refs[form].validate(valid => {
        console.log(this.menuForm)
      })
    },
    // 重置
    resetMenuForm(form) {
      this.$refs[form].resetFields()
    },
    // 排序
    handleSortChange() {
      console.log('排序改变')
    },
    initRoutes(routes) {
      // 子集长度若为1的话 隐藏掉排序选项
      routes.forEach((item, index) => {
        if (item.children && Object.prototype.toString.call(item.children) === '[object Array]') {
          if (item.children.length === 1) item.children[0].hiddenSort = true
          this.initRoutes(item.children)
        }
      })
    },
    isShowRuleBtn(row) {
      this.isShowBtnRules = row.level.split('-').length > 1
    }
  }
}
</script>
<style lang="scss" scoped>
.header{
  display: flex;
  justify-content: flex-end;
}
</style>
