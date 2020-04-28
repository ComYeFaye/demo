<template>
  <div class='rankDeails'>
      <!-- 头部 -->
  <div class="top">
     <span @click="back" class="iconfont">&#xe610;</span>
     <span class="name">{{name}}</span>
    </div>
   
   <!-- 头像 -->
  <div class='avator'
  :style="{'background-image': `url(${avator})`}"
    ref='img' 
    >  
   <!-- 标题 --> 
        <div class="box">
            <div class="play"> 
                <span class="iconfont" >&#xe662;</span>
             <span class="text">随机播放全部</span>
            </div>
           </div>   
    <div class='shadow'> 
        
        </div> 
    </div>

    <!-- 歌曲列表 -->
    <div class="songlist" ref="wrapper">
       
            <div  class="content">
          <ul>
            <li v-for="(item,index) in list.slice (0,78)"
            :key='index'
            class="item"
            >
             <div class="text">{{index+1}}</div>
             <div class="content">
                <h2 class="name">{{item.data.albumname}}</h2>
                <p class="desc">{{item.data.singer[0].name}}-{{item.data.albumname}}</p>
                </div>
              </li>
          </ul>
      </div>
        </div>
  </div>
</template>

<script>
import BS from'better-scroll'
import {getRankSongList} from 'API/api.js'
export default {
    data(){
        return{
           list:[],
           name:'暂无数据',
           avator:''
        } 
    },
    methods:{
         back(){
            this.$router.go(-1)
        },
         initBS(){ 
            let img = this.$refs.img 
            let  imgH=img.clientHeight
             let wrapper = this.$refs.wrapper
            this.BS=new BS(wrapper,{probeType:3,click:true})
            this.BS.on('scroll',({y})=>{
           
            
             if(y>=0){
                   //滚动层向下拉动
                  let precent =1+(y/imgH)
                   img.style.transform=`scale(${precent})`
                   img.style.zIndex=1
             }else{
                 //到达顶部时候 图片的层级变高
                  if(Math.abs(y)>=imgH-40){
                      img.style.zIndex=1
                      img.style.padding='0%'
                      img.style.height='40px'
                  }else{
                      img.style.zIndex=-1
                      img.style.paddingTop='70%'
                      img.style.height=0
                  }
             }
           })
        }
    },
    created(){
        console.log(this.$route)
        let {topid}= this.$route.params

      //根据排行id 发起网络请求
      getRankSongList(topid).then((data)=>{
          console.log(data)
          this.list = data.songlist
          this.name = data.topinfo.ListName
          this.avator =`https://y.gtimg.cn/music/photo_new/T002R300x300M000${data.songlist[0].data.albummid}.jpg?
          max_age=2592000`
         this.$nextTick(()=>{
            this.initBS()
      })
     })
    }

}
</script>
<style lang="less" scoped>
@import '~style/index.less';
.rankDeails{
  position: fixed;
  top: 0px;
  bottom: 0px;
  background: #222;
  left:0px;
  right: 0px;
  // 头部
  .top{
    height: 40px;
    top:0;
    z-index: 3;
      
    .iconfont{
          display: block;
          position: absolute;
          top: -4px;
          padding: 10px;
          z-index: 40;
          font-size: 20px;
          color: #ffcd32
    }
    .name{
        color: #fff;
        font-size:@fs-l;
            position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    line-height: 40px;
        
    }
  }
   
  // 头像
  .avator{
    .w(375);
    padding-top: 70%;
    background-size:cover; 
    position: absolute;
    top: 0px;
    z-index: -1;
      
       .box{
   position: absolute;
    bottom: 20px;
    z-index: 50;
    width: 100%;
    .play{
            box-sizing: border-box;
    width: 135px;
    padding: 7px 0;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #ffcd32;
    color: #ffcd32;
    border-radius: 100px;
    font-size: 0;
      .iconfont{
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: 16px;
      }
      .text{
          display: inline-block;
          vertical-align: middle;
          font-size: 12px;
         
      }
       }
       }
    .shadow{
      position: absolute;
      top: 0;
      background: rgba(7,17,27,0.3);
      width: 100%;
      height: 100%;
      }
  }
  // 歌曲列表
  .songlist{
   position: fixed;
   background: #222;
   top:270px;
   bottom: 0px;
   left:0;
   right: 0;
   .content{
     padding: 10px 30px;
     background: #222;
     .item{
             display: flex;
            align-items: center;
            box-sizing: border-box;
            height: 64px;
            font-size: 14px;
            .text{
             color: @yellow;
             font-size: 18px
            }
         h2{
              color: #fff;   
              font-size: @fs-s;
         }
         p{
          color: rgba(255, 255, 255, 0.3);
         text-overflow: ellipsis;
         overflow: hidden;
         white-space: nowrap;
         margin-top: 4px;
    
         }
     }
   }
  }
}
</style>