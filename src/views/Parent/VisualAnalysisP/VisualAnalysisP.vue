<template>
  <div class="dataVisualize-box" style="background-color: rgb(240,241,243);">
    <div class="card top-box" style="background-color: white;">
      <div class="top-title">成绩分析</div>
      <el-tabs v-model="tabActive" class="demo-tabs">
        <el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
      </el-tabs>
      <div class="top-content">
        <el-row :gutter="40">
          <el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="item-left sle">
              <span class="left-title">总成绩</span>
              <div class="img-box">
                <img src="./images/成绩分析.png" alt="" />
              </div>
              <span class="left-number">{{ sum }}分</span>
            </div>
          </el-col>
          <el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <div class="item-center">
              <div class="gitee-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/add_person.png" alt="" />
                </div>
                <span class="item-value">{{ classrank }}</span>
                <span class="traffic-name sle">考试班级排名</span>
              </div>
              <div class="gitHub-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/add_team.png" alt="" />
                </div>
                <span class="item-value">{{ graderank }}</span>
                <span class="traffic-name sle">考试年级排名</span>
              </div>
              <div class="today-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/today.png" alt="" />
                </div>
                <span class="item-value">45</span>
                <span class="traffic-name sle">今日刷题量</span>
              </div>
              <div class="yesterday-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/昨天.png" alt="" />
                </div>
                <span class="item-value">12</span>
                <span class="traffic-name sle">昨日刷题量</span>
              </div>
            </div>
          </el-col>
          <el-col class="mb40" :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
            <div class="item-right">
              <div class="echarts-title">各科成绩分布</div>
              <div class="book-echarts">
                <Pie ref="pieRef" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="card bottom-box">
      <div class="bottom-title">数据来源</div>
      <div class="bottom-tabs">
        <el-tabs v-model="tabActive" class="demo-tabs">
          <el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="curve-echarts">
        <Curve ref="curveRef" />
      </div>
    </div>
  </div>
</template>

<script setup name="dataVisualize">
import { ref } from "vue";
import Pie from "./components/pie.vue";
import Curve from "./components/curve.vue";
import API from '@/utils/axiosInference'

const tabActive = ref(1);
const classrank = ref(1);
const graderank = ref(1);
const sum = ref(1)
const token = ref('');
token.value = sessionStorage.getItem('Token');

API({
  methods: 'get',
  url: '/data/p/rank',
  headers: {
    token: token.value
  }
}).then(res => {
  classrank.value = res.data.data["class"]
  graderank.value = res.data.data["grade"]
  sum.value = res.data.data["sum"]
})

const tab = [
  { label: "本次考试", name: 1 },
  { label: "近七日", name: 2 },
  { label: "近一月", name: 3 },
  { label: "近三月", name: 4 },
  { label: "近半年", name: 5 },
  { label: "近一年", name: 6 }
];
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
