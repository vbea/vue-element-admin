import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { getToken } from '@/utils/auth'

export const baseURL = process.env.VUE_APP_BASE_API
export const apiService = process.env.VUE_APP_API_PREFIX
//console.log('---CONFIG---', process.env)
// 设置接口响应时间
axios.defaults.timeout = 50000
axios.defaults.baseURL = baseURL + apiService
// request interceptor
axios.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Access-Token'] = getToken()
    }
    console.log("======= request config ========= ", config)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
axios.interceptors.response.use(res => {
  console.log("========== response =========> ", res)
  if (res.data instanceof Blob) {
    return res
  }
  if (res.data.success) {
    return res;
  } else {
    if (res.data.code == "402" || res.data.code == "406") { //Token过期，需要登录
      const path = router.currentRoute.fullPath
      //console.log('lougout+path', path);
      if (path.indexOf('/login') == -1) {
        store.dispatch("user/logout").then(res => {
          router.push({ path: "/login?redirect=" + path});
        })
      }
    }
    if (res.data.msg) {
      return Promise.reject(res.data.msg)
    } else {
      return Promise.reject(new Error(res.msg || 'Error'))
    }
  }
}, error => {
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
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    }).catch(err => {
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
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
    .then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * put 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
    .then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * delete 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function del(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data)
    .then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    }).catch(err => {
      reject(err)
    })
  })
}

export function upload(url, data, header = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        ...header
      }
    }).then(response => {
      resolve(response.data);
    }, err => {
      reject(err);
    }).catch(err => {
      reject(err);
    });
  })
}

/**
 * put 文件流下载封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function download(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: data,
      responseType: 'blob'
    }).then(response => {
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}