<template>
    <search-area2></search-area2>
    <div class="table-area" style="padding-left:20px;">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column property="order_id" label="预约单号" width="150" />
        <el-table-column
          property="order_start_time"
          label="发起时间"
          width="180"
        />
        <el-table-column property="person" label="预约人" width="120" />
        <el-table-column property="phone_number" label="联系方式" width="150" />
        <el-table-column
          property="order_apartment"
          label="使用单位"
          width="150"
        />
        <el-table-column property="order_room" label="预约会议室" width="150" />
        <el-table-column property="order_time" label="预约时间" width="180" />
        <el-table-column
          property="order_item"
          label="会议主题"
          width="150"
          show-overflow-tooltip
        />
  
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="getditail"
            >
              查看
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="deleteRow(scope.$index)"
            >
              通过
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="deleteRow(scope.$index)"
              style="color: red"
            >
              驳回
            </el-button>
          </template>
        </el-table-column>
      </el-table>
  
    </div>
    <Showdetail :status="1" :isshow="isshow" @close="isshow=false"/>
    <div class="pagecontroler">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="pagechange"
        v-model:current-page="page"
      />
    </div>
  </template>
  
  <script setup>
  let isshow = ref(false)
  
  const getditail = () => {
    isshow.value = true;
  };
  
  const tableData = reactive([
    {
      order_id: "202210070010",
      order_start_time: "2021-10-07 19:12:00",
      person: "gaofei",
      phone_number: "18257468263",
      order_apartment: "个人",
      order_room: "大活-211",
      order_time: "2021-10-07 19:12:00",
      order_item: "talking",
    },
    {
      order_id: "202210070010",
      order_start_time: "2021-10-07 19:12:00",
      person: "gaofei",
      phone_number: "18257468263",
      order_apartment: "个人",
      order_room: "大活-211",
      order_time: "2021-10-07 19:12:00",
      order_item: "talking",
    },
    {
      order_id: "202210070010",
      order_start_time: "2021-10-07 19:12:00",
      person: "gaofei",
      phone_number: "18257468263",
      order_apartment: "个人",
      order_room: "大活-211",
      order_time: "2021-10-07 19:12:00",
      order_item: "talking",
    },
    {
      order_id: "202210070010",
      order_start_time: "2021-10-07 19:12:00",
      person: "gaofei",
      phone_number: "18257468263",
      order_apartment: "个人",
      order_room: "大活-211",
      order_time: "2021-10-07 19:12:00",
      order_item: "talking",
    },
    {
      order_id: "202210070010",
      order_start_time: "2021-10-07 19:12:00",
      person: "gaofei",
      phone_number: "18257468263",
      order_apartment: "个人",
      order_room: "大活-211",
      order_time: "2021-10-07 19:12:00",
      order_item: "talking",
    },
    {
      order_id: "202210070010",
      order_start_time: "2021-10-07 19:12:00",
      person: "gaofei",
      phone_number: "18257468263",
      order_apartment: "个人",
      order_room: "大活-211",
      order_time: "2021-10-07 19:12:00",
      order_item: "talking",
    },
    {
      order_id: "202210070010",
      order_start_time: "2021-10-07 19:12:00",
      person: "gaofei",
      phone_number: "18257468263",
      order_apartment: "个人",
      order_room: "大活-211",
      order_time: "2021-10-07 19:12:00",
      order_item: "talking",
    },
    {
      order_id: "202210070010",
      order_start_time: "2021-10-07 19:12:00",
      person: "gaofei",
      phone_number: "18257468263",
      order_apartment: "个人",
      order_room: "大活-211",
      order_time: "2021-10-07 19:12:00",
      order_item: "talking",
    },
    {
      order_id: "202210070010",
      order_start_time: "2021-10-07 19:12:00",
      person: "gaofei",
      phone_number: "18257468263",
      order_apartment: "个人",
      order_room: "大活-211",
      order_time: "2021-10-07 19:12:00",
      order_item: "talking",
    },
    {
      order_id: "202210070010",
      order_start_time: "2021-10-07 19:12:00",
      person: "gaofei",
      phone_number: "18257468263",
      order_apartment: "个人",
      order_room: "大活-211",
      order_time: "2021-10-07 19:12:00",
      order_item: "talking",
    },
  ]);
  
  const handleSelectionChange = (selection) => {
    console.log(selection);
  };
  
  let total = ref(0);
  let page = ref(1);
  let search_name = "";
  let search_partment = "";
  let search_phone = "";
  let search_number = "";
  let search_time = "";
  
  const submit = () => {};
  const getinfo = () => {};
  </script>
  
  <style lang="less" scoped>
  
  .serch-area {
    height: 70px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    padding-top: 15px;
  }
  .pagecontroler {
    position: fixed;
    bottom: 80px;
    left: 850px;
  }
  </style>
  