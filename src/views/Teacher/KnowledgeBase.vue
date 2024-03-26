<template>
  <el-card class="options">
    <el-select
      v-model="subject"
      placeholder="选择学科"
      size="large"
      style="width: 240px"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

    <el-button type="primary" class="choose1" @click="showUpload">新增学科</el-button>

    <el-button type="primary" class="choose1">上传文件</el-button>

    <el-dialog
      v-model="showupload"
      title="添加新的学科进入知识库"
      width="400"
      align-center
    >
    <div style="display: flex; align-items: center;" >
      <span style="font-size: larger;">学科名称:</span>
        <el-input style="font-size: larger; width: 200px; margin-left: 20px;" placeholder="请输入" v-model="subject">
        </el-input>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addSubject" type="success">确定</el-button>
        <el-button @click="showupload = false">取消</el-button>
      </div>
    </template>
  </el-dialog>

    </el-card>
    <el-card class="filelist">
      <el-table :data="tableData" style="width: 100%">
      <el-table-column label="学科" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="文件名" width="180">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>name: {{ scope.row.name }}</div>
              <div>address: {{ scope.row.address }}</div>
            </template>
            <template #reference>
              <el-tag>{{ scope.row.name }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="上传人" width="180">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>name: {{ scope.row.name }}</div>
              <div>address: {{ scope.row.address }}</div>
            </template>
            <template #reference>
              <el-tag>{{ scope.row.name }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="日期">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    </el-card>

</template>


<script setup>
import {ref} from 'vue'
import { Timer } from '@element-plus/icons-vue'
import APIAI from '@/utils/axiosInferenceForAI'
let subjects = ref([])
let subject = ref([])
let showupload = ref(false)
const tableData = ref([])

function showUpload(){
  showupload.value = true
}
function addSubject(){
  try{
        APIAI({
        method:'post',
        url:'/add_subject',
        data: {
          subject: subject.value,
        }
      }).then((response) =>{
        console.log("返回成功:",response.data);
      })
    }catch(err){
      console.log(err);
    }
  showupload.value = false
}
</script>

<style scoped>

.options {
  margin-left: 10px;
  margin-top: 10px;
  margin-right: 10px;
  width: 98.2%;
  height: 13%;
  justify-content: center;
}

.filelist{
  margin-left: 10px;
  margin-top: 10px;
  margin-right: 10px;
  height: 82%;
}
.choose1{
  font-size: larger;
  margin-left: 20px;
  width: 120px;
  height: 40px;
}
</style>