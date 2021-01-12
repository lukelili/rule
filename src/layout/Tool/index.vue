<template>
  <div class="right-bottom-tool">
    <ul class="tools">
      <li class="item" @click="showChatBox"><i class="iconfont iconkefu" /></li>
    </ul>
    <div class="customer-service" v-if="isShowChatBox" :class="{ 'transform': isShowChatBox }">
      <div class="aside"></div>
      <div class="main">
        <div class="history"></div>
        <div class="enter">
          <el-input type="textarea" :rows="4" :autosize="{ minRows: 4, maxRows: 4 }" placeholder="请输入消息" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tool',
  data() {
    return {
      isShowChatBox: false
    }
  },
  methods: {
    showChatBox() {
      this.isShowChatBox = !this.isShowChatBox
    }
  }
}
</script>
<style lang="scss" scoped>
.right-bottom-tool{
  position: fixed;
  right: 15px;
  bottom: 15px;
  z-index: 2000;
  .tools{
    border: 1px solid #ccc;
    background-color: #fff;
    .item{
      padding: 10px;
      i{
        font-size: 40px;
      }
      
    }
  }
  .customer-service{
    width: 800px;
    height: 600px;
    display: flex;
    position: fixed;
    z-index: 2000;
    left: 0;
    top: 0;
    transform: scale(.2);
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    .aside{
      width: 200px;
      height: 100%;
      background-color: #eee;
    }
    .main{
      flex: 1;
      display: flex;
      flex-direction: column;
      .history{
        flex: 1
      }
      .enter{
        
      }
    }
  }
  .transform{
    position: fixed;
    left: 50%;
    top: 100px;
    transition: all .4s ease;
    transform: scale(1);
    transform: translateX(-400px);
  }
}
</style>