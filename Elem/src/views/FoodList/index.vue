<template>
    <div>
      <pub-top go-back="true" :headTit="$route.query.title"></pub-top>
      <div style="height: 10.6vw;"></div>
      <FoodTop></FoodTop>

    </div>
</template>

<script>
  import PubTop from '@/components/PubTop';
  import FoodTop from './FoodTop'
    export default {
        components:{PubTop,FoodTop}
    }
</script>

<style scoped>

</style>
