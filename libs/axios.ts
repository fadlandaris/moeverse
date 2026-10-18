import axios from "axios";
import { getBaseApiUrl } from "./getBaseApi";

let refreshPromise: Promise <string> | null  = null

export const createAxiosHttp = () => {
  const instance = axios.create({
    headers: {
      "Content-Type": "application/json"
    },
    baseURL: getBaseApiUrl()
  })

  instance.interceptors.request.use((config) => {
    if (typeof window !== "undefined"){
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
    }

    return config
  })

  instance.interceptors.response.use((response) => response, 
    async (error) => {
      const request = error.config
      if (error.response?.status !== 401 || request.retry){
        return Promise.reject(error)
      }
      request.retry = true

      try {
        if (!refreshPromise) {
          refreshPromise = refreshAccessToken().finally(() => refreshPromise = null)
        }
        const newAccessToken = await refreshPromise
        request.headers.Authorization = `Bearer ${newAccessToken}`
        return instance(request)
      } catch (refreshError) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/auth/login'
        return Promise.reject(refreshError)
      }
    }
  )

  return instance
}

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  const res = await axios.post(`${getBaseApiUrl()}/auth/refresh`, {
    refreshToken
  })
  localStorage.setItem('accessToken', res.data.accessToken)
  localStorage.setItem('refreshToken', res.data.refreshToken)
  return res.data.accessToken
}

export const axiosHttp = createAxiosHttp()