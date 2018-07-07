<template>
<div class="user-info">
  <dl class="user-info-con1 bgfff font28">
    <dt flexcont flexcont2 class="pos-a">
      <input type="file" class="block pos-b update-ava" @change="uploadAva"/>
      头像
      <p flexcont flexcont2>
        <img :src="imgBaseUrl+userInfo.avatar" alt="">
        <i class="el-icon-arrow-right bold"></i>
      </p>
    </dt>
    <dt flexcont flexcont2>
      用户名
      <p flexcont flexcont2>
        {{userInfo.username}}
        <i class="el-icon-arrow-right bold"></i>
      </p>
    </dt>
    <dt flexcont flexcont2>
      收货地址
      <i class="el-icon-arrow-right bold"></i>
    </dt>
    <h4>账号绑定</h4>
    <dt flexcont flexcont2>
      手机号绑定
      <i class="el-icon-arrow-right bold"></i>
    </dt>
    <h4>安全设置</h4>
    <dt flexcont flexcont2>
      修改密码
      <i class="el-icon-arrow-right bold"></i>
    </dt>
  </dl>
  <p flexcont style="justify-content: center"><el-button type="danger">退出登录</el-button></p>
</div>
</template>

<script>
    import {mapState} from 'vuex'
    import {imgBaseUrl} from "@/configs/url";
    import {updateava} from "@/Utils/getData";

    export default {
      computed:{
        ...mapState(['userInfo'])
      },
      data(){
        return{
          shows:false,
          imgBaseUrl,
          username:'',
          avatar:'',
          mobile:''
        }
      },
      methods:{
        //修改头像
        async uploadAva(){
          let Ava=document.querySelector('.update-ava');
          let data = new FormData();
              console.log(data)
              data.append('file', Ava);
              try {
                let respone=await updateava(this.userInfo.user_id,{credentials: 'include',body: data});
                let res=await respone.json()
                if(res.status==1){
                  this.userInfo.avatar=res.image_path
                }
              }catch(err){
                alert('上传失败');
                throw  new Error(err)
              }
        }
      }
    }
</script>

<style scoped>
  .user-info{
    mt:26px;
    dl{
      mb:30px;
      c:#9a9292;img{size:14vw;bdrs:50%;}
      i{fz:34px;}
      dt{justify-content: space-between;p:26px;bdt:1px solid #ded8d8;}
      dt:nth-child(1){bdt:none;}
      h4{p:16px 26px;bg:#f4f4f4;c:#666;}
      input[type="file"]{opacity: 0;size:100%;l:0;t:0;}
    }
  .el-button--danger{w:85%;m:0 auto;p:20px 0;}
  }
</style>
