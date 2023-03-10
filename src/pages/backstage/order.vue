<template>
  <div class="main">
    <div class="bread">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>预约审批</el-breadcrumb-item>
        <el-breadcrumb-item>{{status}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="menu">
      <el-menu mode="horizontal" default-active="/backstage/order/approving" router>
        <el-menu-item index="/backstage/order/approving" @click="handdle(1)">待审批</el-menu-item>
        <el-menu-item index="/backstage/order/using" @click="handdle(2)">待使用</el-menu-item>
        <el-menu-item index="/backstage/order/completed" @click="handdle(3)">已完成</el-menu-item>
        <el-menu-item index="/backstage/order/cancel" @click="handdle(4)">已取消</el-menu-item>
      </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>
<script setup>
import {ref} from 'vue'
let status = ref('待审批')
const handdle = (num)=>{
    switch(num){
        case 1: status.value = '待审批';break;
        case 2: status.value = '待使用';break;
        case 3: status.value = '已完成';break;
        case 4: status.value = '已取消';break;
    }
}
</script>

<style scoped lang="less">
.main {
  .bread {
    height: 50px;
    background-color: #f0f0f2;
    display: flex;
    align-items: center;
    padding-left: 15px;
  }
  .menu {
    height: 50px;
  }
}
</style>
