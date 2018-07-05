<template>
    <div class="head-top">
      <div class="head-top1 fff" flexcont flexcont2>
        <slot name="logo"></slot>
        <div @click="$router.push(userInfo?'/Account':'/login')" v-if="siginUp">
          <svg class="icon" aria-hidden="true" v-if="userInfo">
            <use xlink:href="#icon-wode"></use>
          </svg>

          <span v-else class="fff">登录|注册</span>
        </div>
      </div>

      <div class="head-top2 fff" flexcont>
        <i class="el-icon-arrow-left fz30" v-if="goBack" @click="$router.go(-1)"></i>
        <p class="text-center ww1 tit" v-if="headTit">{{headTit}}</p>
      </div>


    </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
    export default {
      props:['siginUp','headTit','goBack'],
        computed:{
          ...mapState(['userInfo'])
        },
        methods:{
          ...mapActions(['getUserInfo'])
        },
      mounted(){
          this.getUserInfo();
      }
    }
</script>

<style scoped>
  .head-top{
    bg:#2e8ee6;p:0px 16px;h:80px;lh:80px;
    .icon{size:8vw;}
    .head-top2,.head-top1{align-items: center;}
    .head-top1{justify-content: space-between;.icon{size:6vw;}}
    .tit{fz:5.2vw;}
  }
</style>
