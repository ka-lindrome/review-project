<template>
  <el-card class="options">
    <div style="display: flex;">
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
 
      <el-upload 
      :before-upload="beforeFileUpload"
      :on-success="handleFileSuccess"
      accept="file/*"
      action="http://127.0.0.1:5000/~">
        <el-button type="primary" class="choose1">上传文件</el-button>
      </el-upload>

      <el-button type="primary" class="choose2" @click="showUpload">新增学科</el-button>
    </div>
    
    <el-dialog
        v-model="showupload"
        title="添加新的学科进入知识库"
        width="400"
        align-center
      >
      <div style="display: flex; align-items: center;">
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
      <el-table :data="tableData" style="width: 100%" border="true" max-height="500" :default-sort="{ prop: '学科', order: 'descending' }">
        <el-table-column prop="学科" label="学科" width="150px" sortable>
          <template #default="scope">
            <div style="display: flex; align-items: center">
              <span style="margin-left: 10px">{{ scope.row.subject }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="文件名" label="文件名" width="300px" sortable>
          <template #default="scope">
                <div>{{ scope.row.filename }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="上传人" label="上传人" width="150px" sortable>
          <template #default="scope">
                <div>{{ scope.row.uploader }}</div>
              </template>
        </el-table-column>
        <el-table-column prop="日期" label="日期" sortable>
          <template #default="scope">
          <div>{{ scope.row.uploadtime }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="操作" label="操作" fixed="right" width="150px">
          <template #default="scope" >
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >查看</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

</template>


<script setup>
import { ref ,onMounted} from 'vue'
import { Timer } from '@element-plus/icons-vue'
import APIAI from '@/utils/axiosInferenceForAI'
import { ElMessage } from 'element-plus'
let subjects = ref([])
let subject = ref([])
let showupload = ref(false)
let tableData = ref([])
let options = ref([])
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
        ElMessage({
          message:"添加成功",
          type:"success"
        })
      })
    }catch(err){
      console.log(err);
    }
  showupload.value = false
}
function handleDelete(index, row){
  console.log(index,row);
}
function ini_subject(){
// 初始化学科选择器
APIAI({
        method:'post',
        url:'/ini_subject',
      }).then((response) =>{
        console.log("返回成功:",response.data);
        for(let i = 0 ;i<response.data.length;i++){
            options.value.push({
            value:response.data[i],
            label:response.data[i]
          })
        }
      })
}
function ini_filelist(){
 // 初始化文件列表
 APIAI({
        method:'post',
        url:'/ini_filelist',
      }).then((response) =>{
        console.log("返回成功:",response.data);
        tableData.value = response.data.map(item => {
          return {
              subject: item[0],
              filename: item[1],
              uploadtime: item[2],
              uploader: item[3]
          };
        });
        console.log(tableData);
      })
}
onMounted(() => {
  ini_subject()
  ini_filelist()
})
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

.choose2{
  font-size: larger;
  float: right;
  margin-left: 20px;
  width: 120px;
  height: 40px;
}
</style>