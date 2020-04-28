<template>
  <div class="player" v-if="songList.length">

    <div v-if="fullScreen" class="big">
        <!-- 头部 -->
        <div  class='top'> 
            <span @click="changeScreen(false)" class="iconfont">&#xe62f;</span>
            <h1 class="title" >{{currentSong.songname}}</h1> 
        <!-- 歌手 -->
        <p class="name">{{currentSong.singer[0].name}}</p> 
       </div>

        <!-- 中间部分 -->
        <div class="middle">
            <!-- 背景 -->
            <div class="bg">
                <img :src="currentSong.albumUrl" alt="">
                </div>
            <img  :class="cd"  :src="currentSong.albumUrl" alt="">
            
        </div>
            <!-- 播放器 -->
         <audio
         @ended="ended"
         @canplay="canplay"
         @timeupdate="timeupdate"
         :src="currentSong.audioUrl" 
         ref="audio"></audio>

        <!-- 播放 -->
        <div class="operators">
            <!-- 歌词 -->
            <div>
                <Lyric :seekTime='seekTime' :play='play' ></Lyric>
            </div>
            <!-- 进度条 -->
            <div class="pro">  
                <MyProgress 
                :startTime= 'startTime'
                :endTime= 'endTime'
                @seek='seek'
                ></MyProgress>
            </div>
         
            <!-- 播放器按钮 -->
            <div class="icon"> 
           <span @click="changeLoop">   
        <span class="iconfont" v-if="loop === 0">&#xe672;</span> 
        <span class="iconfont" v-if="loop === 1">&#xe66c;</span> 
        <span class="iconfont" v-if="loop === 2">&#xe611;</span> 
        <span class="iconfont" v-if="loop === 3">&#xe621;</span> 
          </span>  

        <span class="iconfont" @click="prve()">&#xe670;</span>
         <span @click="togglePlay()">
        <span class="iconfont" v-if="play==false">&#xe662;</span>
         <span class="iconfont" v-if="play==true">&#xe606;</span> 
        </span>
        <span class="iconfont" @click="next()">&#xe674;</span>
        <span class="iconfont">&#xe613;</span>
        
        </div>
       </div>
    </div>
     
    <div v-else class="small" @click="changeScreen(true)">
        <div class="icon">
            <div class="imgWrapper">
             <img :src="currentSong.albumUrl" alt="">
             </div>
        </div>
         <div class="text">
             <h2 class="name">{{currentSong.songname}}</h2>
             <p class="desc">{{currentSong.singer[0].name}}</p>
         </div>
         <div class="pic">
             <div class="con"> 
                 <div class="progress-circle">
                     <span class="iconfont" >&#xe606;</span>
                     </div>
              </div>
            <div class="con"> 
                 <div class="progress-circle">
                   <span class="iconfont" >&#xe60f;</span> 
                     </div>
              </div>          
         </div>
         </div>
  </div>
</template>

<script>
import Lyric from 'components/Lyric'
import MyProgress from 'components/Progress'
import {mapState, mapMutations,mapGetters} from 'vuex'
export default {
    components:{MyProgress,Lyric},
    data(){
        return{
            startTime:0,
            endTime:0,
            // loops:['不循环','单曲循环','列表循环','随机播放'],
            play:false,
           seekTime:0
        }
    },
    computed:{
    ...mapState(['songList' , 'fullScreen','loop']),
    ...mapGetters(['currentSong']),
    cd(){
        return this.play?'cd':'cd paused'
    }
    },
    methods:{
    ...mapMutations(['changeScreen','nextCurrendIndex','prevCurrendIndex','changeCurrendIndex','changeLoop']),
    togglePlay(){
        this.play=!this.play
    },
    timeupdate(e){
      //随着播放更新时间
      this.startTime = e.target.currentTime
    },
    canplay(){
        //歌曲可以播放
        this.audio=this.$refs.audio
         this.audio.play()
         this.play=true
        // console.log('可以准备播放')
        //获取歌曲总时长
        this.endTime = this.audio.duration
    },
    seek(s){
            if(!this.audio){
                return false
            }
            //更改播放时间
            this.audio.currentTime = s
            //更改歌词播放时间
            this.seekTime = s
    },
    ended(){
        this.play=false
        switch (this.loop) {
            case 1:
                //单曲循环
                this.play=true
                this.audio.play()
                break;
             case 2:
                //下一曲播放
               this.nextCurrendIndex()
                break;
              case 3: 
                //随机播放
                let count=this.songList.length
                let index=parseInt(Math.random()*count)
                this.changeCurrendIndex(index)
            default:
                break;
        }
    },
    prve(){
      //上一曲
     this.prevCurrendIndex()
    },
    next(){
    //下一曲
    this.nextCurrendIndex()
    }
    },
    watch:{
        play(newValue,oldValue){
            if(!this.audio) return false
            //点击按钮 还是循环
            if(newValue){
                this.audio.play()
            }else{
                this.audio.pause()
            }
        },
    }
}
</script>


