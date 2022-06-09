import { MessageBox } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import router, { constantRoutes, resetRouter } from './router'
import store from './store'
import { getToken } from './utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { getUserResource } from './utils/userInfo'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      try {
        const { resources } = store.state.user
        if (resources && resources.length > 0) {
          if (to.matched.length === 0) {
            setTimeout(() => {
              router.app.$confirm(
                `You do not have the corresponding permission,
                 please contact the administrator to obtain permission.`,
                  {
                    title: 'Sorry',
                    confirmButtonText: 'ok',
                    showCancelButton: false,
                    showClose: false,
                    closeOnClickModal: false,
                  }
                )
                .then(() => {
                  next({ path: '/', replace: true })
                  NProgress.done()
                })
                .catch(() => {})
            }, 0)
          } else {
            next()
          }
        } else {
          const resources = getUserResource()

          const route = constantRoutes.find((route) => route.path === '/')
          if (route) {
            route.redirect = resources[0].resPath
          }
          resetRouter()

          store.commit('user/SET_RESOURCES', { resources })
          const accessRoutes = await store.dispatch(
            'permission/GENERATE_ROUTES',
            resources
          )
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        }
      } catch (error) {
        console.error('permission-vbe-err', error);
        // remove token and go to login page to re-login
        await store.dispatch('user/resetToken')
        Message.error(error || 'Has Error')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
