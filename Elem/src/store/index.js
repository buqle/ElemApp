import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';
import getters from './getters';
import {getStore} from "@/Utils/storage";

Vue.use(Vuex);
const state={
  userId:getStore('user_id'),
  userInfo:null,//user
  login:true,//登录
  removeAddress:[],//地址列表
  edit:{
    show:false,editIcon:false,head:true
  },
  loading:false,
  adress:{
    keyword:'',
    list:'',
    geohash: '31.22299,121.36025',
    secondList:null
  },
  footerList:[
    {tit:'外卖',icon:'icon-mianfen',path:'/account/takeaway'},
    {tit:'搜索',icon:'icon-sousuo',path:'/account/search'},
    {tit:'订单',icon:'icon-dingdan-',path:'/order/orderlist'},
    {tit:`${getStore('user_id')?'我的':'未登录'}`,icon:'icon-wode',path:`${getStore('user_id')?'/account/box':'/login'}`}
    ],
  order:{
    orderList:[],
    orderIcon:[]
  }
};
export default new Vuex.Store({
  state,getters,actions,mutations
})
