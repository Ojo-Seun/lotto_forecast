import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
  show: false,
  message: "",
}

const alerSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<string>) => {
      state.show = true
      state.message = action.payload
    },
    closeAlert: (state) => {
      state.show = false
      state.message = ""
    },
  },
})

export const { showAlert, closeAlert } = alerSlice.actions
const alertReducer = alerSlice.reducer
export default alertReducer
