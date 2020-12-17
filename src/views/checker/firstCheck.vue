<template>
  <div class="container">
    <div class="wrap" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup">
      <ul class="list" :style="{ transform: `translateX(${distaince.x}px)`}">
        <li class="item">1</li>
        <li class="item">2</li>
        <li class="item">3</li>
        <li class="item">4</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 鼠标按下的位置
      startPoint: {
        x: 0,
        y: 0
      },
      // 鼠标按下移动的位置
      distaince: {
        x: 0,
        y: 0
      },
      // 鼠标是否按下
      isDown: false,
      // 外框的宽度
      wrapWidth: 0,
      // 当前在哪一张
      now: 0,
      //当图片拖动超过整体宽度的比例时，跳转到下一张或者上一张
      proportion: 0.3
    }
  },
  methods: {
    // 鼠标按下
    mousedown(e) {
      this.startPoint.x = e.layerX - this.distaince.x
      this.startPoint.y = e.layerY - this.distaince.y
      this.isDown = true
    },
    // 鼠标移动
    mousemove(e) {
      if (!this.isDown) return
      this.distaince.x = e.layerX - this.startPoint.x
      this.distaince.y = e.layerY - this.startPoint.y
    },
    // 鼠标抬起
    mouseup() {
      const wrap = document.querySelector('.wrap')
      this.wrapWidth = wrap.offsetWidth
      if (Math.abs(this.distaince.x) > this.wrapWidth * this.proportion) {
        console.log(this.distaince.x / Math.abs(this.distaince.x))
      }
      this.isDown = false
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap{
  width: 300px;
  height: 150px;
  margin: 0 auto;
  position: relative;
  border: 1px solid #ccc;
  overflow: hidden;
  .list{
    position: absolute;
    display: flex;
    .item{
      width: 300px;
      height: 150px;
      text-align: center;
      line-height: 150px;
      font-size: 48px;
      font-weight: bold;
      color: #fff;
    }
    .item:nth-child(1){
      background-color: pink;
    }
    .item:nth-child(2){
      background-color: yellow;
    }
    .item:nth-child(3){
      background-color: blue;
    }
    .item:nth-child(4){
      background-color: green;
    }
  }
}
</style>
