import {router} from "./index";

router.afterEach((to,from)=>{
  if(to.meta.page){

  }
  document.title=to.name;
});
export  default router;
