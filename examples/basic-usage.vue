<template>
  <div class="tooltip-examples">
    <h2>v-tooltip-plus 基础示例</h2>
    
    <section>
      <h3>基本用法</h3>
      <el-button v-tooltip="'这是一个基本的tooltip提示'">
        悬停查看提示
      </el-button>
    </section>
    
    <section>
      <h3>不同位置</h3>
      <div class="position-demo">
        <el-button v-tooltip:top="'顶部提示'">上</el-button>
        <el-button v-tooltip:right="'右侧提示'">右</el-button>
        <el-button v-tooltip:bottom="'底部提示'">下</el-button>
        <el-button v-tooltip:left="'左侧提示'">左</el-button>
      </div>
    </section>
    
    <section>
      <h3>主题</h3>
      <el-button v-tooltip.dark="'深色主题'">深色主题</el-button>
      <el-button v-tooltip.light="'浅色主题'">浅色主题</el-button>
    </section>
    
    <section>
      <h3>触发方式</h3>
      <el-button v-tooltip.hover="'悬停触发'">悬停触发</el-button>
      <el-button v-tooltip.click="'点击触发'">点击触发</el-button>
      <el-input 
        v-tooltip.focus="'聚焦触发'" 
        placeholder="点击输入框聚焦"
        style="width: 200px;"
      ></el-input>
    </section>
    
    <section>
      <h3>对象配置</h3>
      <el-button 
        v-tooltip="{
          content: '自定义配置的tooltip',
          placement: 'bottom',
          effect: 'light',
          openDelay: 500,
          popperClass: 'custom-tooltip'
        }"
      >
        自定义配置
      </el-button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'BasicUsage'
}
</script>

<style>
.tooltip-examples {
  padding: 20px;
  font-family: Arial, sans-serif;
}

section {
  margin-bottom: 30px;
}

h2 {
  color: #409EFF;
  margin-bottom: 20px;
}

h3 {
  margin-bottom: 15px;
}

.position-demo {
  display: flex;
  gap: 10px;
}

.custom-tooltip {
  background: #67C23A !important;
  color: white;
}
</style> 