<style lang="less" scoped>
@import "~style/index.less";
.player{
  color: #fff;
  .big{
    position: fixed;
    top:0px;
    bottom: 0px;
    left:0;
    right:0;
    background: #222;
    .top{
       position: relative;
      margin-bottom: 25px;
    .iconfont{
    position: absolute;
    top: 7px;
    left: 6px;
    z-index: 50;
    color: @yellow;
    font-size:22px;
    font-weight: 700;
    }
    .title{
        width: 70%;
    margin: 0 auto;
    line-height: 40px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size:  @fs-l;
    color: #fff;
    }
    .name{
    line-height: 20px;
    text-align: center;
    font-size: @fs-s;
    color: #fff
  }
    }
    .middle{
     .w(375);
     .h(300);
    white-space: nowrap;
    text-align: center;
      img{
          width: 80%;
          border-radius:50%;
       border: 10px solid hsla(0,0%,100%,.1);
         
      }
    }
    .bg{
      position: absolute;
      z-index: -9;
      top: 0px;
      width: 100%;
      height: 100%;
      filter: blur(65px); //高斯模糊
      img{
         width: 100%;
         height: 100%;
      }
    }
    .operators{
    position: absolute;
    bottom: 50px;
    width: 100%;
    .pro{
        padding-bottom: 40px;
    }
    .icon{
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    .iconfont{
        padding: 0px 20px; 
        color: @yellow;
        font-size: 35px;
        
    }
    }
    }
      & .cd{
        animation: rotate 10s linear infinite;
      }
      & .paused{
        animation-play-state: paused;
      }
    
  }
  .small{
    position: fixed;
    .w(375);
    bottom: 0px;
    height: 60px;
    background: #333333;
    .icon{
        -webkit-box-flex: 0;
    -ms-flex: 0 0 40px;
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 8px 10px 0 20px;
    .imgWrapper{
        .w(375);
        height: 100%;
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    }
    .text{
    position: relative;
    display: flex;
    flex: 1;
    line-height: 20px;
    .name{
    position: absolute;
    margin-bottom: 2px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: @fs-s;
    color: #fff;
    left: 70px;
    bottom: 20px;
    }
    .desc{  
    position: absolute;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: @fs-xs;
    color: hsla(0,0%,100%,.3);
    left: 70px;
    bottom: 0px;
    }
    }
    .pic{
    display: flex;
    -ms-flex-align: center;
    align-items: center;
       .con{
     -webkit-box-flex: 0;
    -ms-flex: 0 0 30px;
    flex: 0 0 30px;
    width: 30px;
    padding: 0 10px;
    .progress-circle{
        position: relative;
        .iconfont{
            position: absolute;
             left: 267px;
            bottom: 0px;
            color: @yellow;
            font-size: 32px;
        }
    }
       }
    }
  }
  @keyframes rotate {
    0% {
     transform: rotate(0deg)
    }
    100%{
      transform: rotate(360deg)
    }
  }
}
</style>