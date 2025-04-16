import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VTooltipPlus from '../src/index'

Vue.use(ElementUI)
Vue.use(VTooltipPlus)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app') 