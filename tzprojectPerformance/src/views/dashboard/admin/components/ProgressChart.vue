<script>
/*
 * @Author: Your name
 * @Date:   2021-02-04 16:16:44
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-02-18 14:07:29
 */
</script>
<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['主项目数', '子项目数'],
          left: 'right',
          top: '0'
        },
        grid: {
          top: '20',
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          data: ['0', '5', '10', '15', '20', '25', '30', '35', '40'],
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'category',
          data: ['项目立项', '组建工作组', '资料收集', '方案制定', '评价实施', '报告编写', '工作总结', '归档管理', '数据库管理']
        },
        series: [{
          name: '主项目数',
          type: 'bar',
          barWidth: '5',
          data: [190, 125, 300, 114, 90, 230, 120, 96, 279],
          itemStyle: {
            color: '#5B9BD5'
          },
          animationDuration
        }, {
          name: '子项目数',
          type: 'bar',
          barWidth: '5',
          data: [90, 252, 100, 114, 290, 330, 129, 229, 189],
          itemStyle: {
            color: '#ED7D31'
          },
          animationDuration
        }]
      })
    }
  }
}
</script>
