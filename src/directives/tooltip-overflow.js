import Vue from 'vue'
import ElementUI from 'element-ui'

// 在文档中创建一个容器来挂载tooltip组件
let tooltipContainer = null
function ensureContainer() {
  if (!tooltipContainer) {
    tooltipContainer = document.createElement('div')
    tooltipContainer.id = 'tooltip-overflow-container'
    document.body.appendChild(tooltipContainer)
  }
  return tooltipContainer
}

// 创建一个Tooltip组件的实例池
const tooltipPool = []
function getTooltipInstance() {
  // 如果池中有可用实例，则复用
  if (tooltipPool.length > 0) {
    return tooltipPool.pop()
  }

  // 创建新的Tooltip实例
  const container = document.createElement('div')
  ensureContainer().appendChild(container)

  // 创建一个新的Vue应用实例来挂载Tooltip
  return new Vue({
    el: container,
    data() {
      return {
        visible: false,
        content: '',
        placement: 'top',
        reference: null,
        popperClass: 'tooltip-overflow-popper'
      }
    },
    render(h) {
      return h(ElementUI.Tooltip, {
        props: {
          content: this.content,
          placement: this.placement,
          value: this.visible,
          effect: 'dark',
          visibleArrow: true,
          popperClass: this.popperClass,
          openDelay: 0,
          manual: true,
          enterable: false,
          appendToBody: true
        },
        ref: 'tooltip'
      }, [h('span', { style: 'display: inline-block;width:0;height:0;' })])
    },
    methods: {
      show() {
        this.visible = true
      },
      hide() {
        this.visible = false
      },
      updateReference(el) {
        const tooltip = this.$refs.tooltip
        if (tooltip) {
          tooltip.referenceElm = el
          
          // 确保位置更新
          Vue.nextTick(() => {
            if (tooltip.updatePopper) {
              tooltip.updatePopper()
            }
            
            // 强制刷新popper位置
            if (tooltip.$refs && tooltip.$refs.popper && tooltip.$refs.popper.$refs && tooltip.$refs.popper.$refs.popper) {
              const popperJS = tooltip.$refs.popper.$refs.popper
              if (popperJS && popperJS.update) {
                popperJS.update()
              }
            }
          })
        }
      }
    }
  })
}

function releaseTooltipInstance(instance) {
  instance.hide()
  tooltipPool.push(instance)
}

// 检查元素是否溢出
function isOverflowing(el, direction = 'horizontal') {
  if (!el) return false

  try {
    if (direction === 'horizontal') {
      return Math.ceil(el.scrollWidth) > Math.ceil(el.clientWidth)
    } else if (direction === 'vertical') {
      return Math.ceil(el.scrollHeight) > Math.ceil(el.clientHeight)
    } else if (direction === 'both') {
      return Math.ceil(el.scrollWidth) > Math.ceil(el.clientWidth) || 
             Math.ceil(el.scrollHeight) > Math.ceil(el.clientHeight)
    }
  } catch (e) {
    console.error('检测溢出错误:', e)
  }
  
  return false
}

// 设置元素的基本样式
function setBaseStyle(el, binding) {
  el.style.overflow = 'hidden'
  el.style.textOverflow = 'ellipsis'
  
  if (binding.modifiers && binding.modifiers.vertical) {
    el.style.display = '-webkit-box'
    el.style.webkitBoxOrient = 'vertical'
    const lines = binding.value && binding.value.lines ? binding.value.lines : 1
    el.style.webkitLineClamp = lines
  } else {
    el.style.whiteSpace = 'nowrap'
  }
}

