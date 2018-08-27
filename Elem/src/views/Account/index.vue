<template>
    <div class="account">
      <pub-top go-back="true" :headTit="$route.name">

      </pub-top>
      <div style="height: 10.6vw"></div>
      <transition name="router-slid" mode="out-in">
        <router-view></router-view>
      </transition>
      <footer-bar></footer-bar>
    </div>
</template>

<script>

  import PubTop from '@/components/PubTop';
  import FooterBar from '@/components/FooterBar'
    export default {
        components:{PubTop,FooterBar},

    }
</script>

<style scoped>

</style>
