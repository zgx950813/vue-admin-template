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
          <el-button type="primary" plain @click="fulfillRunrateChart">Search</el-button>
        </el-col>

      </div>
    </el-form>

    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <!-- <line-chart /> -->
    </el-row>
    <el-row :gutter="32" style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <div class="dashboard-text">Subsidy Per Unit</div>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <line-chart ref="chartModel" />
        </div>
      </el-col>
      <!-- <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <line-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <line-chart />
        </div>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import LineChart from './components/RunrateSupportLineChart'
import { getVersion } from '@/api/dashboard'
import { getCarMonthlyRunratePolicies } from '@/api/runrateSupport'

export default {
  components: {
    LineChart
  },
  data() {
    return {
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
    async fulfillRunrateChart() {
      // this.$http.get('/api/version')
      //   .then((response) => {
      //     console.log(response)
      //     if (response.status === 200) {
      //       console.log('OK')
      //     } else {
      //       console.log('Error')
      //     }
      //   })

      var data = await getCarMonthlyRunratePolicies(this.form.year, this.form.quarter)
      this.$refs.chartModel.insertChartData(data)
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
