import axios from '@/Utils/featch'
import {getStore} from "@/Utils/storage";

//user
export const getUser=()=>{
  return new Promise((resolve,reject)=>{
    axios.get('v1/user',{user_id:getStore('user_id')})
      .then(res=>{
        console.log(res);
        resolve(res)
      }).catch(err=>{
      reject(err)
    })
  })
};

//获取图片验证码
export  const getcapCode=()=>{
  return new Promise((resolve,reject)=>{
    axios.post('v1/captchas',{})
      .then(res=>{
        console.log(res);
        resolve(res)
      }).catch(err=>{
      reject(err)
    })
  })
};

//login
export const accountLogin=(params)=>{
  return new Promise((resolve,reject)=>{
    axios.post('v2/login',params)
      .then(res=>{
        console.log(res);
        resolve(res)
      }).catch(err=>{
      reject(err)
    })
  })
}
