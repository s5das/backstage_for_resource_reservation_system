<template>
  <teleport to="body">
    <div class="mask">
      <div class="main">
        <div class="head">
          <div>{{ title }}</div>
          <div>
            <el-icon :size="20" @click="emits('close')"><CloseBold /></el-icon>
          </div>
        </div>
        <div class="base-info">
          <el-form :model="form" label-width="80px" :inline="false">
            <el-row :gutter="20">
              <el-col :span="8" :offset="0">
                <el-form-item label="组织名称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
                <el-col :span="8" :offset="0">
                <el-form-item label="负责人">
                  <el-input v-model="form.person"></el-input>
                </el-form-item>
              </el-col>
                  <el-col :span="8" :offset="0">
                <el-form-item label="联系方式">
                  <el-input v-model="form.personMobile"></el-input> <!--绑定联系方式给服务器 -->
                </el-form-item>
              </el-col>
            
            </el-row>
          </el-form>
        </div>
        <div class="search-area">
          <el-form :model="form2" label-width="80px" :inline="false">
            <el-row :gutter="20">
                        <el-col :span="8" :offset="0">
                <el-form-item label="组织类型">
                  <el-select v-model="form.type">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" :offset="0">
                <el-form-item label="成员姓名">
                  <el-input v-model="form2.membername"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="1" :offset="0">
                <el-form-item>
                  <el-button class="blue" type="primary" @click="onSearch" style="width: 70px; height: 30px">查询</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="1" :offset="1">
                <el-form-item>
                  <el-button class="blue" type="primary" @click="addnew" style="width: 98px; height: 30px">添加成员</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="table-area">
          <el-table 
          :data="tableData" 
          border 
          stripe 
          height="340" 
          :header-cell-style="{background:'#bbb',color:'black'}"> 
            <el-table-column
              v-for="col in columns"
              :prop="col.id"
              :key="col.id"
              :label="col.label"
              :width="col.width"
            >
            </el-table-column>

            <el-table-column label="禁止预约" width="150">
              <template #default="scope">
                <el-switch
                  :model-value="scope.row ? scope.row.isDisabled : false"
                  size="default"
                  @change="changestatus(scope.row)"
                />
              </template>
            </el-table-column>

            <el-table-column label="操作" width="150">
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  @click.prevent="update(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  link
                  type="primary"
                  @click.prevent="showDelpartmember(scope.row)"
                  style="color: red"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="button-area">
          <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <div>预约次数：{{times3}} 履约次数：{{times2}} 违约次数：{{times1}}</div>
            </el-col>
            <el-col :span="6" :offset="6">
              <el-button  type="info" size="default" @click="emits('close')" style= "width: 93.8px; height: 40.2px;"
                >取消</el-button
              >
              <el-button class="blue" type="primary" size="default" @click="save()" style= "width: 93.8px; height: 40.2px;"
                >保存</el-button
              >
            </el-col>
          </el-row>
        </div>
        <div class="new" v-if="show2">
          <div class="head">
            <div>管理成员</div>
            <div>
              <el-icon :size="15" @click="closeShow2"><CloseBold /></el-icon>
            </div>
          </div>
          <div class="form-area2">
            <el-form :model="add_form" :inline="false" label-width="100px">
              <el-form-item label="姓名">
                <el-input v-model="add_form.name"></el-input>
              </el-form-item>
              <el-form-item label="学号/学工号">
                <el-input v-model="add_form.id"></el-input>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input v-model="add_form.mobile"></el-input>
              </el-form-item>
             
            </el-form>
          </div>
           <div class="button">
                <el-button type="info" @click="closeShow2" class="btn2"  style="width:93.8px;height:40.2px">
                  取消
                </el-button>
                <el-button  type="primary" @click="save_gennewmember" class="btn" style="width:93.8px;height:40.2px">
                  保存
                </el-button>
              </div>
        </div>
        <div class="new" v-if="show3">
          <div class="head">
            <div>管理成员</div>
            <div>
              <el-icon :size="15" @click="closeShow3"><CloseBold /></el-icon>
            </div>
          </div>
          <div class="form-area2">
            <el-form :model="add_form" :inline="false" label-width="100px">
              <el-form-item label="姓名">
                <el-input v-model="add_form.name"></el-input>
              </el-form-item>
              <el-form-item label="学号/学工号">
                <el-input v-model="add_form.id"></el-input>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input v-model="add_form.mobile"></el-input>
              </el-form-item>
             
            </el-form>
          </div>
           <div class="button">
                <el-button type="info" @click="closeShow3" class="btn2" style="width:93.8px;height:40.2px">取消</el-button>
                <el-button type="primary" @click="save_manage" class="btn" style="width:93.8px;height:40.2px">保存</el-button>
              </div>

        </div>
      </div>
    </div>
  </teleport>
  <Delmember v-if="isDelpartmember" @close="closeDelpartmember" :id="memberId"></Delmember>
</template>

