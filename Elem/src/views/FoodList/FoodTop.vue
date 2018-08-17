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
      <div  class="pos-a">
        <transition name="showlist" v-show="foodList.length>0">
          <section v-show="sortBy==='food'" flexcont class="showlist-box pos-b bgfff font26 ww1">
            <dl class="showlist-box-dl1">
              <dt v-for="(item,index) in foodList" :key="index" flexcont :class="{'bgfff':food.restaurant_category_id==item.id&&index>0}" @click="selectCategroyName(item.id,index)">
                <p flexcont flexcont2>
                  <img :src="getImgPath(item.image_url)" alt="" v-if="index>0">
                  {{item.name}}
                </p>
                <p flexcont flexcont2>
                  <span class="text-center font24">{{item.count}}</span>
                  <svg v-if="index" width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1" class="category_arrow" >
                    <path d="M0 0 L6 4 L0 8"  stroke="#bbb" stroke-width="1" fill="none"/>
                  </svg>
                </p>
              </dt>
            </dl>
            <dl>
              <dt v-for="(list,index) in food.categoryArr" v-if="index>0" :class="{'act':food.restaurant_category_ids==list.id}" @click="selectCategroyRightName(list.id,list.name)">{{list.name}}</dt>
            </dl>
          </section>
        </transition>

        <transition name="showlist">
          <section v-show="sortBy==='sort'" class="sort_list bgfff">
            <p v-for="(item,index) in sortList" flexcont flexcont2>
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="`#${item.icon}`"></use>
              </svg>
              <span>{{item.tit}}</span>
            </p>
          </section>
        </transition>

        <transition name="showlist">
          <section v-show="sortBy==='filter'" class="filter-list">
            配送方式
            <p>

            </p>
          </section>
        </transition>

      </div>
    </div>
</template>

<script>
  import {mapActions,mapState} from 'vuex';
  import {getImgPath} from "@/configs/url";

  export default {
      data(){
        return{
          geohash:'',
          sortBy:'',//筛选条件
          food:{
            tit:this.$route.query.title,
            categoryArr:null,//右侧分类
            restaurant_category_id:'',
            restaurant_category_ids:''//右侧id
          },
          sortList:[
            {
              tit:'智能排序',
              icon:'icon-paixu',
              type:0
            },
            {
              tit:'距离最近',
              icon:'icon-zuobiao',
              type:5
            }
            ,
            {
              tit:'销量最高',
              icon:'icon-huo',
              type:6
            }
            ,
            {
              tit:'起送价最低',
              icon:'icon-qian',
              type:1
            }
            ,
            {
              tit:'配送速度最快',
              icon:'icon-qian',
              type:2
            }
            ,
            {
              tit:'评分最高',
              icon:'icon-xingxing',
              type:3
            }
          ]
        }
      },
    mixins: [getImgPath],
      computed:{
        ...mapState(['geoList','foodList'])
      },
      //mixins: [getImgPath],
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
        //左侧列表添加class
        selectCategroyName(id,index){
          if(index==0){
            this.food.restaurant_category_ids=null;
            this.sortBy='';
            //console.log(id)
          }else {
            this.food.restaurant_category_id=id;
            this.food.categoryArr=this.foodList[index].sub_categories;
          }
        },
        //右侧列表添加class
        selectCategroyRightName(id,name){
          this.food.restaurant_category_ids=id;
          this.sortBy='';
          this.food.tit=name;
          this.$emit('tit',name)
          //console.log(this.$route.query.title)
        },

        ...mapActions(['getFoodlist']),
        async initData(){
          this.food.restaurant_category_id=this.$route.query.restaurant_category_id
          if(this.foodList.length>0){
            return false;
          }
          await this.getFoodlist({latitude:this.geoList.latitude,longitude:this.geoList.longitude});
        }
      },
      async created(){
       await this.initData();
        this.foodList.forEach(item=>{
          if(this.food.restaurant_category_id==item.id){
            this.food.categoryArr=item.sub_categories;//选取对应的右侧菜单
          }
        })
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
    p:20px 0;justify-content: space-around;c:#949191;bdb:1px solid #ddd;
    .act{c:#3190e8; .sort_icon{fill: #3190e8;transform: rotate(180deg);}}
    h4{w:33.3%;    bdr: 1px solid #ccc;}
    h4:last-child{bdr:none;}
    .sort_icon{transition: all .3s;fill: #949191;}
  }
  .showlist-box{
    t:0;l:0;c:#545252;
    dt.act{bg:#fff;}
    dt{
      p:0 24px;h:10vw;lh:10vw;img{size:40px;mr:8px;} justify-content: space-between;

      p{
        span{size:40px;bg: #ff6f74;bdrs:50%;lh:40px;c:#fff;mr:10px;}
      }
    }
    dl{h:520px;overflow-y: auto;flex:1;}
    .showlist-box-dl1{bg:#e8e8e8;}

  }
  .sort_list{
    p:0px 34px;
    .icon{size:4.6vw;c:#3190e8;}
    span{bdb:1px solid #e4e4e4;flex:1;p:24px;fz:25px;c: #9e9d9b;}
    p{}
  }

</style>
