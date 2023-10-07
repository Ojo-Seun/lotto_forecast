import { memo } from "react"
import { useAppSelector } from "../../../app/hooks"
import { GameTypes, WhereToSearch, WinningOrMachineEvent } from "../../../utils/type"
import styles from "./Table.module.css"

type Events = number[][]

const styleTargetNums = (targetEvent: GameTypes, targetNum: number, events: Events, where: WhereToSearch) => {
  const { weeksApart, searchedIn } = targetEvent

  if (searchedIn !== where) return false
  const eventInPosition = events[weeksApart!]
  const isTargetNum = eventInPosition?.includes(targetNum)
  return isTargetNum
}

interface Props {
  targetNum: number
  targetEvent: GameTypes
  where: WhereToSearch
}

function TargetNumber({ targetEvent, targetNum, where }: Props) {
  const events = useAppSelector((state) => state.gameEvents.targetEvents)
  const isTargetNum = styleTargetNums(targetEvent, targetNum, events, where)

  return <>{isTargetNum ? <td className={`${styles.targetNum} ${styles.eventData}`}>{targetNum}</td> : <td className={styles.eventData}>{targetNum}</td>}</>
}

export default TargetNumber
