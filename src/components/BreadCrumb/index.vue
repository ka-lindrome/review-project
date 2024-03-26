<template>
  <el-breadcrumb separator="/">
    <transition-group name="breadcrumb">


      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{
          item.name
        }}</span>
        <a v-else>{{ item.name }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import {computed} from "vue";
import {useRoute,} from 'vue-router'
// const levelList = ref([])
const route = useRoute()
const levelList = computed(() => {
  let matched = route.matched.filter(item => item.name)
  return matched;

})

</script>

<style scoped>
.no-redirect {
  color: #293e5a;
  cursor: text;
}

.breadcrumb-enter-active {
  transition: all 0.8s;
}

.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}

</style>
