import axios from 'axios'
import { useAuthContext } from 'context/auth'
import { useCallback, useState } from 'react'
import { API_KEY, BASE_URL } from 'utils/constants'

type UseLogin = [
  (email: string, password: string) => Promise<void>,
  {
    loading: boolean,
    error: Error | null
  }
];

export const useLogin = (): UseLogin => {
  //state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  //auth store
  const { setIsUser } = useAuthContext()

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

        if (!token) throw new Error('No access token')
        setIsUser(!!token)
        localStorage.setItem('accessToken', token)
      } catch (err) {
        setIsUser(false)
        localStorage.setItem('accessToken', '')
        setLoading(false)
        setError(err as Error)
      }
    },
    [error, setIsUser]
  )

  return [ login, { loading, error } ]
}
