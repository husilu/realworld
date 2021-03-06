import { request } from '@/plugins/request';

// 用户登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

// 用户注册
export const register = (data) => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}

// 编辑用户信息
export const userApi = (params) => {
  return request({
    method: 'PUT',
    url: `/api/user`,
    data: params
  })
}


// 获取用户profile信息
export const getUserprofile = (params) => {
  return request({
    method: 'GET',
    url: `/api/profiles/${params}`
  })
}

// 关注用户
export const follow = (params) => {
  return request({
    method: params.method,
    url: `/api/profiles/${params.username}/follow`
  })
}

