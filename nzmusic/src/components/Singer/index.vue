<template>
  <div class="singers">
   <div class="wrapper" ref='singerWrapper'>
    <div class="content">
      <ul>
          <li v-for='(item,index) in singers' 
          :key='index'
          :ref="item.Findex"
          >
              <!-- 每一组的首字母 -->
              <h3>{{item.Findex}}</h3>
              <!-- 首字母的歌手信息 -->
              <ol>
                <li v-for='(sItem,sIndex) in item.list' 
                :key='sIndex'
                @click='goDetail(sItem.Fsinger_mid)'
                >
                    <img v-lazy='sItem.avator' alt=''>
                    <span>{{sItem.Fsinger_name}}</span>
                  </li>
              </ol>
          </li>
      </ul>
    </div>
   </div>
   <!-- 快速列表 -->
   <div class="quicklist">
       <ul
          @touchstart='touchStart'
          @touchmove='touchMove'
          @touchend='touchEnd'
        >
           <li v-for="(item,index) in quickData" 
           :key='index'
            @click='quickJump(item)'
           :class='selFindex==item?"sel":""'>
           {{item}}
           </li>
       </ul>
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
import { getSingersData } from "API/api.js"
import {nomalData} from "./index.js"
export default {
   data(){
     return{
         singers:[],
         selFindex:'hot',//选中下标
     }
   },
    
  methods: {
      goDetail(Fsinger_mid){
          this.$router.push(`/singer/${Fsinger_mid}`)
      },
      //移动事件
      touchStart(e){
          let y=e.touches[0].pageY
          //获取按下的格子下标
          let startCount=parseInt((y-140)/18)
          this.touch.y=y
          this.touch.startCount=startCount
        // console.log('按下',y,startCount)
      } ,
       touchMove(e){
        let moveY=e.touches[0].pageY
        let moveDis=moveY-this.touch.y//计算移动距离
        let count =parseInt(moveDis/18)//获取移动过的格子树
        // console.log('移动',moveDis)
        let moveIndex=this.touch.startCount+count//获取下标
        //防止超出边界
        if(moveIndex<0||moveIndex>this.quickData.length-1){
            return false
        }
        let moveFindex=this.quickData[moveIndex]
        this.quickJump(moveFindex)
      } ,
       touchEnd(){
        // console.log('抬起')
      } ,
      quickJump(item){
         //点击每一项后 触发事件需要知道点到谁
         //根据字母获取固定元素
         let dom =this.$refs[item][0]
         //用bs内部的方法直接跳转固定元素
         this.BS.scrollToElement(dom)
        //  console.log('点到我了',item,dom)
      },
    initBS(){
        let wrapper =this.$refs.singerWrapper
        this.BS=new BS(wrapper,{probeType:3,click:true})
        //获取距离数组
        let distance=[]
        for (const key in this.$refs){
            if(key!=='singerWrapper'){
                distance.push(this.$refs[key][0].offsetTop)
            }
        }
        //监听滚动
        this.BS.on('scroll',(pos)=>{
            //取绝对值坐标
            let y=Math.abs(pos.y)
           
            //判断每一次滚动距离在什么范围内
            let scrollIndex = 0//滚动所在区域的下标
        for (let index = 0; index < distance.length; index++) {
               if(y>=distance[index]&&y<distance[index+1]){
                     scrollIndex=index
               }else if(y>=distance[distance.length-1]){
                   //边界判断
                   scrollIndex= distance.length-1
               }
            }
            //根据下标换字母
            let scrollFindex =this.quickData[scrollIndex]
            //字母跟着图片动
            this.selFindex=scrollFindex
         
        })
    }
        
  },
   computed:{
      quickData(){
         //快速入口数据和歌手数据
         let result =this.singers.map((item)=>{
             return item.Findex
         })
         return result
      }
  },

  created() {
      //初始化数据
      this.touch={y:0}

      //处理数据
    getSingersData().then((res)=>{
     let data =nomalData(res.data.list)
     this.singers=data
     //请求到数据 并更新页面之后再初始化
      this.$nextTick(()=>{
          this.initBS()
      })
      })
},
}
</script>

<style lang="less" scoped>
@import "~style/index.less";
.singers{
  position: fixed;
  top:88px;
  bottom: 0px;
  left:0px;
  right: 0px;
  .quicklist{
    position: absolute;
    right: 10px;
    top:40px;
    width: 20px;
    background: rgba(0,0,0,.3);
    font-Size:@fs-xs;
    padding: 20px 0 20px;
    color:rgba(255,255,255,.5);
    border-radius:10px; 
    text-align: center;
    ul{
      li{
        width: 20px;
        height: 18px;
      }
      .sel{
        color: @yellow;
      }
    }
  }
  .wrapper{
    height: 100%;  
    // background: red;
    overflow: hidden;
    .content{
      .w(375);
      h3{
        height: 30px;
        line-height: 30px;
        background: #333;
        color:rgba(255,255,255,0.5);
        font-size: @fs-s;
        padding-left:20px;
         

      }
      ol{
        li{
          .w(375);
          height: 70px;
          // background: pink;
          box-sizing: border-box;
          padding: 20px 0px 0px 30px;
          display: flex;
          align-items: center;
          img{
            width: 50px;
            height: 50px;
            border-radius:25px; 
          }
          span{
            padding-left:20px; 
            display: inline-block;
            height: 50px;
            line-height: 50px;
            font-size: @fs-s;
            color:rgba(255,255,255,.5);
          }
        }
      }
    }
    }
}
</style>