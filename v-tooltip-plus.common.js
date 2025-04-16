/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ src)
});

// UNUSED EXPORTS: Tooltip, TooltipOverflow

;// external {"commonjs":"vue","commonjs2":"vue","amd":"vue","root":"Vue"}
const external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_namespaceObject = require("vue");
var external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_namespaceObject);
;// external {"commonjs":"element-ui","commonjs2":"element-ui","amd":"element-ui","root":"ElementUI"}
const external_commonjs_element_ui_commonjs2_element_ui_amd_element_ui_root_ElementUI_namespaceObject = require("element-ui");
var external_commonjs_element_ui_commonjs2_element_ui_amd_element_ui_root_ElementUI_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_element_ui_commonjs2_element_ui_amd_element_ui_root_ElementUI_namespaceObject);
;// ./src/directives/tooltip.js



// 在文档中创建一个容器来挂载tooltip组件
let tooltipContainer = null;
function ensureContainer() {
  if (!tooltipContainer) {
    tooltipContainer = document.createElement('div');
    tooltipContainer.id = 'tooltip-container';
    document.body.appendChild(tooltipContainer);
  }
  return tooltipContainer;
}

// 创建一个Tooltip组件的实例池
const tooltipPool = [];
function getTooltipInstance() {
  // 如果池中有可用实例，则复用
  if (tooltipPool.length > 0) {
    return tooltipPool.pop();
  }

  // 创建新的Tooltip实例
  const container = document.createElement('div');
  ensureContainer().appendChild(container);

  // 创建一个新的Vue应用实例来挂载Tooltip
  const tooltipVM = new (external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_default())({
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
      };
    },
    render(h) {
      // 确保所有属性直接传递给Tooltip组件
      return h((external_commonjs_element_ui_commonjs2_element_ui_amd_element_ui_root_ElementUI_default()).Tooltip, {
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
      }, [h('span', {
        style: 'display: inline-block; width:0; height:0;'
      })]);
    },
    methods: {
      show() {
        this.visible = true;
      },
      hide() {
        this.visible = false;
      },
      updateReference(el) {
        const tooltip = this.$refs.tooltip;
        if (tooltip) {
          tooltip.referenceElm = el;

          // 确保位置更新
          external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_default().nextTick(() => {
            if (tooltip.updatePopper) {
              tooltip.updatePopper();
            }

            // 强制刷新popper位置
            if (tooltip.$refs && tooltip.$refs.popper && tooltip.$refs.popper.$refs && tooltip.$refs.popper.$refs.popper) {
              const popperJS = tooltip.$refs.popper.$refs.popper;
              if (popperJS && popperJS.update) {
                popperJS.update();
              }
            }
          });
        }
      }
    }
  });
  return tooltipVM;
}
function releaseTooltipInstance(instance) {
  if (instance) {
    instance.hide();
    tooltipPool.push(instance);
  }
}

