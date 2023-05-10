<template>
  <div>
    <div class="info">
      <div class="info_left">
        <div class="item">
          <img :src="info.avatar" style="width:220px; height: 170px" />
        </div>
        <div
          class="item"
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
          "
        >
          <div style="font-size: 15px; font-weight: 600">
            {{ info.roomName }}
          </div>
          <div>
            <div>地点：{{ info.buildingName }}</div>
            <div>开放时间：{{ info.openTime + "-" + info.closeTime }}</div>
          </div>
        </div>
        <div
          class="item"
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
          "
        >
          <div>可容纳人数：{{ info.capacity }}</div>
          <div>投影：{{ info.hasProjector ? "是" : "否" }}</div>
          <div>电脑：{{ info.hasComputer ? "是" : "否" }}</div>
          <div>WiFi：{{ info.hasWifi ? "是" : "否" }}</div>
        </div>
        <div
          class="item"
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
          "
        >
          <div>其他信息： {{ info.otherInfo }}</div>
        </div>
      </div>
      <div class="info_right">
        <div class="status">
          禁止预约：<el-switch v-model="status" @change="changeStatus"></el-switch>
        </div>
        <div style="display: flex">
          <el-button type="primary" size="default" @click="edit"
            >编辑</el-button
          >
          <el-button type="danger" size="default" @click="deleteroom"
            >删除</el-button
          >
        </div>
      </div>
    </div>
    <div class="show-area">
      <SchedulingTable :minuteHeight="0.7" v-model="courses" :time="date"></SchedulingTable>
    </div>

    <div class="mask" v-if="show">
      <div class="edit-area">
        <div class="head">
          {{ info.roomName }}
          <el-icon :size="20" @click="show = false"><CloseBold /></el-icon>
        </div>
        <div class="form-area">
          <el-form label-width="80px">
            <el-form-item label="上传图片">
              <el-upload
                :file-list="fileList"
                action=""
                :http-request="upload"
                :on-preview="handlePictureCardPreview"
                list-type="picture-card"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="text" type="textarea" :rows="2"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
              <el-button @click="show = false">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script setup>
import { useRoute } from "vue-router";
import {
  getInfoById,
  getModifyInfoById,
  getOrder,
  modifyMessage,
  modifyStatusById,
  uploadPic,
} from "../../../http/api/meetingRoom.js";
import { Plus } from "@element-plus/icons-vue";
import { CloseBold } from "@element-plus/icons-vue";

const route = useRoute();

let time = inject("time");

console.log(time);

let id = route.params.id;
let info = ref({});

let status = ref();
const getinfo = () => {
  getInfoById(id).then((res) => {
    console.log(res);
    info.value = res.item;
    status.value = res.item.status;
  });
};

watch(
  () => route.params.id,
  () => {
    if (route.params.id) {
      id = route.params.id;
      getinfo();
      getTableInfo();
    }
  }
);

// changestatus
const changeStatus = () => {
  modifyStatusById(id).then(
    () => {
      getinfo();
    },
    () => {
      getinfo();
    }
  );
};

// edit

const fileList = ref([]);
let text = ref("");
let show = ref(false);

const edit = () => {
  getModifyInfoById(id).then((res) => {
    fileList.value.splice(0, fileList.value.length);
    for (let i = 0; i < res.item.avatars.length; i++) {
      fileList.value.push({
        url: res.item.avatars[i],
      });
    }
    text.value = res.item.otherInfo;
    show.value = true;
  });
};

const upload = (data) => {
  uploadPic(data.file).then((res) => {
    console.log(res);
    fileList.value.push({
      url: res.url,
    });
  });
};

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};

let date = reactive([])
// show-area
const getTableInfo = () => {
  getOrder(id, time.value).then((res) => {
    console.log(res);
    courses.splice(0,courses.length)
    date.splice(0,date.length)
    for (let i = 0; i < res.items.length; i++) {
      date.push(res.items[i].date)
      let list = res.items[i].list;
      for (let j = 0; j < list.length; j++) {
        list[j].startTime = list[j].startTime.split(":");
        list[j].startTime.forEach((element, index, arr) => {
          arr[index] = parseInt(element);
        });
        list[j].endTime = list[j].endTime.split(":");
        list[j].endTime.forEach((element, index, arr) => {
          arr[index] = parseInt(element);
        });
        courses.push({
          username: list[j].username,
          useDepartmentName: list[j].useDepartmentName,
          title: list[j].title,
          day: i + 1,
          start: list[j].startTime,
          end: list[j].endTime,
        });
      }
    }
    console.log(courses);
  });
};

let courses = reactive([]);

watch(time, () => {
  getTableInfo();
});

const deleteroom = () => {};

const onSubmit = () => {
  let avatars = [];
  for (let i = 0; i < fileList.value.length; i++) {
    avatars.push(fileList.value[i].url);
  }
  console.log(avatars);
  modifyMessage(avatars, id, text.value).then(() => {
    ElMessage({
      type: "success",
      message: "操作成功",
    });
    show.value = false;
    getinfo();
  });
};

getinfo();
getTableInfo();
</script>

<style lang="less" scoped>
.info {
  display: flex;
  height: 600px;
  width: 230px;
  flex-direction: column;
  .info_left {
    flex-direction: column;
    flex: 4;
    display: flex;
    .item {
      flex: 1;
    }
  }
  .info_right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
}
.show-area {
  position: absolute;
  top: 150px;
  left: 500px;
  height: 850px;
  overflow-y: hidden;
}
.mask {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  .edit-area {
    padding: 10px;
    height: 500px;
    width: 700px;
    background-color: #fff;
    .head {
      height: 60px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
