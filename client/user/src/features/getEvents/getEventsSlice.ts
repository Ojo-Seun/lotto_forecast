import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { defaultEvents } from "../../utils/repo"
import { GameTypes, GetEvents, WinningOrMachineEvent } from "../../utils/type"
import { getEventsAPI } from "./getEventsAPI"

type Data = { Winning: WinningOrMachineEvent; Machine: WinningOrMachineEvent }[] | GameTypes[]
interface State {
  loading: boolean
  error: { err: boolean; message: string }
  gameEvents: Data
}

const initialState: State = {
  loading: false,
  error: { err: false, message: "" },
  gameEvents: defaultEvents,
}

export const getGameEventsAsync = createAsyncThunk("gameEvents/getGameEvents", async (payload: GetEvents) => {
  const response = await getEventsAPI(payload)
  return response
})

const gameEventsSlice = createSlice({
  name: "gameEvents",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGameEventsAsync.pending, (state) => {
      state.loading = true
    })

    builder.addCase(getGameEventsAsync.fulfilled, (state, action: PayloadAction<State>) => {
      state.loading = false
      state.gameEvents = action.payload.gameEvents
    })

    builder.addCase(getGameEventsAsync.rejected, (state, action) => {
      const { message } = action.error
      state.loading = false
      state.error = { err: true, message: message ?? "error occured" }
    })
  },
})

const gameEventsReducer = gameEventsSlice.reducer
export default gameEventsReducer
