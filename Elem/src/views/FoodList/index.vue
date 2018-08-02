<template>
    <div>
      <pub-top go-back="true" :headTit="$route.query.title"></pub-top>
      <div style="height: 10.6vw;"></div>
      <Nav></Nav>

    </div>
</template>

<script>
  import PubTop from '@/components/PubTop';
  import Nav from './Nav'
    export default {
        components:{PubTop,Nav}
    }
</script>

<style scoped>

</style>
