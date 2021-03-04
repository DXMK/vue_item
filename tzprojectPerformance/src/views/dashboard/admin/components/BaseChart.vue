<script>
/*
 * @Author: Your name
 * @Date:   2021-02-04 15:35:22
 * @Last Modified by:   Your name
 * @Last Modified time: 2021-02-18 12:06:35
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
        //   formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'left',
          bottom: '5',
          data: ['采矿业', '制造业', '建筑业', '金融业']
        },
        series: [
          {
            name: '',
            type: 'pie',
            // roseType: 'radius',
            radius: [0, '40%'],
            center: ['45%', '45%'],
            data: [
              { value: 32, name: '采矿业' },
              { value: 24, name: '制造业' },
              { value: 14, name: '建筑业' },
              { value: 14, name: '金融业' }
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
