<template>
  <SearchArea2 @submit="submit" @addnew="addnew" />

  <div class="table-area" style="padding-left: 20px">
    <el-table :data="tableData" style="width: 100%" height="480">
      <el-table-column property="departmentName" label="组织名称" width="200" />
      <el-table-column property="timesSum" label="预约次数" width="170" />
      <el-table-column property="timesFail" label="违约次数" width="170" />
      <el-table-column property="memberNum" label="绑定成员数" width="180" />
      <el-table-column property="isDisabled" label="组织预约权限" width="250">
        <template #default="scope">
          <el-switch
            :model-value="scope.row ? scope.row.isDisabled : false"
            size="default"
            @change="changestatus(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        property="members"
        label="绑定成员"
        width="200"
        show-overflow-tooltip
      />

      <el-table-column label="操作" width="280">
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
          >
            绑定设置
          </el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click.prevent="delpartment(scope.row)"
            style="color: red"
          >
            删除此组织
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="pagecontroler">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="pagechange"
      v-model:current-page="page"
    />
  </div>
  <groupinfo v-if="show" :id="id" @close="close"></groupinfo>
   <div class="mask" v-if="show3">
  <div class="new" >
    <div class="head">
      <div>管理成员</div>
      <div>
        <el-icon :size="15" @click="show3 = false"><CloseBold /></el-icon>
      </div>
    </div>
    <div class="form-area2">
      <el-form :model="form_add" label-width="80px" :inline="false">
        <el-form-item label="组织名称">
          <el-input v-model="form_add.name"></el-input>
        </el-form-item>

        <el-form-item label="组织类型">
          <el-select v-model="form_add.type">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="form_add.person"></el-input>
        </el-form-item>
        <el-form-item>
              <el-button type="primary" @click="addneworg">新建组织</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  </div>
</template>

<script setup>
import {
  getInfoByPage,
  modifyPartmentIsDisabled,
  removeAdmin,
  addAdimin
} from "../../../http/api/memberManage";
import { CloseBold } from "@element-plus/icons-vue";

let form_add = reactive({
  name: "",
  type: "",
  person: "",
});

let options = [
  {
    value: "1582214160136019970",
    label: "职能部门",
  },
  {
    value: "1582214270727233537",
    label: "书院/学院",
  },
  {
    value: "1582217355755270145",
    label: "学生组织/工作室",
  },
];

let show3 = ref(false);

const addnew = () => {
  form_add.name = ''
  form_add.type = ''
  form_add.person =''
  show3.value = true;
};

const addneworg = ()=>{
  addAdimin(form_add.name,form_add.person,form_add.type).then(
    (res)=>{
      ElMessage({
      type:'success',
      message:'操作成功'
    }
    )
    show3.value = false
    }
  )
}



const tableData = ref([]);

let total = ref(0);
let page = ref(1);

const pagechange = () => {
  getinfo();
};

let search_departmentTypeId = "1582217355755270145";
let search_departmentName = "";
let search_name = "";

const submit = (formdata) => {
  search_departmentName = formdata.or_name;
  search_name = formdata.me_name;
  page.value = 1;
  getinfo();
};

const getinfo = () => {
  getInfoByPage(
    page.value,
    search_departmentTypeId,
    search_departmentName,
    search_name
  ).then((res) => {
    let templist = [];
    for (let i = 0; i < res.items.length; i++) {
      templist = [];
      for (let j = 0; j < res.items[i].members.length; j++) {
        templist.push(res.items[i].members[j].userName);
      }
      res.items[i].members = templist.join();
    }
    console.log(res);
    tableData.value = res.items;

    total.value = parseInt(res.total);
  });
};

let show = ref(false);
let id = ref("");
const getdetail = (data) => {
  id.value = data.row.id;
  show.value = true;
};

const close = () => {
  show.value = false;
  getinfo();
};

const changestatus = async (val) => {
  await modifyPartmentIsDisabled(val.id);
  getinfo();
};

const delpartment = (val) => {
  ElMessageBox.confirm("是否确认删除？", "确认删除", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    removeAdmin(val.id).then(() => {
      getinfo();
    });
  });
};

getinfo();
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
  bottom: 30px;
  left: 850px;
}
.mask{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
}
.new {
  position: absolute;
  top: 250px;
  left: 700px;
  padding: 10px;
  height: 350px;
  width: 350px;
  z-index: 999;
  background-color: #fff;
  border: #bbb 1px solid;
}
.form-area2 {
  height: 240px;
  margin-top: 30px;
}
.head{
  height: 80px;
  display: flex;
  justify-content: space-between;
}
</style>
