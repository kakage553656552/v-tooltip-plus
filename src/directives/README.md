# Element UI Tooltip 自定义指令

这个包提供了两个封装了Element UI Tooltip的自定义指令：
- `v-tooltip`: 支持Element UI Tooltip的所有功能的通用指令
- `v-tooltip-overflow`: 专门用于文本溢出时显示提示的指令

## 安装

```js
// main.js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import TooltipDirectives from './directives'

// 使用Element UI
Vue.use(ElementUI)

// 注册自定义tooltip指令
Vue.use(TooltipDirectives)
```

如果需要按需引入:

```js
import { Tooltip, TooltipOverflow } from './directives'

Vue.use(Tooltip)
Vue.use(TooltipOverflow)
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
| value/v-model | 状态是否可见                                           | Boolean       | false       |
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