import request from '@/utils/request'

// 用户登陆
export function login(data) {
  return request({
    url: '/api/web/BaseData/Login',
    method: 'post',
    data,
  })
}

// 获取用户信息
export function getInfo() {
  return request({
    url: '/api/web/BaseData/GetUsrInfo',
    method: 'get',
  })
}

// 用户登出
export function logout() {
  return request({
    url: '/api/web/BaseData/Logout',
    method: 'get',
  })
}

// 更新密码
export function updataPassword(data) {
  return request({
    url: '/api/web/BaseData/PwdModify',
    method: 'post',
    data,
  })
}

// 判断用户是否是特殊用户
export function getUserType() {
  return request({
    url: '/api/Common/GetPlantsList',
  })
}

// 修改厂区
export function modifyFactory(data) {
  return request({
    url: 'api/Common/ModifyPlant',
    method: 'post',
    data,
  })
}
