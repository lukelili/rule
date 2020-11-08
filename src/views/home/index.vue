<template>
  <div class="home">
    <div class="tab-menu">
      <ul class="tab-wrap">
        <li v-for="item in tabs" :key="item.id" class="tab-item">
          <span>{{ item.label }}</span>
        </li>
      </ul>
      <div class="operator">
        <el-button type="default">返回</el-button>
        <el-button type="default">刷新</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabs: [
        {
          id: 1,
          label: '基本信息'
        },
        {
          id: 2,
          label: '工作信息'
        },
        {
          id: 3,
          label: '活体检测'
        },
        {
          id: 4,
          label: 'OCR识别信息'
        },
        {
          id: 5,
          label: '银行卡列表'
        },
        {
          id: 6,
          label: '紧急联系人'
        },
        {
          id: 7,
          label: '通讯录'
        },
        {
          id: 8,
          label: '审批记录'
        },
        {
          id: 9,
          label: '贷款记录'
        },
        {
          id: 10,
          label: '修改记录'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.tab-menu{
  position: relative;
  .tab-wrap{
    display: flex;
    padding-right: 142px;
    overflow: auto;
    background-color: #eee;
    .tab-item{
      padding: 15px 20px;
    }
  }
  .operator{
    position: absolute;
    right: 10px;
    top: 8px;
  }
}
</style>
