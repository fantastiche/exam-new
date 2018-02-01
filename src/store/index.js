import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './actions'
import getters from './getters'
import state from './state'

// const actions = {
//   setScore({commit}, {score}) {
//     commit('SET_SCORE', score)
//   }
// }

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
