const actions = {
  setScore({commit}, {score}) {
    commit('SET_SCORE', score)
  },
  setAnswerList({commit}, {list}) {
    commit('SET_LIST', list)
  },
  getScore({state}) {
    return state.score
  },
  getAnswerList({state}) {
    return state.answerList
  }
}

export default actions
