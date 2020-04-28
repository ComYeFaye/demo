<template>
  <div class="banner">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in banners" :key="index">
          <img :src="item.picUrl" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  props: {
    banners: { type: Array, default: [] }
  },
  methods: {
    initBanner() {
      new Swiper(".swiper-container", {
        //播放速度
        loop: true,
        //自动播放时间
        autoplay: true,
        //播放速度
        speed: 1000, 
        // 这样，即使我们滑动之后， 定时器也不会被清除
        autoplayDisableOnInteraction: false,
      });
    }
  },
  watch: {
    banners() {
      //banners 改变网络请求数据ok
      this.$nextTick(() => {
        this.initBanner();
      });
    }
  }
  // mounted(){
  //
  // }
};
</script>
<style lang="less" scoped>
@import "../../style/index.less";
@import "~swiper/css/swiper.min.css";
.swiper-container {
  .w(375);
  .h(150);
  img {
    .w(375);
    .h(150);
  }
}
</style>