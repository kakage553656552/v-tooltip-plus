# v-tooltip-plus

基于Element UI的增强版Vue tooltip指令，提供更友好、更灵活的tooltip功能。

## 在线演示

🔗 [在线示例](https://kakage553656552.github.io/v-tooltip-plus/)

## 特点

- 📦 封装Element UI Tooltip为Vue指令，使用更简洁
- 🔍 支持文本溢出自动显示tooltip功能
- 🎨 完全兼容Element UI的样式和主题
- 🚀 高性能实现，内置实例池复用机制
- 📱 支持多种触发方式和位置

## 安装

```bash
npm install v-tooltip-plus --save
# 或使用 yarn
yarn add v-tooltip-plus
```

## 使用方法

### 全局注册

```js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VTooltipPlus from 'v-tooltip-plus'

// 使用Element UI
Vue.use(ElementUI)

// 注册自定义tooltip指令
Vue.use(VTooltipPlus)
```

### 按需引入

```js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Tooltip, TooltipOverflow } from 'v-tooltip-plus'

// 使用Element UI
Vue.use(ElementUI)

// 仅注册需要的指令
Vue.use(Tooltip)     // 注册v-tooltip指令
Vue.use(TooltipOverflow)  // 注册v-tooltip-overflow指令
```

## 基本用法

### v-tooltip 指令

```html
<!-- 简单使用，字符串内容 -->
<button v-tooltip="'这是提示内容'">悬停查看提示</button>

<!-- 使用参数指定位置 -->
<button v-tooltip:top="'这是顶部提示'">顶部提示</button>
<button v-tooltip:bottom-start="'这是底部左对齐提示'">底部左对齐提示</button>

<!-- 使用修饰符 -->
<button v-tooltip.light="'这是浅色主题提示'">浅色主题</button>
<button v-tooltip.click="'点击显示提示'">点击显示</button>

<!-- 对象配置方式，支持所有el-tooltip的属性 -->
<button v-tooltip="{
  content: '这是提示内容',
  placement: 'right',
  effect: 'light',
  openDelay: 500,
  popperClass: 'my-tooltip'
}">自定义配置</button>
```

### v-tooltip-overflow 指令

该指令专门用于处理文本溢出时显示tooltip的场景：

```html
<!-- 文本水平溢出时显示tooltip -->
<div 
  style="width: 150px;"
  v-tooltip-overflow="'这是一段很长很长很长很长很长很长的文字，会溢出容器'">
  这是一段很长很长很长很长很长很长的文字，会溢出容器
</div>

<!-- 垂直方向溢出检测 -->
<div 
  style="width: 150px; height: 40px;"
  v-tooltip-overflow.vertical="{
    content: '多行文本溢出时显示tooltip',
    lines: 2  // 显示2行，超出部分省略
  }">
  这是一段很长很长很长很长很长很长的多行文本，会垂直方向溢出容器
</div>

<!-- 自定义tooltip样式和行为 -->
<div 
  style="width: 100px;"
  v-tooltip-overflow="{
    placement: 'bottom',
    effect: 'light',
    content: '自定义tooltip内容',
    popperClass: 'custom-tooltip'
  }">
  文本溢出时显示自定义tooltip
</div>
```

## 支持的配置项

指令支持Element UI Tooltip组件的所有属性，主要包括：

| 属性           | 说明                                                 | 类型           | 默认值       |
|---------------|------------------------------------------------------|---------------|-------------|
| content       | 显示的内容，可被slot覆盖                                | String        | —           |
| placement     | Tooltip的出现位置                                     | String        | bottom      |
| effect        | 默认提供的主题                                         | String        | dark        |
| disabled      | Tooltip是否可用                                       | Boolean       | false       |
| offset        | 出现位置的偏移量                                       | Number        | 0           |
| transition    | 动画名称                                              | String        | el-fade-in-linear |
| visible-arrow | 是否显示箭头                                           | Boolean       | true        |
| popper-options| popper.js的参数                                       | Object        | {boundariesElement: 'body', gpuAcceleration: false} |
| open-delay    | 延迟出现，单位毫秒                                     | Number        | 0           |
| manual        | 手动控制模式                                           | Boolean       | false       |
| popper-class  | 为Tooltip添加类名                                     | String        | —           |
| enterable     | 鼠标是否可进入tooltip中                                | Boolean       | true        |
| hide-after    | 自动隐藏延时，单位毫秒，为0则不会自动隐藏                | Number        | 0           |
| tabindex      | Tooltip的tabindex                                    | Number        | 0           |

## v-tooltip-overflow 额外配置项

| 属性           | 说明                                                 | 类型           | 默认值       |
|---------------|------------------------------------------------------|---------------|-------------|
| direction     | 检测溢出的方向，可选值horizontal/vertical/both          | String        | horizontal  |
| lines         | 配合vertical方向使用，指定显示的行数                     | Number        | 1           |

## 开发指南

### 环境安装

```bash
npm install
```

### 开发与构建

```bash
# 开发模式 (带热更新)
npm run dev

# 构建生产版本
npm run build

# 代码格式检查
npm run lint
```

## 打包输出

构建后的文件将输出在 `dist` 目录下：

- `v-tooltip-plus.umd.js` - UMD格式，用于直接在浏览器中通过 `<script>` 标签使用
- `v-tooltip-plus.umd.min.js` - 压缩后的UMD格式，用于生产环境
- `v-tooltip-plus.common.js` - CommonJS格式，用于构建工具如webpack

## 许可证

MIT 