<template>
  <div class="nav-cont">
    <div class="nav-tit bgfff text-center" flexcont>
      <h4 @click="chooseType('food')" :class="{'act':sortBy=='food'}" class="font28">
        {{this.tits}}
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
        <section v-show="sortBy==='filter'" class="filter-list bgfff font26">
          配送方式
          <dl flexcont flexcont2 style="margin-bottom: 2vw;">
            <dt v-for="(item,index) in geoList.filterList" flexcont flexcont2 :key="index" @click="selectFilterId(item.id)">
              <svg :style="{opacity:(item.id==0)&&(food.filterId!==0)?0:1}">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="food.filterId==item.id?'#selected':'#fengniao'"></use>
              </svg>
              <span :class="{'on':food.filterId==item.id}">{{item.text}}</span>
            </dt>
          </dl>
          商家属性(可多选)
          <dl flexcont flexcont2 class="filter-list-dl">
            <dt flexcont flexcont2 v-for="(item,index) in shopList" :key="index" @click="shopId(index,item.id)">
              <svg v-show="food.shopListArr[index].status">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
              </svg>
              <i :style="{color:`#${item.icon_color}`,borderColor:`#${item.icon_color}`}" v-show="!food.shopListArr[index].status">{{item.icon_name}}</i>
              {{item.name}}
            </dt>
          </dl>
        </section>
      </transition>

    </div>
  </div>
</template>

<script>
  import {mapActions,mapState} from 'vuex';
  import {getImgPath} from "@/configs/url";
  import {getFilterList} from '@/Utils/getData';

  export default {
    props:['tits'],
    data(){
      return{
        geohash:'',
        sortBy:'',//筛选条件
        food:{
          tit:this.$route.query.title,
          categoryArr:null,//右侧分类
          restaurant_category_id:'',
          restaurant_category_ids:'',//右侧id,
          filterId:null,
          filterNum:0,
          shopListArr:[]
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
      ...mapState(['geoList','foodList','shopList'])
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
        this.$emit('tit',name)
        //console.log(this.$route.query.title)
      },

      //选择配送方式
      selectFilterId(id){
        if(this.food.filterId==null){
          this.food.filterNum++;
          this.food.filterId=id
        }else if(this.food.filterId==id){
          this.food.filterNum--
          this.food.filterId=null
        }else {
          this.food.filterNum=id
        }
      },

      //商家属性反选
      shopId(index,id){
        this.$set(this.food.shopListArr,[index],{status:!this.food.shopListArr[index].status,id:id})

      },

      ...mapActions(['getFoodlist','getShopLists']),
      async initData(){
        this.food.restaurant_category_id=this.$route.query.restaurant_category_id;
        if(this.foodList.length>0){
          return false;
        };
        this.$store.state.geoList.filterList=await getFilterList({latitude:this.geoList.latitude,longitude:this.geoList.longitude,kw:''});
        this.getFoodlist({latitude:this.geoList.latitude,longitude:this.geoList.longitude});
        await this.getShopLists({latitude:this.geoList.latitude,longitude:this.geoList.longitude,kw:''})
        this.shopList.forEach((item,index)=>{
          this.food.shopListArr[index]={status:false,id:item.id}
        })
      }
    },
    async created(){
      await this.initData();
      this.foodList.forEach(item=>{
        if(this.food.restaurant_category_id==item.id){
          this.food.categoryArr=item.sub_categories;//选取对应的右侧菜单
        }
      });

    },
    //离开组件
    destroyed(){

      //this.$set(this.food.shopListArr,[0],{})
      //this.food.tit=this.$route.query.title
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

  .filter-list{
    p:24px 30px;
  dl{
  svg{size:5vw;}mt:20px;
  dt{bd:1px solid #eee;fz:25px;c: #666;mr:20px;span.on{c:#3190e8;}size:200px 60px;pl:16x;}
  }
  .filter-list-dl{
    flex-wrap: wrap;
  dt{mb:14px;}
  i{bd:1px solid;p:0 6px;bdrs:4px;}
  svg{fill:#3190e8;}
  }
  }



</style>
