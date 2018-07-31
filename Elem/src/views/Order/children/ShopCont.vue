<template>
  <div class="shop-cont" v-loading="loading" element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <!--{{$route.params.type}}-->


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
            this.arr=await getShopCont(this.userId,this.order.orderList[this.$route.params.type].unique_id);
            this.$store.state.loading=false;
          }
        },
      mounted(){
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
