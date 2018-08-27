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
  });

};

//修改头像
export const updateava=(urls,params)=>{
  return new Promise((resolve,reject)=>{
    axios.posts('eus/v1/users/'+urls+'/avatar',params)
      .then(res=>{
        console.log(res);
        resolve(res)
      }).catch(err=>{
      reject(err)
    })
  })
};

//获取所有收货地址列表
export const getAllist=(uid)=>{
  return new Promise((resolve,reject)=>{
    axios.get('v1/users/'+uid+'/addresses',{})
      .then(res=>{
        console.log(res);
        resolve(res)
      }).catch(err=>{
      reject(err)
    })
  })
};

//删除收货地址列表
export const deletList=(uid,listId)=>{
  return new Promise((resolve,reject)=>{
    axios.delete('v1/users/'+uid+'/addresses/'+listId,{})
      .then(res=>{
        console.log(res);
        resolve(res)
      }).catch(err=>{
      reject(err)
    })
  })
};

//搜索地址
export const searchList=(params)=>{
  return new Promise((resolve,reject)=>{
    axios.get('/v1/pois',params)
      .then(res=>{
        console.log(res);
        resolve(res)
      }).catch(err=>{
      reject(err)
    })
  })
};

//添加地址
export const addressAdd=(uid,params)=>{
  return new Promise((resolve,reject)=>{
    axios.post('v1/users/'+uid+ '/addresses',params)
      .then(res=>{
        console.log(res);
        resolve(res)
      }).catch(err=>{
      reject(err)
    })
  })
};

//修改密码
export const changePassWord=(params)=>{
  return new Promise((resolve,reject)=>{
    axios.post('v2/changepassword',params)
      .then(res=>{
        console.log(res);
        resolve(res)
      }).catch(err=>{
      reject(err)
    })
  })
};

//退出
export const loginOutFun=()=>{
  return new Promise((resolve,reject)=>{
    axios.get('v2/signout',{})
      .then(res=>{
        console.log(res);
        resolve(res)
      }).catch(err=>{
      reject(err)
    })
  })
};

//获取我的订单列表

export const getorderList=(uid,params)=>{
  return new Promise((resolve,reject)=>{
    axios.get(`/bos/v2/users/${uid}/orders`,params)
      .then(res=>{
        console.log(res);
        resolve(res)
      }).catch(err=>{
      reject(err)
    })
  })
};

//订单详情
export const getShopCont=(uid,orid)=>{
  return new Promise((resolve,reject)=>{
    axios.get(`/bos/v1/users/${uid}/orders/${orid}/snapshot`,{})
      .then(res=>{
        console.log(res);
        resolve(res)
      }).catch(err=>{
      reject(err)
    })
  })
};

export const getFoodsType=(geohash,params)=>{
  return new Promise((resolve,reject)=>{
    axios.get('v2/index_entry',params)
      .then(res=>{
        console.log(res);
        resolve(res)
      }).catch(err=>{
      reject(err)
    })
  })
};

//获取经纬度
export const cityGuess=()=>{
  return new Promise((resolve,reject)=>{
    axios.get('v1/cities',{type:'guess'})
      .then(res=>{
        console.log(res);
        resolve(res)
      }).catch(err=>{
      reject(err)
    })
  })
}

//获取经纬度和准确的定位地址
export const takeAddress=(parmas)=>{
  return new Promise((resolve,reject)=>{
    axios.get('v2/pois/'+parmas)
      .then(res=>{
        console.log(res);
        resolve(res)
      }).catch(err=>{
      reject(err)
    })
  })
};

//foodlist
export const getFoodList=(params)=>{
  return new Promise((resolve,reject)=>{
    axios.get('shopping/v2/restaurant/category',params)
      .then(res=>{
        console.log(res);
        resolve(res)
      }).catch(err=>{
      reject(err)
    })
  })
};


//配送列表

export const getFilterList=(params)=>{
  return new Promise((resolve,reject)=>{
    axios.get('shopping/v1/restaurants/delivery_modes',params)
      .then(res=>{
        console.log(res);
        resolve(res)
      }).catch(err=>{
      reject(err)
    })
  })
};


//商家属性
export const getShopList=(params)=>{
  return new Promise((resolve,reject)=>{
    axios.get('shopping/v1/restaurants/activity_attributes',params)
      .then(res=>{
        console.log(res);
        resolve(res)
      }).catch(err=>{
      reject(err)
    })
  })
}
