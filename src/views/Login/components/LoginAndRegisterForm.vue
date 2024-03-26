<template>
  <div>
    <el-form ref="formRef" :model="Loginform" label-width="100px" :rules="rules" v-if="!showLogin">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="Loginform.email"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="Loginform.password" type="password" clearable show-password="true"></el-input>
      </el-form-item>

      <el-form-item label="身份">
        <el-radio-group v-model="Loginform.role">
          <el-radio label="3">家长</el-radio>
          <el-radio label="2">教师</el-radio>
          <el-radio label="1">管理员</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="login-btn">
        <el-button class="btn" :icon="HomeFilled" round size="large" type="primary" @click="login"> 登录</el-button>
        <el-button class="btn" :icon="UserFilled" round size="large" type="primary" @click="changeToRegister"> 注册
        </el-button>
      </div>
    </el-form>


    <el-form ref="formRef" :model="Registerform" label-width="100px" :rules="rules" v-if="showLogin">

      <el-form-item label="用户名" prop="name">
        <el-input v-model="Registerform.name"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="Registerform.email"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="Registerform.password" type="password" clearable show-password="true"></el-input>
      </el-form-item>

      <div class="vcode">
        <el-form-item label="验证码" prop="vcode">
          <el-input v-model="Registerform.vcode" type="password" clearable style="width:250px"></el-input>
        </el-form-item>
        <el-button class="btn" type="primary" style="width: 70px;" @click="getVcode">验证码</el-button>
      </div>

      <el-form-item label="选择身份">
        <el-radio-group v-model="Registerform.role">
          <el-radio label="3">家长</el-radio>
          <el-radio label="2">教师</el-radio>
          <el-radio label="1">管理员</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="选择身份">
        <el-radio-group v-model="Registerform.role">
          <el-radio label="3">家长</el-radio>
          <el-radio label="2">教师</el-radio>
          <el-radio label="1">管理员</el-radio>
        </el-radio-group>
      </el-form-item>

      <div class="login-btn">
        <el-button class="btn" :icon="HomeFilled" round size="large" type="primary" @click="backToLogin"> 返回登录
        </el-button>
        <el-button class="btn" :icon="UserFilled" round size="large" type="primary" @click="register"> 完成注册</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {ref} from 'vue'
import API from '../../../utils/axiosInference'
import {ElMessage} from 'element-plus'
import {HomeFilled, UserFilled} from "@element-plus/icons-vue";

const router = useRouter()

const showLogin = ref(false)

let Loginform = ref({email: '', password: '', role: '1'})
let Registerform = ref({email: '', name: '', password: '', vcode: '', role: '1'})

let rules = ref({})


function getVcode() {
  if (Registerform.value.email == '') {
    ElMessage({
      message: "邮箱不能为空",
      type: 'warning'
    })
  } else {
    console.log("请求获取验证码...", Registerform.value.email)
    const postData = {email: Registerform.value.email}
    API({
      method: 'get',
      url: '/user/code',
      params: postData
    }).then((response) => {
      console.log("获取成功:", response.data)
      ElMessage({
        message: "邮件发送成功，请在5分钟之内注册哦~",
        type: "success"
      })
    })
  }

}

function login() {
  router.replace('/Index')
  // if(Loginform.value.email == ''){
  //   ElMessage({
  //     message:"邮箱不能为空",
  //     type:'warning'
  //   })
  // }else if(Loginform.value.password == ''){
  //     ElMessage({
  //     message:"密码不能为空",
  //     type:'warning'
  //   })
  // }else if(Loginform.value.vcode == ''){
  //     ElMessage({
  //     message:"验证码不能为空",
  //     type:'warning'
  //   })
  // }else{
  //   console.log("请求登录...",Loginform.value.email)
  //   const postData = {
  //     email:Loginform.value.email,
  //     password:Loginform.value.password,
  //     roleID:parseInt(Loginform.value.role)
  //     }
  //     console.log(postData);
  //   API({
  //   method:'post',
  //   url:'/user/login',
  //   data:postData
  // }).then((response)=>{
  //   console.log("登陆成功",response.data)
  //   ElMessage({
  //    message:"登陆成功",
  //    type:"success"
  //   })
  //   console.log("token:",response.data.data.token);
  //    sessionStorage.setItem('Token', response.data.data.token);
  //    sessionStorage.setItem("username",response.data.data.name)
  //    sessionStorage.setItem("useravatar",response.data.data.avatar)
  //   router.replace('/Index')
  // })
  // }
}

function changeToRegister() {
  showLogin.value = true;
}

function backToLogin() {
  showLogin.value = false;
}

function register() {
  if (Registerform.value.email == '') {
    ElMessage({
      message: "邮箱不能为空",
      type: 'warning'
    })
  } else if (Registerform.value.password == '') {
    ElMessage({
      message: "密码不能为空",
      type: 'warning'
    })
  } else if (Registerform.value.vcode == '') {
    ElMessage({
      message: "验证码不能为空",
      type: 'warning'
    })
  } else {
    console.log("请求登录...", Registerform.value.email)
    const postData = {
      email: Registerform.value.email,
      username: Registerform.value.name,
      password: Registerform.value.password,
      code: Registerform.value.vcode,
      roleID: parseInt(Registerform.value.role)
    }
    console.log(postData);
    API({
      method: 'post',
      url: '/user/register',
      data: postData
    }).then((response) => {
      console.log("登陆成功", response.data)


      ElMessage({
        message: "注册成功，请返回登录界面重新登录~",
        type: "success"
      })
      showLogin.value = false;
    })
  }
}
</script>

<style scoped>
@import "../index.scss";

.vcode {
  display: flex;
}

.btn {
  background-color: rgb(0, 150, 136);
}

</style>
