<template>
    <div>
        <h3>动画案例</h3>
        <transition 
        enter-active-class="slideInRight animated"
        leave-active-class="slideOutRight animated"
        >
        <div class="test" v-if="show"></div>
        </transition>
        <button @click='toggle'>toggle</button>
    </div>
</template>
 
<script>
 /*
过度使用 
在某一个元素或者多个元素进入或者离开页面 添加动画
1.在该元素的外部添加 transition 标签 
2.多个元素添加  transition-group 每一个子元素需要key
3.通过name属性添加名字
4.在样式里添加过度样式 
5. 进入 name-enter  name-enter-to  name-enter-active
6. 进入 name-leave  name-leave-to  name-leave-active
*/
export default {
    data(){
             return{
                 show:true
             }
    },
    methods:{
        toggle(){
            this.show=!this.show
        }
    }
}
</script>
<style >
.test{
    background: #456;
    width: 100px;
    height: 100px;
}



</style>