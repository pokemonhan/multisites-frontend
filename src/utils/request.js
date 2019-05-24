import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import { nextTick } from 'q';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL, // url = base url + request url
  timeout: 1000 * 60 * 3 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.Authorization = 'Bearer ' + getToken()
    } 
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res && !res.success && res.message) {
      let message = res.message
      if (res.code == 0) {
        MessageBox(message, '提示', {
          confirmButtonText: '确定'
        }).then(() => {
          removeToken();
          window.sessionStorage.clear()
          nextTick(() => {
            window.location.replace('/login')
            return false
          })
        })
      } else {
        MessageBox(message, '提示', {
          confirmButtonText: '确定'
        })
      }
    }
    return res
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
