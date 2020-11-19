<template>
  <el-scrollbar ref="scrollBar" style="height: 100%">
    <div class="container-full">
      <div class="banner">banner</div>
      <div id="tab-placeholder" class="tab-placeholder">
        <div class="tab-menu" :class="{ 'tab-fixed': isFixed }">
          <ul class="tab-wrap">
            <li v-for="item in tabs" :key="item.id" class="tab-item" :class="{ 'actived': actived === item.component }" @click="handleTabPosition(item)">
              <span>{{ item.label }}</span>
            </li>
          </ul>
        <!-- <div class="operator">
          <el-button type="default">返回</el-button>
          <el-button type="default">刷新</el-button>
        </div> -->
        </div>
      </div>
      <div class="container">
        <template v-for="item in tabs">
          <components :is="item.component" :id="item.component" :key="item.id" :title="item.label" />
        </template>
      </div>
    </div>
  </el-scrollbar>
</template>
<script>
import tab from '@c/tab/'
import baseInfo from './components/baseInfo.vue'
import workInfo from './components/workInfo.vue'
import liveTest from './components/liveTest.vue'
import ocrIdentify from './components/ocrIdentify.vue'
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
      ]
    }
  },
  computed: {
    scrollTop() {
      return this.$store.state.global.scrollTop
    }
  },
  watch: {
    scrollTop(top) {
      this.tabFixed()
    }
  },
  mounted() {
    const scrollEl = this.$refs.scrollBar.wrap
    scrollEl.addEventListener('scroll', () => {
      const top = scrollEl.scrollTop
      this.$store.commit('SET_SCROLL_TOP', top)
    })
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
