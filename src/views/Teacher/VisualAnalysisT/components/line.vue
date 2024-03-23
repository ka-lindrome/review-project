<template>
    <div class="echarts" ref="echartsRef" style="width: 100%; height: 600px; margin-top: 1%"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { TooltipComponent, GridComponent, ToolboxComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import API from '@/utils/axiosInference';

// 引入图表和组件
echarts.use([LineChart, TooltipComponent, GridComponent, TitleComponent,
    ToolboxComponent, CanvasRenderer]);

const echartsRef = ref(null);

onMounted(() => {
    const myChart = echarts.init(echartsRef.value);
    myChart.setOption(option);
});

const option = {
    title: {
        text: "近期考试各科成绩折线图",
        textStyle: {
            color: "#000000"
        }
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "cross",
            label: {
                backgroundColor: "#6a7985"
            }
        }
    },
    legend: {
        data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
        textStyle: {
            color: "#a1a1a1"
        }
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
    },
    xAxis: [
        {
            type: "category",
            boundaryGap: false,
            data: ["第一次月考", "期中考试", "第二次月考", "期末考试", "一模考试", "二模考试", "三模考试"],
            axisLabel: {
                color: "#a1a1a1"
            }
        }
    ],
    yAxis: [
        {
            type: "value",
            axisLabel: {
                color: "#a1a1a1"
            }
        }
    ],
    series: [
        {
            name: "Email",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
                focus: "series"
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: "Union Ads",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
                focus: "series"
            },
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
                focus: "series"
            },
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: "Direct",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
                focus: "series"
            },
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: "Search Engine",
            type: "line",
            stack: "Total",
            label: {
                show: true,
                position: "top"
            },
            areaStyle: {},
            emphasis: {
                focus: "series"
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};
</script>

<style scoped lang="scss">
.echarts {
    width: 100%;
    height: 100%;
}
</style>