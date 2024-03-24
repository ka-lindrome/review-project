import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout]);

let option;

export const useInitPieChart = (chartDom) => {
  const myChart = echarts.init(chartDom);

  option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '2%',
      left: 'center'
    },
    series: [
      {
        name: '学生各个分数段人数',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 3, name: '900分以上' },
          { value: 15, name: '750分 ~ 900分' },
          { value: 26, name: '600分 ~ 750分' },
          { value: 5, name: '750分以下' }
        ]
      }
    ]
  };

  option && myChart.setOption(option);
};

export default { useInitPieChart };
