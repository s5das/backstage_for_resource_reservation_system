<template>
    <div class="main">
      <div class="bread">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>成员管理</el-breadcrumb-item>
          <el-breadcrumb-item>{{status}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="menu">
        <el-menu mode="horizontal" default-active="/order/approving" router>
          <el-menu-item index="/backstage/membermanage/department" @click="handdle(1)">职能部门</el-menu-item>
          <el-menu-item index="/backstage/membermanage/college" @click="handdle(2)">书院/学院</el-menu-item>
          <el-menu-item index="/backstage/membermanage/organization" @click="handdle(3)">学生组织/工作室</el-menu-item>
        </el-menu>
      </div>
      <router-view></router-view>
    </div>
  </template>
  <script setup>
  import {ref} from 'vue'
  let status = ref('职能部门')
  const handdle = (num)=>{
      switch(num){
          case 1: status.value = '职能部门';break;
          case 2: status.value = '书院/学院';break;
          case 3: status.value = '学生组织/工作室';break;
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
  