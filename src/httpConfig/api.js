import axios from './http'
const baseURL = 'http://XXX

// 全局的 axios 默认值
axios.defaults.baseURL = baseURL

// 登录请求
const loginCheck = params => {
  return axios.post('/login', params).then(res => {
    return res.data
  })
}
export { loginCheck }
