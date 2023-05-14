<template>
  <teleport to="body">
    <div class="mask">
      <div class="content">
        <div class="head">
          <div style="display: flex; align-items: center;">
              <img src="../assets/reject.png" width="34" height="30" > 
        
           <strong style="margin-bottom: 0">&nbsp;&nbsp;&nbsp;删除确认</strong>
          </div>
          
           <el-icon :size="20" @click="emits('close')"><CloseBold /></el-icon>
        </div>
        <div class="text">
            <br>
        &nbsp;是否确认删除？
        </div>
        <br>
        <div class="bottom" > 
          <div class=button>
              <el-button
                type="info"
                size="default"
                @click="emits('close')"  
                style=" margin-left: 5px; width: 93.8px; height: 40.2px;"
                >取消</el-button
              >
                   <el-button
              type="danger" 
                size="default"
              @click="delpartmenember"
              style="  margin-left: 5px;width: 93.8px; height: 40.2px">
              删除</el-button>
           
              </div>
              </div>
            </div>
          </div>          
  </teleport>
  </template>

<script setup>
  import { CloseBold, Picture as IconPicture } from "@element-plus/icons-vue";
  const emits = defineEmits(["close"]);
  const props = defineProps(["id"]);
  import{removeMember}from "../http/api/memberManage";



  const delpartmenember = () => {
    removeMember(props.id)
    .then(
    ()=>{
        ElMessage({
        type: "success",
        message: "操作成功",
        });
        emits("close");
    }
  )
};
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
      height: 217px;
      width: 425px;
      background-color: #fff;
        .head {
          font-size: 20px;
         padding: 20px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;

      }
      .text{
        margin-left: 65px;
      }
      
        .bottom {
          margin-right: 35px;
          margin-top:26px;
        .input{
          width:95%
        }
        .button{
          width: 100%;
          display:flex;
        justify-content:end;
        }
        }
      }
</style>