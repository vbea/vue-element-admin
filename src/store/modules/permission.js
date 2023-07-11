import { asyncRoutes, resetRouter, constantRoutes } from '@/router'
import { getAuthRoutes } from '@/utils/auth'
import permission from '@/utils/permission'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    resetRouter()
    state.addRoutes = routes
    state.routes = constantRoutes
    filterRoutes(state.routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

function filterRoutes(routes) {
  //console.log("路由遍历", routes);
  routes.forEach((route) => {
    const authRoute = state.addRoutes.find(
      authRoute => (authRoute[permission.RESOURCE_KEY] === route.path)
    )
    if (authRoute) {
      route.hidden = false
      if (route.meta) {
        route.meta.onlyView = authRoute.onlyView || false
      } else {
        route.meta = { onlyView: authRoute.onlyView }
      }
    } else {
      route.hidden = true
    }
    if (route.children) {
      filterRoutes(route.children)
    }
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
