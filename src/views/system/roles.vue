<template>
  <div class="container">
  	<v-search :search-item="searchItem" :search-data="searchData" @handleSearch="getTableList" />
  	<v-table :options="tableOption" :search-data="searchData" @refresh="getTableList" @changePage="getTableList">
  		<template v-slot:status="{ data }">
  			<el-tag :type="isEnable[data.status].type">{{ isEnable[data.status].label }}</el-tag>
  		</template>
			<template v-slot:menus="{ data }">
				<el-tree
					:data="showTree(data.menus)"
					node-key="_id"
					:props="{ label: 'name' }">
				</el-tree>
			</template>
  		<template v-slot:operation="{ data }">
  			<el-button type="primary" size="mini" @click="handleEdit(data)">编辑</el-button>
  			<el-button type="danger" size="mini" @click="handleDelete(data)">删除</el-button>
  		</template>
  	</v-table>
  	<v-dialog :visible.sync="visible" :title="title">
  		<v-form :form-item="formItem" :formData="formData" :visible.sync="visible" @submit="submit">
  			<template v-slot:menus>
  				<el-tree
						ref="tree"
					  :data="addroutes"
					  show-checkbox
					  node-key="_id"
						@check="handleTreeCheck"
						:default-checked-keys="formData.menus"
						:props="{ label: 'name' }">
					</el-tree>
  			</template>
  		</v-form>
  	</v-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
	data() {
		const status = [
			{ label: '启用', value: true },
			{ label: '禁用', value: false }
		]
		return {
			// 搜索配置
			searchItem: [
				{
					type: 'select',
					label: '状态',
					field: 'status',
					data: status
				}
			],
			searchData: {
				status: '',
				pageSize: 5,
				pageNum: 1
			},
			// 表格配置
			tableOption: {
				operates: [
					{
						label: '添加',
						event: () => this.handleAdd()
					}
				],
				tHead: [
					{ label: '角色名称', field: 'name' },
					{ label: '菜单栏', field: 'menus', slotName: 'menus' },
					{ label: '状态', field: 'status', slotName: 'status' },
					{ label: '操作', field: 'operation', slotName: 'operation', width: '160px' }
				],
				tableList: [],
				loading: false,
				total: 0
			},
			isEnable: {
				true: { label: '启用', type: 'success' },
				false: { label: '禁用', type: 'danger' },
			},
			// 添加/编辑/删除
			curd: '',
			title: '',
			visible: false,
			formItem: [
				{ type: 'input', label: '角色名称', field: 'name' },
				{
					type: 'slot',
					label: '菜单栏',
					slotName: 'menus'
				},
				{ type: 'radio', label: '状态', field: 'status', option: status}
			],
			formData: {
				name: '',
				menus: [],
				status: true
			}
		}
	},
	computed: {
		...mapGetters(['addroutes'])
	},
	mounted() {
		this.getTableList()
	},
	methods: {
		// 表格列表
		async getTableList() {
      const table = this.tableOption
      table.loading = true
      const result = await this.$http.get(`/rest/query/role?${this.$qs.stringify(this.searchData)}`)
			table.loading = false
      if (!result) return
			const { data, total } = result.data.data
			table.tableList = data
			table.total = total
			// this.$store.dispatch('global/getData', { key: 'roles', api: '/role/filter' })
		},
		// 添加
    handleAdd() {
    	this.curd = 'create'
    	this.title = '添加角色'
			this.setCheckedKeys([])
    	this.visible = true
    },
		// 编辑
    handleEdit(rowData) {
    	this.curd = 'update'
    	this.title = '编辑角色'
			this.$nextTick(() => {
				this.formData = Object.assign({}, this.formData, rowData)
				this.formData.menus = rowData.menus.map(item => item._id)
				this.setCheckedKeys(this.formData.menus)
			})
    	this.visible = true
    },
		// 删除
    async handleDelete(rowData) {
    	const result = await this.$http.post(`/rest/delete/role`, { _id: rowData._id })
			if (!result) return
			this.getTableList()
    },
		// 提交
		async submit() {
			const formData = JSON.parse(JSON.stringify(this.formData))
			formData.menus = formData.menus.concat(this.$refs.tree.getHalfCheckedKeys())
			const result = await this.$http.post(`/rest/${this.curd}/role`, formData)
			if (!result) return
			this.visible = false
			this.getTableList()
		},
		// 获取选中的菜单
		handleTreeCheck(nodes, keys) {
			this.formData.menus = keys.checkedKeys
		},
		setCheckedKeys(checks) {
			this.$refs.tree && this.$refs.tree.setCheckedKeys(checks)
		},
		// 将一维数据转换成级联数据
		showTree(data) {
			const arr = []
			data.forEach(item => {
				item.children = []
				data.forEach(child => {
					if (item._id === child.pid) {
						item.children.push(child)
					}
				})
				arr.push(item)
			})
			return arr.filter(item => !item.pid)
		}
	}
}
</script>