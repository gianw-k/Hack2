import { createContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import * as api from '../api/api'

interface AuthState {
  token: string | null
  email: string | null
}

interface AuthContextProps extends AuthState {
  login: (email: string, passwd: string) => Promise<void>
  register: (email: string, passwd: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextProps>(null!)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  )
  const [email, setEmail] = useState<string | null>(
    localStorage.getItem('email'),
  )

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  useEffect(() => {
    if (email) {
      localStorage.setItem('email', email)
    } else {
      localStorage.removeItem('email')
    }
  }, [email])

  async function login(emailValue: string, passwd: string) {
    const { token: t, email: e } = await api.login(emailValue, passwd)
    setToken(t)
    setEmail(e)
  }

  async function register(emailValue: string, passwd: string) {
    await api.register(emailValue, passwd)
    await login(emailValue, passwd)
  }

  function logout() {
    setToken(null)
    setEmail(null)
  }

  return (
    <AuthContext.Provider value={{ token, email, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}