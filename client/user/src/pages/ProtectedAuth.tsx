import React from "react"
import useToken from "../hooks/useToken"
import { Navigate } from "react-router-dom"

interface Props {
  children: React.ReactNode
}

function ProtectedAuth({ children }: Props) {
  const { isvalidToken } = useToken()
  const user = isvalidToken()
  if (!user) {
    return <>{children}</>
  } else {
    return <Navigate replace={true} to="/" />
  }
}

export default ProtectedAuth
