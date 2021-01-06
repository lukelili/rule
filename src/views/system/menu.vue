<template>
  <div class="container">
  	<!-- <v-search>
  	</v-search> -->
  	<v-table :options="tableOption">
			<template v-slot:icon="{ data }">
				<i :class="data.icon" style="font-size: 16px"></i>
			</template>
  		<template v-slot:status="{ data }">
  			<el-tag :type="isEnable[data.status].type">{{ isEnable[data.status].label }}</el-tag>
  		</template>
  		<template v-slot:operation="{ data }">
  			<el-button type="default" size="mini" @click="handleChildAdd(data)">添加子集</el-button>
  			<el-button type="primary" size="mini" @click="handleEdit(data)">编辑</el-button>
  			<el-button type="danger" size="mini" @click="handleDelete(data)">删除</el-button>
  		</template>
  	</v-table>
  	<v-dialog :visible.sync="isShow" :title="title">
  		<v-form :form-item="formItem" :formData="formData" :visible.sync="isShow" @submit="submit"></v-form>
  	</v-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
	data() {
		return {
			tableOption: {
				operates: [
					{
						label: '添加目录',
						event: () => this.handleAdd()
					}
				],
				tHead: [
					{ label: '菜单名称', field: 'name' },
					{ label: '图标', slotName: 'icon' },
	        { label: '访问地址', field: 'path' },
	        { label: '页面路径', field: 'filePath' },
	        { label: '排序', field: 'sort' },
	        { label: '状态', slotName: 'status' },
	        { label: '操作', slotName: 'operation', width: '240px' },
				],
				tableList: [],
				loading: false
			},
			isEnable: {
				true: { label: '启用', type: 'success' },
				false: { label: '禁用', type: 'danger' },
			},
			curd: '',
			title: '',
			isShow: false,
			formItem: [
				{ type: 'input', label: '菜单名称', field: 'name' },
				{ type: 'input', label: '图标', field: 'icon' },
				{ type: 'input', label: '访问地址', field: 'path' },
				{ type: 'input', label: '文件路径', field: 'filePath', disabled: false },
				{ type: 'input', label: '顺序', field: 'sort' },
				{ type: 'radio', label: '状态', field: 'status', option: [
					{ label: '启用', value: true },
					{ label: '禁用', value: false }
				]}
			],
			formData: {
				name: '',
        path: '/',
        filePath: '',
        sort: '',
        status: true,
        children: []
			}
		}
	},
	computed: {
		...mapGetters(['addroutes'])
	},
	async mounted() {
		this.getTableList()
	},
	methods: {
		// 表格列表
		async getTableList() {
			this.tableOption.tableList = this.addroutes
    },
    // 提交
    async submit() {
      const result = await this.$http.post(`/rest/${this.curd}/menu`, this.formData)
      if (!result) return
      this.isShow = false
      await this.$store.dispatch('menu/roleMenus')
			this.getTableList()
    },
    // 添加目录
    handleAdd() {
    	this.curd = 'create'
    	this.title = '添加目录'
      delete this.formData._id
      delete this.formData.pid
      this.isShow = true
    },
    // 添加子集
    handleChildAdd(rowData) {
    	this.curd = 'create'
      this.title = `【${rowData.name}】添加子集`
      this.formData.pid = rowData._id
      this.isShow = true
    },
    // 编辑
    handleEdit(rowData) {
    	this.curd = 'update'
    	this.title = '编辑目录'
    	delete this.formData.pid
    	this.formData._id = rowData._id
      this.formData = Object.assign({}, this.formData, rowData)
      this.isShow = true
    },
    // 删除
    async handleDelete(rowData) {
    	const res = await this.$http.post('/rest/delete/menu',{ _id: rowData._id })
      if (!res) return
      this.getTableList()
    }
	}
}
</script>