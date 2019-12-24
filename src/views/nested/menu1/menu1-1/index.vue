<template>
  <div class="app-container">
    <h1 style="text-align: center;" label-width="190px">Runrate Policy  Input Demo</h1>
    <el-form ref="form" :model="form" label-width="190px" label-position="right">
      <el-form-item label="Policy duration">
        <el-col :span="10">
          <el-date-picker v-model="form.monthrange" type="monthrange" style="width: 100%;" />
        </el-col>
        <el-col class="line" :span="2">{{ form.text }}</el-col>
      </el-form-item>
      <el-form-item label="Support Time-type">
        <el-switch
          v-model="form.timetype"
          active-color="#13ce66"
          inactive-color="#13ce66"
          active-text="Monthly"
          inactive-text="Quarterly"
        />
      </el-form-item>
      <!-- <el-form-item label="Car brand">
        <el-switch
          v-model="form.brand"
          active-color="#13ce66"
          inactive-color="#13ce66"
          active-text="LandRover"
          inactive-text="Jaguar"
        />
      </el-form-item>
      <el-form-item label="Car region">
        <el-switch
          v-model="form.region"
          active-color="#13ce66"
          inactive-color="#13ce66"
          active-text="Local"
          inactive-text="Import"
        />
      </el-form-item> -->

      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="35"
        />
        <el-table-column
          label="Brand"
          width="180"
        >
          <template slot-scope="scope">{{ scope.row.brand }}</template>
        </el-table-column>
        <el-table-column
          prop="region"
          label="Region"
          width="100"
        />
        <el-table-column
          prop="model"
          label="Model"
          width="100"
        />
        <el-table-column
          prop="modelyear"
          label="Model year"
          width="120"
        />
        <el-table-column
          prop="trim"
          label="Trim"
          show-overflow-tooltip
        />
        <el-table-column
          prop="alias"
          label="Alias"
          width="100"
        />
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="get_version()">Get Version</el-button>
      </div>
      <el-form-item label="Runrate interval">
        <el-slider
          v-model="form.value"
          style="width: 50%"
          range
          show-stops
          :step="5"
          :min="70"
          :max="120"
        />
      </el-form-item>
      <el-form-item label="Subsidy">
        <el-input
          v-model="form.input"
          style="width: 25%"
          type="number"
          step="500"
          placeholder="  --input subsidy--  "
          prefix-icon="el-icon-edit"
          clearable
        />
      </el-form-item>
      <el-button type="primary" plain>Submit</el-button>
    </el-form>
  </div>
</template>

<script>
import { getVersion } from '@/api/dashboard'
export default {
  data() {
    return {
      form: {
        text: 'Q1',
        value: [80, 90],
        monthrange: '',
        // brand: false,
        // region: false,
        timetype: false,
        input: ''
      },

      tableData: [{
        id: 1,
        brand: 'LandRover',
        children: [{
          id: 11,
          brand: 'LandRover',
          region: 'Local',
          children: [{
            id: 111,
            brand: 'LandRover',
            region: 'Local',
            model: 'L550',
            children: [{
              id: 1111,
              brand: 'LandRover',
              region: 'Local',
              model: 'L550',
              modelyear: 'L550 18MY',
              children: [{
                id: 11111,
                brand: 'LandRover',
                region: 'Local',
                model: 'L550',
                modelyear: 'L550 18MY',
                trim: '200PS PURE',
                alias: '351DJ'
              }]
            }]
          }]
        },
        {
          id: 12,
          brand: 'LandRover',
          region: 'Import'
        }]
      },
      {
        id: 2,
        brand: 'Jaguar',
        children: [{
          id: 21,
          brand: 'Jaguar',
          region: 'Local'
        },
        {
          id: 22,
          brand: 'Jaguar',
          region: 'Import'
        }]
      }],
      multipleSelection: []
    }
  },
  methods: {
    get_version() {
      getVersion().then(response => {
        this.form.text = response
      })
    }
    // onSubmit() {
    //   this.$message('submit!')
    // },
    // onCancel() {
    //   this.$message({
    //     message: 'cancel!',
    //     type: 'warning'
    //   })
    // },
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.multipleTable.toggleRowSelection(row)
    //     })
    //   } else {
    //     this.$refs.multipleTable.clearSelection()
    //   }
    // },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val
    // },
    // load(tree, treeNode, resolve) {
    //   setTimeout(() => {
    //     resolve([
    //       {
    //         id: 11,
    //         brand: 'LandRover',
    //         region: 'Local'
    //       },
    //       {
    //         id: 12,
    //         brand: 'LandRover',
    //         region: 'Import'
    //       },
    //       {
    //         id: 21,
    //         brand: 'Jaguar',
    //         region: 'Local'
    //       },
    //       {
    //         id: 22,
    //         brand: 'Jaguar',
    //         region: 'Import'
    //       }
    //     ])
    //   }, 1000)
    // }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
