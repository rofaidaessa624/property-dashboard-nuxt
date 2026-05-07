import axios from 'axios'

const API_URL = 'http://127.0.0.1:9000/api'

export const useApi = () => {
  const token = useCookie('token')

  const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
  })

  api.interceptors.request.use((config) => {
    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`
    }
    return config
  })

  return api
}