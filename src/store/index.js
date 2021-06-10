import { createStore } from 'vuex'
import Cookies from 'js-cookie'


export default createStore({
  state: {
    user: Cookies.get('user') ? Cookies.get('user') : null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      Cookies.set('user', payload, { expires: 7 })
    }
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
