<template>
  <div style="margin-top:10px; margin-left: 10px;">
    <el-button @click="upLoadFiles" color="#263445" style="margin-bottom: 20px;margin-left: 10px;"> 上传文件</el-button>
    <el-table :data="tableData" height="750" style="width: 1200px">
      <el-table-column prop="id" label="学号" width="180" align="center">

      </el-table-column>
      <el-table-column prop="class" label="班级" width="180" align="center">

      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180" align="center">

      </el-table-column>
      <el-table-column prop="grade" label="成绩" width="80" align="center">
      </el-table-column>

      <el-table-column prop="operation" label="操作" width="180" align="center">

        <template #default="scope">
          <el-button size="large" color="#263445" @click="showPapers(scope.row)"> 阅卷</el-button>
        </template>

      </el-table-column>
    </el-table>

  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'

let tableData = ref([{id:'01',class:'22',name:'123',grade:'100'}])

let upLoadFiles = () => {

}

let showPapers = () => {

}
onMounted(() => {
  // tableData.value=
})
</script>

<style scoped>

</style>
