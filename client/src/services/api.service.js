import axios from 'axios'

const API = axios.create({ baseURL: 'http://0.0.0.0:4001/v1/' })

export default API
