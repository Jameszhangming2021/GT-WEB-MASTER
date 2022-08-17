import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 框架 */
import Layout from '@/layout'

/**
 *
 * hidden: true                   如果设置为true，则不会在侧标菜单栏显示
 * alwaysShow: true               如果设置为true，则一直会显示根路由
 *                                如果未设置alwaysShow，则当项目有多个子路由时，它将变为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           设为noRedirect将不适用面包屑导航
 * name:'router-name'             这个值将会用在<keep-alive>中，必须要有！！！！
 * meta : {
    roles: ['admin','editor']    控制页面的权限，可以是多个
    title: 'title'               这个会在面包屑和侧边菜单栏显示标题
    icon: 'svg-name'/'el-icon-x' 显示在侧边菜单的icon
    breadcrumb: false            如果设置为false，将不显示在面包屑导航
    permission: ''               页面的权限
  }
 */

/* 所有人都可以访问的页面 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true,
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' },
      },
    ],
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/user-list',
    meta: { title: '人员权限', icon: 'user-group' },
    hidden: true,
    children: [
      {
        path: '/user/modification',
        name: 'modifacation',
        component: () => import('@/views/user/modification'),
        meta: { title: '个人信息' },
        hidden: true,
      },
    ],
  },
  // {
  //   path: '/log',
  //   component: Layout,
  //   redirect: '/log/log-list',
  //   meta: { title: '日志', icon: 'log' },
  //   children: [
  //     {
  //       path: '/log/log-list',
  //       name: 'modifacation',
  //       component: () => import('@/views/log/index'),
  //       meta: { title: '日志' },
  //       hidden: true,
  //     },
  //   ],
  // },
]

export const asyncRoutes = [
  // {
  //   path: '/mp-wx',
  //   component: Layout,
  //   redirect: '/mp-wx/wx-edit',
  //   children: [
  //     {
  //       path: '/mp-wx/wx-edit',
  //       name: 'WxEdit',
  //       component: () => import('@/views/mp-wx/mp-wx'),
  //       meta: { title: '微信小程序首页编辑', icon: 'mp-wx', permission: '123123' }
  //     }
  //   ]
  // },
  {
    path: '/drawing-download',
    component: Layout,
    redirect: '/drawing-download/drawing-download-gt',
    meta: { title: '供应商图纸下载', icon: 'download', permission: 'Web300' },
    children: [
      {
        path: '/drawing-download/drawing-download-gt',
        name: 'drawing-download-gt',
        component: () => import('@/views/drawing-download/drawing-download-gt'),
        meta: { title: '供应商图纸下载', permission: 'Web300' },
      },
      // {
      //   path: '/drawing-download/drawing-download-xh',
      //   name: 'drawing-download-xh',
      //   component: () => import('@/views/drawing-download/drawing-download-xh'),
      //   meta: { title: '鑫海图纸', permission: 'Web300200' },
      // },
      // {
      //   path: '/drawing-download/drawing-download-yh',
      //   name: 'drawing-download-yh',
      //   component: () => import('@/views/drawing-download/drawing-download-yh'),
      //   meta: { title: '银海图纸', permission: 'Web300300' },
      // },
      // {
      //   path: '/drawing-download/drawing-download-fb',
      //   name: 'drawing-download-fb',
      //   component: () => import('@/views/drawing-download/drawing-download-fb'),
      //   meta: { title: '富比图纸', permission: 'Web300400' },
      // },
    ],
  },
  {
    path: '/delivery-reply',
    component: Layout,
    redirect: '/delivery-reply/delivery-reply-list',
    meta: { title: '供应商交期回复', icon: 'reply', permission: 'Web400' },
    children: [
      {
        path: '/delivery-reply/delivery-reply-list',
        name: 'delivery-reply-list',
        component: () => import('@/views/delivery-reply/delivery-reply-list'),
        meta: { title: '供应商交期回复', permission: 'Web400100' },
      },
      {
        path: '/delivery-reply/delivery-reply-view',
        name: 'delivery-reply-view',
        component: () => import('@/views/delivery-reply/delivery-reply-view'),
        meta: { title: '查看采购单详情', permission: 'Web400' },
        hidden: true,
      },
      {
        path: '/delivery-reply/delivery-reply-edit',
        name: 'delivery-reply-view',
        component: () => import('@/views/delivery-reply/delivery-reply-edit'),
        meta: { title: '回复交期', permission: 'Web400' },
        hidden: true,
      },
    ],
  },
  {
    // 配置表填写
    path: '/configure',
    component: Layout,
    redirect: '/configure/configure-list',
    meta: { title: '业务报价', icon: 'write', permission: 'Web200' },
    children: [
      {
        path: '/configure/configure-list',
        name: 'configure-list',
        component: () => import('@/views/configure/configure-list'),
        meta: { title: '业务报价列表页', icon: '', permission: 'Web200100' },
      },
      // {
      //   path: '/configure/configure-edit/:id',
      //   name: 'configure-edit',
      //   component: () => import('@/views/configure/configure-edit'),
      //   hidden: true,
      //   meta: { title: '配置表填写', icon: '', permission: 'Web200100' },
      // },
      {
        path: '/configure/configure-edit-1',
        name: 'configure-edit-1',
        component: () => import('@/views/configure/configure-edit-1'),
        hidden: true,
        meta: { title: '配置表填写', icon: '', permission: 'Web200100' },
      },
      {
        path: '/configure/configure-view',
        name: 'configure-view',
        component: () => import('@/views/configure/configure-view'),
        hidden: true,
        meta: { title: '查看配置表', icon: '', permission: 'Web200100' },
      },
    ],
  },
]

const createRouter = () =>
  new Router({
    // mode: 'history', // 需要后端的配合
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重设路由
}

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default router
