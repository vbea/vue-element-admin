import { asyncRoutes, constantRoutes } from '@/router'
import {saveUserResource} from '@/utils/userInfo'

/**
 * 过滤没有权限的菜单
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, resources) {
  const res = []
  resources.forEach((resource) => {
    const foundRoute = routes.find((route) => resource.resPath === route.path)
    res.push(foundRoute)
  })
  return res
}

const state = {
  routes: [],
  addRoutes: [],
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    //saveUserResource(state.routes)
  },
}

const actions = {
  GENERATE_ROUTES({ commit }, resources) {
    return new Promise((resolve) => {
      let accessedRoutes
      //TODO 在此判断显示哪些菜单
      accessedRoutes = filterAsyncRoutes(asyncRoutes, resources)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
