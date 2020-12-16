<template>
  <div class="container">
  	<!-- <v-search>
  		
  	</v-search> -->
  	<v-table :options="tableOption">
			<template v-slot:gender="{ data }">
				{{ genders[data.gender] }}
			</template>
			<template v-slot:menus="{ data }">
				<el-tree
					:data="showTree(data.menus)"
					node-key="_id"
					:props="treeProps">
				</el-tree>
			</template>
			<template v-slot:role="{ data }">
				{{ data.role.name }}
			</template>
			<template v-slot:status="{ data }">
				<el-tag :type="isEnable[data.status].type">{{ isEnable[data.status].label }}</el-tag>
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
import { mapGetters, mapState } from 'vuex'
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
					{ label: '姓名', field: 'name' },
					{ label: '性别', slotName: 'gender' },
          { label: '手机号', field: 'phone' },
					{ label: '角色', slotName: 'role' },
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
				{ type: 'input', label: '姓名', field: 'name' },
        { type: 'radio', label: '性别', field: 'gender', option: [
					{ label: '男', value: 'male' },
					{ label: '女', value: 'woman' }
				] },
        { type: 'input', label: '手机号', field: 'phone' },
        { type: 'select', label: '角色', field: 'role', data: 'roles', props: {
					label: 'name',
					value: '_id'
				} },
				{ type: 'radio', label: '状态', field: 'status', option: [
					{ label: '启用', value: true },
					{ label: '禁用', value: false }
				]}
			],
			formData: {
				name: '',
        gender: 'male',
        phone: '',
        role: '',
        status: true
			},
			treeProps: {
				label: 'name'
			}
		}
	},
	computed: {
		...mapGetters(['addroutes']),
		...mapState({
			genders: state => state.global.genders
		})
	},
	mounted() {
		this.getTableList()
	},
	methods: {
		// 表格列表
		async getTableList() {
      const table = this.tableOption
      table.loading = true
      const result = await this.$http.get('/account')
      table.loading = false
      if (!result) return 
			const { data } = result.data
      table.tableList = data
    },
		// 添加
    handleAdd() {
    	this.curd = '/create'
    	this.title = '添加账号'
    	this.isShow = true
    },
		// 编辑
    handleEdit(rowData) {
    	this.curd = '/update'
    	this.title = '编辑账号'
			this.$nextTick(() => {
				this.formData = Object.assign({}, this.formData, rowData)
			})
    	this.isShow = true
    },
		// 删除
    handleDelete() {
    	this.curd = '/create'
    	this.title = '添加账号'
    	this.isShow = true
    },
		// 提交
		async submit() {
			const result = await this.$http.post(`/account${this.curd}`, this.formData)
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