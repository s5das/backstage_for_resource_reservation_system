<template>
  <div class="main">
    <div class="title">会议室预约系统后台</div>
    <div class="info">
      <!-- <div class="ico">
        <img :src="info.ico" />
      </div>
      <div class="name">
        {{ info.name }}
      </div> -->
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  info: Object,
});
console.log(props);
</script>

<style lang="less" scoped>
.main {
  height: 60px;
  background-color:#2468a9 ;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    width: 300px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    font-weight: 600;
  }
  .info {
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    .ico {
        height: 30px;
        width: auto;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 5px;
        img{
            height: 100%;
            width: 100%;
        }
    }
    .name {
       color: #fff;
    }
  }
}
</style>
