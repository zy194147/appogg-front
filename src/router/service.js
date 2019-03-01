import axios from 'axios'

let port=8999
let host='://127.0.0.1:' + port
let baseURL='http' + host
let axiosConfig={

  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
}
let instanceTmp=axios.create(axiosConfig)

export default {
  getAxios:instanceTmp,
  getCancelToken:axios.CancelToken
}
