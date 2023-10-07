import axios from "axios"
import config from "../../app_config"
import { GetEvents } from "../../utils/type"
import { defaultEvents } from "../../utils/repo"
const URL = config.get("BASE_URL")

export function getEventsAPI(payload: GetEvents) {
  return axios.post(`${URL}/games/data/game-events`, { payload }).then((res) => {
    if (res.data?.gameEvents?.length > 0) {
      return res.data
    }
    return {
      // Return initail state
      gameEvents: defaultEvents,
      targetEvents: [[0, 0, 0, 0, 0]],
    }
  })
}
