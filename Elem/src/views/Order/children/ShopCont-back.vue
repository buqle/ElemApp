<template>
  <div class="shop-cont" v-loading="loading" element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <!--{{$route.params.type}}-->
    <div class="shop-cont-con1 bgfff text-center">
      <img :src="imgBaseUrl+arr.restaurant_image_url" alt="">
      <h4 class="bold">{{arr.status_bar.title}}</h4>
      <span class="fz30">再来一单</span>
    </div>


    <dl class="shop-cont-con2 bgfff pub-mt font28">
      <dt flexcont flexcont2 class="fz30" style="color: #5a5555">{{arr.restaurant_name}}<i class="el-icon-arrow-right fz30"></i></dt>
      <dt v-for="item in arr.basket.group[0]" flexcont flexcont2>
        {{item.name}}
        <p flexcont flexcont2>
          X{{item.quantity}}
          <span class="text-right">￥{{item.price}}</span>
        </p>
      </dt>
      <dt flexcont flexcont2>配送费:<i>{{arr.basket.deliver_fee.price}}</i></dt>
      <dt style="color: #fd8403" class="text-right">实付: <strong>{{arr.total_amount}}</strong></dt>
    </dl>

  </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {imgBaseUrl} from "@/configs/url";

    export default {
      data(){
        return{
          arr:[],
          Icon:[],
          imgBaseUrl
        }
      },
      computed:{
        ...mapState(['order','loading'])
      },
        methods:{
          async getCont(){
            this.arr=this.order.orderList[this.$route.params.type];
            this.Icon=this.order.orderIcon[this.$route.params.type];
            this.$store.state.loading=false;
          }
        },
      created(){
        this.$store.state.loading=true;
        this.getCont();
      }
    }
</script>

<style scoped>
  .shop-cont{
    .pub-mt{mt:20px;}
    .shop-cont-con1{
      p:34px 0;
      img{bdrs:50%;size:160px;}
      h4{c:#544f4f;fz:36px;m:10px 0 24px 0;}
      span{bd:1px solid #3190e8;p:8px 20px; c:#3190e8;bdrs:8px;}
    }
  .shop-cont-con2{
    dt{
      justify-content: space-between;p:18px 34px;span{c:#5d5d5d;w:140px;}bdb:1px solid #e6e6e6;
  }
  dt:nth-child(2){bdb:none;}
  }
  }
</style>