// 绑定触发事件
function bindEvents(el, instance, trigger) {
  try {
    // 清除任何已有的事件监听
    unbindEvents(el);

    // 创建元数据存储
    if (!el._tooltip) {
      el._tooltip = {};
    }

    // 根据触发类型绑定事件
    if (trigger === 'hover') {
      const mouseenterHandler = () => {
        instance.show();
      };
      const mouseleaveHandler = () => {
        instance.hide();
      };
      el.addEventListener('mouseenter', mouseenterHandler);
      el.addEventListener('mouseleave', mouseleaveHandler);

      // 存储处理函数
      el._tooltip.mouseenterHandler = mouseenterHandler;
      el._tooltip.mouseleaveHandler = mouseleaveHandler;
    } else if (trigger === 'click') {
      const clickHandler = () => {
        instance.visible ? instance.hide() : instance.show();
      };
      const documentClickHandler = e => {
        if (el !== e.target && !el.contains(e.target)) {
          instance.hide();
        }
      };
      el.addEventListener('click', clickHandler);
      document.addEventListener('click', documentClickHandler);

      // 存储处理函数
      el._tooltip.clickHandler = clickHandler;
      el._tooltip.documentClickHandler = documentClickHandler;
    } else if (trigger === 'focus') {
      const focusHandler = () => {
        instance.show();
      };
      const blurHandler = () => {
        instance.hide();
      };

      // 对于输入类元素，使用focusin和focusout事件，这些事件可以冒泡
      el.addEventListener('focusin', focusHandler);
      el.addEventListener('focusout', blurHandler);

      // 为兼容性，同时也绑定focus和blur事件
      el.addEventListener('focus', focusHandler);
      el.addEventListener('blur', blurHandler);

      // 存储处理函数
      el._tooltip.focusinHandler = focusHandler;
      el._tooltip.focusoutHandler = blurHandler;
      el._tooltip.focusHandler = focusHandler;
      el._tooltip.blurHandler = blurHandler;
    }
    // 手动模式不绑定事件
  } catch (e) {
    console.error('绑定事件失败:', e);
  }
}

// 解绑事件
function unbindEvents(el) {
  try {
    if (!el._tooltip) return;

    // 解绑hover事件
    if (el._tooltip.mouseenterHandler) {
      el.removeEventListener('mouseenter', el._tooltip.mouseenterHandler);
      delete el._tooltip.mouseenterHandler;
    }
    if (el._tooltip.mouseleaveHandler) {
      el.removeEventListener('mouseleave', el._tooltip.mouseleaveHandler);
      delete el._tooltip.mouseleaveHandler;
    }

    // 解绑click事件
    if (el._tooltip.clickHandler) {
      el.removeEventListener('click', el._tooltip.clickHandler);
      delete el._tooltip.clickHandler;
    }
    if (el._tooltip.documentClickHandler) {
      document.removeEventListener('click', el._tooltip.documentClickHandler);
      delete el._tooltip.documentClickHandler;
    }

    // 解绑focus事件
    if (el._tooltip.focusinHandler) {
      el.removeEventListener('focusin', el._tooltip.focusinHandler);
      delete el._tooltip.focusinHandler;
    }
    if (el._tooltip.focusoutHandler) {
      el.removeEventListener('focusout', el._tooltip.focusoutHandler);
      delete el._tooltip.focusoutHandler;
    }
    if (el._tooltip.focusHandler) {
      el.removeEventListener('focus', el._tooltip.focusHandler);
      delete el._tooltip.focusHandler;
    }
    if (el._tooltip.blurHandler) {
      el.removeEventListener('blur', el._tooltip.blurHandler);
      delete el._tooltip.blurHandler;
    }
  } catch (e) {
    console.error('解绑事件失败:', e);
  }
}

