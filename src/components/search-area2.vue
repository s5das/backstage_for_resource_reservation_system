<template>
  <div class="serch-area">
    <div style="width: 100%">
      <el-form :inline="true" :model="formInline" ref="form">
        <div style="display: flex">
          <div style="flex: 1">
            <el-form-item label="组织名称" prop="or_name">
              <el-input v-model="formInline.or_name" placeholder="请输入" />
            </el-form-item>
          </div>
          <div style="flex: 1">
            <el-form-item label="成员名称" prop="me_name">
              <el-input v-model="formInline.me_name" placeholder="请输入" />
            </el-form-item>
          </div>
          <div style="flex: 1">
            <el-form-item>
              <el-button type="primary" @click="onSubmit()">查询</el-button>
              <el-button type="primary" @click="reset(form)">重置</el-button>
            </el-form-item>
          </div>
          <div style="flex: 1">
            <el-form-item>
              <el-button type="primary" @click="addnew">新建组织</el-button>
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
.serch-area {
  height: 70px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-top: 15px;
}
</style>
