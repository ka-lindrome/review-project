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
        router
    >


      <el-menu-item index="/Home">
        <el-icon>
          <House/>
        </el-icon>
        <span style="margin-left: 10px;">首页</span>
      </el-menu-item>
      <el-menu-item index="/VisualAnalysisP">
        <el-icon>
          <View/>
        </el-icon>
        <span style="margin-left: 10px">数据可视化</span>
      </el-menu-item>

      <el-menu-item index="/UploadPapers">
        <el-icon>
          <FolderOpened/>
        </el-icon>
        <span style="margin-left: 10px">文件上传</span>
      </el-menu-item>

      <!--      <el-menu-item index="/PersonCenter">-->
      <!--        <el-icon>-->
      <!--          <User/>-->
      <!--        </el-icon>-->
      <!--        <span style="margin-left: 10px">个人中心</span>-->
      <!--      </el-menu-item>-->


      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <location/>
          </el-icon>
          <span>个人页</span>
        </template>

          <el-menu-item index="/PersonCenter" >
            <el-icon>
              <User/>
            </el-icon>
            <span style="margin-left: 10px">个人中心</span>
          </el-menu-item>


          <el-menu-item index="/PersonSetting">
            <el-icon>
              <Setting/>
            </el-icon>
            <span style="margin-left: 10px">个人设置</span>
          </el-menu-item>

      </el-sub-menu>


      <el-menu-item index="3">
        <el-icon>
          <Link/>
        </el-icon>
        <span style="margin-left: 10px">了解更多</span>
      </el-menu-item>

      <!--     <el-menu-item index="/Test">-->
      <!--       <el-icon><Notebook /></el-icon>-->
      <!--       <span style="margin-left: 10px;">自我评测</span>-->
      <!--     </el-menu-item>-->

    </el-menu>
  </div>


</template>

<script setup>
import {defineProps, onMounted} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()

const props = defineProps({
  isCollapse: {
    type: Boolean,
  }
})

onMounted(() => {
  router.push('/Home')
})
</script>

<style scoped>
/deep/ .el-menu-item:hover {
  color: white !important;
  background: #263445 !important;
}


/deep/ .el-sub-menu .el-sub-menu__title:hover {
    color:white!important;
    background: #263445 !important;
}

/deep/ .el-sub-menu .el-menu-item {
  background-color: #1f2d3e !important;
}

/deep/ .el-sub-menu .el-menu-item:hover {
  background-color: #001529 !important;
}





</style>
