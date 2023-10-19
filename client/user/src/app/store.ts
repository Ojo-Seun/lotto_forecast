import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import gameEventsReducer from "../features/getEvents/getEventsSlice"
import userReducer from "../features/user/userSlice"
import alertReducer from "../features/alert/alertSlice"

export const store = configureStore({
  reducer: {
    gameEvents: gameEventsReducer,
    user: userReducer,
    alert: alertReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
