import { login, logout, getInfo, getUserType } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { encryptData } from '@/utils/crypto'
import { setStorage } from '@/utils/localstorage'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    ID: '',
    permission: [],
    isPermission: false,
    message: [],
    isNotInitPassword: false,
    isAdmin: false,
    plantList: [],
    plant: '',
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ID: (state, ID) => {
    state.ID = ID
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMISSION: (state, permission) => {
    permission.forEach((i) => {
      if (i.num) {
        state.permission.push(i.num)
      }
    })
  },
  IS_SET_PERMISSION: (state, value) => {
    state.isPermission = value
  },
  SET_MESSAGE: (state, value) => {
    state.message.push(value)
  },
  SET_INIT_PASSWORD: (state, value) => {
    state.isNotInitPassword = value == '111111' ? false : true
    localStorage.setItem('isNotInitPassword', state.isNotInitPassword)
  },
  SET_ISADMIN: (state, value) => {
    state.isAdmin = value
  },
  SET_PLANT: (state, value) => {
    state.plant = value
  },
}

const actions = {
  // 用户登陆
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userId: username.trim(), passwordSecret: password })
        .then((response) => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          commit('SET_NAME', data.userName)
          commit('SET_ID', data.userID)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then((response) => {
          const { data } = response
          commit('SET_NAME', data.userName)
          commit('SET_ID', data.userID)
          commit('SET_PERMISSION', data.menus)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // 用户登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          removeToken() // 清空token一定要放第一
          resetRouter()
          commit('RESET_STATE')
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // 重设token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken() // 清空token一定要放第一
      commit('RESET_STATE')
      resolve()
    })
  },

  // 判断是否为超级用户
  getType({ commit }) {
    return new Promise((resolve) => {
      getUserType().then((res) => {
        state.plantList = res.data.labelValuePairs
        state.plant = state.plantList.find(
          (p) => p.value == res.data.plant
        ).label
        if (res.data.allowSwitch === 'Y') commit('SET_ISADMIN', true)
        resolve()
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
