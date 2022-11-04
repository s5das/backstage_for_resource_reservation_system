<template>
    <div class="serch-area">
      <div style="width:100%">
        <el-form
          :inline="true"
          :model="formInline"
          ref="form"
        >
        <el-row :gutter="10">
        <el-col :span="6" :offset="0">
            <el-form-item label="组织名称" prop="number">
            <el-input v-model="formInline.or_name" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item label="成员名称" prop="time">
            <el-input v-model="formInline.me_name" placeholder="请输入" />
          </el-form-item>        
        </el-col>
        <el-col :span="6" :offset="0">
          <el-form-item>
            <el-button type="primary" @click="onSubmit(form)">查询</el-button>
            <el-button type="primary" @click="reset(form)">重置</el-button>
          </el-form-item>        
        </el-col>
        <el-col :span="3" :offset="3">
          <el-form-item>
            <el-button type="primary" @click="addnew">新建组织</el-button>
          </el-form-item>        
        </el-col>
           </el-row>
          


        </el-form>
      </div>
    </div>
  </template>
  
  <script setup>
  const form = ref();
  const formInline = reactive({
    or_name: "",
    me_name: ""
  });
  
  const emits = defineEmits(['submit'])
  
  const  onSubmit = async (form) => {
    if (!form) return
    await form.validate((valid, fields) => {
      if (valid) {
        emits('submit',formInline)
      } else {
        console.log('error submit!', fields)
      }
    })
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
  </style>
  