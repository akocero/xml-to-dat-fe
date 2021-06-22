import { createStore } from 'vuex'
import Cookies from 'js-cookie'


export default createStore({
  state: {
    user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
    company: Cookies.get('company') ? JSON.parse(Cookies.get('company')) : null,
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

    setCompany(state, payload) {
      state.company = payload;
      Cookies.set('company', JSON.stringify(payload), { expires: 7 })
    },

    removeCompany(state) {
      Cookies.remove('company')
      state.company = null
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getUser(state) {
      return state.user
    },

    getCompany(state) {
      return state.company
    }
  }
})
