<template>
  <div class="analysis-info" style="background-color: rgb(240,241,243);">
    <div class="top_box">
      <el-row :gutter="40" style="margin-top: 1%;">
        <el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="item-left sle">
            <span class="left-title">相比上次考试</span>
            <div class="img-box">
              <img src="./images/down.png" alt="" />
            </div>
            <span class="left-number" style="margin-top: 10%;">班级排名下降2名</span>
          </div>
        </el-col>
        <el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <div class="item-center">
            <div class="gitee-traffic traffic-box">
              <div class="traffic-img">
                <img src="./images/分数排名-copy.png" alt="" />
              </div>
              <span class="item-value">10</span>
              <span class="traffic-name sle">考试年级排名</span>
            </div>
            <div class="gitHub-traffic traffic-box">
              <div class="traffic-img">
                <img src="./images/平均分配.png" alt="" />
              </div>
              <span class="item-value">837</span>
              <span class="traffic-name sle">班级平均分</span>
            </div>
            <div class="today-traffic traffic-box">
              <div class="traffic-img">
                <img src="./images/today.png" alt="" />
              </div>
              <span class="item-value">45</span>
              <span class="traffic-name sle">今日阅卷数</span>
            </div>
            <div class="yesterday-traffic traffic-box">
              <div class="traffic-img">
                <img src="./images/昨天.png" alt="" />
              </div>
              <span class="item-value">36</span>
              <span class="traffic-name sle">昨日阅卷数</span>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
          <div class="card1">
            <div class="header-title">各个分数段占比</div>
            <div class="e-chart" style="height: 201px; width: 100%">
              <div ref="refAverageSales" style="width: inherit; height: inherit"></div>
            </div>
            <div class="chart-widget-list">
              <p>
                <span><i class="icon-square yellow"></i> 900分以上 </span><span>3 人</span>
              </p>
              <p>
                <span><i class="icon-square green"></i> 750分 ~ 900分 </span><span>15 人</span>
              </p>
              <p>
                <span><i class="icon-square deep-blue"></i> 600分 ~ 750分</span> <span>26 人</span>
              </p>
              <p>
                <span><i class="icon-square red"></i> 600分以下 </span><span>5 人</span>
              </p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="middle_box">
      <el-row style="margin-top: 1%;">
        <Line ref="lineRef" />
      </el-row>
    </div>
    <el-row>
      <el-col>
        <el-card shadow="hover" class="card" style="display: flex; justify-content: center; align-items: center;">
          <div class="header-title" style="margin-bottom: 32px">
            <h3 class="text-muted" style="margin-left: -3%;">本次考试学生成绩表</h3>
            <div class="btn-link" @click="handleExportExcel"><span
                style="margin-right: 5px; display: inline-block">导出</span><i class="el-icon-download"></i></div>
          </div>
          <div>
            <el-table id="tableId" ref="tableRef" :data="state.tableData" highlight-current-row style="width: 100%">
              <el-table-column v-for="item in tableColumn" :key="item.prop" :fixed="item.fixed" :prop="item.prop"
                :label="item.label" :width="item.width" :sortable="item.prop === 'zf'"> </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useInitPieChart } from './useInitPieCharts'
import API from '@/utils/axiosInference';
import Line from './components/line.vue'

const refAverageSales = ref();
const token = ref('');
token.value = sessionStorage.getItem('Token');

API({
  methods: 'get',
  url: '/data/t/all',
  headers: {
    token: token.value
  }
}).then(res => {
  state.tableData = res.data.data
})

const state = reactive({
  tableData: [],
  form: {
    fileName: 'exportExcel',
    fileType: 'xlsx'
  }
});

const tableColumn = [
  {
    prop: 'name',
    fixed: true,
    width: '130',
    label: '姓名'
  },
  {
    prop: 'sid',
    fixed: false,
    width: '220',
    label: '学号'
  },
  {
    prop: 'yw',
    fixed: false,
    width: '110',
    label: '语文'
  },
  {
    prop: 'sx',
    fixed: false,
    width: '110',
    label: '数学'
  },
  {
    prop: 'yy',
    fixed: false,
    width: '110',
    label: '英语'
  },
  {
    prop: 'wl',
    fixed: false,
    width: '110',
    label: '物理'
  },
  {
    prop: 'hx',
    fixed: false,
    width: '110',
    label: '化学'
  },
  {
    prop: 'sw',
    fixed: false,
    width: '110',
    label: '生物'
  },
  {
    prop: 'ls',
    fixed: false,
    width: '110',
    label: '历史'
  },
  {
    prop: 'dl',
    fixed: false,
    width: '110',
    label: '地理'
  },
  {
    prop: 'zz',
    fixed: false,
    width: '110',
    label: '政治'
  },
  {
    prop: 'zf',
    fixed: false,
    width: '100',
    label: '总分'
  }
];

const tableRef = ref();
const formatJson = (filterVal, jsonData) => jsonData.map((v) => filterVal.map((j) => v[j]));
const filterArrayProp = (arrayObj, prop) => {
  const tempArray = [];
  for (let i = 0; i < arrayObj.length; i++) {
    tempArray.push(arrayObj[i][prop]);
  }
  return tempArray;
};
const handleExportExcel = () => {
  import('../../../hooks/useExportExcel').then((excel) => {
    const table = state.tableData;
    const tHeader = filterArrayProp(tableColumn, 'label');
    const filterVal = filterArrayProp(tableColumn, 'prop');
    const data = formatJson(filterVal, table);
    console.log(data);
    excel.exportJsonToExcel({
      multiHeader: [],
      merges: [],
      header: tHeader,
      data,
      filename: state.form.fileName,
      autoWidth: true,
      bookType: state.form.fileType
    });
  });
};

onMounted(() => {
  useInitPieChart(refAverageSales.value);
});

</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
