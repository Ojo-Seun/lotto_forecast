import React from "react"
import { Navigate } from "react-router-dom"
import useToken from "../hooks/useToken"

interface Props {
  children: React.ReactNode
}

function Auth({ children }: Props) {
  const { isvalidToken } = useToken()
  const user = isvalidToken()
  if (user) {
    return <>{children}</>
  } else {
    return <Navigate replace={true} to="/auth/login" />
  }
}

export default Auth
