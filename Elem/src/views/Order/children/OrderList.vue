<template>
    <div class="ww1">
      <div class="order-con1 pos-b" v-loading="loading" element-loading-text="拼命加载中"
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)">
        <p v-for="(item,index) in order.orderList">{{item.restaurant_name}}</p>
      </div>
    </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex';
    export default {
      data(){
        return{
          offset:0
        }
      },
      computed:{
        ...mapState(['order','loading'])
      },
        methods:{
          ...mapActions(['orderList'])
        },
      mounted(){
          this.orderList({offset:this.offset,limit: 10})
      }
    }
</script>

<style scoped>
  .order-con1{h:1005;w:100%;l:0;b:100px;t:80px;}
</style>
