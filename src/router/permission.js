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

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  //console.log("权限控制", to, from);
  const routes = store.getters.resources
  if (routes.length == 0) {
    let rs = getAuthRoutes();
    if (rs && rs.length) {
      store.commit("user/SET_RESOURCES", rs);
      routes.push(...rs);
    }
  }
  //console.log("路由", routes);
  let validPath = !permission.enable_404;
  if (!validPath && to.path && routes.length) {
    for (let _route of routes) {
      if (to.path == _route[permission.RESOURCE_KEY] || (to.meta && to.meta.activeMenu == _route[permission.RESOURCE_KEY])) {
        validPath = true;
        break;
      }
    }
  }
  if (hasToken) {
    //console.log("权限通过", validPath);
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else if (!validPath && whiteList.indexOf(to.path) == -1) {
      next('/404')
      NProgress.done()
    } else {
      next();
      /* 下列逻辑不用，启用自定义权限控制
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }*/
    }
  } else {
    //console.log("权限未通过", to.path);
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
      NProgress.done()
    } else if (!validPath) {
      next(hasToken ? '/login' : '/404')
      NProgress.done()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
