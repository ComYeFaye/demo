import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    songList: [], //要播放歌曲列表
    fullScreen: true, // 大屏小屏显示
    currentIndex:-1 , //当前播放那首歌
    loop:0
  },
  mutations: {
      //控制大小屏切换
    changeScreen(state, screenState) {
      state.fullScreen = screenState
    },
    //添加播放列表
    addSongList(state,params){
        //params 要播放的歌曲列表
        state.songList =params
    },
    changeCurrendIndex(state,index){
        //修改当前播放那首歌
        state.currentIndex =index
    },
    //下一曲
    nextCurrendIndex(state){
        //下一曲歌曲临界判断
        let count=state.songList.length
        if(state.currentIndex<count-1){
            state.currentIndex++
        }else{
            state.currentIndex=0
        }
    },
    //上一曲
    prevCurrendIndex(state){
        //上一曲歌曲临界判断
        let count=state.songList.length
        if(state.currentIndex>0){
            state.currentIndex--
        }else{
            state.currentIndex=count-1
        }
     },
     changeLoop(state){
         //修改循环模式
        if(state.loop==3){
            state.loop=0
        }else{
            state.loop++
        }
     }
  },
  getters:{
    currentSong(state){
      // 当前正在播放的那首歌
      return state.songList[state.currentIndex]||null
    }
  }
})

export default store
