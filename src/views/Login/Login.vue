<template>
  <div class="login-container sass-loader">
    <div class="login-box">
      <div class="login-left">
        <img class="login-left-img" src="@/assets/images/login_left.png" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/images/logo.svg" alt="" />
          <h2 class="logo-text">Welcome to us!</h2>
        </div>
        <LoginAndRegisterForm/>
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginAndRegisterForm from '@/views/Login/components/LoginAndRegisterForm.vue';
import {useRouter} from 'vue-router';
import {ref} from 'vue';
const router = useRouter()

let form = ref({email: '', password: '',vcode:'', role: '1'})
let showLogin = ref(false)

</script>

<style scoped>
@import "./index.scss";
/* .container {
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

} */

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
