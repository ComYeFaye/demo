<template>
  <div class="search">
      <div class="search-box-wrapper">
         <div class="search-box">
            <span class="iconfont">&#xe643;</span>
            <input placeholder="搜索歌曲 歌手" class="box" style="border:none;">
         </div>
      </div>

      <div class="shortcut-wrapper">
       <div class="shortcut">
      <div data-v-2e5f61c4="" style="transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1); transition-duration: 0ms; transform: translate(0px, 0px) scale(1) translateZ(0px);">
          <div class="hot-key">
              <h1 class="title">热门搜索</h1>
              <ul>
                  <li v-for='(item,index) in searchList.slice(0,10)'  
                  :key='index' 
                  class="item"
                 >{{item.k}}</li>
              </ul>
          </div>
      </div>
       </div>
      </div>
  </div>
</template>

<script>
import { getPopular } from "API/api.js";
export default {
  data() {
    return {
      searchList: []
    };
  },
  created() {
    getPopular().then(res => {
      console.log(res);
      this.searchList = res.data.hotkey;
    });
  }
};
</script>

<style lang="less" scoped>
@import "~style/index.less";
.search {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-weight: 400;
  vertical-align: baseline;
  .search-box-wrapper{
      margin: 20px;
      .search-box{
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          width: 100%;
          padding: 0 6px;
          height: 40px;
          background: #333;
          border-radius: 6px;
          .iconfont{
              font-size: 24px;
               color: #222;
          }
         .box{
             -webkit-box-flex: 1;
             -ms-flex: 1;
             flex: 1;
             margin: 0 5px;
             line-height: 18px;
             background: #333;
             color: #fff;
             font-size: 14px;
             outline: 0;
         }
      }
  }
  .shortcut-wrapper{
        margin: 20px;
      position: fixed;
      top: 178px;
      bottom: 0;
      width: 100%;
      .shortcut{
          height: 100%;
          overflow: hidden;
          .title{
             margin-bottom: 20px;
             font-size: 14px;
             color: hsla(0,0%,100%,.5);
          }
          .item{
                  display: inline-block;
                  padding: 5px 10px;
                  margin: 0 20px 10px 0;
                  border-radius: 6px;
                  background: #333;
                  font-size: 14px;
                  color: hsla(0,0%,100%,.3);
          }
      }
  }
}
</style>