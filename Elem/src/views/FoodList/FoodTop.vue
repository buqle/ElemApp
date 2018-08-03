<template>
    <div class="nav-cont">
      <div class="nav-tit">
       <h4>
         {{$route.query.title}}
         <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
           <polygon points="0,3 10,3 5,8"/>
         </svg>
       </h4>
        <transition name="showlist" v-show="category">
          <section v-show="sortBy==='food'">
            123
          </section>
        </transition>
      </div>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          geohash:'',
          category:null,
          sortBy:''//筛选条件
        }
      }
    }
</script>

<style scoped>
  .showlist-enter-active, .showlist-leave-active {
    transition: all .3s;
    transform: translateY(0);
  }
  .showlist-enter, .showlist-leave-active {
    opacity: 0;
    transform: translateY(-100%);
  }
</style>
