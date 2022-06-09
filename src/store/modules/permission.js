import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, resources) {
  const res = []
  resources.forEach((resource) => {
    const foundRoute = routes.find((route) => resource.path === route.path)
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
  },
}

const actions = {
  GENERATE_ROUTES({ commit }, resources) {
    return new Promise((resolve) => {
      //let accessedRoutes
      //accessedRoutes = filterAsyncRoutes(asyncRoutes, resources)
      commit('SET_ROUTES', resources)//accessedRoutes)
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
