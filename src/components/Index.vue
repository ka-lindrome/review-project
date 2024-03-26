<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="aside_width">
        <Aside :isCollapse="isCollapse"></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header @doCollapse="doCollapse" :isCollapse="isCollapse"></Header>
        </el-header>
        <el-main>

          <routerTabs></routerTabs>
          <!--          <transition name="slide" mode="out-in">-->
          <router-view/>
          <!--          </transition>-->

          <!--          <router-view v-slot="{ Component }">-->
          <!--            <transition name="slide-right">-->
          <!--              <component :is="Component"/>-->
          <!--            </transition>-->
          <!--          </router-view>-->

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
import Aside from '../components/Aside'
import Header from '../components/Header'
import {ref} from "vue";
import routerTabs from '../RouterTabs/Tabs'


let isCollapse = ref(false);
let aside_width = ref("200px");


let doCollapse = () => {
  isCollapse.value = !isCollapse.value
  if (!isCollapse.value) {
    aside_width.value = '200px'

  } else {
    aside_width.value = '64px'

  }
}


</script>

<style scoped>
.el-main {
  padding: 0;

}

.el-header {
  padding-right: 60px;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.5s;
  position: absolute;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
