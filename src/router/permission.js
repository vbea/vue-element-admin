import router from './index'
import store from '../store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, setToken, getAuthRoutes } from '@/utils/auth' // get token from cookie
import permission from '@/utils/permission'
import getPageTitle from '@/utils/getPageTitle'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/redirect', '/404'] // no redirect whitelist

function handleRoute(to, routes, next) {
  let validPath = !permission.enable_404;
  let hasToken = getToken()
  
  if (!validPath && to.path && routes.length) {
    for (let _route of routes) {
      if (to.path == _route[permission.RESOURCE_KEY] || (to.meta && to.meta.activeMenu == _route[permission.RESOURCE_KEY])) {
        validPath = true;
        break;
      }
    }
  }
  if (hasToken) {
    //console.log("已登录", validPath);
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else if (!validPath) {
      next({ path: '/404' })
      NProgress.done()
    } else {
      next();
    }
  } else {
    //console.log("未登录", to.path, hasToken);
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
      NProgress.done()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
}

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  if (whiteList.indexOf(to.path) >= 0) {
    next();
  } else {
    // determine whether the user has logged in
    //console.log("权限控制", to, from);
    const routes = store.getters.resources
    if (routes.length == 0) {
      getAuthRoutes(rs => {
        if (rs) {
          if (rs.length) {
            store.commit("user/SET_RESOURCES", rs);
            store.commit('permission/SET_ROUTES', rs);
            routes.push(...rs);
            handleRoute(to, routes, next);
          } else {
            next({ path: '/404' })
            NProgress.done()
          }
        } else {
          next({ path: '/login' })
          NProgress.done()
        }
      });
    } else {
      handleRoute(to, routes, next);
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
