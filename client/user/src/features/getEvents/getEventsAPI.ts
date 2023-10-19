import axios from "axios"
import config from "../../app_config"
import { GetEvents } from "../../utils/type"
import { defaultEvents } from "../../utils/repo"
import { useAppSelector } from "../../app/hooks"
import { store } from "../../app/store"
const URL = config.get("BASE_URL")

export function getEventsAPI(payload: GetEvents) {
  const user = store.getState().user
  const access_token = user.access_token
  return axios
    .post(`${URL}/games/data/game-events`, { payload }, { headers: { Authorization: `Bearer ${access_token}` } })
    .then((res) => {
      if (res.data?.gameEvents?.length > 0) {
        return res.data
      }
      return {
        // Return initail state
        gameEvents: defaultEvents,
      }
    })
    .catch((err) => {
      const Err = err.response?.data?.message ?? err.message
      throw new Error(Err)
    })
}
