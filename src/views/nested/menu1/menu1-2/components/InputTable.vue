<template>
  <el-table
    :data="tableData"
    height="250"
    border
    fit
    element-loading-text="拼命加载中"
    style="width: 100%"
  >
    <el-table-column label="No." prop="number" />
    <el-table-column label="Model" prop="model" />
    <el-table-column label="1st Month TA" prop="month_target1">
      <template slot-scope="scope">
        <el-input v-model="scope.row.month_target1" type="number" placeholder="0" />
      </template>
    </el-table-column>
    <el-table-column label="2nd Month TA" prop="month_target2">
      <template slot-scope="scope">
        <el-input v-model="scope.row.month_target2" type="number" placeholder="0" />
      </template>
    </el-table-column>
    <el-table-column label="3rd Month TA" prop="month_target3">
      <template slot-scope="scope">
        <el-input v-model="scope.row.month_target3" type="number" placeholder="0" />
      </template>
    </el-table-column>
    <el-table-column label="1st Month FC" prop="month_forcast1">
      <template slot-scope="scope">
        <el-input v-model="scope.row.month_forcast1" type="number" placeholder="0" />
      </template>
    </el-table-column>
    <el-table-column label="2nd Month FC" prop="month_forcast2">
      <template slot-scope="scope">
        <el-input v-model="scope.row.month_forcast2" type="number" placeholder="0" />
      </template>
    </el-table-column>
    <el-table-column label="3rd Month FC" prop="month_forcast3">
      <template slot-scope="scope">
        <el-input v-model="scope.row.month_forcast3" type="number" placeholder="0" />
      </template>
    </el-table-column>
    <el-table-column label="1st Month Ach%" prop="month_ach1" />
    <el-table-column label="2nd Month Ach%" prop="month_ach2" />
    <el-table-column label="3rd Month Ach%" prop="month_ach3" />
    <el-table-column label="Quarter TA" prop="quarter_target" />
    <el-table-column label="Quarter FC" prop="quarter_forecast" />
    <el-table-column label="Quarter Ach%" prop="quarter_ach" />
  </el-table>
</template>

<script>
export default {
  props: {

  },
  data() {
    return {
      tableData: [{
        month_target1: '5',
        month_target2: '8',
        month_target3: '7',
        month_forcast1: '2',
        month_forcast2: '1',
        month_forcast3: '3',
        number: '1',
        model: 'Model A'
      }]
    }
  },
  methods: {
    calculate() {
      this.tableData.forEach(row => {
        row.month_ach1 = (row.month_forcast1 / row.month_target1 * 100).toFixed(2) + '%'
        row.month_ach2 = (row.month_forcast2 / row.month_target2 * 100).toFixed(2) + '%'
        row.month_ach3 = (row.month_forcast3 / row.month_target3 * 100).toFixed(2) + '%'
        row.quarter_target = (Number(row.month_target1) + Number(row.month_target2) + Number(row.month_target3))
        row.quarter_forecast = (Number(row.month_forcast1) + Number(row.month_forcast2) + Number(row.month_forcast3))
        row.quarter_ach = (row.quarter_forecast / row.quarter_target * 100).toFixed(2) + '%'
      })
    //   this.tableData[0].month_ach1 = this.tableData[0].month_target1/
    //   return this.tableData[0].month_target1
    }
  }
}
</script>

<style>
</style>
