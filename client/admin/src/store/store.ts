import { createContext } from "react"
import localStorageFns from "../utils/localStorage"
const { get } = localStorageFns()

const initialUser = {
  name: "",
  email: "",
  sub: "",
  roles: [],
  access_token: "",
}

export const ctxInitialState: State = {
  user: get("user", initialUser),
  alert: { show: false, message: "" },
}

interface State {
  alert: { show: boolean; message: string }
  user: {
    name: string
    email: string
    sub: string
    roles: string[]
    access_token: string
  }
}

type Action<T extends string, P> = { type: T; payload: P }
type Login = Action<"LOGIN", State["user"]>
type Logout = Action<"LOGOUT", null>
type ShowAlert = Action<"SHOW_ALERT", string>
type CloseAlert = Action<"CLOSE_ALERT", null>
export type CtxActions = Login | Logout | ShowAlert | CloseAlert

export const Store = createContext({ state: ctxInitialState, dispatch: {} as React.Dispatch<CtxActions> })
