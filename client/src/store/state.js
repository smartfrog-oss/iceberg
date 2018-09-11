const state = {
  drawer: false,
  loading: false
}

const mutations = {
  'TOGGLE_DRAWER' (state, value) {
    state.drawer = value
  }
}

export default { state, mutations }
