<template>
  <div style="margin-top:10px; margin-left: 10px;">
    <el-button @click="upLoadFiles" color="#263445" style="margin-bottom: 20px;margin-left: 10px;display:block"> 上传文件
    </el-button>

    <el-dropdown trigger="click" style="cursor: pointer;margin:10px 20px" @command="clickDropdown">
  <span class="el-dropdown-link" style="color: #00a4ff;font-weight: 700">
    查看方式<i class="el-icon-caret-bottom el-icon--right"></i>
  </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="已批阅">已批阅</el-dropdown-item>
          <el-dropdown-item command="未批阅">未批阅</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-table :data="tableData" height="750" style="width: 1200px">
      <el-table-column prop="id" label="学号" width="180" align="center">

      </el-table-column>
      <el-table-column prop="class" label="班级" width="180" align="center">

      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180" align="center">

      </el-table-column>
      <el-table-column prop="grade" label="成绩" width="80" sortable align="center">
      </el-table-column>

      <el-table-column prop="operation" label="操作" width="180" align="center">

        <template #default="scope">
          <el-button v-if="scope.row.state===1" size="large" color="#263445" @click="showPapers(scope.row)"> 阅卷
          </el-button>
          <el-button v-else size="large" color="#3ceeee"> 已批阅</el-button>
        </template>

      </el-table-column>
    </el-table>


  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'


let tableData = ref([{id: '01', class: '22', name: '123', grade: '100', state: 1}])
let order = ref(0)
let dialogVisible = ref(false)

let upLoadFiles = () => {

}

let showPapers = (row) => {
  dialogVisible.value = true;
  console.log(row.id)

}


let clickDropdown = (command) => {
  console.log(command)
  if (command == '已批阅') {
    order.value = 0

  } else if (command == "未批阅") {
    order.value = 1

  }

}
onMounted(() => {
  // tableData.value=
})
</script>

<style scoped>

</style>
