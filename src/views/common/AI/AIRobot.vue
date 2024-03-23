<template>
    <div>
        <div class="header">
            基于文心一言的学科知识问答机器人
        </div>
        <div class="flex-1 mx-2 mt-20 mb-2" ref="chatListDom">
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


    </div>
        <div class="inputbox">
            <el-input class="input" placeholder="请输入" v-model="query" >
            </el-input>
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


.header{
    font-size: larger;
}

.chatbox {
    width:100px;
    height:100px;
    background-color: antiquewhite;
    align-items: center;
    justify-content: center;

}

.inputbox{
    display: flex;
}

.submit{
    background-color: aqua;
}
</style>
