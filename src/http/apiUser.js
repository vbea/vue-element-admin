import { post, baseURL } from './http'

export default {
  login(params) {
    console.log('login', params);
    return new Promise((resolve, reject) => {
      const res = {
        data: {
          token: 'TEST-TOKEN',
          resources: [{resPath: '*'}]
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
  }
}