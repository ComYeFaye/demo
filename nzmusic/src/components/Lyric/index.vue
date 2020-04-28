<template>
  <div class="lyric">
      {{txt}}
  </div>
</template>
<script>
import {Base64} from 'js-base64'
import Lyric from 'lyric-parser'
import { mapGetters } from 'vuex';
import {getLyricBymid} from 'API/api.js'
export default {
    data(){
        return{
           txt:'歌词加载中'
        }
    },
    props:['play','seekTime'],
  computed: {
      ...mapGetters(['currentSong'])
  },
 methods:{
     getLyric(songmid){
            getLyricBymid(songmid).then((res)=>{
                //解析歌词
               
                let decode =Base64.decode(res.lyric)
                // 暂停之前播放的视频
               if(this.lyricObj){
                   this.lyricObj.stop()
             }
                this.lyricObj =new Lyric(decode,({txt})=>{
                          console.log(txt)
                          this.txt=txt
                })
                //解析完直接播放
                this.lyricObj.play()
                 
            })
     }     
  },
  watch:{
      seekTime(newTime,oldTime){
           if(!this.lyricObj) return false
           this.lyricObj.seek(newTime*1000)
      },
      play(newPlay,oldPlay){
          if(!this.lyricObj) return false
          console.log('歌词播放转台',newPlay)
          this.lyricObj.togglePlay()
      },
         currentSong(newSong,oldSong){
          let {songmid} = newSong
           this.getLyric(songmid)
             }
     },
 mounted(){
     //歌曲组件挂载 第一首播放
      let {songmid} =this.currentSong
      this.getLyric(songmid)
 }
};
</script>
<style lang="less" scoped>
@import "~style/index.less";
.lyric{
    font-size: @fs-s;
    text-align: center;
    padding-bottom: 20px;
}
</style>