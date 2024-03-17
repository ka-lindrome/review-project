<template>
  <el-breadcrumb separator="/">

<!--    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">-->
<!--      <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{ item.name }}</span>-->
<!--      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title[lang] }}</a>-->
<!--    </el-breadcrumb-item>-->

  </el-breadcrumb>
</template>

<script setup>
import {onMounted,ref} from "vue";
import {  useRoute, } from 'vue-router'
const levelList = ref([])
const route = useRoute()
const getBreadcrumb = () => {
  let matched = route.matched.filter(item => item.name)
  levelList.value = matched
  levelList.value.forEach(
      i => alert(i.name)
  )
}

onMounted(()=>[
    getBreadcrumb()
])
</script>

<style scoped>

</style>
