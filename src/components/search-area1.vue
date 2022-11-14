<template>
  <div class="serch-area">
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="form" >
        <div style="display: flex">
          <div class="item">
            <el-form-item label="预约人" prop="name">
              <el-input v-model="formInline.name" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="使用单位" prop="partment">
              <el-input v-model="formInline.partment" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="预约会议室" prop="number">
              <el-input v-model="formInline.number" placeholder="请输入" />
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="预约时间" prop="time">
              <el-date-picker
                v-model="formInline.time"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="选择时间"
              />
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item>
              <el-button type="primary" @click="onSubmit()">查询</el-button>
              <el-button type="primary" @click="reset(form)">重置</el-button>
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
  name: "",
  partment: "",
  number: "",
  time: "",
});

const emits = defineEmits(["submit"]);

const onSubmit = () => {
  emits("submit", formInline);
};

const reset = (form) => {
  if (!form) return;
  form.resetFields();
};
</script>

<style lang="less" scoped>
.serch-area {
  height: 70px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-top: 15px;
}
.item {
  flex: 1;
  min-width: 0;
}
</style>
