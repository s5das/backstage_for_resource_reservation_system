<template>
  <div class="serch-area">
    <div style="width: 100%">
      <el-form :inline="true" :model="formInline" ref="form">
        <div style="display: flex">
          <div style="margin-right:120px">
            <el-form-item label="组织名称" prop="or_name">
              <el-input v-model="formInline.or_name" placeholder="请输入" />
            </el-form-item>
          </div>
          <div style="margin-right:100px">
            <el-form-item label="成员名称" prop="me_name">
              <el-input v-model="formInline.me_name" placeholder="请输入" />
            </el-form-item>
          </div>
          <div >
            <el-form-item>
              <el-button class="blue" type="primary" @click="onSubmit()" style="width: 70px; height: 30px">查询</el-button>
              <el-button class="blue" type="primary" @click="reset(form)" style="width: 70px; height: 30px">重置</el-button>
            </el-form-item>
          </div>
          <div >
            <el-form-item>
              <el-button class="blue" type="primary" @click="addnew" style="width: 98px; height: 30px">新建组织</el-button>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
const form = ref();
const formInline = reactive({
  or_name: "",
  me_name: "",
});

const emits = defineEmits(["submit", "addnew"]);

const onSubmit = () => {
  emits("submit", formInline);
};

const reset = (form) => {
  if (!form) return;
  console.log(form);
  form.resetFields();
};

const addnew = () => {
  emits("addnew");
};

defineExpose({
  form
})
</script>

<style lang="less" scoped>
.blue{
  background-color: #2a77f4;
  border-color:#2a77f4 ;
}
.serch-area {
  height: 70px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-top: 15px;
}
</style>
