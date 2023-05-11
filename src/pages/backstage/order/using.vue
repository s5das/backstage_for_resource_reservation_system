<template>
  <SearchArea1 @submit="submit" />
  <div class="table-area" style="padding-left:20px;">
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{color: '#000000','text-align':'center'}" 
      :cell-style="{'text-align':'center'}"
      :row-style="{height:'50px',}"
    >
      <el-table-column property="orderNo" label="预约单号" width="200" />
      <el-table-column
        property="createTime"
        label="发起时间"
        width="210"
      />
      <el-table-column property="username" label="预约人" width="150" />
      <el-table-column property="mobile" label="联系方式" width="180" />
      <el-table-column
        property="useDepartmentName"
        label="使用单位"
        width="180"
      />
      <el-table-column property="roomName" label="预约会议室" width="170" />
      <el-table-column property="orderTime" label="预约时间" width="220" />
      <el-table-column
        property="title"
        label="会议主题"
        width="180"
        show-overflow-tooltip
      />

      <el-table-column  label="操作" width="180">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="getdetail(scope)"
          >
            查看
          </el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="getdetail(scope)"
            style="color: red"
          >
            驳回
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
  <Showdetail  :status="1" v-if="isshow" @close="isshow=false" @refresh="getinfo" :id="orderId" :meetingRoomId="meetingRoomId" :showpass="false" :showreject="true" />
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
import {getInfoByPage} from '../../../http/api/order'
let isshow = ref(false)

const getditail = () => {
  isshow.value = true;
};

const tableData = ref([]);


let total = ref(0);
let page = ref(1);

const pagechange = () => {
  getinfo()
}




let search_name = "";
let search_partment = "";
let search_room = "";
let search_time = "";

const submit = (formdata) => {
   
   search_name = formdata.name
   search_partment = formdata.partment
   search_room = formdata.number
   search_time= formdata.time
   page.value = 1
   getinfo()

};

const getinfo = () => {
    getInfoByPage(page.value,"1",search_name,search_partment,search_room,search_time).then(
      (res) => {
        for(let i = 0;i<res.items.length;i++){
          let temp = new Date(res.items[i].createTime)
          res.items[i].createTime = temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate() + ' '+temp.getHours()+':' + temp.getMinutes()
          res.items[i].orderTime = res.items[i].date + ' '+res.items[i].startTime + '-' +res.items[i].endTime
        }
        tableData.value = res.items
        total.value = parseInt(res.total) 
      }
    )
};

let orderId = ref('')
let meetingRoomId = ref('')
const getdetail = (data)=>{
  console.log(data.row.roomId);
  meetingRoomId.value = data.row.roomId
  orderId.value = data.row.id
  isshow.value = true
}




onMounted(() => {
  getinfo()
})
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
  width: 100px;
  height: 30px;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: auto;
}
.table-area{
  height: 400px;
  overflow-y: scroll;
}
</style>
