import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/',
    redirect: '/redirect'
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      title: "Error"
    }
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    meta: {
      title: "Login"
    }
  },
  {
    path: '/redirect',
    component: () => import('@/views/redirect')
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
          title: 'Dashboard',
          icon: 'dashboard',
          activeIcon: 'dashboard-active',
          affix: true,
        }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    children: [
      {
        path: '/test',
        component: () => import('@/views/dashboard/index'),
        name: 'test',
        meta: {
          title: 'Test',
          icon: 'dashboard',
          activeIcon: 'dashboard-active',
          affix: true,
        }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
