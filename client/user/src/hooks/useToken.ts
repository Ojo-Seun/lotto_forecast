import React from "react"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import jwt_decode from "jwt-decode"
import { logout } from "../features/user/userSlice"

interface Decode {
  email: string
  exp: number
  iat: number
  name: string
  roles: string[]
  sub: string
}

function useToken() {
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const isvalidToken = () => {
    if (!user.access_token) return null
    const now = Date.now() / 1000
    const decode = jwt_decode(user.access_token) as Decode
    if (now >= decode.exp) {
      dispatch(logout())
      return null
    }
    return user
  }

  return { isvalidToken }
}

export default useToken
