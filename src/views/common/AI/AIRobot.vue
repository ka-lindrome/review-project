<template>
    <div>
        <div class="header">
            基于文心一言的学科知识问答机器人
        </div>
        <div class="flex-1 mx-2 mt-20 mb-2" ref="chatListDom">
      <div
        class="group flex flex-col px-4 py-3 hover:bg-slate-100 rounded-lg"
        v-for="item of messageList.filter((v) => v.role !== 'system')"
      >
        <div class="flex justify-between items-center mb-2">
          <div class="font-bold">{{ roleAlias[item.role] }}：</div>
          <div class="invisible group-hover:visible" :content="item.content" ></div>
        </div>
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
            <el-input class="input" placeholder="请输入">
            </el-input>
            <el-button class="submit">
                提交
            </el-button>
        </div>
    </div>
</template>

<script setup>
// import { ChatMessage } from "@/types";
import {ref} from "vue"

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

// 假设item.content是Markdown格式的字符串
const roleAlias = { user: "ME", assistant: "ChatGPT", system: "System" };
const messageList = ref([
  {
    role: "system",
    content: "你是 ChatGPT，OpenAI 训练的大型语言模型，尽可能简洁地回答。",
  },
  {
    role: "assistant",
    content: `你好，我是AI语言模型，我可以提供一些常用服务和信息，例如：

        1. 翻译：我可以把中文翻译成英文，英文翻译成中文，还有其他一些语言翻译，比如法语、日语、西班牙语等。

        2. 咨询服务：如果你有任何问题需要咨询，例如健康、法律、投资等方面s，我可以尽可能为你提供帮助。

        3. 闲聊：如果你感到寂寞或无聊，我们可以聊一些有趣的话题，以减轻你的压力。

        请告诉我你需要哪方面的帮助，我会根据你的需求给你提供相应的信息和建议。`,
  },
]);



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
