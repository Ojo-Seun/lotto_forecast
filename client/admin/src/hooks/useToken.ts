import jwt_decode from "jwt-decode"
import useStore from "./useStore"

interface Decode {
  email: string
  exp: number
  iat: number
  name: string
  roles: string[]
  sub: string
}

function useToken() {
  const { state, dispatch } = useStore()
  const { user } = state
  const isvalidToken = () => {
    if (!user.access_token) return null
    const now = Date.now() / 1000
    const decode = jwt_decode(user.access_token) as Decode
    if (now >= decode.exp) {
      dispatch({ type: "LOGOUT", payload: null })
      return null
    }
    return user
  }

  return { isvalidToken }
}

export default useToken
