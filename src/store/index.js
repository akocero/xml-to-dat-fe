import { createStore } from 'vuex'
import Cookies from 'js-cookie'


export default createStore({
  state: {
    user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      Cookies.set('user', JSON.stringify(payload), { expires: 7 })
    },

    removeUser(state) {
      Cookies.remove('user')
      state.user = null
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getUser(state) {
      return state.user
    }
  }
})
