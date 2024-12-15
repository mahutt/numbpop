import React, { createContext, useMemo, useContext } from 'react'
import Axios, { AxiosInstance } from 'axios'
import { TokenService } from '../services/token-service'

export const AxiosContext = createContext<AxiosInstance | null>(null)

export const getAxios = () => {
  const axios = Axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    validateStatus: (status) => status < 300,
  })
  axios.interceptors.request.use(
    (config) => {
      const token = TokenService.getToken()
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  return axios
}

export const AxiosProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const axios = useMemo(() => getAxios(), [])
  return <AxiosContext.Provider value={axios}>{children}</AxiosContext.Provider>
}

export const useAxios = (): AxiosInstance => {
  const context = useContext(AxiosContext)
  if (!context) {
    throw new Error('useAxios must be used within an AxiosProvider')
  }
  return context
}
