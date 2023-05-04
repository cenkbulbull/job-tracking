import Vuex from "vuex"

new Vuex.Store({
  state: () => ({
    isAuthenticated: false
  }),
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated
    }
  },
  mutations: {
    
  },
  actions:{
    
  }
})


