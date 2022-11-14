<template>
  <Head :info="info"></Head>

  <div class="content">
    <div class="left">
      <LeftBar></LeftBar>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
let info = reactive({
  ico: new URL("../assets/customer.png", import.meta.url).href,
  name: "gaofei",
});
</script>

<style lang="less" scoped>
.content {
  display: flex;
  .left {
    min-width: 0;
    flex: 1;
  }

  .right{
    min-width: 0;
    flex:9;
  }
}
</style>
