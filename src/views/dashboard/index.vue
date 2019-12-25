<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Welcome {{ name }}<br><span class="dashboard-text1"> you can use this function to simulate your variable market subsidy.</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-text1 {
    font-size: 25px;
    line-height: 40px;
  }
}
</style>
