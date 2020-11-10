<template>
  <div class="container-full">
    <div class="banner">banner</div>
    <div class="tab-menu">
      <ul class="tab-wrap">
        <li v-for="item in tabs" :key="item.id" class="tab-item">
          <span>{{ item.label }}</span>
        </li>
      </ul>
      <!-- <div class="operator">
          <el-button type="default">返回</el-button>
          <el-button type="default">刷新</el-button>
        </div> -->
    </div>
    <div class="container">
      <template v-for="item in tabs">
        <components :is="item.component" :key="item.id" :title="item.label" />
      </template>
    </div>
  </div>
</template>
<script>
import baseInfo from './components/baseInfo.vue'
import workInfo from './components/workInfo.vue'
import liveTest from './components/liveTest.vue'
import ocrIdentify from './components/ocrIdentify.vue'
export default {
  components: {
    baseInfo,
    workInfo,
    liveTest,
    ocrIdentify
  },
  data() {
    return {
      tabs: [
        {
          id: 1,
          label: '基本信息',
          component: 'baseInfo'
        },
        {
          id: 2,
          label: '工作信息',
          component: 'workInfo'
        },
        {
          id: 3,
          label: '活体检测',
          component: 'liveTest'
        },
        {
          id: 4,
          label: 'OCR识别信息',
          component: 'ocrIdentify'
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
.banner{
  height: 500px;
  text-align: center;
  line-height: 500px;
  font-size: 80px;
  font-weight: bold;
  background-color: seagreen;
  color: #fff;
}
.tab-menu{
  position: relative;
  .tab-wrap{
    display: flex;
    padding-right: 142px;
    overflow: auto;
    background-color: #eee;
    .tab-item{
      padding: 15px 20px;
      cursor: pointer;
      transition: .2s;
      white-space: nowrap;
      &:hover{
        background-color: rgba(0,0,0,.2);
      }
    }
  }
  .operator{
    position: absolute;
    right: 10px;
    top: 8px;
  }
}
</style>
