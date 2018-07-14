<template>
    <div class="address">
      <dl v-for="(item,index) in removeAddress" class="bgfff fz30" flexcont flexcont2>
        <dt>
          <p><span>地址:</span>{{item.address_detail}}{{item.address}}</p>
          <p><span>手机号:</span>{{item.phone}}</p>
        </dt>
        <dd v-if="edit.editIcon" class="el-icon-delete" @click="deleteList(index,item)"></dd>
      </dl>
      <h4 flexcont flexcont2 class="bgfff" @click="$router.push('/account/addressADD')">
        添加地址
        <i class="el-icon-arrow-right fz30"></i>
      </h4>
    </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex';
  import {deletList} from "@/Utils/getData";

  export default {
      computed:{
        ...mapState(['userInfo','removeAddress','edit'])
      },
      methods:{
        ...mapActions(['allLIST']),
        initData(){
          this.allLIST();
        },
        async deleteList(index,item){
          await deletList(this.userInfo.user_id,item.id);
          //alert(index)
          this.removeAddress.splice(index,1);
        }
      },
      mounted(){
        this.initData();
      },
      watch:{
        userInfo(){
          this.initData()
        }
      }
    }
</script>

<style scoped>
  .address{
    dl{
      justify-content: space-between;p:24px 24px 16px 10px;lh:48px;c:#847a64;span{c: #fd8b00;d:inline-block;w:110px;text-align: right;mr:12px;}
       bdb:1px solid #e0ddd7;
    }
  h4{
    bdb:1px solid #e0ddd7; bdt:1px solid #e0ddd7;justify-content: space-between;
    p:16px 36px;c:#666;
  }
  }
</style>
