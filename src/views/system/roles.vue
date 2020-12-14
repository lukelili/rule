<template>
  <div class="container">
  	<!-- <v-search>
  		
  	</v-search> -->
  	<v-table :options="tableOption">
  		<template v-slot:status="{ data }">
  			<el-tag :type="isEnable[data.status].type">{{ isEnable[data.status].label }}</el-tag>
  		</template>
  		<template v-slot:operation="{ data }">
  			<el-button type="primary" size="mini">编辑</el-button>
  			<el-button type="danger" size="mini">删除</el-button>
  		</template>
  	</v-table>
  	<v-dialog :visible.sync="isShow" :title="title">
  		<v-form :form-item="formItem" :formData="formData">
  			<template v-slot:menus>
  				<el-tree
					  :data="routes"
					  show-checkbox
					  node-key="_id"
					  :default-expanded-keys="[2, 3]"
					  :default-checked-keys="[5]"
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
						event: () => this.showAdd()
					}
				],
				tHead: [
					{ label: '角色名称', field: 'name' },
					{ label: '菜单栏', field: 'menus' },
					{ label: '状态', slotName: 'status' },
					{ label: '操作', slotName: 'operation' }
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
			formData: {},
			treeProps: {
				label: 'name'
			}
		}
	},
	computed: {
		...mapGetters(['routes'])
	},
	mounted() {
		this.getTableList()
	},
	methods: {
		async getTableList() {
      const table = this.tableOption
      table.loading = true
      const result = await this.$http.get('/role')
      table.loading = false
      if (!result) return 
      const { data } = result.data
    	console.log(data)
      table.tableList = data
    },
    showAdd() {
    	this.curd = '/create'
    	this.title = '添加角色'
    	this.isShow = true
    }
	}
}
</script>