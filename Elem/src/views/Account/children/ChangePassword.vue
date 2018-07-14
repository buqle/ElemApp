<template>
  <div class="changepass" flexcont flexcont2>
   <div class="changepass-con1">
     <el-input v-model="pserson.username" placeholder="请输入账号" maxlength="11"></el-input>
     <el-input v-model="pserson.oldPassWord" placeholder="请输入旧密码" type="password"></el-input>
     <el-input v-model="pserson.newPassWord" placeholder="请输入新密码" type="password"></el-input>
     <el-input v-model="pserson.confirmPassWord" placeholder="请确认新密码" type="password"></el-input>
     <div flexcont flexcont2 class="changepass-con2 bgfff font28">
       <el-input v-model="pserson.captcha_code" placeholder="请输入验证码" ></el-input>
       <p @click="getcapCodeFun" flexcont flexcont2>
         <img :src="imgCodeUrl" alt="">
         <span>
           看不清<br><i>换一张</i>
         </span>
       </p>
     </div>
   </div>
    <el-button type="primary" @click="changeFun">确认修改</el-button>
  </div>
</template>

<script>
  import {getcapCode,changePassWord} from '@/Utils/getData'
    export default {
        data(){
          return{
            pserson:{
              username:'',
              oldPassWord:'',
              newPassWord:'',
              confirmPassWord:'',
              captcha_code:'',
            },
            imgCodeUrl:''
          }
        },
      methods:{
        async changeFun(){
          if(!this.pserson.username){
            this.$message({
              message:'用户名不能为空',
              duration:1000
            });
            return false;
          }else if(!this.pserson.oldPassWord){
            this.$message({
              message:'旧密码不能为空',
              duration:1000
            });
            return false;
          }else if(!this.pserson.newPassWord){
            this.$message({
              message:'新密码不能为空',
              duration:1000
            });
            return false;
          }else if(this.pserson.newPassWord==this.pserson.oldPassWord){
            this.$message({
              message:'新密码不能和旧密码重复',
              duration:1000
            });
            return false;
          }else if(!this.pserson.confirmPassWord){
            this.$message({
              message:'请确认密码',
              duration:1000
            });
            return false;
          }else if(this.pserson.confirmPassWord!=this.pserson.newPassWord){
            this.$message({
              message:'俩次密码输入不一致',
              duration:1000
            });
            return false;
          }else {
            let change=await changePassWord(this.pserson);
            if(change.message){
              this.$message({
                message:change.message,
                duration:1000
              });
              this.getcapCodeFun();
              return false
            }else {
              this.$message({
                message:'密码修改成功',
                duration:1000
              });
            }
          }
        },
        async getcapCodeFun(){
          let res=await getcapCode();
          if(res.status==1){
            this.imgCodeUrl=res.code
          }

        }
      },
      mounted(){
        this.getcapCodeFun()
      },

    }
</script>

<style scoped>
  .changepass{
    flex-direction: column;
  .changepass-con1{
    align-self: stretch;
  }
    .el-button{
      w:90vw;p:20px;fz:30px;
    }
    .changepass-con2{
      c:#ccc;i{c: #409dff;}
      pr:20px;justify-content: space-between;img{mr:14px;}
    }
  }
</style>
