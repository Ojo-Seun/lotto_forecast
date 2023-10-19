import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import localStorageFns from "../../utils/localStorage"
import { Roles } from "../../utils/type"
const { get, remove, set } = localStorageFns()
const initialValue = {
  name: "",
  email: "",
  sub: "",
  roles: [] as Roles,
  access_token: "",
}
const initialState = get("user", initialValue)
interface State {
  name: string
  email: string
  sub: string
  roles: Roles
  access_token: string
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state: State, action: PayloadAction<State>) => {
      const { name, email, sub, roles, access_token } = action.payload
      state.access_token = access_token
      state.name = name
      state.email = email
      state.roles = roles
      state.sub = sub
      set("user", { ...action.payload })
      console.log(action.payload)
    },

    logout: (state) => {
      state.access_token = ""
      state.name = ""
      state.email = ""
      state.roles = []
      state.sub = ""
      remove("user")
    },
  },
})

export const { login, logout } = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer
