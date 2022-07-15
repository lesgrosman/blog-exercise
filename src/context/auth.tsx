import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
  accessToken: string | null
  isUser: boolean
  setIsUser: (state: boolean) => void
}

const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: {children: ReactNode}) => {
  const token = localStorage.getItem('accessToken')
  const [isUser, setIsUser] = useState<boolean>(!!token)

  useEffect(() => {
    setIsUser(!!token)
  }, [token])

  return (
    <AuthContext.Provider
      value={{
        accessToken: token,
        isUser,
        setIsUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
