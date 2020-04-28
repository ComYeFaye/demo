<template>
    <div class='header'>
    <!-- 如果图片在public目录直接用根路径 -->
     <img src="/default.cbc0e020.png" alt="">
    <span>Chicken Music</span>
    <span class="iconfont">&#xe60a;</span>
    </div>
</template>

<script>
export default {
    
}
</script>
<style lang="less" scoped>
@import '../../style/index.less';
.header{
    color: @yellow;
    font-size: @fs-l;
    display: flex;
    justify-content: center;
    align-items: center;
    .w(375);
    height: 44px;
    img{
        width: 30px;
        height: 32px;
        margin: 5px;
        border-radius:63px;
    }
    .iconfont{
      position: absolute;
      right: 20px;
      font-size: @fs-xl;
      font-weight: 700;
    }
}
</style>