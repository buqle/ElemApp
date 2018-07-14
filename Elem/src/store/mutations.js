import {
  RECORD_USERINFO,GET_USERINFO,RESET_NAME,ALL_LIST,ADD_ADRESS,ADDS_ADRESS,SECOND_LIST,IN_FOOTER,GET_ORDER_LIST
} from "./mutationsTypes";

import {setStore,getStore} from "../Utils/storage";
import Vue from 'vue';
export default {
  //设置用户信息
  [RECORD_USERINFO](state,info){
    state.userInfo=info;
    state.login=true;
    setStore('user_id',info.user_id);
    setStore('name',info.username);
    state.userId=getStore('user_id')
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
  },
//修改用户名
[RESET_NAME](state,name){
    //以下为三种更新数据方式
  Vue.prototype.$set(state.userInfo,'username',name)
  //state.userInfo=Object.assign({},state.userInfo,{username:name})
  //state.userInfo=Object.assign({},state.userInfo,{username})
},

//收货地址all
[ALL_LIST](state,list){
    state.removeAddress=list;
},

//选择收货地址
[ADD_ADRESS](state,adress){
  state.adress.list=adress
  },

//增加收货地址
  [ADDS_ADRESS](state,adress){
    state.removeAddress=[adress,...state.removeAddress]
  },

  //存
  [SECOND_LIST](state,list){
    state.adress.secondList=list
  },

  //退出设置footer

[IN_FOOTER](state){
    Vue.prototype.$set(state.footerList,3,{tit:'我的',icon:'icon-wode',path:'/account'})
},


//我的订单
[GET_ORDER_LIST](state,list){
    state.order.orderList=list
}

}
