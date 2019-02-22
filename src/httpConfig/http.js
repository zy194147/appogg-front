/**
 * ajax请求配置
 */
import axios from 'axios'


// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    console.log("axios.interceptors.request.use")
    console.log("token", localStorage.getItem("token"))
    if (localStorage.getItem('token')) {
      config.headers.Authorization = localStorage.getItem('token');
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
)
;


// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          localStorage.removeItem('token');
          this.$router.push('/login');
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)  // 返回接口返回的错误信息
  });


export default axios;
