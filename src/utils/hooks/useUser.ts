import { useEffect, useState } from 'react'

export const useUser = (): boolean => {
  // state app user
  const [user, setUser] = useState(false)

  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    setUser(accessToken ? true : false)
  }, [accessToken])

  return user
}
