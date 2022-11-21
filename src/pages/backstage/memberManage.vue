<template>
    <div class="main">
      <div class="bread">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>成员管理</el-breadcrumb-item>
          <el-breadcrumb-item>{{status}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="menu">
        <el-menu mode="horizontal" default-active="/backstage/membermanage/organization?id=1" router>
          <el-menu-item index="/backstage/membermanage/organization?id=1" @click="handdle(1)">教学科研机构(学院)</el-menu-item>
          <el-menu-item index="/backstage/membermanage/organization?id=2" @click="handdle(2)">本科生院(书院)</el-menu-item>
          <el-menu-item index="/backstage/membermanage/organization?id=3" @click="handdle(3)">校团委</el-menu-item>
          <el-menu-item index="/backstage/membermanage/organization?id=4" @click="handdle(4)">学生社团/工作室</el-menu-item>
          <el-menu-item index="/backstage/membermanage/organization?id=5" @click="handdle(5)">党政服务机构</el-menu-item>
        </el-menu>
      </div>
      <router-view></router-view>
    </div>
  </template>
  <script setup>
  import {getTypeList} from "../../http/api/memberManage"
  
  getTypeList().then(
    (res)=>{console.log(res);}
  )
  let status = ref('教学科研机构(学院)')

  const handdle = (num)=>{
      switch(num){
          case 1: status.value = '教学科研机构(学院)';break; //id  "1"
          case 2: status.value = '本科生院(书院)';break; //id "2"
          case 3: status.value = '校团委';break;//id "3"
          case 4: status.value = '学生社团/工作室';break;//id "4"
          case 5: status.value = '党政服务机构';break;//id "5"
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
  