// 更新tooltip的内容和显示
function updateTooltip(el, binding) {
  // 获取或创建元数据对象
  if (!el._tooltipOverflow) {
    el._tooltipOverflow = {}
  }
  
  // 确定内容
  let content = ''
  if (typeof binding.value === 'object' && binding.value.content) {
    content = binding.value.content
  } else if (typeof binding.value === 'string') {
    content = binding.value
  } else {
    content = el.textContent.trim()
  }
  
  // 确定方向
  const direction = binding.modifiers.vertical ? 'vertical' : 
                   (binding.modifiers.both ? 'both' : 'horizontal')
                   
  // 检查是否溢出
  const isOverflow = isOverflowing(el, direction)
  
  // 如果需要显示tooltip
  if (isOverflow) {
    if (!el._tooltipOverflow.instance) {
      // 如果没有实例，创建一个
      const instance = getTooltipInstance()
      el._tooltipOverflow.instance = instance
      
      // 设置tooltip内容和位置
      instance.content = content
      
      // 处理位置参数
      // 首先检查对象配置中是否指定了placement
      if (typeof binding.value === 'object' && binding.value.placement) {
        instance.placement = binding.value.placement
      } 
      // 其次检查binding.arg是否是有效的位置值
      else if (binding.arg && ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end',
                            'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'].includes(binding.arg)) {
        instance.placement = binding.arg
        console.log('tooltip-overflow使用arg作为placement:', instance.placement)
      } 
      // 默认使用'top'
      else {
        instance.placement = 'top'
      }
      
      // 更新element-ui的tooltip配置
      if (instance.$refs.tooltip) {
        instance.$refs.tooltip.placement = instance.placement
      }
      
      // 绑定事件
      const showHandler = () => {
        if (!el._tooltipOverflow) return
        const instance = el._tooltipOverflow.instance
        if (instance) {
          // 更新引用元素和内容
          instance.content = content
          instance.updateReference(el)
          // 显示tooltip
          instance.show()
        }
      }
      
      const hideHandler = () => {
        if (!el._tooltipOverflow) return
        const instance = el._tooltipOverflow.instance
        if (instance) {
          instance.hide()
        }
      }
      
      // 保存处理函数以便清理
      el._tooltipOverflow.showHandler = showHandler
      el._tooltipOverflow.hideHandler = hideHandler
      
      // 绑定鼠标事件
      el.addEventListener('mouseenter', showHandler)
      el.addEventListener('mouseleave', hideHandler)
      
      // 初始化引用元素
      instance.updateReference(el)
    } else {
      // 更新内容
      el._tooltipOverflow.instance.content = content
    }
  } else {
    // 如果不需要显示tooltip，清理实例
    if (el._tooltipOverflow.instance) {
      const instance = el._tooltipOverflow.instance
      instance.hide()
      // 暂时保留实例，但隐藏
    }
  }
}

// 指令定义
const tooltipOverflowDirective = {
  bind(el, binding) {
    // 设置基础样式
    setBaseStyle(el, binding)
  },
  
  inserted(el, binding) {
    // DOM插入后检查是否溢出
    Vue.nextTick(() => {
      updateTooltip(el, binding)
    })
  },
  
  update(el, binding) {
    // 值更新时重新检查
    if (binding.value !== binding.oldValue) {
      Vue.nextTick(() => {
        updateTooltip(el, binding)
      })
    }
  },
  
  componentUpdated(el, binding) {
    // 组件更新后重新检查
    Vue.nextTick(() => {
      updateTooltip(el, binding)
    })
  },
  
  unbind(el) {
    // 清理事件和实例
    if (el._tooltipOverflow) {
      if (el._tooltipOverflow.showHandler) {
        el.removeEventListener('mouseenter', el._tooltipOverflow.showHandler)
      }
      
      if (el._tooltipOverflow.hideHandler) {
        el.removeEventListener('mouseleave', el._tooltipOverflow.hideHandler)
      }
      
      if (el._tooltipOverflow.instance) {
        releaseTooltipInstance(el._tooltipOverflow.instance)
      }
      
      delete el._tooltipOverflow
    }
  }
}

// 确保在Vue实例销毁时释放所有tooltip资源
window.addEventListener('beforeunload', () => {
  if (tooltipContainer) {
    document.body.removeChild(tooltipContainer)
    tooltipContainer = null
  }
})

export default {
  install(Vue) {
    Vue.directive('tooltip-overflow', tooltipOverflowDirective)
  }
} 