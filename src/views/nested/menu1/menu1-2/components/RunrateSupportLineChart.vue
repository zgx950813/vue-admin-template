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
        xAxis: {
          type: 'value',
          name: 'MONTHLY TARGET ACH%',
          min: '60%',
          max: '120%',
          axisTick: {
            show: true
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          name: 'SUBSIDY SUPPORT',
          min: 8000,
          max: 20000,
          axisTick: {
            show: true
          },
          splitLine: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer: {
        //     type: 'cross'
        //   },
        //   padding: [5, 10]
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#ccc',
              borderColor: '#aaa',
              borderWidth: 1,
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              textStyle: {
                color: '#222'
              }
            }
          },
          formatter: function(params) {
            return params[2].name + '<br />' + params[2].value
          }
        },
        legend: {
          data: ['Model A', 'Model B']
        },
        series: [
          {
            name: 'expected',
            animationEasing: 'quadraticOut',
            type: 'line',
            smooth: true,
            step: 'end',
            data: expectedData,
            itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            }
          },
          {
            name: 'actual',
            animationEasing: 'cubicInOut',
            type: 'line',
            smooth: true,
            step: 'end',
            data: actualData,
            itemStyle: {
              normal: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2
                }
              }
            }
          }
        ]
      })
    }
  }
}
</script>
