<template>
  <div class="container-table">
    <v-search :search-item="searchItem" :search-data="searchData" @handleSearch="getTableList" />
    <v-table :options="tableOptions" />
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
      searchData: {
        type: '',
        accountId: '',
        checkStarTime: '',
        checkEndTime: '',
        regStartTime: '',
        regEndTime: '',
        pageSize: 10,
        pageNumber: 1
      },
      searchItem: [
        {
          type: 'select',
          label: '操作员',
          field: 'type',
          props: {
            label: 'name',
            value: 'key'
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
          split: ['checkStarTime', 'checkEndTime']
        },
        {
          type: 'datePicker',
          label: '注册时间',
          split: ['regStartTime', 'regEndTime']
        }
      ],
      tableOptions: {
        tHead: [
          { label: '订单编号', field: 'orderId' },
          { label: '客户编号', field: 'accountId' },
          { label: '类型', field: 'type' },
          { label: '客户姓名', field: 'fullName' },
          { label: '客户账号', field: 'accountNumber' }
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
      }
    }
  },
  mounted() {
  },
  methods: {
    getTableList() {
      console.log(this.searchData)
    },
    handlerDetails() {
      this.$router.push({ path: '/customer/customerDetails' })
    }
  }
}
</script>
