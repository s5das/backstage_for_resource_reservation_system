<template>
  <teleport to="body">
    <div class="mask">
      <div class="content">
        <div class="head">
          预约单详情
          <el-icon :size="20" @click="emits('close')"><CloseBold /></el-icon>
        </div>
        <div class="bottom">
          <div class="right" >
            <div class="right-1">
              <div class="a">
                <el-image
                  style="width: 200px; height: 150px"
                  :src="item2.avatar"
                  fit="fill"
                  :lazy="true"
                >
                  <template #error>
                    <div class="image-slot">
                      <el-icon><Icon-picture /></el-icon>
                    </div>
                  </template>
                </el-image>
              </div>
              <div class="b">
                <div
                  style="
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    flex: 1;
                    width: 200px;
                    font-weight: 800
                  "
                >
                  {{ item.roomName }}
                </div>
                <div style="display: flex; flex-direction: column; flex: 2">
                  <div
                    style="
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      width: 200px;
                    "
                  >
                    地点：{{ item2.buildingName }}
                  </div>
                  <div
                    style="
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      width: 200px;
                    "
                  >
                    开放时间: {{ item2.openTime +'-'+ item2.closeTime }}
                  </div>
                </div>
              </div>
            </div>
            <div class="right-2">
              <div style="margin-bottom: 15px;">可容纳人数：{{ item2.capacity }}人</div>
              <div style="margin-bottom: 15px;">投影：{{ item2.hasProjector?"提供投影":"不提供投影" }}</div>
              <div style="margin-bottom: 15px;">电脑：{{ item2.hasComputer?"提供电脑": "不提供电脑"}}</div>
              <div style="margin-bottom: 15px;">WiFi：{{ item2.hasWifi?"提供WiFi":"不提供WiFi" }}</div>
              <div style="margin-bottom: 15px;">其他信息：{{ item2.otherInfo||"无" }}</div>
            </div>
            <!-- <div class="right-3">
              <div class="textarea">
                <div class="label">驳回理由：</div>
                <div class="input">
                  <el-input
                    v-model="textarea3"
                    :rows="2"
                    type="textarea"
                    placeholder="Please input"
                  />
                </div>
              </div>
            </div> -->
          </div>
          <div class="left">
            <div class="box1">
            
              <div>
                <div class="hengzhi">
                  <div class="table"> &nbsp预约单号</div>
                  <div class="text">&nbsp{{ item.orderNo }}</div>
                </div>

                <div class="hengzhi">
                <div class="table"> &nbsp发起时间 </div>
                <div class="text">&nbsp{{ item.createTime }}</div>
                </div>

                <div class="hengzhi">
                  <div class="table"> &nbsp预约人 </div>
                  <div class="text">&nbsp{{ item.username }}</div>
                </div>

                <div class="hengzhi">
                  <div class="table"> &nbsp学号 </div>
                  <div class="text">&nbsp{{ item.userId }}</div>
                </div>

                <div class="hengzhi">
                  <div class="table"> &nbsp归属组织 </div>
                  <div class="text">&nbsp{{ item.departmentName }}</div>
                </div>

                <div class="hengzhi">
                  <div class="table"> &nbsp联系方式 </div>
                  <div class="text">&nbsp{{ item.mobile }}</div>
                </div>
              </div>
              <div>
                <div class="hengzhi">
                  <div class="table"> &nbsp预约单状态 </div>
                  <div class="text">&nbsp{{
                    item.status == "0"
                      ? "待审批"
                      : item.status == "1"
                      ? "待使用"
                      : item.status == "2"
                      ? "已使用"
                      : "已取消"
                  }}</div>
                </div>
                <div class="hengzhi">
                  <div class="table"> &nbsp使用单位 </div>
                  <div class="text">&nbsp{{ item.useDepartmentName }}</div>
                </div>
                <div class="hengzhi">
                  <div class="table"> &nbsp预约会议室 </div>
                  <div class="text">&nbsp{{ item.roomName }}</div>
                </div>
                <div class="hengzhi">
                  <div class="table"> &nbsp预约时间 </div>
                  <div class="text">&nbsp{{ item.startTime + "-" + item.endTime }}</div>
                </div>
                <div class="hengzhi">
                  <div class="table"> &nbsp使用人数 </div>
                  <div class="text">&nbsp{{ item.userNumber }}</div>
                </div>
                <div class="hengzhi">
                  <div class="table"> &nbsp会议室主题 </div>
                  <div class="text">&nbsp{{ item.title }}</div>
                </div>
              </div>
            </div>

            <div class="box2">
              <div class="textarea">
                <div class="label">用户备注：</div>
                <div class="input">
                  <el-input
                    v-model="textarea1"
                    :rows="5"
                    type="textarea"
                    disabled
                  />
                </div>
              </div>
              <!-- <div class="textarea">
                <div class="label">管理员备注：</div>
                <div class="input">
                  <el-input
                    v-model="textarea2"
                    :rows="2"
                    type="textarea"
                    placeholder="Please input"
                  />
                </div>
              </div> -->
            </div>
            <div class="btn-area">
              <el-button
                type="primary"
                size="default"
                @click="passItem"
                style="margin: 5px"
                v-if="showpass"
                >通过</el-button
              >
              <el-button
                type="primary"
                size="default"
                @click="saveItem"
                style="margin: 5px"
                v-if="showsave"
                >保存</el-button
              >
              <el-button 
              type="danger" 
              size="default" 
              @click="rejectItem"
              v-if="showreject"
              style="margin:5px">
              驳回</el-button>
            </div>
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
const props = defineProps(["status", "showpass", "showreject", "showsave","id","meetingRoomId"]);
let textarea1 = ref("");
let textarea2 = ref("");
let textarea3 = ref("");

