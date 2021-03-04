<script>
/*
 * @Author: Your name
 * @Date:   2021-02-04 15:35:22
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-02-09 16:11:03
 */
</script>
<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
        // title: {
        //   text: '项目总数分布图',
        //   left: 'center',
        //   top: 0
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['财政评价项目', '部门评价项目']
        },
        series: [
          {
            name: '',
            type: 'pie',
            // roseType: 'radius',
            // radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: 40, name: '财政评价项目' },
              { value: 60, name: '部门评价项目' },
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