<script setup>
import {
  getPartmentDetail,
  modifyAdiminInfo,
  modifyIsDisabled,
  removeMember,
  addPartmentmember,
  modifyMemberInfo,
} from "../http/api/memberManage";
import {
  CloseBold,
} from "@element-plus/icons-vue";
import {getTypeList} from "../http/api/memberManage"
const emits = defineEmits(["close"]);
const props = defineProps(["id"]);

// add


let isDelpartmember= ref(false);

let show2 = ref(false);
let show3 = ref(false);

let add_form = reactive({
  name: "",
  id: "",
  mobile: "",
  userid: "",
});



const closeDelpartmember=()=>{
  isDelpartmember.value= false;
  getinfo();
}

const closeShow3=()=>{
  show3.value=false;
}

const closeShow2=()=>{
  show2.value=false;
}
const addnew = () => {
  add_form.name = "";
  add_form.id = "";
  add_form.mobile = "";
  add_form.userid = "";
  show2.value = true;
};

const save_gennewmember = () => {
  addPartmentmember(props.id, add_form.mobile, add_form.id, add_form.name)
  .then(
    () => {
      ElMessage({
        type: "success",
        message: "操作成功",
      });
      show2.value = false;
      getinfo();
    }
  );
};

let form = reactive({
  name: "",
  type: "",
  person: "",
  personMobile:"",
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
      console.log(options);

   }

)

let form2 = reactive({
  membername: "",
  number:""
});

let search_name = "";

const onSearch = () => {
  search_name = form2.membername;
  getinfo();
};

let title = ref("");
let times1 = ref(0)
let times2 = ref(0)
let times3 = ref(0)
const getinfo = () => {
  getPartmentDetail(props.id, search_name).then((res) => {
    console.log(res);
    times1.value = res.item.timesFail
    times2.value = res.item.timesSuccess
    times3.value = res.item.timesSum
    tableData.value = res.item.members;
    form.name = res.item.departmentName;
    form.type = res.item.departmentTypeId;
    form.person = res.item.leaderName;
    form.personMobile =res.item.mobile; //新增从服务器中获取负责人电话
    title.value = res.item.departmentName;
  });
};

let tableData = ref([]);
let columns = [
  {
    id: "userName",
    label: "姓名",
    width: "80",
  },
  {
    id: "userId",
    label: "学号/学工号",
    width: "120",
  },
  {
    id: "mobile",
    label: "联系方式",
    width: "150",
  },
  {
    id: "timesSum",
    label: "预约次数",
    width: "90",
  },
  {
    id: "timesSuccess",
    label: "履约次数",
    width: "90",
  },
  {
    id: "timesFail",
    label: "违约次数",
    width: "90",
  },
];

const changestatus = (val) => {
  modifyIsDisabled(val.id).then(() => {
    getinfo();
  });
};

const update = (val) => {
  add_form.name = val.userName;
  add_form.id = val.userId; //学号
  add_form.mobile = val.mobile;
  add_form.userid = val.id; //id
  show3.value = true
};

const save_manage = () => {

  modifyMemberInfo(
    add_form.userid,
    add_form.mobile,
    add_form.id,
    add_form.name
  ).then(() => {
    ElMessage({
      type: "success",
      message: "操作成功",
    });
    show3.value = false;
    getinfo();
  });
};

const memberId=ref('');

const showDelpartmember = (val) => {
  memberId.value=val.id;
  isDelpartmember.value= true;
};

const save = () => {
  modifyAdiminInfo(form.name, form.type, props.id, form.person, form.personMobile).then(() => {
    emits("close");
    ElMessage({
      type: "success",
      message: "操作成功",
    });
  });
};

getinfo();
</script>

<style lang="less" scoped>
.el-input{
  width:250px;
}
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
  .main {
    height: 600px;
    width: 920px;
    background-color: #fff;
    padding: 20px;
    position: relative;
    .head {
      height: 60px;
      display: flex;
      justify-content: space-between;
    }
    .base-info {
      height: 80px;
    }
    .search-area {
      height: 60px;
    }
    .table-area {
      height: 340px;
    }
    .button-area {
      height: 50px;
      margin-top: 10px;
    }
    // .new2{
    //   position: absolute;
    //   top: 150px;
    //   left: 325px;
    //   padding: 10px;
    //   z-index: 999;
      
    //   background-color: #fff;
    //   border: #bbb 1px solid;
    // }
    .new {
      position: absolute;
      top: 150px;
      left: 325px;
      padding: 10px;
      height: 300px;
      width: 400px;
      z-index: 999;
      background-color: #fff;
      border: #bbb 1px solid;
      .button{
      display: flex;
    margin-right: 30px;
    justify-content: flex-end;
      }
    }
    .form-area2 {
       height: 165px;
    margin-top: 10px;
    margin-left: 20px;   
      }
  }
  .btn {
   
    background-color: #2a77f4;
  border-color:#2a77f4 ;
}
.btn2{
  
}
}
</style>
