<template>
  <div class="container-table">
    <v-search :search-item="searchItem" :search-data="searchData" @handleSearch="getTableList" />
    <v-table :options="tableOptions" :param="searchData" @pageChange="getTableList">
      <template v-slot:operation="{ data }">
        <el-button type="success" size="mini" plain @click="btnDetails(data)">详情</el-button>
      </template>
    </v-table>
    <v-dialog ref="dialog" :visible.sync="visible" title="添加">
      <v-form ref="form" :form-item="formItem" :form-data="formData" :visible.sync="visible" @submit="submitRequest" />
    </v-dialog>
  </div>
</template>
<script>
import customer from '@a/customer'
export default {
  data() {
    const accountList = [
      {
        label: '超级管理员',
        value: 'admin',
        id: 1
      },
      {
        label: '初审管理员',
        value: 'check_leader',
        id: 2
      },
      {
        label: '催收管理员',
        value: 'bill_leader',
        id: 3
      }
    ]
    return {
      // 搜索配置
      searchData: {
        type: '',
        accountId: '',
        checkeTime: '',
        year: '',
        pageNumber: 1,
        pageSize: 10
      },
      searchItem: [
        {
          type: 'select',
          label: '操作员',
          field: 'type',
          data: accountList
        },
        {
          type: 'select',
          label: '订单类型',
          field: 'orderType',
          data: 'orderType'
        },
        {
          type: 'input',
          label: '客户编号',
          field: 'accountId'
        },
        {
          type: 'datePicker',
          label: '审核时间',
          showLabel: true,
          field: 'checkeTime'
        },
        {
          type: 'datePicker',
          label: '年度注册数',
          field: 'year',
          dateType: 'year'
        }
      ],
      // 表格配置
      tableOptions: {
        name: '客户列表',
        tHead: [
          { label: '订单编号', field: 'orderId' },
          { label: '客户编号', field: 'accountId' },
          { label: '类型', field: 'type' },
          { label: '客户姓名', field: 'fullName' },
          { label: '客户账号', field: 'accountNumber' },
          { label: '操作', slotName: 'operation', align: 'center' }
        ],
        operates: [
          {
            label: '添加',
            type: 'default',
            icon: 'el-icon-circle-plus-outline',
            event: () => {
              this.visible = true
            }
          },
          {
            label: '导出',
            type: 'default',
            icon: 'el-icon-download',
            event: () => {
              console.log('ss')
            }
          },
          {
            label: '删除',
            type: 'default',
            icon: 'el-icon-delete',
            event: () => {
              this.visible = true
            }
          }
        ],
        tableList: [],
        total: 0,
        loading: false
      },
      // 详情配置
      visible: false,
      formData: {
        orderId: '',
        accountId: '',
        type: null,
        fullName: '',
        phone: ''
      },
      formItem: [
        {
          type: 'input',
          label: '订单编号',
          field: 'orderId',
          required: true
        },
        {
          type: 'input',
          label: '客户编号',
          field: 'accountId',
          required: true
        },
        {
          type: 'select',
          label: '订单类型',
          field: 'type',
          required: true,
          data: [
            { label: '信贷', value: 'new' },
            { label: '复贷', value: 'old' }
          ]
        },
        {
          type: 'input',
          label: '客户姓名',
          field: 'fullName',
          required: true
        },
        {
          type: 'input',
          label: '客户账号',
          field: 'phone',
          required: true
        }
      ]
    }
  },
  mounted() {
    this.getTableList()
  },
  methods: {
    getTableList() {
      const tableOptions = this.tableOptions
      tableOptions.loading = true
      customer.list().then(res => {
        tableOptions.loading = false
        const { code, message, data } = res.data
        if (code === 0) {
          tableOptions.total = data.total
          tableOptions.tableList = data.list
        } else {
          this.$message.error(message)
        }
      })
    },
    submitRequest() {
      console.log('提交成功')
      setTimeout(() => {
        this.$store.commit('SET_LOADING', false)
      }, 2000)
    },
    btnDetails(data) {
      this.visible = true
      // this.$router.push({ path: '/customer/customerDetails' })
    },
    // 添加表格列表
    addTableList() {
      this.$refs.form.submit()
      setTimeout(() => {
        this.$refs.dialog.confirmLoding = false
      }, 1000)
    }
  }
}
</script>
