import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

type Token = {
  accessToken: string
  expiresIn: number
}

type AuthContextType = {
  token: Token | null
  setToken: (state: any) => void
  isUser: boolean
  setIsUser: (state: boolean) => void
}

export const ACCESS_TOKEN = 'accessToken'
export const TOKEN_EXPIRES_IN = 'tokenExpiresIn'

const getToken = (): Token | null => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)
  const tokenExpiresIn = localStorage.getItem(TOKEN_EXPIRES_IN)

  // set token validation
  let tokenValid
  if (tokenExpiresIn) {
    const tokenValidTimeLeft = parseInt(tokenExpiresIn) - new Date().getTime()
    if (tokenValidTimeLeft > 0) {
      tokenValid = true
    }
  }

  if (accessToken && tokenExpiresIn && tokenValid) {
    return { accessToken: accessToken, expiresIn: parseInt(tokenExpiresIn) }
  }
  
  
  localStorage.removeItem(ACCESS_TOKEN)
  localStorage.removeItem(TOKEN_EXPIRES_IN)
  return null
}

const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: {children: ReactNode}) => {
  // const token = localStorage.getItem('accessToken')
  const [token, setToken] = useState<Token | null>(getToken())
  const [isUser, setIsUser] = useState<boolean>(!!token)

  useEffect(() => {
    setIsUser(!!token)
  }, [token])

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isUser,
        setIsUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
