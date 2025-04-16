import Vue from 'vue'

// 通用Tooltip配置选项接口
export interface TooltipOptions {
  content?: string
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
  effect?: 'dark' | 'light'
  disabled?: boolean
  offset?: number
  transition?: string
  visibleArrow?: boolean
  popperOptions?: any
  openDelay?: number
  manual?: boolean
  popperClass?: string
  enterable?: boolean
  hideAfter?: number
  tabindex?: number
}

// TooltipOverflow特有的配置选项
export interface TooltipOverflowOptions extends TooltipOptions {
  direction?: 'horizontal' | 'vertical' | 'both'
  lines?: number
}

// 扩展Vue接口增加指令
declare module 'vue/types/vue' {
  interface VueConstructor {
    use(plugin: TooltipPlugin): VueConstructor
  }
}

// 定义插件类型
export interface TooltipPlugin {
  install(vue: typeof Vue): void
}

// 导出的指令模块
export const Tooltip: TooltipPlugin
export const TooltipOverflow: TooltipPlugin

// 默认导出
declare const VTooltipPlus: TooltipPlugin
export default VTooltipPlus 