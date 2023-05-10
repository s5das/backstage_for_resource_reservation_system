<template>
  <SearchArea2 @submit="submit" @addnew="addnew" ref="search_area" />

  <div class="table-area" style="padding-left: 20px">
    <el-table :data="tableData" 
    style="width: 100%" 
    height="480"  
    :header-cell-style="{color: '#000000','text-align':'center'}" 
    :cell-style="{'text-align':'center'}"
    :row-style="{height:'50px'}">
      <el-table-column property="departmentName" label="组织名称" width="320" />
      <el-table-column property="timesSum" label="预约次数" width="160" />
      <el-table-column property="timesFail" label="违约次数" width="160" />
      <el-table-column property="memberNum" label="绑定成员数" width="160" />
      <el-table-column property="isDisabled" label="禁止组织预约" width="320">
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
        width="260"
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
    <div class="new">
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
  addAdimin,
} from "../../../http/api/memberManage";
import { CloseBold } from "@element-plus/icons-vue";
import {getTypeList} from "../../../http/api/memberManage"


let props = defineProps(["departmentTypeId"]);
let search_area = ref();
console.log(props.departmentTypeId);

watch(
  () => props.departmentTypeId,
  () => {
    page.value = 1;
    search_area.value.form.resetFields();
    getinfo();
  }
);

let form_add = reactive({
  name: "",
  type: "",
  person: "",
});

let options = reactive([]);

getTypeList().then(

   (res)=>{
      console.log(res);
      for(let i =0;i< res.items.length;i++ ){
         options.push({
          
          value:res.items[i].id,
          label:res.items[i].departmentTypeName
         })
      }

   }

)


let show3 = ref(false);

const addnew = () => {
  form_add.name = "";
  form_add.type = "";
  form_add.person = "";
  show3.value = true;
};

const addneworg = () => {
  addAdimin(form_add.name, form_add.person, form_add.type).then((res) => {
    ElMessage({
      type: "success",
      message: "操作成功",
    });
    show3.value = false;
  });
};

const tableData = ref([]);

let total = ref(0);
let page = ref(1);

const pagechange = () => {
  getinfo();
};

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
    props.departmentTypeId,
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
.table-area {
  height: 400px;
  overflow-y: scroll;
}
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
  bottom: 20px;
  left: 0;
  margin: auto;
  right: 0;
}
.mask {
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
.head {
  height: 80px;
  display: flex;
  justify-content: space-between;
}
</style>
