
<template>
  <div class="main">
    <div class="box">
      <div class="title">员工登录</div>
      <el-form :model="formEl" ref="form" label-width="80px" :inline="false" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="formEl.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码"  prop="password">
          <el-input v-model="formEl.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- <el-form-item label="验证码" prop="verify">
          <el-row :gutter="20" >
            <el-col :span="12" :offset="0">
              <el-input
                v-model="formEl.verify"
                placeholder="请输入验证码"
              ></el-input
            ></el-col>
            <el-col :span="12" :offset="0">
              <SIdentify :identifyCode="codeofverify" @click="changecode"></SIdentify>
            </el-col>
          </el-row>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit(form)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import {login} from '../http/api/login'
import serviceAxios from "../http";
const router = useRouter()

// // 生成验证码
// let codes = '1234567890'
// const gencode = () => {
//     let code=""
//     for(let i = 0;i<4;i++){
//         let index = Math.floor(Math.random()*codes.length)
//         code += codes.slice(index,index+1)
//     }
//     return code
// }
// // 验证码
// let codeofverify  = ref(gencode())
// const changecode = ()=>{
//     codeofverify.value = gencode()
// }


const form = ref()
let formEl = reactive({
  username: "",
  password: "",
  // verify: "",
});


// const checkCode = (rule, value, callback) => {
//     if(value!==codeofverify.value){
//       callback(new Error("请输入正确验证码"))
//     }else{
//       callback()
//     }
// }

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ]
  // verify: [
  //   { required: true, message: '请输入验证码', trigger: 'blur' },
  //   { validator: checkCode, trigger: 'blur' }
  // ],
})




const onSubmit = async (form) => {
    await form.validate(
      (valid)=>{
          if(valid){

              login(formEl.username,formEl.password)
              .then((res)=>{
                localStorage.setItem('token',res.token)
                router.replace({
                  path:'/backstage'
                })
              })

          }
      }
   )

}
   
  

</script>

<style lang="less" scoped>
.main {
  height: 100vh;
  width: 100vw;
  background-color: #bbb;
  display: flex;
  justify-content: center;
  align-items: center;

  .box {
    .title{
    font-size: 18px;
    font-weight: 600;

  }
    height: 300px;
    width: 450px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
