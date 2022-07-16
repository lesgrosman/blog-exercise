import { useAuthContext } from 'context/auth'
import React from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTES } from 'utils/constants'

interface Props {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const { isUser } = useAuthContext()

  if (!isUser) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
