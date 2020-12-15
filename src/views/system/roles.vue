<template>
  <div class="container">
  	<!-- <v-search>
  		
  	</v-search> -->
  	<v-table :options="tableOption">
  		<template v-slot:status="{ data }">
  			<el-tag :type="isEnable[data.status].type">{{ isEnable[data.status].label }}</el-tag>
  		</template>
			<template v-slot:menus="{ data }">
				<el-tree
					:data="showTree(data.menus)"
					node-key="_id"
					:props="treeProps">
				</el-tree>
			</template>
  		<template v-slot:operation="{ data }">
  			<el-button type="primary" size="mini" @click="handleEdit(data)">编辑</el-button>
  			<el-button type="danger" size="mini" @click="handleDelete(data)">删除</el-button>
  		</template>
  	</v-table>
  	<v-dialog :visible.sync="isShow" :title="title">
  		<v-form :form-item="formItem" :formData="formData" :visible.sync="isShow" @submit="submit">
  			<template v-slot:menus>
  				<el-tree
					  :data="addroutes"
					  show-checkbox
					  node-key="_id"
						@check="handleTreeCheck"
						:default-checked-keys="formData.menus"
						:props="treeProps">
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
		return {
			tableOption: {
				operates: [
					{
						label: '添加',
						event: () => this.handleAdd()
					}
				],
				tHead: [
					{ label: '角色名称', field: 'name' },
					{ label: '菜单栏', slotName: 'menus' },
					{ label: '状态', slotName: 'status' },
					{ label: '操作', slotName: 'operation', width: '160px' }
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
				{ type: 'input', label: '角色名称', field: 'name' },
				{
					type: 'slot',
					label: '菜单栏',
					slotName: 'menus'
				},
				{ type: 'radio', label: '状态', field: 'status', option: [
					{ label: '启用', value: true },
					{ label: '禁用', value: false }
				]}
			],
			formData: {
				name: '',
				menus: [],
				status: true
			},
			treeProps: {
				label: 'name'
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
      const result = await this.$http.get('/role')
      table.loading = false
      if (!result) return 
			const { data } = result.data
      table.tableList = data
    },
		// 添加
    handleAdd() {
    	this.curd = '/create'
    	this.title = '添加角色'
			this.formData.menus = []
    	this.isShow = true
    },
		// 编辑
    handleEdit(rowData) {
    	this.curd = '/update'
    	this.title = '编辑角色'
			this.$nextTick(() => {
				this.formData = Object.assign({}, this.formData, rowData)
				this.formData.menus = rowData.menus.map(item => item._id)
			})
    	this.isShow = true
    },
		// 删除
    handleDelete() {
    	this.curd = '/create'
    	this.title = '添加角色'
    	this.isShow = true
    },
		// 提交
		async submit() {
			const result = await this.$http.post(`/role${this.curd}`, this.formData)
			if (!result) return
			this.isShow = false
			this.getTableList()
		},
		// 获取选中的菜单
		handleTreeCheck(nodes, keys) {
			this.formData.menus = keys.checkedKeys
		},
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