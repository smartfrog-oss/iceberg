import actions from './actions.js'

const state = {
  endpoints: [],
  details: {
    endpoint: null,
    shots:
    {
      legit: {},
      fishy: {}
    }
  }
}

const getters = {
  endpoints: ({ endpoints }) => endpoints,
  shots: ({ details }) => details.shots,
  selectedEndpoint: ({ details }) => details.endpoint
}

const mutations = {
  'LOAD_ENDPOINTS' (state, data) {
    state.endpoints = data
  },
  'RUN_REGRESSION' (state, edId) {
    const index = state.endpoints.findIndex(({ id }) => id === edId)
    state.endpoints[index].status = 'running'
  },
  'SET_DETAILS' (state, details = {}) {
    Object.assign(state.details, details)
  }
}

export default { state, getters, actions, mutations }
