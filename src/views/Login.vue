<template>
  <div class="container">
    <div class="login-container">
      <div class="login-left">
        <div class="top">
          <div class="title">
            <span>欢迎使用</span>
          </div>
          <div class="desc">
            <span>Vite2.x + ElementPlus + Vue3.x + TypeScript</span>
          </div>
        </div>
        <div class="bottom">
          <img :src="imgUrl"/>
        </div>
      </div>
      <div class="login-right">
        <el-form ref="formRef" :model="form" label-width="100px" :rules="rules" class="login-form">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pasword">
            <el-input v-model="form.password" type="password" clearable></el-input>
          </el-form-item>

          <div class="vcode">
            <el-form-item label="验证码" prop="vcode">
            <el-input v-model="form.vcode" type="password" clearable></el-input>
          </el-form-item>
            <el-button type="primary" style="width: 70px;" @click="getVcode">验证码</el-button>
          </div>

          <el-form-item label="角色">
            <el-radio-group v-model="form.role">
              <el-radio label="1">家长</el-radio>
              <el-radio label="2">教师</el-radio>
              <el-radio label="3">管理员</el-radio>
            </el-radio-group>
          </el-form-item>

        </el-form>
        <div class="btn" @click="submit">
          登录
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {ref} from 'vue'
import API from '../utils/axiosInference'
import { ElMessage } from 'element-plus'
const router = useRouter()

let submit = () => {
  router.replace('/Index')
}

let imgUrl = ref(require('@/assets/images/img.png'));
let form = ref({email: '', password: '',vcode:'', role: '1'})
let rules = ref({})

function getVcode(){
    if(form.value.email == ''){
      ElMessage({
        message:"邮箱不能为空",
        type:'warning'
      })
    }else{
      console.log("请求获取验证码...",form.value.email)
      API({
      method:'get',
      url:'/user/code',
      data:form.email
    }).then((response)=>{
      console.log("获取成功:",response.data)
    })
  }
   
}
</script>

<style scoped>

.container {

  position: relative;
  background-image: linear-gradient(90deg, #ebebeb, #f5f7f6);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

}


.login-container {
  width: 874px;
  min-width: 874px;
  height: 78%;
  min-height: 600px;
  flex-direction: row;
  display: flex;
  justify-content: space-evenly;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 0 20px 5px rgba(34, 84, 142, .26);

}

.vcode{
  display: flex;
}

img {
  width: 100%;
  height: auto;
  margin: 0px 20px;
}

.top {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 40px 0px;

}

.title {
  font-size: 32px;
  margin-bottom: 16px;

}

.desc {
  font-size: 28px;
  text-align: left;
  color: rgb(166, 175, 188);
}

.login-left {
  width: 50%;
  padding: 47px 54px;


}

.login-right {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;

}

.login-form {
  width: 100%;
  margin: 0 auto;
}

.btn {
  width: 230px;
  height: 40px;
  background-color: rgba(34, 84, 142, .26);
  color: #fff;
  margin-top: 10px;
  margin-left: 80px;
  text-align: center;
  line-height: 40px;
  font-size: 19px;
  cursor: pointer;
  border-radius: 40px;

  position: relative;

  overflow: hidden;
  z-index: 1;
  /* 设置元素的堆叠顺序  */

  transition: .2s;
  /* 整个过渡的延迟时间 完成hover过渡的事件 transition 设置时间 （时间变化曲线 ） */
  /* transition-delay: .1s; */

}

.btn::before,
.btn::after {
  content: '';
  /* 必要 */
  position: absolute;
  top: 50%;
  width: 20px;
  height: 20px;
  background: rgb(34, 84, 142);
  border-radius: 50%;
  z-index: -1;

}

/* before· 和 after  */
.btn:before {
  left: -20px;
  transform: translate(-50%, -50%);
}

.btn:after {
  right: -20px;
  transform: translate(50%, -50%);
}

.btn:hover::before {
  animation: left-effect 0.8s;
}

.btn:hover::after {
  animation: right-effect 0.8s;
}


.btn:hover {
  transition-delay: .45s;
  /* 先小球的动画效果   过渡延迟  */
  color: #fff;
  border-color: rgb(34, 84, 142);
  background: rgb(34, 84, 142);
}


@keyframes left-effect {

  0% {
    left: -20px;
  }

  50% {
    left: 50%;
    width: 20px;
    height: 20px;
  }

  100% {
    left: 50%;
    width: 375px;
    height: 375px;
  }
}

@keyframes right-effect {
  0% {
    right: -20px;
  }

  50% {
    right: 50%;
    width: 20px;
    height: 20px;
  }


  100% {
    right: 50%;
    width: 375px;
    height: 375px;
  }

}
</style>
