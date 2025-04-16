<template>
  <div class="overflow-examples">
    <h2>v-tooltip-overflow 示例</h2>
    
    <section>
      <h3>水平溢出</h3>
      <div 
        class="overflow-box"
        v-tooltip-overflow="'这是一段很长很长很长很长很长很长的文字，会溢出容器，当鼠标悬停时会显示完整内容'"
      >
        这是一段很长很长很长很长很长很长的文字，会溢出容器，当鼠标悬停时会显示完整内容
      </div>
    </section>
    
    <section>
      <h3>垂直溢出</h3>
      <div 
        class="overflow-box vertical"
        v-tooltip-overflow.vertical="{
          content: '这是多行内容，超出了容器高度限制的内容会被截断。当文本内容较多时，垂直方向会出现省略号，鼠标悬停时会显示完整内容。这是一个很实用的功能，特别适合展示有字数限制的描述、说明等。',
          lines: 3
        }"
      >
        这是多行内容，超出了容器高度限制的内容会被截断。当文本内容较多时，垂直方向会出现省略号，鼠标悬停时会显示完整内容。这是一个很实用的功能，特别适合展示有字数限制的描述、说明等。
      </div>
    </section>
    
    <section>
      <h3>自定义配置</h3>
      <div 
        class="overflow-box custom"
        v-tooltip-overflow:bottom="{
          content: '自定义配置的tooltip溢出提示',
          effect: 'light',
          popperClass: 'custom-overflow-tooltip'
        }"
      >
        自定义配置的tooltip溢出提示，鼠标悬停查看
      </div>
    </section>
    
    <section>
      <h3>表格中的应用</h3>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="address" label="地址" width="180">
          <template slot-scope="scope">
            <div v-tooltip-overflow="scope.row.address">
              {{ scope.row.address }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述">
          <template slot-scope="scope">
            <div 
              v-tooltip-overflow.vertical="{
                content: scope.row.description,
                lines: 2
              }"
              style="height: 42px;"
            >
              {{ scope.row.description }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
export default {
  name: 'OverflowExample',
  data() {
    return {
      tableData: [
        {
          date: '2023-05-01',
          name: '张三',
          address: '北京市朝阳区某某街道某某小区1号楼1单元101室',
          description: '这是一段很长的描述文本，用于测试在表格单元格中的文本溢出效果。当文本内容超出了单元格的显示范围时，会自动显示tooltip。'
        },
        {
          date: '2023-05-02',
          name: '李四',
          address: '上海市浦东新区某某路某某大厦B座25楼',
          description: '另一段描述文本，同样用于测试表格中的文本溢出效果。这个功能非常适合表格中的数据展示，提高了用户体验。'
        },
        {
          date: '2023-05-03',
          name: '王五',
          address: '广州市天河区某某广场C区',
          description: '第三段测试描述，内容不多，但依然可以测试文本溢出效果。当鼠标悬停在溢出的文本上时，会显示完整内容。'
        }
      ]
    }
  }
}
</script>

<style>
.overflow-examples {
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

.overflow-box {
  width: 250px;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-bottom: 15px;
}

.overflow-box.vertical {
  height: 80px;
}

.overflow-box.custom {
  width: 200px;
  background-color: #f0f9eb;
  border-color: #c2e7b0;
}

.custom-overflow-tooltip {
  max-width: 300px !important;
  background: #f0f9eb !important;
  color: #67c23a !important;
  border: 1px solid #c2e7b0 !important;
}
</style> 