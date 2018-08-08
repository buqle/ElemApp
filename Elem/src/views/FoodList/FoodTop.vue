<template>
    <div class="nav-cont">
      <div class="nav-tit bgfff text-center" flexcont>
       <h4 @click="chooseType('food')" :class="{'act':sortBy=='food'}" class="font28">
         {{food.tit}}
         <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
           <polygon points="0,3 10,3 5,8"/>
         </svg>
       </h4>
        <h4 @click="chooseType('sort')" :class="{'act':sortBy=='sort'}" class="font28">
          排序
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </h4>
        <h4 @click="chooseType('filter')" :class="{'act':sortBy=='filter'}" class="font28">
          筛选
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </h4>
      </div>
      <div>
        <transition name="showlist" v-show="foodList.length>0">
          <section v-show="sortBy==='food'">

          </section>
        </transition>

        <transition name="showlist">
          <section v-show="sortBy==='sort'">
            排序
          </section>
        </transition>

        <transition name="showlist">
          <section v-show="sortBy==='filter'">
            筛选
          </section>
        </transition>

      </div>
    </div>
</template>

<script>
  import {mapActions,mapState} from 'vuex';

    export default {
      data(){
        return{
          geohash:'',
          sortBy:'',//筛选条件
          food:{
            tit:this.$route.query.title,
            categoryArr:null
          }
        }
      },
      computed:{
        ...mapState(['geoList','foodList'])
      },
      methods:{
        chooseType(type){
          if(this.sortBy!==type){
            this.sortBy=type;
            if(type=='food'){
              this.food.tit='分类'
            }else {
              this.food.tit=this.$route.query.title
            }
          }else {
            this.sortBy=''
            this.food.tit=this.$route.query.title
          }
        },
        ...mapActions(['getFoodlist']),
        async initData(){
          if(this.foodList.length>0){
            return false;
          }
          await this.getFoodlist({latitude:this.geoList.latitude,longitude:this.geoList.longitude});
          this.categoryArr.forEach(item=>{

          })
        }
      },
      created(){

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
  .nav-tit{
    p:26px 0;justify-content: space-around;c:#949191;
    .act{c:#3190e8; .sort_icon{fill: #3190e8;transform: rotate(180deg);}}
    h4{w:33.3%;}
    .sort_icon{transition: all .3s;fill: #949191;}
  }
</style>
