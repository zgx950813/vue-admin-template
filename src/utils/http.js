import axios from 'axios'
import querystring from 'querystring'
import vueJsonp from 'vue-jsonp'
import store from '../store'

// 创建 axios 实例
const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url，后台开发/本地调试时不需要指定
  // timeout: 5000  // 请求超时时间，后台开发不需要指定，响应时间如果真的太长的话，锤子比配置好使

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
vueJsonp.install(http, 60000)

// http request 拦截器
http.interceptors.request.use(
  config => {
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

// http response 拦截器
http.interceptors.response.use(
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
export default http
