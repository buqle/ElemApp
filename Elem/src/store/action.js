import {getUser} from "@/Utils/getData";
import {GET_USERINFO} from "./mutationsTypes";


export default {
  async getUserInfo({commit,state}){
    let res=await getUser();
    commit(GET_USERINFO,res)
  }
}
