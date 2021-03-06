import axios from 'axios';
import qs from 'qs';

axios.defaults.withCredentials=true;//设置发送请求时带上cookie

//发送
axios.interceptors.request.use(config=>{
  return config
},err=>{
  return Promise.reject(err) //承诺被拒绝
});

//响应
axios.interceptors.response.use(respone=>respone,err=>Promise.resolve(err.response))//承诺被接受

//检查状态码
function checkStatus(res) {
  if(res.status==200||res.status==304){
    return res.data
  };
  return{
    code:0,
    msg:res.data.msg||res.statusText,
    data:res.statusText
  }
}
/*setTimeout(function () {

});
setTimeout(()=>foo='');*/

//检查code
function checkCode(res) {
  if(res.code==0){
    throw  new Error(res.msg)//创建自定义错误
  }
  return res
}

const baseURL='http://cangdu.org:8001/'
export default {
  get(url,params){
    if(!url){
      return
    }else {
      return axios({
        method:'get',
        url:`api/${url}`,
        params,
        timeout:30000
      }).then(checkStatus).then(checkCode)
    }
  },
  post(url,data){
    if(!url){
      return
    }else {
      return axios({
        method:'post',
        url:`api/${url}`,
        data:qs.stringify(data),//将对象 序列化成URL的形式，以&进行拼接
        timeout:30000
      }).then(checkStatus).then(checkCode)
    }
  },
  posts(url,data){
    if(!url){
      return
    }else {
      return axios({
        method:'post',
        url:`api/${url}`,
        data:JSON.stringify(data),
        processData: false,
        timeout:30000
      }).then(checkStatus).then(checkCode)
    }
  },
  delete(url,params){
    if(!url){
      return
    }else {
      return axios({
        method:'delete',
        url:`api/${url}`,
        params,
        timeout:30000
      }).then(checkStatus).then(checkCode)
    }
  }



}
