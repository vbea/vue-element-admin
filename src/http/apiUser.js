import { post, baseURL } from './http'
import permission from '../utils/permission'

export default {
  login(params) {
    //console.log('login', params);
    return new Promise((resolve, reject) => {
      const res = {
        data: {
          token: 'TEST-TOKEN',
          userName: "Admin",
          resources: permission.getTestResourceList()
        }
      }
      resolve(res)
    })
  },
  getUserInfo(params) {
    console.log('getUserInfo', params);
    return new Promise((resolve, reject) => {
      const res = {
        data: {
          name: 'Admin',
          avatar: ''
        }
      }
      resolve(res)
    })
  },
  /**
   * 刷新用户权限菜单
   */
  refreshAuthMenu() {
    return return new Promise((resolve, reject) => {
      resolve(permission.getTestResourceList())
    })
  }
}