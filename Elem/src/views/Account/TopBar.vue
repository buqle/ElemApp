<template>
    <div class="top-bar">
      <div class="top-bar-con1 fff pos-a" @click="$router.push('/account/info')" flexcont flexcont2>
        <img :src="imgBaseUrl+userInfo.avatar"  v-if="userInfo&&userInfo.user_id">
        <svg class="icon" aria-hidden="true" v-else>
          <use xlink:href="#icon-xiugaitouxiang"></use>
        </svg>
        <p>
          <span class="bold">{{username}}</span><br>
          {{mobile}}
        </p>
        <h4 class="el-icon-arrow-right pos-b"></h4>
      </div>

      <div class="top-bar-con2 bgfff" flexcont>
        <dl flexcont flexcont3>
          <dt><span class="bold">{{parseInt(balance).toFixed(2)}}</span>元</dt>
          <dd>我的余额</dd>
        </dl>
        <dl flexcont flexcont3>
          <dt><span class="bold">{{count}}</span>个</dt>
          <dd>我的优惠</dd>
        </dl>
        <dl flexcont flexcont3>
          <dt><span class="bold">{{point}}</span>分</dt>
          <dd>我的积分</dd>
        </dl>
      </div>

      <div class="top-bar-con3">
        <h4 v-for="(item,index) in listArr" :key="index" flexcont class="bgfff" flexcont2>
          <svg class="icon" aria-hidden="true" v-if="userInfo">
            <use :xlink:href="'#'+item.icon"></use>
          </svg>
          <p class="ww1 pos-a" flexcont flexcont2>{{item.names}}<i class="el-icon-arrow-right pos-b"></i></p>
        </h4>
      </div>

    </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {imgBaseUrl} from "@/configs/url";

  export default {
    data(){
      return{
        imgBaseUrl,
        username:'登录后显示',//用户名
        mobile:'暂未绑定手机号',
        balance:0,//余额
        count:0,//优惠券个数
        point:0,//积分
        listArr:[
          {icon:'icon-dingdan-',names:'我的订单'},
          {icon:'icon-gongsi-',names:'积分商城'},
          {icon:'icon-huiyuan-',names:'饿了么会员卡'},
          {icon:'icon-fuwu-',names:'客服中心'},
          {icon:'icon-xingqiu-',names:'下载APP'}
        ]
      }
    },
      computed:{
        ...mapState(['userInfo'])
      },
    methods:{
      initData(){
        if(this.userInfo&&this.userInfo.user_id){
          this.username=this.userInfo.username;
          this.mobile=this.userInfo.mobile?this.userInfo.mobile:'暂未绑定手机号';
          this.balance=this.userInfo.balance;
          this.count=this.userInfo.gift_amount;
          this.point=this.userInfo.point;
        }else {
          this.username='登录后显示',
            this.mobile='暂未绑定手机号'
        }
      }
    },
    mounted(){
      this.initData()
    },
    watch:{
      userInfo(){//监听userinfo改变
        this.initData()
      }
    }

    }
</script>

<style scoped>
  .top-bar-con1{
    bg:#2e8ee6;p:30px;
    img{size:120px;bdrs:50%;}
    .icon{size:84px;}
    p{
      fz:30px;ml:24px;span{fz:34px;}
    }
    h4{fz:36px;r:30px;}
  }
  .top-bar-con2{
    dl{
      p:18px 0; width: 33.3%;
      flex-direction: column;
      dt{span{c:#f90;fz:38px;}fz:30px;c:#666;}
      dd{fz:28px;c:#a09898;}
    }
    dl:nth-child(1),dl:nth-child(2){bdr:1px solid #e6dada;}
  }
  .top-bar-con3{
    mt:24px;
    h4{pl:20px;}
    .icon{size:30px;}
    p{ml:14px;bdb:1px solid #e6dada;p:16px 0;i{r:0;}c:#666;fz:27px;}
  h4:nth-child(4){mt:24px;}
  }
</style>
