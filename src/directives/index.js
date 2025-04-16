import tooltipDirective from './tooltip'
import tooltipOverflowDirective from './tooltip-overflow'

// 定义和导出指令集合
const directives = {
  install(Vue) {
    // 注册tooltip指令
    Vue.use(tooltipDirective)
    // 注册tooltipOverflow指令
    Vue.use(tooltipOverflowDirective)
  }
}

// 支持按需引入
export const Tooltip = tooltipDirective
export const TooltipOverflow = tooltipOverflowDirective

// 默认导出所有指令
export default directives 