<template>
  <div class="echarts" ref="echartsRef">
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { TooltipComponent, GridComponent, ToolboxComponent, DataZoomComponent } from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import API from '@/utils/axiosInference'

// 引入图表和组件
echarts.use([BarChart, TooltipComponent, GridComponent, ToolboxComponent, 
  DataZoomComponent,LabelLayout,UniversalTransition,CanvasRenderer]);

let curveData = ref([
  { value: 96, spotName: "语文" },
  { value: 90, spotName: "数学" },
  { value: 10, spotName: "英语" },
  { value: 70, spotName: "物理" },
  { value: 20, spotName: "化学" },
  { value: 60, spotName: "生物" },
  { value: 55, spotName: "历史" },
  { value: 80, spotName: "政治" },
  { value: 50, spotName: "地理" }
]);
const token = ref('')
const option = ref({
  tooltip: {
    trigger: "axis",
    backgroundColor: "transparent",
    axisPointer: {
      type: "none"
    },
    padding: 0,
    formatter: (p) => {
      let dom = `<div style="width:100%; height: 70px !important; display:flex;flex-direction: column;justify-content: space-between;padding:10px;box-sizing: border-box;
      color:#fff; background: #6B9DFE;border-radius: 4px;font-size:14px; ">
        <div style="display: flex; align-items: center;"> <div style="width:5px;height:5px;background:#ffffff;border-radius: 50%;margin-right:5px"></div>学科 :  ${p[0].name}</div>
        <div style="display: flex;align-items: center;"><div style="width:5px;height:5px;background:#ffffff;border-radius: 50%;margin-right:5px"></div>成绩 :  ${p[0].value}</div>
      </div>`;
      return dom;
    }
  },
  toolbox: {
    show: true,
    orient: "horizontal"
  },
  grid: {
    left: "0",
    right: "0"
  },
  dataZoom: [
    {
      show: false,
      height: 10,
      xAxisIndex: [0],
      bottom: 0,
      startValue: 0,
      endValue: 9,
      handleStyle: {
        color: "#6b9dfe"
      },
      textStyle: {
        color: "transparent"
      }
    },
    {
      type: "inside",
      show: true,
      height: 0,
      zoomLock: true
    }
  ],
  xAxis: [
    {
      type: "category",
      data: curveData.value.map((val) => {
        return {
          value: val.spotName
        };
      }),
      axisTick: {
        show: false
      },
      axisLabel: {
        margin: 20,
        interval: 0,
        color: "#a1a1a1",
        fontSize: 14,
        formatter: function (name) {
          undefined;
          return name.length > 8 ? name.slice(0, 8) + "..." : name;
        }
      },
      axisLine: {
        lineStyle: {
          color: "#c0c0c0"
        }
      }
    }
  ],
  yAxis: [
    {
      min: 0,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#c0c0c0"
        }
      },
      axisLabel: {
        color: "#a1a1a1",
        fontSize: 16,
        fontWeight: 400,
        formatter: function (value) {
          if (value === 0) {
            return value + "";
          } else if (value >= 10000) {
            return value / 10000 + "w";
          }
          return value + "";
        }
      }
    }
  ],
  series: [
    {
      name: "Direct",
      type: "bar",
      data: curveData.value.map((val) => {
        return {
          value: val.value
        };
      }),
      barWidth: "45px",
      itemStyle: {
        color: "#C5D8FF",
        borderRadius: [12, 12, 0, 0]
      },
      emphasis: {
        itemStyle: {
          color: "#6B9DFE"
        }
      }
    }
  ]
})
const echartsRef = ref(null);

token.value=sessionStorage.getItem('Token')
watch(curveData, (newValue) => {
  option.value.xAxis[0].data = newValue.map(val => val.spotName);
  option.value.series[0].data = newValue.map(val => ({ value: val.value }));
  const myChart = echarts.getInstanceByDom(echartsRef.value);
  myChart.setOption(option.value);
});

onMounted(() => {
  token.value = sessionStorage.getItem('Token');
  API({
    methods: 'get',
    url: '/data/p/curve',
    headers: {
      token: token.value
    }
  }).then(res => {
    curveData.value = res.data.data.map(item => ({ value: item.value, spotName: item.spotName }));
  });

  const myChart = echarts.init(echartsRef.value);
  myChart.setOption(option.value);
});

</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
