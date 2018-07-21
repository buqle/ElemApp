<template>
  <div class="pub-mt shop-cont">
    <!--{{$route.params.type}}-->
    <div class="shop-cont-con1 bgfff text-center">
      <img :src="imgBaseUrl+arr.restaurant_image_url" alt="">
      <h4 class="bold">{{arr.status_bar.title}}</h4>
      <span class="fz30">再来一单</span>
    </div>
  </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {imgBaseUrl} from "@/configs/url";

    export default {
      data(){
        return{
          arr:[],
          imgBaseUrl
        }
      },
      computed:{
        ...mapState(['order'])
      },
        methods:{
          getCont(){
            this.arr=this.order.orderList[this.$route.params.type]
          }
        },
      created(){
        this.getCont()
      }
    }
</script>

<style scoped>
  .shop-cont{
    .shop-cont-con1{
      p:34px 0;
      img{bdrs:50%;size:160px;}
      h4{c:#544f4f;fz:36px;m:10px 0 24px 0;}
      span{bd:1px solid #3190e8;p:8px 20px; c:#3190e8;bdrs:8px;}
    }
  }
</style>
