<script>
/*
 * @Author: Your name
 * @Date:   2021-02-04 15:35:22
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-02-04 16:40:29
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
        //   text: '项目进展分布图',
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
          data: ['组建工作组', '资料收集', '方案制定', '评价实施', '报告编写', '工作总结', '归档管理']
        },
        series: [
          {
            name: '',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: 2, name: '组建工作组' },
              { value: 4, name: '资料收集' },
              { value: 2, name: '方案制定' },
              { value: 4, name: '评价实施' },
              { value: 5, name: '报告编写' },
              { value: 1, name: '工作总结' },
              { value: 5, name: '归档管理' }
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