// 设置tooltip配置
function setupTooltip(el, binding) {
  try {
    // 创建元数据存储
    if (!el._tooltip) {
      el._tooltip = {};
    }

    // 获取tooltip内容和配置选项
    let content = '';
    let options = {};
    let placement = 'top';

    // 处理不同格式的binding.value
    if (typeof binding.value === 'object') {
      options = binding.value;
      content = options.content || '';
      // 如果通过对象配置提供了placement，使用它
      if (options.placement) {
        placement = options.placement;
      }
    } else if (typeof binding.value === 'string') {
      content = binding.value;
    }

    // 确定trigger类型
    let trigger = 'hover';
    if (binding.modifiers) {
      if (binding.modifiers.click) trigger = 'click';
      if (binding.modifiers.focus) trigger = 'focus';
      if (binding.modifiers.manual) trigger = 'manual';
    }

    // 特殊处理：直接从binding.arg获取placement
    // 这是处理v-tooltip:top、v-tooltip:bottom等的关键
    const validPlacements = ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'];
    if (binding.arg && validPlacements.includes(binding.arg)) {
      placement = binding.arg;
      console.log('使用arg作为placement:', placement); // 调试输出
    }

    // 设置effect
    let effect = 'dark';
    if (binding.modifiers && binding.modifiers.light) effect = 'light';

    // 获取或创建tooltip实例
    const instance = el._tooltip.instance || getTooltipInstance();

    // 更新tooltip配置
    instance.content = content;
    instance.placement = placement;
    instance.trigger = trigger;
    instance.effect = effect;

    // 当使用对象配置时，应用其他选项
    if (typeof binding.value === 'object') {
      if (binding.value.openDelay !== undefined) {
        instance.openDelay = binding.value.openDelay;
      }
      if (binding.value.enterable !== undefined) {
        instance.enterable = binding.value.enterable;
      }
      if (binding.value.popperClass) {
        instance.popperClass = binding.value.popperClass;
      }
    }
    console.log('Tooltip配置:', {
      content,
      placement,
      trigger,
      effect
    }); // 调试输出

    // 更新引用元素
    external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_default().nextTick(() => {
      instance.updateReference(el);
    });

    // 保存实例引用
    el._tooltip.instance = instance;

    // 绑定事件
    bindEvents(el, instance, trigger);
  } catch (e) {
    console.error('设置Tooltip失败:', e);
  }
}

// 指令定义
const tooltip_tooltipDirective = {
  bind(el, binding) {
    // 初次绑定时，只进行初始化设置
    external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_default().nextTick(() => {
      setupTooltip(el, binding);
    });
  },
  inserted(el, binding) {
    // 元素插入到DOM后，确保tooltip位置正确
    external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_default().nextTick(() => {
      if (el._tooltip && el._tooltip.instance) {
        el._tooltip.instance.updateReference(el);
      }
    });
  },
  update(el, binding) {
    // 仅在值变化时更新
    if (binding.value !== binding.oldValue) {
      external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_default().nextTick(() => {
        setupTooltip(el, binding);
      });
    }
  },
  componentUpdated(el, binding) {
    // 组件更新后，确保tooltip位置正确
    external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_default().nextTick(() => {
      if (el._tooltip && el._tooltip.instance) {
        el._tooltip.instance.updateReference(el);
      }
    });
  },
  unbind(el) {
    // 清理事件和实例
    try {
      unbindEvents(el);
      if (el._tooltip && el._tooltip.instance) {
        releaseTooltipInstance(el._tooltip.instance);
      }
      delete el._tooltip;
    } catch (e) {
      console.error('解绑Tooltip失败:', e);
    }
  }
};

// 确保在页面卸载时清理资源
window.addEventListener('beforeunload', () => {
  if (tooltipContainer) {
    document.body.removeChild(tooltipContainer);
    tooltipContainer = null;
  }
});
/* harmony default export */ const tooltip = ({
  install(Vue) {
    Vue.directive('tooltip', tooltip_tooltipDirective);
  }
});
;// ./src/directives/tooltip-overflow.js



// 在文档中创建一个容器来挂载tooltip组件
let tooltip_overflow_tooltipContainer = null;
function tooltip_overflow_ensureContainer() {
  if (!tooltip_overflow_tooltipContainer) {
    tooltip_overflow_tooltipContainer = document.createElement('div');
    tooltip_overflow_tooltipContainer.id = 'tooltip-overflow-container';
    document.body.appendChild(tooltip_overflow_tooltipContainer);
  }
  return tooltip_overflow_tooltipContainer;
}

