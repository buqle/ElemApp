<template>
    <div class="sreach-add">
      <div class="bgfff sreach-add-con1" flexcont flexcont2>
        <el-input placeholder="请输入小区/写字楼/学校等" prefix-icon="el-icon-search" v-model="inputAdd"></el-input>
        <el-button type="primary" @click="inputThing">确定</el-button>
      </div>
      <p class="pip1 font28 text-center">为了满足商家的送餐要求，建议您从列表中选择地址</p>
      <p class="pip2 fz30 text-center" v-show="waring">
        找不到地址？<br>
        请尝试输入小区、写字楼或学校名 <br>
        详细地址（如门牌号）可稍后输入哦。
      </p>
      <dl v-show="adressList.length>0" v-loading="loading" class="font28">
        <dt v-for="(item,index) in adressList" @click="choseList(index)">
          <p>{{item.name}}</p>
          <p>{{item.address}}</p>
        </dt>
      </dl>
    </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex';
  import {searchList} from "@/Utils/getData";

  export default {
        data(){
          return{
            waring:true,
            inputAdd:'',
            adressList:[]
          }
        },
      computed:{
        ...mapState(['loading','adress'])
      },
      created(){
        this.inputAdd=this.adress.list?this.adress.list:this.inputAdd
      },
      methods:{
        ...mapMutations(['ADD_ADRESS']),
          async inputThing(){
            if(this.adress.keyword==this.inputAdd){
              return false;
            }
            if(!this.inputAdd){
              this.$message({
                message: '请输入您的地址',
                type: 'warning'
              });
              return false
            };
            this.waring=false;
            this.$store.state.adress.keyword=this.inputAdd;
            this.$store.state.loading=true;
           let res=await  searchList({keyword:this.inputAdd,type:'nearby'});
            this.adressList=res;
            this.$store.state.loading=false;
            if(this.adressList.length==0){
              this.waring=true;
            }
          },
        choseList(i){
          this.ADD_ADRESS(this.adressList[i].name);
          this.$router.go(-1);
        }
      }
    }
</script>

<style scoped>
  .sreach-add{
    .sreach-add-con1{
      p:26px;justify-content: space-between;
      .el-button--primary{p:18px 36px;fz:28px;}
    }
    .pip1{bg:#FFF6E4;p:16px 20px;c:#FF883F;}
    .pip2{c:#8e8484;pt:160px;lh:60px;}
    dt{bdb:1px solid #dedddd;c:#666;p:16px;lh:50px;}
  }
</style>
