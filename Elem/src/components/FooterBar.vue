<template>
  <div class="footer-list  ww1 bgfff" flexcont flexcont2 v-if="footerShow">
    <router-link tag="p" v-for="(item,index) in footerList"  flexcont flexcont2 :to="item.path" :class="{'active':($route.path===item.path)}" :key="index">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="`#${item.icon}`"></use>
      </svg>
      {{item.tit}}
    </router-link>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        computed:{
          ...mapState(['footerList','footerShow'])
        }
    }
</script>

<style scoped>
  .footer-list{
    h:110px;border-top: 1px solid #d0cbcb;
    position: fixed;b:0;l:0;justify-content: space-around;
    p{flex-direction: column;.icon{size:6vw;}}
    .active{c:red;}
  }
</style>
