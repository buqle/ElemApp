<template>
    <div class="head-top ww1" v-show="edit.head">
      <div class="head-top1 fff" flexcont flexcont2>
        <slot name="logo"></slot>

        <div @click="$router.push(userInfo?'/account':'/login')" v-if="siginUp">
          <svg class="icon" aria-hidden="true" v-if="userId">
            <use xlink:href="#icon-wode"></use>
          </svg>

          <span v-else class="fff">登录|注册</span>
        </div>
      </div>

      <div class="head-top2 fff pos-a" flexcont>
        <i class="el-icon-arrow-left fz30" v-if="goBack" @click="$router.go(-1)"></i>
        <p class="text-center tit ww1" v-if="headTit">{{headTit}}</p>
        <span v-if="edit.show" class="pos-b" style="right: 0;" @click="editIcon">{{editTxt}}</span>
      </div>


    </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
    export default {
      data(){
        return{
          editTxt:'编辑'
        }
      },
      props:['siginUp','headTit','goBack'],
        computed:{
          ...mapState(['userInfo','edit','userId'])
        },
        methods:{
          ...mapActions(['getUserInfo']),
          editIcon(){
            if(this.editTxt=='编辑'){
              this.editTxt='完成'
              this.edit.editIcon=true
            }else {
              this.editTxt='编辑'
              this.edit.editIcon=false
            }
          }
        },
      mounted(){
          this.getUserInfo();
      }
    }
</script>

<style scoped>
  .head-top{
    bg:#2e8ee6;p:0px 16px;h:80px;lh:80px;position: fixed;t:0;l:0;
    .icon{size:8vw;}
    .head-top2,.head-top1{align-items: center;}
    .head-top1{justify-content: space-between;.icon{size:6vw;}}
    .tit{fz:5.2vw;}
    .head-top2{span{r:0;}}
  }
</style>
