<template>
  <div style="display: flex;align-items: center;">
    <el-icon style="cursor: pointer;" :size="30" @click="collapse">
      <Expand v-if="isCollapse"/>
      <Fold v-else/>
    </el-icon>
    <div style="display: flex;align-items: center;justify-content: flex-end;height: 60px;margin-left: auto">

      <el-dropdown trigger="click" style="margin-right:20px;cursor: pointer">
        <el-badge :value="messageNum" :max="99" class="message-badge" type="danger">

          <el-icon :size="30">
            <Message/>
          </el-icon>

        </el-badge>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="a">mike 回复了你的邮件</el-dropdown-item>
            <el-dropdown-item command="b">您有5个新任务</el-dropdown-item>
            <el-dropdown-item command="c">您已经和Jone成为了好友</el-dropdown-item>
            <el-dropdown-item command="d">项目验收通知</el-dropdown-item>
            <el-dropdown-item command="e" divided>新会议通知</el-dropdown-item>

          </el-dropdown-menu>
        </template>
      </el-dropdown>


      <el-tooltip content="全屏预览" effect="dark" placement="left" style="margin-left:auto;">
        <el-icon v-show="fullScreen == false" :size="30" @click="toShowFullScreen()">
          <FullScreen/>
        </el-icon>
      </el-tooltip>

      <el-tooltip content="退出全屏" effect="dark" placement="left" style="margin-left:auto;">
        <el-icon v-show="fullScreen == true" :size="30" @click="toExitFullScreen()">
          <BottomLeft/>
        </el-icon>
      </el-tooltip>


      <el-avatar :src="imgUrl" :size="40" style="margin-left:20px;"></el-avatar>

      <el-dropdown trigger="click" style="margin-left:20px;cursor: pointer">
        <span class="el-dropdown-link">
         {{ username }}<el-icon class="el-icon--right"><arrow-down/></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/PersonCenter">
            <el-dropdown-item :icon="Plus">个人中心</el-dropdown-item>
            </router-link>
            <el-dropdown-item :icon="CirclePlusFilled" @click="logout">
              退出登录
            </el-dropdown-item>

          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>


</template>

<script setup>
// import Breadcrumb from '@/components/BreadCrumb/index'
import {defineProps, defineEmits, ref} from 'vue'
import {toFullScreen, exitFullScreen} from "@/utils/ScreenUtils";
import {useRouter} from 'vue-router'


const router = useRouter()

const props = defineProps({
  isCollapse: {
    type: Boolean,
  }
})

const emit = defineEmits(["doCollapse"]);
let collapse = () => {
  emit('doCollapse');
}

let username = ref("清河海风dsddd");
let imgUrl = ref(require("../assets/images/img.png"))

let fullScreen = ref(false)

let toShowFullScreen = () => {
  toFullScreen();
  fullScreen.value = !fullScreen.value
}

let toExitFullScreen = () => {
  exitFullScreen()
  fullScreen.value = !fullScreen.value
}

let messageNum = ref(5)
let logout = () => {
  router.push('/')
}


</script>

<style scoped>

</style>
