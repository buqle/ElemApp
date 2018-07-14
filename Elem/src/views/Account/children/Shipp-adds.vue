<template>
    <div class="address-add" flexcont flexcont2>
        <div class="address-add-con1 bgfff">
          <el-input v-model="addname" placeholder="请填写您的姓名" @input="checkName"></el-input>
          <p class="animated font26" :class="{'shake':addname_msg}" v-if="addname_msg">{{this.addname_msg}}</p>

          <div @click="$router.push('/account/sreachADD')">
            <el-input placeholder="小区/写字楼/学校等"  readonly="readonly" v-model="adress.list"></el-input>
          </div>

          <el-input v-model="house" placeholder="请填写您的详细地址" @input="checkName"></el-input>
          <p class="animated font26" :class="{'shake':house_msg}" v-if="house_msg">{{this.house_msg}}</p>

          <el-input v-model="phone" placeholder="请填写您的手机号" @input="checkName"></el-input>
          <p class="animated font26" :class="{'shake':phone_msg}" v-if="phone_msg">{{this.phone_msg}}</p>

          <el-input v-model="phone2" placeholder="备用联系电话(必填)"@input="checkName"></el-input>
          <p class="animated font26" :class="{'shake':phone2_msg}" v-if="phone2_msg">{{this.phone2_msg}}</p>

          <input type="radio" value="0" v-model="radio"/><label>先生</label>
          <input type="radio" value="1" v-model="radio"/><label>女士</label>

        </div>
      <el-button type="primary" @click="Address">提交</el-button>
    </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex';
  import {deletList,addressAdd} from "@/Utils/getData";

  export default {
    data(){
      return{
        addname:'',
        house:'',
        house2:'',
        phone:'',
        phone2:'',
        addname_msg:'',
        house_msg:'',
        phone_msg:'',
        phone2_msg:'',
        radio:0
      }
    },
    computed:{
      ...mapState(['adress','userInfo'])
    },
    methods:{
      ...mapMutations(['ADDS_ADRESS','SECOND_LIST']),
      checkName(){
        if(!this.addname){
          this.addname_msg='姓名不能为空'
        }else {
          this.addname_msg=''
        }

        if(!this.house){
          this.house_msg='地址不能为空'
        }else if(this.house.length>0&&this.house.length<=3){
          this.house_msg='送餐地址太短，不能识别'
        }else {
          this.house_msg=''
        }

        if(!this.phone){
          this.phone_msg='手机号不能为空'
        }else if((/^[1][358][0-9]{9}$/).test(this.phone)){
          this.phone_msg=''
        }else {
          this.phone_msg='请输入正确的手机号码'
        }

        if(!this.phone2){
          this.phone2_msg='请输入备用手机号'
        }else if((/^[1][358][0-9]{9}$/).test(this.phone2)){
          this.phone2_msg=''
        }else {
          this.phone2_msg='请输入正确的手机号码'
        }
        this.SECOND_LIST({
          name:this.addname,
          phone:this.phone,
          address:this.house,
          address_detail:this.adress.list,
          phone_bk:this.phone2,
          geohash:this.adress.geohash,
          poi_type:0,
          sex:this.radio
        })


      },
      async Address(){
        console.log(this.radio)
        if(!this.addname||!this.house||!this.phone||!this.phone2){
          this.checkName();
          return false;
        }
        let res=await addressAdd(this.userInfo.user_id,{
          name:this.addname,
          phone:this.phone,
          address:this.house,
          address_detail:this.adress.list,
          phone_bk:this.phone2,
          geohash:this.adress.geohash,
          poi_type:0,
          sex:this.radio,
          tag:'公司',
          tag_type:4
        });
        if(res.message){
          alert(res.message)
        }else{
          this.ADDS_ADRESS({
            name:this.addname,
            phone:this.phone,
            address:this.house,
            address_detail:this.adress.list,
            phone_bk:this.phone2,
            geohash:this.adress.geohash,
            poi_type:0,
            sex:this.radio
          });
          this.$router.go(-1);
          this.$store.state.adress.secondList=null;
          this.$store.adress.list='';
        }
      }
    },
    mounted(){
      if(this.adress.secondList){
        this.addname=this.adress.secondList.name
      }

    },
    destroyed(){
      //this.$store.state.adress.secondList.name=''  //离开当前页面

    }

  }
</script>

<style scoped>
  .address-add{
  .el-button{w:90vw;fz:32px;p:16px;}
    mt:16px;
    .address-add-con1{
      p:24px;pb:0;mb:30px;    align-self: stretch;
    p{mb:16px;c: #6b65ce;}
    }
  flex-direction: column;
  }
</style>
