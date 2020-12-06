<template>
  <div class="container">
    <v-search :search-item="searchItem" :search-data="searchData" @handleSearch="getMenuList" />
    <v-table :options="tableOption">
      <template v-slot:status="{ data }">
        <el-switch v-model="data.status" :active-value="true" :inactive-value="false" active-color="#13ce66" inactive-color="#ff4949" />
      </template>
      <template v-slot:operation="{ data }">
        <el-button size="mini" @click="handleAddChildMenu(data)">添加子集</el-button>
        <el-button size="mini" type="primary" @click="handleEditMenu(data)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDeleteMenu(data)">删除</el-button>
      </template>
    </v-table>
    <v-dialog :title="title" :visible.sync="visible">
      <v-form :form-item="formItem" :form-data="formData" :visible.sync="visible" @submit="request" />
    </v-dialog>
  </div>
</template>
<script>
import { MenuList, OperationMenu } from '@/api/system'
export default {
  data() {
    return {
      // 搜索
      searchItem: [
        {
          type: 'input',
          field: 'name',
          label: '菜单名'
        }
      ],
      searchData: {
        name: ''
      },
      // 表格配置
      tableOption: {
        tHead: [
          { label: '菜单', field: 'name' },
          { label: '路由', field: 'path' },
          { label: '路径', field: 'component' },
          { label: '顺序', field: 'sort' },
          { label: '状态', field: 'status', slotName: 'status' },
          { label: '操作', field: 'operation', slotName: 'operation' }
        ],
        loading: false,
        tableList: [],
        operates: [
          {
            label: '添加目录',
            type: 'success',
            icon: 'el-icon-circle-plus-outline',
            event: () => {
              this.type = 'create'
              this.title = '添加目录'
              this.visible = true
              this.formData.level = 0
              delete this.formData._id
              delete this.formData.pid
            }
          }
        ]
      },
      // 添加 删除 弹窗配置
      type: '',
      title: '',
      visible: false,
      formItem: [
        { type: 'input', field: 'name', label: '菜单' },
        { type: 'input', field: 'path', label: '路由', required: true },
        { type: 'input', field: 'component', label: '路径', required: true },
        { type: 'input', field: 'sort', label: '顺序', rule: 'number' },
        { type: 'radio', field: 'status', label: '状态', option: [
          { label: '显示', value: true },
          { label: '隐藏', value: false }
        ] }
      ],
      formData: {
        name: '',
        path: '/',
        component: '@/views/',
        sort: '',
        status: true,
        hidden: false
      },
      // 当前激活行的数据
      activeRowData: {}
    }
  },
  mounted() {
    this.getMenuList()
  },
  methods: {
    // 获取菜单
    async getMenuList() {
      const tableOption = this.tableOption
      try {
        tableOption.loading = true
        const res = await MenuList(this.searchData)
        tableOption.loading = false
        const { code, data, mesaage } = res.data
        if (code !== 200) {
          this.$message.error(mesaage)
          return
        }
        const levelData = data.filter(item => item.level === 0)
        const childData = data.filter(item => item.pid)
        levelData.forEach(item => {
          item.children = []
          childData.find(child => {
            if (child.pid === item._id) {
              item.children.push(child)
            }
          })
        })
        tableOption.tableList = levelData
        console.log(tableOption.tableList)
      } catch (err) {
        console.log(err)
      }
    },
    // 编辑目录
    handleEditMenu(data) {
      this.type = 'update'
      this.title = '编辑菜单'
      this.visible = true
      this.activeRowData = data
      this.$nextTick(() => {
        this.$deepMatch(data, this.formData)
        this.formData._id = data._id
        delete this.formData.pid
      })
    },
    // 添加子集菜单
    handleAddChildMenu(data) {
      this.type = 'create'
      this.title = '添加子集'
      this.visible = true
      delete this.formData.level
      this.formData.pid = data._id
    },
    // 删除菜单
    async handleDeleteMenu(data) {
      this.type = 'delete'
      const res = await OperationMenu(this.type, { _id: data._id })
      const { code, message } = res.data
      if (code !== 200) {
        this.$message.error(message)
        return
      }
      this.$message.success('删除成功！')
      this.getMenuList()
    },
    async request() {
      const res = await OperationMenu(this.type, this.formData)
      this.$store.commit('SET_LOADING', false)
      const { code, message } = res.data
      if (code !== 200) {
        this.$message.error(message)
        return
      }
      this.visible = false
      this.$message.success('提交成功')
      this.getMenuList()
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
