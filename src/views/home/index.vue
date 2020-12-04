<template>
  <vuescroll>
    <div class="banner">banner</div>
    <v-btn elevation="2">click Me</v-btn>
    <v-card>
      <v-tabs
        background-color="deep-purple accent-4"
        center-active
        dark
      >
        <v-tab>One</v-tab>
        <v-tab>Two</v-tab>
        <v-tab>Three</v-tab>
        <v-tab>Four</v-tab>
        <v-tab>Five</v-tab>
        <v-tab>Six</v-tab>
        <v-tab>Seven</v-tab>
        <v-tab>Eight</v-tab>
        <v-tab>Nine</v-tab>
        <v-tab>Ten</v-tab>
        <v-tab>Eleven</v-tab>
        <v-tab>Twelve</v-tab>
        <v-tab>Thirteen</v-tab>
        <v-tab>Fourteen</v-tab>
        <v-tab>Fifteen</v-tab>
        <v-tab>Sixteen</v-tab>
        <v-tab>Seventeen</v-tab>
        <v-tab>Eighteen</v-tab>
        <v-tab>Nineteen</v-tab>
        <v-tab>Twenty</v-tab>
      </v-tabs>
    </v-card>
    <div id="tab-placeholder" class="tab-placeholder">
      <div class="tab-menu" :class="{ 'tab-fixed': isFixed }">
        <ul class="tab-wrap">
          <li v-for="item in tabs" :key="item.id" class="tab-item" :class="{ 'actived': actived === item.component }" @click="handleTabPosition(item)">
            <span>{{ item.label }}</span>
          </li>
        </ul>
        <div class="operator">
          <el-button type="default">返回</el-button>
          <el-button type="default">刷新</el-button>
        </div>
      </div>
      <div class="container">
        <template v-for="item in tabs">
          <components :is="item.component" :id="item.component" :key="item.id" :title="item.label" />
        </template>
      </div>
    </div>
  </vuescroll>
</template>
<script>
import tab from '@c/tab/'
import baseInfo from './components/baseInfo.vue'
import workInfo from './components/workInfo.vue'
import liveTest from './components/liveTest.vue'
import ocrIdentify from './components/ocrIdentify.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  components: {
    tab,
    baseInfo,
    workInfo,
    liveTest,
    ocrIdentify
  },
  data() {
    return {
      actived: 'baseInfo',
      isFixed: false,
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
      ],
      scrollTop: 0
    }
  },
  mounted() {
    setItem('key', '1111')
    console.log(getItem('key'))
    // const scrollEl = this.$refs.scrollBar.wrap
    // scrollEl.addEventListener('scroll', () => {
    //   this.scrollTop = scrollEl.scrollTop
    //   this.tabFixed()
    // })
    this.tabFixed()
    this.tabActived()
  },
  methods: {
    // 选项卡事件
    handleTabPosition(curTab) {
      const scrollWrap = document.querySelector('.el-scrollbar__wrap')
      this.tabActived()
      scrollWrap.scrollTop = curTab.offsetTop
    },
    // 吸顶
    tabFixed() {
      const tabPlaceholder = document.querySelector('#tab-placeholder')
      if (!tabPlaceholder) return
      const tabOffsetTop = tabPlaceholder.offsetTop
      this.isFixed = this.scrollTop > tabOffsetTop
      this.tabActived()
    },
    // 选项卡高亮
    tabActived() {
      const tabs = this.tabs
      const tabH = document.querySelector('#tab-placeholder').clientHeight
      tabs.forEach(item => {
        const nodes = document.querySelector(`#${item.component}`)
        if (!nodes) return
        nodes.style = 'margin-bottom: 15px;'
        const curTop = nodes.offsetTop
        this.$set(item, 'offsetTop', curTop - (tabH + 15))
        if (this.scrollTop >= (curTop - (tabH + 15))) this.actived = item.component
      })
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
  text-shadow: 1px 1px 1px #000;
}
.tab-placeholder{
  height: 44px;
  .tab-menu{
    width: 100%;
    position: relative;
    .tab-wrap{
      display: flex;
      padding-right: 142px;
      overflow: auto;
      background-color: #f90;
      .tab-item{
        padding: 15px 20px;
        transition: .2s;
        font-size: 14px;
        white-space: nowrap;
        font-weight: bold;
        cursor: pointer;
        &:hover{
          background-color: rgba(0,0,0,.2);
          color: #fff;
        }
      }
      .actived{
        background-color: rgba(0,0,0,.2);
        color: #fff;
      }
    }
    .operator{
      position: absolute;
      right: 10px;
      top: 8px;
    }
  }
  .tab-fixed{
    position: fixed;
    top: 45px;
  }
}

</style>
