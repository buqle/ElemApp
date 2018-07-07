<template>
    <div class="account">
      <pub-top go-back="true" :headTit="$route.name"></pub-top>

      <transition name="router-slid" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
</template>

<script>

  import PubTop from '@/components/PubTop';
    export default {
        components:{PubTop},

    }
</script>

<style scoped>
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>
