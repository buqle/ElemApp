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
            meta:{login:true},
          },
          {
            path:'setname',
            component:_imports('Account/children/Setname'),
            name:'修改用户名',
          }
          ,
          {
            path:'address',
            component:_imports('Account/children/Shipp-add'),
            name:'修改地址',
          }
          ,
          {
            path:'addressADD',
            component:_imports('Account/children/Shipp-adds'),
            name:'添加地址',
          }
          ,
          {
            path:'sreachADD',
            component:_imports('Account/children/Sreach-add'),
            name:'搜索地址',
          }
          ,
          {
            path:'changePass',
            component:_imports('Account/children/ChangePassword'),
            name:'修改密码',
          }
        ]
      },

      //订单
      {
        path:'/order',
        component:_imports('Order/index'),
        name:'订单列表',
        redirect:'/order/orderlist',
        meta:{login:true/*head:true*//*控制头部显示*/},
        children:[
          {
            path:'orderlist',
            component:_imports('Order/children/OrderList'),
            name:'订单列表'
          },
          {
            path:'shopcont',
            component:_imports('Order/children/ShopCont'),
            name:'订单详情',
            meta:{footer:true}
          },
        ]
      },


      //外卖
      {
        path:'/takeaway',
        name:'外卖',
        component:_imports('Takeaway/index'),

      },
      //外卖列表
      {
        path:'/foodlist',
        name:'外卖',
        component:_imports('FoodList/index'),

      }
    ]
  }
];
export const router=new Router({
  routes:RouterMap
});
