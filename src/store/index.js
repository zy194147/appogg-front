import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({

  state: {
    // 存储token
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    userName: '',
    userId:''
  },

  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, res) {
      console.log('mutations', res);
      state.token = res.data.token;
      state.userName = res.data.user.userName;
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userName', res.data.user.userName);
      localStorage.setItem('userId', res.data.user.id);
    }
  }
});

export default store;
