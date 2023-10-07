import { GameTypes } from "../../utils/type"
import styles from "../../components/utils/ten-boxies-nums/Boxies.module.css"
import StaticBoxies from "../../components/utils/ten-boxies-nums/StaticBoxies"
import { useAppSelector } from "../../app/hooks"

interface TestEvent {
  Winning: number[]
  Machine: number[]
}

function LastThreeEvents() {
  const { gameEvents } = useAppSelector((state) => state.gameEvents)
  const last3Events = gameEvents.slice(-3)
  return (
    <div className={styles.lastThreeEvents}>
      <h2 style={{ textAlign: "center", fontWeight: "bold", marginTop: "1em" }}>Last 3 Events</h2>
      <div className={styles.eventsWrapper}>
        <div className={styles.sideNames}>
          <span>Winning</span>
          <span>Machine</span>
        </div>
        <div className={styles.events}>
          {last3Events.map((event, index) => (
            <StaticBoxies key={index} event={event} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LastThreeEvents
