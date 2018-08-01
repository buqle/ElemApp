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


    <dl class="shop-cont-con2 bgfff pub-mt">
      <dt flexcont flexcont2>{{arr.restaurant_name}}<i class="el-icon-arrow-right fz30"></i></dt>
      <dt v-for="item in arr.basket.group[0]" flexcont flexcont2>
        {{item.name}}
        <p flexcont flexcont2>
          <span>X{{item.quantity}}</span>
          ￥{{item.price}}
        </p>
      </dt>
      <dt flexcont flexcont2>配送费:<i>{{arr.basket.deliver_fee.price}}</i></dt>
      <dt style="color: #fd8403" class="text-right">实付: <strong>{{arr.total_amount}}</strong></dt>
    </dl>

    <dl class="shop-cont-con3 bgfff pub-mt">
      <dt class="bdb">配送信息</dt>
      <dt>送达时间：&nbsp;{{arrs.deliver_time}}</dt>
      <dt>送货地址：&nbsp;{{arrs.addressDetail}}</dt>
      <dt>联系方式：&nbsp;{{arrs.phone}}</dt>
      <dt>配送方式：&nbsp;蜂鸟配送</dt>
    </dl>

    <dl class="shop-cont-con3 bgfff pub-mt">
      <dt class="bdb">订单信息</dt>
      <dt>订单号：&nbsp;{{arr.id}}</dt>
      <dt>支付方式：&nbsp;{{arrs.pay_method}}</dt>
      <dt>下单时间：&nbsp;{{arr.formatted_created_at}}</dt>
    </dl>

  </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {imgBaseUrl} from "@/configs/url";
    import {getShopCont} from "@/Utils/getData"
    export default {
      data(){
        return{
          arr:null,
          arrs:null,
          Icon:[],
          imgBaseUrl
        }
      },
      computed:{
        ...mapState(['order','loading','userId'])
      },
        methods:{
          async getCont(){
            this.$store.state.loading=true;
            this.arr=this.order.orderList[this.$route.params.type];
            this.arrs=await getShopCont(this.userId,this.order.orderList[this.$route.params.type].unique_id);
            this.$store.state.loading=false;
          }
        },
      created(){
        this.getCont();
      }
    }
</script>

<style scoped>
  .shop-cont{
    pb:40px;
    .pub-mt{mt:20px;}
    .shop-cont-con1{
      p:34px 0;
      img{bdrs:50%;size:160px;}
      h4{c:#544f4f;fz:36px;m:10px 0 24px 0;}
      span{bd:1px solid #3190e8;p:8px 20px; c:#3190e8;bdrs:8px;}
    }
  dt{p:28px 34px;fz:28px;}
  .shop-cont-con2 dt,.shop-cont-con3 dt.bdb{bdb:1px solid #e6e6e6;c:#000;}
  .shop-cont-con2{
    dt{
      justify-content: space-between;span{c:#5d5d5d;w:140px;}
  }
  dt:nth-child(2){bdb:none;}
  }
  .shop-cont-con3 dt{c:#666;}
  }
</style>
