<template>
  <div class="app-editor-container">
    <h1 style="text-align: center;" label-width="190px">Runrate Policy  Simulation Demo</h1>
    <el-form ref="form" :model="form" label-width="190px" label-position="right">
      <div class="container">

        <el-col :span="8">
          <span class="demonstration">Policy Year: </span>
          <el-date-picker
            v-model="form.year"
            type="year"
            placeholder="--select Year--"
          />
        </el-col>

        <el-col :span="8">
          <span class="demonstration">Policy Quarter: </span>
          <el-select v-model="form.quarter" placeholder="--select Quarter--">
            <el-option
              v-for="item in form.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>

        <el-col :span="8">
          <el-button type="primary" plain @click="getPolicy()">Search</el-button>
        </el-col>

      </div>
    </el-form>
    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData1" />
    </el-row>
    <el-row :gutter="32" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <div class="dashboard-text">Subsidy Per Unit</div>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <line-chart :chart-data="lineChartData1" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <line-chart :chart-data="lineChartData1" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <line-chart :chart-data="lineChartData1" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import LineChart from './components/LineChart'
import LineChart from './components/RunrateSupportLineChart'
import { getCarMonthlyRunratePolicies } from '@/api/runrateSupport'

const lineChartData = {
  newVisitis: {
    expectedData: [[0.8, 9500], [0.9, 9500], [1, 10500], [1.1, 10500]],
    actualData: [[0.8, 18500], [0.9, 18500], [1, 19500], [1.1, 19500]]
  }
}

export default {
  components: {
    LineChart
  },
  data() {
    return {
      lineChartData1: lineChartData.newVisitis,
      form: {
        year: new Date().getFullYear().toString(),
        options: [{
          value: '1',
          label: 'Quarter 1'
        }, {
          value: '2',
          label: 'Quarter 2'
        }, {
          value: '3',
          label: 'Quarter 3'
        }, {
          value: '4',
          label: 'Quarter 4'
        }],
        quarter: ((new Date().getMonth()) % 4 + 1).toString()
      }
    }
  },
  methods: {
    getPolicy() {
      getCarMonthlyRunratePolicies(this.form.year, this.form.quarter).then(response => {
        // 先取出response.car_policy的个数，即要在图中画几条线，本例中，虽然有12条线，但实际上各4条线重合，故不一样的3条线
        var lineNumber = response.car_policy.length
        // 再取出每个单元里的upper，lower和subsidy
        for (var i = 0; i < lineNumber; i++) {
          console.log(response.car_policy[i].policy.upper)
          console.log(response.car_policy[i].policy.lower)
          console.log(response.car_policy[i].policy.subsidy)
        }
        // response.car_policy.forEach(policy => {
        //   console.log(policy.upper)
        //   console.log(policy.lower)
        //   console.log(policy.subsidy)
        // })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 12px;
  margin-bottom: 60px;
  margin-top: 60px;
}
.app-editor-container {
  padding: 32px;
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
