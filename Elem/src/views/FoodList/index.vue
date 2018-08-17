<template>
    <div>
      <pub-top go-back="true" :headTit="tit"></pub-top>
      <div style="height: 10.6vw;"></div>
      <FoodTop @tit="changeTit"></FoodTop>

    </div>
</template>

<script>
  import PubTop from '@/components/PubTop';
  import FoodTop from './FoodTop'
    export default {
        components:{PubTop,FoodTop},
      data(){
          return{
            tit:this.$route.query.title
          }
      },
      methods:{
        changeTit(t){
          this.tit=t
        }
      }
    }
</script>

<style scoped>

</style>
