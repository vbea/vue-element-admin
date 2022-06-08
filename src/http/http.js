import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { getToken } from '@/utils/auth'
import { Notification } from 'element-ui'

export const baseURL = process.env.VUE_APP_BASE_API
export const filePath = process.env.VUE_APP_FILE_PATH

// 设置接口响应时间
axios.defaults.timeout = 10 * 1000
axios.defaults.baseURL = baseURL
// request interceptor
axios.interceptors.request.use(
  (config) => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['accessToken'] = getToken()
    }
    console.log('======= request config ========= ', config)
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
axios.interceptors.response.use(
  (res) => {
    console.log('========== response =========> ', res)
    if (res.data instanceof Blob) {
      return res
    }
    if (res.data.success) {
      return res
    } else {
      if (res.data.code == '402') {
        //Token过期，需要登录
        const path = router.currentRoute.fullPath
        //console.log('lougout+path', path);
        Notification({
          title: res.data.msg,
          type: 'error',
        })
        store.dispatch('user/logout').then(() => {
          router.push({ path: '/login?redirect=' + path })
        })
      }
      if (res.data.msg) {
        return Promise.reject(res.data.msg)
      } else {
        return Promise.reject(new Error(res.msg || 'Error'))
      }
    }
  },
  (error) => {
    console.log('http-err', error) // for debug
    return Promise.reject(error)
  }
)

/**
 * get 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}, config = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
        ...config,
      })
      .then((response) => {
          setTimeout(() => {
            resolve(response.data)
          }, 500)
        },
        (err) => {
          reject(err)
        }
      )
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}, config) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, config)
      .then(
        (response) => {
          setTimeout(() => {
            resolve(response.data)
          }, 1000)
        },
        (err) => {
          reject(err)
        }
      )
      .catch((err) => {
        reject(err)
      })
  })
}

export function upload(url, data, header = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          ...header,
        },
      })
      .then(
        (response) => {
          resolve(response.data)
        },
        (err) => {
          reject(err)
        }
      )
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * put 文件流下载封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function download(url, data = {}) {
  const option = {
    method: 'post',
    url: url,
    data: data,
    responseType: 'blob',
    timeout: 60 * 1000,
  }
  return axios(option).then((response) => {
    return response.data
  })
}
