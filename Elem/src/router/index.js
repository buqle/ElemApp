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
      ,
      //个人信息
      {
        path:'/account',
        component:_imports('Account/index'),
        redirect:'/account/box',
        children:[
          {
            path:'box',
            component:_imports('Account/TopBar'),
            name:'个人中心'
          },
          {
            path:'info',
            component:_imports('Account/UserInfo'),
            name:'个人设置',
            meta:{login:true}
          }
        ]
      }
    ]
  }
];
export const router=new Router({
  routes:RouterMap
});
