/* eslint-disable */
import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'
import { baseUrl } from '@/config'

// 请求成功
const ERR_OK = 0
// 用户信息失效
const ERR_INVALID = 1000

let createConfig = {
  baseURL: baseUrl,
  timeout: 200000
}

const service = axios.create(createConfig)

service.interceptors.request.use((config) => {
  let methods = config.methods ? config.methods.toUpperCase() : ''
  let options = { ...config }
  options.data = options.data || options.params
  let queryString = ''
  switch (methods) {
    case 'GET':
      for (let i in options.data) {
        if (typeof options.data[i] === 'object') {
          queryString += i + '=' + JSON.stringify(options.data[i]) + '&'
        } else {
          queryString += i + '=' + options.data[i] + '&'
        }
      }
      options.url = options.url + '?' + queryString
      break
    case 'POST':
      for (let i in options.data) {
        if (typeof options.data[i] === 'object') {
          queryString += i + '=' + JSON.stringify(options.data[i]) + '&'
        } else {
          queryString += i + '=' + options.data[i] + '&'
        }
      }
      options.url = options.url + '?' + queryString
      options.headers['Content-Type'] = 'application/json'
      break
    case 'COMPLEX_POST':
      options.data = qs.stringify(options.data)
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
      options.method = 'POST'
      options.methods = 'POST'
      break
    case 'FILE_POST':
      options.headers['Content-Type'] = 'multipart/form-data'
      options.method = 'POST'
      options.methods = 'POST'
      break
    case 'PUT':
      options.headers['Content-Type'] = 'application/json'
      break
    case 'COMPLEX_PUT':
      options.params = qs.stringify(options.params)
      options.method = 'PUT'
      break
    case 'DELETE':
      for (let i in options.data) {
        if (typeof options.data[i] === 'object') {
          queryString += i + '=' + JSON.stringify(options.data[i]) + '&'
        } else {
          queryString += i + '=' + options.data[i] + '&'
        }
      }
      options.url = options.url + '?' + queryString
      options.headers['Content-Type'] = 'application/json'
      break
    case 'COMPLEX_DELETE':
      break
    default:
      options.methods = 'POST'
      break
  }
  config = { ...config, ...options }
  config.method = options.methods || 'POST'
  config.url = '/api' + config.url
  return config
})

service.interceptors.response.use(
  async (response) => {
    const { data: { code, data } = {} } = response
    if (response.request.responseURL.includes('getPublicKey')) {
      return response.data
    }
    if (code === ERR_OK) {
      // 请求成功
      return data
    }  else {
      console.warn(response.data)
      return Promise.reject(response.data)
    }
  },
  (err) => {
    Toast.fail('服务器异常')
    return Promise.reject(err)
  }
)

export default service
