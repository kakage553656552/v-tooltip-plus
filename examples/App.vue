<template>
  <div id="app">
    <h1>v-tooltip-plus 示例</h1>
    
    <el-tabs type="border-card">
      <el-tab-pane label="基础示例">
        <basic-usage />
      </el-tab-pane>
      <el-tab-pane label="溢出示例">
        <overflow-example />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BasicUsage from './basic-usage.vue'
import OverflowExample from './overflow-example.vue'

export default {
  name: 'App',
  components: {
    BasicUsage,
    OverflowExample
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #409EFF;
  margin-bottom: 30px;
}
</style> 