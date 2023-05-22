
<template>
  <div class="main">
    <div class="box">
      <div class="title">会议室预约系统后台</div>
      <el-form :model="formEl" ref="form" :inline="false" :rules="rules">
        <el-form-item   prop="username" >
          <span>用户名</span>
          <el-input
          style="height:46px"
            v-model="formEl.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item   prop="password">
          <span>密码</span>
          <el-input v-model="formEl.password" 
          type="password" 
          placeholder="请输入密码"
          style="height:46px"
          ></el-input>
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
          <el-button style="width:325px;height:46px;background-color:#2772F0 " type="primary" @click="onSubmit(form)">登录</el-button>
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
span{
  font-size: 17px;
  font-weight: 500;
}
.main {
  height: 100vh;
  width: 100vw;
  // position: relative;
  // background-color: #bbb;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-image: url('../assets/login.jpg');
  background-size: cover;
  .box {
    .title{
      
    font-size: 20px;
    font-weight: bold;
    margin-left: 29px;
  }
    height: 355px;
    width: 380px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    // align-items: center;
    z-index: 100;
    margin-right: 52px;
  }
}
 .main::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 485px;
  height: 100%;
  background-color: rgba(0,0,0,0.5); /* 半透明黑色 */
}
.el-form-item{
  width: 325px;
  margin-left: 29px;
  display: block;
}


</style>
