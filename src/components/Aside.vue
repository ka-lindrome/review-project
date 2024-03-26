<template>

  <div>
    <div style="height: 60px;background-color: #358bcd;"></div>
    <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#1890FF"
        style="height: 100%;"
        default-active="/Home"
        :collapse="isCollapse"
        :collapse-transition="false"
        @select="menuClick"
    >

      <template v-for="item in menuList"
      >

        <el-sub-menu
            :key="item.path"
            :index="item.path"
            v-if="item.children && item.children.length > 0"
        >
          <template #title>
            <el-icon>
              <component :is="item.icon"/>
            </el-icon>
            <span>{{ item.title }}</span>
          </template>

          <el-menu-item
              v-for="item2 in item.children"
              :key="item2.path"
              :index="item2.path"
              :class="activePath==item2.path  ? 'active':'common' "
          >
            <el-icon>
              <component :is="item2.icon"/>
            </el-icon>
            <span style="margin-left: 10px">{{ item2.menuName }}</span>
          </el-menu-item>
        </el-sub-menu>


        <el-menu-item
            :index="item.path"
            v-else
            :class="activePath==item.path  ? 'active':'common' "
        >
          <el-icon>
            <component :is="item.icon"/>
          </el-icon>
          <span style="margin-left: 10px">{{ item.menuName }}</span>
        </el-menu-item>
      </template>

    </el-menu>

  </div>

</template>

<script setup>
import {defineProps, onMounted, ref, watchEffect} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import API from '@/utils/axiosInference'


const router = useRouter()
let roleId = ref('2')
let token = ref('')
let activePath = ref("")
const route = useRoute()

watchEffect(() => {
  activePath.value = route.path
})
let menuList = ref([])

let menuList1 = ref([
  {
    menuName: '首页',
    icon: 'House',
    path: '/Home'
  },
  {
    title: '人员管理', icon: 'Star',
    children: [
      {
        menuName: '教职工人员',
        icon: 'User',
        path: '/ManageTeacher'
      },
      {
        menuName: '用户人员',
        icon: 'User',
        path: '/ManageParent'
      }]
  }, {
    title: '个人页', icon: 'location',
    children: [
      {
        menuName: '个人中心',
        icon: 'User',
        path: '/PersonCenter'
      },
      {
        menuName: '个人设置',
        icon: 'Setting',
        path: '/PersonSetting'
      }]
  },
])

let menuList2 = ref([
  {
    menuName: '首页',
    icon: 'House',
    path: '/Home'
  },
  {
    menuName: '数据可视化',
    icon: 'DataAnalysis',
    path: '/VisualAnalysisT'
  },
  {
    title: '智能阅卷',
    icon: 'FolderOpened',
    path: '/file',
    children: [
      {
        menuName: '试卷上传',
        icon: 'User',
        path: '/UploadPapers'

      }, {
        menuName: '试卷批阅',
        icon: 'User',
        path: '/CorrectPapers'
      }
    ]
  },
  {
    title: '个人页',
    icon: 'location',
    path: '/person',
    children: [
      {
        menuName: '个人中心',
        icon: 'User',
        path: '/PersonCenter'
      },
      {
        menuName: '个人设置',
        icon: 'Setting',
        path: '/PersonSetting'
      }]
  },
  {
    menuName: '题库',
    icon: 'Document',
    path: '/TestDataBaseT'
  },
  {
    menuName: '智能机器人',
    icon: 'Cpu',
    path: '/AIRobot'
  }])

let menuList3 = ref([
  {
    menuName: '首页',
    icon: 'House',
    path: '/Home'
  },
  {
    menuName: '数据可视化',
    icon: 'DataAnalysis',
    path: '/VisualAnalysisP'
  },
  {
    title: '个人页', icon: 'location',
    children: [
      {
        menuName: '个人中心',
        icon: 'User',
        path: '/PersonCenter'
      },
      {
        menuName: '个人设置',
        icon: 'Setting',
        path: '/PersonSetting'
      }]
  },
  {
    menuName: '题库',
    icon: 'Document',
    path: '/TestDataBaseP'
  },
  {
    menuName: '智能机器人',
    icon: 'Cpu',
    path: '/AIRobot'
  }])


let menuClick = (path) => {
  //path
  router.push(path)
}


const props = defineProps({
  isCollapse: {
    type: Boolean,
  }
})


onMounted(() => {
  token.value = sessionStorage.getItem('Token')
  API({
    method: 'get',
    url: '/user',
    headers: {
      // 将token放在请求头中
      token: token.value
    }
  }).then(res => {
    roleId.value = res.data.data.roleID.toString()
    if (roleId.value == 1) {
      menuList.value = menuList1
    } else if (roleId.value == 2) {
      menuList.value = menuList2
    } else if (roleId.value == 3) {
      menuList.value = menuList3
    }
  })
  router.push('/Home')
  menuList.value = menuList2.value
})
</script>

<style scoped>
.el-menu-item:hover {
  color: white !important;
  background: #263445 !important;
}


.el-sub-menu .el-sub-menu__title:hover {
  color: white !important;
  background: #263445 !important;
}

.el-sub-menu .el-menu-item {
  background-color: #1f2d3e !important;
}

.el-sub-menu .el-menu-item:hover {
  background-color: #001529 !important;
}

.active {
  color: #1890FF;
}

.common {
  color: #fff
}
</style>
