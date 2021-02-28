// 基于axios封装的请求模块

import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

// 通过插件机制获取到上下文对象（query,params,req,res,app,store....） 
export default ({ store }) => {
  // 请求拦截器
  // 例如统一设置token
  const { user } = store.state
  request.interceptors.request.use(function (config) {
    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
    return config;
  }
    , function (error) {
      // 如果请求失败（此时请求还没有发出去）就会进入这里
      return Promise.reject(error)
    })
}
