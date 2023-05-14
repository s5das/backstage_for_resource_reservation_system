<template>
  <teleport to="body">
    <div class="mask">
      <div class="content">
        <div class="head">
          <img src="../assets/pass.png" width="30" height="30" > 
           &nbsp;管理员备注:
        </div>
        <div class="bottom" > 
                <div class="input">
                  <el-input
                    v-model="textarea2"
                    :rows="8"
                    type="textarea"
                    placeholder="请输入..."
                  />
                </div>
                <div class=button>
                      <el-button
                type="info"
                size="default"
                @click="emits('close')"  
                style="margin: 5px; width: 93.8px; height: 40.2px;margin-right:21.44px; margin-top:14.06px"
                >取消</el-button
              >
                <el-button
                type="primary"
                size="default"
                @click="passItem"
                class="blue"
                style="margin: 5px; width: 93.8px; height: 40.2px; margin-top:14.06px"
                >通过</el-button
              >
           
              </div>
              </div>
            </div>
          </div>          
  </teleport>
  </template>

<script setup>
import { CloseBold, Picture as IconPicture } from "@element-plus/icons-vue";
import { getDetail, pass, save, cancel } from "../http/api/order";
import {getInfoById} from "../http/api/meetingRoom"
const emits = defineEmits(["close",'refresh']);
const props = defineProps(["status", "id","meetingRoomId"]);
let textarea2 = ref("");

const passItem = () => {
  ElMessageBox.confirm("是否确认通过？", "通过确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      return pass(props.id);
    })
    .then(()=>{
      return save(props.id,textarea2.value);
    })
    .then(() => {
      ElMessage({
        type: "success",
        message: "操作成功",
      });
      emits("close");
      emits('refresh')
      
    });
};


</script>
      
<style  lang="less" scoped>

.blue{
  background-color: #2a77f4;
  border-color:#2a77f4 ;
}
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
  height: 309px;
  width: 666px;
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