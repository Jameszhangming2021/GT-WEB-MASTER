import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router'
import NProgress from 'nprogress' // 页面进度条

// 新建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5 * 60 * 1000,
})

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    NProgress.start()
    if (store.getters.token) {
      // 添加token到请求头
      if (getToken()) {
        config.headers['token'] = getToken()
      }
    }
    return config
  },
  (error) => {
    NProgress.done()
    return Promise.reject(error)
  }
)

// 添加相应拦截器
service.interceptors.response.use(
  (response) => {
    NProgress.done()
    const res = response
    if (res.status !== 200) {
      Message({
        message: res.data.msg || 'Error',
        type: 'error',
        duration: 5 * 1000,
      })
      // 如果是401，则重新登陆
      if (res.status === 401) {
        // 跳往登录页
        store.dispatch('user/resetToken').then(() => {
          location.reload()
          router.replace()
        })
        MessageBox.confirm('登陆已过期，请重新登陆', '确认登陆', {
          confirmButtonText: '重新登陆',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {})
      }
      // 处理其他网络错误
      switch (res.status) {
        case 500:
          Message({
            message: '服务器发生错误，请联系开发者或稍后重试',
            type: 'error',
            duration: 3000,
          })
          break
      }
    } else {
      // 处理status为0的错误
      if (res.data.status === 0) {
        Message({
          message: res.data.msg || '出现错误',
          type: 'error',
          duration: 5000,
        })
        return Promise.reject(res.data)
      } else {
        return Promise.resolve(res.data)
      }
    }
  },
  (error) => {
    if (error.response.status == 401) {
      // 跳往登录页
      store.dispatch('user/resetToken').then(() => {
        location.reload()
        router.replace()
      })
      MessageBox.confirm('登陆已过期，请重新登陆', '确认登陆', {
        confirmButtonText: '重新登陆',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {})
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  }
)

export default service
