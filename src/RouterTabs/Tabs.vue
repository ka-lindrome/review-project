<template>
  <el-tabs
      v-model="activeTab"
      type="card"
      closable
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
  >
    <!--    $route.path-->
    <el-tab-pane
        v-for="(route, index) in tabs.tabViews"
        :key="index"
        :name="route.path"
    >
      <template #label>
        <el-dropdown trigger="contextmenu">
                    <span>
                        {{ route.name || '无标题' }}
                    </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                  :disabled="route.path != $route.path"
                  @click="handleRefresh()"
              >
                重新加载
              </el-dropdown-item>
              <el-dropdown-item
                  :disabled="tabs.tabViews.length == 1"
                  @click="handleCloseOther(index)"
              >
                关闭其他
              </el-dropdown-item>
              <el-dropdown-item
                  :disabled="index == 0"
                  @click="handleCloseLeft(index)"
              >
                关闭左侧
              </el-dropdown-item>
              <el-dropdown-item
                  :disabled="index == tabs.tabViews.length - 1"
                  @click="handleCloseRight(index)"
              >
                关闭右侧
              </el-dropdown-item>
              <el-dropdown-item divided @click="handleCloseAll">
                全部关闭
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>

import {useRouter, useRoute} from 'vue-router'
import {watchEffect, ref} from 'vue'

const router = useRouter()
const route = useRoute()

import {useTabs} from '../store/tabsStore'

let activeTab = ref("")
watchEffect(() => {
  activeTab.value = route.path
})
const tabs = useTabs()
// 路由守卫
router.beforeEach((to) => {
  const tabs = useTabs()
  tabs.addTab(to)

})


const handleTabClick = (pane) => {
  router.replace(pane.paneName)
}


const handleTabRemove = (name) => {
  tabs.removeTab(name)
}


const handleRefresh = () => {
  tabs.refreshView()
}


const handleCloseOther = (index) => {
  tabs.removeTabs(tabs.tabViews.splice(index, index + 1))
}


const handleCloseLeft = (index) => {
  tabs.removeTabs(tabs.tabViews.splice(index, tabs.tabViews.length))
}


const handleCloseRight = (index) => {
  tabs.removeTabs(tabs.tabViews.splice(0, index + 1))
}


const handleCloseAll = () => {
  tabs.removeTabs([])
}


</script>


