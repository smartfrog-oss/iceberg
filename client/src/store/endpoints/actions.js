import api from '@/services/api.service'
import bus from '@/services/bus.service'
import { extractData } from '@/services/status.service'

async function addEndPoint ({ dispatch }, { endpoint, newItem = true }) {
  await api.post(`/endpoint`, endpoint)
  await dispatch('getEndpoints')
}

async function editEndPoint ({ dispatch }, { endpoint }) {
  const { url, name, id } = endpoint
  await api.put(`/endpoint/${id}`, { url, name })
  await dispatch('getEndpoints')
}

async function runRegression ({ commit, dispatch }, { endpoint }) {
  const { url, name, id } = endpoint
  commit('RUN_REGRESSION', id)
  await api.get(`/endpoint/run/${id}`, { url, name })
  await dispatch('getEndpoints')
}

async function deleteEndPoint ({ dispatch }, { endpoint }) {
  await api.delete(`/endpoint/${endpoint.id}`)
  await dispatch('getEndpoints')
}

async function getDetails ({ commit }, id) {
  const { data } = await api.get(`/endpoint/${id}`)
  commit('SET_DETAILS', data)
}

async function acceptChanges ({ dispatch }, { endpoint, breakPoint }) {
  const { data: accepted } = await api.post(`/endpoint/accept/${endpoint.id}/${breakPoint}`)
  if (accepted) bus.emit('notify', 'success', `${breakPoint} is now as set as legit for ${endpoint.name}`)
  else bus.emit('notify', 'error', 'Something went wrong')
}

async function getEndpoints ({ commit }) {
  const { data } = await api.get(`/endpoint`)
  commit('LOAD_ENDPOINTS', extractData(data))
}

export default {
  addEndPoint,
  deleteEndPoint,
  getEndpoints,
  editEndPoint,
  runRegression,
  getDetails,
  acceptChanges
}