// 创建一个Tooltip组件的实例池
const tooltip_overflow_tooltipPool = [];
function tooltip_overflow_getTooltipInstance() {
  // 如果池中有可用实例，则复用
  if (tooltip_overflow_tooltipPool.length > 0) {
    return tooltip_overflow_tooltipPool.pop();
  }

  // 创建新的Tooltip实例
  const container = document.createElement('div');
  tooltip_overflow_ensureContainer().appendChild(container);

  // 创建一个新的Vue应用实例来挂载Tooltip
  return new (external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_default())({
    el: container,
    data() {
      return {
        visible: false,
        content: '',
        placement: 'top',
        reference: null,
        popperClass: 'tooltip-overflow-popper'
      };
    },
    render(h) {
      return h((external_commonjs_element_ui_commonjs2_element_ui_amd_element_ui_root_ElementUI_default()).Tooltip, {
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
      }, [h('span', {
        style: 'display: inline-block;width:0;height:0;'
      })]);
    },
    methods: {
      show() {
        this.visible = true;
      },
      hide() {
        this.visible = false;
      },
      updateReference(el) {
        const tooltip = this.$refs.tooltip;
        if (tooltip) {
          tooltip.referenceElm = el;

          // 确保位置更新
          external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_default().nextTick(() => {
            if (tooltip.updatePopper) {
              tooltip.updatePopper();
            }

            // 强制刷新popper位置
            if (tooltip.$refs && tooltip.$refs.popper && tooltip.$refs.popper.$refs && tooltip.$refs.popper.$refs.popper) {
              const popperJS = tooltip.$refs.popper.$refs.popper;
              if (popperJS && popperJS.update) {
                popperJS.update();
              }
            }
          });
        }
      }
    }
  });
}
function tooltip_overflow_releaseTooltipInstance(instance) {
  instance.hide();
  tooltip_overflow_tooltipPool.push(instance);
}

// 检查元素是否溢出
function isOverflowing(el) {
  let direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'horizontal';
  if (!el) return false;
  try {
    if (direction === 'horizontal') {
      return Math.ceil(el.scrollWidth) > Math.ceil(el.clientWidth);
    } else if (direction === 'vertical') {
      return Math.ceil(el.scrollHeight) > Math.ceil(el.clientHeight);
    } else if (direction === 'both') {
      return Math.ceil(el.scrollWidth) > Math.ceil(el.clientWidth) || Math.ceil(el.scrollHeight) > Math.ceil(el.clientHeight);
    }
  } catch (e) {
    console.error('检测溢出错误:', e);
  }
  return false;
}

// 设置元素的基本样式
function setBaseStyle(el, binding) {
  el.style.overflow = 'hidden';
  el.style.textOverflow = 'ellipsis';
  if (binding.modifiers && binding.modifiers.vertical) {
    el.style.display = '-webkit-box';
    el.style.webkitBoxOrient = 'vertical';
    const lines = binding.value && binding.value.lines ? binding.value.lines : 1;
    el.style.webkitLineClamp = lines;
  } else {
    el.style.whiteSpace = 'nowrap';
  }
}

