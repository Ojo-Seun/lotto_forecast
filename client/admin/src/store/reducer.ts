import { CtxActions, ctxInitialState } from "./store"
import localStorageFns from "../utils/localStorage"
const { remove, set } = localStorageFns()

export function reducer(state = ctxInitialState, action: CtxActions) {
  switch (action.type) {
    case "LOGIN":
      set("user", action.payload)
      return { ...state, user: action.payload }
    case "LOGOUT":
      remove("user")
      return { ...state, user: ctxInitialState.user }
    case "SHOW_ALERT":
      return { ...state, alert: { show: true, message: action.payload } }
    case "CLOSE_ALERT":
      return { ...state, alert: { show: false, message: "" } }
    default:
      return state
  }
}
