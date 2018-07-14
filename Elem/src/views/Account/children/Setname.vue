<template>
  <div class="set-name">
    <el-input  placeholder="请输入修改内容" @input="inputIng" v-model="uname"></el-input>
    <h4 v-if="eran" class="font26">昵称只能修改一次(3-24字符之间)</h4>
    <p class="fz30 animated" v-else :class="{'shake':erans}">用户名长度在3到24位之间</p>
      <el-button type="primary" @click="resetName">确认修改</el-button>
  </div>
</template>

<script>
  import {mapMutations,mapState}  from 'vuex'
    export default {
      data(){
        return{
          eran:true,
          erans:false,
          uname:''

        }
      },
      computed:{
        ...mapState(['userInfo'])
      },
      methods:{
        ...mapMutations(['RESET_NAME']),
        inputIng(){
          if(this.uname.length<3||this.uname.length>24){
            this.eran=false;
            this.erans=true;
            return false;
          }else{
            this.eran=true;
            this.erans=false;
            return true;
          }
        },
        resetName(){
          if(!this.inputIng()){
            return false;
          }else {
            this.RESET_NAME(this.uname);
            this.$router.go(-1);
          }
        }
      }
    }
</script>

<style scoped>
  .set-name{
    p:40px 26px;
    .el-input__inner{h:8vw;lh:8vw;}
    p{c:red;}
    p,h4{m:26px 0;}
    .el-button--primary{w:100%;p:24px 0;fz:32px;}
  }

</style>
