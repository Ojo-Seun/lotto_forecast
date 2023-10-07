import { WinningOrMachineEvent } from "../../../utils/type"
import styles from "../ten-boxies-nums/Boxies.module.css"

interface Props {
  event: WinningOrMachineEvent
}

function StaticFiveBoxies({ event }: Props) {
  return (
    <div className={styles.fiveBoxies}>
      <span className={styles.box}>{event[0]}</span>
      <span className={styles.box}>{event[1]}</span>
      <span className={styles.box}>{event[2]}</span>
      <span className={styles.box}>{event[3]}</span>
      <span className={styles.box}>{event[4]}</span>
    </div>
  )
}

export default StaticFiveBoxies
