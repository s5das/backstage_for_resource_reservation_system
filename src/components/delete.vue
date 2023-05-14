<template>
  <teleport to="body">
    <div class="mask">
      <div class="content">
        <div class="head">
          <img src="../assets/reject.png" width="34" height="30" > 
           &nbsp;<strong>删除确认</strong>
        </div>
        <div>
            <br>
            是否确认删除？
        </div>
        <br>
        <div class="bottom" > 
                <div class=button>
                      <el-button
                type="info"
                size="default"
                @click="emits('close')"  
                style=" margin: 5px"
                >取消</el-button
              >
                   <el-button
              type="danger" 
                size="default"
              @click="rejectItem"
              style="margin:5px">
              删除</el-button>
           
              </div>
              </div>
            </div>
          </div>          
  </teleport>
  </template>

<script>
</script>


<style  lang="less" scoped>
    .mask {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 99;
    }
    .content {
      height: 170px;
      width: 330px;
      background-color: #fff;
      padding-left: 30px;
        .head {
        padding: 10px;
        padding-left: 0px;
        height: 30px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
        .bottom {
        .input{
          width:95%
        }
        .button{
          width: 96%;
          display:flex;
        justify-content:end;
        }
        }
      }
</style>