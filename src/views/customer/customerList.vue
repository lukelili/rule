<template>
  <div class="container-table">
    <v-search :search-item="searchItem" :search-data="searchData" @handleSearch="getTableList" />
    <v-table :options="tableOptions">
      <template v-slot:operation="{ data }">
        <el-button type="success" size="mini" plain @click="btnDetails(data)">详情</el-button>
      </template>
    </v-table>
    <v-dialog ref="dialog" :visible.sync="visible" title="添加" @handleConfirm="addTableList">
      <v-form ref="form" :form-item="formItem" :form-data="formData" />
    </v-dialog>
  </div>
</template>
<script>
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
        pageSize: 10,
        pageNumber: 1
      },
      searchItem: [
        {
          type: 'select',
          label: '操作员',
          field: 'type',
          props: {
            label: 'label',
            value: 'value'
          },
          data: accountList
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
        tableList: [
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          },
          {
            orderId: '12454621',
            accountId: '5464646464654',
            type: '新贷',
            fullName: '李成儒',
            accountNumber: '15811483224'
          }
        ]
      },
      // 详情配置
      visible: false,
      formData: {
        orderId: '',
        accountId: '',
        type: '',
        fullName: '',
        phone: ''
      },
      formItem: [
        {
          type: 'input',
          label: '订单编号',
          field: 'orderId'
        },
        {
          type: 'input',
          label: '客户编号',
          field: 'accountId'
        },
        {
          type: 'select',
          label: '订单类型',
          field: 'type',
          data: [],
          props: {
            label: 'name',
            value: 'id'
          }
        },
        {
          type: 'input',
          label: '客户姓名',
          field: 'fullName'
        },
        {
          type: 'input',
          label: '客户账号',
          field: 'phone'
        }
      ]
    }
  },
  mounted() {
    console.log(Array.isArray(null))
    setTimeout(() => {
      this.formItem[2].data = [
        { name: '新贷', id: 0 },
        { name: '复贷', id: 1 }
      ]
    }, 4000)
  },
  methods: {
    getTableList() {
      console.log(this.searchData)
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
