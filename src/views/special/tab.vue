<template>
  <div class="container-full">
    <div class="tabs-container">
      <div class="prev" @click="handlePrev"><i class="el-icon-arrow-left"></i></div>
      <div class="tabs-wrapper" id="tabs-wrapper">
        <ul class="tabs" id="tabs" @click="handleTabsEvent" :style="{transform: `translate(${trans}px)`}">
          <li class="tab-item active">基础信息</li>
          <li class="tab-item">ocr识别信息</li>
          <li class="tab-item">风控信息</li>
          <li class="tab-item">工作信息</li>
          <li class="tab-item">紧急联系人</li>
          <li class="tab-item">银行账户信息</li>
          <li class="tab-item">个人资料</li>
          <li class="tab-item">补充信息</li>
          <li class="tab-item">贷款记录</li>
          <li class="tab-item">通讯里</li>
          <li class="tab-item">审批记录</li>
          <li class="tab-item">客户标签</li>
          <li class="tab-item">催收记录</li>
          <i class="line" :style="{transform: `translate(${move}px)`}"></i>
        </ul>
      </div>
      <div class="next" @click="handleNext"><i class="el-icon-arrow-right"></i></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      move: 0,
      trans: -120,
      x: 0
    }
  },
  methods: {
    handleTabsEvent(e) {
      const node = e.target
      this.active(node)
      // move
      const wrapper = document.querySelector('#tabs-wrapper')
      const tabs = document.querySelector('#tabs')
      console.log('wrapper', wrapper.offsetLeft)
      console.log('tabs', tabs.offsetLeft)
    },
    active(node) {
      const tabItems = document.querySelectorAll('.tab-item')
      tabItems.forEach(node => node.classList.remove('active'))
      node.classList.add('active')
      this.move = node.offsetLeft
    },
    handlePrev() {
      console.log('上一页')
    },
    handleNext() {
      console.log('下一页')
    }
  }
}
</script>
<style lang="scss" scoped>
  .tabs-container{
    width: 1200px;
    height: 45px;
    margin: 0 auto;
    display: flex;
    border-radius: 4px;
    background-color:#6200ea;
    border-color: #6200ea;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    .prev, .next{
      width: 45px;
      text-align: center;
      line-height: 45px;
      flex-shrink: 0;
      cursor: pointer;
      background-color: rgba(0,0,0,.1);
      i{
        font-weight: 600;
        color: #fff;
      }
    }
    .tabs-wrapper{
      flex: 1;
      display: flex;
      overflow: hidden;
      position: relative;
      .tabs{
        position: relative;
        display: flex;
        transition: .2s;
        .tab-item{
          flex-shrink: 0;
          width: 120px;
          height: 45px;
          position: relative;
          text-align: center;
          line-height: 45px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          color: hsla(0,0%,100%,.6);
          &::before{
            content: '';
            opacity: .8;
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            top: 0;
            transition: .3s cubic-bezier(.25,.8,.5,1);
          }
          &:hover{
            &::before{
              background-color: hsla(0,0%,100%,.2);
            }
          }
        }
        .active{
          color: #fff;
        }
        .line{
          width: 120px;
          height: 2px;
          transition: .2s;
          position: absolute;
          left: 0;
          bottom: 0;
          background-color: #fff;
        }
      }
    }
  }
</style>