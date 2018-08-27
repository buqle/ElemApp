import {getUser,getAllist,getorderList,getFoodList,getShopList} from "@/Utils/getData";
import {GET_USERINFO,ALL_LIST,GET_ORDER_LIST,GET_FOOD_LIST,GET_SHOP_LIST} from "./mutationsTypes";


export default {
  async getUserInfo({commit,state}){
    let res=await getUser();
    commit(GET_USERINFO,res)
  },
  async allLIST({commit,state}){
    let res=await getAllist(state.userInfo.user_id);
    commit('ALL_LIST',res)
  },
  async orderList({commit,state},params){
    /*if(state.order.orderList.length>0){
      state.loading=false;
      return false;
    }*/
    state.loading=true;
    let res=await getorderList(state.userId,params);
    state.loading=false;
    commit('GET_ORDER_LIST',res)
  },
  //food-list
  async getFoodlist({commit},params){
    let res=await getFoodList(params);
    commit('GET_FOOD_LIST',res)
  },
  //商家属性
  async getShopLists({commit},params){
    let res=await getShopList(params);
    commit('GET_SHOP_LIST',res)
  }
}