let item = ref({});

const passItem = () => {
  ElMessageBox.confirm("是否确认通过？", "通过确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      return pass(props.id);
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

const saveItem = () => {
      save(props.id,textarea2.value)
    .then(
      ()=>{
        ElMessage({
          type:'success',
          message:'保存成功'
        })
        emits('close')
      }
    )
  }

const rejectItem = ()=>{

  ElMessageBox.confirm("是否确认驳回？", "通过驳回", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
  .then(
    ()=>{
      return cancel(props.id,textarea3.value)
    }
  )
  .then(
    ()=>{
      ElMessage({
        type:'success',
        message:'操作成功'
      })
      emits('close')
      emits('refresh')
    }
  )
}

let item2 = ref({})
onMounted(() => {
  getDetail(props.id).then((res) => {
    item.value = res.item;
    textarea2.value = res.item.adminOtherInfo
    textarea3.value = res.item.cancelReason
  });
  getInfoById(props.meetingRoomId).then((res)=>{
    item2.value = res.item
    
  })
});
</script>

<style lang="less" scoped>
.el-button {
font-size: 13px;
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
.textarea {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  flex-flow: column;
  .label {
    flex: 1.5;
  }
  .input {
    flex: 4;
  }
}
.content {
  height: 600px;
  width: 870px;
  background-color: #fff;
  padding-left: 30px;
  .head {
    padding: 10px;
    height: 30px;
    border-bottom: 1.5px #bbb solid;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .bottom {
    display: flex;
    .left {
      height: 550px;
      flex: 1.3;
      display: flex;
      flex-direction: column;
      padding: 10px;
      .box1 {
        // flex: 3;
        display: flex;
        margin-bottom: 15px;
        div {
          .text{
            width:200px
          }
          .table{
            text-align: left;
            width: 90px;
            height: 40px;
            margin-right: auto;    
            background-color: #bbb;
          }
          .hengzhi{
            display: flex;
            flex-direction: row;
          }
          margin: -1px;
          border: solid 1px black;
          // display: flex;
          // flex-direction: column;
          // justify-content: space-around;
          line-height: 40px;
        }
      }
      .box2 {
        flex: 1.5;
      }
      .btn-area {
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
    }
    .right {
      height: 500px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      // flex: 1;
      .right-1 {
        // display: flex;
        // flex: 1;
        text-align: center;
        .a {
          flex: 1;
        }
      }
      .b {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        flex: 1.5;
        line-height: 30px;
        
      }
      .right-2 {
        flex: 1;
        text-align: center;
        line-height: 30px;
      }
      .right-3 {
        flex: 0.8;
      }
      .right-4 {
        flex: 0.3;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
