<template>
    <div style="display: flex; justify-content: center; width: 100%;">
        <a style="margin-top: 5px; margin-right: 2%; font-weight: bold;">选择不同学科折线图显示</a>
        <el-select v-model="selectedValue" placeholder="请选择学科" style="width: 240px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
    </div>
    <div class="echarts" ref="echartsRef" style="width: 100%; height: 560px; margin-top: 1%"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { TooltipComponent, GridComponent, ToolboxComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 引入图表和组件
echarts.use([LineChart, TooltipComponent, GridComponent, TitleComponent,
    ToolboxComponent, CanvasRenderer]);

const echartsRef = ref(null);
const selectedValue = ref(null);
const options = [
    { label: '语文', value: '1' },
    { label: '数学', value: '2' },
    { label: '英语', value: '3' },
    { label: '物理', value: '4' },
    { label: '化学', value: '5' },
    { label: '生物', value: '6' },
    { label: '历史', value: '7' },
    { label: '地理', value: '8' },
    { label: '政治', value: '9' },
];

watch(selectedValue, (newValue, oldValue) => {
    if (newValue !== null) {
        renderChart(newValue);
    }
});

onMounted(() => {
    renderChart('1'); // 默认显示语文的数据
});

const renderChart = (subject) => {
    if (!subject || isNaN(subject)) {
        console.error("Invalid subject value:", subject);
        return;
    }

    const subjectIndex = parseInt(subject) - 1; // 索引从0开始
    if (subjectIndex < 0 || subjectIndex >= options.length) {
        console.error("Invalid subject index:", subjectIndex);
        return;
    }

    const myChart = echarts.init(echartsRef.value);
    myChart.setOption({
        ...option,
        title: {
            text: options[subjectIndex].label + "考试成绩折线图",
            textStyle: {
                color: "#000000"
            }
        },
        legend: {
            data: [options[subjectIndex].label],
            textStyle: {
                color: "#a1a1a1"
            }
        },
        series: [{
            name: options[subjectIndex].label,
            type: 'line',
            stack: '总量',
            data: scores[subjectIndex]
        }]
    });
};

const scores = [
    [120, 132, 101, 134, 90, 130, 120], // 语文
    [130, 112, 119, 130, 145, 122, 118], // 数学
    [120, 132, 121, 138, 128, 137, 130], // 英语
    [90, 85, 95, 80, 87, 92, 88], // 物理
    [82, 93, 90, 93, 80, 85, 88], // 化学
    [62, 73, 70, 73, 68, 70, 75], // 生物
    [52, 63, 60, 63, 55, 58, 60], // 历史
    [42, 53, 50, 53, 45, 48, 50], // 地理
    [72, 83, 80, 83, 75, 78, 80], // 政治
];

const option = {
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "cross",
            label: {
                backgroundColor: "#6a7985"
            }
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
};
</script>

<style scoped lang="scss">
.echarts {
    width: 100%;
    height: 100%;
}
</style>
