import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '../components/Recommend'
import Singer from '../components/Singer/index.vue'
import Search from '../components/Search'
import Rank from '../components/Rank'
import  Dealis from 'components/Dealis'
import Dea from 'components/Dea'
Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
      {
          path:'/recommend',
          component:Recommend
      },
      {
        path:'/Singer',
        component:Singer,
        children:[
           {
            path:':singermid',
            name:'detail',
            component:Dealis,
           }
        ]
    },{
        path:'/Rank',
        component:Rank,
        children:[
            {
             path:':topid',
             name:'dea',
             component:Dea,
            }
         ]
    },{
        path:'/Search',
        component:Search
    },{
        path:'/',
        redirect:'/recommend'
    }
  ]
})

export default router
