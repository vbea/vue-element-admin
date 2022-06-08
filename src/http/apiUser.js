import { post, baseURL } from './http'

export default {
  login(params) {
    return new Promise((resolve, reject) => {
      const res = {
        data: {
          token: 'TEST-TOKEN',
        }
      }
      resolve(res)
    })
  }
}