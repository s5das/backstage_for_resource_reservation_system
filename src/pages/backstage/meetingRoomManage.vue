<template>
  <div class="main">
    <div class="leftbar" >
      <el-menu mode="horizontal" class="el-menu-vertical-demo" router>
        <el-menu-item
          :index="'/backstage/meetingRoomManage/mainpage/' + item.id"
          v-for="item in option"
        >
          {{ item.roomName }}
        </el-menu-item>
      </el-menu>
    </div>

    <div class="right">
      <div class="top">
        <el-form :model="form" label-width="80px" size="small" ref="formref">
          <div style="display: flex;justify-content: flex-end;">
            <!-- <div class="search-item">
              <el-form-item label="容纳人数" prop="capacity">
                <el-select v-model="form.capacity">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="search-item">
              <el-form-item label="投影">
                <el-select v-model="form.hasProjector">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="search-item">
              <el-form-item label="电脑">
                <el-select v-model="form.hasComputer">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="search-item">
              <el-form-item label="WIFI">
                <el-select v-model="form.hasWifi">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="search-item">
              <el-form-item label="会议室名称">
                <el-input v-model="form.roomName"></el-input>
              </el-form-item>
            </div>
            <div class="search-item">
              <el-form-item>
                <el-button type="primary" size="small" @click="onSearch"
                  >查询</el-button
                >
              </el-form-item>
            </div> -->
           
          </div>
        </el-form>
      </div>
       <div class="search-item">
              <el-date-picker
                v-model="time"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="选择时间"
                @change="change"
              />
            </div>
            <br>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
// 1583328598863986689 id

import { getRoomList } from "../../http/api/meetingRoom";

let option = ref([]);
let search_name = "";
let search_id = "1583328598863986689";
let search_capacity = 0;
let search_hasComputer = false;
let search_hasPowerStrip = false;
let search_hasProjector = false;
let search_hasWifi = false;

const getinfo = () => {
  getRoomList(
    search_name,
    search_id,
    search_capacity,
    search_hasComputer,
    search_hasPowerStrip,
    search_hasProjector,
    search_hasWifi
  ).then((res) => {
    console.log(res.items);
    option.value = res.items;
  });
};

let options1 = [
  {
    value: 1,
    label: "1人",
  },
  {
    value: 2,
    label: "2人",
  },
  {
    value: 3,
    label: "3人",
  },
  {
    value: 4,
    label: "4人",
  },
  {
    value: 5,
    label: "5人",
  },
  {
    value: 6,
    label: "6人",
  },
  {
    value: 7,
    label: "7人",
  },
  {
    value: 8,
    label: "8人",
  },
  {
    value: 9,
    label: "9人",
  },
  {
    value: 10,
    label: "10人",
  },
];
let options2 = [
  {
    value: false,
    label: "无",
  },
  {
    value: true,
    label: "有",
  },
];

let formref = ref();
let form = reactive({
  roomName: "",
  buildingId: "",
  capacity: 0,
  hasComputer: false,
  hasProjector: false,
  hasWifi: false,
});

const onSearch = () => {
  search_name = form.roomName;
  search_capacity = form.capacity;
  search_hasComputer = form.hasComputer;
  search_hasProjector = form.hasProjector;
  search_hasWifi = form.hasWifi;
  getinfo();
};

let time = ref(
  new Date().getFullYear() +
    "-" +
    (new Date().getMonth() + 1) +
    "-" +
    new Date().getDate()
);
provide("time", time);

const change = () => {};

getinfo();
</script>

<style lang="less" scoped>
.main {
  // display: flex;
 .leftbar {
    // flex: 1;
    background-color: #f0f0f2;
  }
  .right {
    // flex: 9;
    overflow-x: hidden;
   
    padding: 10px;
  }
  .search-item {
    width: 300px;
  }
}
</style>
