import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useAxios } from './axios-context'
import { TokenService } from '../services/token-service'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
}

export interface User {
  id: number
  name: string
  email: string
}

export const AuthContext = React.createContext<{
  user?: User
  isLoading: boolean
  isLoggedIn: boolean
  error?: string
  login: (creds: LoginCredentials) => Promise<void>
  logout: () => void
  register: (creds: RegisterCredentials) => Promise<void>
}>({
  isLoading: true,
  isLoggedIn: false,
  login: async (_) => {},
  logout: () => {},
  register: async (_) => {},
})

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [isLoading, setLoading] = useState(true)
  const [{ user, isLoggedIn, error }, setState] = useState<{
    user?: User
    isLoggedIn: boolean
    error?: string
  }>({
    user: undefined,
    isLoggedIn: false,
    error: undefined,
  })
  const axios = useAxios()

  const checkStatus = useCallback(async () => {
    try {
      const { data } = await axios.get<{ user: User }>('/current')
      setState((prev) => ({
        ...prev,
        isLoggedIn: !!data.user,
        user: data.user ?? undefined,
        error: undefined,
      }))
    } catch (err: any) {
      if (err?.response?.status === 401) {
        setState((prev) => ({
          ...prev,
          isLoggedIn: false,
          user: undefined,
          error: undefined,
        }))
      } else {
        setState((prev) => ({
          ...prev,
          isLoggedIn: false,
          user: undefined,
          error: err?.response?.data?.error || 'Something went wrong',
        }))
      }
    } finally {
      setLoading(false)
    }
  }, [axios])

  useEffect(() => {
    checkStatus()
  }, [checkStatus])

  const register = useCallback(
    async (creds: RegisterCredentials) => {
      try {
        setLoading(true)
        const { data } = await axios.post<{ token: string }>('/register', creds)
        TokenService.saveToken(data.token)
        await checkStatus()
      } catch (err: any) {
        setState((prev) => ({
          ...prev,
          error: err?.response?.data?.message || 'Something went wrong',
        }))
      } finally {
        setLoading(false)
      }
    },
    [axios, checkStatus]
  )

  const login = useCallback(
    async (creds: LoginCredentials) => {
      try {
        setLoading(true)
        const { data } = await axios.post<{ token: string }>('/login', creds)
        TokenService.saveToken(data.token)
        await checkStatus()
      } catch (err: any) {
        if (err?.response?.status === 401) {
          setState((prev) => ({
            ...prev,
            error: 'Invalid email or password',
          }))
        } else {
          setState((prev) => ({
            ...prev,
            error: err?.response?.data?.error || 'Something went wrong',
          }))
        }
      } finally {
        setLoading(false)
      }
    },
    [axios, checkStatus]
  )

  const logout = useCallback(async () => {
    try {
      TokenService.removeToken()
      checkStatus()
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        error: err?.message || 'Something went wrong',
      }))
    } finally {
      setLoading(false)
    }
  }, [axios, checkStatus])

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        isLoading,
        isLoggedIn,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}
