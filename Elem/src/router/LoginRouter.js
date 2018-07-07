import {router} from "./index";
import store from '@/store'
import {getStore} from "@/Utils/storage";
router.beforeEach((to,from,next)=>{
  if(to.meta.login){//判断前往的页面是否要登录
    if(getStore('user_id')){
      console.log(getStore('user_id'))
      next()
    }else {
      next({
        path: '/login',
        //query: { redirect: to.fullPath }//把要跳转的地址作为参数传到下一步
      })
    }
  }else {
    next()
  }

});

router.afterEach((to,from)=>{
  if(to.meta.page){

  }
  document.title=to.name;
});
export  default router;
