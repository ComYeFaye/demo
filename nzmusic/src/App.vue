<template>
  <div id="app">
  <Header></Header>
   <Tab></Tab>
     <router-view></router-view>
     <!-- 播放器组件 -->
    <Player></Player>
  </div>
</template>

<script>
  import Player from 'components/Player'
 import Header from './components/Header'
  import Tab from './components/Tab'
export default {
    components:{Header,Tab,Player}
}
</script>

<style lang="less" scoped>
@import './style/index.less';
#app{
  background: @black2;
  .w(375);
  height: 100vh;
}
</style>
