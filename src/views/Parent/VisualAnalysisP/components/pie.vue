<template>
  <div class="echarts" ref="echartsRef"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts/core';
import { RadarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import API from '@/utils/axiosInference'

echarts.use([RadarChart, TitleComponent, TooltipComponent, 
  LegendComponent, LabelLayout, UniversalTransition, CanvasRenderer]);

let radarData1 = ref({ value: [85, 91, 98, 92, 85, 88, 78, 85, 78], name: "本次考试" });
let radarData2 = ref({ value: [105, 120, 128, 77, 65, 84, 80, 82, 71], name: "上次考试" });

const option = ref({
  title: {
    left: "center",
    top: "4%",
    textStyle: {
      fontSize: 18,
      color: "#333"
    },
    subtextStyle: {
      fontSize: 14,
      color: "#999"
    }
  },
  tooltip: {
    trigger: "item"
  },
  legend: {
    top: "4%",
    left: "2%",
    orient: "vertical",
    icon: "circle",
    align: "left",
    itemGap: 20,
    textStyle: {
      fontSize: 13,
      color: "#666",
      fontWeight: 500
    }
  },
  radar: {
    indicator: [
      { name: "语文", max: 150 },
      { name: "数学", max: 150 },
      { name: "英语", max: 150 },
      { name: "物理", max: 100 },
      { name: "化学", max: 100 },
      { name: "生物", max: 100 },
      { name: "历史", max: 100 },
      { name: "地理", max: 100 },
      { name: "政治", max: 100 }
    ]
  },
  series: [
    {
      type: "radar",
      data: [radarData1.value],
      label: {
        show: true,
        fontWeight: 400,
        fontSize: 14,
        color: "#666"
      },
      areaStyle: {
        color: "rgba(173, 216, 230, 0.3)" // 修改颜色
      },
      lineStyle: {
        width: 1
      }
    },
    {
      type: "radar",
      data: [radarData2.value], 
      label: {
        show: true,
        fontWeight: 400,
        fontSize: 14,
        color: "#666"
      },
      areaStyle: {
        color: "rgba(154, 205, 50, 0.3)" // 修改颜色
      },
      lineStyle: {
        width: 1
      }
    }
  ]
});

const echartsRef = ref(null);

const token = ref('');
token.value = sessionStorage.getItem('Token');

watch(radarData1.value, () => {
  option.value.series[0].data = [radarData1.value];
  option.value.series[1].data = [radarData2.value];
  console.log("222", option.value);
  const myChart = echarts.getInstanceByDom(echartsRef.value);
  myChart.setOption(option.value);
});

onMounted(() => {
  API({
    methods: 'get',
    url: '/data/p/pie',
    headers: {
      token: token.value
    }
  }).then(res => {
    const data = res.data.data;
    const currentExamData = data["本次考试"];
    const lastExamData = data["上次考试"];
    radarData1.value.value = currentExamData;
    radarData2.value.value = lastExamData;
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
