import store from '@/store'

export default {
  enable_404: true,
  RESOURCE_KEY: "resourcePath",
  /**
   * @param {Array} value
   * @returns {Boolean}
   * @example see @/views/permission/directive.vue
   */
  checkPermission: (value) => {
    if (value && value instanceof Array && value.length > 0) {
      const roles = store.getters && store.getters.roles
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      return hasPermission
    } else {
      console.error(`need roles! Like v-permission="['admin','editor']"`)
      return false
    }
  },
  getTestResourceList: () => ([
    {"resourcePath": '/dashboard'},
    {"resourcePath": '/test'}
  ])
}