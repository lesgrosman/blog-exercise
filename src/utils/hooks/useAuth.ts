import axios, { AxiosError } from 'axios'
import { useCallback, useState } from 'react'
import { ACCESS_TOKEN, TOKEN_EXPIRES_IN, useAuthContext } from 'store/auth'
import { API_KEY, BASE_URL } from 'utils/constants'

type UseAuth = {
  login: (email: string, password: string) => Promise<void>,
  logout: () => void,
  loading: boolean,
  error: Error | null
}

export const useAuth = (): UseAuth => {
  //state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null | AxiosError>(null)

  //auth store
  const { setIsUser, setToken } = useAuthContext()

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true)
        if (error) setError(null)

        // login
        const responseLogin = await axios.post(`${BASE_URL}/login`, 
          {
            'username': email,
            'password': password
          }, {
            headers: {
              'X-API-KEY': API_KEY
            }
          }
        )

        const token = responseLogin?.data?.access_token
        const expiresIn = responseLogin?.data?.expires_in

        if (!token) throw new Error('No access token')

        setToken({
          accessToken: responseLogin.data.access_token,
          expiresIn: new Date().getTime() + expiresIn * 1000
        })
        setIsUser(true)
        localStorage.setItem(ACCESS_TOKEN, token)
        localStorage.setItem(TOKEN_EXPIRES_IN,
          (new Date().getTime() + expiresIn * 1000).toString())
      } catch (err) {
        setIsUser(false)
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(TOKEN_EXPIRES_IN)
        setLoading(false)
        setError(err as AxiosError)
      }
    },
    [error, setIsUser, setToken]
  )

  const logout = () => {
    setToken(null)
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(TOKEN_EXPIRES_IN)
  }

  return { login, logout, loading, error }
}
