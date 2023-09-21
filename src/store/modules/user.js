import apiUser from '@/http/apiUser'
import router, { resetRouter } from '@/router'
import {
  getToken,
  setToken,
  setEmail,
  removeToken,
  setAuthRoutes,
  removeAuthRoutes,
  setUserName,
  setRoleName,
  getUserName
} from '@/utils/auth'

const state = {
  token: getToken(),
  name: getUserName(),
  avatar: '',
  introduction: '',
  roles: [],
  resources: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_RESOURCES: (state, resources) => {
    state.resources = resources
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      apiUser.login(userInfo).then(res => {
        if (res.data.token) {
          setToken(res.data.token)
          commit('SET_TOKEN', res.data.token)
          if (res.data.resources) {
            setAuthRoutes(res.data.resources)
            commit('SET_RESOURCES', res.data.resources)
          }
          setEmail(userInfo.email)
          if (res.data.name) {
            setUserName(res.data.name)
          } else if (res.data.userName) {
            setUserName(res.data.userName)
          }
          if (res.data.roleName) {
            setRoleName(res.data.roleName)
          }
          resolve(res)
        } else {
          reject(res.message || res.msg)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_ROLES', ['admin'])
      resolve({ roles: ['admin'] })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      removeAuthRoutes()
      resetRouter()
      
      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    //dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
