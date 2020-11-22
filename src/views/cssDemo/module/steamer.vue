<template>
  <div class="steamer">
    <div class="lid"></div>
    <div class="pot"></div>
  </div>
</template>
<style lang="scss" scoped>
.steamer{
  font-size: 10px;
  width: 30em;
  height: 30em;
  border-radius: 50%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  // 锅盖
  .lid{
    width: 17em;
    height: 6em;
    background-color: gold;
    border-radius: 6em 6em 0 0;
    border-right: 1.5em solid goldenrod;
    border-bottom: 1.2em solid goldenrod;
    position: relative;
    top: 0.5em;
    z-index: 1;
    // 盖提纽
    &::before{
      content: '';
      position: absolute;
      width: 4em;
      height: 4em;
      border-radius: 50%;
      background-color: tomato;
      top: -2.5em;
      left: 7em;
    }
    // 盖高光
    &::after{
      content: '';
      width: 7em;
      height: 7em;
      position: absolute;
      top: 0.6em;
      left: 2.5em;
      transform: rotate(40deg);
      border: 0.6em solid;
      border-color: transparent transparent transparent white;
      border-radius: 50%;
    }
  }
  // 锅体
  .pot{
    width: 16em;
    height: 12em;
    background-color: darkslateblue;
    border-radius: 0.5em 0.5em 6.5em 6.5em;
    border-right: 1.5em solid midnightblue;
    position: relative;
    // 锅把
    &::before{
      content: '';
      width: 27em;
      height: 2.5em;
      position: absolute;
      left: calc((16em + 1.5em - 27em)/2);
      top: 2em;
      z-index: -1;
      background-color: tomato;
      border-radius: 1.25rem;
    }
    // 锅高光
    &::after{
      content: '';
      width: 8em;
      height: 8em;
      position: absolute;
      top: 1em;
      left: 2em;
      border: 0.6em solid;
      border-color: transparent transparent white transparent;
      border-radius: 50%;
      transform: rotate(30deg);
    }
  }

}
</style>
