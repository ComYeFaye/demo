<template>
  <div class="recommend">
    <!-- 滚动区域 -->
    <div class="wrapper" ref='wrapper'>
      <div class="content">
        <!-- 轮播图 -->
        <banner :banners="list"></banner>
        <!-- 歌曲列表 -->
        <div class="title">热门歌曲推荐</div>
        <ul class="list">
          <li v-for="(item,index) in recommendList" :key="index">
            <div class="left">
              <!-- <img :src="item.imgurl" alt /> -->
              <img v-lazy="item.imgurl" alt="">
            </div>
            <div class="right">
              <p class="name">{{item.creator.name}}</p>
              <p class="album">{{item.dissname}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "../Banner";
import {getBannerDate, getListDate} from '../../API/api'
import BS from "better-scroll";
export default {
  components: { Banner },
  data() {
    return {
      list: [],
      recommendList: []
    };
  },
  methods: {
    initBS() {
        let wrapper= this.$refs.wrapper
      new BS(wrapper, {});
    }
  },
  mounted() {
  getBannerDate().then((res)=>(
           this.list=res.data.slider        
  ))
 getListDate().then((res)=>(
        this.recommendList = res.data.list
        ))
    this.initBS();
  }
};
</script>


<style lang="less" scoped>
@import "../../style/index.less";
.recommend {
  .wrapper {
    position: fixed;
    top: 88px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    overflow: hidden;
    .content {
      .w(375);
      .title {
        .w(375);
        height: 65px;
        text-align: center;
        line-height: 65px;
        font-size: @fs-s;
        color: @yellow;
      }
      .list {
        li {
          .w(375);
          height: 82px;
          box-sizing: border-box;
          padding: 0px 20px 20px 20px;
          display: flex;
          .left {
            width: 82px;
            height: 60px;
            img {
              width: 60px;
              height: 60px;
            }
          }
          .right {
            color: #fff;
            font-size: @fs-s;
            .name {
              margin-bottom: 10px;
            }
            .album {
              color: rgba(255, 255, 255, 0.3);
            }
          }
        }
      }
    }
  }
}
</style>
