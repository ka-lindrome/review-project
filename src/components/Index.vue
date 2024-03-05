<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="aside_width">
        <Aside :isCollapse="isCollapse"></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header @doCollapse="doCollapse"   :isCollapse="isCollapse" ></Header>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
import Aside from '../components/Aside'
import Header from '../components/Header'
import {ref} from "vue";

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
.el-main{
  padding:0;

}
.el-header{
  padding-right: 60px;
}
</style>
