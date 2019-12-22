import axios from 'axios'
import store from '../store'
import querystring from 'querystring'
import vueJsonp from 'vue-jsonp'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 5000, // 请求超时时间

  // 将 POST 转成 form-urlencoded 的形式, 否则 post 过去的数据会是 json 形式，PHP 无法识别
  transformRequest: [function(data, headers) {
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      return querystring.stringify(data)
    } else if (headers['Content-Type'] === 'multipart/form-data;charset=UTF-8') {
      return data
    } else {
      headers['Content-Type'] = 'application/json'
    }
    return data
  }],
  // 设置post类型
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})

// 添加 jsonp 方法, 默认超时时间:60s
vueJsonp.install(service, 60000)

// request拦截器
service.interceptors.request.use(config => {
  config.headers.Accept = `application/prs.usilo.v1+json`
  if (localStorage.getItem('ACCESS_TOKEN')) {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
  }
  return config
},
err => {
  return Promise.reject(err)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const data = response.data
    if (response.status === 200) {
      return data
    } else {
      return response
    }
  },
  error => {
    let returnError = error
    if (error.response) {
      returnError = Promise.reject(error.response)

      if (error.response.status === 403 || error.response.status === 401) {
        store.dispatch('logout')
      }
    } else {
      returnError = Promise.reject(error)
    }
    return returnError
  }
)

export default service
