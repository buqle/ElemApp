<template>
    <div class="login-box">
      <pub-top head-tit="登录" go-back="true"></pub-top>
      <div style="height: 10.6vw"></div>
      <div class="login-box1 bgfff">
        <el-input placeholder="请输入账号" v-model="username"></el-input>
        <div class="login-input" flexcont flexcont2>
          <el-input placeholder="请输入密码" v-model="password" type="text" v-if="showPassword"></el-input>
          <el-input placeholder="请输入密码" v-model="password" type="password" v-else></el-input>
          <div class="swicth font24 fff" :class="{'chang_bg':showPassword}" flexcont flexcont2>
            <div class="button-show" :class="{'button-right':showPassword}" @click="changeButton"></div>
            <span>abc</span>
            <span>...</span>
          </div>
        </div>
        <div class="login-input login-input2" flexcont>
          <el-input placeholder="请输入验证码" v-model="codeNum"></el-input>
          <p  flexcont>
            <img :src="codeUrl">
            <span @click="changeCode"  class="font26">看不清<br><i>换一张</i></span>
          </p>
        </div>

      </div>
      <div class="login-box2">
        <p class="font26"> 温馨提示：未注册过的账号，登录时将自动注册</p>
        <p class="font26"> 注册过的用户可凭账号密码登录</p>
        <el-button type="primary" @click="loginIn">登录</el-button>
      </div>
      <h4 class="text-right font26 blue" flexcont flexcont2>
        重置密码
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shoutao"></use>
        </svg>
      </h4>
    </div>
</template>

<script>
  import PubTop from '@/components/PubTop';
  import {mapState,mapMutations} from 'vuex';
  import {getcapCode,accountLogin} from '@/Utils/getData'
    export default {
        components:{PubTop},
        data(){
          return{
            showPassword:false,
            username:'',
            password:'',
            codeUrl:null,//图片验证码url
            codeNum:null//图片验证码
          }
        },
        methods:{
          ...mapMutations(['RECORD_USERINFO','IN_FOOTER']),
          //切换显示密码
          changeButton(){
            this.showPassword=!this.showPassword
          },
          async changeCode(){
            let res=await  getcapCode();
            this.codeUrl=res.code
          },
          async loginIn(){
            if(!this.username){
              alert('请输入手机号/邮箱/用户名');
              return;
            }else if(!this.password) {
              alert('请输入密码');
              return;
            }else if(!this.codeNum){
              alert('请输入验证码');
              return
            }
            this.userInfo=await accountLogin({username:this.username,password:this.password,captcha_code:this.codeNum});
            if(!this.userInfo.user_id){
              alert(this.userInfo.message)
            }else {
              this.RECORD_USERINFO(this.userInfo);
              this.$router.go(-1);
              this.IN_FOOTER()
            }
          }

        },
      created(){
          this.changeCode()
      }
    }
</script>

<style scoped>
  .login-input2 p,.swicth{    mt: 3.2vw;}
  .swicth{
    bg:#ccc;size:15vw 5vw;bdrs:30px;ml:20px;
    .button-show{
      size:6vw;bdrs:50%;transition: all .3s;bg:#f1f1f1;
    }
    .button-right{transform: translateX(9.8vw);}
  }
  .chang_bg{bg:#4cd964;}
  .login-input2{
    img{size:20vw 8vw;}
    p{ml:20px;}
    span{
    c:#666;ml:10px;
      i{c:#3b95e9;}
    }
  }
  .login-box1{pb:26px;mt:24px;}
  .login-box1,.login-box2{pl:10%;}
  .login-box2{
    p{c: #ff6f74;p:12px;}
  }
  .login-box{
    h4{justify-content: flex-end;.icon{size:7vw;}m:28px 6% 0 0;}
  }
</style>
