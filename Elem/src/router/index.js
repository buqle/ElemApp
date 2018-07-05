import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'

Vue.use(Router);

const _imports=files=>()=>import(`@/views/${files}.vue`)

export const RouterMap=[
  {
    path:'/',
    component:App,
    children:[
      {
        path: '',
        redirect: '/home'
      },
      {
        path:'/home',
        component:_imports('Home/index'),
        name:'首页'
      }
      ,
      {
        path:'/login',
        component:_imports('Login/index'),
        name:'登陆'
      }
    ]
  }
];
export const router=new Router({
  routes:RouterMap
});
