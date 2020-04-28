<template>
  <div class='detail'>
    <!-- 头部导航 -->
    <div class="top">
     <span @click="back" class="iconfont">&#xe610;</span>
     <span class="name">{{name}}</span>
    </div>
 
    <!-- 头像 -->    
    <div class="avator"
    :style="{'background-image':`url(${avator})`}"
    ref="img"
    >  
   <!-- 标题 --> 
      
    <div class='shadow'>
          <div class="box">
            <div class="play" @click="random"> 
                <span class="iconfont" >&#xe662;</span>
             <span class="text">随机播放全部</span>
            </div>
            
           </div>   
         </div> 
    </div>
    <!-- 歌曲列表 -->
    <div class="songlist" ref="wrapper">
      <div  class="content">
          <ul>
              <li v-for="(item,index) in list" 
              :key='(index)'
              @click='openPlay(index)'
              >
                  <h2>{{item.songname}}</h2>
                  <p>{{name}}.{{item.albumname}}</p>
              </li>
          </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BS from'better-scroll'
import {getSongByMid,getSongUrlByMid} from 'API/api.js'
import { mapMutations,mapState } from 'vuex'
export default {
       ...mapState(['song']),

    data(){
        return{
            list:[],
            name:'暂无数据',
            avator:'',
            Lately:[],
        }
    },
    methods:{
        ...mapMutations(['addSongList','changeCurrendIndex','changeScreen','addSong']),
        back(){
            this.$router.go(-1)
        },
        openPlay(index){
            //点击歌li 显示播放器
            this.addSongList(this.list)
            var lt = JSON.parse(localStorage.getItem('play'));
  if(lt){
    lt.push(this.list[index])
    localStorage.setItem('play',JSON.stringify(lt) )
  }else{
   this.Lately.push(this.list[index])
      localStorage.setItem('play',JSON.stringify(this.Lately) )
  }
            //确定点击的是哪首歌
            this.changeCurrendIndex(index)
            //点击屏幕变大
            this.changeScreen(true)
        },
       random(){
           this.addSongList(this.list)
             let count  =this.list.length
             let index =parseInt(Math.random()*count)
          this.changeCurrendIndex(index)
          this.changeScreen(true)
       },
        initBS(){
              //获取图片的元素和高度
               let img=this.$refs.img
               let imgH=img.clientHeight
            let wrapper =this.$refs.wrapper
            this.bs=new BS(wrapper,{probeType:3,click:true})
           this.bs.on('scroll',({y})=>{
          
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
        },
        handleList(list){
            let result=[]
            let mids=[]
            result=list.map((item,index)=>{
            let{albummid,albumname,singer,songmid,songname} =item.musicData
            let albumUrl=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`
            mids.push(songmid)
              return {albummid,albumname,singer,songmid,songname,albumUrl}
             })    
            return {result,mids}
        }
    },
      async created(){
        let {singermid} =this.$route.params
        //根据歌手mid 发起网络请求
        let data =await  getSongByMid(singermid)
        let {result,mids} = this.handleList(data.data.list)

        //通过接口 将mids 歌曲的媒体id换成音乐地址 之后将其数据进行合并
        let {urls}= await getSongUrlByMid(mids)
        let finalData=[]
        for (let index = 0; index < result.length; index++) {
           result[index].audioUrl=urls[index]
           if(urls[index]){
               //将不能播放的歌曲去除
               finalData.push(result[index])
           }
        }
        // console.log(result)
        this.list=finalData
        this.name=data.data.singer_name
        this.avator=`https://y.gtimg.cn/music/photo_new/T001R300x300M000${singermid}.jpg?max_age=2592000`
             this.$nextTick(()=>{
             this.initBS()
             })
    }
}


</script>
<style lang="less" scoped>
@import '../../style/index.less';
 .detail{
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
     li{
         margin: 20px;
         h2{
             color: #fff;   
              font-size: @fs-m;
         }
         p{
          color: rgba(255, 255, 255, 0.3);
          font-size: @fs-s;
          padding-top: 5px;
         }
     }
   }
  }
}
</style>