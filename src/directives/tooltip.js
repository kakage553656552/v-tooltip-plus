import Vue from 'vue'
import ElementUI from 'element-ui'

// 在文档中创建一个容器来挂载tooltip组件
let tooltipContainer = null
function ensureContainer() {
  if (!tooltipContainer) {
    tooltipContainer = document.createElement('div')
    tooltipContainer.id = 'tooltip-container'
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
  const tooltipVM = new Vue({
    el: container,
    data() {
      return {
        visible: false,
        content: '',
        placement: 'top',
        trigger: 'hover',
        reference: null,
        effect: 'dark',
        popperClass: 'tooltip-popper',
        openDelay: 0,
        enterable: true
      }
    },
    render(h) {
      // 确保所有属性直接传递给Tooltip组件
      return h(ElementUI.Tooltip, {
        props: {
          content: this.content,
          placement: this.placement,
          value: this.visible,
          effect: this.effect,
          trigger: this.trigger,
          visibleArrow: true,
          popperClass: this.popperClass,
          openDelay: this.openDelay,
          enterable: this.enterable,
          appendToBody: true // 确保tooltip附加到body以避免样式问题
        },
        ref: 'tooltip'
      }, [
        h('span', { 
          style: 'display: inline-block; width:0; height:0;' 
        })
      ])
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
  
  return tooltipVM
}

function releaseTooltipInstance(instance) {
  if (instance) {
    instance.hide()
    tooltipPool.push(instance)
  }
}

// 绑定触发事件
function bindEvents(el, instance, trigger) {
  try {
    // 清除任何已有的事件监听
    unbindEvents(el)
    
    // 创建元数据存储
    if (!el._tooltip) {
      el._tooltip = {}
    }
    
    // 根据触发类型绑定事件
    if (trigger === 'hover') {
      const mouseenterHandler = () => {
        instance.show()
      }
      const mouseleaveHandler = () => {
        instance.hide()
      }
      
      el.addEventListener('mouseenter', mouseenterHandler)
      el.addEventListener('mouseleave', mouseleaveHandler)
      
      // 存储处理函数
      el._tooltip.mouseenterHandler = mouseenterHandler
      el._tooltip.mouseleaveHandler = mouseleaveHandler
    } else if (trigger === 'click') {
      const clickHandler = () => {
        instance.visible ? instance.hide() : instance.show()
      }
      const documentClickHandler = (e) => {
        if (el !== e.target && !el.contains(e.target)) {
          instance.hide()
        }
      }
      
      el.addEventListener('click', clickHandler)
      document.addEventListener('click', documentClickHandler)
      
      // 存储处理函数
      el._tooltip.clickHandler = clickHandler
      el._tooltip.documentClickHandler = documentClickHandler
    } else if (trigger === 'focus') {
      const focusHandler = () => {
        instance.show()
      }
      const blurHandler = () => {
        instance.hide()
      }
      
      // 对于输入类元素，使用focusin和focusout事件，这些事件可以冒泡
      el.addEventListener('focusin', focusHandler)
      el.addEventListener('focusout', blurHandler)
      
      // 为兼容性，同时也绑定focus和blur事件
      el.addEventListener('focus', focusHandler)
      el.addEventListener('blur', blurHandler)
      
      // 存储处理函数
      el._tooltip.focusinHandler = focusHandler;
      el._tooltip.focusoutHandler = blurHandler;
      el._tooltip.focusHandler = focusHandler
      el._tooltip.blurHandler = blurHandler
    }
    // 手动模式不绑定事件
  } catch (e) {
    console.error('绑定事件失败:', e)
  }
}

// 解绑事件
function unbindEvents(el) {
  try {
    if (!el._tooltip) return
    
    // 解绑hover事件
    if (el._tooltip.mouseenterHandler) {
      el.removeEventListener('mouseenter', el._tooltip.mouseenterHandler)
      delete el._tooltip.mouseenterHandler
    }
    if (el._tooltip.mouseleaveHandler) {
      el.removeEventListener('mouseleave', el._tooltip.mouseleaveHandler)
      delete el._tooltip.mouseleaveHandler
    }
    
    // 解绑click事件
    if (el._tooltip.clickHandler) {
      el.removeEventListener('click', el._tooltip.clickHandler)
      delete el._tooltip.clickHandler
    }
    if (el._tooltip.documentClickHandler) {
      document.removeEventListener('click', el._tooltip.documentClickHandler)
      delete el._tooltip.documentClickHandler
    }
    
    // 解绑focus事件
    if (el._tooltip.focusinHandler) {
      el.removeEventListener('focusin', el._tooltip.focusinHandler)
      delete el._tooltip.focusinHandler
    }
    if (el._tooltip.focusoutHandler) {
      el.removeEventListener('focusout', el._tooltip.focusoutHandler)
      delete el._tooltip.focusoutHandler
    }
    if (el._tooltip.focusHandler) {
      el.removeEventListener('focus', el._tooltip.focusHandler)
      delete el._tooltip.focusHandler
    }
    if (el._tooltip.blurHandler) {
      el.removeEventListener('blur', el._tooltip.blurHandler)
      delete el._tooltip.blurHandler
    }
  } catch (e) {
    console.error('解绑事件失败:', e)
  }
}

// 设置tooltip配置
function setupTooltip(el, binding) {
  try {
    // 创建元数据存储
    if (!el._tooltip) {
      el._tooltip = {}
    }
    
    // 获取tooltip内容和配置选项
    let content = ''
    let options = {}
    let placement = 'top'
    
    // 处理不同格式的binding.value
    if (typeof binding.value === 'object') {
      options = binding.value
      content = options.content || ''
      // 如果通过对象配置提供了placement，使用它
      if (options.placement) {
        placement = options.placement
      }
    } else if (typeof binding.value === 'string') {
      content = binding.value
    }
    
    // 确定trigger类型
    let trigger = 'hover'
    if (binding.modifiers) {
      if (binding.modifiers.click) trigger = 'click'
      if (binding.modifiers.focus) trigger = 'focus'
      if (binding.modifiers.manual) trigger = 'manual'
    }
    
    // 特殊处理：直接从binding.arg获取placement
    // 这是处理v-tooltip:top、v-tooltip:bottom等的关键
    const validPlacements = [
      'top', 'top-start', 'top-end', 
      'bottom', 'bottom-start', 'bottom-end',
      'left', 'left-start', 'left-end', 
      'right', 'right-start', 'right-end'
    ]
    
    if (binding.arg && validPlacements.includes(binding.arg)) {
      placement = binding.arg
      console.log('使用arg作为placement:', placement) // 调试输出
    }
    
    // 设置effect
    let effect = 'dark'
    if (binding.modifiers && binding.modifiers.light) effect = 'light'
    
    // 获取或创建tooltip实例
    const instance = el._tooltip.instance || getTooltipInstance()
    
    // 更新tooltip配置
    instance.content = content
    instance.placement = placement
    instance.trigger = trigger
    instance.effect = effect
    
    // 当使用对象配置时，应用其他选项
    if (typeof binding.value === 'object') {
      if (binding.value.openDelay !== undefined) {
        instance.openDelay = binding.value.openDelay
      }
      if (binding.value.enterable !== undefined) {
        instance.enterable = binding.value.enterable
      }
      if (binding.value.popperClass) {
        instance.popperClass = binding.value.popperClass
      }
    }
    
    console.log('Tooltip配置:', {
      content,
      placement,
      trigger,
      effect
    }) // 调试输出
    
    // 更新引用元素
    Vue.nextTick(() => {
      instance.updateReference(el)
    })
    
    // 保存实例引用
    el._tooltip.instance = instance
    
    // 绑定事件
    bindEvents(el, instance, trigger)
  } catch (e) {
    console.error('设置Tooltip失败:', e)
  }
}

// 指令定义
const tooltipDirective = {
  bind(el, binding) {
    // 初次绑定时，只进行初始化设置
    Vue.nextTick(() => {
      setupTooltip(el, binding)
    })
  },
  
  inserted(el, binding) {
    // 元素插入到DOM后，确保tooltip位置正确
    Vue.nextTick(() => {
      if (el._tooltip && el._tooltip.instance) {
        el._tooltip.instance.updateReference(el)
      }
    })
  },
  
  update(el, binding) {
    // 仅在值变化时更新
    if (binding.value !== binding.oldValue) {
      Vue.nextTick(() => {
        setupTooltip(el, binding)
      })
    }
  },
  
  componentUpdated(el, binding) {
    // 组件更新后，确保tooltip位置正确
    Vue.nextTick(() => {
      if (el._tooltip && el._tooltip.instance) {
        el._tooltip.instance.updateReference(el)
      }
    })
  },
  
  unbind(el) {
    // 清理事件和实例
    try {
      unbindEvents(el)
      
      if (el._tooltip && el._tooltip.instance) {
        releaseTooltipInstance(el._tooltip.instance)
      }
      
      delete el._tooltip
    } catch (e) {
      console.error('解绑Tooltip失败:', e)
    }
  }
}

// 确保在页面卸载时清理资源
window.addEventListener('beforeunload', () => {
  if (tooltipContainer) {
    document.body.removeChild(tooltipContainer)
    tooltipContainer = null
  }
})

export default {
  install(Vue) {
    Vue.directive('tooltip', tooltipDirective)
  }
} 