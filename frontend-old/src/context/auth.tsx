import { AxiosResponse } from 'axios'
import { User } from 'interfaces/User'
import { createContext, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import UseFlashMessage from '../hooks/useFlashMessage'
import { Login } from '../interfaces/Login'
import api from '../utils/api'

export const AuthContext = createContext<any>({})
export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate()
  const { setFlashMessage } = UseFlashMessage()
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  const [user, setUser] = useState<object>({})
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const accessTokenRecovered = sessionStorage.getItem('access_token')

    if (accessTokenRecovered) {
      sessionStorage.setItem('access_token', accessTokenRecovered)
      setAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const login = async (userData: Login) => {
    let messageText = 'Login realizado com sucesso!'
    let messageType = 'success'

    try {
      const data = await api
        .post('/auth/signin', userData)
        .then((response: AxiosResponse) => response.data)

      sessionStorage.setItem('access_token', data.access_token)

      console.log(data)

      setUser(data.user)

      setAuthenticated(true)

      navigate('/dashboard')
    } catch (error: any) {
      messageText = error
      messageType = 'error'
    }

    setFlashMessage(messageText, messageType)
  }

  const register = async (userData: User) => {
    let messageText = 'Cadastro realizado com sucesso!'
    let messageType = 'success'

    try {
      const data = await api
        .post('/auth/signup', userData)
        .then((response: AxiosResponse) => response.data)

      setUser(data.user)

      setAuthenticated(false)

      navigate('/login')
    } catch (error: any) {
      messageText = error
      messageType = 'error'
    }

    setFlashMessage(messageText, messageType)
  }

  const registerAdmin = async (userData: User) => {
    let messageText = 'Cadastro realizado com sucesso!'
    let messageType = 'success'

    try {
      await api
        .post('/auth/signup', userData)
        .then((response: AxiosResponse) => response.data)
    } catch (error: any) {
      messageText = error
      messageType = 'error'
    }

    setFlashMessage(messageText, messageType)
  }

  const logout = (): void => {
    setUser({})
    sessionStorage.clear()
    localStorage.clear()
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        loading,
        login,
        register,
        registerAdmin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
