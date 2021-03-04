import { request } from '@/plugins/request';

// 获取公共的文章列表
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 获取关注的用户文章列表
export const getFeedArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

// 添加点赞
export const addFavorite = (slug) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消点赞
export const deleteFavorite = (slug) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 获取文章详情
export const getArticle = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 获取文章评论
export const getComments = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

// 写文章
export const postArticle = (params) => {
  console.log('params', params)
  return request({
    method: 'POST',
    url: `/api/articles`,
    data: params
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