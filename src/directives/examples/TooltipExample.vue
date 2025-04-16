<template>
  <div class="tooltip-examples">
    <h2>Tooltip 指令示例</h2>
    
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
    
    <section>
      <h3>溢出提示</h3>
      <div class="overflow-container">
        <div 
          class="overflow-text"
          v-tooltip-overflow="'这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文本内容'"
        >
          这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文本内容
        </div>
        
        <div 
          class="overflow-text vertical"
          v-tooltip-overflow.vertical="{
            content: '这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的多行文本内容',
            lines: 2
          }"
        >
          这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的多行文本内容
        </div>
        
        <div 
          class="overflow-text"
          v-tooltip-overflow="{
            placement: 'right',
            effect: 'light',
            popperClass: 'custom-overflow-tooltip'
          }"
        >
          自定义样式的溢出提示，鼠标悬停查看效果
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TooltipExample'
}
</script>

<style scoped>
.tooltip-examples {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

section {
  margin-bottom: 30px;
}

h2 {
  margin-bottom: 20px;
}

h3 {
  margin-bottom: 15px;
}

.position-demo {
  display: flex;
  justify-content: space-between;
  width: 300px;
}

.position-demo button {
  margin-right: 10px;
}

.overflow-container {
  width: 100%;
}

.overflow-text {
  width: 200px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.overflow-text.vertical {
  height: 50px;
}

/* 自定义tooltip样式 */
:global(.custom-tooltip) {
  background-color: #f0f9eb;
  color: #67c23a;
  border: 1px solid #c2e7b0;
}

:global(.custom-overflow-tooltip) {
  background-color: #ecf5ff;
  color: #409eff;
  border: 1px solid #b3d8ff;
}
</style> 