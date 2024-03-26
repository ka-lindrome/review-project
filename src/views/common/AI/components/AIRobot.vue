<template>
  <div class="card">
      <div class="header">
        <div class="text-2xl font-bold">ERNIE</div>
        <div class="ml-4 text-sm text-gray-500">
          基于 文心一言 的 学科知识库 人工智能对话
        </div>
      </div>


      <div class="chatbox">
        <el-scrollbar >
          <div
            class="group flex flex-col px-4 py-3 hover:bg-slate-100 rounded-lg"
            v-for="item of messages.filter((v) => v.role !== 'system')"
          >
          <!-- 渲染角色名 -->
            <div class="flex justify-between items-center mb-2">
              <div class="font-bold">{{ roleAlias[item.role] }}：</div>
              <!-- <div class="invisible group-hover:visible" :content="item.content" ></div> -->
            </div>
          <!-- 渲染聊天信息 -->
            <div>
              <div
                class="prose text-sm text-slate-600 leading-relaxed"
                v-if="item.content"
                v-html="md.render(item.content)"
              ></div>
              <!-- <Loding v-else /> -->
            </div>
          </div>
        </el-scrollbar>
      </div>

    
      <div class="inputbox">
        <el-input class="input" placeholder="请输入" v-model="query" ></el-input>
            <el-button class="submit" @click="submit">
                提交
            </el-button>
        </div>
  </div>
    
</template>

<script setup>
// import { ChatMessage } from "@/types";
import APIAI from "@/utils/axiosInferenceForAI";
import { ElMessage } from "element-plus";
import {ref} from "vue"
import { jsxDEV } from "vue/jsx-runtime";

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();
let query = ref("")
let usefaiss = ref(false)
let subject = ref("faiss_index")

// 假设item.content是Markdown格式的字符串
const roleAlias = { user: "ME", assistant: "ERNIE", system: "System" };
const messages = ref([
]);

function submit(){
  console.log(JSON.parse(JSON.stringify(messages.value)))
  if(query == ""){
    ElMessage({
      message:"消息不能为空",
      type:"warning"
    })
  }else{
    messages.value.push({
      role:"user",
      content:query.value
    })
    query.value = ""
    try{
        APIAI({
        method:'post',
        url:'/chat',
        data: {
          subject: subject.value,
          usefaiss: usefaiss.value,
          messages: JSON.parse(JSON.stringify(messages.value)),
        }
      }).then((response) =>{
        console.log("返回成功:",response.data);
        messages.value.push({role:"assistant",content:response.data})
      })
    }catch(err){
      console.log(err);
    }
  }
}

</script>

<style scoped>
@import "./index.scss";
.text-2xl {
  font-size: 1.875rem; /* 根据文本大小 2xl 的定义 (text-2xl) */
}

.font-bold {
  font-weight: bold;
}
.ml-4 {
  margin-left: 1rem; /* 根据 ml-4 的定义设置左外边距 */
}

.text-sm {
  font-size: 0.875rem; /* 根据 text-sm 的定义设置字体大小 */
}

.text-gray-500 {
  color: #718096; /* 根据 text-gray-500 的定义设置文本颜色 */
}


.header{
    font-size: larger;
    display: flex;
    height: 7%;
    align-items: center; /* 让内容垂直居中显示 */
    background-color: gainsboro;
    border-radius: 7px; /* 圆角 */
}

.chatbox {
    /* background-color: antiquewhite; */
    align-items: center;
    justify-content: center;
    flex: 1;
}

.inputbox{
    position: sticky;
    display: flex;
    margin-top: auto; 
    margin-bottom: 10px;
    bottom: 0%;
}

.submit{
    background-color: aqua;
}

.card {
  border: 1px solid #e4e3e3; /* 边框 */
  border-radius: 7px; /* 圆角 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 阴影 */
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 70%;
  height: calc(99.7% - 20px);
  position: relative;
  flex-grow: 1;
}
</style>
