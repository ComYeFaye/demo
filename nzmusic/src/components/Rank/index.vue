<template>
  <div class='rank'>
   <div class="wrapper">
       <div class="content"> 
           <ul class="list">
               <li v-for='(item,index) in rankList' :key='index'
                 @click="goRank(item.id)"
               >
              <div class="left">
                  <img v-lazy="item.picUrl" alt="">
              </div>
                  <div class="right">
                       <p class="song">
                           <span>1</span>
                            <span>{{item.songList[0].songname}} - {{item.songList[0].singername}}</span>
                        </p>
                      <p class="song">
                            <span>2</span>
                            <span>{{item.songList[1].songname}} - {{item.songList[1].singername}}</span>
                        </p>
                       <p class="song">
                           <span>3</span>
                          <span>{{item.songList[2].songname}} - {{item.songList[2].singername}}</span>
                        </p>
                  </div>
               </li>
           </ul>
       </div>
   </div>
    <!-- 嵌套路由 -->
  
    <transition
     enter-active-class="animated zoomInRight"
     leave-active-class="animated zoomOutRight"
   > 
    <router-view></router-view>

   </transition>

  </div>
</template>
<script>
import BS from'better-scroll'
import {getRankData} from 'API/api.js'
export default {
    data(){
        return{
            rankList:[]
        }
    },
    methods:{
        goRank(id){
          
            this.$router.push(`/Rank/${id}`)
        },
        initBS(){
            this.BS=new BS('.wrapper',{click:true})
        }
    },
    created(){
           getRankData().then((res)=>{
               console.log(res)
            this.rankList = res.data.topList
            this.$nextTick(()=>{
            this.initBS()
      })
    })
       
    }
}
</script>


<style lang="less" scoped>
@import '~style/index.less';
.rank{
  .wrapper{
     position: fixed;
     top: 88px;
     bottom: 0;
     left: 0;
     right: 0;
      overflow: hidden;
    
      .content{
        .w(375);
        .list{
            li{
                .w(375);
                height: 120px;
                padding: 0px 20px 20px 20px;
                box-sizing: border-box;
                display: flex;
                .left{
                      width: 100px;
                    height: 100px;
                    img{
                        width: 100px;
                        height: 100px;
                    }
                }
                .right{
                    justify-content: center;
                    padding: 0 20px;
                    height: 100px;
                    background: #333;
                    color: hsla(0,0%,100%,.3);
                    font-size: @fs-xs;
                    flex-direction: column;
                    display: flex;
                    flex: 1;
                    overflow: hidden;
                    .song{
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        line-height: 26px;
                    }
                }
            }
        }
      }
  }
}  
</style>