// 更新tooltip的内容和显示
function updateTooltip(el, binding) {
  // 获取或创建元数据对象
  if (!el._tooltipOverflow) {
    el._tooltipOverflow = {};
  }

  // 确定内容
  let content = '';
  if (typeof binding.value === 'object' && binding.value.content) {
    content = binding.value.content;
  } else if (typeof binding.value === 'string') {
    content = binding.value;
  } else {
    content = el.textContent.trim();
  }

  // 确定方向
  const direction = binding.modifiers.vertical ? 'vertical' : binding.modifiers.both ? 'both' : 'horizontal';

  // 检查是否溢出
  const isOverflow = isOverflowing(el, direction);

  // 如果需要显示tooltip
  if (isOverflow) {
    if (!el._tooltipOverflow.instance) {
      // 如果没有实例，创建一个
      const instance = tooltip_overflow_getTooltipInstance();
      el._tooltipOverflow.instance = instance;

      // 设置tooltip内容和位置
      instance.content = content;

      // 处理位置参数
      // 首先检查对象配置中是否指定了placement
      if (typeof binding.value === 'object' && binding.value.placement) {
        instance.placement = binding.value.placement;
      }
      // 其次检查binding.arg是否是有效的位置值
      else if (binding.arg && ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end'].includes(binding.arg)) {
        instance.placement = binding.arg;
        console.log('tooltip-overflow使用arg作为placement:', instance.placement);
      }
      // 默认使用'top'
      else {
        instance.placement = 'top';
      }

      // 更新element-ui的tooltip配置
      if (instance.$refs.tooltip) {
        instance.$refs.tooltip.placement = instance.placement;
      }

      // 绑定事件
      const showHandler = () => {
        if (!el._tooltipOverflow) return;
        const instance = el._tooltipOverflow.instance;
        if (instance) {
          // 更新引用元素和内容
          instance.content = content;
          instance.updateReference(el);
          // 显示tooltip
          instance.show();
        }
      };
      const hideHandler = () => {
        if (!el._tooltipOverflow) return;
        const instance = el._tooltipOverflow.instance;
        if (instance) {
          instance.hide();
        }
      };

      // 保存处理函数以便清理
      el._tooltipOverflow.showHandler = showHandler;
      el._tooltipOverflow.hideHandler = hideHandler;

      // 绑定鼠标事件
      el.addEventListener('mouseenter', showHandler);
      el.addEventListener('mouseleave', hideHandler);

      // 初始化引用元素
      instance.updateReference(el);
    } else {
      // 更新内容
      el._tooltipOverflow.instance.content = content;
    }
  } else {
    // 如果不需要显示tooltip，清理实例
    if (el._tooltipOverflow.instance) {
      const instance = el._tooltipOverflow.instance;
      instance.hide();
      // 暂时保留实例，但隐藏
    }
  }
}

// 指令定义
const tooltip_overflow_tooltipOverflowDirective = {
  bind(el, binding) {
    // 设置基础样式
    setBaseStyle(el, binding);
  },
  inserted(el, binding) {
    // DOM插入后检查是否溢出
    external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_default().nextTick(() => {
      updateTooltip(el, binding);
    });
  },
  update(el, binding) {
    // 值更新时重新检查
    if (binding.value !== binding.oldValue) {
      external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_default().nextTick(() => {
        updateTooltip(el, binding);
      });
    }
  },
  componentUpdated(el, binding) {
    // 组件更新后重新检查
    external_commonjs_vue_commonjs2_vue_amd_vue_root_Vue_default().nextTick(() => {
      updateTooltip(el, binding);
    });
  },
  unbind(el) {
    // 清理事件和实例
    if (el._tooltipOverflow) {
      if (el._tooltipOverflow.showHandler) {
        el.removeEventListener('mouseenter', el._tooltipOverflow.showHandler);
      }
      if (el._tooltipOverflow.hideHandler) {
        el.removeEventListener('mouseleave', el._tooltipOverflow.hideHandler);
      }
      if (el._tooltipOverflow.instance) {
        tooltip_overflow_releaseTooltipInstance(el._tooltipOverflow.instance);
      }
      delete el._tooltipOverflow;
    }
  }
};

// 确保在Vue实例销毁时释放所有tooltip资源
window.addEventListener('beforeunload', () => {
  if (tooltip_overflow_tooltipContainer) {
    document.body.removeChild(tooltip_overflow_tooltipContainer);
    tooltip_overflow_tooltipContainer = null;
  }
});
/* harmony default export */ const tooltip_overflow = ({
  install(Vue) {
    Vue.directive('tooltip-overflow', tooltip_overflow_tooltipOverflowDirective);
  }
});
;// ./src/index.js



// 定义和导出指令集合
const directives = {
  install(Vue) {
    // 注册tooltip指令
    Vue.use(tooltip);
    // 注册tooltipOverflow指令
    Vue.use(tooltip_overflow);
  }
};

// 支持按需引入
const Tooltip = (/* unused pure expression or super */ null && (tooltipDirective));
const TooltipOverflow = (/* unused pure expression or super */ null && (tooltipOverflowDirective));

// 默认导出所有指令
/* harmony default export */ const src = (directives);
module.exports = __webpack_exports__["default"];
/******/ })()
;