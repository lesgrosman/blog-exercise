import { useAuthContext } from 'context/auth'
import React from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const { isUser } = useAuthContext()

  if (!isUser) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
