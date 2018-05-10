export default {
  state: {
    user: null,
    isUserLoggedIn: false,
    token: null
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLoggedIn (state) {
      return state.isUserLoggedIn
    },
    token (state) {
      return state.token
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      state.isUserLoggedIn = !!(payload)
    },
    setToken (state, payload) {
      state.token = payload
    }
  },
  actions: {
    setUser ({ commit }, payload) {
      commit('setUser', payload)
    },
    setToken ({ commit }, payload) {
      commit('setToken', payload)
    }
  }
}
