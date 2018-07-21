<template>
    <div class="ww1">
      <div class="order-con1" v-loading="loading" element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)">
        <dl class="bgfff" v-for="(item,index) in order.orderList">
          <dt flexcont flexcont2 @click="skip(index)">
            <img :src="imgBaseUrl+item.restaurant_image_url" alt="" @click="getList">
            <h4>
              <p flexcont flexcont2 class="fz30">
                <span>
                  {{item.restaurant_name}}
                  <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-binggan"></use>
                </svg>
                </span>
                {{item.status_bar.title}}
              </p>
              <i class="font24">{{item.formatted_created_at}}</i>
            </h4>
          </dt>
          <dd class="font26" @click="skip(index)">
            <p flexcont flexcont2>
              {{item.basket.group[0][0].name}}{{item.basket.group[0].length>1?'等'+item.basket.group[0].length+'件商品':''}}
              <strong>￥{{item.total_amount.toFixed(2)}}</strong>
            </p>
          </dd>
          <dd class="text-right font26">
            <span>再来一单</span>
          </dd>
        </dl>
      </div>
    </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex';
  import {imgBaseUrl} from "@/configs/url";

  export default {
      data(){
        return{
          offset:0,
          imgBaseUrl
        }
      },
      computed:{
        ...mapState(['order','loading'])
      },
        methods:{
          ...mapActions(['orderList']),
          getList(){
            this.orderList({offset:this.offset,limit: 10})
          },
          skip(i){
            this.$router.push({name:'订单详情',params:{type:i}})
          }
        },
      mounted(){
        this.getList()
      }
    }
</script>

<style scoped>
  .order-con1{
    w:100%;
    dl{
      p:30px 12px;mb:26px;c:#2d2c2c;
      dt{
        img{size:90px;}
        h4{ml:16px;flex-grow: 1;i{c:#8c8c8c;}pb:14px;}
        p{.icon{size:30px;}span{fz:32px;}justify-content:space-between;}
      }
      dd p,h4{bdb:1px solid #d8d8d8;}
      dd{ml:106px;p{p:24px 0;justify-content:space-between;}strong{c:#f60;}}
      dd.text-right{
        c:#3190e8;pt:26px;span{bd:1px solid #3190e8;p:8px 12px;bdrs:6px;}
      }
    }
  }
</style>
