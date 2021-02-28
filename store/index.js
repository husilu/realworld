const cookieparser = process.server ? require('cookieparser') : undefined;
// 在服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，务必要把state定义成一个函数，返回数据对象
export const state = () => {
  return {
    // 当前登录用户的登录状态
    user: null
  }
}

export const mutations = {
  setUser(state, data) {
    state.user = data
  }
}

// export const actions = {}

// export const mutations = {
//   setAuth(state, auth) {
//     state.auth = auth;
//   }
// }

export const actions = {
  // 初始化容器以及需要传递给客户端的数据
  // nextServerInt这个特殊的action只会在服务端渲染期间自动调用
  nuxtServerInit({ commit }, { req }) {
    let user = null;
    // 如果请求头中有cookie
    if (req.headers.cookie) {
      // 使用 cookieparser 把cookie字符串 转为js对象
      const parsed = cookieparser.parse(req.headers.cookie);
      try {
        user = JSON.parse(parsed.user) // parsed.user 是json字符串 JSON.parse得到json对象
      } catch (err) {

      }
    }
    // 提交mutation 修改 state状态
    commit('setUser', user);
  }
}