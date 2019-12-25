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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
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
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        title: {
          text: 'Monthly Runrate Support StepLine',
          // subtext: '2019 Q4',
          left: 'center',
          top: '10px'
          // textStyle: {
          //   height: '56px'
          // }
        },
        xAxis: {
          type: 'value',
          name: 'ACH%',
          min: 70,
          max: 110,
          axisTick: {
            show: true,
            alignWithLabel: true
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value} %'
          }
        },
        yAxis: {
          type: 'value',
          name: 'SUBSIDY',
          min: 0,
          max: 20000,
          axisTick: {
            show: true
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            formatter: '￥{value}'
          }
        },
        grid: {
          left: '0%',
          right: '5%',
          bottom: '5%',
          top: '20%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            show: true,
            type: 'cross'
          },
          padding: [5, 10]
        },
        legend: {
          right: '0%',
          top: '12%',
          type: 'scroll',
          data: ['LandRover Local L550 2018 200PS PURE', 'LandRover Local L550 2019 200PS PURE']
        },
        series: [
          {
            name: 'LandRover Local L550 2018 200PS PURE',
            data: expectedData,
            smooth: false,
            type: 'line',
            step: 'end',
            symbolSize: 5

          },
          {
            name: 'LandRover Local L550 2019 200PS PURE',
            data: actualData,
            smooth: false,
            type: 'line',
            step: 'end',
            symbolSize: 5
          }
        ]
      })
    }
  }
}
</script>
