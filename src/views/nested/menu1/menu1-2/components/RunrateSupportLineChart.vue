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
      required: false
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
      this.setPreOptions()
    },
    insertChartData(data) {
      var legend_data = []
      var series = []
      for (var i = 0; i < data.name.length; i++) {
        legend_data.push(data.name[i])
        series.push({
          smooth: false,
          type: 'line',
          step: 'end',
          symbolSize: 5,
          name: data.name[i],
          data: data.point[i]
        })
      }
      this.chart.setOption({
        xAxis: {
          min: data.xAxis.min,
          max: data.xAxis.max
        },
        yAxis: {
          min: data.yAxis.min,
          max: data.yAxis.max
        },
        legend: {
          data: legend_data
        },
        series: series
      })
    },
    setPreOptions() {
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
          right: '12%',
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
          position: ['50%', '50%'],
          padding: [5, 10]
        },
        legend: {
          right: '0%',
          top: '12%',
          type: 'scroll',
          data: []
        },
        series: []
      })
    }
  }
}
</script>
