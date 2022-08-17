import router, { asyncRoutes, constantRoutes } from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 页面进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 通过cookie获取token
import getPageTitle from '@/utils/get-page-title'
import { getUserType } from './api/user'

NProgress.configure({ showSpinner: false }) // 进度条配置：不开启圈圈

const whiteList = ['/login'] // 白名单

/**
 * 根据权限过滤路由
 * @param {Array} routes
 * @param {Array} permission
 * @returns
 */
function filter(routes, permission) {
  let res = []
  routes.forEach((route) => {
    let tmp = { ...route }
    if (hasPermission(route, permission)) {
      if (route.children && route.children.length > 0) {
        tmp.children = filter(route.children, permission)
      }
      res.push(tmp)
    }
  })
  return res
}

/**
 * 判断是否有某个路由的权限
 * @param {Object} route
 * @param {Array} permission
 * @returns
 */
function hasPermission(route, permission) {
  if (route.meta && route.meta.permission) {
    return permission.some((i) => route.meta.permission == i)
  } else {
    return true
  }
}

router.beforeEach(async (to, from, next) => {
  // 开启页面进度条
  NProgress.start()
  // 设置title
  document.title = getPageTitle(to.meta.title)

  // 获取token
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已经登陆，还去登录页，则去主页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 获取用户的菜单权限
      const hasPermission =
        store.state.user.permission.length > 0 ? true : false
      if (hasPermission) {
        // debugger
        // 判断是否为初始密码，如果是，要先改密码
        // if (!store.state.user.isNotInitPassword) {
        //   Message.error('请先修改初始密码')
        //   next('/user/modification')
        // }
        // } else {
        //   next()
        // }
        // next()
        const isNotInitPassword = localStorage.getItem('isNotInitPassword')
        if (!isNotInitPassword || isNotInitPassword == 'false') {
          if (to.path == '/user/modification') {
            next()
          } else {
            Message.error('请先修改初始密码')
            next('/user/modification')
          }
        } else {
          next()
        }
      } else {
        // 更新是否是超级用户
        await store.dispatch('user/getType')
        // const { allowSwitch } = typeRes.data
        // if (allowSwitch === 'Y') store.commit('user/SET_ISADMIN', true)
        // 后端获取用户信息
        await store.dispatch('user/getInfo')
        // 获取用户权限
        const permission = await store.state.user.permission
        // 根据权限生成路由
        const res = await filter(asyncRoutes, permission)
        // 把默认路由和根据权限生成的路由合并
        const addRoutes = await constantRoutes.concat(res)
        //  要先手动设计，才能使用addRoutes，原因不明！！！
        router.options.routes = addRoutes
        // 动态新增路由
        router.addRoutes(addRoutes)
        // 动态新增404全匹配路由
        router.addRoutes([{ path: '*', redirect: '/404', hidden: true }])

        // 判断是否为初始密码，如果是，要先改密码
        const isNotInitPassword = localStorage.getItem('isNotInitPassword')
        if (!isNotInitPassword || isNotInitPassword == 'false') {
          Message.error('请先修改初始密码')
          next('/user/modification')
        } else {
          next({ ...to, replace: true })
        }

        // next({ ...to, replace: true })
      }
    }
  } else {
    /* 没有token */
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果在白名单内，则放行
      next()
    } else {
      // 其他需要token的页面，需要先回到登陆页登陆后才放行
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 结束进度条
  NProgress.done()
})
