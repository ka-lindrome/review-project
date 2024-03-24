<template>

  <div>
    <div style="height: 60px;background-color: #358bcd;"></div>
    <el-menu background-color="#545c64" text-color="#fff" active-text-color="#1890FF" style="height: 100%;"
      default-active="/Home" :collapse="isCollapse" :collapse-transition="false" router>

      <el-menu-item index="/Home">
        <el-icon>
          <House />
        </el-icon>
        <span style="margin-left: 10px;">首页</span>
      </el-menu-item>

      <el-sub-menu index="2" v-show="roleId === '1'">
        <template #title>
          <el-icon>
            <Star />
          </el-icon>
          <span>人员管理</span>
        </template>

        <el-menu-item index="/ManageTeacher">
          <el-icon>
            <User />
          </el-icon>
          <span style="margin-left: 10px">教职工人员</span>
        </el-menu-item>


        <el-menu-item index="/ManageParent">
          <el-icon>
            <User />
          </el-icon>
          <span style="margin-left: 10px">用户人员</span>
        </el-menu-item>

      </el-sub-menu>


      <el-menu-item index="/VisualAnalysisT" v-show="roleId === '2'">
        <el-icon>
          <DataAnalysis />
        </el-icon>
        <span style="margin-left: 10px">数据可视化</span>
      </el-menu-item>

      <el-menu-item index="/VisualAnalysisP" v-show="roleId === '3'">
        <el-icon>
          <DataAnalysis />
        </el-icon>
        <span style="margin-left: 10px">数据可视化</span>
      </el-menu-item>


      <el-menu-item index="/UploadPapers" v-show="roleId === '2'">
        <el-icon>
          <FolderOpened />
        </el-icon>
        <span style="margin-left: 10px">文件上传</span>
      </el-menu-item>


      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>个人页</span>
        </template>

        <el-menu-item index="/PersonCenter">
          <el-icon>
            <User />
          </el-icon>
          <span style="margin-left: 10px">个人中心</span>
        </el-menu-item>


        <el-menu-item index="/PersonSetting">
          <el-icon>
            <Setting />
          </el-icon>
          <span style="margin-left: 10px">个人设置</span>
        </el-menu-item>

      </el-sub-menu>


      <el-menu-item index="/TestDataBaseT" v-show="roleId === '2'">
        <el-icon>
          <Document />
        </el-icon>
        <span style="margin-left: 10px">题库</span>
      </el-menu-item>


      <el-menu-item index="/TestDataBaseP" v-show="roleId === '3'">
        <el-icon>
          <Document />
        </el-icon>
        <span style="margin-left: 10px">题库</span>
      </el-menu-item>

      <el-menu-item index="/AIRobot" v-show="roleId != '1'">
        <el-icon>
          <Cpu />
        </el-icon>
        <span style="margin-left: 10px">智能机器人</span>
      </el-menu-item>
<!-- 
      <el-menu-item index="/KnowledgeBase" v-show="roleId != '2'">
        <el-icon>
          <Knowledge />
        </el-icon>
        <span style="margin-left: 10px">知识库</span>
      </el-menu-item> -->


    </el-menu>

  </div>

</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import API from '@/utils/axiosInference'

const router = useRouter()
let roleId = ref('2')
let token = ref('')


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
  })
  router.push('/Home')
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
</style>
