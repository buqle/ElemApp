import {
  RECORD_USERINFO,GET_USERINFO
} from "./mutationsTypes";

import {setStore,getStore} from "../Utils/storage";
export default {
  //设置用户信息
  [RECORD_USERINFO](state,info){
    state.userInfo=info;
    state.login=true;
    setStore('user_id',info.user_id)
  },
  //获取用户信息
  [GET_USERINFO](state,info){
    if(state.userInfo&&(state.userInfo.username!==info.username)){
      return;
    };
    if(!state.login){return};
    if(!info.message){
      state.userInfo={...info}
    }else {
      state.userInfo=null;
    }
  }



}
