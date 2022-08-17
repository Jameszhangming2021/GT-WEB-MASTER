import Vue from 'vue'

import 'normalize.css/normalize.css' // 重设css样式

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // 全局样式
import '@/styles/global.scss'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // 路由权限控制

// 设置elementUI语言（组件内部语言）
Vue.use(ElementUI)

// 阻止显示生产模式的消息
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})
