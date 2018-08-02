<template>
    <div>
      <pub-top siginUp='take'>
        <svg class="icon" aria-hidden="true" slot="search">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <p slot="miseTit">...</p>
      </pub-top>
      <div style="height: 10.6vw"></div>
      <div class="swiperWrap">
      <swiper ref="Myswiper" :options="swiperOption" class="bgfff font28">
        <swiper-slide v-for="(item,index) in foodTypes" :key="index" flexcont class="food-head">
          <dl v-for="(food,index) in item" class="text-center" @click="$router.push({path:'/foodlist',query:{geohash,title:food.title,restaurant_category_id:getCatId(food.link)}})" :key="food.id">
            <dt><img :src="imgBaseUrl+food.image_url" alt=""></dt>
            <dd>{{food.title}}</dd>
          </dl>
        </swiper-slide>
        <div id="swiperOwn" class="swiper-pagination" slot="pagination"></div>
      </swiper>
      </div>
    </div>
</template>

<script>
  import PubTop from '@/components/PubTop';
  import {swiper,swiperSlide} from 'vue-awesome-swiper';
  import {getFoodsType} from '@/Utils/getData';


  export default {
        components:{PubTop,swiper,swiperSlide},
        data(){
          return{
            foodTypes:[],
            imgBaseUrl:'https://fuss10.elemecdn.com',
            geohash:'31.22299,121.36025',
            swiperOption: {
              pagination: {
                el: '.swiper-pagination',
                clickable: true
              }
            }
          }
        },
        computed:{
          swiper(){
            return this.$refs.Myswiper.swiper
          }
      },
      mounted(){
          getFoodsType('31.22299,121.36025',{geohash:'31.22299,121.36025',group_type: '1','flags[]': 'F'}).then(res=>{
           let resLength=res.length;
           let resArr=[...res];
           let foodArr=[];
           for(let i=0,j=0;i<resLength;i+=8,j++){
             foodArr[j]=resArr.splice(0,8);
           };

           this.foodTypes=foodArr;
          })
      },
    methods:{
          getCatId(url){
            let urlData=decodeURIComponent(url.split('=')[1].replace('&target_name',''));
            if(/restaurant_category_id/gi.test(urlData)){//gi.test正则表达式  g:全局查找 i:不区分大小写
              return JSON.parse(urlData).restaurant_category_id.id
            }else {
              return ''
            }
          }
    }
    }
</script>

<style scoped>
  .swiper-container-horizontal>.swiper-pagination-bullets{b:1vw;}

  .food-head{
    flex-wrap: wrap;pb:36px;
    dl{w:25%;dt{pb:14px;}mt:26px;c:#666;}
    img{size:70px;}
  }
</style>
