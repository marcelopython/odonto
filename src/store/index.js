import Vuex from 'vuex'
import Client from '@/services/Client'
// const client = new Client()
import Cookies from 'js-cookie'

const state = {
  isLogged: false,
  access_token: '',
  user: {},
  roles: []
}

export default new Vuex.Store({
  ...state,
  getters: {
    permission: (state) => (permission) => {
      return state.roles.find(item => item.name === permission)
    }
  },
  mutations: {
    logout: (state) => {
      state.isLogged = false
      state.access_token  = ''
      state.user  = {}
      state.roles  = []
      Cookies.remove('access_token');
      Cookies.remove('isLogged');
      Cookies.remove('roles');
      // sessionStorage.clear();
      // localStorage.clear();
      window.location.href = window.location.protocol + "//" + window.location.host+'#login'
  }
  },
  actions: {
    logoutRequest: ({commit, dispatch}) => {
      commit('logout');
    }
  },
  modules: {
  }
})
