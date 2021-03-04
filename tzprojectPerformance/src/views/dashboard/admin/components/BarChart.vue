<script>
/*
 * @Author: Your name
 * @Date:   2021-02-04 16:16:44
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-02-18 17:50:57
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
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        toolbox: {
          feature: {
            magicType: {type: ['line', 'bar']}
          }
        },
        // legend: {
        //   data: ['2020', '2019']
        // },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['2016', '2017', '2018', '2019', '2020', '2021'],
          axisTick: {
            alignWithLabel: true
          },
          // axisPointer: {
          //   type: 'shadow'
          // }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }, {
          type: '',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '',
          type: 'bar',
          barWidth: '40',
          // stack: 'vistors',
          // barWidth: '60%',
          data: [90, 252, 100, 114, 290, 330],
          label: {
            show: true,
            position: 'inside'
          },
          itemStyle: {
            color: '#5B9BD5'
          },
          animationDuration
        }, {
          name: '',
          type: 'line',
          // stack: 'vistors',
          // barWidth: '60%',
          yAxisIndex: 1,
          data: [90, 252, 100, 114, 290, 330],
          itemStyle: {
            color: '#5B9BD5'
          },
          animationDuration
        }]
      })
    }
  }
}
</script>
