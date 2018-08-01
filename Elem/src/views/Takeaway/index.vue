<template>
    <div>
      <pub-top siginUp='take'>
        <svg class="icon" aria-hidden="true" slot="search">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <p slot="miseTit">...</p>
      </pub-top>
      <div style="height: 10.6vw"></div>
      <swiper ref="Myswiper">
        <swiper-slide v-for="(item,index) in 4" :key="index">
          <dl>
            <dt></dt>
            <dd></dd>
          </dl>
        </swiper-slide>
      </swiper>
    </div>
</template>

<script>
  import PubTop from '@/components/PubTop';
  import {swiper,swiperSlide} from 'vue-awesome-swiper';
  import {getFoodsType} from '@/Utils/getData'
    export default {
        components:{PubTop,swiper,swiperSlide},
        computed:{
          swiper(){
            return this.$refs.Myswiper.swiper
          }
      },
      created(){
          getFoodsType('31.22299,121.36025',{geohash:'31.22299,121.36025',group_type: '1','flags[]': 'F'})
      }
    }
</script>

<style scoped>

</style>
