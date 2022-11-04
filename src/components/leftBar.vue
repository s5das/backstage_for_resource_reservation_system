<template>
  <div>
    <el-menu default-active="/backstage/order" class="el-menu-vertical-demo" router>
      <el-menu-item disabled>系统菜单</el-menu-item>
      <el-menu-item index="/backstage/order">预约审批</el-menu-item>
      <el-menu-item index="/backstage/memberManage" >成员管理</el-menu-item>
      <el-menu-item index="/backstage/meetingRoomManage" >会议室管理</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup></script>

<style lang="less" scoped></style>
